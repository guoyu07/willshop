webpackJsonp([10],{

/***/ 462:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(500)
}
var normalizeComponent = __webpack_require__(476)
/* script */
var __vue_script__ = __webpack_require__(502)
/* template */
var __vue_template__ = __webpack_require__(503)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-444f37ee"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\shop\\pages\\home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-444f37ee", Component.options)
  } else {
    hotAPI.reload("data-v-444f37ee", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(477)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 476:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 477:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(479);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(480), __esModule: true };

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(481);
var $Object = __webpack_require__(34).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(53);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(54), 'Object', { defineProperty: __webpack_require__(60).f });


/***/ }),

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=272)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=c):r&&(c=r),c){var d=a.functional,p=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(e,t){return c.call(t),p(e,t)}):a.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:a}}},272:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(273);n.d(t,"default",function(){return r.a})},273:function(e,t,n){"use strict";function r(e){n(274)}var o=n(275),i=n(276),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-5adccf6e",null);t.a=f.exports},274:function(e,t){},275:function(e,t,n){"use strict";t.a={name:"wv-swipe-item",mounted:function(){this.$parent&&this.$parent.swipeItemCreated(this)},destroyed:function(){this.$parent&&this.$parent.swipeItemDestroyed(this)}}},276:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-swipe-item"},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(35));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n=e("object"==typeof exports?require("vue"):t.Vue);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=266)}([function(t,e){t.exports=function(t,e,n,r,i,o){var u,a=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(u=t,a=t.default);var c="function"==typeof a?a.options:a;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId=i);var f;if(o?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=f):r&&(f=r),f){var l=c.functional,p=l?c.render:c.beforeCreate;l?(c._injectStyles=f,c.render=function(t,e){return f.call(e),p(t,e)}):c.beforeCreate=p?[].concat(p,f):[f]}return{esModule:u,exports:a,options:c}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(9),i=n(17),o=n(12),u=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(5),i=n(10);t.exports=n(2)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(1),i=n(6),o=n(13),u=n(7),a=function(t,e,n){var s,c,f,l=t&a.F,p=t&a.G,h=t&a.S,d=t&a.P,v=t&a.B,y=t&a.W,g=p?i:i[e]||(i[e]={}),m=g.prototype,b=p?r:h?r[e]:(r[e]||{}).prototype;p&&(n=e);for(s in n)(c=!l&&b&&void 0!==b[s])&&s in g||(f=c?b[s]:n[s],g[s]=p&&"function"!=typeof b[s]?n[s]:v&&c?o(f,r):y&&b[s]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?o(Function.call,f):f,d&&((g.virtual||(g.virtual={}))[s]=f,t&a.R&&m&&!m[s]&&u(m,s,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(e,n){e.exports=t},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(14);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(3),i=n(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var r=n(47)("wks"),i=n(25),o=n(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,e,n){t.exports=!n(2)&&!n(4)(function(){return 7!=Object.defineProperty(n(15)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},,function(t,e,n){var r=n(80),i=n(18);t.exports=function(t){return r(i(t))}},,,function(t,e){t.exports={}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},,function(t,e){t.exports=!0},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(5).f,i=n(19),o=n(16)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},,,,,,,,,,,,,,,function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(60),i=n(48);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(47)("keys"),i=n(25);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){e.f=n(16)},function(t,e,n){var r=n(1),i=n(6),o=n(27),u=n(49),a=n(5).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},,,,,,function(t,e,n){"use strict";var r=n(27),i=n(8),o=n(58),u=n(7),a=n(19),s=n(24),c=n(78),f=n(29),l=n(83),p=n(16)("iterator"),h=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,v,y,g,m){c(n,e,v);var b,x,S,w=function(t){if(!h&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",T="values"==y,O=!1,P=t.prototype,L=P[p]||P["@@iterator"]||y&&P[y],E=L||w(y),j=y?T?w("entries"):E:void 0,M="Array"==e?P.entries||L:L;if(M&&(S=l(M.call(new t)))!==Object.prototype&&S.next&&(f(S,_,!0),r||a(S,p)||u(S,p,d)),T&&L&&"values"!==L.name&&(O=!0,E=function(){return L.call(this)}),r&&!m||!h&&!O&&P[p]||u(P,p,E),s[e]=E,s[_]=d,y)if(b={values:T?E:w("values"),keys:g?E:w("keys"),entries:j},m)for(x in b)x in P||o(P,x,b[x]);else i(i.P+i.F*(h||O),e,b);return b}},function(t,e,n){t.exports=n(7)},function(t,e,n){var r=n(9),i=n(79),o=n(48),u=n(46)("IE_PROTO"),a=function(){},s=function(){var t,e=n(15)("iframe"),r=o.length;for(e.style.display="none",n(66).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[o[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=s(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(19),i=n(21),o=n(81)(!1),u=n(46)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),s=0,c=[];for(n in a)n!=u&&r(a,n)&&c.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~o(c,n)||c.push(n));return c}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(60),i=n(48).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},,function(t,e,n){"use strict";var r=n(77)(!0);n(57)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(44),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){n(85);for(var r=n(1),i=n(7),o=n(24),u=n(16)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<a.length;s++){var c=a[s],f=r[c],l=f&&f.prototype;l&&!l[u]&&i(l,u,c),o[c]=o.Array}},function(t,e){},,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(75),o=r(i),u=n(88),a=r(u),s="function"==typeof a.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":typeof t};e.default="function"==typeof a.default&&"symbol"===s(o.default)?function(t){return void 0===t?"undefined":s(t)}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":void 0===t?"undefined":s(t)}},function(t,e,n){t.exports={default:n(76),__esModule:!0}},function(t,e,n){n(64),n(67),t.exports=n(49).f("iterator")},function(t,e,n){var r=n(44),i=n(18);t.exports=function(t){return function(e,n){var o,u,a=String(i(e)),s=r(n),c=a.length;return s<0||s>=c?t?"":void 0:(o=a.charCodeAt(s),o<55296||o>56319||s+1===c||(u=a.charCodeAt(s+1))<56320||u>57343?t?a.charAt(s):o:t?a.slice(s,s+2):u-56320+(o-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(59),i=n(10),o=n(29),u={};n(7)(u,n(16)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(5),i=n(9),o=n(45);t.exports=n(2)?Object.defineProperties:function(t,e){i(t);for(var n,u=o(e),a=u.length,s=0;a>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){var r=n(28);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(21),i=n(65),o=n(82);t.exports=function(t){return function(e,n,u){var a,s=r(e),c=i(s.length),f=o(u,c);if(t&&n!=n){for(;c>f;)if((a=s[f++])!=a)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(44),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(19),i=n(84),o=n(46)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(18);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(86),i=n(87),o=n(24),u=n(21);t.exports=n(57)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(89),__esModule:!0}},function(t,e,n){n(90),n(68),n(96),n(97),t.exports=n(6).Symbol},function(t,e,n){"use strict";var r=n(1),i=n(19),o=n(2),u=n(8),a=n(58),s=n(91).KEY,c=n(4),f=n(47),l=n(29),p=n(25),h=n(16),d=n(49),v=n(50),y=n(92),g=n(93),m=n(9),b=n(21),x=n(12),S=n(10),w=n(59),_=n(94),T=n(95),O=n(5),P=n(45),L=T.f,E=O.f,j=_.f,M=r.Symbol,I=r.JSON,N=I&&I.stringify,$=h("_hidden"),k=h("toPrimitive"),C={}.propertyIsEnumerable,A=f("symbol-registry"),F=f("symbols"),D=f("op-symbols"),W=Object.prototype,R="function"==typeof M,V=r.QObject,G=!V||!V.prototype||!V.prototype.findChild,B=o&&c(function(){return 7!=w(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=L(W,e);r&&delete W[e],E(t,e,n),r&&t!==W&&E(W,e,r)}:E,H=function(t){var e=F[t]=w(M.prototype);return e._k=t,e},Y=R&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},J=function(t,e,n){return t===W&&J(D,e,n),m(t),e=x(e,!0),m(n),i(F,e)?(n.enumerable?(i(t,$)&&t[$][e]&&(t[$][e]=!1),n=w(n,{enumerable:S(0,!1)})):(i(t,$)||E(t,$,S(1,{})),t[$][e]=!0),B(t,e,n)):E(t,e,n)},X=function(t,e){m(t);for(var n,r=y(e=b(e)),i=0,o=r.length;o>i;)J(t,n=r[i++],e[n]);return t},q=function(t,e){return void 0===e?w(t):X(w(t),e)},K=function(t){var e=C.call(this,t=x(t,!0));return!(this===W&&i(F,t)&&!i(D,t))&&(!(e||!i(this,t)||!i(F,t)||i(this,$)&&this[$][t])||e)},U=function(t,e){if(t=b(t),e=x(e,!0),t!==W||!i(F,e)||i(D,e)){var n=L(t,e);return!n||!i(F,e)||i(t,$)&&t[$][e]||(n.enumerable=!0),n}},z=function(t){for(var e,n=j(b(t)),r=[],o=0;n.length>o;)i(F,e=n[o++])||e==$||e==s||r.push(e);return r},Q=function(t){for(var e,n=t===W,r=j(n?D:b(t)),o=[],u=0;r.length>u;)!i(F,e=r[u++])||n&&!i(W,e)||o.push(F[e]);return o};R||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===W&&e.call(D,n),i(this,$)&&i(this[$],t)&&(this[$][t]=!1),B(this,t,S(1,n))};return o&&G&&B(W,t,{configurable:!0,set:e}),H(t)},a(M.prototype,"toString",function(){return this._k}),T.f=U,O.f=J,n(62).f=_.f=z,n(51).f=K,n(61).f=Q,o&&!n(27)&&a(W,"propertyIsEnumerable",K,!0),d.f=function(t){return H(h(t))}),u(u.G+u.W+u.F*!R,{Symbol:M});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)h(Z[tt++]);for(var et=P(h.store),nt=0;et.length>nt;)v(et[nt++]);u(u.S+u.F*!R,"Symbol",{for:function(t){return i(A,t+="")?A[t]:A[t]=M(t)},keyFor:function(t){if(!Y(t))throw TypeError(t+" is not a symbol!");for(var e in A)if(A[e]===t)return e},useSetter:function(){G=!0},useSimple:function(){G=!1}}),u(u.S+u.F*!R,"Object",{create:q,defineProperty:J,defineProperties:X,getOwnPropertyDescriptor:U,getOwnPropertyNames:z,getOwnPropertySymbols:Q}),I&&u(u.S+u.F*(!R||c(function(){var t=M();return"[null]"!=N([t])||"{}"!=N({a:t})||"{}"!=N(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!Y(t)){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!Y(e))return e}),r[1]=e,N.apply(I,r)}}}),M.prototype[k]||n(7)(M.prototype,k,M.prototype.valueOf),l(M,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(25)("meta"),i=n(3),o=n(19),u=n(5).f,a=0,s=Object.isExtensible||function(){return!0},c=!n(4)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!o(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return c&&d.NEED&&s(t)&&!o(t,r)&&f(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:h}},function(t,e,n){var r=n(45),i=n(61),o=n(51);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var u,a=n(t),s=o.f,c=0;a.length>c;)s.call(t,u=a[c++])&&e.push(u);return e}},function(t,e,n){var r=n(28);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(21),i=n(62).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==o.call(t)?a(t):i(r(t))}},function(t,e,n){var r=n(51),i=n(10),o=n(21),u=n(12),a=n(19),s=n(17),c=Object.getOwnPropertyDescriptor;e.f=n(2)?c:function(t,e){if(t=o(t),e=u(e,!0),s)try{return c(t,e)}catch(t){}if(a(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){n(50)("asyncIterator")},function(t,e,n){n(50)("observable")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(267);n.d(e,"default",function(){return r.a})},function(t,e,n){"use strict";function r(t){n(268)}var i=n(269),o=n(271),u=n(0),a=r,s=u(i.a,o.a,!1,a,"data-v-6e12bfc6",null);e.a=s.exports},function(t,e){},function(t,e,n){"use strict";var r=n(270);e.a={name:"wv-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{height:{type:Number,default:180},speed:{type:Number,default:300},defaultIndex:{type:Number,default:0},auto:{type:Number,default:3e3},continuous:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1}},mounted:function(){var t=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){if(!t.continuous&&t.index>=t.pages.length-1)return t.clearTimer();t.dragging||t.animating||t.next()},this.auto)),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.onTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&t.onTouchMove(e)}),e.addEventListener("touchend",function(e){if(t.userScrolling)return t.dragging=!1,void(t.dragState={});t.dragging&&(t.onTouchEnd(e),t.dragging=!1)})},methods:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},translate:function(t,e,n,i){var o=this,u=arguments;if(n){this.animating=!0,t.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out",setTimeout(function(){t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var a=!1,s=function(){a||(a=!0,o.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",i&&i.apply(o,u))};Object(r.b)(t,"webkitTransitionEnd",s),setTimeout(s,n+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[],n=Math.floor(this.defaultIndex),i=n>=0&&n<t.length?n:0;this.index=i,t.forEach(function(t,n){e.push(t.$el),Object(r.c)(t.$el,"is-active"),n===i&&Object(r.a)(t.$el,"is-active")}),this.pages=e},doAnimate:function(t,e){var n=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var i=void 0,o=void 0,u=void 0,a=void 0,s=void 0,c=this.speed||300,f=this.index,l=this.pages,p=l.length;e?(i=e.prevPage,u=e.currentPage,o=e.nextPage,a=e.pageWidth,s=e.offsetLeft):(a=this.$el.clientWidth,u=l[f],i=l[f-1],o=l[f+1],this.continuous&&l.length>1&&(i||(i=l[l.length-1]),o||(o=l[0])),i&&(i.style.display="block",this.translate(i,-a)),o&&(o.style.display="block",this.translate(o,a)));var h=void 0,d=this.$children[f].$el;"prev"===t?(f>0&&(h=f-1),this.continuous&&0===f&&(h=p-1)):"next"===t&&(f<p-1&&(h=f+1),this.continuous&&f===p-1&&(h=0));var v=function(){if(void 0!==h){var t=n.$children[h].$el;Object(r.c)(d,"is-active"),Object(r.a)(t,"is-active"),n.index=h}i&&(i.style.display=""),o&&(o.style.display="")};setTimeout(function(){"next"===t?(n.translate(u,-a,c,v),o&&n.translate(o,0,c)):"prev"===t?(n.translate(u,a,c,v),i&&n.translate(i,0,c)):(n.translate(u,0,c,v),void 0!==s?(i&&s>0&&n.translate(i,-1*a,c),o&&s<0&&n.translate(o,a,c)):(i&&n.translate(i,-1*a,c),o&&n.translate(o,a,c)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},onTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,r=t.touches[0];n.startTime=new Date,n.startLeft=r.pageX,n.startTop=r.pageY,n.startTopAbsolute=r.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var i=this.$children[this.index-1],o=this.$children[this.index],u=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(i||(i=this.$children[this.$children.length-1]),u||(u=this.$children[0])),n.prevPage=i?i.$el:null,n.dragPage=o?o.$el:null,n.nextPage=u?u.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},onTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var r=e.currentLeft-e.startLeft,i=e.currentTopAbsolute-e.startTopAbsolute,o=Math.abs(r),u=Math.abs(i);if(o<5||o>=5&&u>=1.73*o)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),r=Math.min(Math.max(1-e.pageWidth,r),e.pageWidth-1);var a=r<0?"next":"prev";e.prevPage&&"prev"===a&&this.translate(e.prevPage,r-e.pageWidth),this.translate(e.dragPage,r),e.nextPage&&"next"===a&&this.translate(e.nextPage,r+e.pageWidth)}},onTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,r=t.currentLeft-t.startLeft,i=t.currentTop-t.startTop,o=t.pageWidth,u=this.index,a=this.pages.length;if(e<300){var s=Math.abs(r)<5&&Math.abs(i)<5;(isNaN(r)||isNaN(i))&&(s=!0),s&&this.$children[this.index].$emit("tap")}e<300&&void 0===t.currentLeft||((e<300||Math.abs(r)>o/2)&&(n=r<0?"next":"prev"),this.continuous||(0===u&&"prev"===n||u===a-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:r,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}},clearTimer:function(){clearInterval(this.timer),this.timer=null}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},watch:{index:function(t){this.$emit("change",t)}}}},function(t,e,n){"use strict";function r(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function i(t,e){if(t){for(var n=t.className,i=(e||"").split(" "),o=0,u=i.length;o<u;o++){var a=i[o];a&&(t.classList?t.classList.add(a):r(t,a)||(n+=" "+a))}t.classList||(t.className=n)}}function o(t,e){if(t&&e){for(var n=e.split(" "),i=" "+t.className+" ",o=0,u=n.length;o<u;o++){var a=n[o];a&&(t.classList?t.classList.remove(a):r(t,a)&&(i=i.replace(" "+a+" "," ")))}t.classList||(t.className=f(i))}}n.d(e,"b",function(){return h}),e.a=i,e.c=o;var u=n(74),a=(n.n(u),n(11)),s=n.n(a),c=s.a.prototype.$isServer,f=(c||Number(document.documentMode),function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),l=function(){return!c&&document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),p=function(){return!c&&document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),h=function(t,e,n){l(t,e,function r(){n&&n.apply(this,arguments),p(t,e,r)})}},function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wv-swipe",style:{height:t.height+"px"}},[n("div",{ref:"wrapper",staticClass:"wv-swipe-wrapper"},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showIndicators,expression:"showIndicators"}],staticClass:"wv-swipe-indicators"},t._l(t.pages,function(e,r){return n("div",{key:r,staticClass:"wv-swipe-indicator",class:{"is-active":r===t.index}})}))])},i=[],o={render:r,staticRenderFns:i};e.a=o}])});

/***/ }),

