webpackJsonp([8],{

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(508)
}
var normalizeComponent = __webpack_require__(476)
/* script */
var __vue_script__ = __webpack_require__(510)
/* template */
var __vue_template__ = __webpack_require__(511)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
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
Component.options.__file = "resources\\assets\\js\\shop\\pages\\category.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b231f5e6", Component.options)
  } else {
    hotAPI.reload("data-v-b231f5e6", Component.options)
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

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filters: {
    priceFilter: function priceFilter(val) {
      return '￥' + Number(val).toFixed(2);
    }
  }
});

/***/ }),

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(509);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(475)("c43bf5ca", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b231f5e6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./category.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b231f5e6\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./category.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(117)(true);
// imports


// module
exports.push([module.i, "\n.left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll;\n}\n.left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6;\n}\n.left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red;\n}\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem;\n}\n.right-panel .product-list {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    width: 100%;\n    -webkit-column-count: 2;\n            column-count: 2;\n}\n.right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px;\n}\n.right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%;\n}\n.right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n.right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/category.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,iBAAiB;IACjB,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,iCAAiC;CAAE;AACnC;MACE,0BAA0B;MAC1B,WAAW;CAAE;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,UAAU;EACV,SAAS;EACT,OAAO;EACP,aAAa;EACb,cAAc;EACd,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,YAAY;IACZ,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,+BAAoB;IAApB,8BAAoB;QAApB,wBAAoB;YAApB,oBAAoB;IACpB,0BAA+B;QAA/B,uBAA+B;YAA/B,+BAA+B;IAC/B,YAAY;IACZ,wBAAgB;YAAhB,gBAAgB;CAAE;AAClB;MACE,aAAa;MACb,uBAAuB;MACvB,mBAAmB;CAAE;AACrB;QACE,eAAe;QACf,iBAAiB;QACjB,YAAY;CAAE;AAChB;QACE,gBAAgB;QAChB,YAAY;QACZ,iBAAiB;QACjB,wBAAwB;QACxB,oBAAoB;CAAE;AACxB;QACE,eAAe;QACf,YAAY;QACZ,gBAAgB;CAAE","file":"category.vue","sourcesContent":[".left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll; }\n  .left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6; }\n    .left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red; }\n\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll; }\n  .right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem; }\n  .right-panel .product-list {\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: space-between;\n    width: 100%;\n    column-count: 2; }\n    .right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px; }\n      .right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%; }\n      .right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap; }\n      .right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_price_filter__ = __webpack_require__(489);






var _components;

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

  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_price_filter__["a" /* default */]],

  data: function data() {
    return {
      categories: [],
      activeCategoryId: null,
      products: []
    };
  },
  mounted: function mounted() {
    this.getCategories();
  },


  methods: {
    getCategories: function getCategories() {
      var _this = this;

      this.axios.get('product-categories').then(function (response) {
        _this.categories = response.data.categories;

        _this.activeCategoryId = _this.categories[0].id;
      });
    },
    getProducts: function getProducts(categoryId) {
      var _this2 = this;

      this.axios.get('product', {
        params: {
          categoryId: categoryId
        }
      }).then(function (response) {
        _this2.products = response.data.products;
      }).catch(function (error) {
        console.log(error);
      });
    },
    sidebarItemClick: function sidebarItemClick(categoryId) {
      if (this.activeCategoryId !== categoryId) this.activeCategoryId = categoryId;
    }
  },

  watch: {
    activeCategoryId: function activeCategoryId(val) {
      this.getProducts(val);
    }
  }
});

/***/ }),

