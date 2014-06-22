(function(global) {
  'use strict';

  global.ControlType = {
    COLOR: 0,
    SELECT: 1,
    RANGE: 2
  };

  global.UnitType = {
    NONE: 0,
    PX: 1,
    CUSTOM: 2
  };

  global.CONTROLS = [{
    label: 'Background color',
    name: 'backgroundColor',
    type: global.ControlType.COLOR,
    value: '#dddddd',
    unitType: global.UnitType.NONE
  }, {
    label: 'Opacity',
    name: 'opacity',
    type: global.ControlType.RANGE,
    typeProperties: {
      min: 0,
      max: 1,
      step: 0.1
    },
    value: 1,
    unitType: global.UnitType.NONE
  }, {
    label: 'Background blend mode',
    name: 'backgroundBlendMode',
    type: global.ControlType.SELECT,
    typeProperties: {
      options: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity'
      ]
    },
    value: 'difference',
    unitType: global.UnitType.NONE
  }, {
    label: 'Border width',
    name: 'borderWidth',
    type: global.ControlType.RANGE,
    typeProperties: {
      min: 0,
      max: 100,
      step: 1
    },
    value: 5,
    unitType: global.UnitType.PX
  }, {
    label: 'Border color',
    name: 'borderColor',
    type: global.ControlType.COLOR,
    value: '#d88585',
    unitType: global.UnitType.NONE
  }, {
    label: 'Border style',
    name: 'borderStyle',
    type: global.ControlType.SELECT,
    typeProperties: {
      options: [
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset'
      ]
    },
    value: 'dashed',
    unitType: global.UnitType.NONE
  }, {
    label: 'Border radius',
    name: 'borderRadius',
    type: global.ControlType.RANGE,
    typeProperties: {
      min: 0,
      max: 100,
      step: 1
    },
    value: 15,
    unitType: global.UnitType.PX
  }, {
    label: 'Rotation',
    name: 'transform',
    type: global.ControlType.RANGE,
    typeProperties: {
      min: -360,
      max: 360,
      step: 10
    },
    value: 10,
    unitType: global.UnitType.CUSTOM,
    valueGetter: function(rawValue) {
      return 'rotate(' + rawValue + 'deg)';
    }
  }, ];
})(window);