/***/ 500:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(501);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(475)("09315cf1", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-444f37ee\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./home.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-444f37ee\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 501:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(117)(true);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-444f37ee] {\n  display: block;\n  overflow: hidden;\n}\n.ad[data-v-444f37ee] {\n  display: block;\n  width: 100%;\n  height: 60px;\n  overflow: hidden;\n  background-color: red;\n  position: relative;\n  margin-top: 10px;\n}\n.ad img[data-v-444f37ee] {\n    position: absolute;\n    display: block;\n    overflow: hidden;\n    width: 100%;\n}\n.ad .link[data-v-444f37ee] {\n    z-index: 10;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    color: #fff;\n}\n.product-list[data-v-444f37ee] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n  margin: 10px auto 65px;\n}\n.product-list .product-item[data-v-444f37ee] {\n    width: calc(50vw - 4px);\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n}\n.product-list .product-item .thumbnail[data-v-444f37ee] {\n      display: block;\n      width: 100%;\n}\n.product-list .product-item .name[data-v-444f37ee] {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      box-orient: vertical;\n      line-clamp: 2;\n      word-break: break-all;\n}\n.product-list .product-item .price[data-v-444f37ee] {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/home.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;CAAE;AACnB;IACE,mBAAmB;IACnB,eAAe;IACf,iBAAiB;IACjB,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,YAAY;CAAE;AAElB;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,+BAAoB;EAApB,8BAAoB;MAApB,wBAAoB;UAApB,oBAAoB;EACpB,0BAA+B;MAA/B,uBAA+B;UAA/B,+BAA+B;EAC/B,YAAY;EACZ,uBAAuB;CAAE;AACzB;IACE,wBAAwB;IACxB,eAAe;IACf,iBAAiB;IACjB,uBAAuB;IACvB,oBAAoB;IACpB,mBAAmB;IACnB,uBAAuB;CAAE;AACzB;MACE,eAAe;MACf,YAAY;CAAE;AAChB;MACE,qBAAqB;MACrB,YAAY;MACZ,iBAAiB;MACjB,wBAAwB;MACxB,qBAAqB;MACrB,cAAc;MACd,sBAAsB;CAAE;AAC1B;MACE,eAAe;MACf,cAAc;MACd,gBAAgB;MAChB,kBAAkB;MAClB,WAAW;MACX,kBAAkB;CAAE","file":"home.vue","sourcesContent":[".banner-swipe-item {\n  display: block;\n  overflow: hidden; }\n\n.ad {\n  display: block;\n  width: 100%;\n  height: 60px;\n  overflow: hidden;\n  background-color: red;\n  position: relative;\n  margin-top: 10px; }\n  .ad img {\n    position: absolute;\n    display: block;\n    overflow: hidden;\n    width: 100%; }\n  .ad .link {\n    z-index: 10;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    color: #fff; }\n\n.product-list {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  width: 100%;\n  margin: 10px auto 65px; }\n  .product-list .product-item {\n    width: calc(50vw - 4px);\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc; }\n    .product-list .product-item .thumbnail {\n      display: block;\n      width: 100%; }\n    .product-list .product-item .name {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      box-orient: vertical;\n      line-clamp: 2;\n      word-break: break-all; }\n    .product-list .product-item .price {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__);






var _components;

var banners = [{
  url: 'javascript:',
  img: 'https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg'
}, {
  url: 'javascript:',
  img: 'https://cdn.pixabay.com/photo/2015/03/18/09/29/the-scenery-679011__340.jpg'
}, {
  url: 'javascript',
  img: 'https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098__340.jpg'
}]; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default.a), _components),

  data: function data() {
    return {
      products: [],
      banners: banners
    };
  },
  mounted: function mounted() {
    this.getProducts();
  },


  methods: {
    getProducts: function getProducts() {
      var _this = this;

      this.axios.get('product').then(function (response) {
        _this.products = response.data.products;
      });
    }
  }
});