/***/ 511:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "left-sidebar" },
      _vm._l(_vm.categories, function(category) {
        return _c(
          "div",
          {
            key: category.id,
            staticClass: "sidebar-item",
            class: { active: category.id === _vm.activeCategoryId },
            on: {
              click: function($event) {
                _vm.sidebarItemClick(category.id)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(category.name) + "\n    ")]
        )
      })
    ),
    _vm._v(" "),
    _c("div", { staticClass: "right-panel" }, [
      _c("img", {
        staticClass: "banner",
        attrs: { src: "http://lorempixel.com/640/150/?28423", alt: "" }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.products.data, function(product) {
          return _c(
            "router-link",
            {
              key: product.id,
              staticClass: "product-item",
              attrs: { to: "/product/1" }
            },
            [
              _c("img", {
                staticClass: "thumbnail",
                attrs: { src: product.thumbnail, alt: "" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "name" }, [
                _vm._v(_vm._s(product.name))
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "price" }, [
                _vm._v(_vm._s(_vm._f("priceFilter")(product.price)))
              ])
            ]
          )
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b231f5e6", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9taXhpbnMvcHJpY2VfZmlsdGVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWU/MGU5NSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlPzFkNjciLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NhdGVnb3J5LnZ1ZT85NjM4Il0sIm5hbWVzIjpbImZpbHRlcnMiLCJwcmljZUZpbHRlciIsInZhbCIsIk51bWJlciIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXNNO0FBQ3RNO0FBQ0E7QUFDQTtBQUNBLDRDQUE0ZDtBQUM1ZDtBQUNBLDhDQUFtTDtBQUNuTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHdEQUF3RCxJQUFJOztBQUUzSTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQSxPQUFPLDhCQUE4QjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQStDO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsU0FBUyw4QkFBOEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsZUFBZTtBQUNmO0FBQ0EseUJBQXlCLHNCQUFzQjtBQUMvQztBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsdUJBQXVCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJqcy9zaG9wLWNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMjMxZjVlNlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vY2F0ZWdvcnkudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vY2F0ZWdvcnkudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1iMjMxZjVlNlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9jYXRlZ29yeS52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxwYWdlc1xcXFxjYXRlZ29yeS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyAgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHsgIGNvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWIyMzFmNWU2XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtYjIzMWY1ZTZcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4nICsgJyAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NhdGVnb3J5LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gOCIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcblxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI3Mil9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihhLnJlbmRlcj10LnJlbmRlcixhLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxhLl9jb21waWxlZD0hMCksbiYmKGEuZnVuY3Rpb25hbD0hMCksbyYmKGEuX3Njb3BlSWQ9byk7dmFyIGM7aWYoaT8oYz1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYS5fc3NyUmVnaXN0ZXI9Yyk6ciYmKGM9ciksYyl7dmFyIGQ9YS5mdW5jdGlvbmFsLHA9ZD9hLnJlbmRlcjphLmJlZm9yZUNyZWF0ZTtkPyhhLl9pbmplY3RTdHlsZXM9YyxhLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCkscChlLHQpfSk6YS5iZWZvcmVDcmVhdGU9cD9bXS5jb25jYXQocCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6YX19fSwyNzI6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjczKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMjczOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMjc0KX12YXIgbz1uKDI3NSksaT1uKDI3Nikscz1uKDApLHU9cixmPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LTVhZGNjZjZlXCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMjc0OmZ1bmN0aW9uKGUsdCl7fSwyNzU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LXN3aXBlLWl0ZW1cIixtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtQ3JlYXRlZCh0aGlzKX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtRGVzdHJveWVkKHRoaXMpfX19LDI3NjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3di1zd2lwZS1pdGVtXCJ9LFtlLl90KFwiZGVmYXVsdFwiKV0sMil9LG89W10saT17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOm99O3QuYT1pfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAzIDggMTAiLCIhZnVuY3Rpb24odCxlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJ2dWVcIikpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJ2dWVcIl0sZSk7ZWxzZXt2YXIgbj1lKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP3JlcXVpcmUoXCJ2dWVcIik6dC5WdWUpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOnQpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBpPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiB0W3JdLmNhbGwoaS5leHBvcnRzLGksaS5leHBvcnRzLGUpLGkubD0hMCxpLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUuZD1mdW5jdGlvbih0LG4scil7ZS5vKHQsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfSxlLnA9XCJcIixlKGUucz0yNjYpfShbZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4scixpLG8pe3ZhciB1LGE9dD10fHx7fSxzPXR5cGVvZiB0LmRlZmF1bHQ7XCJvYmplY3RcIiE9PXMmJlwiZnVuY3Rpb25cIiE9PXN8fCh1PXQsYT10LmRlZmF1bHQpO3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YS5vcHRpb25zOmE7ZSYmKGMucmVuZGVyPWUucmVuZGVyLGMuc3RhdGljUmVuZGVyRm5zPWUuc3RhdGljUmVuZGVyRm5zLGMuX2NvbXBpbGVkPSEwKSxuJiYoYy5mdW5jdGlvbmFsPSEwKSxpJiYoYy5fc2NvcGVJZD1pKTt2YXIgZjtpZihvPyhmPWZ1bmN0aW9uKHQpe3Q9dHx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LHR8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwodD1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyx0KSx0JiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cyYmdC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG8pfSxjLl9zc3JSZWdpc3Rlcj1mKTpyJiYoZj1yKSxmKXt2YXIgbD1jLmZ1bmN0aW9uYWwscD1sP2MucmVuZGVyOmMuYmVmb3JlQ3JlYXRlO2w/KGMuX2luamVjdFN0eWxlcz1mLGMucmVuZGVyPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGYuY2FsbChlKSxwKHQsZSl9KTpjLmJlZm9yZUNyZWF0ZT1wP1tdLmNvbmNhdChwLGYpOltmXX1yZXR1cm57ZXNNb2R1bGU6dSxleHBvcnRzOmEsb3B0aW9uczpjfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oNCkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOSksaT1uKDE3KSxvPW4oMTIpLHU9T2JqZWN0LmRlZmluZVByb3BlcnR5O2UuZj1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0eTpmdW5jdGlvbih0LGUsbil7aWYocih0KSxlPW8oZSwhMCkscihuKSxpKXRyeXtyZXR1cm4gdSh0LGUsbil9Y2F0Y2godCl7fWlmKFwiZ2V0XCJpbiBufHxcInNldFwiaW4gbil0aHJvdyBUeXBlRXJyb3IoXCJBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCFcIik7cmV0dXJuXCJ2YWx1ZVwiaW4gbiYmKHRbZV09bi52YWx1ZSksdH19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPXt2ZXJzaW9uOlwiMi41LjFcIn07XCJudW1iZXJcIj09dHlwZW9mIF9fZSYmKF9fZT1uKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNSksaT1uKDEwKTt0LmV4cG9ydHM9bigyKT9mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuZih0LGUsaSgxLG4pKX06ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLGk9big2KSxvPW4oMTMpLHU9big3KSxhPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcyxjLGYsbD10JmEuRixwPXQmYS5HLGg9dCZhLlMsZD10JmEuUCx2PXQmYS5CLHk9dCZhLlcsZz1wP2k6aVtlXXx8KGlbZV09e30pLG09Zy5wcm90b3R5cGUsYj1wP3I6aD9yW2VdOihyW2VdfHx7fSkucHJvdG90eXBlO3AmJihuPWUpO2ZvcihzIGluIG4pKGM9IWwmJmImJnZvaWQgMCE9PWJbc10pJiZzIGluIGd8fChmPWM/YltzXTpuW3NdLGdbc109cCYmXCJmdW5jdGlvblwiIT10eXBlb2YgYltzXT9uW3NdOnYmJmM/byhmLHIpOnkmJmJbc109PWY/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGUucHJvdG90eXBlPXQucHJvdG90eXBlLGV9KGYpOmQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/byhGdW5jdGlvbi5jYWxsLGYpOmYsZCYmKChnLnZpcnR1YWx8fChnLnZpcnR1YWw9e30pKVtzXT1mLHQmYS5SJiZtJiYhbVtzXSYmdShtLHMsZikpKX07YS5GPTEsYS5HPTIsYS5TPTQsYS5QPTgsYS5CPTE2LGEuVz0zMixhLlU9NjQsYS5SPTEyOCx0LmV4cG9ydHM9YX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbihlLG4pe2UuZXhwb3J0cz10fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtpZighcih0KSlyZXR1cm4gdDt2YXIgbixpO2lmKGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudmFsdWVPZikmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTtpZighZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIoaT1uLmNhbGwodCkpKXJldHVybiBpO3Rocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE0KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksdm9pZCAwPT09ZSlyZXR1cm4gdDtzd2l0Y2gobil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKGUsbil9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24obixyKXtyZXR1cm4gdC5jYWxsKGUsbixyKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsaSl7cmV0dXJuIHQuY2FsbChlLG4scixpKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkoZSxhcmd1bWVudHMpfX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgZnVuY3Rpb24hXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMyksaT1uKDEpLmRvY3VtZW50LG89cihpKSYmcihpLmNyZWF0ZUVsZW1lbnQpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbz9pLmNyZWF0ZUVsZW1lbnQodCk6e319fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NykoXCJ3a3NcIiksaT1uKDI1KSxvPW4oMSkuU3ltYm9sLHU9XCJmdW5jdGlvblwiPT10eXBlb2YgbzsodC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByW3RdfHwoclt0XT11JiZvW3RdfHwodT9vOmkpKFwiU3ltYm9sLlwiK3QpKX0pLnN0b3JlPXJ9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oMikmJiFuKDQpKGZ1bmN0aW9uKCl7cmV0dXJuIDchPU9iamVjdC5kZWZpbmVQcm9wZXJ0eShuKDE1KShcImRpdlwiKSxcImFcIix7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIDd9fSkuYX0pfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSwsZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oODApLGk9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiByKGkodCkpfX0sLCxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz17fX0sZnVuY3Rpb24odCxlKXt2YXIgbj0wLHI9TWF0aC5yYW5kb20oKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJTeW1ib2woXCIuY29uY2F0KHZvaWQgMD09PXQ/XCJcIjp0LFwiKV9cIiwoKytuK3IpLnRvU3RyaW5nKDM2KSl9fSwsZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ITB9LGZ1bmN0aW9uKHQsZSl7dmFyIG49e30udG9TdHJpbmc7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBuLmNhbGwodCkuc2xpY2UoOCwtMSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1KS5mLGk9bigxOSksbz1uKDE2KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIWkodD1uP3Q6dC5wcm90b3R5cGUsbykmJnIodCxvLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sLCwsLCwsLCwsLCwsLCxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxyPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/cjpuKSh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDYwKSxpPW4oNDgpO3QuZXhwb3J0cz1PYmplY3Qua2V5c3x8ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ3KShcImtleXNcIiksaT1uKDI1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPWkodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1yW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdfHwocltcIl9fY29yZS1qc19zaGFyZWRfX1wiXT17fSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpW3RdfHwoaVt0XT17fSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1cImNvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZlwiLnNwbGl0KFwiLFwiKX0sZnVuY3Rpb24odCxlLG4pe2UuZj1uKDE2KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1uKDYpLG89bigyNyksdT1uKDQ5KSxhPW4oNSkuZjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9aS5TeW1ib2x8fChpLlN5bWJvbD1vP3t9OnIuU3ltYm9sfHx7fSk7XCJfXCI9PXQuY2hhckF0KDApfHx0IGluIGV8fGEoZSx0LHt2YWx1ZTp1LmYodCl9KX19LGZ1bmN0aW9uKHQsZSl7ZS5mPXt9LnByb3BlcnR5SXNFbnVtZXJhYmxlfSwsLCwsLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDI3KSxpPW4oOCksbz1uKDU4KSx1PW4oNyksYT1uKDE5KSxzPW4oMjQpLGM9big3OCksZj1uKDI5KSxsPW4oODMpLHA9bigxNikoXCJpdGVyYXRvclwiKSxoPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksZD1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4sdix5LGcsbSl7YyhuLGUsdik7dmFyIGIseCxTLHc9ZnVuY3Rpb24odCl7aWYoIWgmJnQgaW4gUClyZXR1cm4gUFt0XTtzd2l0Y2godCl7Y2FzZVwia2V5c1wiOmNhc2VcInZhbHVlc1wiOnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19LF89ZStcIiBJdGVyYXRvclwiLFQ9XCJ2YWx1ZXNcIj09eSxPPSExLFA9dC5wcm90b3R5cGUsTD1QW3BdfHxQW1wiQEBpdGVyYXRvclwiXXx8eSYmUFt5XSxFPUx8fHcoeSksaj15P1Q/dyhcImVudHJpZXNcIik6RTp2b2lkIDAsTT1cIkFycmF5XCI9PWU/UC5lbnRyaWVzfHxMOkw7aWYoTSYmKFM9bChNLmNhbGwobmV3IHQpKSkhPT1PYmplY3QucHJvdG90eXBlJiZTLm5leHQmJihmKFMsXywhMCkscnx8YShTLHApfHx1KFMscCxkKSksVCYmTCYmXCJ2YWx1ZXNcIiE9PUwubmFtZSYmKE89ITAsRT1mdW5jdGlvbigpe3JldHVybiBMLmNhbGwodGhpcyl9KSxyJiYhbXx8IWgmJiFPJiZQW3BdfHx1KFAscCxFKSxzW2VdPUUsc1tfXT1kLHkpaWYoYj17dmFsdWVzOlQ/RTp3KFwidmFsdWVzXCIpLGtleXM6Zz9FOncoXCJrZXlzXCIpLGVudHJpZXM6an0sbSlmb3IoeCBpbiBiKXggaW4gUHx8byhQLHgsYlt4XSk7ZWxzZSBpKGkuUCtpLkYqKGh8fE8pLGUsYik7cmV0dXJuIGJ9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oNyl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDkpLGk9big3OSksbz1uKDQ4KSx1PW4oNDYpKFwiSUVfUFJPVE9cIiksYT1mdW5jdGlvbigpe30scz1mdW5jdGlvbigpe3ZhciB0LGU9bigxNSkoXCJpZnJhbWVcIikscj1vLmxlbmd0aDtmb3IoZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLG4oNjYpLmFwcGVuZENoaWxkKGUpLGUuc3JjPVwiamF2YXNjcmlwdDpcIix0PWUuY29udGVudFdpbmRvdy5kb2N1bWVudCx0Lm9wZW4oKSx0LndyaXRlKFwiPHNjcmlwdD5kb2N1bWVudC5GPU9iamVjdDxcXC9zY3JpcHQ+XCIpLHQuY2xvc2UoKSxzPXQuRjtyLS07KWRlbGV0ZSBzLnByb3RvdHlwZVtvW3JdXTtyZXR1cm4gcygpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KGEucHJvdG90eXBlPXIodCksbj1uZXcgYSxhLnByb3RvdHlwZT1udWxsLG5bdV09dCk6bj1zKCksdm9pZCAwPT09ZT9uOmkobixlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE5KSxpPW4oMjEpLG89big4MSkoITEpLHU9big0NikoXCJJRV9QUk9UT1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbixhPWkodCkscz0wLGM9W107Zm9yKG4gaW4gYSluIT11JiZyKGEsbikmJmMucHVzaChuKTtmb3IoO2UubGVuZ3RoPnM7KXIoYSxuPWVbcysrXSkmJih+byhjLG4pfHxjLnB1c2gobikpO3JldHVybiBjfX0sZnVuY3Rpb24odCxlKXtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc30sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNjApLGk9big0OCkuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LGkpfX0sLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDc3KSghMCk7big1NykoU3RyaW5nLFwiU3RyaW5nXCIsZnVuY3Rpb24odCl7dGhpcy5fdD1TdHJpbmcodCksdGhpcy5faT0wfSxmdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5fdCxuPXRoaXMuX2k7cmV0dXJuIG4+PWUubGVuZ3RoP3t2YWx1ZTp2b2lkIDAsZG9uZTohMH06KHQ9cihlLG4pLHRoaXMuX2krPXQubGVuZ3RoLHt2YWx1ZTp0LGRvbmU6ITF9KX0pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NCksaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9pKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLmRvY3VtZW50O3QuZXhwb3J0cz1yJiZyLmRvY3VtZW50RWxlbWVudH0sZnVuY3Rpb24odCxlLG4pe24oODUpO2Zvcih2YXIgcj1uKDEpLGk9big3KSxvPW4oMjQpLHU9bigxNikoXCJ0b1N0cmluZ1RhZ1wiKSxhPVwiQ1NTUnVsZUxpc3QsQ1NTU3R5bGVEZWNsYXJhdGlvbixDU1NWYWx1ZUxpc3QsQ2xpZW50UmVjdExpc3QsRE9NUmVjdExpc3QsRE9NU3RyaW5nTGlzdCxET01Ub2tlbkxpc3QsRGF0YVRyYW5zZmVySXRlbUxpc3QsRmlsZUxpc3QsSFRNTEFsbENvbGxlY3Rpb24sSFRNTENvbGxlY3Rpb24sSFRNTEZvcm1FbGVtZW50LEhUTUxTZWxlY3RFbGVtZW50LE1lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsU1ZHUGF0aFNlZ0xpc3QsU1ZHUG9pbnRMaXN0LFNWR1N0cmluZ0xpc3QsU1ZHVHJhbnNmb3JtTGlzdCxTb3VyY2VCdWZmZXJMaXN0LFN0eWxlU2hlZXRMaXN0LFRleHRUcmFja0N1ZUxpc3QsVGV4dFRyYWNrTGlzdCxUb3VjaExpc3RcIi5zcGxpdChcIixcIikscz0wO3M8YS5sZW5ndGg7cysrKXt2YXIgYz1hW3NdLGY9cltjXSxsPWYmJmYucHJvdG90eXBlO2wmJiFsW3VdJiZpKGwsdSxjKSxvW2NdPW8uQXJyYXl9fSxmdW5jdGlvbih0LGUpe30sLCwsLCxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZS5fX2VzTW9kdWxlPSEwO3ZhciBpPW4oNzUpLG89cihpKSx1PW4oODgpLGE9cih1KSxzPVwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmXCJzeW1ib2xcIj09dHlwZW9mIG8uZGVmYXVsdD9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1hLmRlZmF1bHQmJnQhPT1hLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9O2UuZGVmYXVsdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJlwic3ltYm9sXCI9PT1zKG8uZGVmYXVsdCk/ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXQ/XCJ1bmRlZmluZWRcIjpzKHQpfTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZ0LmNvbnN0cnVjdG9yPT09YS5kZWZhdWx0JiZ0IT09YS5kZWZhdWx0LnByb3RvdHlwZT9cInN5bWJvbFwiOnZvaWQgMD09PXQ/XCJ1bmRlZmluZWRcIjpzKHQpfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDc2KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oNjQpLG4oNjcpLHQuZXhwb3J0cz1uKDQ5KS5mKFwiaXRlcmF0b3JcIil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ0KSxpPW4oMTgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXt2YXIgbyx1LGE9U3RyaW5nKGkoZSkpLHM9cihuKSxjPWEubGVuZ3RoO3JldHVybiBzPDB8fHM+PWM/dD9cIlwiOnZvaWQgMDoobz1hLmNoYXJDb2RlQXQocyksbzw1NTI5Nnx8bz41NjMxOXx8cysxPT09Y3x8KHU9YS5jaGFyQ29kZUF0KHMrMSkpPDU2MzIwfHx1PjU3MzQzP3Q/YS5jaGFyQXQocyk6bzp0P2Euc2xpY2UocyxzKzIpOnUtNTYzMjArKG8tNTUyOTY8PDEwKSs2NTUzNil9fX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNTkpLGk9bigxMCksbz1uKDI5KSx1PXt9O24oNykodSxuKDE2KShcIml0ZXJhdG9yXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QucHJvdG90eXBlPXIodSx7bmV4dDppKDEsbil9KSxvKHQsZStcIiBJdGVyYXRvclwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUpLGk9big5KSxvPW4oNDUpO3QuZXhwb3J0cz1uKDIpP09iamVjdC5kZWZpbmVQcm9wZXJ0aWVzOmZ1bmN0aW9uKHQsZSl7aSh0KTtmb3IodmFyIG4sdT1vKGUpLGE9dS5sZW5ndGgscz0wO2E+czspci5mKHQsbj11W3MrK10sZVtuXSk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyOCk7dC5leHBvcnRzPU9iamVjdChcInpcIikucHJvcGVydHlJc0VudW1lcmFibGUoMCk/T2JqZWN0OmZ1bmN0aW9uKHQpe3JldHVyblwiU3RyaW5nXCI9PXIodCk/dC5zcGxpdChcIlwiKTpPYmplY3QodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDY1KSxvPW4oODIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuLHUpe3ZhciBhLHM9cihlKSxjPWkocy5sZW5ndGgpLGY9byh1LGMpO2lmKHQmJm4hPW4pe2Zvcig7Yz5mOylpZigoYT1zW2YrK10pIT1hKXJldHVybiEwfWVsc2UgZm9yKDtjPmY7ZisrKWlmKCh0fHxmIGluIHMpJiZzW2ZdPT09bilyZXR1cm4gdHx8Znx8MDtyZXR1cm4hdCYmLTF9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDQpLGk9TWF0aC5tYXgsbz1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD1yKHQpLHQ8MD9pKHQrZSwwKTpvKHQsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOSksaT1uKDg0KSxvPW4oNDYpKFwiSUVfUFJPVE9cIiksdT1PYmplY3QucHJvdG90eXBlO3QuZXhwb3J0cz1PYmplY3QuZ2V0UHJvdG90eXBlT2Z8fGZ1bmN0aW9uKHQpe3JldHVybiB0PWkodCkscih0LG8pP3Rbb106XCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb25zdHJ1Y3RvciYmdCBpbnN0YW5jZW9mIHQuY29uc3RydWN0b3I/dC5jb25zdHJ1Y3Rvci5wcm90b3R5cGU6dCBpbnN0YW5jZW9mIE9iamVjdD91Om51bGx9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBPYmplY3Qocih0KSl9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big4NiksaT1uKDg3KSxvPW4oMjQpLHU9bigyMSk7dC5leHBvcnRzPW4oNTcpKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9dSh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsaSgxKSk6XCJrZXlzXCI9PWU/aSgwLG4pOlwidmFsdWVzXCI9PWU/aSgwLHRbbl0pOmkoMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLG8uQXJndW1lbnRzPW8uQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e2RlZmF1bHQ6big4OSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDkwKSxuKDY4KSxuKDk2KSxuKDk3KSx0LmV4cG9ydHM9big2KS5TeW1ib2x9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEpLGk9bigxOSksbz1uKDIpLHU9big4KSxhPW4oNTgpLHM9big5MSkuS0VZLGM9big0KSxmPW4oNDcpLGw9bigyOSkscD1uKDI1KSxoPW4oMTYpLGQ9big0OSksdj1uKDUwKSx5PW4oOTIpLGc9big5MyksbT1uKDkpLGI9bigyMSkseD1uKDEyKSxTPW4oMTApLHc9big1OSksXz1uKDk0KSxUPW4oOTUpLE89big1KSxQPW4oNDUpLEw9VC5mLEU9Ty5mLGo9Xy5mLE09ci5TeW1ib2wsST1yLkpTT04sTj1JJiZJLnN0cmluZ2lmeSwkPWgoXCJfaGlkZGVuXCIpLGs9aChcInRvUHJpbWl0aXZlXCIpLEM9e30ucHJvcGVydHlJc0VudW1lcmFibGUsQT1mKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLEY9ZihcInN5bWJvbHNcIiksRD1mKFwib3Atc3ltYm9sc1wiKSxXPU9iamVjdC5wcm90b3R5cGUsUj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBNLFY9ci5RT2JqZWN0LEc9IVZ8fCFWLnByb3RvdHlwZXx8IVYucHJvdG90eXBlLmZpbmRDaGlsZCxCPW8mJmMoZnVuY3Rpb24oKXtyZXR1cm4gNyE9dyhFKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gRSh0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1MKFcsZSk7ciYmZGVsZXRlIFdbZV0sRSh0LGUsbiksciYmdCE9PVcmJkUoVyxlLHIpfTpFLEg9ZnVuY3Rpb24odCl7dmFyIGU9Rlt0XT13KE0ucHJvdG90eXBlKTtyZXR1cm4gZS5faz10LGV9LFk9UiYmXCJzeW1ib2xcIj09dHlwZW9mIE0uaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgTX0sSj1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9PT1XJiZKKEQsZSxuKSxtKHQpLGU9eChlLCEwKSxtKG4pLGkoRixlKT8obi5lbnVtZXJhYmxlPyhpKHQsJCkmJnRbJF1bZV0mJih0WyRdW2VdPSExKSxuPXcobix7ZW51bWVyYWJsZTpTKDAsITEpfSkpOihpKHQsJCl8fEUodCwkLFMoMSx7fSkpLHRbJF1bZV09ITApLEIodCxlLG4pKTpFKHQsZSxuKX0sWD1mdW5jdGlvbih0LGUpe20odCk7Zm9yKHZhciBuLHI9eShlPWIoZSkpLGk9MCxvPXIubGVuZ3RoO28+aTspSih0LG49cltpKytdLGVbbl0pO3JldHVybiB0fSxxPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHZvaWQgMD09PWU/dyh0KTpYKHcodCksZSl9LEs9ZnVuY3Rpb24odCl7dmFyIGU9Qy5jYWxsKHRoaXMsdD14KHQsITApKTtyZXR1cm4hKHRoaXM9PT1XJiZpKEYsdCkmJiFpKEQsdCkpJiYoIShlfHwhaSh0aGlzLHQpfHwhaShGLHQpfHxpKHRoaXMsJCkmJnRoaXNbJF1bdF0pfHxlKX0sVT1mdW5jdGlvbih0LGUpe2lmKHQ9Yih0KSxlPXgoZSwhMCksdCE9PVd8fCFpKEYsZSl8fGkoRCxlKSl7dmFyIG49TCh0LGUpO3JldHVybiFufHwhaShGLGUpfHxpKHQsJCkmJnRbJF1bZV18fChuLmVudW1lcmFibGU9ITApLG59fSx6PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPWooYih0KSkscj1bXSxvPTA7bi5sZW5ndGg+bzspaShGLGU9bltvKytdKXx8ZT09JHx8ZT09c3x8ci5wdXNoKGUpO3JldHVybiByfSxRPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1XLHI9aihuP0Q6Yih0KSksbz1bXSx1PTA7ci5sZW5ndGg+dTspIWkoRixlPXJbdSsrXSl8fG4mJiFpKFcsZSl8fG8ucHVzaChGW2VdKTtyZXR1cm4gb307Unx8KE09ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgTSl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PXAoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PVcmJmUuY2FsbChELG4pLGkodGhpcywkKSYmaSh0aGlzWyRdLHQpJiYodGhpc1skXVt0XT0hMSksQih0aGlzLHQsUygxLG4pKX07cmV0dXJuIG8mJkcmJkIoVyx0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxIKHQpfSxhKE0ucHJvdG90eXBlLFwidG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLl9rfSksVC5mPVUsTy5mPUosbig2MikuZj1fLmY9eixuKDUxKS5mPUssbig2MSkuZj1RLG8mJiFuKDI3KSYmYShXLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixLLCEwKSxkLmY9ZnVuY3Rpb24odCl7cmV0dXJuIEgoaCh0KSl9KSx1KHUuRyt1LlcrdS5GKiFSLHtTeW1ib2w6TX0pO2Zvcih2YXIgWj1cImhhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzXCIuc3BsaXQoXCIsXCIpLHR0PTA7Wi5sZW5ndGg+dHQ7KWgoWlt0dCsrXSk7Zm9yKHZhciBldD1QKGguc3RvcmUpLG50PTA7ZXQubGVuZ3RoPm50Oyl2KGV0W250KytdKTt1KHUuUyt1LkYqIVIsXCJTeW1ib2xcIix7Zm9yOmZ1bmN0aW9uKHQpe3JldHVybiBpKEEsdCs9XCJcIik/QVt0XTpBW3RdPU0odCl9LGtleUZvcjpmdW5jdGlvbih0KXtpZighWSh0KSl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBzeW1ib2whXCIpO2Zvcih2YXIgZSBpbiBBKWlmKEFbZV09PT10KXJldHVybiBlfSx1c2VTZXR0ZXI6ZnVuY3Rpb24oKXtHPSEwfSx1c2VTaW1wbGU6ZnVuY3Rpb24oKXtHPSExfX0pLHUodS5TK3UuRiohUixcIk9iamVjdFwiLHtjcmVhdGU6cSxkZWZpbmVQcm9wZXJ0eTpKLGRlZmluZVByb3BlcnRpZXM6WCxnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6VSxnZXRPd25Qcm9wZXJ0eU5hbWVzOnosZ2V0T3duUHJvcGVydHlTeW1ib2xzOlF9KSxJJiZ1KHUuUyt1LkYqKCFSfHxjKGZ1bmN0aW9uKCl7dmFyIHQ9TSgpO3JldHVyblwiW251bGxdXCIhPU4oW3RdKXx8XCJ7fVwiIT1OKHthOnR9KXx8XCJ7fVwiIT1OKE9iamVjdCh0KSl9KSksXCJKU09OXCIse3N0cmluZ2lmeTpmdW5jdGlvbih0KXtpZih2b2lkIDAhPT10JiYhWSh0KSl7Zm9yKHZhciBlLG4scj1bdF0saT0xO2FyZ3VtZW50cy5sZW5ndGg+aTspci5wdXNoKGFyZ3VtZW50c1tpKytdKTtyZXR1cm4gZT1yWzFdLFwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLCFuJiZnKGUpfHwoZT1mdW5jdGlvbih0LGUpe2lmKG4mJihlPW4uY2FsbCh0aGlzLHQsZSkpLCFZKGUpKXJldHVybiBlfSksclsxXT1lLE4uYXBwbHkoSSxyKX19fSksTS5wcm90b3R5cGVba118fG4oNykoTS5wcm90b3R5cGUsayxNLnByb3RvdHlwZS52YWx1ZU9mKSxsKE0sXCJTeW1ib2xcIiksbChNYXRoLFwiTWF0aFwiLCEwKSxsKHIuSlNPTixcIkpTT05cIiwhMCl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI1KShcIm1ldGFcIiksaT1uKDMpLG89bigxOSksdT1uKDUpLmYsYT0wLHM9T2JqZWN0LmlzRXh0ZW5zaWJsZXx8ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYz0hbig0KShmdW5jdGlvbigpe3JldHVybiBzKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpfSksZj1mdW5jdGlvbih0KXt1KHQscix7dmFsdWU6e2k6XCJPXCIrICsrYSx3Ont9fX0pfSxsPWZ1bmN0aW9uKHQsZSl7aWYoIWkodCkpcmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHQ/dDooXCJzdHJpbmdcIj09dHlwZW9mIHQ/XCJTXCI6XCJQXCIpK3Q7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuXCJGXCI7aWYoIWUpcmV0dXJuXCJFXCI7Zih0KX1yZXR1cm4gdFtyXS5pfSxwPWZ1bmN0aW9uKHQsZSl7aWYoIW8odCxyKSl7aWYoIXModCkpcmV0dXJuITA7aWYoIWUpcmV0dXJuITE7Zih0KX1yZXR1cm4gdFtyXS53fSxoPWZ1bmN0aW9uKHQpe3JldHVybiBjJiZkLk5FRUQmJnModCkmJiFvKHQscikmJmYodCksdH0sZD10LmV4cG9ydHM9e0tFWTpyLE5FRUQ6ITEsZmFzdEtleTpsLGdldFdlYWs6cCxvbkZyZWV6ZTpofX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDUpLGk9big2MSksbz1uKDUxKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9cih0KSxuPWkuZjtpZihuKWZvcih2YXIgdSxhPW4odCkscz1vLmYsYz0wO2EubGVuZ3RoPmM7KXMuY2FsbCh0LHU9YVtjKytdKSYmZS5wdXNoKHUpO3JldHVybiBlfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjgpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PXIodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMSksaT1uKDYyKS5mLG89e30udG9TdHJpbmcsdT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzP09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdyk6W10sYT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIGkodCl9Y2F0Y2godCl7cmV0dXJuIHUuc2xpY2UoKX19O3QuZXhwb3J0cy5mPWZ1bmN0aW9uKHQpe3JldHVybiB1JiZcIltvYmplY3QgV2luZG93XVwiPT1vLmNhbGwodCk/YSh0KTppKHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTEpLGk9bigxMCksbz1uKDIxKSx1PW4oMTIpLGE9bigxOSkscz1uKDE3KSxjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oMik/YzpmdW5jdGlvbih0LGUpe2lmKHQ9byh0KSxlPXUoZSwhMCkscyl0cnl7cmV0dXJuIGModCxlKX1jYXRjaCh0KXt9aWYoYSh0LGUpKXJldHVybiBpKCFyLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlLG4pe24oNTApKFwiYXN5bmNJdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe24oNTApKFwib2JzZXJ2YWJsZVwiKX0sLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjY3KTtuLmQoZSxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIodCl7bigyNjgpfXZhciBpPW4oMjY5KSxvPW4oMjcxKSx1PW4oMCksYT1yLHM9dShpLmEsby5hLCExLGEsXCJkYXRhLXYtNmUxMmJmYzZcIixudWxsKTtlLmE9cy5leHBvcnRzfSxmdW5jdGlvbih0LGUpe30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjcwKTtlLmE9e25hbWU6XCJ3di1zd2lwZVwiLGNyZWF0ZWQ6ZnVuY3Rpb24oKXt0aGlzLmRyYWdTdGF0ZT17fX0sZGF0YTpmdW5jdGlvbigpe3JldHVybntyZWFkeTohMSxkcmFnZ2luZzohMSx1c2VyU2Nyb2xsaW5nOiExLGFuaW1hdGluZzohMSxpbmRleDowLHBhZ2VzOltdLHRpbWVyOm51bGwscmVJbml0VGltZXI6bnVsbCxub0RyYWc6ITF9fSxwcm9wczp7aGVpZ2h0Ont0eXBlOk51bWJlcixkZWZhdWx0OjE4MH0sc3BlZWQ6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MzAwfSxkZWZhdWx0SW5kZXg6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH0sYXV0bzp7dHlwZTpOdW1iZXIsZGVmYXVsdDozZTN9LGNvbnRpbnVvdXM6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxzaG93SW5kaWNhdG9yczp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LG5vRHJhZ1doZW5TaW5nbGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSxwcmV2ZW50Ont0eXBlOkJvb2xlYW4sZGVmYXVsdDohMX19LG1vdW50ZWQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucmVhZHk9ITAsdGhpcy5hdXRvPjAmJih0aGlzLnRpbWVyPXNldEludGVydmFsKGZ1bmN0aW9uKCl7aWYoIXQuY29udGludW91cyYmdC5pbmRleD49dC5wYWdlcy5sZW5ndGgtMSlyZXR1cm4gdC5jbGVhclRpbWVyKCk7dC5kcmFnZ2luZ3x8dC5hbmltYXRpbmd8fHQubmV4dCgpfSx0aGlzLmF1dG8pKSx0aGlzLnJlSW5pdFBhZ2VzKCk7dmFyIGU9dGhpcy4kZWw7ZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKGUpe3QucHJldmVudCYmZS5wcmV2ZW50RGVmYXVsdCgpLHQuYW5pbWF0aW5nfHwodC5kcmFnZ2luZz0hMCx0LnVzZXJTY3JvbGxpbmc9ITEsdC5vblRvdWNoU3RhcnQoZSkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsZnVuY3Rpb24oZSl7dC5kcmFnZ2luZyYmdC5vblRvdWNoTW92ZShlKX0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsZnVuY3Rpb24oZSl7aWYodC51c2VyU2Nyb2xsaW5nKXJldHVybiB0LmRyYWdnaW5nPSExLHZvaWQodC5kcmFnU3RhdGU9e30pO3QuZHJhZ2dpbmcmJih0Lm9uVG91Y2hFbmQoZSksdC5kcmFnZ2luZz0hMSl9KX0sbWV0aG9kczp7c3dpcGVJdGVtQ3JlYXRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeSYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnJlSW5pdFBhZ2VzKCl9LDEwMCkpfSxzd2lwZUl0ZW1EZXN0cm95ZWQ6ZnVuY3Rpb24oKXt2YXIgdD10aGlzO3RoaXMucmVhZHkmJihjbGVhclRpbWVvdXQodGhpcy5yZUluaXRUaW1lciksdGhpcy5yZUluaXRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5yZUluaXRQYWdlcygpfSwxMDApKX0sdHJhbnNsYXRlOmZ1bmN0aW9uKHQsZSxuLGkpe3ZhciBvPXRoaXMsdT1hcmd1bWVudHM7aWYobil7dGhpcy5hbmltYXRpbmc9ITAsdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiLXdlYmtpdC10cmFuc2Zvcm0gXCIrbitcIm1zIGVhc2UtaW4tb3V0XCIsc2V0VGltZW91dChmdW5jdGlvbigpe3Quc3R5bGUud2Via2l0VHJhbnNmb3JtPVwidHJhbnNsYXRlM2QoXCIrZStcInB4LCAwLCAwKVwifSw1MCk7dmFyIGE9ITEscz1mdW5jdGlvbigpe2F8fChhPSEwLG8uYW5pbWF0aW5nPSExLHQuc3R5bGUud2Via2l0VHJhbnNpdGlvbj1cIlwiLHQuc3R5bGUud2Via2l0VHJhbnNmb3JtPVwiXCIsaSYmaS5hcHBseShvLHUpKX07T2JqZWN0KHIuYikodCxcIndlYmtpdFRyYW5zaXRpb25FbmRcIixzKSxzZXRUaW1lb3V0KHMsbisxMDApfWVsc2UgdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiXCIsdC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIitlK1wicHgsIDAsIDApXCJ9LHJlSW5pdFBhZ2VzOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kY2hpbGRyZW47dGhpcy5ub0RyYWc9MT09PXQubGVuZ3RoJiZ0aGlzLm5vRHJhZ1doZW5TaW5nbGU7dmFyIGU9W10sbj1NYXRoLmZsb29yKHRoaXMuZGVmYXVsdEluZGV4KSxpPW4+PTAmJm48dC5sZW5ndGg/bjowO3RoaXMuaW5kZXg9aSx0LmZvckVhY2goZnVuY3Rpb24odCxuKXtlLnB1c2godC4kZWwpLE9iamVjdChyLmMpKHQuJGVsLFwiaXMtYWN0aXZlXCIpLG49PT1pJiZPYmplY3Qoci5hKSh0LiRlbCxcImlzLWFjdGl2ZVwiKX0pLHRoaXMucGFnZXM9ZX0sZG9BbmltYXRlOmZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcztpZigwIT09dGhpcy4kY2hpbGRyZW4ubGVuZ3RoJiYoZXx8ISh0aGlzLiRjaGlsZHJlbi5sZW5ndGg8MikpKXt2YXIgaT12b2lkIDAsbz12b2lkIDAsdT12b2lkIDAsYT12b2lkIDAscz12b2lkIDAsYz10aGlzLnNwZWVkfHwzMDAsZj10aGlzLmluZGV4LGw9dGhpcy5wYWdlcyxwPWwubGVuZ3RoO2U/KGk9ZS5wcmV2UGFnZSx1PWUuY3VycmVudFBhZ2Usbz1lLm5leHRQYWdlLGE9ZS5wYWdlV2lkdGgscz1lLm9mZnNldExlZnQpOihhPXRoaXMuJGVsLmNsaWVudFdpZHRoLHU9bFtmXSxpPWxbZi0xXSxvPWxbZisxXSx0aGlzLmNvbnRpbnVvdXMmJmwubGVuZ3RoPjEmJihpfHwoaT1sW2wubGVuZ3RoLTFdKSxvfHwobz1sWzBdKSksaSYmKGkuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsdGhpcy50cmFuc2xhdGUoaSwtYSkpLG8mJihvLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLHRoaXMudHJhbnNsYXRlKG8sYSkpKTt2YXIgaD12b2lkIDAsZD10aGlzLiRjaGlsZHJlbltmXS4kZWw7XCJwcmV2XCI9PT10PyhmPjAmJihoPWYtMSksdGhpcy5jb250aW51b3VzJiYwPT09ZiYmKGg9cC0xKSk6XCJuZXh0XCI9PT10JiYoZjxwLTEmJihoPWYrMSksdGhpcy5jb250aW51b3VzJiZmPT09cC0xJiYoaD0wKSk7dmFyIHY9ZnVuY3Rpb24oKXtpZih2b2lkIDAhPT1oKXt2YXIgdD1uLiRjaGlsZHJlbltoXS4kZWw7T2JqZWN0KHIuYykoZCxcImlzLWFjdGl2ZVwiKSxPYmplY3Qoci5hKSh0LFwiaXMtYWN0aXZlXCIpLG4uaW5kZXg9aH1pJiYoaS5zdHlsZS5kaXNwbGF5PVwiXCIpLG8mJihvLnN0eWxlLmRpc3BsYXk9XCJcIil9O3NldFRpbWVvdXQoZnVuY3Rpb24oKXtcIm5leHRcIj09PXQ/KG4udHJhbnNsYXRlKHUsLWEsYyx2KSxvJiZuLnRyYW5zbGF0ZShvLDAsYykpOlwicHJldlwiPT09dD8obi50cmFuc2xhdGUodSxhLGMsdiksaSYmbi50cmFuc2xhdGUoaSwwLGMpKToobi50cmFuc2xhdGUodSwwLGMsdiksdm9pZCAwIT09cz8oaSYmcz4wJiZuLnRyYW5zbGF0ZShpLC0xKmEsYyksbyYmczwwJiZuLnRyYW5zbGF0ZShvLGEsYykpOihpJiZuLnRyYW5zbGF0ZShpLC0xKmEsYyksbyYmbi50cmFuc2xhdGUobyxhLGMpKSl9LDEwKX19LG5leHQ6ZnVuY3Rpb24oKXt0aGlzLmRvQW5pbWF0ZShcIm5leHRcIil9LHByZXY6ZnVuY3Rpb24oKXt0aGlzLmRvQW5pbWF0ZShcInByZXZcIil9LG9uVG91Y2hTdGFydDpmdW5jdGlvbih0KXtpZighdGhpcy5ub0RyYWcpe3ZhciBlPXRoaXMuJGVsLG49dGhpcy5kcmFnU3RhdGUscj10LnRvdWNoZXNbMF07bi5zdGFydFRpbWU9bmV3IERhdGUsbi5zdGFydExlZnQ9ci5wYWdlWCxuLnN0YXJ0VG9wPXIucGFnZVksbi5zdGFydFRvcEFic29sdXRlPXIuY2xpZW50WSxuLnBhZ2VXaWR0aD1lLm9mZnNldFdpZHRoLG4ucGFnZUhlaWdodD1lLm9mZnNldEhlaWdodDt2YXIgaT10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4LTFdLG89dGhpcy4kY2hpbGRyZW5bdGhpcy5pbmRleF0sdT10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4KzFdO3RoaXMuY29udGludW91cyYmdGhpcy5wYWdlcy5sZW5ndGg+MSYmKGl8fChpPXRoaXMuJGNoaWxkcmVuW3RoaXMuJGNoaWxkcmVuLmxlbmd0aC0xXSksdXx8KHU9dGhpcy4kY2hpbGRyZW5bMF0pKSxuLnByZXZQYWdlPWk/aS4kZWw6bnVsbCxuLmRyYWdQYWdlPW8/by4kZWw6bnVsbCxuLm5leHRQYWdlPXU/dS4kZWw6bnVsbCxuLnByZXZQYWdlJiYobi5wcmV2UGFnZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIiksbi5uZXh0UGFnZSYmKG4ubmV4dFBhZ2Uuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIpfX0sb25Ub3VjaE1vdmU6ZnVuY3Rpb24odCl7aWYoIXRoaXMubm9EcmFnKXt2YXIgZT10aGlzLmRyYWdTdGF0ZSxuPXQudG91Y2hlc1swXTtlLmN1cnJlbnRMZWZ0PW4ucGFnZVgsZS5jdXJyZW50VG9wPW4ucGFnZVksZS5jdXJyZW50VG9wQWJzb2x1dGU9bi5jbGllbnRZO3ZhciByPWUuY3VycmVudExlZnQtZS5zdGFydExlZnQsaT1lLmN1cnJlbnRUb3BBYnNvbHV0ZS1lLnN0YXJ0VG9wQWJzb2x1dGUsbz1NYXRoLmFicyhyKSx1PU1hdGguYWJzKGkpO2lmKG88NXx8bz49NSYmdT49MS43MypvKXJldHVybiB2b2lkKHRoaXMudXNlclNjcm9sbGluZz0hMCk7dGhpcy51c2VyU2Nyb2xsaW5nPSExLHQucHJldmVudERlZmF1bHQoKSxyPU1hdGgubWluKE1hdGgubWF4KDEtZS5wYWdlV2lkdGgsciksZS5wYWdlV2lkdGgtMSk7dmFyIGE9cjwwP1wibmV4dFwiOlwicHJldlwiO2UucHJldlBhZ2UmJlwicHJldlwiPT09YSYmdGhpcy50cmFuc2xhdGUoZS5wcmV2UGFnZSxyLWUucGFnZVdpZHRoKSx0aGlzLnRyYW5zbGF0ZShlLmRyYWdQYWdlLHIpLGUubmV4dFBhZ2UmJlwibmV4dFwiPT09YSYmdGhpcy50cmFuc2xhdGUoZS5uZXh0UGFnZSxyK2UucGFnZVdpZHRoKX19LG9uVG91Y2hFbmQ6ZnVuY3Rpb24oKXtpZighdGhpcy5ub0RyYWcpe3ZhciB0PXRoaXMuZHJhZ1N0YXRlLGU9bmV3IERhdGUtdC5zdGFydFRpbWUsbj1udWxsLHI9dC5jdXJyZW50TGVmdC10LnN0YXJ0TGVmdCxpPXQuY3VycmVudFRvcC10LnN0YXJ0VG9wLG89dC5wYWdlV2lkdGgsdT10aGlzLmluZGV4LGE9dGhpcy5wYWdlcy5sZW5ndGg7aWYoZTwzMDApe3ZhciBzPU1hdGguYWJzKHIpPDUmJk1hdGguYWJzKGkpPDU7KGlzTmFOKHIpfHxpc05hTihpKSkmJihzPSEwKSxzJiZ0aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4XS4kZW1pdChcInRhcFwiKX1lPDMwMCYmdm9pZCAwPT09dC5jdXJyZW50TGVmdHx8KChlPDMwMHx8TWF0aC5hYnMocik+by8yKSYmKG49cjwwP1wibmV4dFwiOlwicHJldlwiKSx0aGlzLmNvbnRpbnVvdXN8fCgwPT09dSYmXCJwcmV2XCI9PT1ufHx1PT09YS0xJiZcIm5leHRcIj09PW4pJiYobj1udWxsKSx0aGlzLiRjaGlsZHJlbi5sZW5ndGg8MiYmKG49bnVsbCksdGhpcy5kb0FuaW1hdGUobix7b2Zmc2V0TGVmdDpyLHBhZ2VXaWR0aDp0LnBhZ2VXaWR0aCxwcmV2UGFnZTp0LnByZXZQYWdlLGN1cnJlbnRQYWdlOnQuZHJhZ1BhZ2UsbmV4dFBhZ2U6dC5uZXh0UGFnZX0pLHRoaXMuZHJhZ1N0YXRlPXt9KX19LGNsZWFyVGltZXI6ZnVuY3Rpb24oKXtjbGVhckludGVydmFsKHRoaXMudGltZXIpLHRoaXMudGltZXI9bnVsbH19LGRlc3Ryb3llZDpmdW5jdGlvbigpe3RoaXMudGltZXImJihjbGVhckludGVydmFsKHRoaXMudGltZXIpLHRoaXMudGltZXI9bnVsbCksdGhpcy5yZUluaXRUaW1lciYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPW51bGwpfSx3YXRjaDp7aW5kZXg6ZnVuY3Rpb24odCl7dGhpcy4kZW1pdChcImNoYW5nZVwiLHQpfX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0LGUpe2lmKCF0fHwhZSlyZXR1cm4hMTtpZigtMSE9PWUuaW5kZXhPZihcIiBcIikpdGhyb3cgbmV3IEVycm9yKFwiY2xhc3NOYW1lIHNob3VsZCBub3QgY29udGFpbiBzcGFjZS5cIik7cmV0dXJuIHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LmNvbnRhaW5zKGUpOihcIiBcIit0LmNsYXNzTmFtZStcIiBcIikuaW5kZXhPZihcIiBcIitlK1wiIFwiKT4tMX1mdW5jdGlvbiBpKHQsZSl7aWYodCl7Zm9yKHZhciBuPXQuY2xhc3NOYW1lLGk9KGV8fFwiXCIpLnNwbGl0KFwiIFwiKSxvPTAsdT1pLmxlbmd0aDtvPHU7bysrKXt2YXIgYT1pW29dO2EmJih0LmNsYXNzTGlzdD90LmNsYXNzTGlzdC5hZGQoYSk6cih0LGEpfHwobis9XCIgXCIrYSkpfXQuY2xhc3NMaXN0fHwodC5jbGFzc05hbWU9bil9fWZ1bmN0aW9uIG8odCxlKXtpZih0JiZlKXtmb3IodmFyIG49ZS5zcGxpdChcIiBcIiksaT1cIiBcIit0LmNsYXNzTmFtZStcIiBcIixvPTAsdT1uLmxlbmd0aDtvPHU7bysrKXt2YXIgYT1uW29dO2EmJih0LmNsYXNzTGlzdD90LmNsYXNzTGlzdC5yZW1vdmUoYSk6cih0LGEpJiYoaT1pLnJlcGxhY2UoXCIgXCIrYStcIiBcIixcIiBcIikpKX10LmNsYXNzTGlzdHx8KHQuY2xhc3NOYW1lPWYoaSkpfX1uLmQoZSxcImJcIixmdW5jdGlvbigpe3JldHVybiBofSksZS5hPWksZS5jPW87dmFyIHU9big3NCksYT0obi5uKHUpLG4oMTEpKSxzPW4ubihhKSxjPXMuYS5wcm90b3R5cGUuJGlzU2VydmVyLGY9KGN8fE51bWJlcihkb2N1bWVudC5kb2N1bWVudE1vZGUpLGZ1bmN0aW9uKHQpe3JldHVybih0fHxcIlwiKS5yZXBsYWNlKC9eW1xcc1xcdUZFRkZdK3xbXFxzXFx1RkVGRl0rJC9nLFwiXCIpfSksbD1mdW5jdGlvbigpe3JldHVybiFjJiZkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyP2Z1bmN0aW9uKHQsZSxuKXt0JiZlJiZuJiZ0LmFkZEV2ZW50TGlzdGVuZXIoZSxuLCExKX06ZnVuY3Rpb24odCxlLG4pe3QmJmUmJm4mJnQuYXR0YWNoRXZlbnQoXCJvblwiK2Usbil9fSgpLHA9ZnVuY3Rpb24oKXtyZXR1cm4hYyYmZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbih0LGUsbil7dCYmZSYmdC5yZW1vdmVFdmVudExpc3RlbmVyKGUsbiwhMSl9OmZ1bmN0aW9uKHQsZSxuKXt0JiZlJiZ0LmRldGFjaEV2ZW50KFwib25cIitlLG4pfX0oKSxoPWZ1bmN0aW9uKHQsZSxuKXtsKHQsZSxmdW5jdGlvbiByKCl7biYmbi5hcHBseSh0aGlzLGFyZ3VtZW50cykscCh0LGUscil9KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LiRjcmVhdGVFbGVtZW50LG49dC5fc2VsZi5fY3x8ZTtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LXN3aXBlXCIsc3R5bGU6e2hlaWdodDp0LmhlaWdodCtcInB4XCJ9fSxbbihcImRpdlwiLHtyZWY6XCJ3cmFwcGVyXCIsc3RhdGljQ2xhc3M6XCJ3di1zd2lwZS13cmFwcGVyXCJ9LFt0Ll90KFwiZGVmYXVsdFwiKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC5zaG93SW5kaWNhdG9ycyxleHByZXNzaW9uOlwic2hvd0luZGljYXRvcnNcIn1dLHN0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaW5kaWNhdG9yc1wifSx0Ll9sKHQucGFnZXMsZnVuY3Rpb24oZSxyKXtyZXR1cm4gbihcImRpdlwiLHtrZXk6cixzdGF0aWNDbGFzczpcInd2LXN3aXBlLWluZGljYXRvclwiLGNsYXNzOntcImlzLWFjdGl2ZVwiOnI9PT10LmluZGV4fX0pfSkpXSl9LGk9W10sbz17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOml9O2UuYT1vfV0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMyA4IDEwIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGZpbHRlcnM6IHtcclxuICAgIHByaWNlRmlsdGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiAn77+lJyArIE51bWJlcih2YWwpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9wcmljZV9maWx0ZXIuanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYjIzMWY1ZTZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2NhdGVnb3J5LnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiYzQzYmY1Y2FcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtYjIzMWY1ZTZcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2NhdGVnb3J5LnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1iMjMxZjVlNlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vY2F0ZWdvcnkudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWIyMzFmNWU2XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlXG4vLyBtb2R1bGUgaWQgPSA1MDhcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5sZWZ0LXNpZGViYXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgd2lkdGg6IDVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB6LWluZGV4OiAyMDA7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxufVxcbi5sZWZ0LXNpZGViYXIgLnNpZGViYXItaXRlbSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDFlbSAwO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2O1xcbn1cXG4ubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0uYWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbiAgICAgIGNvbG9yOiByZWQ7XFxufVxcbi5yaWdodC1wYW5lbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDVlbTtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgcGFkZGluZzogLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxufVxcbi5yaWdodC1wYW5lbCAuYmFubmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCB7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLXdlYmtpdC1ib3gtb3JpZW50OiBob3Jpem9udGFsO1xcbiAgICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAgIC1tcy1mbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgICAgICAgICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBqdXN0aWZ5O1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIC13ZWJraXQtY29sdW1uLWNvdW50OiAyO1xcbiAgICAgICAgICAgIGNvbHVtbi1jb3VudDogMjtcXG59XFxuLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSB7XFxuICAgICAgd2lkdGg6IDQ5LjUlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxufVxcbi5yaWdodC1wYW5lbCAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLm5hbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgY29sb3I6ICM0NDQ7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5wcmljZSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGNvbG9yOiAjZjAwO1xcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovQ29kZS93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsT0FBTztFQUNQLFFBQVE7RUFDUixhQUFhO0VBQ2IsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsbUJBQW1CO0NBQUU7QUFDckI7SUFDRSxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlDQUFpQztDQUFFO0FBQ25DO01BQ0UsMEJBQTBCO01BQzFCLFdBQVc7Q0FBRTtBQUVuQjtFQUNFLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFNBQVM7RUFDVCxPQUFPO0VBQ1AsYUFBYTtFQUNiLGNBQWM7RUFDZCwwQkFBMEI7RUFDMUIsbUJBQW1CO0VBQ25CLG1CQUFtQjtDQUFFO0FBQ3JCO0lBQ0UsZUFBZTtJQUNmLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsb0JBQW9CO0NBQUU7QUFDeEI7SUFDRSxxQkFBYztJQUFkLHFCQUFjO0lBQWQsY0FBYztJQUNkLCtCQUFvQjtJQUFwQiw4QkFBb0I7UUFBcEIsd0JBQW9CO1lBQXBCLG9CQUFvQjtJQUNwQiwwQkFBK0I7UUFBL0IsdUJBQStCO1lBQS9CLCtCQUErQjtJQUMvQixZQUFZO0lBQ1osd0JBQWdCO1lBQWhCLGdCQUFnQjtDQUFFO0FBQ2xCO01BQ0UsYUFBYTtNQUNiLHVCQUF1QjtNQUN2QixtQkFBbUI7Q0FBRTtBQUNyQjtRQUNFLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsWUFBWTtDQUFFO0FBQ2hCO1FBQ0UsZ0JBQWdCO1FBQ2hCLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLG9CQUFvQjtDQUFFO0FBQ3hCO1FBQ0UsZUFBZTtRQUNmLFlBQVk7UUFDWixnQkFBZ0I7Q0FBRVwiLFwiZmlsZVwiOlwiY2F0ZWdvcnkudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5sZWZ0LXNpZGViYXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgd2lkdGg6IDVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB6LWluZGV4OiAyMDA7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7IH1cXG4gIC5sZWZ0LXNpZGViYXIgLnNpZGViYXItaXRlbSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDFlbSAwO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2OyB9XFxuICAgIC5sZWZ0LXNpZGViYXIgLnNpZGViYXItaXRlbS5hY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XFxuICAgICAgY29sb3I6IHJlZDsgfVxcblxcbi5yaWdodC1wYW5lbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDVlbTtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgcGFkZGluZzogLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7IH1cXG4gIC5yaWdodC1wYW5lbCAuYmFubmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtOyB9XFxuICAucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGNvbHVtbi1jb3VudDogMjsgfVxcbiAgICAucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIHtcXG4gICAgICB3aWR0aDogNDkuNSU7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgICBtYXJnaW4tYm90dG9tOiA1cHg7IH1cXG4gICAgICAucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gICAgICAucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5uYW1lIHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsgfVxcbiAgICAgIC5yaWdodC1wYW5lbCAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnByaWNlIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgY29sb3I6ICNmMDA7XFxuICAgICAgICBmb250LXNpemU6IDEzcHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtYjIzMWY1ZTZcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWVcbi8vIG1vZHVsZSBpZCA9IDUwOVxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXNpZGViYXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItaXRlbVwiIDpjbGFzcz1cInsgJ2FjdGl2ZSc6IGNhdGVnb3J5LmlkID09PSBhY3RpdmVDYXRlZ29yeUlkIH1cIlxyXG4gICAgICAgICAgIHYtZm9yPVwiY2F0ZWdvcnkgaW4gY2F0ZWdvcmllc1wiIDprZXk9XCJjYXRlZ29yeS5pZFwiIEBjbGljaz1cInNpZGViYXJJdGVtQ2xpY2soY2F0ZWdvcnkuaWQpXCI+XHJcbiAgICAgICAge3sgY2F0ZWdvcnkubmFtZSB9fVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJyaWdodC1wYW5lbFwiPlxyXG4gICAgICA8aW1nIGNsYXNzPVwiYmFubmVyXCIgc3JjPVwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC8xNTAvPzI4NDIzXCIgYWx0PVwiXCIvPlxyXG5cclxuICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtbGlzdFwiPlxyXG4gICAgICAgIDxyb3V0ZXItbGluayBjbGFzcz1cInByb2R1Y3QtaXRlbVwiIHRvPVwiL3Byb2R1Y3QvMVwiIHYtZm9yPVwicHJvZHVjdCBpbiBwcm9kdWN0cy5kYXRhXCIgOmtleT1cInByb2R1Y3QuaWRcIj5cclxuICAgICAgICAgIDxpbWcgOnNyYz1cInByb2R1Y3QudGh1bWJuYWlsXCIgYWx0PVwiXCIgY2xhc3M9XCJ0aHVtYm5haWxcIi8+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZVwiPnt7IHByb2R1Y3QubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+e3sgcHJvZHVjdC5wcmljZSB8IHByaWNlRmlsdGVyIH19PC9kaXY+XHJcbiAgICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IHsgU3dpcGUsIFN3aXBlSXRlbSB9IGZyb20gJ3dlLXZ1ZSdcclxuICBpbXBvcnQgcHJpY2VNaXhpbiBmcm9tICcuLi9taXhpbnMvcHJpY2VfZmlsdGVyJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtTd2lwZS5uYW1lXTogU3dpcGUsXHJcbiAgICAgIFtTd2lwZUl0ZW0ubmFtZV06IFN3aXBlSXRlbVxyXG4gICAgfSxcclxuXHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgcHJpY2VNaXhpblxyXG4gICAgXSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzOiBbXSxcclxuICAgICAgICBhY3RpdmVDYXRlZ29yeUlkOiBudWxsLFxyXG4gICAgICAgIHByb2R1Y3RzOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmdldENhdGVnb3JpZXMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldENhdGVnb3JpZXMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0LWNhdGVnb3JpZXMnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5jYXRlZ29yaWVzID0gcmVzcG9uc2UuZGF0YS5jYXRlZ29yaWVzXHJcblxyXG4gICAgICAgICAgdGhpcy5hY3RpdmVDYXRlZ29yeUlkID0gdGhpcy5jYXRlZ29yaWVzWzBdLmlkXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGdldFByb2R1Y3RzIChjYXRlZ29yeUlkKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgY2F0ZWdvcnlJZDogY2F0ZWdvcnlJZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5wcm9kdWN0c1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNpZGViYXJJdGVtQ2xpY2sgKGNhdGVnb3J5SWQpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmVDYXRlZ29yeUlkICE9PSBjYXRlZ29yeUlkKSB0aGlzLmFjdGl2ZUNhdGVnb3J5SWQgPSBjYXRlZ29yeUlkXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgd2F0Y2g6IHtcclxuICAgICAgYWN0aXZlQ2F0ZWdvcnlJZCAodmFsKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQcm9kdWN0cyh2YWwpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XHJcbiAgJHNpZGViYXItd2lkdGg6IDVlbTtcclxuXHJcbiAgLmxlZnQtc2lkZWJhciB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICBib3R0b206IDUwcHg7XHJcbiAgICB3aWR0aDogJHNpZGViYXItd2lkdGg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgei1pbmRleDogMjAwO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG5cclxuICAgIC5zaWRlYmFyLWl0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBwYWRkaW5nOiAxZW0gMDtcclxuICAgICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2ZjZmNjtcclxuXHJcbiAgICAgICYuYWN0aXZlIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xyXG4gICAgICAgIGNvbG9yOiByZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5yaWdodC1wYW5lbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGxlZnQ6ICRzaWRlYmFyLXdpZHRoO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBib3R0b206IDUwcHg7XHJcbiAgICBwYWRkaW5nOiAuNWVtO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcclxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcclxuXHJcbiAgICAuYmFubmVyIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5wcm9kdWN0LWxpc3Qge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBjb2x1bW4tY291bnQ6IDI7XHJcblxyXG4gICAgICAucHJvZHVjdC1pdGVtIHtcclxuICAgICAgICB3aWR0aDogNDkuNSU7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcblxyXG4gICAgICAgIC50aHVtYm5haWwge1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAubmFtZSB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICBjb2xvcjogIzQ0NDtcclxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucHJpY2Uge1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBjb2xvcjogI2YwMDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlP2I3NDY2NmJjIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCBbXG4gICAgX2MoXG4gICAgICBcImRpdlwiLFxuICAgICAgeyBzdGF0aWNDbGFzczogXCJsZWZ0LXNpZGViYXJcIiB9LFxuICAgICAgX3ZtLl9sKF92bS5jYXRlZ29yaWVzLCBmdW5jdGlvbihjYXRlZ29yeSkge1xuICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXk6IGNhdGVnb3J5LmlkLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwic2lkZWJhci1pdGVtXCIsXG4gICAgICAgICAgICBjbGFzczogeyBhY3RpdmU6IGNhdGVnb3J5LmlkID09PSBfdm0uYWN0aXZlQ2F0ZWdvcnlJZCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIF92bS5zaWRlYmFySXRlbUNsaWNrKGNhdGVnb3J5LmlkKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgXCIgKyBfdm0uX3MoY2F0ZWdvcnkubmFtZSkgKyBcIlxcbiAgICBcIildXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicmlnaHQtcGFuZWxcIiB9LCBbXG4gICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImJhbm5lclwiLFxuICAgICAgICBhdHRyczogeyBzcmM6IFwiaHR0cDovL2xvcmVtcGl4ZWwuY29tLzY0MC8xNTAvPzI4NDIzXCIsIGFsdDogXCJcIiB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWxpc3RcIiB9LFxuICAgICAgICBfdm0uX2woX3ZtLnByb2R1Y3RzLmRhdGEsIGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogcHJvZHVjdC5pZCxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1pdGVtXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHRvOiBcIi9wcm9kdWN0LzFcIiB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWJuYWlsXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBwcm9kdWN0LnRodW1ibmFpbCwgYWx0OiBcIlwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibmFtZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKHByb2R1Y3QubmFtZSkpXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInByaWNlXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MoX3ZtLl9mKFwicHJpY2VGaWx0ZXJcIikocHJvZHVjdC5wcmljZSkpKVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi1iMjMxZjVlNlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtYjIzMWY1ZTZcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2NhdGVnb3J5LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTExXG4vLyBtb2R1bGUgY2h1bmtzID0gOCJdLCJzb3VyY2VSb290IjoiIn0=