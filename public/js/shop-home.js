webpackJsonp([10],{

/***/ 202:
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

var listToStyles = __webpack_require__(257)

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

/***/ 203:
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

/***/ 257:
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

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(614)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(616)
/* template */
var __vue_template__ = __webpack_require__(617)
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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(594);

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

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(595), __esModule: true };

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(596);
var $Object = __webpack_require__(13).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(25);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(19), 'Object', { defineProperty: __webpack_require__(26).f });


/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=272)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=c):r&&(c=r),c){var d=a.functional,p=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(e,t){return c.call(t),p(e,t)}):a.beforeCreate=p?[].concat(p,c):[c]}return{esModule:s,exports:u,options:a}}},272:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(273);n.d(t,"default",function(){return r.a})},273:function(e,t,n){"use strict";function r(e){n(274)}var o=n(275),i=n(276),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-5adccf6e",null);t.a=f.exports},274:function(e,t){},275:function(e,t,n){"use strict";t.a={name:"wv-swipe-item",mounted:function(){this.$parent&&this.$parent.swipeItemCreated(this)},destroyed:function(){this.$parent&&this.$parent.swipeItemDestroyed(this)}}},276:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-swipe-item"},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e(__webpack_require__(11));else if("function"==typeof define&&define.amd)define(["vue"],e);else{var n=e("object"==typeof exports?require("vue"):t.Vue);for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=266)}([function(t,e){t.exports=function(t,e,n,r,i,o){var u,a=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(u=t,a=t.default);var c="function"==typeof a?a.options:a;e&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),i&&(c._scopeId=i);var f;if(o?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=f):r&&(f=r),f){var l=c.functional,p=l?c.render:c.beforeCreate;l?(c._injectStyles=f,c.render=function(t,e){return f.call(e),p(t,e)}):c.beforeCreate=p?[].concat(p,f):[f]}return{esModule:u,exports:a,options:c}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(4)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(9),i=n(17),o=n(12),u=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(5),i=n(10);t.exports=n(2)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(1),i=n(6),o=n(13),u=n(7),a=function(t,e,n){var s,c,f,l=t&a.F,p=t&a.G,h=t&a.S,d=t&a.P,v=t&a.B,y=t&a.W,g=p?i:i[e]||(i[e]={}),m=g.prototype,b=p?r:h?r[e]:(r[e]||{}).prototype;p&&(n=e);for(s in n)(c=!l&&b&&void 0!==b[s])&&s in g||(f=c?b[s]:n[s],g[s]=p&&"function"!=typeof b[s]?n[s]:v&&c?o(f,r):y&&b[s]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?o(Function.call,f):f,d&&((g.virtual||(g.virtual={}))[s]=f,t&a.R&&m&&!m[s]&&u(m,s,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(3);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(e,n){e.exports=t},function(t,e,n){var r=n(3);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(14);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(3),i=n(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var r=n(47)("wks"),i=n(25),o=n(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,e,n){t.exports=!n(2)&&!n(4)(function(){return 7!=Object.defineProperty(n(15)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},,function(t,e,n){var r=n(80),i=n(18);t.exports=function(t){return r(i(t))}},,,function(t,e){t.exports={}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},,function(t,e){t.exports=!0},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(5).f,i=n(19),o=n(16)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},,,,,,,,,,,,,,,function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){var r=n(60),i=n(48);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(47)("keys"),i=n(25);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){e.f=n(16)},function(t,e,n){var r=n(1),i=n(6),o=n(27),u=n(49),a=n(5).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},,,,,,function(t,e,n){"use strict";var r=n(27),i=n(8),o=n(58),u=n(7),a=n(19),s=n(24),c=n(78),f=n(29),l=n(83),p=n(16)("iterator"),h=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,v,y,g,m){c(n,e,v);var b,x,S,w=function(t){if(!h&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",T="values"==y,O=!1,P=t.prototype,L=P[p]||P["@@iterator"]||y&&P[y],E=L||w(y),j=y?T?w("entries"):E:void 0,M="Array"==e?P.entries||L:L;if(M&&(S=l(M.call(new t)))!==Object.prototype&&S.next&&(f(S,_,!0),r||a(S,p)||u(S,p,d)),T&&L&&"values"!==L.name&&(O=!0,E=function(){return L.call(this)}),r&&!m||!h&&!O&&P[p]||u(P,p,E),s[e]=E,s[_]=d,y)if(b={values:T?E:w("values"),keys:g?E:w("keys"),entries:j},m)for(x in b)x in P||o(P,x,b[x]);else i(i.P+i.F*(h||O),e,b);return b}},function(t,e,n){t.exports=n(7)},function(t,e,n){var r=n(9),i=n(79),o=n(48),u=n(46)("IE_PROTO"),a=function(){},s=function(){var t,e=n(15)("iframe"),r=o.length;for(e.style.display="none",n(66).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[o[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=s(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(19),i=n(21),o=n(81)(!1),u=n(46)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),s=0,c=[];for(n in a)n!=u&&r(a,n)&&c.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~o(c,n)||c.push(n));return c}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(60),i=n(48).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},,function(t,e,n){"use strict";var r=n(77)(!0);n(57)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(44),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){n(85);for(var r=n(1),i=n(7),o=n(24),u=n(16)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<a.length;s++){var c=a[s],f=r[c],l=f&&f.prototype;l&&!l[u]&&i(l,u,c),o[c]=o.Array}},function(t,e){},,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(75),o=r(i),u=n(88),a=r(u),s="function"==typeof a.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":typeof t};e.default="function"==typeof a.default&&"symbol"===s(o.default)?function(t){return void 0===t?"undefined":s(t)}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":void 0===t?"undefined":s(t)}},function(t,e,n){t.exports={default:n(76),__esModule:!0}},function(t,e,n){n(64),n(67),t.exports=n(49).f("iterator")},function(t,e,n){var r=n(44),i=n(18);t.exports=function(t){return function(e,n){var o,u,a=String(i(e)),s=r(n),c=a.length;return s<0||s>=c?t?"":void 0:(o=a.charCodeAt(s),o<55296||o>56319||s+1===c||(u=a.charCodeAt(s+1))<56320||u>57343?t?a.charAt(s):o:t?a.slice(s,s+2):u-56320+(o-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(59),i=n(10),o=n(29),u={};n(7)(u,n(16)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(5),i=n(9),o=n(45);t.exports=n(2)?Object.defineProperties:function(t,e){i(t);for(var n,u=o(e),a=u.length,s=0;a>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){var r=n(28);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(21),i=n(65),o=n(82);t.exports=function(t){return function(e,n,u){var a,s=r(e),c=i(s.length),f=o(u,c);if(t&&n!=n){for(;c>f;)if((a=s[f++])!=a)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(44),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(19),i=n(84),o=n(46)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(18);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(86),i=n(87),o=n(24),u=n(21);t.exports=n(57)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(89),__esModule:!0}},function(t,e,n){n(90),n(68),n(96),n(97),t.exports=n(6).Symbol},function(t,e,n){"use strict";var r=n(1),i=n(19),o=n(2),u=n(8),a=n(58),s=n(91).KEY,c=n(4),f=n(47),l=n(29),p=n(25),h=n(16),d=n(49),v=n(50),y=n(92),g=n(93),m=n(9),b=n(21),x=n(12),S=n(10),w=n(59),_=n(94),T=n(95),O=n(5),P=n(45),L=T.f,E=O.f,j=_.f,M=r.Symbol,I=r.JSON,N=I&&I.stringify,$=h("_hidden"),k=h("toPrimitive"),C={}.propertyIsEnumerable,A=f("symbol-registry"),F=f("symbols"),D=f("op-symbols"),W=Object.prototype,R="function"==typeof M,V=r.QObject,G=!V||!V.prototype||!V.prototype.findChild,B=o&&c(function(){return 7!=w(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=L(W,e);r&&delete W[e],E(t,e,n),r&&t!==W&&E(W,e,r)}:E,H=function(t){var e=F[t]=w(M.prototype);return e._k=t,e},Y=R&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},J=function(t,e,n){return t===W&&J(D,e,n),m(t),e=x(e,!0),m(n),i(F,e)?(n.enumerable?(i(t,$)&&t[$][e]&&(t[$][e]=!1),n=w(n,{enumerable:S(0,!1)})):(i(t,$)||E(t,$,S(1,{})),t[$][e]=!0),B(t,e,n)):E(t,e,n)},X=function(t,e){m(t);for(var n,r=y(e=b(e)),i=0,o=r.length;o>i;)J(t,n=r[i++],e[n]);return t},q=function(t,e){return void 0===e?w(t):X(w(t),e)},K=function(t){var e=C.call(this,t=x(t,!0));return!(this===W&&i(F,t)&&!i(D,t))&&(!(e||!i(this,t)||!i(F,t)||i(this,$)&&this[$][t])||e)},U=function(t,e){if(t=b(t),e=x(e,!0),t!==W||!i(F,e)||i(D,e)){var n=L(t,e);return!n||!i(F,e)||i(t,$)&&t[$][e]||(n.enumerable=!0),n}},z=function(t){for(var e,n=j(b(t)),r=[],o=0;n.length>o;)i(F,e=n[o++])||e==$||e==s||r.push(e);return r},Q=function(t){for(var e,n=t===W,r=j(n?D:b(t)),o=[],u=0;r.length>u;)!i(F,e=r[u++])||n&&!i(W,e)||o.push(F[e]);return o};R||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===W&&e.call(D,n),i(this,$)&&i(this[$],t)&&(this[$][t]=!1),B(this,t,S(1,n))};return o&&G&&B(W,t,{configurable:!0,set:e}),H(t)},a(M.prototype,"toString",function(){return this._k}),T.f=U,O.f=J,n(62).f=_.f=z,n(51).f=K,n(61).f=Q,o&&!n(27)&&a(W,"propertyIsEnumerable",K,!0),d.f=function(t){return H(h(t))}),u(u.G+u.W+u.F*!R,{Symbol:M});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)h(Z[tt++]);for(var et=P(h.store),nt=0;et.length>nt;)v(et[nt++]);u(u.S+u.F*!R,"Symbol",{for:function(t){return i(A,t+="")?A[t]:A[t]=M(t)},keyFor:function(t){if(!Y(t))throw TypeError(t+" is not a symbol!");for(var e in A)if(A[e]===t)return e},useSetter:function(){G=!0},useSimple:function(){G=!1}}),u(u.S+u.F*!R,"Object",{create:q,defineProperty:J,defineProperties:X,getOwnPropertyDescriptor:U,getOwnPropertyNames:z,getOwnPropertySymbols:Q}),I&&u(u.S+u.F*(!R||c(function(){var t=M();return"[null]"!=N([t])||"{}"!=N({a:t})||"{}"!=N(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!Y(t)){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(n=e),!n&&g(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!Y(e))return e}),r[1]=e,N.apply(I,r)}}}),M.prototype[k]||n(7)(M.prototype,k,M.prototype.valueOf),l(M,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(25)("meta"),i=n(3),o=n(19),u=n(5).f,a=0,s=Object.isExtensible||function(){return!0},c=!n(4)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!o(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return c&&d.NEED&&s(t)&&!o(t,r)&&f(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:h}},function(t,e,n){var r=n(45),i=n(61),o=n(51);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var u,a=n(t),s=o.f,c=0;a.length>c;)s.call(t,u=a[c++])&&e.push(u);return e}},function(t,e,n){var r=n(28);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(21),i=n(62).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==o.call(t)?a(t):i(r(t))}},function(t,e,n){var r=n(51),i=n(10),o=n(21),u=n(12),a=n(19),s=n(17),c=Object.getOwnPropertyDescriptor;e.f=n(2)?c:function(t,e){if(t=o(t),e=u(e,!0),s)try{return c(t,e)}catch(t){}if(a(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){n(50)("asyncIterator")},function(t,e,n){n(50)("observable")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(267);n.d(e,"default",function(){return r.a})},function(t,e,n){"use strict";function r(t){n(268)}var i=n(269),o=n(271),u=n(0),a=r,s=u(i.a,o.a,!1,a,"data-v-6e12bfc6",null);e.a=s.exports},function(t,e){},function(t,e,n){"use strict";var r=n(270);e.a={name:"wv-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{height:{type:Number,default:180},speed:{type:Number,default:300},defaultIndex:{type:Number,default:0},auto:{type:Number,default:3e3},continuous:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1}},mounted:function(){var t=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){if(!t.continuous&&t.index>=t.pages.length-1)return t.clearTimer();t.dragging||t.animating||t.next()},this.auto)),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.onTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&t.onTouchMove(e)}),e.addEventListener("touchend",function(e){if(t.userScrolling)return t.dragging=!1,void(t.dragState={});t.dragging&&(t.onTouchEnd(e),t.dragging=!1)})},methods:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},translate:function(t,e,n,i){var o=this,u=arguments;if(n){this.animating=!0,t.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out",setTimeout(function(){t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var a=!1,s=function(){a||(a=!0,o.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",i&&i.apply(o,u))};Object(r.b)(t,"webkitTransitionEnd",s),setTimeout(s,n+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[],n=Math.floor(this.defaultIndex),i=n>=0&&n<t.length?n:0;this.index=i,t.forEach(function(t,n){e.push(t.$el),Object(r.c)(t.$el,"is-active"),n===i&&Object(r.a)(t.$el,"is-active")}),this.pages=e},doAnimate:function(t,e){var n=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var i=void 0,o=void 0,u=void 0,a=void 0,s=void 0,c=this.speed||300,f=this.index,l=this.pages,p=l.length;e?(i=e.prevPage,u=e.currentPage,o=e.nextPage,a=e.pageWidth,s=e.offsetLeft):(a=this.$el.clientWidth,u=l[f],i=l[f-1],o=l[f+1],this.continuous&&l.length>1&&(i||(i=l[l.length-1]),o||(o=l[0])),i&&(i.style.display="block",this.translate(i,-a)),o&&(o.style.display="block",this.translate(o,a)));var h=void 0,d=this.$children[f].$el;"prev"===t?(f>0&&(h=f-1),this.continuous&&0===f&&(h=p-1)):"next"===t&&(f<p-1&&(h=f+1),this.continuous&&f===p-1&&(h=0));var v=function(){if(void 0!==h){var t=n.$children[h].$el;Object(r.c)(d,"is-active"),Object(r.a)(t,"is-active"),n.index=h}i&&(i.style.display=""),o&&(o.style.display="")};setTimeout(function(){"next"===t?(n.translate(u,-a,c,v),o&&n.translate(o,0,c)):"prev"===t?(n.translate(u,a,c,v),i&&n.translate(i,0,c)):(n.translate(u,0,c,v),void 0!==s?(i&&s>0&&n.translate(i,-1*a,c),o&&s<0&&n.translate(o,a,c)):(i&&n.translate(i,-1*a,c),o&&n.translate(o,a,c)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},onTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,r=t.touches[0];n.startTime=new Date,n.startLeft=r.pageX,n.startTop=r.pageY,n.startTopAbsolute=r.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var i=this.$children[this.index-1],o=this.$children[this.index],u=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(i||(i=this.$children[this.$children.length-1]),u||(u=this.$children[0])),n.prevPage=i?i.$el:null,n.dragPage=o?o.$el:null,n.nextPage=u?u.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},onTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var r=e.currentLeft-e.startLeft,i=e.currentTopAbsolute-e.startTopAbsolute,o=Math.abs(r),u=Math.abs(i);if(o<5||o>=5&&u>=1.73*o)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),r=Math.min(Math.max(1-e.pageWidth,r),e.pageWidth-1);var a=r<0?"next":"prev";e.prevPage&&"prev"===a&&this.translate(e.prevPage,r-e.pageWidth),this.translate(e.dragPage,r),e.nextPage&&"next"===a&&this.translate(e.nextPage,r+e.pageWidth)}},onTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,r=t.currentLeft-t.startLeft,i=t.currentTop-t.startTop,o=t.pageWidth,u=this.index,a=this.pages.length;if(e<300){var s=Math.abs(r)<5&&Math.abs(i)<5;(isNaN(r)||isNaN(i))&&(s=!0),s&&this.$children[this.index].$emit("tap")}e<300&&void 0===t.currentLeft||((e<300||Math.abs(r)>o/2)&&(n=r<0?"next":"prev"),this.continuous||(0===u&&"prev"===n||u===a-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:r,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}},clearTimer:function(){clearInterval(this.timer),this.timer=null}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},watch:{index:function(t){this.$emit("change",t)}}}},function(t,e,n){"use strict";function r(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function i(t,e){if(t){for(var n=t.className,i=(e||"").split(" "),o=0,u=i.length;o<u;o++){var a=i[o];a&&(t.classList?t.classList.add(a):r(t,a)||(n+=" "+a))}t.classList||(t.className=n)}}function o(t,e){if(t&&e){for(var n=e.split(" "),i=" "+t.className+" ",o=0,u=n.length;o<u;o++){var a=n[o];a&&(t.classList?t.classList.remove(a):r(t,a)&&(i=i.replace(" "+a+" "," ")))}t.classList||(t.className=f(i))}}n.d(e,"b",function(){return h}),e.a=i,e.c=o;var u=n(74),a=(n.n(u),n(11)),s=n.n(a),c=s.a.prototype.$isServer,f=(c||Number(document.documentMode),function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),l=function(){return!c&&document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),p=function(){return!c&&document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),h=function(t,e,n){l(t,e,function r(){n&&n.apply(this,arguments),p(t,e,r)})}},function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wv-swipe",style:{height:t.height+"px"}},[n("div",{ref:"wrapper",staticClass:"wv-swipe-wrapper"},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showIndicators,expression:"showIndicators"}],staticClass:"wv-swipe-indicators"},t._l(t.pages,function(e,r){return n("div",{key:r,staticClass:"wv-swipe-indicator",class:{"is-active":r===t.index}})}))])},i=[],o={render:r,staticRenderFns:i};e.a=o}])});

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(615);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("09315cf1", content, false);
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

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)(true);
// imports


// module
exports.push([module.i, "\n.banner-swipe-item[data-v-444f37ee] {\n  display: block;\n  overflow: hidden;\n}\n.ad[data-v-444f37ee] {\n  display: block;\n  width: 100%;\n  height: 60px;\n  overflow: hidden;\n  background-color: red;\n  position: relative;\n  margin-top: 10px;\n}\n.ad img[data-v-444f37ee] {\n    position: absolute;\n    display: block;\n    overflow: hidden;\n    width: 100%;\n}\n.ad .link[data-v-444f37ee] {\n    z-index: 10;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    color: #fff;\n}\n.product-list[data-v-444f37ee] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  width: 100%;\n  margin: 10px auto 65px;\n}\n.product-list .product-item[data-v-444f37ee] {\n    width: calc(50vw - 4px);\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc;\n}\n.product-list .product-item .thumbnail[data-v-444f37ee] {\n      display: block;\n      width: 100%;\n}\n.product-list .product-item .name[data-v-444f37ee] {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      box-orient: vertical;\n      line-clamp: 2;\n      word-break: break-all;\n}\n.product-list .product-item .price[data-v-444f37ee] {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/home.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;CAAE;AAErB;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;CAAE;AACnB;IACE,mBAAmB;IACnB,eAAe;IACf,iBAAiB;IACjB,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,YAAY;CAAE;AAElB;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,+BAAoB;EAApB,8BAAoB;MAApB,wBAAoB;UAApB,oBAAoB;EACpB,0BAA+B;MAA/B,uBAA+B;UAA/B,+BAA+B;EAC/B,YAAY;EACZ,uBAAuB;CAAE;AACzB;IACE,wBAAwB;IACxB,eAAe;IACf,iBAAiB;IACjB,uBAAuB;IACvB,oBAAoB;IACpB,mBAAmB;IACnB,uBAAuB;CAAE;AACzB;MACE,eAAe;MACf,YAAY;CAAE;AAChB;MACE,qBAAqB;MACrB,YAAY;MACZ,iBAAiB;MACjB,wBAAwB;MACxB,qBAAqB;MACrB,cAAc;MACd,sBAAsB;CAAE;AAC1B;MACE,eAAe;MACf,cAAc;MACd,gBAAgB;MAChB,kBAAkB;MAClB,WAAW;MACX,kBAAkB;CAAE","file":"home.vue","sourcesContent":[".banner-swipe-item {\n  display: block;\n  overflow: hidden; }\n\n.ad {\n  display: block;\n  width: 100%;\n  height: 60px;\n  overflow: hidden;\n  background-color: red;\n  position: relative;\n  margin-top: 10px; }\n  .ad img {\n    position: absolute;\n    display: block;\n    overflow: hidden;\n    width: 100%; }\n  .ad .link {\n    z-index: 10;\n    position: absolute;\n    right: 10px;\n    top: 10px;\n    color: #fff; }\n\n.product-list {\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  width: 100%;\n  margin: 10px auto 65px; }\n  .product-list .product-item {\n    width: calc(50vw - 4px);\n    display: block;\n    overflow: hidden;\n    background-color: #fff;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    border: 1px solid #ccc; }\n    .product-list .product-item .thumbnail {\n      display: block;\n      width: 100%; }\n    .product-list .product-item .name {\n      display: -webkit-box;\n      color: #444;\n      line-height: 1.2;\n      text-overflow: ellipsis;\n      box-orient: vertical;\n      line-clamp: 2;\n      word-break: break-all; }\n    .product-list .product-item .price {\n      display: block;\n      padding: .2em;\n      font-size: 15px;\n      font-weight: bold;\n      color: red;\n      text-align: right; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_swipe_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_swipe__ = __webpack_require__(601);
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

/***/ 617:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlPzM2MzIiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlPzA4ZjQiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWU/Mzg2YSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBLHVCQUF1QiwyQkFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdE5BOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJqcy9zaG9wLWhvbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMjAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAyMSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBmdW5jdGlvbmFsVGVtcGxhdGUsXG4gIGluamVjdFN0eWxlcyxcbiAgc2NvcGVJZCxcbiAgbW9kdWxlSWRlbnRpZmllciAvKiBzZXJ2ZXIgb25seSAqL1xuKSB7XG4gIHZhciBlc01vZHVsZVxuICB2YXIgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzIHx8IHt9XG5cbiAgLy8gRVM2IG1vZHVsZXMgaW50ZXJvcFxuICB2YXIgdHlwZSA9IHR5cGVvZiByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgaWYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlc01vZHVsZSA9IHJhd1NjcmlwdEV4cG9ydHNcbiAgICBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIH1cblxuICAvLyBWdWUuZXh0ZW5kIGNvbnN0cnVjdG9yIGV4cG9ydCBpbnRlcm9wXG4gIHZhciBvcHRpb25zID0gdHlwZW9mIHNjcmlwdEV4cG9ydHMgPT09ICdmdW5jdGlvbidcbiAgICA/IHNjcmlwdEV4cG9ydHMub3B0aW9uc1xuICAgIDogc2NyaXB0RXhwb3J0c1xuXG4gIC8vIHJlbmRlciBmdW5jdGlvbnNcbiAgaWYgKGNvbXBpbGVkVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGNvbXBpbGVkVGVtcGxhdGUucmVuZGVyXG4gICAgb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnMgPSBjb21waWxlZFRlbXBsYXRlLnN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBpbmplY3RTdHlsZXNcbiAgfVxuXG4gIGlmIChob29rKSB7XG4gICAgdmFyIGZ1bmN0aW9uYWwgPSBvcHRpb25zLmZ1bmN0aW9uYWxcbiAgICB2YXIgZXhpc3RpbmcgPSBmdW5jdGlvbmFsXG4gICAgICA/IG9wdGlvbnMucmVuZGVyXG4gICAgICA6IG9wdGlvbnMuYmVmb3JlQ3JlYXRlXG5cbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIG9wdGlvbnMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyV2l0aFN0eWxlSW5qZWN0aW9uIChoLCBjb250ZXh0KSB7XG4gICAgICAgIGhvb2suY2FsbChjb250ZXh0KVxuICAgICAgICByZXR1cm4gZXhpc3RpbmcoaCwgY29udGV4dClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGVzTW9kdWxlOiBlc01vZHVsZSxcbiAgICBleHBvcnRzOiBzY3JpcHRFeHBvcnRzLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMjEiLCIvKipcbiAqIFRyYW5zbGF0ZXMgdGhlIGxpc3QgZm9ybWF0IHByb2R1Y2VkIGJ5IGNzcy1sb2FkZXIgaW50byBzb21ldGhpbmdcbiAqIGVhc2llciB0byBtYW5pcHVsYXRlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAocGFyZW50SWQsIGxpc3QpIHtcbiAgdmFyIHN0eWxlcyA9IFtdXG4gIHZhciBuZXdTdHlsZXMgPSB7fVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV1cbiAgICB2YXIgaWQgPSBpdGVtWzBdXG4gICAgdmFyIGNzcyA9IGl0ZW1bMV1cbiAgICB2YXIgbWVkaWEgPSBpdGVtWzJdXG4gICAgdmFyIHNvdXJjZU1hcCA9IGl0ZW1bM11cbiAgICB2YXIgcGFydCA9IHtcbiAgICAgIGlkOiBwYXJlbnRJZCArICc6JyArIGksXG4gICAgICBjc3M6IGNzcyxcbiAgICAgIG1lZGlhOiBtZWRpYSxcbiAgICAgIHNvdXJjZU1hcDogc291cmNlTWFwXG4gICAgfVxuICAgIGlmICghbmV3U3R5bGVzW2lkXSkge1xuICAgICAgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHsgaWQ6IGlkLCBwYXJ0czogW3BhcnRdIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3R5bGVzXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9saXN0VG9TdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMjEiLCJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NGYzN2VlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vaG9tZS52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NGYzN2VlXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vaG9tZS52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTQ0NGYzN2VlXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxwYWdlc1xcXFxob21lLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00NDRmMzdlZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTQ0NGYzN2VlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvaG9tZS52dWVcbi8vIG1vZHVsZSBpZCA9IDU3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MjcyKX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBzLHU9ZT1lfHx7fSxmPXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PWYmJlwiZnVuY3Rpb25cIiE9PWZ8fChzPWUsdT1lLmRlZmF1bHQpO3ZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIHU/dS5vcHRpb25zOnU7dCYmKGEucmVuZGVyPXQucmVuZGVyLGEuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGEuX2NvbXBpbGVkPSEwKSxuJiYoYS5mdW5jdGlvbmFsPSEwKSxvJiYoYS5fc2NvcGVJZD1vKTt2YXIgYztpZihpPyhjPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxhLl9zc3JSZWdpc3Rlcj1jKTpyJiYoYz1yKSxjKXt2YXIgZD1hLmZ1bmN0aW9uYWwscD1kP2EucmVuZGVyOmEuYmVmb3JlQ3JlYXRlO2Q/KGEuX2luamVjdFN0eWxlcz1jLGEucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGMuY2FsbCh0KSxwKGUsdCl9KTphLmJlZm9yZUNyZWF0ZT1wP1tdLmNvbmNhdChwLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOnUsb3B0aW9uczphfX19LDI3MjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyNzMpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSwyNzM6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7bigyNzQpfXZhciBvPW4oMjc1KSxpPW4oMjc2KSxzPW4oMCksdT1yLGY9cyhvLmEsaS5hLCExLHUsXCJkYXRhLXYtNWFkY2NmNmVcIixudWxsKTt0LmE9Zi5leHBvcnRzfSwyNzQ6ZnVuY3Rpb24oZSx0KXt9LDI3NTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3Ytc3dpcGUtaXRlbVwiLG1vdW50ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRwYXJlbnQmJnRoaXMuJHBhcmVudC5zd2lwZUl0ZW1DcmVhdGVkKHRoaXMpfSxkZXN0cm95ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRwYXJlbnQmJnRoaXMuJHBhcmVudC5zd2lwZUl0ZW1EZXN0cm95ZWQodGhpcyl9fX0sMjc2OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50O3JldHVybihlLl9zZWxmLl9jfHx0KShcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LXN3aXBlLWl0ZW1cIn0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMgOCAxMCIsIiFmdW5jdGlvbih0LGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUocmVxdWlyZShcInZ1ZVwiKSk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcInZ1ZVwiXSxlKTtlbHNle3ZhciBuPWUoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/cmVxdWlyZShcInZ1ZVwiKTp0LlZ1ZSk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6dClbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIGk9bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsZSksaS5sPSEwLGkuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gZS5tPXQsZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixyKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sZS5uPWZ1bmN0aW9uKHQpe3ZhciBuPXQmJnQuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiB0LmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIHR9O3JldHVybiBlLmQobixcImFcIixuKSxufSxlLm89ZnVuY3Rpb24odCxlKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9LGUucD1cIlwiLGUoZS5zPTI2Nil9KFtmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixyLGksbyl7dmFyIHUsYT10PXR8fHt9LHM9dHlwZW9mIHQuZGVmYXVsdDtcIm9iamVjdFwiIT09cyYmXCJmdW5jdGlvblwiIT09c3x8KHU9dCxhPXQuZGVmYXVsdCk7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hLm9wdGlvbnM6YTtlJiYoYy5yZW5kZXI9ZS5yZW5kZXIsYy5zdGF0aWNSZW5kZXJGbnM9ZS5zdGF0aWNSZW5kZXJGbnMsYy5fY29tcGlsZWQ9ITApLG4mJihjLmZ1bmN0aW9uYWw9ITApLGkmJihjLl9zY29wZUlkPWkpO3ZhciBmO2lmKG8/KGY9ZnVuY3Rpb24odCl7dD10fHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsdHx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fCh0PV9fVlVFX1NTUl9DT05URVhUX18pLHImJnIuY2FsbCh0aGlzLHQpLHQmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobyl9LGMuX3NzclJlZ2lzdGVyPWYpOnImJihmPXIpLGYpe3ZhciBsPWMuZnVuY3Rpb25hbCxwPWw/Yy5yZW5kZXI6Yy5iZWZvcmVDcmVhdGU7bD8oYy5faW5qZWN0U3R5bGVzPWYsYy5yZW5kZXI9ZnVuY3Rpb24odCxlKXtyZXR1cm4gZi5jYWxsKGUpLHAodCxlKX0pOmMuYmVmb3JlQ3JlYXRlPXA/W10uY29uY2F0KHAsZik6W2ZdfXJldHVybntlc01vZHVsZTp1LGV4cG9ydHM6YSxvcHRpb25zOmN9fX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lk1hdGg9PU1hdGg/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmJiZzZWxmLk1hdGg9PU1hdGg/c2VsZjpGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJudW1iZXJcIj09dHlwZW9mIF9fZyYmKF9fZz1uKX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbig0KShmdW5jdGlvbigpe3JldHVybiA3IT1PYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiA3fX0pLmF9KX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHQ/bnVsbCE9PXQ6XCJmdW5jdGlvblwiPT10eXBlb2YgdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4hIXQoKX1jYXRjaCh0KXtyZXR1cm4hMH19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big5KSxpPW4oMTcpLG89bigxMiksdT1PYmplY3QuZGVmaW5lUHJvcGVydHk7ZS5mPW4oMik/T2JqZWN0LmRlZmluZVByb3BlcnR5OmZ1bmN0aW9uKHQsZSxuKXtpZihyKHQpLGU9byhlLCEwKSxyKG4pLGkpdHJ5e3JldHVybiB1KHQsZSxuKX1jYXRjaCh0KXt9aWYoXCJnZXRcImluIG58fFwic2V0XCJpbiBuKXRocm93IFR5cGVFcnJvcihcIkFjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIVwiKTtyZXR1cm5cInZhbHVlXCJpbiBuJiYodFtlXT1uLnZhbHVlKSx0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIyLjUuMVwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1KSxpPW4oMTApO3QuZXhwb3J0cz1uKDIpP2Z1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5mKHQsZSxpKDEsbikpfTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRbZV09bix0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSksaT1uKDYpLG89bigxMyksdT1uKDcpLGE9ZnVuY3Rpb24odCxlLG4pe3ZhciBzLGMsZixsPXQmYS5GLHA9dCZhLkcsaD10JmEuUyxkPXQmYS5QLHY9dCZhLkIseT10JmEuVyxnPXA/aTppW2VdfHwoaVtlXT17fSksbT1nLnByb3RvdHlwZSxiPXA/cjpoP3JbZV06KHJbZV18fHt9KS5wcm90b3R5cGU7cCYmKG49ZSk7Zm9yKHMgaW4gbikoYz0hbCYmYiYmdm9pZCAwIT09YltzXSkmJnMgaW4gZ3x8KGY9Yz9iW3NdOm5bc10sZ1tzXT1wJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBiW3NdP25bc106diYmYz9vKGYscik6eSYmYltzXT09Zj9mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbihlLG4scil7aWYodGhpcyBpbnN0YW5jZW9mIHQpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIG5ldyB0O2Nhc2UgMTpyZXR1cm4gbmV3IHQoZSk7Y2FzZSAyOnJldHVybiBuZXcgdChlLG4pfXJldHVybiBuZXcgdChlLG4scil9cmV0dXJuIHQuYXBwbHkodGhpcyxhcmd1bWVudHMpfTtyZXR1cm4gZS5wcm90b3R5cGU9dC5wcm90b3R5cGUsZX0oZik6ZCYmXCJmdW5jdGlvblwiPT10eXBlb2YgZj9vKEZ1bmN0aW9uLmNhbGwsZik6ZixkJiYoKGcudmlydHVhbHx8KGcudmlydHVhbD17fSkpW3NdPWYsdCZhLlImJm0mJiFtW3NdJiZ1KG0scyxmKSkpfTthLkY9MSxhLkc9MixhLlM9NCxhLlA9OCxhLkI9MTYsYS5XPTMyLGEuVT02NCxhLlI9MTI4LHQuZXhwb3J0cz1hfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoIXIodCkpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGFuIG9iamVjdCFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybntlbnVtZXJhYmxlOiEoMSZ0KSxjb25maWd1cmFibGU6ISgyJnQpLHdyaXRhYmxlOiEoNCZ0KSx2YWx1ZTplfX19LGZ1bmN0aW9uKGUsbil7ZS5leHBvcnRzPXR9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2lmKCFyKHQpKXJldHVybiB0O3ZhciBuLGk7aWYoZSYmXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnRvU3RyaW5nKSYmIXIoaT1uLmNhbGwodCkpKXJldHVybiBpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC52YWx1ZU9mKSYmIXIoaT1uLmNhbGwodCkpKXJldHVybiBpO2lmKCFlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudG9TdHJpbmcpJiYhcihpPW4uY2FsbCh0KSkpcmV0dXJuIGk7dGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTQpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixpKXtyZXR1cm4gdC5jYWxsKGUsbixyLGkpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKSxpPW4oMSkuZG9jdW1lbnQsbz1yKGkpJiZyKGkuY3JlYXRlRWxlbWVudCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBvP2kuY3JlYXRlRWxlbWVudCh0KTp7fX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ3KShcIndrc1wiKSxpPW4oMjUpLG89bigxKS5TeW1ib2wsdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBvOyh0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPXUmJm9bdF18fCh1P286aSkoXCJTeW1ib2wuXCIrdCkpfSkuc3RvcmU9cn0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbigyKSYmIW4oNCkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMTUpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKHZvaWQgMD09dCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIrdCk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9Lmhhc093blByb3BlcnR5O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuLmNhbGwodCxlKX19LCxmdW5jdGlvbih0LGUsbil7dmFyIHI9big4MCksaT1uKDE4KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHIoaSh0KSl9fSwsLGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXt9fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LCxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz0hMH0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS50b1N0cmluZzt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIG4uY2FsbCh0KS5zbGljZSg4LC0xKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUpLmYsaT1uKDE5KSxvPW4oMTYpKFwidG9TdHJpbmdUYWdcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0JiYhaSh0PW4/dDp0LnByb3RvdHlwZSxvKSYmcih0LG8se2NvbmZpZ3VyYWJsZTohMCx2YWx1ZTplfSl9fSwsLCwsLCwsLCwsLCwsLGZ1bmN0aW9uKHQsZSl7dmFyIG49TWF0aC5jZWlsLHI9TWF0aC5mbG9vcjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlzTmFOKHQ9K3QpPzA6KHQ+MD9yOm4pKHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNjApLGk9big0OCk7dC5leHBvcnRzPU9iamVjdC5rZXlzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LGkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDcpKFwia2V5c1wiKSxpPW4oMjUpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8KHJbdF09aSh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxpPXJbXCJfX2NvcmUtanNfc2hhcmVkX19cIl18fChyW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdPXt9KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlbdF18fChpW3RdPXt9KX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPVwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSxmdW5jdGlvbih0LGUsbil7ZS5mPW4oMTYpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxpPW4oNiksbz1uKDI3KSx1PW4oNDkpLGE9big1KS5mO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1pLlN5bWJvbHx8KGkuU3ltYm9sPW8/e306ci5TeW1ib2x8fHt9KTtcIl9cIj09dC5jaGFyQXQoMCl8fHQgaW4gZXx8YShlLHQse3ZhbHVlOnUuZih0KX0pfX0sZnVuY3Rpb24odCxlKXtlLmY9e30ucHJvcGVydHlJc0VudW1lcmFibGV9LCwsLCwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMjcpLGk9big4KSxvPW4oNTgpLHU9big3KSxhPW4oMTkpLHM9bigyNCksYz1uKDc4KSxmPW4oMjkpLGw9big4MykscD1uKDE2KShcIml0ZXJhdG9yXCIpLGg9IShbXS5rZXlzJiZcIm5leHRcImluW10ua2V5cygpKSxkPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbix2LHksZyxtKXtjKG4sZSx2KTt2YXIgYix4LFMsdz1mdW5jdGlvbih0KXtpZighaCYmdCBpbiBQKXJldHVybiBQW3RdO3N3aXRjaCh0KXtjYXNlXCJrZXlzXCI6Y2FzZVwidmFsdWVzXCI6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKHRoaXMsdCl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX0sXz1lK1wiIEl0ZXJhdG9yXCIsVD1cInZhbHVlc1wiPT15LE89ITEsUD10LnByb3RvdHlwZSxMPVBbcF18fFBbXCJAQGl0ZXJhdG9yXCJdfHx5JiZQW3ldLEU9THx8dyh5KSxqPXk/VD93KFwiZW50cmllc1wiKTpFOnZvaWQgMCxNPVwiQXJyYXlcIj09ZT9QLmVudHJpZXN8fEw6TDtpZihNJiYoUz1sKE0uY2FsbChuZXcgdCkpKSE9PU9iamVjdC5wcm90b3R5cGUmJlMubmV4dCYmKGYoUyxfLCEwKSxyfHxhKFMscCl8fHUoUyxwLGQpKSxUJiZMJiZcInZhbHVlc1wiIT09TC5uYW1lJiYoTz0hMCxFPWZ1bmN0aW9uKCl7cmV0dXJuIEwuY2FsbCh0aGlzKX0pLHImJiFtfHwhaCYmIU8mJlBbcF18fHUoUCxwLEUpLHNbZV09RSxzW19dPWQseSlpZihiPXt2YWx1ZXM6VD9FOncoXCJ2YWx1ZXNcIiksa2V5czpnP0U6dyhcImtleXNcIiksZW50cmllczpqfSxtKWZvcih4IGluIGIpeCBpbiBQfHxvKFAseCxiW3hdKTtlbHNlIGkoaS5QK2kuRiooaHx8TyksZSxiKTtyZXR1cm4gYn19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9big3KX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOSksaT1uKDc5KSxvPW4oNDgpLHU9big0NikoXCJJRV9QUk9UT1wiKSxhPWZ1bmN0aW9uKCl7fSxzPWZ1bmN0aW9uKCl7dmFyIHQsZT1uKDE1KShcImlmcmFtZVwiKSxyPW8ubGVuZ3RoO2ZvcihlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsbig2NikuYXBwZW5kQ2hpbGQoZSksZS5zcmM9XCJqYXZhc2NyaXB0OlwiLHQ9ZS5jb250ZW50V2luZG93LmRvY3VtZW50LHQub3BlbigpLHQud3JpdGUoXCI8c2NyaXB0PmRvY3VtZW50LkY9T2JqZWN0PFxcL3NjcmlwdD5cIiksdC5jbG9zZSgpLHM9dC5GO3ItLTspZGVsZXRlIHMucHJvdG90eXBlW29bcl1dO3JldHVybiBzKCl9O3QuZXhwb3J0cz1PYmplY3QuY3JlYXRlfHxmdW5jdGlvbih0LGUpe3ZhciBuO3JldHVybiBudWxsIT09dD8oYS5wcm90b3R5cGU9cih0KSxuPW5ldyBhLGEucHJvdG90eXBlPW51bGwsblt1XT10KTpuPXMoKSx2b2lkIDA9PT1lP246aShuLGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTkpLGk9bigyMSksbz1uKDgxKSghMSksdT1uKDQ2KShcIklFX1BST1RPXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3ZhciBuLGE9aSh0KSxzPTAsYz1bXTtmb3IobiBpbiBhKW4hPXUmJnIoYSxuKSYmYy5wdXNoKG4pO2Zvcig7ZS5sZW5ndGg+czspcihhLG49ZVtzKytdKSYmKH5vKGMsbil8fGMucHVzaChuKSk7cmV0dXJuIGN9fSxmdW5jdGlvbih0LGUpe2UuZj1PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big2MCksaT1uKDQ4KS5jb25jYXQoXCJsZW5ndGhcIixcInByb3RvdHlwZVwiKTtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsaSl9fSwsZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzcpKCEwKTtuKDU3KShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQ0KSxpPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdD4wP2kocih0KSw5MDA3MTk5MjU0NzQwOTkxKTowfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMSkuZG9jdW1lbnQ7dC5leHBvcnRzPXImJnIuZG9jdW1lbnRFbGVtZW50fSxmdW5jdGlvbih0LGUsbil7big4NSk7Zm9yKHZhciByPW4oMSksaT1uKDcpLG89bigyNCksdT1uKDE2KShcInRvU3RyaW5nVGFnXCIpLGE9XCJDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LERPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCxTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCxUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdFwiLnNwbGl0KFwiLFwiKSxzPTA7czxhLmxlbmd0aDtzKyspe3ZhciBjPWFbc10sZj1yW2NdLGw9ZiYmZi5wcm90b3R5cGU7bCYmIWxbdV0mJmkobCx1LGMpLG9bY109by5BcnJheX19LGZ1bmN0aW9uKHQsZSl7fSwsLCwsLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1lLl9fZXNNb2R1bGU9ITA7dmFyIGk9big3NSksbz1yKGkpLHU9big4OCksYT1yKHUpLHM9XCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZcInN5bWJvbFwiPT10eXBlb2Ygby5kZWZhdWx0P2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PWEuZGVmYXVsdCYmdCE9PWEuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH07ZS5kZWZhdWx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmXCJzeW1ib2xcIj09PXMoby5kZWZhdWx0KT9mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dD9cInVuZGVmaW5lZFwiOnModCl9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1hLmRlZmF1bHQmJnQhPT1hLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6dm9pZCAwPT09dD9cInVuZGVmaW5lZFwiOnModCl9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNzYpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big2NCksbig2NyksdC5leHBvcnRzPW4oNDkpLmYoXCJpdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDQpLGk9bigxOCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4pe3ZhciBvLHUsYT1TdHJpbmcoaShlKSkscz1yKG4pLGM9YS5sZW5ndGg7cmV0dXJuIHM8MHx8cz49Yz90P1wiXCI6dm9pZCAwOihvPWEuY2hhckNvZGVBdChzKSxvPDU1Mjk2fHxvPjU2MzE5fHxzKzE9PT1jfHwodT1hLmNoYXJDb2RlQXQocysxKSk8NTYzMjB8fHU+NTczNDM/dD9hLmNoYXJBdChzKTpvOnQ/YS5zbGljZShzLHMrMik6dS01NjMyMCsoby01NTI5Njw8MTApKzY1NTM2KX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1OSksaT1uKDEwKSxvPW4oMjkpLHU9e307big3KSh1LG4oMTYpKFwiaXRlcmF0b3JcIiksZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30pLHQuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dC5wcm90b3R5cGU9cih1LHtuZXh0OmkoMSxuKX0pLG8odCxlK1wiIEl0ZXJhdG9yXCIpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNSksaT1uKDkpLG89big0NSk7dC5leHBvcnRzPW4oMik/T2JqZWN0LmRlZmluZVByb3BlcnRpZXM6ZnVuY3Rpb24odCxlKXtpKHQpO2Zvcih2YXIgbix1PW8oZSksYT11Lmxlbmd0aCxzPTA7YT5zOylyLmYodCxuPXVbcysrXSxlW25dKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI4KTt0LmV4cG9ydHM9T2JqZWN0KFwielwiKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKT9PYmplY3Q6ZnVuY3Rpb24odCl7cmV0dXJuXCJTdHJpbmdcIj09cih0KT90LnNwbGl0KFwiXCIpOk9iamVjdCh0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIxKSxpPW4oNjUpLG89big4Mik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4sdSl7dmFyIGEscz1yKGUpLGM9aShzLmxlbmd0aCksZj1vKHUsYyk7aWYodCYmbiE9bil7Zm9yKDtjPmY7KWlmKChhPXNbZisrXSkhPWEpcmV0dXJuITB9ZWxzZSBmb3IoO2M+ZjtmKyspaWYoKHR8fGYgaW4gcykmJnNbZl09PT1uKXJldHVybiB0fHxmfHwwO3JldHVybiF0JiYtMX19fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NCksaT1NYXRoLm1heCxvPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiB0PXIodCksdDwwP2kodCtlLDApOm8odCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE5KSxpPW4oODQpLG89big0NikoXCJJRV9QUk9UT1wiKSx1PU9iamVjdC5wcm90b3R5cGU7dC5leHBvcnRzPU9iamVjdC5nZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCl7cmV0dXJuIHQ9aSh0KSxyKHQsbyk/dFtvXTpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmNvbnN0cnVjdG9yJiZ0IGluc3RhbmNlb2YgdC5jb25zdHJ1Y3Rvcj90LmNvbnN0cnVjdG9yLnByb3RvdHlwZTp0IGluc3RhbmNlb2YgT2JqZWN0P3U6bnVsbH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDE4KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdChyKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDg2KSxpPW4oODcpLG89bigyNCksdT1uKDIxKTt0LmV4cG9ydHM9big1NykoQXJyYXksXCJBcnJheVwiLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD11KHQpLHRoaXMuX2k9MCx0aGlzLl9rPWV9LGZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fdCxlPXRoaXMuX2ssbj10aGlzLl9pKys7cmV0dXJuIXR8fG4+PXQubGVuZ3RoPyh0aGlzLl90PXZvaWQgMCxpKDEpKTpcImtleXNcIj09ZT9pKDAsbik6XCJ2YWx1ZXNcIj09ZT9pKDAsdFtuXSk6aSgwLFtuLHRbbl1dKX0sXCJ2YWx1ZXNcIiksby5Bcmd1bWVudHM9by5BcnJheSxyKFwia2V5c1wiKSxyKFwidmFsdWVzXCIpLHIoXCJlbnRyaWVzXCIpfSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbigpe319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue3ZhbHVlOmUsZG9uZTohIXR9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17ZGVmYXVsdDpuKDg5KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oOTApLG4oNjgpLG4oOTYpLG4oOTcpLHQuZXhwb3J0cz1uKDYpLlN5bWJvbH0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMSksaT1uKDE5KSxvPW4oMiksdT1uKDgpLGE9big1OCkscz1uKDkxKS5LRVksYz1uKDQpLGY9big0NyksbD1uKDI5KSxwPW4oMjUpLGg9bigxNiksZD1uKDQ5KSx2PW4oNTApLHk9big5MiksZz1uKDkzKSxtPW4oOSksYj1uKDIxKSx4PW4oMTIpLFM9bigxMCksdz1uKDU5KSxfPW4oOTQpLFQ9big5NSksTz1uKDUpLFA9big0NSksTD1ULmYsRT1PLmYsaj1fLmYsTT1yLlN5bWJvbCxJPXIuSlNPTixOPUkmJkkuc3RyaW5naWZ5LCQ9aChcIl9oaWRkZW5cIiksaz1oKFwidG9QcmltaXRpdmVcIiksQz17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxBPWYoXCJzeW1ib2wtcmVnaXN0cnlcIiksRj1mKFwic3ltYm9sc1wiKSxEPWYoXCJvcC1zeW1ib2xzXCIpLFc9T2JqZWN0LnByb3RvdHlwZSxSPVwiZnVuY3Rpb25cIj09dHlwZW9mIE0sVj1yLlFPYmplY3QsRz0hVnx8IVYucHJvdG90eXBlfHwhVi5wcm90b3R5cGUuZmluZENoaWxkLEI9byYmYyhmdW5jdGlvbigpe3JldHVybiA3IT13KEUoe30sXCJhXCIse2dldDpmdW5jdGlvbigpe3JldHVybiBFKHRoaXMsXCJhXCIse3ZhbHVlOjd9KS5hfX0pKS5hfSk/ZnVuY3Rpb24odCxlLG4pe3ZhciByPUwoVyxlKTtyJiZkZWxldGUgV1tlXSxFKHQsZSxuKSxyJiZ0IT09VyYmRShXLGUscil9OkUsSD1mdW5jdGlvbih0KXt2YXIgZT1GW3RdPXcoTS5wcm90b3R5cGUpO3JldHVybiBlLl9rPXQsZX0sWT1SJiZcInN5bWJvbFwiPT10eXBlb2YgTS5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBNfSxKPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdD09PVcmJkooRCxlLG4pLG0odCksZT14KGUsITApLG0obiksaShGLGUpPyhuLmVudW1lcmFibGU/KGkodCwkKSYmdFskXVtlXSYmKHRbJF1bZV09ITEpLG49dyhuLHtlbnVtZXJhYmxlOlMoMCwhMSl9KSk6KGkodCwkKXx8RSh0LCQsUygxLHt9KSksdFskXVtlXT0hMCksQih0LGUsbikpOkUodCxlLG4pfSxYPWZ1bmN0aW9uKHQsZSl7bSh0KTtmb3IodmFyIG4scj15KGU9YihlKSksaT0wLG89ci5sZW5ndGg7bz5pOylKKHQsbj1yW2krK10sZVtuXSk7cmV0dXJuIHR9LHE9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdm9pZCAwPT09ZT93KHQpOlgodyh0KSxlKX0sSz1mdW5jdGlvbih0KXt2YXIgZT1DLmNhbGwodGhpcyx0PXgodCwhMCkpO3JldHVybiEodGhpcz09PVcmJmkoRix0KSYmIWkoRCx0KSkmJighKGV8fCFpKHRoaXMsdCl8fCFpKEYsdCl8fGkodGhpcywkKSYmdGhpc1skXVt0XSl8fGUpfSxVPWZ1bmN0aW9uKHQsZSl7aWYodD1iKHQpLGU9eChlLCEwKSx0IT09V3x8IWkoRixlKXx8aShELGUpKXt2YXIgbj1MKHQsZSk7cmV0dXJuIW58fCFpKEYsZSl8fGkodCwkKSYmdFskXVtlXXx8KG4uZW51bWVyYWJsZT0hMCksbn19LHo9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49aihiKHQpKSxyPVtdLG89MDtuLmxlbmd0aD5vOylpKEYsZT1uW28rK10pfHxlPT0kfHxlPT1zfHxyLnB1c2goZSk7cmV0dXJuIHJ9LFE9ZnVuY3Rpb24odCl7Zm9yKHZhciBlLG49dD09PVcscj1qKG4/RDpiKHQpKSxvPVtdLHU9MDtyLmxlbmd0aD51OykhaShGLGU9clt1KytdKXx8biYmIWkoVyxlKXx8by5wdXNoKEZbZV0pO3JldHVybiBvfTtSfHwoTT1mdW5jdGlvbigpe2lmKHRoaXMgaW5zdGFuY2VvZiBNKXRocm93IFR5cGVFcnJvcihcIlN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciFcIik7dmFyIHQ9cChhcmd1bWVudHMubGVuZ3RoPjA/YXJndW1lbnRzWzBdOnZvaWQgMCksZT1mdW5jdGlvbihuKXt0aGlzPT09VyYmZS5jYWxsKEQsbiksaSh0aGlzLCQpJiZpKHRoaXNbJF0sdCkmJih0aGlzWyRdW3RdPSExKSxCKHRoaXMsdCxTKDEsbikpfTtyZXR1cm4gbyYmRyYmQihXLHQse2NvbmZpZ3VyYWJsZTohMCxzZXQ6ZX0pLEgodCl9LGEoTS5wcm90b3R5cGUsXCJ0b1N0cmluZ1wiLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2t9KSxULmY9VSxPLmY9SixuKDYyKS5mPV8uZj16LG4oNTEpLmY9SyxuKDYxKS5mPVEsbyYmIW4oMjcpJiZhKFcsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLEssITApLGQuZj1mdW5jdGlvbih0KXtyZXR1cm4gSChoKHQpKX0pLHUodS5HK3UuVyt1LkYqIVIse1N5bWJvbDpNfSk7Zm9yKHZhciBaPVwiaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXNcIi5zcGxpdChcIixcIiksdHQ9MDtaLmxlbmd0aD50dDspaChaW3R0KytdKTtmb3IodmFyIGV0PVAoaC5zdG9yZSksbnQ9MDtldC5sZW5ndGg+bnQ7KXYoZXRbbnQrK10pO3UodS5TK3UuRiohUixcIlN5bWJvbFwiLHtmb3I6ZnVuY3Rpb24odCl7cmV0dXJuIGkoQSx0Kz1cIlwiKT9BW3RdOkFbdF09TSh0KX0sa2V5Rm9yOmZ1bmN0aW9uKHQpe2lmKCFZKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIHN5bWJvbCFcIik7Zm9yKHZhciBlIGluIEEpaWYoQVtlXT09PXQpcmV0dXJuIGV9LHVzZVNldHRlcjpmdW5jdGlvbigpe0c9ITB9LHVzZVNpbXBsZTpmdW5jdGlvbigpe0c9ITF9fSksdSh1LlMrdS5GKiFSLFwiT2JqZWN0XCIse2NyZWF0ZTpxLGRlZmluZVByb3BlcnR5OkosZGVmaW5lUHJvcGVydGllczpYLGdldE93blByb3BlcnR5RGVzY3JpcHRvcjpVLGdldE93blByb3BlcnR5TmFtZXM6eixnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6UX0pLEkmJnUodS5TK3UuRiooIVJ8fGMoZnVuY3Rpb24oKXt2YXIgdD1NKCk7cmV0dXJuXCJbbnVsbF1cIiE9TihbdF0pfHxcInt9XCIhPU4oe2E6dH0pfHxcInt9XCIhPU4oT2JqZWN0KHQpKX0pKSxcIkpTT05cIix7c3RyaW5naWZ5OmZ1bmN0aW9uKHQpe2lmKHZvaWQgMCE9PXQmJiFZKHQpKXtmb3IodmFyIGUsbixyPVt0XSxpPTE7YXJndW1lbnRzLmxlbmd0aD5pOylyLnB1c2goYXJndW1lbnRzW2krK10pO3JldHVybiBlPXJbMV0sXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksIW4mJmcoZSl8fChlPWZ1bmN0aW9uKHQsZSl7aWYobiYmKGU9bi5jYWxsKHRoaXMsdCxlKSksIVkoZSkpcmV0dXJuIGV9KSxyWzFdPWUsTi5hcHBseShJLHIpfX19KSxNLnByb3RvdHlwZVtrXXx8big3KShNLnByb3RvdHlwZSxrLE0ucHJvdG90eXBlLnZhbHVlT2YpLGwoTSxcIlN5bWJvbFwiKSxsKE1hdGgsXCJNYXRoXCIsITApLGwoci5KU09OLFwiSlNPTlwiLCEwKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjUpKFwibWV0YVwiKSxpPW4oMyksbz1uKDE5KSx1PW4oNSkuZixhPTAscz1PYmplY3QuaXNFeHRlbnNpYmxlfHxmdW5jdGlvbigpe3JldHVybiEwfSxjPSFuKDQpKGZ1bmN0aW9uKCl7cmV0dXJuIHMoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSl9KSxmPWZ1bmN0aW9uKHQpe3UodCxyLHt2YWx1ZTp7aTpcIk9cIisgKythLHc6e319fSl9LGw9ZnVuY3Rpb24odCxlKXtpZighaSh0KSlyZXR1cm5cInN5bWJvbFwiPT10eXBlb2YgdD90OihcInN0cmluZ1wiPT10eXBlb2YgdD9cIlNcIjpcIlBcIikrdDtpZighbyh0LHIpKXtpZighcyh0KSlyZXR1cm5cIkZcIjtpZighZSlyZXR1cm5cIkVcIjtmKHQpfXJldHVybiB0W3JdLml9LHA9ZnVuY3Rpb24odCxlKXtpZighbyh0LHIpKXtpZighcyh0KSlyZXR1cm4hMDtpZighZSlyZXR1cm4hMTtmKHQpfXJldHVybiB0W3JdLnd9LGg9ZnVuY3Rpb24odCl7cmV0dXJuIGMmJmQuTkVFRCYmcyh0KSYmIW8odCxyKSYmZih0KSx0fSxkPXQuZXhwb3J0cz17S0VZOnIsTkVFRDohMSxmYXN0S2V5OmwsZ2V0V2VhazpwLG9uRnJlZXplOmh9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0NSksaT1uKDYxKSxvPW4oNTEpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1yKHQpLG49aS5mO2lmKG4pZm9yKHZhciB1LGE9bih0KSxzPW8uZixjPTA7YS5sZW5ndGg+Yzspcy5jYWxsKHQsdT1hW2MrK10pJiZlLnB1c2godSk7cmV0dXJuIGV9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyOCk7dC5leHBvcnRzPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKHQpe3JldHVyblwiQXJyYXlcIj09cih0KX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIxKSxpPW4oNjIpLmYsbz17fS50b1N0cmluZyx1PVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJndpbmRvdyYmT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM/T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KTpbXSxhPWZ1bmN0aW9uKHQpe3RyeXtyZXR1cm4gaSh0KX1jYXRjaCh0KXtyZXR1cm4gdS5zbGljZSgpfX07dC5leHBvcnRzLmY9ZnVuY3Rpb24odCl7cmV0dXJuIHUmJlwiW29iamVjdCBXaW5kb3ddXCI9PW8uY2FsbCh0KT9hKHQpOmkocih0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1MSksaT1uKDEwKSxvPW4oMjEpLHU9bigxMiksYT1uKDE5KSxzPW4oMTcpLGM9T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtlLmY9bigyKT9jOmZ1bmN0aW9uKHQsZSl7aWYodD1vKHQpLGU9dShlLCEwKSxzKXRyeXtyZXR1cm4gYyh0LGUpfWNhdGNoKHQpe31pZihhKHQsZSkpcmV0dXJuIGkoIXIuZi5jYWxsKHQsZSksdFtlXSl9fSxmdW5jdGlvbih0LGUsbil7big1MCkoXCJhc3luY0l0ZXJhdG9yXCIpfSxmdW5jdGlvbih0LGUsbil7big1MCkoXCJvYnNlcnZhYmxlXCIpfSwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyNjcpO24uZChlLFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcih0KXtuKDI2OCl9dmFyIGk9bigyNjkpLG89bigyNzEpLHU9bigwKSxhPXIscz11KGkuYSxvLmEsITEsYSxcImRhdGEtdi02ZTEyYmZjNlwiLG51bGwpO2UuYT1zLmV4cG9ydHN9LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigyNzApO2UuYT17bmFtZTpcInd2LXN3aXBlXCIsY3JlYXRlZDpmdW5jdGlvbigpe3RoaXMuZHJhZ1N0YXRlPXt9fSxkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue3JlYWR5OiExLGRyYWdnaW5nOiExLHVzZXJTY3JvbGxpbmc6ITEsYW5pbWF0aW5nOiExLGluZGV4OjAscGFnZXM6W10sdGltZXI6bnVsbCxyZUluaXRUaW1lcjpudWxsLG5vRHJhZzohMX19LHByb3BzOntoZWlnaHQ6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MTgwfSxzcGVlZDp7dHlwZTpOdW1iZXIsZGVmYXVsdDozMDB9LGRlZmF1bHRJbmRleDp7dHlwZTpOdW1iZXIsZGVmYXVsdDowfSxhdXRvOnt0eXBlOk51bWJlcixkZWZhdWx0OjNlM30sY29udGludW91czp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHNob3dJbmRpY2F0b3JzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sbm9EcmFnV2hlblNpbmdsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHByZXZlbnQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfX0sbW91bnRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeT0hMCx0aGlzLmF1dG8+MCYmKHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtpZighdC5jb250aW51b3VzJiZ0LmluZGV4Pj10LnBhZ2VzLmxlbmd0aC0xKXJldHVybiB0LmNsZWFyVGltZXIoKTt0LmRyYWdnaW5nfHx0LmFuaW1hdGluZ3x8dC5uZXh0KCl9LHRoaXMuYXV0bykpLHRoaXMucmVJbml0UGFnZXMoKTt2YXIgZT10aGlzLiRlbDtlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oZSl7dC5wcmV2ZW50JiZlLnByZXZlbnREZWZhdWx0KCksdC5hbmltYXRpbmd8fCh0LmRyYWdnaW5nPSEwLHQudXNlclNjcm9sbGluZz0hMSx0Lm9uVG91Y2hTdGFydChlKSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixmdW5jdGlvbihlKXt0LmRyYWdnaW5nJiZ0Lm9uVG91Y2hNb3ZlKGUpfSksZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixmdW5jdGlvbihlKXtpZih0LnVzZXJTY3JvbGxpbmcpcmV0dXJuIHQuZHJhZ2dpbmc9ITEsdm9pZCh0LmRyYWdTdGF0ZT17fSk7dC5kcmFnZ2luZyYmKHQub25Ub3VjaEVuZChlKSx0LmRyYWdnaW5nPSExKX0pfSxtZXRob2RzOntzd2lwZUl0ZW1DcmVhdGVkOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLnJlYWR5JiYoY2xlYXJUaW1lb3V0KHRoaXMucmVJbml0VGltZXIpLHRoaXMucmVJbml0VGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe3QucmVJbml0UGFnZXMoKX0sMTAwKSl9LHN3aXBlSXRlbURlc3Ryb3llZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeSYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnJlSW5pdFBhZ2VzKCl9LDEwMCkpfSx0cmFuc2xhdGU6ZnVuY3Rpb24odCxlLG4saSl7dmFyIG89dGhpcyx1PWFyZ3VtZW50cztpZihuKXt0aGlzLmFuaW1hdGluZz0hMCx0LnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCItd2Via2l0LXRyYW5zZm9ybSBcIituK1wibXMgZWFzZS1pbi1vdXRcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIitlK1wicHgsIDAsIDApXCJ9LDUwKTt2YXIgYT0hMSxzPWZ1bmN0aW9uKCl7YXx8KGE9ITAsby5hbmltYXRpbmc9ITEsdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiXCIsdC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJcIixpJiZpLmFwcGx5KG8sdSkpfTtPYmplY3Qoci5iKSh0LFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHMpLHNldFRpbWVvdXQocyxuKzEwMCl9ZWxzZSB0LnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCJcIix0LnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZTNkKFwiK2UrXCJweCwgMCwgMClcIn0scmVJbml0UGFnZXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRjaGlsZHJlbjt0aGlzLm5vRHJhZz0xPT09dC5sZW5ndGgmJnRoaXMubm9EcmFnV2hlblNpbmdsZTt2YXIgZT1bXSxuPU1hdGguZmxvb3IodGhpcy5kZWZhdWx0SW5kZXgpLGk9bj49MCYmbjx0Lmxlbmd0aD9uOjA7dGhpcy5pbmRleD1pLHQuZm9yRWFjaChmdW5jdGlvbih0LG4pe2UucHVzaCh0LiRlbCksT2JqZWN0KHIuYykodC4kZWwsXCJpcy1hY3RpdmVcIiksbj09PWkmJk9iamVjdChyLmEpKHQuJGVsLFwiaXMtYWN0aXZlXCIpfSksdGhpcy5wYWdlcz1lfSxkb0FuaW1hdGU6ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzO2lmKDAhPT10aGlzLiRjaGlsZHJlbi5sZW5ndGgmJihlfHwhKHRoaXMuJGNoaWxkcmVuLmxlbmd0aDwyKSkpe3ZhciBpPXZvaWQgMCxvPXZvaWQgMCx1PXZvaWQgMCxhPXZvaWQgMCxzPXZvaWQgMCxjPXRoaXMuc3BlZWR8fDMwMCxmPXRoaXMuaW5kZXgsbD10aGlzLnBhZ2VzLHA9bC5sZW5ndGg7ZT8oaT1lLnByZXZQYWdlLHU9ZS5jdXJyZW50UGFnZSxvPWUubmV4dFBhZ2UsYT1lLnBhZ2VXaWR0aCxzPWUub2Zmc2V0TGVmdCk6KGE9dGhpcy4kZWwuY2xpZW50V2lkdGgsdT1sW2ZdLGk9bFtmLTFdLG89bFtmKzFdLHRoaXMuY29udGludW91cyYmbC5sZW5ndGg+MSYmKGl8fChpPWxbbC5sZW5ndGgtMV0pLG98fChvPWxbMF0pKSxpJiYoaS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIix0aGlzLnRyYW5zbGF0ZShpLC1hKSksbyYmKG8uc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsdGhpcy50cmFuc2xhdGUobyxhKSkpO3ZhciBoPXZvaWQgMCxkPXRoaXMuJGNoaWxkcmVuW2ZdLiRlbDtcInByZXZcIj09PXQ/KGY+MCYmKGg9Zi0xKSx0aGlzLmNvbnRpbnVvdXMmJjA9PT1mJiYoaD1wLTEpKTpcIm5leHRcIj09PXQmJihmPHAtMSYmKGg9ZisxKSx0aGlzLmNvbnRpbnVvdXMmJmY9PT1wLTEmJihoPTApKTt2YXIgdj1mdW5jdGlvbigpe2lmKHZvaWQgMCE9PWgpe3ZhciB0PW4uJGNoaWxkcmVuW2hdLiRlbDtPYmplY3Qoci5jKShkLFwiaXMtYWN0aXZlXCIpLE9iamVjdChyLmEpKHQsXCJpcy1hY3RpdmVcIiksbi5pbmRleD1ofWkmJihpLnN0eWxlLmRpc3BsYXk9XCJcIiksbyYmKG8uc3R5bGUuZGlzcGxheT1cIlwiKX07c2V0VGltZW91dChmdW5jdGlvbigpe1wibmV4dFwiPT09dD8obi50cmFuc2xhdGUodSwtYSxjLHYpLG8mJm4udHJhbnNsYXRlKG8sMCxjKSk6XCJwcmV2XCI9PT10PyhuLnRyYW5zbGF0ZSh1LGEsYyx2KSxpJiZuLnRyYW5zbGF0ZShpLDAsYykpOihuLnRyYW5zbGF0ZSh1LDAsYyx2KSx2b2lkIDAhPT1zPyhpJiZzPjAmJm4udHJhbnNsYXRlKGksLTEqYSxjKSxvJiZzPDAmJm4udHJhbnNsYXRlKG8sYSxjKSk6KGkmJm4udHJhbnNsYXRlKGksLTEqYSxjKSxvJiZuLnRyYW5zbGF0ZShvLGEsYykpKX0sMTApfX0sbmV4dDpmdW5jdGlvbigpe3RoaXMuZG9BbmltYXRlKFwibmV4dFwiKX0scHJldjpmdW5jdGlvbigpe3RoaXMuZG9BbmltYXRlKFwicHJldlwiKX0sb25Ub3VjaFN0YXJ0OmZ1bmN0aW9uKHQpe2lmKCF0aGlzLm5vRHJhZyl7dmFyIGU9dGhpcy4kZWwsbj10aGlzLmRyYWdTdGF0ZSxyPXQudG91Y2hlc1swXTtuLnN0YXJ0VGltZT1uZXcgRGF0ZSxuLnN0YXJ0TGVmdD1yLnBhZ2VYLG4uc3RhcnRUb3A9ci5wYWdlWSxuLnN0YXJ0VG9wQWJzb2x1dGU9ci5jbGllbnRZLG4ucGFnZVdpZHRoPWUub2Zmc2V0V2lkdGgsbi5wYWdlSGVpZ2h0PWUub2Zmc2V0SGVpZ2h0O3ZhciBpPXRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXgtMV0sbz10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4XSx1PXRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXgrMV07dGhpcy5jb250aW51b3VzJiZ0aGlzLnBhZ2VzLmxlbmd0aD4xJiYoaXx8KGk9dGhpcy4kY2hpbGRyZW5bdGhpcy4kY2hpbGRyZW4ubGVuZ3RoLTFdKSx1fHwodT10aGlzLiRjaGlsZHJlblswXSkpLG4ucHJldlBhZ2U9aT9pLiRlbDpudWxsLG4uZHJhZ1BhZ2U9bz9vLiRlbDpudWxsLG4ubmV4dFBhZ2U9dT91LiRlbDpudWxsLG4ucHJldlBhZ2UmJihuLnByZXZQYWdlLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiKSxuLm5leHRQYWdlJiYobi5uZXh0UGFnZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIil9fSxvblRvdWNoTW92ZTpmdW5jdGlvbih0KXtpZighdGhpcy5ub0RyYWcpe3ZhciBlPXRoaXMuZHJhZ1N0YXRlLG49dC50b3VjaGVzWzBdO2UuY3VycmVudExlZnQ9bi5wYWdlWCxlLmN1cnJlbnRUb3A9bi5wYWdlWSxlLmN1cnJlbnRUb3BBYnNvbHV0ZT1uLmNsaWVudFk7dmFyIHI9ZS5jdXJyZW50TGVmdC1lLnN0YXJ0TGVmdCxpPWUuY3VycmVudFRvcEFic29sdXRlLWUuc3RhcnRUb3BBYnNvbHV0ZSxvPU1hdGguYWJzKHIpLHU9TWF0aC5hYnMoaSk7aWYobzw1fHxvPj01JiZ1Pj0xLjczKm8pcmV0dXJuIHZvaWQodGhpcy51c2VyU2Nyb2xsaW5nPSEwKTt0aGlzLnVzZXJTY3JvbGxpbmc9ITEsdC5wcmV2ZW50RGVmYXVsdCgpLHI9TWF0aC5taW4oTWF0aC5tYXgoMS1lLnBhZ2VXaWR0aCxyKSxlLnBhZ2VXaWR0aC0xKTt2YXIgYT1yPDA/XCJuZXh0XCI6XCJwcmV2XCI7ZS5wcmV2UGFnZSYmXCJwcmV2XCI9PT1hJiZ0aGlzLnRyYW5zbGF0ZShlLnByZXZQYWdlLHItZS5wYWdlV2lkdGgpLHRoaXMudHJhbnNsYXRlKGUuZHJhZ1BhZ2UsciksZS5uZXh0UGFnZSYmXCJuZXh0XCI9PT1hJiZ0aGlzLnRyYW5zbGF0ZShlLm5leHRQYWdlLHIrZS5wYWdlV2lkdGgpfX0sb25Ub3VjaEVuZDpmdW5jdGlvbigpe2lmKCF0aGlzLm5vRHJhZyl7dmFyIHQ9dGhpcy5kcmFnU3RhdGUsZT1uZXcgRGF0ZS10LnN0YXJ0VGltZSxuPW51bGwscj10LmN1cnJlbnRMZWZ0LXQuc3RhcnRMZWZ0LGk9dC5jdXJyZW50VG9wLXQuc3RhcnRUb3Asbz10LnBhZ2VXaWR0aCx1PXRoaXMuaW5kZXgsYT10aGlzLnBhZ2VzLmxlbmd0aDtpZihlPDMwMCl7dmFyIHM9TWF0aC5hYnMocik8NSYmTWF0aC5hYnMoaSk8NTsoaXNOYU4ocil8fGlzTmFOKGkpKSYmKHM9ITApLHMmJnRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXhdLiRlbWl0KFwidGFwXCIpfWU8MzAwJiZ2b2lkIDA9PT10LmN1cnJlbnRMZWZ0fHwoKGU8MzAwfHxNYXRoLmFicyhyKT5vLzIpJiYobj1yPDA/XCJuZXh0XCI6XCJwcmV2XCIpLHRoaXMuY29udGludW91c3x8KDA9PT11JiZcInByZXZcIj09PW58fHU9PT1hLTEmJlwibmV4dFwiPT09bikmJihuPW51bGwpLHRoaXMuJGNoaWxkcmVuLmxlbmd0aDwyJiYobj1udWxsKSx0aGlzLmRvQW5pbWF0ZShuLHtvZmZzZXRMZWZ0OnIscGFnZVdpZHRoOnQucGFnZVdpZHRoLHByZXZQYWdlOnQucHJldlBhZ2UsY3VycmVudFBhZ2U6dC5kcmFnUGFnZSxuZXh0UGFnZTp0Lm5leHRQYWdlfSksdGhpcy5kcmFnU3RhdGU9e30pfX0sY2xlYXJUaW1lcjpmdW5jdGlvbigpe2NsZWFySW50ZXJ2YWwodGhpcy50aW1lciksdGhpcy50aW1lcj1udWxsfX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dGhpcy50aW1lciYmKGNsZWFySW50ZXJ2YWwodGhpcy50aW1lciksdGhpcy50aW1lcj1udWxsKSx0aGlzLnJlSW5pdFRpbWVyJiYoY2xlYXJUaW1lb3V0KHRoaXMucmVJbml0VGltZXIpLHRoaXMucmVJbml0VGltZXI9bnVsbCl9LHdhdGNoOntpbmRleDpmdW5jdGlvbih0KXt0aGlzLiRlbWl0KFwiY2hhbmdlXCIsdCl9fX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSl7aWYoIXR8fCFlKXJldHVybiExO2lmKC0xIT09ZS5pbmRleE9mKFwiIFwiKSl0aHJvdyBuZXcgRXJyb3IoXCJjbGFzc05hbWUgc2hvdWxkIG5vdCBjb250YWluIHNwYWNlLlwiKTtyZXR1cm4gdC5jbGFzc0xpc3Q/dC5jbGFzc0xpc3QuY29udGFpbnMoZSk6KFwiIFwiK3QuY2xhc3NOYW1lK1wiIFwiKS5pbmRleE9mKFwiIFwiK2UrXCIgXCIpPi0xfWZ1bmN0aW9uIGkodCxlKXtpZih0KXtmb3IodmFyIG49dC5jbGFzc05hbWUsaT0oZXx8XCJcIikuc3BsaXQoXCIgXCIpLG89MCx1PWkubGVuZ3RoO288dTtvKyspe3ZhciBhPWlbb107YSYmKHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LmFkZChhKTpyKHQsYSl8fChuKz1cIiBcIithKSl9dC5jbGFzc0xpc3R8fCh0LmNsYXNzTmFtZT1uKX19ZnVuY3Rpb24gbyh0LGUpe2lmKHQmJmUpe2Zvcih2YXIgbj1lLnNwbGl0KFwiIFwiKSxpPVwiIFwiK3QuY2xhc3NOYW1lK1wiIFwiLG89MCx1PW4ubGVuZ3RoO288dTtvKyspe3ZhciBhPW5bb107YSYmKHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LnJlbW92ZShhKTpyKHQsYSkmJihpPWkucmVwbGFjZShcIiBcIithK1wiIFwiLFwiIFwiKSkpfXQuY2xhc3NMaXN0fHwodC5jbGFzc05hbWU9ZihpKSl9fW4uZChlLFwiYlwiLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KSxlLmE9aSxlLmM9bzt2YXIgdT1uKDc0KSxhPShuLm4odSksbigxMSkpLHM9bi5uKGEpLGM9cy5hLnByb3RvdHlwZS4kaXNTZXJ2ZXIsZj0oY3x8TnVtYmVyKGRvY3VtZW50LmRvY3VtZW50TW9kZSksZnVuY3Rpb24odCl7cmV0dXJuKHR8fFwiXCIpLnJlcGxhY2UoL15bXFxzXFx1RkVGRl0rfFtcXHNcXHVGRUZGXSskL2csXCJcIil9KSxsPWZ1bmN0aW9uKCl7cmV0dXJuIWMmJmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24odCxlLG4pe3QmJmUmJm4mJnQuYWRkRXZlbnRMaXN0ZW5lcihlLG4sITEpfTpmdW5jdGlvbih0LGUsbil7dCYmZSYmbiYmdC5hdHRhY2hFdmVudChcIm9uXCIrZSxuKX19KCkscD1mdW5jdGlvbigpe3JldHVybiFjJiZkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyP2Z1bmN0aW9uKHQsZSxuKXt0JiZlJiZ0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxuLCExKX06ZnVuY3Rpb24odCxlLG4pe3QmJmUmJnQuZGV0YWNoRXZlbnQoXCJvblwiK2Usbil9fSgpLGg9ZnVuY3Rpb24odCxlLG4pe2wodCxlLGZ1bmN0aW9uIHIoKXtuJiZuLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxwKHQsZSxyKX0pfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxlPXQuJGNyZWF0ZUVsZW1lbnQsbj10Ll9zZWxmLl9jfHxlO3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3Ytc3dpcGVcIixzdHlsZTp7aGVpZ2h0OnQuaGVpZ2h0K1wicHhcIn19LFtuKFwiZGl2XCIse3JlZjpcIndyYXBwZXJcIixzdGF0aWNDbGFzczpcInd2LXN3aXBlLXdyYXBwZXJcIn0sW3QuX3QoXCJkZWZhdWx0XCIpXSwyKSx0Ll92KFwiIFwiKSxuKFwiZGl2XCIse2RpcmVjdGl2ZXM6W3tuYW1lOlwic2hvd1wiLHJhd05hbWU6XCJ2LXNob3dcIix2YWx1ZTp0LnNob3dJbmRpY2F0b3JzLGV4cHJlc3Npb246XCJzaG93SW5kaWNhdG9yc1wifV0sc3RhdGljQ2xhc3M6XCJ3di1zd2lwZS1pbmRpY2F0b3JzXCJ9LHQuX2wodC5wYWdlcyxmdW5jdGlvbihlLHIpe3JldHVybiBuKFwiZGl2XCIse2tleTpyLHN0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaW5kaWNhdG9yXCIsY2xhc3M6e1wiaXMtYWN0aXZlXCI6cj09PXQuaW5kZXh9fSl9KSldKX0saT1bXSxvPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6aX07ZS5hPW99XSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDFcbi8vIG1vZHVsZSBjaHVua3MgPSAzIDggMTAiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDQ0ZjM3ZWVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vaG9tZS52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjA5MzE1Y2YxXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NGYzN2VlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ0NGYzN2VlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2hvbWUudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQ0NGYzN2VlXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMTAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmJhbm5lci1zd2lwZS1pdGVtW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4uYWRbZGF0YS12LTQ0NGYzN2VlXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcbi5hZCBpbWdbZGF0YS12LTQ0NGYzN2VlXSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbn1cXG4uYWQgLmxpbmtbZGF0YS12LTQ0NGYzN2VlXSB7XFxuICAgIHotaW5kZXg6IDEwO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHJpZ2h0OiAxMHB4O1xcbiAgICB0b3A6IDEwcHg7XFxuICAgIGNvbG9yOiAjZmZmO1xcbn1cXG4ucHJvZHVjdC1saXN0W2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IGhvcml6b250YWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1mbG93OiByb3cgd3JhcDtcXG4gICAgICAgICAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDEwcHggYXV0byA2NXB4O1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW1bZGF0YS12LTQ0NGYzN2VlXSB7XFxuICAgIHdpZHRoOiBjYWxjKDUwdncgLSA0cHgpO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnRodW1ibmFpbFtkYXRhLXYtNDQ0ZjM3ZWVdIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICB3aWR0aDogMTAwJTtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5uYW1lW2RhdGEtdi00NDRmMzdlZV0ge1xcbiAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XFxuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgICAgbGluZS1jbGFtcDogMjtcXG4gICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAucHJpY2VbZGF0YS12LTQ0NGYzN2VlXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgcGFkZGluZzogLjJlbTtcXG4gICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgY29sb3I6IHJlZDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L0NvZGUvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGVBQWU7RUFDZixpQkFBaUI7Q0FBRTtBQUVyQjtFQUNFLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtDQUFFO0FBQ25CO0lBQ0UsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtDQUFFO0FBQ2hCO0lBQ0UsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osVUFBVTtJQUNWLFlBQVk7Q0FBRTtBQUVsQjtFQUNFLHFCQUFjO0VBQWQscUJBQWM7RUFBZCxjQUFjO0VBQ2QsK0JBQW9CO0VBQXBCLDhCQUFvQjtNQUFwQix3QkFBb0I7VUFBcEIsb0JBQW9CO0VBQ3BCLDBCQUErQjtNQUEvQix1QkFBK0I7VUFBL0IsK0JBQStCO0VBQy9CLFlBQVk7RUFDWix1QkFBdUI7Q0FBRTtBQUN6QjtJQUNFLHdCQUF3QjtJQUN4QixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLHVCQUF1QjtJQUN2QixvQkFBb0I7SUFDcEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtDQUFFO0FBQ3pCO01BQ0UsZUFBZTtNQUNmLFlBQVk7Q0FBRTtBQUNoQjtNQUNFLHFCQUFxQjtNQUNyQixZQUFZO01BQ1osaUJBQWlCO01BQ2pCLHdCQUF3QjtNQUN4QixxQkFBcUI7TUFDckIsY0FBYztNQUNkLHNCQUFzQjtDQUFFO0FBQzFCO01BQ0UsZUFBZTtNQUNmLGNBQWM7TUFDZCxnQkFBZ0I7TUFDaEIsa0JBQWtCO01BQ2xCLFdBQVc7TUFDWCxrQkFBa0I7Q0FBRVwiLFwiZmlsZVwiOlwiaG9tZS52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLmJhbm5lci1zd2lwZS1pdGVtIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5hZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIG1hcmdpbi10b3A6IDEwcHg7IH1cXG4gIC5hZCBpbWcge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB3aWR0aDogMTAwJTsgfVxcbiAgLmFkIC5saW5rIHtcXG4gICAgei1pbmRleDogMTA7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgcmlnaHQ6IDEwcHg7XFxuICAgIHRvcDogMTBweDtcXG4gICAgY29sb3I6ICNmZmY7IH1cXG5cXG4ucHJvZHVjdC1saXN0IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDEwcHggYXV0byA2NXB4OyB9XFxuICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0ge1xcbiAgICB3aWR0aDogY2FsYyg1MHZ3IC0gNHB4KTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgfVxcbiAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLnRodW1ibmFpbCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgd2lkdGg6IDEwMCU7IH1cXG4gICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5uYW1lIHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICBsaW5lLWhlaWdodDogMS4yO1xcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICAgIGJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgICAgIGxpbmUtY2xhbXA6IDI7XFxuICAgICAgd29yZC1icmVhazogYnJlYWstYWxsOyB9XFxuICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAucHJpY2Uge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIHBhZGRpbmc6IC4yZW07XFxuICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGNvbG9yOiByZWQ7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNDQ0ZjM3ZWVcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSA2MTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWFpblwiPlxyXG4gICAgPHd2LXN3aXBlIDpoZWlnaHQ9XCIxODBcIiA6YXV0bz1cIjQwMDBcIj5cclxuICAgICAgPHd2LXN3aXBlLWl0ZW0gY2xhc3M9XCJiYW5uZXItc3dpcGUtaXRlbVwiIHYtZm9yPVwiYmFubmVyIGluIGJhbm5lcnNcIiA6a2V5PVwiYmFubmVyLmluZGV4XCI+XHJcbiAgICAgICAgPGltZyA6c3JjPVwiYmFubmVyLmltZ1wiIGFsdD1cIlwiPlxyXG4gICAgICA8L3d2LXN3aXBlLWl0ZW0+XHJcbiAgICA8L3d2LXN3aXBlPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJhZFwiPlxyXG4gICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMTgvMDkvMzEvcHJhaXJpZS02NzkwMTRfXzM0MC5qcGdcIiBhbHQ9XCJcIi8+XHJcbiAgICAgIDxyb3V0ZXItbGluayB0bz1cIlwiPuWOu+eci+ecizwvcm91dGVyLWxpbms+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1saXN0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWl0ZW1cIiB2LWZvcj1cInByb2R1Y3QgaW4gcHJvZHVjdHMuZGF0YVwiPlxyXG4gICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3Byb2R1Y3QvJyArIHByb2R1Y3QuaWRcIj5cclxuICAgICAgICAgIDxpbWcgY2xhc3M9XCJ0aHVtYm5haWxcIiA6c3JjPVwicHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiIHYtdGV4dD1cInByb2R1Y3QubmFtZVwiPjwvc3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiIHYtaHRtbD1cInByb2R1Y3QucHJpY2VcIj48L2Rpdj5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBTd2lwZSwgU3dpcGVJdGVtIH0gZnJvbSAnd2UtdnVlJ1xyXG5cclxuICBjb25zdCBiYW5uZXJzID0gW1xyXG4gICAge1xyXG4gICAgICB1cmw6ICdqYXZhc2NyaXB0OicsXHJcbiAgICAgIGltZzogJ2h0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMTgvMDkvMzEvcHJhaXJpZS02NzkwMTRfXzM0MC5qcGcnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB1cmw6ICdqYXZhc2NyaXB0OicsXHJcbiAgICAgIGltZzogJ2h0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMTgvMDkvMjkvdGhlLXNjZW5lcnktNjc5MDExX18zNDAuanBnJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdXJsOiAnamF2YXNjcmlwdCcsXHJcbiAgICAgIGltZzogJ2h0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMjgvMTYvNDAvbGFrZS02OTYwOThfXzM0MC5qcGcnXHJcbiAgICB9XHJcbiAgXVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtTd2lwZS5uYW1lXTogU3dpcGUsXHJcbiAgICAgIFtTd2lwZUl0ZW0ubmFtZV06IFN3aXBlSXRlbVxyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9kdWN0czogW10sXHJcbiAgICAgICAgYmFubmVyc1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmdldFByb2R1Y3RzKClcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRQcm9kdWN0cyAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ3Byb2R1Y3QnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHJlc3BvbnNlLmRhdGEucHJvZHVjdHNcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAuYmFubmVyLXN3aXBlLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgLmFkIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuXHJcbiAgICBpbWcge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuXHJcbiAgICAubGluayB7XHJcbiAgICAgIHotaW5kZXg6IDEwO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIHJpZ2h0OiAxMHB4O1xyXG4gICAgICB0b3A6IDEwcHg7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3QtbGlzdCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1mbG93OiByb3cgd3JhcDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWFyZ2luOiAxMHB4IGF1dG8gNjVweDtcclxuXHJcbiAgICAucHJvZHVjdC1pdGVtIHtcclxuICAgICAgd2lkdGg6IGNhbGMoNTB2dyAtIDRweCk7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XHJcblxyXG4gICAgICAudGh1bWJuYWlsIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm5hbWUge1xyXG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xyXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XHJcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XHJcbiAgICAgICAgYm94LW9yaWVudDogdmVydGljYWw7XHJcbiAgICAgICAgbGluZS1jbGFtcDogMjtcclxuICAgICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5wcmljZSB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgcGFkZGluZzogLjJlbTtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgICAgY29sb3I6IHJlZDtcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9ob21lLnZ1ZT8zYTk3ODJhMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcIm1haW5cIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcInd2LXN3aXBlXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgaGVpZ2h0OiAxODAsIGF1dG86IDQwMDAgfSB9LFxuICAgICAgICBfdm0uX2woX3ZtLmJhbm5lcnMsIGZ1bmN0aW9uKGJhbm5lcikge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwid3Ytc3dpcGUtaXRlbVwiLFxuICAgICAgICAgICAgeyBrZXk6IGJhbm5lci5pbmRleCwgc3RhdGljQ2xhc3M6IFwiYmFubmVyLXN3aXBlLWl0ZW1cIiB9LFxuICAgICAgICAgICAgW19jKFwiaW1nXCIsIHsgYXR0cnM6IHsgc3JjOiBiYW5uZXIuaW1nLCBhbHQ6IFwiXCIgfSB9KV1cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImFkXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHNyYzpcbiAgICAgICAgICAgICAgICBcImh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTUvMDMvMTgvMDkvMzEvcHJhaXJpZS02NzkwMTRfXzM0MC5qcGdcIixcbiAgICAgICAgICAgICAgYWx0OiBcIlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInJvdXRlci1saW5rXCIsIHsgYXR0cnM6IHsgdG86IFwiXCIgfSB9LCBbX3ZtLl92KFwi5Y6755yL55yLXCIpXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWxpc3RcIiB9LFxuICAgICAgICBfdm0uX2woX3ZtLnByb2R1Y3RzLmRhdGEsIGZ1bmN0aW9uKHByb2R1Y3QpIHtcbiAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWl0ZW1cIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInJvdXRlci1saW5rXCIsIHsgYXR0cnM6IHsgdG86IFwiL3Byb2R1Y3QvXCIgKyBwcm9kdWN0LmlkIH0gfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBwcm9kdWN0LnRodW1ibmFpbCwgYWx0OiBcIlwiIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKHByb2R1Y3QubmFtZSkgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJpY2VcIixcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKHByb2R1Y3QucHJpY2UpIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNDQ0ZjM3ZWVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTQ0NGYzN2VlXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL2hvbWUudnVlXG4vLyBtb2R1bGUgaWQgPSA2MTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCJdLCJzb3VyY2VSb290IjoiIn0=