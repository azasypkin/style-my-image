(function(global) {
  'use strict';

  var MAX_SIZE = 300;

  var imageStyles = {
  };

  var onChange = function() {
    var images = document.querySelectorAll('.target-image'),
        cssContainer = document.getElementById('css-container');

    if (images && images.length) {
      for(var i = 0; i < images.length; i++) {
        applyStyles(images[i]);
      }
    }

    cssContainer.textContent = generateCssString();
  };

  var getValue = function(appliedStyle) {
    var value = null;
    switch (appliedStyle.unitType) {
      case global.UnitType.PX:
        value = appliedStyle.value + 'px';
        break;
      case global.UnitType.CUSTOM:
        value = appliedStyle.valueGetter(appliedStyle.value);
        break;
      default:
        value = appliedStyle.value;
    }
    return value;
  };

  var applyStyles = function(image) {
    Object.keys(imageStyles).forEach(function(key) {
      image.style[key] = getValue(imageStyles[key]);
    });
  };

  var styleNameToCssProperty = function(styleName) {
    return styleName.match(/([A-Z]?[^A-Z]*)/g).slice(0,-1).map(function(part) {
      return part.toLowerCase();
    }).join('-');
  };

  var generateCssString = function() {
    var resultString = '.mega-class {\n';

    Object.keys(imageStyles).forEach(function(key) {
      resultString +=
        '  ' + styleNameToCssProperty(key) + ': ' +
        getValue(imageStyles[key]) + ';\n';
    });

    return resultString + '}';
  };

  var renderLabel = function(value, opt_for) {
    var labelNode = document.createElement('label');
    labelNode.textContent = value;

    if (opt_for) {
      labelNode.attributes.for = opt_for;
    }

    return labelNode;
  };

  var renderSelectControl = function(control) {
    var selectNode = document.createElement('select');

    selectNode.id = control.name;

    control.typeProperties.options.forEach(function(option) {
      var optionNode = document.createElement('option');
      optionNode.textContent = optionNode.value = option;
      selectNode.appendChild(optionNode);
    });

    selectNode.value = control.value;

    selectNode.addEventListener('change', function() {
      imageStyles[control.name].value = selectNode.value;
      onChange();
    });

    return selectNode;
  };

  var renderColorControl = function(control) {
    var colorNode = document.createElement('input');

    colorNode.id = control.name;
    colorNode.type = 'color';
    colorNode.value = control.value;

    colorNode.addEventListener('change', function() {
      imageStyles[control.name].value = colorNode.value;
      onChange();
    });

    return colorNode;
  };

  var renderRangeControl = function(control) {
    var rangeNode = document.createElement('input');

    rangeNode.id = control.name;
    rangeNode.type = 'range';
    rangeNode.value = control.value;

    rangeNode.min = control.typeProperties.min;
    rangeNode.max = control.typeProperties.max;
    rangeNode.step = control.typeProperties.step;

    rangeNode.addEventListener('change', function() {
      imageStyles[control.name].value = rangeNode.value;
      onChange();
    });

    return rangeNode;
  };

  var renderControl = function(control) {
    // Initialize with default value
    imageStyles[control.name] = {
      value: control.value,
      unitType: control.unitType,
      valueGetter: control.valueGetter
    };

    switch (control.type) {
      case global.ControlType.SELECT:
        return renderSelectControl(control);
      case global.ControlType.COLOR:
        return renderColorControl(control);
      case global.ControlType.RANGE:
        return renderRangeControl(control);
      default:
        throw new Error('Unknown control: ' + control.type);
    }
  };

  var loadImageToDiv = function(src, callback) {
    var img = document.createElement('img');

    img.src = src;
    img.addEventListener('load', function() {
      var div = document.createElement('div'),
          size = normalizeSize(img.width, img.height);

      div.style.backgroundImage = 'url(' + img.src + ')';
      div.style.width = size.width + 'px';
      div.style.height = size.height + 'px';

      callback(div);
    });
    img.addEventListener('error', function() {
      callback(null);
    });
  };

  var loadImages = function(srcs) {
     var imageSection = document.getElementById('image-container'),
         imageList = document.createElement('ul'),
         pendingCount = srcs.length;

    srcs.forEach(function(src) {
      loadImageToDiv(src, function(div) {
        if (div) {
          var imageItem = document.createElement('li'),
              original = div,
              target = div.cloneNode(true);

          imageItem.className = 'clearfix';

          original.className = 'original-image hint--right  hint--always';
          original.dataset.hint = 'Original Image';

          target.className = 'target-image';

          imageItem.appendChild(target);
          imageItem.appendChild(original);

          imageList.appendChild(imageItem);
        }

        if (--pendingCount === 0) {
          imageSection.innerHTML = '';
          imageSection.appendChild(imageList);

          onChange();
        }
      });
    });
  };

  var normalizeSize = function(width, height) {
    var normalizedHeight = height,
        normalizedWidth = width;

    if (height > MAX_SIZE || width > MAX_SIZE) {
      if (width > height) {
        normalizedWidth = MAX_SIZE;
        normalizedHeight = normalizedWidth / (width / height);
      } else {
        normalizedHeight = MAX_SIZE;
        normalizedWidth = normalizedHeight / (height / width);
      }
    }

    return {
      width: normalizedWidth,
      height: normalizedHeight
    };
  };

  document.addEventListener('DOMContentLoaded', function() {
    var propertyControlContainer = document.getElementById(
        'property-control-container'),
        controlListNode = document.createElement('div');

    global.CONTROLS.forEach(function(control) {
      var controlContainer = document.createElement('div');

      controlContainer.className = 'toolbox-control';

      controlContainer.appendChild(renderLabel(control.label, control.name));
      controlContainer.appendChild(renderControl(control));

      controlListNode.appendChild(controlContainer);
    });

    propertyControlContainer.appendChild(controlListNode);

    document.getElementById('add-image').addEventListener('change', function() {
      var srcs = [];

      for(var i = 0; i < this.files.length; i++) {
        srcs.push(URL.createObjectURL(this.files[i]));
      }

      loadImages(srcs);
    });

   loadImages(['images/mozilla.jpg', 'images/firefoxos.png']);
  });
})(window);