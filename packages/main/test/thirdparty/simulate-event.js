!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.simulateEvent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],2:[function(_dereq_,module,exports){
var extend = _dereq_('xtend/mutable')

/**
 * Set some default options.
 *
 * @type {Object}
 */
var eventOptions = {
  UIEvent: function () {
    return {
      view: document.defaultView
    }
  },
  FocusEvent: function () {
    return eventOptions.UIEvent.apply(this, arguments)
  },
  MouseEvent: function (type) {
    return {
      button: 0,
      bubbles: (type !== 'mouseenter' && type !== 'mouseleave'),
      cancelable: (type !== 'mouseenter' && type !== 'mouseleave'),
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      clientX: 1,
      clientY: 1,
      screenX: 0,
      screenY: 0,
      view: document.defaultView,
      relatedTarget: document.documentElement
    }
  },
  WheelEvent: function (type) {
    return eventOptions.MouseEvent.apply(this, arguments)
  },
  KeyboardEvent: function () {
    return {
      view: document.defaultView,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: 0
    }
  }
}

/**
 * Map event names to constructor names.
 *
 * @type {Object}
 */
var eventTypes = {
  beforeprint: 'Event',
  afterprint: 'Event',
  beforeunload: 'Event',
  abort: 'Event',
  error: 'Event',
  change: 'Event',
  submit: 'Event',
  reset: 'Event',
  cached: 'Event',
  canplay: 'Event',
  canplaythrough: 'Event',
  chargingchange: 'Event',
  chargingtimechange: 'Event',
  checking: 'Event',
  close: 'Event',
  downloading: 'Event',
  durationchange: 'Event',
  emptied: 'Event',
  ended: 'Event',
  fullscreenchange: 'Event',
  fullscreenerror: 'Event',
  invalid: 'Event',
  levelchange: 'Event',
  loadeddata: 'Event',
  loadedmetadata: 'Event',
  noupdate: 'Event',
  obsolete: 'Event',
  offline: 'Event',
  online: 'Event',
  open: 'Event',
  orientationchange: 'Event',
  pause: 'Event',
  pointerlockchange: 'Event',
  pointerlockerror: 'Event',
  copy: 'Event',
  cut: 'Event',
  paste: 'Event',
  play: 'Event',
  playing: 'Event',
  ratechange: 'Event',
  readystatechange: 'Event',
  seeked: 'Event',
  seeking: 'Event',
  stalled: 'Event',
  success: 'Event',
  suspend: 'Event',
  timeupdate: 'Event',
  updateready: 'Event',
  visibilitychange: 'Event',
  volumechange: 'Event',
  waiting: 'Event',
  load: 'UIEvent',
  unload: 'UIEvent',
  resize: 'UIEvent',
  scroll: 'UIEvent',
  select: 'UIEvent',
  drag: 'MouseEvent',
  dragenter: 'MouseEvent',
  dragleave: 'MouseEvent',
  dragover: 'MouseEvent',
  dragstart: 'MouseEvent',
  dragend: 'MouseEvent',
  drop: 'MouseEvent',
  touchcancel: 'UIEvent',
  touchend: 'UIEvent',
  touchenter: 'UIEvent',
  touchleave: 'UIEvent',
  touchmove: 'UIEvent',
  touchstart: 'UIEvent',
  blur: 'UIEvent',
  focus: 'UIEvent',
  focusin: 'UIEvent',
  focusout: 'UIEvent',
  input: 'UIEvent',
  show: 'MouseEvent',
  click: 'MouseEvent',
  dblclick: 'MouseEvent',
  mouseenter: 'MouseEvent',
  mouseleave: 'MouseEvent',
  mousedown: 'MouseEvent',
  mouseup: 'MouseEvent',
  mouseover: 'MouseEvent',
  mousemove: 'MouseEvent',
  mouseout: 'MouseEvent',
  contextmenu: 'MouseEvent',
  wheel: 'WheelEvent',
  message: 'MessageEvent',
  storage: 'StorageEvent',
  timeout: 'StorageEvent',
  keydown: 'KeyboardEvent',
  keypress: 'KeyboardEvent',
  keyup: 'KeyboardEvent',
  progress: 'ProgressEvent',
  loadend: 'ProgressEvent',
  loadstart: 'ProgressEvent',
  popstate: 'PopStateEvent',
  hashchange: 'HashChangeEvent',
  transitionend: 'TransitionEvent',
  compositionend: 'CompositionEvent',
  compositionstart: 'CompositionEvent',
  compositionupdate: 'CompositionEvent',
  pagehide: 'PageTransitionEvent',
  pageshow: 'PageTransitionEvent'
}

/**
 * Map the event type constructor to the initialization method.
 *
 * @type {Object}
 */
var eventInit = {
  Event: 'initEvent',
  UIEvent: 'initUIEvent',
  FocusEvent: 'initUIEvent',
  MouseEvent: 'initMouseEvent',
  WheelEvent: 'initMouseEvent',
  MessageEvent: 'initMessageEvent',
  StorageEvent: 'initStorageEvent',
  KeyboardEvent: 'initKeyboardEvent',
  ProgressEvent: 'initEvent',
  PopStateEvent: 'initEvent',
  TransitionEvent: 'initEvent',
  HashChangeEvent: 'initHashChangeEvent',
  CompositionEvent: 'initCompositionEvent',
  DeviceMotionEvent: 'initDeviceMotionEvent',
  PageTransitionEvent: 'initEvent',
  DeviceOrientationEvent: 'initDeviceOrientationEvent'
}

/**
 * Map the options object to initialization parameters.
 *
 * @type {Object}
 */
var eventParameters = {
  initEvent: [],
  initUIEvent: [
    'view',
    'detail'
  ],
  initKeyboardEvent: [
    'view',
    'char',
    'key',
    'location',
    'modifiersList',
    'repeat',
    'locale'
  ],
  initKeyEvent: [
    'view',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'keyCode',
    'charCode'
  ],
  initMouseEvent: [
    'view',
    'detail',
    'screenX',
    'screenY',
    'clientX',
    'clientY',
    'ctrlKey',
    'altKey',
    'shiftKey',
    'metaKey',
    'button',
    'relatedTarget'
  ],
  initHashChangeEvent: [
    'oldURL',
    'newURL'
  ],
  initCompositionEvent: [
    'view',
    'data',
    'locale'
  ],
  initDeviceMotionEvent: [
    'acceleration',
    'accelerationIncludingGravity',
    'rotationRate',
    'interval'
  ],
  initDeviceOrientationEvent: [
    'alpha',
    'beta',
    'gamma',
    'absolute'
  ],
  initMessageEvent: [
    'data',
    'origin',
    'lastEventId',
    'source'
  ],
  initStorageEvent: [
    'key',
    'oldValue',
    'newValue',
    'url',
    'storageArea'
  ]
}

/**
 * Map the event types to constructors.
 *
 * @type {Object}
 */
var eventConstructors = {
  UIEvent: window.UIEvent,
  FocusEvent: window.FocusEvent,
  MouseEvent: window.MouseEvent,
  WheelEvent: window.MouseEvent,
  KeyboardEvent: window.KeyboardEvent
}

/**
 * Get attributes which must be overriden manually.
 *
 * @param {String} eventType
 * @param {Object} options.
 */
function getOverrides (eventType, options) {
  if (eventType === 'KeyboardEvent' && options) {
    return {
      keyCode: options.keyCode || 0,
      key: options.key || 0,
      which: options.which || options.keyCode || 0
    }
  }
}

/**
 * Generate an event.
 *
 * @param  {String}  type
 * @param  {Object}  options
 * @return {Event}
 */
exports.generate = function (type, options) {
  // Immediately throw an error when the event name does not translate.
  if (!eventTypes.hasOwnProperty(type)) {
    throw new SyntaxError('Unsupported event type')
  }

  var eventType = eventTypes[type]
  var event
  var key

  // Handle parameters which must be manually overridden using
  // `Object.defineProperty`.
  var overrides = getOverrides(eventType, options)

  // Extend a new object with the default and passed in options.
  // Existing events already have all of their defaults set.
  if (!(options instanceof window.Event)) {
    // Check for extra defaults to pass in.
    if (eventType in eventOptions) {
      options = extend({
        bubbles: true,
        cancelable: true
      }, eventOptions[eventType](type, options), options)
    } else {
      options = extend({
        bubbles: true,
        cancelable: true
      }, options)
    }
  }

  // Attempt the Event Constructors DOM API.
  var Constructor = eventConstructors[eventType] || window.Event

  try {
    event = new Constructor(type, options)

    // Add the override properties.
    for (key in overrides) {
      Object.defineProperty(event, key, {
        value: overrides[key]
      })
    }

    return event
  } catch (e) {
    // Continue.
  }

  // In IE11, the Keyboard event does not allow setting the
  // keyCode property, even with Object.defineProperty,
  // so we have to use UIEvent.
  var ua = window.navigator.userAgent.toLowerCase()
  var msie = Math.max(ua.indexOf('msie'), ua.indexOf('trident'))

  if (msie >= 0 && eventType === 'KeyboardEvent') {
    eventType = 'UIEvent'
  }

  var initEvent = eventInit[eventType]

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    event = extend(document.createEventObject(), options)

    // Add the override properties.
    for (key in overrides) {
      Object.defineProperty(event, key, {
        value: overrides[key]
      })
    }

    return event
  }

  event = extend(document.createEvent(eventType), options)

  // Handle differences between `initKeyboardEvent` and `initKeyEvent`.
  if (initEvent === 'initKeyboardEvent') {
    if (event[initEvent] === void 0) {
      initEvent = 'initKeyEvent'
    } else if (!('modifiersList' in options)) {
      var mods = []
      if (options.metaKey) mods.push('Meta')
      if (options.altKey) mods.push('Alt')
      if (options.shiftKey) mods.push('Shift')
      if (options.ctrlKey) mods.push('Control')
      options['modifiersList'] = mods.join(' ')
    }
  }

  // Map argument names to the option values.
  var args = eventParameters[initEvent].map(function (parameter) {
    return options[parameter]
  })

  // Initialize the event using the built-in method.
  event[initEvent].apply(
    event, [type, options.bubbles, options.cancelable].concat(args)
  )

  // Add the override properties.
  for (key in overrides) {
    Object.defineProperty(event, key, {
      value: overrides[key]
    })
  }

  return event
}

/**
 * Simulate an event which is dispatched on the given element.
 *
 * @param  {Element} element
 * @param  {String}  type
 * @param  {Object}  options
 * @return {Boolean}
 */
exports.simulate = function (element, type, options) {
  var event = exports.generate(type, options)

  // In < IE9, the `createEvent` function is not available and we have to
  // resort to using `fireEvent`.
  if (!document.createEvent) {
    return element.fireEvent('on' + type, event)
  }
  return element.dispatchEvent(event)
}

},{"xtend/mutable":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9pMDMwMTkxL3dvcmsvcGxheWdyb3VuZC9zaW11bGF0ZS1ldmVudC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2kwMzAxOTEvd29yay9wbGF5Z3JvdW5kL3NpbXVsYXRlLWV2ZW50L25vZGVfbW9kdWxlcy94dGVuZC9tdXRhYmxlLmpzIiwiL1VzZXJzL2kwMzAxOTEvd29yay9wbGF5Z3JvdW5kL3NpbXVsYXRlLWV2ZW50L3NpbXVsYXRlLWV2ZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCJ2YXIgZXh0ZW5kID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5cbi8qKlxuICogU2V0IHNvbWUgZGVmYXVsdCBvcHRpb25zLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudE9wdGlvbnMgPSB7XG4gIFVJRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmlldzogZG9jdW1lbnQuZGVmYXVsdFZpZXdcbiAgICB9XG4gIH0sXG4gIEZvY3VzRXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZXZlbnRPcHRpb25zLlVJRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9LFxuICBNb3VzZUV2ZW50OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHJldHVybiB7XG4gICAgICBidXR0b246IDAsXG4gICAgICBidWJibGVzOiAodHlwZSAhPT0gJ21vdXNlZW50ZXInICYmIHR5cGUgIT09ICdtb3VzZWxlYXZlJyksXG4gICAgICBjYW5jZWxhYmxlOiAodHlwZSAhPT0gJ21vdXNlZW50ZXInICYmIHR5cGUgIT09ICdtb3VzZWxlYXZlJyksXG4gICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgIGNsaWVudFg6IDEsXG4gICAgICBjbGllbnRZOiAxLFxuICAgICAgc2NyZWVuWDogMCxcbiAgICAgIHNjcmVlblk6IDAsXG4gICAgICB2aWV3OiBkb2N1bWVudC5kZWZhdWx0VmlldyxcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgIH1cbiAgfSxcbiAgV2hlZWxFdmVudDogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4gZXZlbnRPcHRpb25zLk1vdXNlRXZlbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9LFxuICBLZXlib2FyZEV2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZpZXc6IGRvY3VtZW50LmRlZmF1bHRWaWV3LFxuICAgICAgY3RybEtleTogZmFsc2UsXG4gICAgICBhbHRLZXk6IGZhbHNlLFxuICAgICAgc2hpZnRLZXk6IGZhbHNlLFxuICAgICAgbWV0YUtleTogZmFsc2UsXG4gICAgICBrZXlDb2RlOiAwXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWFwIGV2ZW50IG5hbWVzIHRvIGNvbnN0cnVjdG9yIG5hbWVzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudFR5cGVzID0ge1xuICBiZWZvcmVwcmludDogJ0V2ZW50JyxcbiAgYWZ0ZXJwcmludDogJ0V2ZW50JyxcbiAgYmVmb3JldW5sb2FkOiAnRXZlbnQnLFxuICBhYm9ydDogJ0V2ZW50JyxcbiAgZXJyb3I6ICdFdmVudCcsXG4gIGNoYW5nZTogJ0V2ZW50JyxcbiAgc3VibWl0OiAnRXZlbnQnLFxuICByZXNldDogJ0V2ZW50JyxcbiAgY2FjaGVkOiAnRXZlbnQnLFxuICBjYW5wbGF5OiAnRXZlbnQnLFxuICBjYW5wbGF5dGhyb3VnaDogJ0V2ZW50JyxcbiAgY2hhcmdpbmdjaGFuZ2U6ICdFdmVudCcsXG4gIGNoYXJnaW5ndGltZWNoYW5nZTogJ0V2ZW50JyxcbiAgY2hlY2tpbmc6ICdFdmVudCcsXG4gIGNsb3NlOiAnRXZlbnQnLFxuICBkb3dubG9hZGluZzogJ0V2ZW50JyxcbiAgZHVyYXRpb25jaGFuZ2U6ICdFdmVudCcsXG4gIGVtcHRpZWQ6ICdFdmVudCcsXG4gIGVuZGVkOiAnRXZlbnQnLFxuICBmdWxsc2NyZWVuY2hhbmdlOiAnRXZlbnQnLFxuICBmdWxsc2NyZWVuZXJyb3I6ICdFdmVudCcsXG4gIGludmFsaWQ6ICdFdmVudCcsXG4gIGxldmVsY2hhbmdlOiAnRXZlbnQnLFxuICBsb2FkZWRkYXRhOiAnRXZlbnQnLFxuICBsb2FkZWRtZXRhZGF0YTogJ0V2ZW50JyxcbiAgbm91cGRhdGU6ICdFdmVudCcsXG4gIG9ic29sZXRlOiAnRXZlbnQnLFxuICBvZmZsaW5lOiAnRXZlbnQnLFxuICBvbmxpbmU6ICdFdmVudCcsXG4gIG9wZW46ICdFdmVudCcsXG4gIG9yaWVudGF0aW9uY2hhbmdlOiAnRXZlbnQnLFxuICBwYXVzZTogJ0V2ZW50JyxcbiAgcG9pbnRlcmxvY2tjaGFuZ2U6ICdFdmVudCcsXG4gIHBvaW50ZXJsb2NrZXJyb3I6ICdFdmVudCcsXG4gIGNvcHk6ICdFdmVudCcsXG4gIGN1dDogJ0V2ZW50JyxcbiAgcGFzdGU6ICdFdmVudCcsXG4gIHBsYXk6ICdFdmVudCcsXG4gIHBsYXlpbmc6ICdFdmVudCcsXG4gIHJhdGVjaGFuZ2U6ICdFdmVudCcsXG4gIHJlYWR5c3RhdGVjaGFuZ2U6ICdFdmVudCcsXG4gIHNlZWtlZDogJ0V2ZW50JyxcbiAgc2Vla2luZzogJ0V2ZW50JyxcbiAgc3RhbGxlZDogJ0V2ZW50JyxcbiAgc3VjY2VzczogJ0V2ZW50JyxcbiAgc3VzcGVuZDogJ0V2ZW50JyxcbiAgdGltZXVwZGF0ZTogJ0V2ZW50JyxcbiAgdXBkYXRlcmVhZHk6ICdFdmVudCcsXG4gIHZpc2liaWxpdHljaGFuZ2U6ICdFdmVudCcsXG4gIHZvbHVtZWNoYW5nZTogJ0V2ZW50JyxcbiAgd2FpdGluZzogJ0V2ZW50JyxcbiAgbG9hZDogJ1VJRXZlbnQnLFxuICB1bmxvYWQ6ICdVSUV2ZW50JyxcbiAgcmVzaXplOiAnVUlFdmVudCcsXG4gIHNjcm9sbDogJ1VJRXZlbnQnLFxuICBzZWxlY3Q6ICdVSUV2ZW50JyxcbiAgZHJhZzogJ01vdXNlRXZlbnQnLFxuICBkcmFnZW50ZXI6ICdNb3VzZUV2ZW50JyxcbiAgZHJhZ2xlYXZlOiAnTW91c2VFdmVudCcsXG4gIGRyYWdvdmVyOiAnTW91c2VFdmVudCcsXG4gIGRyYWdzdGFydDogJ01vdXNlRXZlbnQnLFxuICBkcmFnZW5kOiAnTW91c2VFdmVudCcsXG4gIGRyb3A6ICdNb3VzZUV2ZW50JyxcbiAgdG91Y2hjYW5jZWw6ICdVSUV2ZW50JyxcbiAgdG91Y2hlbmQ6ICdVSUV2ZW50JyxcbiAgdG91Y2hlbnRlcjogJ1VJRXZlbnQnLFxuICB0b3VjaGxlYXZlOiAnVUlFdmVudCcsXG4gIHRvdWNobW92ZTogJ1VJRXZlbnQnLFxuICB0b3VjaHN0YXJ0OiAnVUlFdmVudCcsXG4gIGJsdXI6ICdVSUV2ZW50JyxcbiAgZm9jdXM6ICdVSUV2ZW50JyxcbiAgZm9jdXNpbjogJ1VJRXZlbnQnLFxuICBmb2N1c291dDogJ1VJRXZlbnQnLFxuICBpbnB1dDogJ1VJRXZlbnQnLFxuICBzaG93OiAnTW91c2VFdmVudCcsXG4gIGNsaWNrOiAnTW91c2VFdmVudCcsXG4gIGRibGNsaWNrOiAnTW91c2VFdmVudCcsXG4gIG1vdXNlZW50ZXI6ICdNb3VzZUV2ZW50JyxcbiAgbW91c2VsZWF2ZTogJ01vdXNlRXZlbnQnLFxuICBtb3VzZWRvd246ICdNb3VzZUV2ZW50JyxcbiAgbW91c2V1cDogJ01vdXNlRXZlbnQnLFxuICBtb3VzZW92ZXI6ICdNb3VzZUV2ZW50JyxcbiAgbW91c2Vtb3ZlOiAnTW91c2VFdmVudCcsXG4gIG1vdXNlb3V0OiAnTW91c2VFdmVudCcsXG4gIGNvbnRleHRtZW51OiAnTW91c2VFdmVudCcsXG4gIHdoZWVsOiAnV2hlZWxFdmVudCcsXG4gIG1lc3NhZ2U6ICdNZXNzYWdlRXZlbnQnLFxuICBzdG9yYWdlOiAnU3RvcmFnZUV2ZW50JyxcbiAgdGltZW91dDogJ1N0b3JhZ2VFdmVudCcsXG4gIGtleWRvd246ICdLZXlib2FyZEV2ZW50JyxcbiAga2V5cHJlc3M6ICdLZXlib2FyZEV2ZW50JyxcbiAga2V5dXA6ICdLZXlib2FyZEV2ZW50JyxcbiAgcHJvZ3Jlc3M6ICdQcm9ncmVzc0V2ZW50JyxcbiAgbG9hZGVuZDogJ1Byb2dyZXNzRXZlbnQnLFxuICBsb2Fkc3RhcnQ6ICdQcm9ncmVzc0V2ZW50JyxcbiAgcG9wc3RhdGU6ICdQb3BTdGF0ZUV2ZW50JyxcbiAgaGFzaGNoYW5nZTogJ0hhc2hDaGFuZ2VFdmVudCcsXG4gIHRyYW5zaXRpb25lbmQ6ICdUcmFuc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbmVuZDogJ0NvbXBvc2l0aW9uRXZlbnQnLFxuICBjb21wb3NpdGlvbnN0YXJ0OiAnQ29tcG9zaXRpb25FdmVudCcsXG4gIGNvbXBvc2l0aW9udXBkYXRlOiAnQ29tcG9zaXRpb25FdmVudCcsXG4gIHBhZ2VoaWRlOiAnUGFnZVRyYW5zaXRpb25FdmVudCcsXG4gIHBhZ2VzaG93OiAnUGFnZVRyYW5zaXRpb25FdmVudCdcbn1cblxuLyoqXG4gKiBNYXAgdGhlIGV2ZW50IHR5cGUgY29uc3RydWN0b3IgdG8gdGhlIGluaXRpYWxpemF0aW9uIG1ldGhvZC5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRJbml0ID0ge1xuICBFdmVudDogJ2luaXRFdmVudCcsXG4gIFVJRXZlbnQ6ICdpbml0VUlFdmVudCcsXG4gIEZvY3VzRXZlbnQ6ICdpbml0VUlFdmVudCcsXG4gIE1vdXNlRXZlbnQ6ICdpbml0TW91c2VFdmVudCcsXG4gIFdoZWVsRXZlbnQ6ICdpbml0TW91c2VFdmVudCcsXG4gIE1lc3NhZ2VFdmVudDogJ2luaXRNZXNzYWdlRXZlbnQnLFxuICBTdG9yYWdlRXZlbnQ6ICdpbml0U3RvcmFnZUV2ZW50JyxcbiAgS2V5Ym9hcmRFdmVudDogJ2luaXRLZXlib2FyZEV2ZW50JyxcbiAgUHJvZ3Jlc3NFdmVudDogJ2luaXRFdmVudCcsXG4gIFBvcFN0YXRlRXZlbnQ6ICdpbml0RXZlbnQnLFxuICBUcmFuc2l0aW9uRXZlbnQ6ICdpbml0RXZlbnQnLFxuICBIYXNoQ2hhbmdlRXZlbnQ6ICdpbml0SGFzaENoYW5nZUV2ZW50JyxcbiAgQ29tcG9zaXRpb25FdmVudDogJ2luaXRDb21wb3NpdGlvbkV2ZW50JyxcbiAgRGV2aWNlTW90aW9uRXZlbnQ6ICdpbml0RGV2aWNlTW90aW9uRXZlbnQnLFxuICBQYWdlVHJhbnNpdGlvbkV2ZW50OiAnaW5pdEV2ZW50JyxcbiAgRGV2aWNlT3JpZW50YXRpb25FdmVudDogJ2luaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50J1xufVxuXG4vKipcbiAqIE1hcCB0aGUgb3B0aW9ucyBvYmplY3QgdG8gaW5pdGlhbGl6YXRpb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgZXZlbnRQYXJhbWV0ZXJzID0ge1xuICBpbml0RXZlbnQ6IFtdLFxuICBpbml0VUlFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJ1xuICBdLFxuICBpbml0S2V5Ym9hcmRFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnY2hhcicsXG4gICAgJ2tleScsXG4gICAgJ2xvY2F0aW9uJyxcbiAgICAnbW9kaWZpZXJzTGlzdCcsXG4gICAgJ3JlcGVhdCcsXG4gICAgJ2xvY2FsZSdcbiAgXSxcbiAgaW5pdEtleUV2ZW50OiBbXG4gICAgJ3ZpZXcnLFxuICAgICdjdHJsS2V5JyxcbiAgICAnYWx0S2V5JyxcbiAgICAnc2hpZnRLZXknLFxuICAgICdtZXRhS2V5JyxcbiAgICAna2V5Q29kZScsXG4gICAgJ2NoYXJDb2RlJ1xuICBdLFxuICBpbml0TW91c2VFdmVudDogW1xuICAgICd2aWV3JyxcbiAgICAnZGV0YWlsJyxcbiAgICAnc2NyZWVuWCcsXG4gICAgJ3NjcmVlblknLFxuICAgICdjbGllbnRYJyxcbiAgICAnY2xpZW50WScsXG4gICAgJ2N0cmxLZXknLFxuICAgICdhbHRLZXknLFxuICAgICdzaGlmdEtleScsXG4gICAgJ21ldGFLZXknLFxuICAgICdidXR0b24nLFxuICAgICdyZWxhdGVkVGFyZ2V0J1xuICBdLFxuICBpbml0SGFzaENoYW5nZUV2ZW50OiBbXG4gICAgJ29sZFVSTCcsXG4gICAgJ25ld1VSTCdcbiAgXSxcbiAgaW5pdENvbXBvc2l0aW9uRXZlbnQ6IFtcbiAgICAndmlldycsXG4gICAgJ2RhdGEnLFxuICAgICdsb2NhbGUnXG4gIF0sXG4gIGluaXREZXZpY2VNb3Rpb25FdmVudDogW1xuICAgICdhY2NlbGVyYXRpb24nLFxuICAgICdhY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5JyxcbiAgICAncm90YXRpb25SYXRlJyxcbiAgICAnaW50ZXJ2YWwnXG4gIF0sXG4gIGluaXREZXZpY2VPcmllbnRhdGlvbkV2ZW50OiBbXG4gICAgJ2FscGhhJyxcbiAgICAnYmV0YScsXG4gICAgJ2dhbW1hJyxcbiAgICAnYWJzb2x1dGUnXG4gIF0sXG4gIGluaXRNZXNzYWdlRXZlbnQ6IFtcbiAgICAnZGF0YScsXG4gICAgJ29yaWdpbicsXG4gICAgJ2xhc3RFdmVudElkJyxcbiAgICAnc291cmNlJ1xuICBdLFxuICBpbml0U3RvcmFnZUV2ZW50OiBbXG4gICAgJ2tleScsXG4gICAgJ29sZFZhbHVlJyxcbiAgICAnbmV3VmFsdWUnLFxuICAgICd1cmwnLFxuICAgICdzdG9yYWdlQXJlYSdcbiAgXVxufVxuXG4vKipcbiAqIE1hcCB0aGUgZXZlbnQgdHlwZXMgdG8gY29uc3RydWN0b3JzLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBldmVudENvbnN0cnVjdG9ycyA9IHtcbiAgVUlFdmVudDogd2luZG93LlVJRXZlbnQsXG4gIEZvY3VzRXZlbnQ6IHdpbmRvdy5Gb2N1c0V2ZW50LFxuICBNb3VzZUV2ZW50OiB3aW5kb3cuTW91c2VFdmVudCxcbiAgV2hlZWxFdmVudDogd2luZG93Lk1vdXNlRXZlbnQsXG4gIEtleWJvYXJkRXZlbnQ6IHdpbmRvdy5LZXlib2FyZEV2ZW50XG59XG5cbi8qKlxuICogR2V0IGF0dHJpYnV0ZXMgd2hpY2ggbXVzdCBiZSBvdmVycmlkZW4gbWFudWFsbHkuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGdldE92ZXJyaWRlcyAoZXZlbnRUeXBlLCBvcHRpb25zKSB7XG4gIGlmIChldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50JyAmJiBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGtleUNvZGU6IG9wdGlvbnMua2V5Q29kZSB8fCAwLFxuICAgICAga2V5OiBvcHRpb25zLmtleSB8fCAwLFxuICAgICAgd2hpY2g6IG9wdGlvbnMud2hpY2ggfHwgb3B0aW9ucy5rZXlDb2RlIHx8IDBcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhbiBldmVudC5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICB0eXBlXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvcHRpb25zXG4gKiBAcmV0dXJuIHtFdmVudH1cbiAqL1xuZXhwb3J0cy5nZW5lcmF0ZSA9IGZ1bmN0aW9uICh0eXBlLCBvcHRpb25zKSB7XG4gIC8vIEltbWVkaWF0ZWx5IHRocm93IGFuIGVycm9yIHdoZW4gdGhlIGV2ZW50IG5hbWUgZG9lcyBub3QgdHJhbnNsYXRlLlxuICBpZiAoIWV2ZW50VHlwZXMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1Vuc3VwcG9ydGVkIGV2ZW50IHR5cGUnKVxuICB9XG5cbiAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50VHlwZXNbdHlwZV1cbiAgdmFyIGV2ZW50XG4gIHZhciBrZXlcblxuICAvLyBIYW5kbGUgcGFyYW1ldGVycyB3aGljaCBtdXN0IGJlIG1hbnVhbGx5IG92ZXJyaWRkZW4gdXNpbmdcbiAgLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAuXG4gIHZhciBvdmVycmlkZXMgPSBnZXRPdmVycmlkZXMoZXZlbnRUeXBlLCBvcHRpb25zKVxuXG4gIC8vIEV4dGVuZCBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgZGVmYXVsdCBhbmQgcGFzc2VkIGluIG9wdGlvbnMuXG4gIC8vIEV4aXN0aW5nIGV2ZW50cyBhbHJlYWR5IGhhdmUgYWxsIG9mIHRoZWlyIGRlZmF1bHRzIHNldC5cbiAgaWYgKCEob3B0aW9ucyBpbnN0YW5jZW9mIHdpbmRvdy5FdmVudCkpIHtcbiAgICAvLyBDaGVjayBmb3IgZXh0cmEgZGVmYXVsdHMgdG8gcGFzcyBpbi5cbiAgICBpZiAoZXZlbnRUeXBlIGluIGV2ZW50T3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgIH0sIGV2ZW50T3B0aW9uc1tldmVudFR5cGVdKHR5cGUsIG9wdGlvbnMpLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfSwgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICAvLyBBdHRlbXB0IHRoZSBFdmVudCBDb25zdHJ1Y3RvcnMgRE9NIEFQSS5cbiAgdmFyIENvbnN0cnVjdG9yID0gZXZlbnRDb25zdHJ1Y3RvcnNbZXZlbnRUeXBlXSB8fCB3aW5kb3cuRXZlbnRcblxuICB0cnkge1xuICAgIGV2ZW50ID0gbmV3IENvbnN0cnVjdG9yKHR5cGUsIG9wdGlvbnMpXG5cbiAgICAvLyBBZGQgdGhlIG92ZXJyaWRlIHByb3BlcnRpZXMuXG4gICAgZm9yIChrZXkgaW4gb3ZlcnJpZGVzKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIGtleSwge1xuICAgICAgICB2YWx1ZTogb3ZlcnJpZGVzW2tleV1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb250aW51ZS5cbiAgfVxuXG4gIC8vIEluIElFMTEsIHRoZSBLZXlib2FyZCBldmVudCBkb2VzIG5vdCBhbGxvdyBzZXR0aW5nIHRoZVxuICAvLyBrZXlDb2RlIHByb3BlcnR5LCBldmVuIHdpdGggT2JqZWN0LmRlZmluZVByb3BlcnR5LFxuICAvLyBzbyB3ZSBoYXZlIHRvIHVzZSBVSUV2ZW50LlxuICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gIHZhciBtc2llID0gTWF0aC5tYXgodWEuaW5kZXhPZignbXNpZScpLCB1YS5pbmRleE9mKCd0cmlkZW50JykpXG5cbiAgaWYgKG1zaWUgPj0gMCAmJiBldmVudFR5cGUgPT09ICdLZXlib2FyZEV2ZW50Jykge1xuICAgIGV2ZW50VHlwZSA9ICdVSUV2ZW50J1xuICB9XG5cbiAgdmFyIGluaXRFdmVudCA9IGV2ZW50SW5pdFtldmVudFR5cGVdXG5cbiAgLy8gSW4gPCBJRTksIHRoZSBgY3JlYXRlRXZlbnRgIGZ1bmN0aW9uIGlzIG5vdCBhdmFpbGFibGUgYW5kIHdlIGhhdmUgdG9cbiAgLy8gcmVzb3J0IHRvIHVzaW5nIGBmaXJlRXZlbnRgLlxuICBpZiAoIWRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgZXZlbnQgPSBleHRlbmQoZG9jdW1lbnQuY3JlYXRlRXZlbnRPYmplY3QoKSwgb3B0aW9ucylcblxuICAgIC8vIEFkZCB0aGUgb3ZlcnJpZGUgcHJvcGVydGllcy5cbiAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwga2V5LCB7XG4gICAgICAgIHZhbHVlOiBvdmVycmlkZXNba2V5XVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRcbiAgfVxuXG4gIGV2ZW50ID0gZXh0ZW5kKGRvY3VtZW50LmNyZWF0ZUV2ZW50KGV2ZW50VHlwZSksIG9wdGlvbnMpXG5cbiAgLy8gSGFuZGxlIGRpZmZlcmVuY2VzIGJldHdlZW4gYGluaXRLZXlib2FyZEV2ZW50YCBhbmQgYGluaXRLZXlFdmVudGAuXG4gIGlmIChpbml0RXZlbnQgPT09ICdpbml0S2V5Ym9hcmRFdmVudCcpIHtcbiAgICBpZiAoZXZlbnRbaW5pdEV2ZW50XSA9PT0gdm9pZCAwKSB7XG4gICAgICBpbml0RXZlbnQgPSAnaW5pdEtleUV2ZW50J1xuICAgIH0gZWxzZSBpZiAoISgnbW9kaWZpZXJzTGlzdCcgaW4gb3B0aW9ucykpIHtcbiAgICAgIHZhciBtb2RzID0gW11cbiAgICAgIGlmIChvcHRpb25zLm1ldGFLZXkpIG1vZHMucHVzaCgnTWV0YScpXG4gICAgICBpZiAob3B0aW9ucy5hbHRLZXkpIG1vZHMucHVzaCgnQWx0JylcbiAgICAgIGlmIChvcHRpb25zLnNoaWZ0S2V5KSBtb2RzLnB1c2goJ1NoaWZ0JylcbiAgICAgIGlmIChvcHRpb25zLmN0cmxLZXkpIG1vZHMucHVzaCgnQ29udHJvbCcpXG4gICAgICBvcHRpb25zWydtb2RpZmllcnNMaXN0J10gPSBtb2RzLmpvaW4oJyAnKVxuICAgIH1cbiAgfVxuXG4gIC8vIE1hcCBhcmd1bWVudCBuYW1lcyB0byB0aGUgb3B0aW9uIHZhbHVlcy5cbiAgdmFyIGFyZ3MgPSBldmVudFBhcmFtZXRlcnNbaW5pdEV2ZW50XS5tYXAoZnVuY3Rpb24gKHBhcmFtZXRlcikge1xuICAgIHJldHVybiBvcHRpb25zW3BhcmFtZXRlcl1cbiAgfSlcblxuICAvLyBJbml0aWFsaXplIHRoZSBldmVudCB1c2luZyB0aGUgYnVpbHQtaW4gbWV0aG9kLlxuICBldmVudFtpbml0RXZlbnRdLmFwcGx5KFxuICAgIGV2ZW50LCBbdHlwZSwgb3B0aW9ucy5idWJibGVzLCBvcHRpb25zLmNhbmNlbGFibGVdLmNvbmNhdChhcmdzKVxuICApXG5cbiAgLy8gQWRkIHRoZSBvdmVycmlkZSBwcm9wZXJ0aWVzLlxuICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsIGtleSwge1xuICAgICAgdmFsdWU6IG92ZXJyaWRlc1trZXldXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiBldmVudFxufVxuXG4vKipcbiAqIFNpbXVsYXRlIGFuIGV2ZW50IHdoaWNoIGlzIGRpc3BhdGNoZWQgb24gdGhlIGdpdmVuIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtICB7U3RyaW5nfSAgdHlwZVxuICogQHBhcmFtICB7T2JqZWN0fSAgb3B0aW9uc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5zaW11bGF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCB0eXBlLCBvcHRpb25zKSB7XG4gIHZhciBldmVudCA9IGV4cG9ydHMuZ2VuZXJhdGUodHlwZSwgb3B0aW9ucylcblxuICAvLyBJbiA8IElFOSwgdGhlIGBjcmVhdGVFdmVudGAgZnVuY3Rpb24gaXMgbm90IGF2YWlsYWJsZSBhbmQgd2UgaGF2ZSB0b1xuICAvLyByZXNvcnQgdG8gdXNpbmcgYGZpcmVFdmVudGAuXG4gIGlmICghZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5maXJlRXZlbnQoJ29uJyArIHR5cGUsIGV2ZW50KVxuICB9XG4gIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG59XG4iXX0=
(2)
});