/***/ }),

/***/ 503:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main" },
    [
      _c(
        "wv-swipe",
        { attrs: { height: 180, auto: 4000 } },
        _vm._l(_vm.banners, function(banner) {
          return _c(
            "wv-swipe-item",
            { key: banner.index, staticClass: "banner-swipe-item" },
            [_c("img", { attrs: { src: banner.img, alt: "" } })]
          )
        })
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "ad" },
        [
          _c("img", {
            attrs: {
              src:
                "https://cdn.pixabay.com/photo/2015/03/18/09/31/prairie-679014__340.jpg",
              alt: ""
            }
          }),
          _vm._v(" "),
          _c("router-link", { attrs: { to: "" } }, [_vm._v("去看看")])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.products.data, function(product) {
          return _c(
            "div",
            { staticClass: "product-item" },
            [
              _c("router-link", { attrs: { to: "/product/" + product.id } }, [
                _c("img", {
                  staticClass: "thumbnail",
                  attrs: { src: product.thumbnail, alt: "" }
                }),
                _vm._v(" "),
                _c("span", {
                  staticClass: "name",
                  domProps: { textContent: _vm._s(product.name) }
                }),
                _vm._v(" "),
                _c("div", {
                  staticClass: "price",
                  domProps: { innerHTML: _vm._s(product.price) }
                })
              ])
            ],
            1
          )
        })
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-444f37ee", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlPzM2MzIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlPzA4ZjQiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWU/Mzg2YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFxTTtBQUNyTTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNGQ7QUFDNWQ7QUFDQSw4Q0FBa0w7QUFDbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSx3REFBd0QsSUFBSTs7QUFFM0k7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0TkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBLDZCQUE2QjtBQUM3QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvc2hvcC1ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00NDRmMzdlZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9ob21lLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAxJVxcXCIsXFxcImxhc3QgMiB2ZXJzaW9uc1xcXCIsXFxcIm5vdCBpZSA8PSA4XFxcIl19fV0sXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XSxcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFtcXFwiaW1wb3J0XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjpmYWxzZX1dXV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi00NDRmMzdlZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi00NDRmMzdlZVwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxccGFnZXNcXFxcaG9tZS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyAgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHsgIGNvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTQ0NGYzN2VlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNDQ0ZjM3ZWVcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4nICsgJyAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSA0NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcblxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI3Mil9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihhLnJlbmRlcj10LnJlbmRlcixhLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxhLl9jb21waWxlZD0hMCksbiYmKGEuZnVuY3Rpb25hbD0hMCksbyYmKGEuX3Njb3BlSWQ9byk7dmFyIGM7aWYoaT8oYz1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYS5fc3NyUmVnaXN0ZXI9Yyk6ciYmKGM9ciksYyl7dmFyIGQ9YS5mdW5jdGlvbmFsLHA9ZD9hLnJlbmRlcjphLmJlZm9yZUNyZWF0ZTtkPyhhLl9pbmplY3RTdHlsZXM9YyxhLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCkscChlLHQpfSk6YS5iZWZvcmVDcmVhdGU9cD9bXS5jb25jYXQocCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6YX19fSwyNzI6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjczKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMjczOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMjc0KX12YXIgbz1uKDI3NSksaT1uKDI3Nikscz1uKDApLHU9cixmPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LTVhZGNjZjZlXCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMjc0OmZ1bmN0aW9uKGUsdCl7fSwyNzU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LXN3aXBlLWl0ZW1cIixtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtQ3JlYXRlZCh0aGlzKX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtRGVzdHJveWVkKHRoaXMpfX19LDI3NjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3di1zd2lwZS1pdGVtXCJ9LFtlLl90KFwiZGVmYXVsdFwiKV0sMil9LG89W10saT17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOm99O3QuYT1pfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAzIDggMTAiLCIhZnVuY3Rpb24odCxlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJ2dWVcIikpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJ2dWVcIl0sZSk7ZWxzZXt2YXIgbj1lKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP3JlcXVpcmUoXCJ2dWVcIik6dC5WdWUpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOnQpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBpPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiB0W3JdLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLGUpLGkubD0hMCxpLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuZD1mdW5jdGlvbih0LG4scil7ZS5vKHQsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfSxlLnA9XCJcIixlKGUucz0yNjYpfShbZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scixpLG8pe3ZhciB1LGE9dD10fHx7fSxzPXR5cGVvZiB0LmRlZmF1bHQ7XCJvYmplY3RcIiE9PXMmJlwiZnVuY3Rpb25cIiE9PXN8fCh1PXQsYT10LmRlZmF1bHQpO3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YS5vcHRpb25zOmE7ZSYmKGMucmVuZGVyPWUucmVuZGVyLGMuc3RhdGljUmVuZGVyRm5zPWUuc3RhdGljUmVuZGVyRm5zLGMuX2NvbXBpbGVkPSEwKSxuJiYoYy5mdW5jdGlvbmFsPSEwKSxpJiYoYy5fc2NvcGVJZD1pKTt2YXIgZjtpZihvPyhmPWZ1bmN0aW9uKHQpe3Q9dHx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LHR8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwodD1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyx0KSx0JiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cyYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG8pfSxjLl9zc3JSZWdpc3Rlcj1mKTpyJiYoZj1yKSxmKXt2YXIgbD1jLmZ1bmN0aW9uYWwscD1sP2MucmVuZGVyOmMuYmVmb3JlQ3JlYXRlO2w/KGMuX2luamVjdFN0eWxlcz1mLGMucmVuZGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGYuY2FsbChlKSxwKHQsZSl9KTpjLmJlZm9yZUNyZWF0ZT1wP1tdLmNvbmNhdChwLGYpOltmXX1yZXR1cm57ZXNNb2R1bGU6dSxleHBvcnRzOmEsb3B0aW9uczpjfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oNCkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOSksaT1uKDE3KSxvPW4oMTIpLHU9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbih0LGUsbil7aWYocih0KSxlPW8oZSwhMCkscihuKSxpKXRyeXtyZXR1cm4gdSh0LGUsbil9Y2F0Y2godCl7fWlmKFwiZ2V0XCJpbiBufHxcInNldFwiaW4gbil0aHJvdyBUeXBlRXJyb3IoXCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCFcIik7cmV0dXJuXCJ2YWx1ZVwiaW4gbiYmKHRbZV09bi52YWx1ZSksdH19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPXt2ZXJzaW9uOlwiMi41LjFcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1uKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNSksaT1uKDEwKTt0LmV4cG9ydHM9bigyKT9mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZih0LGUsaSgxLG4pKX06ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLGk9big2KSxvPW4oMTMpLHU9big3KSxhPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcyxjLGYsbD10JmEuRixwPXQmYS5HLGg9dCZhLlMsZD10JmEuUCx2PXQmYS5CLHk9dCZhLlcsZz1wP2k6aVtlXXx8KGlbZV09e30pLG09Zy5wcm90b3R5cGUsYj1wP3I6aD9yW2VdOihyW2VdfHx7fSkucHJvdG90eXBlO3AmJihuPWUpO2ZvcihzIGluIG4pKGM9IWwmJmImJnZvaWQgMCE9PWJbc10pJiZzIGluIGd8fChmPWM/YltzXTpuW3NdLGdbc109cCYmXCJmdW5jdGlvblwiIT10eXBlb2YgYltzXT9uW3NdOnYmJmM/byhmLHIpOnkmJmJbc109PWY/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGUucHJvdG90eXBlPXQucHJvdG90eXBlLGV9KGYpOmQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/byhGdW5jdGlvbi5jYWxsLGYpOmYsZCYmKChnLnZpcnR1YWx8fChnLnZpcnR1YWw9e30pKVtzXT1mLHQmYS5SJiZtJiYhbVtzXSYmdShtLHMsZikpKX07YS5GPTEsYS5HPTIsYS5TPTQsYS5QPTgsYS5CPTE2LGEuVz0zMixhLlU9NjQsYS5SPTEyOCx0LmV4cG9ydHM9YX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbihlLG4pe2UuZXhwb3J0cz10fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixpO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIoaT1uLmNhbGwodCkpKXJldHVybiBpO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE0KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksdm9pZCAwPT09ZSlyZXR1cm4gdDtzd2l0Y2gobil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKGUsbil9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24obixyKXtyZXR1cm4gdC5jYWxsKGUsbixyKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsaSl7cmV0dXJuIHQuY2FsbChlLG4scixpKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkoZSxhcmd1bWVudHMpfX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyksaT1uKDEpLmRvY3VtZW50LG89cihpKSYmcihpLmNyZWF0ZUVsZW1lbnQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbz9pLmNyZWF0ZUVsZW1lbnQodCk6e319fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NykoXCJ3a3NcIiksaT1uKDI1KSxvPW4oMSkuU3ltYm9sLHU9XCJmdW5jdGlvblwiPT10eXBlb2YgbzsodC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT11JiZvW3RdfHwodT9vOmkpKFwiU3ltYm9sLlwiK3QpKX0pLnN0b3JlPXJ9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMikmJiFuKDQpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eShuKDE1KShcImRpdlwiKSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSwsZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oODApLGk9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByKGkodCkpfX0sLCxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17fX0sZnVuY3Rpb24odCxlKXt2YXIgbj0wLHI9TWF0aC5yYW5kb20oKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJTeW1ib2woXCIuY29uY2F0KHZvaWQgMD09PXQ/XCJcIjp0LFwiKV9cIiwoKytuK3IpLnRvU3RyaW5nKDM2KSl9fSwsZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ITB9LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1KS5mLGk9bigxOSksbz1uKDE2KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIWkodD1uP3Q6dC5wcm90b3R5cGUsbykmJnIodCxvLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sLCwsLCwsLCwsLCwsLCxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxyPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/cjpuKSh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYwKSxpPW4oNDgpO3QuZXhwb3J0cz1PYmplY3Qua2V5c3x8ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ3KShcImtleXNcIiksaT1uKDI1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPWkodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1yW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdfHwocltcIl9fY29yZS1qc19zaGFyZWRfX1wiXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1cImNvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZlwiLnNwbGl0KFwiLFwiKX0sZnVuY3Rpb24odCxlLG4pe2UuZj1uKDE2KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1uKDYpLG89bigyNyksdT1uKDQ5KSxhPW4oNSkuZjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9aS5TeW1ib2x8fChpLlN5bWJvbD1vP3t9OnIuU3ltYm9sfHx7fSk7XCJfXCI9PXQuY2hhckF0KDApfHx0IGluIGV8fGEoZSx0LHt2YWx1ZTp1LmYodCl9KX19LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSwsLCwsLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDI3KSxpPW4oOCksbz1uKDU4KSx1PW4oNyksYT1uKDE5KSxzPW4oMjQpLGM9big3OCksZj1uKDI5KSxsPW4oODMpLHA9bigxNikoXCJpdGVyYXRvclwiKSxoPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksZD1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4sdix5LGcsbSl7YyhuLGUsdik7dmFyIGIseCxTLHc9ZnVuY3Rpb24odCl7aWYoIWgmJnQgaW4gUClyZXR1cm4gUFt0XTtzd2l0Y2godCl7Y2FzZVwia2V5c1wiOmNhc2VcInZhbHVlc1wiOnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19LF89ZStcIiBJdGVyYXRvclwiLFQ9XCJ2YWx1ZXNcIj09eSxPPSExLFA9dC5wcm90b3R5cGUsTD1QW3BdfHxQW1wiQEBpdGVyYXRvclwiXXx8eSYmUFt5XSxFPUx8fHcoeSksaj15P1Q/dyhcImVudHJpZXNcIik6RTp2b2lkIDAsTT1cIkFycmF5XCI9PWU/UC5lbnRyaWVzfHxMOkw7aWYoTSYmKFM9bChNLmNhbGwobmV3IHQpKSkhPT1PYmplY3QucHJvdG90eXBlJiZTLm5leHQmJihmKFMsXywhMCkscnx8YShTLHApfHx1KFMscCxkKSksVCYmTCYmXCJ2YWx1ZXNcIiE9PUwubmFtZSYmKE89ITAsRT1mdW5jdGlvbigpe3JldHVybiBMLmNhbGwodGhpcyl9KSxyJiYhbXx8IWgmJiFPJiZQW3BdfHx1KFAscCxFKSxzW2VdPUUsc1tfXT1kLHkpaWYoYj17dmFsdWVzOlQ/RTp3KFwidmFsdWVzXCIpLGtleXM6Zz9FOncoXCJrZXlzXCIpLGVudHJpZXM6an0sbSlmb3IoeCBpbiBiKXggaW4gUHx8byhQLHgsYlt4XSk7ZWxzZSBpKGkuUCtpLkYqKGh8fE8pLGUsYik7cmV0dXJuIGJ9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oNyl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDkpLGk9big3OSksbz1uKDQ4KSx1PW4oNDYpKFwiSUVfUFJPVE9cIiksYT1mdW5jdGlvbigpe30scz1mdW5jdGlvbigpe3ZhciB0LGU9bigxNSkoXCJpZnJhbWVcIikscj1vLmxlbmd0aDtmb3IoZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLG4oNjYpLmFwcGVuZENoaWxkKGUpLGUuc3JjPVwiamF2YXNjcmlwdDpcIix0PWUuY29udGVudFdpbmRvdy5kb2N1bWVudCx0Lm9wZW4oKSx0LndyaXRlKFwiPHNjcmlwdD5kb2N1bWVudC5GPU9iamVjdDxcXC9zY3JpcHQ+XCIpLHQuY2xvc2UoKSxzPXQuRjtyLS07KWRlbGV0ZSBzLnByb3RvdHlwZVtvW3JdXTtyZXR1cm4gcygpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KGEucHJvdG90eXBlPXIodCksbj1uZXcgYSxhLnByb3RvdHlwZT1udWxsLG5bdV09dCk6bj1zKCksdm9pZCAwPT09ZT9uOmkobixlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE5KSxpPW4oMjEpLG89big4MSkoITEpLHU9big0NikoXCJJRV9QUk9UT1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbixhPWkodCkscz0wLGM9W107Zm9yKG4gaW4gYSluIT11JiZyKGEsbikmJmMucHVzaChuKTtmb3IoO2UubGVuZ3RoPnM7KXIoYSxuPWVbcysrXSkmJih+byhjLG4pfHxjLnB1c2gobikpO3JldHVybiBjfX0sZnVuY3Rpb24odCxlKXtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc30sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNjApLGk9big0OCkuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LGkpfX0sLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDc3KSghMCk7big1NykoU3RyaW5nLFwiU3RyaW5nXCIsZnVuY3Rpb24odCl7dGhpcy5fdD1TdHJpbmcodCksdGhpcy5faT0wfSxmdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5fdCxuPXRoaXMuX2k7cmV0dXJuIG4+PWUubGVuZ3RoP3t2YWx1ZTp2b2lkIDAsZG9uZTohMH06KHQ9cihlLG4pLHRoaXMuX2krPXQubGVuZ3RoLHt2YWx1ZTp0LGRvbmU6ITF9KX0pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NCksaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9pKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLmRvY3VtZW50O3QuZXhwb3J0cz1yJiZyLmRvY3VtZW50RWxlbWVudH0sZnVuY3Rpb24odCxlLG4pe24oODUpO2Zvcih2YXIgcj1uKDEpLGk9big3KSxvPW4oMjQpLHU9bigxNikoXCJ0b1N0cmluZ1RhZ1wiKSxhPVwiQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCxET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LE1lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsVGV4dFRyYWNrTGlzdCxUb3VjaExpc3RcIi5zcGxpdChcIixcIikscz0wO3M8YS5sZW5ndGg7cysrKXt2YXIgYz1hW3NdLGY9cltjXSxsPWYmJmYucHJvdG90eXBlO2wmJiFsW3VdJiZpKGwsdSxjKSxvW2NdPW8uQXJyYXl9fSxmdW5jdGlvbih0LGUpe30sLCwsLCxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZS5fX2VzTW9kdWxlPSEwO3ZhciBpPW4oNzUpLG89cihpKSx1PW4oODgpLGE9cih1KSxzPVwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmXCJzeW1ib2xcIj09dHlwZW9mIG8uZGVmYXVsdD9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1hLmRlZmF1bHQmJnQhPT1hLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9O2UuZGVmYXVsdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJlwic3ltYm9sXCI9PT1zKG8uZGVmYXVsdCk/ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXQ/XCJ1bmRlZmluZWRcIjpzKHQpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09YS5kZWZhdWx0JiZ0IT09YS5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnZvaWQgMD09PXQ/XCJ1bmRlZmluZWRcIjpzKHQpfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDc2KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNjQpLG4oNjcpLHQuZXhwb3J0cz1uKDQ5KS5mKFwiaXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ0KSxpPW4oMTgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXt2YXIgbyx1LGE9U3RyaW5nKGkoZSkpLHM9cihuKSxjPWEubGVuZ3RoO3JldHVybiBzPDB8fHM+PWM/dD9cIlwiOnZvaWQgMDoobz1hLmNoYXJDb2RlQXQocyksbzw1NTI5Nnx8bz41NjMxOXx8cysxPT09Y3x8KHU9YS5jaGFyQ29kZUF0KHMrMSkpPDU2MzIwfHx1PjU3MzQzP3Q/YS5jaGFyQXQocyk6bzp0P2Euc2xpY2UocyxzKzIpOnUtNTYzMjArKG8tNTUyOTY8PDEwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNTkpLGk9bigxMCksbz1uKDI5KSx1PXt9O24oNykodSxuKDE2KShcIml0ZXJhdG9yXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QucHJvdG90eXBlPXIodSx7bmV4dDppKDEsbil9KSxvKHQsZStcIiBJdGVyYXRvclwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUpLGk9big5KSxvPW4oNDUpO3QuZXhwb3J0cz1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzOmZ1bmN0aW9uKHQsZSl7aSh0KTtmb3IodmFyIG4sdT1vKGUpLGE9dS5sZW5ndGgscz0wO2E+czspci5mKHQsbj11W3MrK10sZVtuXSk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyOCk7dC5leHBvcnRzPU9iamVjdChcInpcIikucHJvcGVydHlJc0VudW1lcmFibGUoMCk/T2JqZWN0OmZ1bmN0aW9uKHQpe3JldHVyblwiU3RyaW5nXCI9PXIodCk/dC5zcGxpdChcIlwiKTpPYmplY3QodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDY1KSxvPW4oODIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLHUpe3ZhciBhLHM9cihlKSxjPWkocy5sZW5ndGgpLGY9byh1LGMpO2lmKHQmJm4hPW4pe2Zvcig7Yz5mOylpZigoYT1zW2YrK10pIT1hKXJldHVybiEwfWVsc2UgZm9yKDtjPmY7ZisrKWlmKCh0fHxmIGluIHMpJiZzW2ZdPT09bilyZXR1cm4gdHx8Znx8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDQpLGk9TWF0aC5tYXgsbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9pKHQrZSwwKTpvKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOSksaT1uKDg0KSxvPW4oNDYpKFwiSUVfUFJPVE9cIiksdT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PWkodCkscih0LG8pP3Rbb106XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD91Om51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3Qocih0KSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big4NiksaT1uKDg3KSxvPW4oMjQpLHU9bigyMSk7dC5leHBvcnRzPW4oNTcpKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9dSh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsaSgxKSk6XCJrZXlzXCI9PWU/aSgwLG4pOlwidmFsdWVzXCI9PWU/aSgwLHRbbl0pOmkoMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLG8uQXJndW1lbnRzPW8uQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big4OSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDkwKSxuKDY4KSxuKDk2KSxuKDk3KSx0LmV4cG9ydHM9big2KS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEpLGk9bigxOSksbz1uKDIpLHU9big4KSxhPW4oNTgpLHM9big5MSkuS0VZLGM9big0KSxmPW4oNDcpLGw9bigyOSkscD1uKDI1KSxoPW4oMTYpLGQ9big0OSksdj1uKDUwKSx5PW4oOTIpLGc9big5MyksbT1uKDkpLGI9bigyMSkseD1uKDEyKSxTPW4oMTApLHc9big1OSksXz1uKDk0KSxUPW4oOTUpLE89big1KSxQPW4oNDUpLEw9VC5mLEU9Ty5mLGo9Xy5mLE09ci5TeW1ib2wsST1yLkpTT04sTj1JJiZJLnN0cmluZ2lmeSwkPWgoXCJfaGlkZGVuXCIpLGs9aChcInRvUHJpbWl0aXZlXCIpLEM9e30ucHJvcGVydHlJc0VudW1lcmFibGUsQT1mKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLEY9ZihcInN5bWJvbHNcIiksRD1mKFwib3Atc3ltYm9sc1wiKSxXPU9iamVjdC5wcm90b3R5cGUsUj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBNLFY9ci5RT2JqZWN0LEc9IVZ8fCFWLnByb3RvdHlwZXx8IVYucHJvdG90eXBlLmZpbmRDaGlsZCxCPW8mJmMoZnVuY3Rpb24oKXtyZXR1cm4gNyE9dyhFKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gRSh0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1MKFcsZSk7ciYmZGVsZXRlIFdbZV0sRSh0LGUsbiksciYmdCE9PVcmJkUoVyxlLHIpfTpFLEg9ZnVuY3Rpb24odCl7dmFyIGU9Rlt0XT13KE0ucHJvdG90eXBlKTtyZXR1cm4gZS5faz10LGV9LFk9UiYmXCJzeW1ib2xcIj09dHlwZW9mIE0uaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgTX0sSj1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9PT1XJiZKKEQsZSxuKSxtKHQpLGU9eChlLCEwKSxtKG4pLGkoRixlKT8obi5lbnVtZXJhYmxlPyhpKHQsJCkmJnRbJF1bZV0mJih0WyRdW2VdPSExKSxuPXcobix7ZW51bWVyYWJsZTpTKDAsITEpfSkpOihpKHQsJCl8fEUodCwkLFMoMSx7fSkpLHRbJF1bZV09ITApLEIodCxlLG4pKTpFKHQsZSxuKX0sWD1mdW5jdGlvbih0LGUpe20odCk7Zm9yKHZhciBuLHI9eShlPWIoZSkpLGk9MCxvPXIubGVuZ3RoO28+aTspSih0LG49cltpKytdLGVbbl0pO3JldHVybiB0fSxxPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHZvaWQgMD09PWU/dyh0KTpYKHcodCksZSl9LEs9ZnVuY3Rpb24odCl7dmFyIGU9Qy5jYWxsKHRoaXMsdD14KHQsITApKTtyZXR1cm4hKHRoaXM9PT1XJiZpKEYsdCkmJiFpKEQsdCkpJiYoIShlfHwhaSh0aGlzLHQpfHwhaShGLHQpfHxpKHRoaXMsJCkmJnRoaXNbJF1bdF0pfHxlKX0sVT1mdW5jdGlvbih0LGUpe2lmKHQ9Yih0KSxlPXgoZSwhMCksdCE9PVd8fCFpKEYsZSl8fGkoRCxlKSl7dmFyIG49TCh0LGUpO3JldHVybiFufHwhaShGLGUpfHxpKHQsJCkmJnRbJF1bZV18fChuLmVudW1lcmFibGU9ITApLG59fSx6PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPWooYih0KSkscj1bXSxvPTA7bi5sZW5ndGg+bzspaShGLGU9bltvKytdKXx8ZT09JHx8ZT09c3x8ci5wdXNoKGUpO3JldHVybiByfSxRPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1XLHI9aihuP0Q6Yih0KSksbz1bXSx1PTA7ci5sZW5ndGg+dTspIWkoRixlPXJbdSsrXSl8fG4mJiFpKFcsZSl8fG8ucHVzaChGW2VdKTtyZXR1cm4gb307Unx8KE09ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgTSl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PXAoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PVcmJmUuY2FsbChELG4pLGkodGhpcywkKSYmaSh0aGlzWyRdLHQpJiYodGhpc1skXVt0XT0hMSksQih0aGlzLHQsUygxLG4pKX07cmV0dXJuIG8mJkcmJkIoVyx0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxIKHQpfSxhKE0ucHJvdG90eXBlLFwidG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLl9rfSksVC5mPVUsTy5mPUosbig2MikuZj1fLmY9eixuKDUxKS5mPUssbig2MSkuZj1RLG8mJiFuKDI3KSYmYShXLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixLLCEwKSxkLmY9ZnVuY3Rpb24odCl7cmV0dXJuIEgoaCh0KSl9KSx1KHUuRyt1LlcrdS5GKiFSLHtTeW1ib2w6TX0pO2Zvcih2YXIgWj1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLHR0PTA7Wi5sZW5ndGg+dHQ7KWgoWlt0dCsrXSk7Zm9yKHZhciBldD1QKGguc3RvcmUpLG50PTA7ZXQubGVuZ3RoPm50Oyl2KGV0W250KytdKTt1KHUuUyt1LkYqIVIsXCJTeW1ib2xcIix7Zm9yOmZ1bmN0aW9uKHQpe3JldHVybiBpKEEsdCs9XCJcIik/QVt0XTpBW3RdPU0odCl9LGtleUZvcjpmdW5jdGlvbih0KXtpZighWSh0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBzeW1ib2whXCIpO2Zvcih2YXIgZSBpbiBBKWlmKEFbZV09PT10KXJldHVybiBlfSx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtHPSEwfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtHPSExfX0pLHUodS5TK3UuRiohUixcIk9iamVjdFwiLHtjcmVhdGU6cSxkZWZpbmVQcm9wZXJ0eTpKLGRlZmluZVByb3BlcnRpZXM6WCxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6VSxnZXRPd25Qcm9wZXJ0eU5hbWVzOnosZ2V0T3duUHJvcGVydHlTeW1ib2xzOlF9KSxJJiZ1KHUuUyt1LkYqKCFSfHxjKGZ1bmN0aW9uKCl7dmFyIHQ9TSgpO3JldHVyblwiW251bGxdXCIhPU4oW3RdKXx8XCJ7fVwiIT1OKHthOnR9KXx8XCJ7fVwiIT1OKE9iamVjdCh0KSl9KSksXCJKU09OXCIse3N0cmluZ2lmeTpmdW5jdGlvbih0KXtpZih2b2lkIDAhPT10JiYhWSh0KSl7Zm9yKHZhciBlLG4scj1bdF0saT0xO2FyZ3VtZW50cy5sZW5ndGg+aTspci5wdXNoKGFyZ3VtZW50c1tpKytdKTtyZXR1cm4gZT1yWzFdLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLCFuJiZnKGUpfHwoZT1mdW5jdGlvbih0LGUpe2lmKG4mJihlPW4uY2FsbCh0aGlzLHQsZSkpLCFZKGUpKXJldHVybiBlfSksclsxXT1lLE4uYXBwbHkoSSxyKX19fSksTS5wcm90b3R5cGVba118fG4oNykoTS5wcm90b3R5cGUsayxNLnByb3RvdHlwZS52YWx1ZU9mKSxsKE0sXCJTeW1ib2xcIiksbChNYXRoLFwiTWF0aFwiLCEwKSxsKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI1KShcIm1ldGFcIiksaT1uKDMpLG89bigxOSksdT1uKDUpLmYsYT0wLHM9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYz0hbig0KShmdW5jdGlvbigpe3JldHVybiBzKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpfSksZj1mdW5jdGlvbih0KXt1KHQscix7dmFsdWU6e2k6XCJPXCIrICsrYSx3Ont9fX0pfSxsPWZ1bmN0aW9uKHQsZSl7aWYoIWkodCkpcmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHQ/dDooXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCJTXCI6XCJQXCIpK3Q7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuXCJGXCI7aWYoIWUpcmV0dXJuXCJFXCI7Zih0KX1yZXR1cm4gdFtyXS5pfSxwPWZ1bmN0aW9uKHQsZSl7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuITA7aWYoIWUpcmV0dXJuITE7Zih0KX1yZXR1cm4gdFtyXS53fSxoPWZ1bmN0aW9uKHQpe3JldHVybiBjJiZkLk5FRUQmJnModCkmJiFvKHQscikmJmYodCksdH0sZD10LmV4cG9ydHM9e0tFWTpyLE5FRUQ6ITEsZmFzdEtleTpsLGdldFdlYWs6cCxvbkZyZWV6ZTpofX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDUpLGk9big2MSksbz1uKDUxKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9cih0KSxuPWkuZjtpZihuKWZvcih2YXIgdSxhPW4odCkscz1vLmYsYz0wO2EubGVuZ3RoPmM7KXMuY2FsbCh0LHU9YVtjKytdKSYmZS5wdXNoKHUpO3JldHVybiBlfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjgpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PXIodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDYyKS5mLG89e30udG9TdHJpbmcsdT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzP09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdyk6W10sYT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIGkodCl9Y2F0Y2godCl7cmV0dXJuIHUuc2xpY2UoKX19O3QuZXhwb3J0cy5mPWZ1bmN0aW9uKHQpe3JldHVybiB1JiZcIltvYmplY3QgV2luZG93XVwiPT1vLmNhbGwodCk/YSh0KTppKHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTEpLGk9bigxMCksbz1uKDIxKSx1PW4oMTIpLGE9bigxOSkscz1uKDE3KSxjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oMik/YzpmdW5jdGlvbih0LGUpe2lmKHQ9byh0KSxlPXUoZSwhMCkscyl0cnl7cmV0dXJuIGModCxlKX1jYXRjaCh0KXt9aWYoYSh0LGUpKXJldHVybiBpKCFyLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlLG4pe24oNTApKFwiYXN5bmNJdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe24oNTApKFwib2JzZXJ2YWJsZVwiKX0sLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjY3KTtuLmQoZSxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7bigyNjgpfXZhciBpPW4oMjY5KSxvPW4oMjcxKSx1PW4oMCksYT1yLHM9dShpLmEsby5hLCExLGEsXCJkYXRhLXYtNmUxMmJmYzZcIixudWxsKTtlLmE9cy5leHBvcnRzfSxmdW5jdGlvbih0LGUpe30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjcwKTtlLmE9e25hbWU6XCJ3di1zd2lwZVwiLGNyZWF0ZWQ6ZnVuY3Rpb24oKXt0aGlzLmRyYWdTdGF0ZT17fX0sZGF0YTpmdW5jdGlvbigpe3JldHVybntyZWFkeTohMSxkcmFnZ2luZzohMSx1c2VyU2Nyb2xsaW5nOiExLGFuaW1hdGluZzohMSxpbmRleDowLHBhZ2VzOltdLHRpbWVyOm51bGwscmVJbml0VGltZXI6bnVsbCxub0RyYWc6ITF9fSxwcm9wczp7aGVpZ2h0Ont0eXBlOk51bWJlcixkZWZhdWx0OjE4MH0sc3BlZWQ6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MzAwfSxkZWZhdWx0SW5kZXg6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH0sYXV0bzp7dHlwZTpOdW1iZXIsZGVmYXVsdDozZTN9LGNvbnRpbnVvdXM6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxzaG93SW5kaWNhdG9yczp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LG5vRHJhZ1doZW5TaW5nbGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxwcmV2ZW50Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX19LG1vdW50ZWQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucmVhZHk9ITAsdGhpcy5hdXRvPjAmJih0aGlzLnRpbWVyPXNldEludGVydmFsKGZ1bmN0aW9uKCl7aWYoIXQuY29udGludW91cyYmdC5pbmRleD49dC5wYWdlcy5sZW5ndGgtMSlyZXR1cm4gdC5jbGVhclRpbWVyKCk7dC5kcmFnZ2luZ3x8dC5hbmltYXRpbmd8fHQubmV4dCgpfSx0aGlzLmF1dG8pKSx0aGlzLnJlSW5pdFBhZ2VzKCk7dmFyIGU9dGhpcy4kZWw7ZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKGUpe3QucHJldmVudCYmZS5wcmV2ZW50RGVmYXVsdCgpLHQuYW5pbWF0aW5nfHwodC5kcmFnZ2luZz0hMCx0LnVzZXJTY3JvbGxpbmc9ITEsdC5vblRvdWNoU3RhcnQoZSkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsZnVuY3Rpb24oZSl7dC5kcmFnZ2luZyYmdC5vblRvdWNoTW92ZShlKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsZnVuY3Rpb24oZSl7aWYodC51c2VyU2Nyb2xsaW5nKXJldHVybiB0LmRyYWdnaW5nPSExLHZvaWQodC5kcmFnU3RhdGU9e30pO3QuZHJhZ2dpbmcmJih0Lm9uVG91Y2hFbmQoZSksdC5kcmFnZ2luZz0hMSl9KX0sbWV0aG9kczp7c3dpcGVJdGVtQ3JlYXRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeSYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnJlSW5pdFBhZ2VzKCl9LDEwMCkpfSxzd2lwZUl0ZW1EZXN0cm95ZWQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucmVhZHkmJihjbGVhclRpbWVvdXQodGhpcy5yZUluaXRUaW1lciksdGhpcy5yZUluaXRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5yZUluaXRQYWdlcygpfSwxMDApKX0sdHJhbnNsYXRlOmZ1bmN0aW9uKHQsZSxuLGkpe3ZhciBvPXRoaXMsdT1hcmd1bWVudHM7aWYobil7dGhpcy5hbmltYXRpbmc9ITAsdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiLXdlYmtpdC10cmFuc2Zvcm0gXCIrbitcIm1zIGVhc2UtaW4tb3V0XCIsc2V0VGltZW91dChmdW5jdGlvbigpe3Quc3R5bGUud2Via2l0VHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrZStcInB4LCAwLCAwKVwifSw1MCk7dmFyIGE9ITEscz1mdW5jdGlvbigpe2F8fChhPSEwLG8uYW5pbWF0aW5nPSExLHQuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cIlwiLHQuc3R5bGUud2Via2l0VHJhbnNmb3JtPVwiXCIsaSYmaS5hcHBseShvLHUpKX07T2JqZWN0KHIuYikodCxcIndlYmtpdFRyYW5zaXRpb25FbmRcIixzKSxzZXRUaW1lb3V0KHMsbisxMDApfWVsc2UgdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiXCIsdC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIitlK1wicHgsIDAsIDApXCJ9LHJlSW5pdFBhZ2VzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kY2hpbGRyZW47dGhpcy5ub0RyYWc9MT09PXQubGVuZ3RoJiZ0aGlzLm5vRHJhZ1doZW5TaW5nbGU7dmFyIGU9W10sbj1NYXRoLmZsb29yKHRoaXMuZGVmYXVsdEluZGV4KSxpPW4+PTAmJm48dC5sZW5ndGg/bjowO3RoaXMuaW5kZXg9aSx0LmZvckVhY2goZnVuY3Rpb24odCxuKXtlLnB1c2godC4kZWwpLE9iamVjdChyLmMpKHQuJGVsLFwiaXMtYWN0aXZlXCIpLG49PT1pJiZPYmplY3Qoci5hKSh0LiRlbCxcImlzLWFjdGl2ZVwiKX0pLHRoaXMucGFnZXM9ZX0sZG9BbmltYXRlOmZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcztpZigwIT09dGhpcy4kY2hpbGRyZW4ubGVuZ3RoJiYoZXx8ISh0aGlzLiRjaGlsZHJlbi5sZW5ndGg8MikpKXt2YXIgaT12b2lkIDAsbz12b2lkIDAsdT12b2lkIDAsYT12b2lkIDAscz12b2lkIDAsYz10aGlzLnNwZWVkfHwzMDAsZj10aGlzLmluZGV4LGw9dGhpcy5wYWdlcyxwPWwubGVuZ3RoO2U/KGk9ZS5wcmV2UGFnZSx1PWUuY3VycmVudFBhZ2Usbz1lLm5leHRQYWdlLGE9ZS5wYWdlV2lkdGgscz1lLm9mZnNldExlZnQpOihhPXRoaXMuJGVsLmNsaWVudFdpZHRoLHU9bFtmXSxpPWxbZi0xXSxvPWxbZisxXSx0aGlzLmNvbnRpbnVvdXMmJmwubGVuZ3RoPjEmJihpfHwoaT1sW2wubGVuZ3RoLTFdKSxvfHwobz1sWzBdKSksaSYmKGkuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsdGhpcy50cmFuc2xhdGUoaSwtYSkpLG8mJihvLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLHRoaXMudHJhbnNsYXRlKG8sYSkpKTt2YXIgaD12b2lkIDAsZD10aGlzLiRjaGlsZHJlbltmXS4kZWw7XCJwcmV2XCI9PT10PyhmPjAmJihoPWYtMSksdGhpcy5jb250aW51b3VzJiYwPT09ZiYmKGg9cC0xKSk6XCJuZXh0XCI9PT10JiYoZjxwLTEmJihoPWYrMSksdGhpcy5jb250aW51b3VzJiZmPT09cC0xJiYoaD0wKSk7dmFyIHY9ZnVuY3Rpb24oKXtpZih2b2lkIDAhPT1oKXt2YXIgdD1uLiRjaGlsZHJlbltoXS4kZWw7T2JqZWN0KHIuYykoZCxcImlzLWFjdGl2ZVwiKSxPYmplY3Qoci5hKSh0LFwiaXMtYWN0aXZlXCIpLG4uaW5kZXg9aH1pJiYoaS5zdHlsZS5kaXNwbGF5PVwiXCIpLG8mJihvLnN0eWxlLmRpc3BsYXk9XCJcIil9O3NldFRpbWVvdXQoZnVuY3Rpb24oKXtcIm5leHRcIj09PXQ/KG4udHJhbnNsYXRlKHUsLWEsYyx2KSxvJiZuLnRyYW5zbGF0ZShvLDAsYykpOlwicHJldlwiPT09dD8obi50cmFuc2xhdGUodSxhLGMsdiksaSYmbi50cmFuc2xhdGUoaSwwLGMpKToobi50cmFuc2xhdGUodSwwLGMsdiksdm9pZCAwIT09cz8oaSYmcz4wJiZuLnRyYW5zbGF0ZShpLC0xKmEsYyksbyYmczwwJiZuLnRyYW5zbGF0ZShvLGEsYykpOihpJiZuLnRyYW5zbGF0ZShpLC0xKmEsYyksbyYmbi50cmFuc2xhdGUobyxhLGMpKSl9LDEwKX19LG5leHQ6ZnVuY3Rpb24oKXt0aGlzLmRvQW5pbWF0ZShcIm5leHRcIil9LHByZXY6ZnVuY3Rpb24oKXt0aGlzLmRvQW5pbWF0ZShcInByZXZcIil9LG9uVG91Y2hTdGFydDpmdW5jdGlvbih0KXtpZighdGhpcy5ub0RyYWcpe3ZhciBlPXRoaXMuJGVsLG49dGhpcy5kcmFnU3RhdGUscj10LnRvdWNoZXNbMF07bi5zdGFydFRpbWU9bmV3IERhdGUsbi5zdGFydExlZnQ9ci5wYWdlWCxuLnN0YXJ0VG9wPXIucGFnZVksbi5zdGFydFRvcEFic29sdXRlPXIuY2xpZW50WSxuLnBhZ2VXaWR0aD1lLm9mZnNldFdpZHRoLG4ucGFnZUhlaWdodD1lLm9mZnNldEhlaWdodDt2YXIgaT10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4LTFdLG89dGhpcy4kY2hpbGRyZW5bdGhpcy5pbmRleF0sdT10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4KzFdO3RoaXMuY29udGludW91cyYmdGhpcy5wYWdlcy5sZW5ndGg+MSYmKGl8fChpPXRoaXMuJGNoaWxkcmVuW3RoaXMuJGNoaWxkcmVuLmxlbmd0aC0xXSksdXx8KHU9dGhpcy4kY2hpbGRyZW5bMF0pKSxuLnByZXZQYWdlPWk/aS4kZWw6bnVsbCxuLmRyYWdQYWdlPW8/by4kZWw6bnVsbCxuLm5leHRQYWdlPXU/dS4kZWw6bnVsbCxuLnByZXZQYWdlJiYobi5wcmV2UGFnZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIiksbi5uZXh0UGFnZSYmKG4ubmV4dFBhZ2Uuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIpfX0sb25Ub3VjaE1vdmU6ZnVuY3Rpb24odCl7aWYoIXRoaXMubm9EcmFnKXt2YXIgZT10aGlzLmRyYWdTdGF0ZSxuPXQudG91Y2hlc1swXTtlLmN1cnJlbnRMZWZ0PW4ucGFnZVgsZS5jdXJyZW50VG9wPW4ucGFnZVksZS5jdXJyZW50VG9wQWJzb2x1dGU9bi5jbGllbnRZO3ZhciByPWUuY3VycmVudExlZnQtZS5zdGFydExlZnQsaT1lLmN1cnJlbnRUb3BBYnNvbHV0ZS1lLnN0YXJ0VG9wQWJzb2x1dGUsbz1NYXRoLmFicyhyKSx1PU1hdGguYWJzKGkpO2lmKG88NXx8bz49NSYmdT49MS43MypvKXJldHVybiB2b2lkKHRoaXMudXNlclNjcm9sbGluZz0hMCk7dGhpcy51c2VyU2Nyb2xsaW5nPSExLHQucHJldmVudERlZmF1bHQoKSxyPU1hdGgubWluKE1hdGgubWF4KDEtZS5wYWdlV2lkdGgsciksZS5wYWdlV2lkdGgtMSk7dmFyIGE9cjwwP1wibmV4dFwiOlwicHJldlwiO2UucHJldlBhZ2UmJlwicHJldlwiPT09YSYmdGhpcy50cmFuc2xhdGUoZS5wcmV2UGFnZSxyLWUucGFnZVdpZHRoKSx0aGlzLnRyYW5zbGF0ZShlLmRyYWdQYWdlLHIpLGUubmV4dFBhZ2UmJlwibmV4dFwiPT09YSYmdGhpcy50cmFuc2xhdGUoZS5uZXh0UGFnZSxyK2UucGFnZVdpZHRoKX19LG9uVG91Y2hFbmQ6ZnVuY3Rpb24oKXtpZighdGhpcy5ub0RyYWcpe3ZhciB0PXRoaXMuZHJhZ1N0YXRlLGU9bmV3IERhdGUtdC5zdGFydFRpbWUsbj1udWxsLHI9dC5jdXJyZW50TGVmdC10LnN0YXJ0TGVmdCxpPXQuY3VycmVudFRvcC10LnN0YXJ0VG9wLG89dC5wYWdlV2lkdGgsdT10aGlzLmluZGV4LGE9dGhpcy5wYWdlcy5sZW5ndGg7aWYoZTwzMDApe3ZhciBzPU1hdGguYWJzKHIpPDUmJk1hdGguYWJzKGkpPDU7KGlzTmFOKHIpfHxpc05hTihpKSkmJihzPSEwKSxzJiZ0aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4XS4kZW1pdChcInRhcFwiKX1lPDMwMCYmdm9pZCAwPT09dC5jdXJyZW50TGVmdHx8KChlPDMwMHx8TWF0aC5hYnMocik+by8yKSYmKG49cjwwP1wibmV4dFwiOlwicHJldlwiKSx0aGlzLmNvbnRpbnVvdXN8fCgwPT09dSYmXCJwcmV2XCI9PT1ufHx1PT09YS0xJiZcIm5leHRcIj09PW4pJiYobj1udWxsKSx0aGlzLiRjaGlsZHJlbi5sZW5ndGg8MiYmKG49bnVsbCksdGhpcy5kb0FuaW1hdGUobix7b2Zmc2V0TGVmdDpyLHBhZ2VXaWR0aDp0LnBhZ2VXaWR0aCxwcmV2UGFnZTp0LnByZXZQYWdlLGN1cnJlbnRQYWdlOnQuZHJhZ1BhZ2UsbmV4dFBhZ2U6dC5uZXh0UGFnZX0pLHRoaXMuZHJhZ1N0YXRlPXt9KX19LGNsZWFyVGltZXI6ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKHRoaXMudGltZXIpLHRoaXMudGltZXI9bnVsbH19LGRlc3Ryb3llZDpmdW5jdGlvbigpe3RoaXMudGltZXImJihjbGVhckludGVydmFsKHRoaXMudGltZXIpLHRoaXMudGltZXI9bnVsbCksdGhpcy5yZUluaXRUaW1lciYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPW51bGwpfSx3YXRjaDp7aW5kZXg6ZnVuY3Rpb24odCl7dGhpcy4kZW1pdChcImNoYW5nZVwiLHQpfX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0LGUpe2lmKCF0fHwhZSlyZXR1cm4hMTtpZigtMSE9PWUuaW5kZXhPZihcIiBcIikpdGhyb3cgbmV3IEVycm9yKFwiY2xhc3NOYW1lIHNob3VsZCBub3QgY29udGFpbiBzcGFjZS5cIik7cmV0dXJuIHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LmNvbnRhaW5zKGUpOihcIiBcIit0LmNsYXNzTmFtZStcIiBcIikuaW5kZXhPZihcIiBcIitlK1wiIFwiKT4tMX1mdW5jdGlvbiBpKHQsZSl7aWYodCl7Zm9yKHZhciBuPXQuY2xhc3NOYW1lLGk9KGV8fFwiXCIpLnNwbGl0KFwiIFwiKSxvPTAsdT1pLmxlbmd0aDtvPHU7bysrKXt2YXIgYT1pW29dO2EmJih0LmNsYXNzTGlzdD90LmNsYXNzTGlzdC5hZGQoYSk6cih0LGEpfHwobis9XCIgXCIrYSkpfXQuY2xhc3NMaXN0fHwodC5jbGFzc05hbWU9bil9fWZ1bmN0aW9uIG8odCxlKXtpZih0JiZlKXtmb3IodmFyIG49ZS5zcGxpdChcIiBcIiksaT1cIiBcIit0LmNsYXNzTmFtZStcIiBcIixvPTAsdT1uLmxlbmd0aDtvPHU7bysrKXt2YXIgYT1uW29dO2EmJih0LmNsYXNzTGlzdD90LmNsYXNzTGlzdC5yZW1vdmUoYSk6cih0LGEpJiYoaT1pLnJlcGxhY2UoXCIgXCIrYStcIiBcIixcIiBcIikpKX10LmNsYXNzTGlzdHx8KHQuY2xhc3NOYW1lPWYoaSkpfX1uLmQoZSxcImJcIixmdW5jdGlvbigpe3JldHVybiBofSksZS5hPWksZS5jPW87dmFyIHU9big3NCksYT0obi5uKHUpLG4oMTEpKSxzPW4ubihhKSxjPXMuYS5wcm90b3R5cGUuJGlzU2VydmVyLGY9KGN8fE51bWJlcihkb2N1bWVudC5kb2N1bWVudE1vZGUpLGZ1bmN0aW9uKHQpe3JldHVybih0fHxcIlwiKS5yZXBsYWNlKC9eW1xcc1xcdUZFRkZdK3xbXFxzXFx1RkVGRl0rJC9nLFwiXCIpfSksbD1mdW5jdGlvbigpe3JldHVybiFjJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyP2Z1bmN0aW9uKHQsZSxuKXt0JiZlJiZuJiZ0LmFkZEV2ZW50TGlzdGVuZXIoZSxuLCExKX06ZnVuY3Rpb24odCxlLG4pe3QmJmUmJm4mJnQuYXR0YWNoRXZlbnQoXCJvblwiK2Usbil9fSgpLHA9ZnVuY3Rpb24oKXtyZXR1cm4hYyYmZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbih0LGUsbil7dCYmZSYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGUsbiwhMSl9OmZ1bmN0aW9uKHQsZSxuKXt0JiZlJiZ0LmRldGFjaEV2ZW50KFwib25cIitlLG4pfX0oKSxoPWZ1bmN0aW9uKHQsZSxuKXtsKHQsZSxmdW5jdGlvbiByKCl7biYmbi5hcHBseSh0aGlzLGFyZ3VtZW50cykscCh0LGUscil9KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LiRjcmVhdGVFbGVtZW50LG49dC5fc2VsZi5fY3x8ZTtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LXN3aXBlXCIsc3R5bGU6e2hlaWdodDp0LmhlaWdodCtcInB4XCJ9fSxbbihcImRpdlwiLHtyZWY6XCJ3cmFwcGVyXCIsc3RhdGljQ2xhc3M6XCJ3di1zd2lwZS13cmFwcGVyXCJ9LFt0Ll90KFwiZGVmYXVsdFwiKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC5zaG93SW5kaWNhdG9ycyxleHByZXNzaW9uOlwic2hvd0luZGljYXRvcnNcIn1dLHN0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaW5kaWNhdG9yc1wifSx0Ll9sKHQucGFnZXMsZnVuY3Rpb24oZSxyKXtyZXR1cm4gbihcImRpdlwiLHtrZXk6cixzdGF0aWNDbGFzczpcInd2LXN3aXBlLWluZGljYXRvclwiLGNsYXNzOntcImlzLWFjdGl2ZVwiOnI9PT10LmluZGV4fX0pfSkpXSl9LGk9W10sbz17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOml9O2UuYT1vfV0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMyA4IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NGYzN2VlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCIwOTMxNWNmMVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00NDRmMzdlZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9ob21lLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00NDRmMzdlZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9ob21lLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00NDRmMzdlZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWVcbi8vIG1vZHVsZSBpZCA9IDUwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5iYW5uZXItc3dpcGUtaXRlbVtkYXRhLXYtNDQ0ZjM3ZWVdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLmFkW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG4uYWQgaW1nW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB3aWR0aDogMTAwJTtcXG59XFxuLmFkIC5saW5rW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgICB6LWluZGV4OiAxMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICByaWdodDogMTBweDtcXG4gICAgdG9wOiAxMHB4O1xcbiAgICBjb2xvcjogI2ZmZjtcXG59XFxuLnByb2R1Y3QtbGlzdFtkYXRhLXYtNDQ0ZjM3ZWVdIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgICAgICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAtd2Via2l0LWJveC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAxMHB4IGF1dG8gNjVweDtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgICB3aWR0aDogY2FsYyg1MHZ3IC0gNHB4KTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWxbZGF0YS12LTQ0NGYzN2VlXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2lkdGg6IDEwMCU7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAubmFtZVtkYXRhLXYtNDQ0ZjM3ZWVdIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIGJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgICAgIGxpbmUtY2xhbXA6IDI7XFxuICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnByaWNlW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBhZGRpbmc6IC4yZW07XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGNvbG9yOiByZWQ7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9Db2RlL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0NBQUU7QUFFckI7RUFDRSxlQUFlO0VBQ2YsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixpQkFBaUI7Q0FBRTtBQUNuQjtJQUNFLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLFVBQVU7SUFDVixZQUFZO0NBQUU7QUFFbEI7RUFDRSxxQkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztFQUNkLCtCQUFvQjtFQUFwQiw4QkFBb0I7TUFBcEIsd0JBQW9CO1VBQXBCLG9CQUFvQjtFQUNwQiwwQkFBK0I7TUFBL0IsdUJBQStCO1VBQS9CLCtCQUErQjtFQUMvQixZQUFZO0VBQ1osdUJBQXVCO0NBQUU7QUFDekI7SUFDRSx3QkFBd0I7SUFDeEIsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQix1QkFBdUI7SUFDdkIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQix1QkFBdUI7Q0FBRTtBQUN6QjtNQUNFLGVBQWU7TUFDZixZQUFZO0NBQUU7QUFDaEI7TUFDRSxxQkFBcUI7TUFDckIsWUFBWTtNQUNaLGlCQUFpQjtNQUNqQix3QkFBd0I7TUFDeEIscUJBQXFCO01BQ3JCLGNBQWM7TUFDZCxzQkFBc0I7Q0FBRTtBQUMxQjtNQUNFLGVBQWU7TUFDZixjQUFjO01BQ2QsZ0JBQWdCO01BQ2hCLGtCQUFrQjtNQUNsQixXQUFXO01BQ1gsa0JBQWtCO0NBQUVcIixcImZpbGVcIjpcImhvbWUudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5iYW5uZXItc3dpcGUtaXRlbSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4uYWQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNjBweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtYXJnaW4tdG9wOiAxMHB4OyB9XFxuICAuYWQgaW1nIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgd2lkdGg6IDEwMCU7IH1cXG4gIC5hZCAubGluayB7XFxuICAgIHotaW5kZXg6IDEwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAxMHB4O1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGNvbG9yOiAjZmZmOyB9XFxuXFxuLnByb2R1Y3QtbGlzdCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAxMHB4IGF1dG8gNjVweDsgfVxcbiAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIHtcXG4gICAgd2lkdGg6IGNhbGMoNTB2dyAtIDRweCk7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IH1cXG4gICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAubmFtZSB7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgICAgY29sb3I6ICM0NDQ7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICBib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gICAgICBsaW5lLWNsYW1wOiAyO1xcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfVxcbiAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnByaWNlIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBwYWRkaW5nOiAuMmVtO1xcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICBjb2xvcjogcmVkO1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQ0NGYzN2VlXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTAiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1haW5cIj5cclxuICAgIDx3di1zd2lwZSA6aGVpZ2h0PVwiMTgwXCIgOmF1dG89XCI0MDAwXCI+XHJcbiAgICAgIDx3di1zd2lwZS1pdGVtIGNsYXNzPVwiYmFubmVyLXN3aXBlLWl0ZW1cIiB2LWZvcj1cImJhbm5lciBpbiBiYW5uZXJzXCIgOmtleT1cImJhbm5lci5pbmRleFwiPlxyXG4gICAgICAgIDxpbWcgOnNyYz1cImJhbm5lci5pbWdcIiBhbHQ9XCJcIj5cclxuICAgICAgPC93di1zd2lwZS1pdGVtPlxyXG4gICAgPC93di1zd2lwZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWRcIj5cclxuICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzE4LzA5LzMxL3ByYWlyaWUtNjc5MDE0X18zNDAuanBnXCIgYWx0PVwiXCIvPlxyXG4gICAgICA8cm91dGVyLWxpbmsgdG89XCJcIj7ljrvnnIvnnIs8L3JvdXRlci1saW5rPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtbGlzdFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1pdGVtXCIgdi1mb3I9XCJwcm9kdWN0IGluIHByb2R1Y3RzLmRhdGFcIj5cclxuICAgICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wcm9kdWN0LycgKyBwcm9kdWN0LmlkXCI+XHJcbiAgICAgICAgICA8aW1nIGNsYXNzPVwidGh1bWJuYWlsXCIgOnNyYz1cInByb2R1Y3QudGh1bWJuYWlsXCIgYWx0PVwiXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIiB2LXRleHQ9XCJwcm9kdWN0Lm5hbWVcIj48L3NwYW4+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiB2LWh0bWw9XCJwcm9kdWN0LnByaWNlXCI+PC9kaXY+XHJcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IHsgU3dpcGUsIFN3aXBlSXRlbSB9IGZyb20gJ3dlLXZ1ZSdcclxuXHJcbiAgY29uc3QgYmFubmVycyA9IFtcclxuICAgIHtcclxuICAgICAgdXJsOiAnamF2YXNjcmlwdDonLFxyXG4gICAgICBpbWc6ICdodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzE4LzA5LzMxL3ByYWlyaWUtNjc5MDE0X18zNDAuanBnJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdXJsOiAnamF2YXNjcmlwdDonLFxyXG4gICAgICBpbWc6ICdodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzE4LzA5LzI5L3RoZS1zY2VuZXJ5LTY3OTAxMV9fMzQwLmpwZydcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHVybDogJ2phdmFzY3JpcHQnLFxyXG4gICAgICBpbWc6ICdodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzI4LzE2LzQwL2xha2UtNjk2MDk4X18zNDAuanBnJ1xyXG4gICAgfVxyXG4gIF1cclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICBbU3dpcGUubmFtZV06IFN3aXBlLFxyXG4gICAgICBbU3dpcGVJdGVtLm5hbWVdOiBTd2lwZUl0ZW1cclxuICAgIH0sXHJcblxyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvZHVjdHM6IFtdLFxyXG4gICAgICAgIGJhbm5lcnNcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5nZXRQcm9kdWN0cygpXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZ2V0UHJvZHVjdHMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0JykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSByZXNwb25zZS5kYXRhLnByb2R1Y3RzXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLmJhbm5lci1zd2lwZS1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICB9XHJcblxyXG4gIC5hZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcblxyXG4gICAgaW1nIHtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcblxyXG4gICAgLmxpbmsge1xyXG4gICAgICB6LWluZGV4OiAxMDtcclxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICByaWdodDogMTBweDtcclxuICAgICAgdG9wOiAxMHB4O1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5wcm9kdWN0LWxpc3Qge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1hcmdpbjogMTBweCBhdXRvIDY1cHg7XHJcblxyXG4gICAgLnByb2R1Y3QtaXRlbSB7XHJcbiAgICAgIHdpZHRoOiBjYWxjKDUwdncgLSA0cHgpO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xyXG5cclxuICAgICAgLnRodW1ibmFpbCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5uYW1lIHtcclxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcclxuICAgICAgICBjb2xvcjogIzQ0NDtcclxuICAgICAgICBsaW5lLWhlaWdodDogMS4yO1xyXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xyXG4gICAgICAgIGJveC1vcmllbnQ6IHZlcnRpY2FsO1xyXG4gICAgICAgIGxpbmUtY2xhbXA6IDI7XHJcbiAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAucHJpY2Uge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIHBhZGRpbmc6IC4yZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWU/M2E5NzgyYTIiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJtYWluXCIgfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ3di1zd2lwZVwiLFxuICAgICAgICB7IGF0dHJzOiB7IGhlaWdodDogMTgwLCBhdXRvOiA0MDAwIH0gfSxcbiAgICAgICAgX3ZtLl9sKF92bS5iYW5uZXJzLCBmdW5jdGlvbihiYW5uZXIpIHtcbiAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICBcInd2LXN3aXBlLWl0ZW1cIixcbiAgICAgICAgICAgIHsga2V5OiBiYW5uZXIuaW5kZXgsIHN0YXRpY0NsYXNzOiBcImJhbm5lci1zd2lwZS1pdGVtXCIgfSxcbiAgICAgICAgICAgIFtfYyhcImltZ1wiLCB7IGF0dHJzOiB7IHNyYzogYmFubmVyLmltZywgYWx0OiBcIlwiIH0gfSldXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJhZFwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBzcmM6XG4gICAgICAgICAgICAgICAgXCJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzAzLzE4LzA5LzMxL3ByYWlyaWUtNjc5MDE0X18zNDAuanBnXCIsXG4gICAgICAgICAgICAgIGFsdDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJyb3V0ZXItbGlua1wiLCB7IGF0dHJzOiB7IHRvOiBcIlwiIH0gfSwgW192bS5fdihcIuWOu+eci+eci1wiKV0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1saXN0XCIgfSxcbiAgICAgICAgX3ZtLl9sKF92bS5wcm9kdWN0cy5kYXRhLCBmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1pdGVtXCIgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJyb3V0ZXItbGlua1wiLCB7IGF0dHJzOiB7IHRvOiBcIi9wcm9kdWN0L1wiICsgcHJvZHVjdC5pZCB9IH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogcHJvZHVjdC50aHVtYm5haWwsIGFsdDogXCJcIiB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhwcm9kdWN0Lm5hbWUpIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByaWNlXCIsXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhwcm9kdWN0LnByaWNlKSB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTQ0NGYzN2VlXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi00NDRmMzdlZVwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTAiXSwic291cmNlUm9vdCI6IiJ9