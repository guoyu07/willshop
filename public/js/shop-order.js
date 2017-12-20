webpackJsonp([1],{

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

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(622)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(624)
/* template */
var __vue_template__ = __webpack_require__(625)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-78933a8c"
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
Component.options.__file = "resources\\assets\\js\\shop\\pages\\order-list.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78933a8c", Component.options)
  } else {
    hotAPI.reload("data-v-78933a8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(626)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(628)
/* template */
var __vue_template__ = __webpack_require__(630)
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
Component.options.__file = "resources\\assets\\js\\shop\\pages\\order.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ac06c62", Component.options)
  } else {
    hotAPI.reload("data-v-9ac06c62", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(590);

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

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(591), __esModule: true };

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(592);
var $Object = __webpack_require__(13).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(25);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(19), 'Object', { defineProperty: __webpack_require__(26).f });


/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=30)}({0:function(e,t){e.exports=function(e,t,n,o,r,i){var s,c=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,c=e.default);var l="function"==typeof c?c.options:c;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=a):o&&(a=o),a){var f=l.functional,d=f?l.render:l.beforeCreate;f?(l._injectStyles=a,l.render=function(e,t){return a.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:c,options:l}}},20:function(e,t,n){"use strict";t.a={props:{url:String,replace:Boolean,to:[String,Object]},methods:{routerLink:function(){var e=this.to,t=this.url,n=this.$router,o=this.replace;console.log(e),console.log(t),e&&n?n[o?"replace":"push"](e):t&&(o?location.replace(t):location.href=t)}}}},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(31);n.d(t,"default",function(){return o.a})},31:function(e,t,n){"use strict";function o(e){n(32)}var r=n(33),i=n(34),s=n(0),c=o,u=s(r.a,i.a,!1,c,"data-v-17907de8",null);t.a=u.exports},32:function(e,t){},33:function(e,t,n){"use strict";var o=n(20);t.a={name:"wv-cell",mixins:[o.a],props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean},mounted:function(){this.$on("CLICK_IN_CELLSWIPE",this.onClick)},methods:{onClick:function(){this.$emit("click"),this.routerLink()}}}},34:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell",class:{"weui-cell_access":e.isLink},on:{click:e.onClick}},[n("div",{staticClass:"weui-cell_hd"},[e._t("icon")],2),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[e._t("bd",[n("p",{domProps:{innerHTML:e._s(e.title)}})])],2),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[e._t("ft",[e._v(e._s(e.value))])],2)])},r=[],i={render:o,staticRenderFns:r};t.a=i}})});

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=119)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,u=e.default);var f="function"==typeof u?u.options:u;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns,f._compiled=!0),n&&(f.functional=!0),o&&(f._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},f._ssrRegister=a):r&&(a=r),a){var l=f.functional,d=l?f.render:f.beforeCreate;l?(f._injectStyles=a,f.render=function(e,t){return a.call(t),d(e,t)}):f.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:u,options:f}}},119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(120);n.d(t,"default",function(){return r.a})},120:function(e,t,n){"use strict";function r(e){n(121)}var o=n(122),i=n(123),s=n(0),u=r,c=s(o.a,i.a,!1,u,"data-v-f093300c",null);t.a=c.exports},121:function(e,t){},122:function(e,t,n){"use strict";t.a={name:"wv-group",props:{title:String,titleColor:String}}},123:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.title?n("div",{staticClass:"weui-cells__title",style:{color:e.titleColor},domProps:{innerHTML:e._s(e.title)}}):e._e(),e._v(" "),n("div",{staticClass:"weui-cells"},[e._t("default")],2)])},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=114)}({0:function(e,t){e.exports=function(e,t,n,i,o,r){var s,a=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,a=e.default);var c="function"==typeof a?a.options:a;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var d;if(r?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=d):i&&(d=i),d){var l=c.functional,f=l?c.render:c.beforeCreate;l?(c._injectStyles=d,c.render=function(e,t){return d.call(t),f(e,t)}):c.beforeCreate=f?[].concat(f,d):[d]}return{esModule:s,exports:a,options:c}}},114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(115);n.d(t,"default",function(){return i.a})},115:function(e,t,n){"use strict";function i(e){n(116)}var o=n(117),r=n(118),s=n(0),a=i,u=s(o.a,r.a,!1,a,"data-v-90bc4c20",null);t.a=u.exports},116:function(e,t){},117:function(e,t,n){"use strict";t.a={name:"wv-button",props:{type:{type:String,default:"default"},isLoading:Boolean,disabled:Boolean,mini:Boolean,plain:Boolean},methods:{handleClick:function(e){this.$emit("click",e)}},computed:{classObject:function(){var e={},t=this.plain?"weui-btn_plain-"+this.type:"weui-btn_"+this.type,n=this.plain?"weui-btn_plain-disabled":"weui-btn_disabled";return e[t]=!0,e[n]=this.disabled,e["weui-btn_loading"]=this.isLoading,e["weui-btn_mini"]=this.mini,e}}}},118:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"weui-btn",class:e.classObject,attrs:{disabled:e.disabled},on:{click:e.handleClick}},[e.isLoading?n("i",{staticClass:"weui-loading"}):e._e(),e._v(" "),e._t("default")],2)},o=[],r={render:i,staticRenderFns:o};t.a=r}})});

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=261)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var c="function"==typeof u?u.options:u;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=a):r&&(a=r),a){var d=c.functional,l=d?c.render:c.beforeCreate;d?(c._injectStyles=a,c.render=function(e,t){return a.call(t),l(e,t)}):c.beforeCreate=l?[].concat(l,a):[a]}return{esModule:s,exports:u,options:c}}},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(262);n.d(t,"default",function(){return r.a})},262:function(e,t,n){"use strict";function r(e){n(263)}var o=n(264),i=n(265),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-4d6eccf7",null);t.a=f.exports},263:function(e,t){},264:function(e,t,n){"use strict";t.a={name:"wv-flex-item",props:{flex:{type:[Number,String],default:1}},computed:{gutter:function(){return this.$parent.gutter},style:function(){var e={};return this.gutter&&(e.paddingLeft=this.gutter/2+"px",e.paddingRight=e.paddingLeft),e.flex=this.flex,e}}}},265:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex__item",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=256)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=c):r&&(c=r),c){var d=a.functional,l=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(e,t){return c.call(t),l(e,t)}):a.beforeCreate=l?[].concat(l,c):[c]}return{esModule:s,exports:u,options:a}}},256:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(257);n.d(t,"default",function(){return r.a})},257:function(e,t,n){"use strict";function r(e){n(258)}var o=n(259),i=n(260),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-6fd6a76c",null);t.a=f.exports},258:function(e,t){},259:function(e,t,n){"use strict";t.a={name:"wv-flex",props:{gutter:{type:Number,default:0}},computed:{style:function(){var e={};if(this.gutter){var t="-"+this.gutter/2+"px";e.marginLeft=t,e.marginRight=t}return e}}}},260:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 600:
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

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=159)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,a=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId=o);var d;if(i?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=d):r&&(d=r),d){var f=u.functional,l=f?u.render:u.beforeCreate;f?(u._injectStyles=d,u.render=function(e,t){return d.call(t),l(e,t)}):u.beforeCreate=l?[].concat(l,d):[d]}return{esModule:s,exports:a,options:u}}},159:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(160);n.d(t,"default",function(){return r.a})},160:function(e,t,n){"use strict";function r(e){n(161)}var o=n(162),i=n(163),s=n(0),a=r,c=s(o.a,i.a,!1,a,"data-v-36cfba55",null);t.a=c.exports},161:function(e,t){},162:function(e,t,n){"use strict";t.a={name:"wv-navbar-item",props:{id:String,disabled:Boolean},computed:{isSelected:function(){return this.id===this.$parent.value},style:function(){return{borderWidth:this.$parent.lineWidth+"px",borderColor:this.$parent.activeColor,color:this.isSelected?this.$parent.activeColor:this.$parent.color}}},methods:{onClick:function(){this.disabled||this.$parent.$emit("input",this.id)}}}},163:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-navbar__item",class:{"wv-navbar__item_on":!e.$parent.animate&&e.$parent.value===e.id,disabled:e.disabled},style:e.style,on:{click:e.onClick}},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=154)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var u,a=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(u=e,a=e.default);var s="function"==typeof a?a.options:a;t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns,s._compiled=!0),n&&(s.functional=!0),o&&(s._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},s._ssrRegister=c):r&&(c=r),c){var d=s.functional,l=d?s.render:s.beforeCreate;d?(s._injectStyles=c,s.render=function(e,t){return c.call(t),l(e,t)}):s.beforeCreate=l?[].concat(l,c):[c]}return{esModule:u,exports:a,options:s}}},154:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(155);n.d(t,"default",function(){return r.a})},155:function(e,t,n){"use strict";function r(e){n(156)}var o=n(157),i=n(158),u=n(0),a=r,f=u(o.a,i.a,!1,a,"data-v-79f63fb3",null);t.a=f.exports},156:function(e,t){},157:function(e,t,n){"use strict";t.a={name:"wv-navbar",props:{fixed:Boolean,color:{type:String,default:"#333"},backgroundColor:{type:String,default:"#fff"},activeColor:{type:String,default:"#2196f3"},disabledColor:{type:String,default:"#cfcfcf"},lineWidth:{type:Number,default:2},animate:{type:Boolean,default:!0},value:{}},data:function(){return{childrenCount:0,currentIndex:0}},computed:{style:function(){var e={position:this.fixed?"fixed":"absolute",backgroundColor:this.backgroundColor};return this.fixed&&(e.top=0,e.left=0,e.right=0),e},lineStyle:function(){var e=1/this.childrenCount*100;return{backgroundColor:this.activeColor,left:e*this.currentIndex+"%",width:e+"%",height:this.lineWidth+"px"}}},mounted:function(){var e=this;this.$nextTick(function(){e.childrenCount=e.$children.length,e.updateCurrentIndex()})},methods:{updateCurrentIndex:function(){var e=this;this.$children.forEach(function(t,n){t.id===e.value&&(e.currentIndex=n)})}},watch:{value:function(e){this.$emit("change",e),this.updateCurrentIndex()}}}},158:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wv-navbar",style:e.style},[e._t("default"),e._v(" "),e.animate?n("div",{staticClass:"wv-navbar-underline",style:e.lineStyle}):e._e()],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(623);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("222459d5", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78933a8c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./order-list.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-78933a8c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./order-list.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 623:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(74)(true);
// imports


// module
exports.push([module.i, "\n.order-list[data-v-78933a8c] {\n  padding-top: 65px;\n}\n.order-list .order-item[data-v-78933a8c] {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em;\n}\n.order-list .order-item .hd[data-v-78933a8c] {\n      display: block;\n      overflow: hidden;\n}\n.order-list .order-item .hd .order-number[data-v-78933a8c] {\n        float: left;\n        font-size: 13px;\n        color: #666;\n}\n.order-list .order-item .hd .btn-delete[data-v-78933a8c] {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px;\n}\n.order-list .order-item .bd[data-v-78933a8c] {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5;\n}\n.order-list .order-item .bd .product[data-v-78933a8c] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        padding: .2em;\n}\n.order-list .order-item .bd .product .thumbnail[data-v-78933a8c] {\n          width: 60px;\n          height: 60px;\n}\n.order-list .order-item .bd .product .name[data-v-78933a8c] {\n          margin-left: 10px;\n          color: #555;\n}\n.order-list .order-item .ft[data-v-78933a8c] {\n      padding: 10px;\n      text-align: right;\n}\n.empty-msg[data-v-78933a8c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #777;\n}\n.empty-msg .iconfont[data-v-78933a8c] {\n    font-size: 80px;\n}\n.empty-msg .msg[data-v-78933a8c] {\n    font-size: 14px;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/order-list.vue"],"names":[],"mappings":";AAAA;EACE,kBAAkB;CAAE;AACpB;IACE,eAAe;IACf,iBAAiB;IACjB,YAAY;IACZ,cAAc;IACd,uBAAuB;IACvB,mBAAmB;CAAE;AACrB;MACE,eAAe;MACf,iBAAiB;CAAE;AACnB;QACE,YAAY;QACZ,gBAAgB;QAChB,YAAY;CAAE;AAChB;QACE,aAAa;QACb,gBAAgB;QAChB,YAAY;QACZ,mBAAmB;CAAE;AACzB;MACE,eAAe;MACf,iBAAiB;MACjB,0BAA0B;CAAE;AAC5B;QACE,qBAAc;QAAd,qBAAc;QAAd,cAAc;QACd,cAAc;CAAE;AAChB;UACE,YAAY;UACZ,aAAa;CAAE;AACjB;UACE,kBAAkB;UAClB,YAAY;CAAE;AACpB;MACE,cAAc;MACd,kBAAkB;CAAE;AAE1B;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,YAAY;EACZ,aAAa;EACb,6BAAuB;EAAvB,8BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,yBAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,YAAY;CAAE;AACd;IACE,gBAAgB;CAAE;AACpB;IACE,gBAAgB;CAAE","file":"order-list.vue","sourcesContent":[".order-list {\n  padding-top: 65px; }\n  .order-list .order-item {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em; }\n    .order-list .order-item .hd {\n      display: block;\n      overflow: hidden; }\n      .order-list .order-item .hd .order-number {\n        float: left;\n        font-size: 13px;\n        color: #666; }\n      .order-list .order-item .hd .btn-delete {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px; }\n    .order-list .order-item .bd {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5; }\n      .order-list .order-item .bd .product {\n        display: flex;\n        padding: .2em; }\n        .order-list .order-item .bd .product .thumbnail {\n          width: 60px;\n          height: 60px; }\n        .order-list .order-item .bd .product .name {\n          margin-left: 10px;\n          color: #555; }\n    .order-list .order-item .ft {\n      padding: 10px;\n      text-align: right; }\n\n.empty-msg {\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: #777; }\n  .empty-msg .iconfont {\n    font-size: 80px; }\n  .empty-msg .msg {\n    font-size: 14px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(76);









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
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default.a), _components),

  data: function data() {
    return {
      status: 'all',
      orders: []
    };
  },


  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["mapState"])({
    isLoading: function isLoading(state) {
      return state.isLoading;
    }
  })),

  mounted: function mounted() {
    this.getOrders();
  },


  methods: {
    getOrders: function getOrders() {
      var _this = this;

      this.axios.get('order', {
        params: { status: this.status }
      }).then(function (response) {
        _this.orders = response.data.orders;
      }).catch(function (error) {
        console.log(error);
      });
    },
    tabChange: function tabChange() {
      this.getOrders();
    },
    cancelOrder: function cancelOrder(orderId) {
      var _this2 = this;

      this.$root.confirm('操作确认', '确定要取消订单？').then(function () {
        _this2.axios.post('order/' + orderId + '/cancel').then(function (response) {
          _this2.$root.success('取消成功');
        }).catch(function (error) {
          console.log(error);
        });
      });
    },
    destroyOrder: function destroyOrder(orderId) {
      var _this3 = this;

      this.$root.confirm('操作确认', '确定要删除订单？').then(function () {
        _this3.axios.delete('order/' + orderId + '/destroy').then(function (response) {
          _this3.$root.success('删除成功');
        }).catch(function (error) {
          console.log(error);
        });
      });
    }
  }
});

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "wv-navbar",
        {
          staticClass: "tab",
          attrs: { "active-color": "red", fixed: "" },
          on: { change: _vm.tabChange },
          model: {
            value: _vm.status,
            callback: function($$v) {
              _vm.status = $$v
            },
            expression: "status"
          }
        },
        [
          _c("wv-navbar-item", { attrs: { id: "all" } }, [_vm._v("全部")]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "need_to_pay" } }, [
            _vm._v("待付款")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "delivered" } }, [
            _vm._v("待收货")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "finished" } }, [
            _vm._v("已完成")
          ]),
          _vm._v(" "),
          _c("wv-navbar-item", { attrs: { id: "canceled" } }, [
            _vm._v("已取消")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _vm.orders.data && _vm.orders.data.length > 0
        ? _c(
            "div",
            { staticClass: "order-list" },
            _vm._l(_vm.orders.data, function(order) {
              return _c(
                "router-link",
                {
                  key: order.id,
                  staticClass: "order-item",
                  attrs: { to: "/order/" + order.number }
                },
                [
                  _c("div", { staticClass: "hd" }, [
                    _c("span", { staticClass: "order-number" }, [
                      _vm._v(_vm._s(order.number))
                    ]),
                    _vm._v(" "),
                    order.status === "canceled" || order.status === "canceled"
                      ? _c(
                          "div",
                          {
                            staticClass: "btn-delete",
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                $event.stopPropagation()
                                _vm.destroyOrder(order.id)
                              }
                            }
                          },
                          [_c("i", { staticClass: "iconfont icon-delete" })]
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "bd" },
                    _vm._l(order.order_items, function(orderItem) {
                      return _c(
                        "div",
                        { key: orderItem.product.id, staticClass: "product" },
                        [
                          _c("img", {
                            staticClass: "thumbnail",
                            attrs: { src: orderItem.product.thumbnail, alt: "" }
                          }),
                          _vm._v(" "),
                          _c("h4", {
                            staticClass: "name",
                            domProps: {
                              innerHTML: _vm._s(orderItem.product.name)
                            }
                          })
                        ]
                      )
                    })
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "ft" },
                    [
                      order.status === "need_to_pay"
                        ? _c(
                            "wv-button",
                            {
                              attrs: { type: "primary", mini: "", plain: "" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  _vm.$router.push("/payment/" + order.number)
                                }
                              }
                            },
                            [_vm._v("支付\n        ")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "primary", mini: "", plain: "" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              $event.stopPropagation()
                              _vm.$router.push("payment/" + order.number)
                            }
                          }
                        },
                        [_vm._v("\n          再次购买\n        ")]
                      ),
                      _vm._v(" "),
                      order.status === "need_to_pay"
                        ? _c(
                            "wv-button",
                            {
                              attrs: { type: "default", mini: "", plain: "" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  $event.stopPropagation()
                                  _vm.cancelOrder(order.id)
                                }
                              }
                            },
                            [_vm._v("取消\n        ")]
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ]
              )
            })
          )
        : !_vm.isLoading && _vm.orders.data && _vm.orders.data.length === 0
          ? _c("div", { staticClass: "empty-msg" }, [
              _c("i", { staticClass: "iconfont icon-order" }),
              _vm._v(" "),
              _c("div", { staticClass: "msg" }, [_vm._v("没有相关订单记录")])
            ])
          : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-78933a8c", module.exports)
  }
}

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(627);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("14e59a46", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ac06c62\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./order.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9ac06c62\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(74)(true);
// imports


// module
exports.push([module.i, "\n.status-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#e64340), to(#ec6f6d));\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px;\n}\n.status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em;\n}\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.product-list .product-item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n.product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px;\n}\n.product-list .product-item .item-right {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      padding: 0 14px;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500;\n}\n.product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888;\n}\n.product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px;\n}\n.product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em;\n}\n.fee-info {\n  margin-bottom: 70px;\n}\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\nfooter .weui-flex__item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/order.vue"],"names":[],"mappings":";AAAA;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,YAAY;EACZ,aAAa;EACb,wFAA8D;EAA9D,8DAA8D;EAC9D,eAAe;EACf,oBAAoB;CAAE;AACtB;IACE,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;CAAE;AAEvB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,cAAc;EACd,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;CAAE;AACzB;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,aAAa;IACb,iCAAiC;IACjC,mBAAmB;CAAE;AACrB;MACE,YAAY;MACZ,aAAa;CAAE;AACjB;MACE,qBAAc;MAAd,qBAAc;MAAd,cAAc;MACd,6BAAuB;MAAvB,8BAAuB;UAAvB,2BAAuB;cAAvB,uBAAuB;MACvB,gBAAgB;MAChB,0BAA+B;UAA/B,uBAA+B;cAA/B,+BAA+B;CAAE;AACjC;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;QAChB,iBAAiB;CAAE;AACrB;QACE,eAAe;QACf,gBAAgB;QAChB,YAAY;CAAE;AAChB;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;CAAE;AACpB;QACE,gBAAgB;QAChB,mBAAmB;QACnB,YAAY;QACZ,aAAa;QACb,uBAAuB;QACvB,iBAAiB;QACjB,cAAc;QACd,mBAAmB;CAAE;AAE7B;EACE,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,oBAAoB;EACpB,0BAA0B;CAAE;AAC5B;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,yBAAwB;QAAxB,sBAAwB;YAAxB,wBAAwB;CAAE","file":"order.vue","sourcesContent":[".status-bar {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px; }\n  .status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em; }\n\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px; }\n\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff; }\n  .product-list .product-item {\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative; }\n    .product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px; }\n    .product-list .product-item .item-right {\n      display: flex;\n      flex-direction: column;\n      padding: 0 14px;\n      justify-content: space-between; }\n      .product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500; }\n      .product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888; }\n      .product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px; }\n      .product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em; }\n\n.fee-info {\n  margin-bottom: 70px; }\n\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem); }\n  footer .weui-flex__item {\n    display: flex;\n    justify-content: center; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__ = __webpack_require__(629);












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
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a), _components),

  mixins: [__WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__["a" /* default */]],

  data: function data() {
    return {
      orderId: null,
      order: {}
    };
  },
  mounted: function mounted() {
    this.orderNumber = this.$route.params.orderNumber;

    this.getOrder();
  },


  methods: {
    getOrder: function getOrder() {
      var _this = this;

      this.axios.get('order/' + this.orderNumber).then(function (response) {
        _this.order = response.data.order;
      }).catch(function (error) {
        console.log(error);
      });
    },
    addToCart: function addToCart(productId) {
      var _this2 = this;

      console.log(productId);

      var postData = {
        productId: productId,
        amount: 1
      };

      this.axios.post('cart/add', postData).then(function (response) {
        _this2.$root.success('添加成功');
      });
    },
    cancelOrder: function cancelOrder() {
      var _this3 = this;

      this.axios.post('order/cancel').then(function (response) {
        _this3.$root.success('取消成功');
      });
    },
    deleteOrder: function deleteOrder() {
      var _this4 = this;

      this.axios.post('order/cancel').then(function (response) {
        _this4.$root.success('删除成功');
      });
    }
  }
});

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filters: {
    statusFilter: function statusFilter(status) {
      switch (status) {
        case 'need_to_pay':
          return '待支付';
        case 'paid':
          return '待支付';
        case 'delivered':
          return '待支付';
        case 'finished':
          return '待支付';
        case 'canceled':
          return '待支付';
        default:
          return '';
      }
    }
  }
});

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "status-bar" }, [
        _c("span", { staticClass: "status-text" }, [
          _vm._v(_vm._s(_vm._f("statusFilter")(_vm.order.status)))
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "address-info" }, [
        _c("span", {
          staticClass: "name",
          domProps: { textContent: _vm._s(_vm.order.consumer_name) }
        }),
        _vm._v(" "),
        _c("span", {
          staticClass: "mobile",
          domProps: { textContent: _vm._s(_vm.order.consumer_mobile) }
        }),
        _vm._v(" "),
        _c("p", {
          staticClass: "address",
          domProps: { textContent: _vm._s(_vm.order.address) }
        })
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "product-list" },
        _vm._l(_vm.order.order_items, function(orderItem) {
          return _c(
            "router-link",
            {
              key: orderItem.product.id,
              staticClass: "product-item",
              attrs: { to: "/product/" + orderItem.product.id }
            },
            [
              _c("img", {
                staticClass: "thumbnail",
                attrs: { src: orderItem.product.thumbnail, alt: "" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "item-right" }, [
                _c("h4", {
                  staticClass: "name",
                  domProps: { innerHTML: _vm._s(orderItem.product.name) }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "amount" }, [
                  _vm._v("数量：" + _vm._s(orderItem.amount))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "price" }, [
                  _vm._v(_vm._s(_vm._f("priceFilter")(orderItem.product.price)))
                ]),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "add-to-cart",
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        $event.stopPropagation()
                        _vm.addToCart(orderItem.product.id)
                      }
                    }
                  },
                  [_vm._v("加入购物车")]
                )
              ])
            ]
          )
        })
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        { staticClass: "order-info" },
        [
          _c("wv-cell", {
            attrs: { title: "订单号", value: _vm.order.number }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "下单时间", value: _vm.order.created_at }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "支付时间", value: _vm.order.created_at }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "支付方式", value: _vm.order.created_at }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        { staticClass: "fee-info" },
        [
          _c("wv-cell", {
            attrs: { title: "订单总额", value: _vm.order.total_fee }
          }),
          _vm._v(" "),
          _c("wv-cell", {
            attrs: { title: "运费", value: _vm.order.total_fee }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "footer",
        [
          _c(
            "wv-flex",
            { attrs: { gutter: 20 } },
            [
              _vm.order.status === "need_to_pay"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "warn", mini: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.cancelOrder($event)
                            }
                          }
                        },
                        [_vm._v("取消订单")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.order.status === "canceled" || _vm.order.status === "finished"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "warn", mini: "" },
                          nativeOn: {
                            click: function($event) {
                              _vm.deleteOrder($event)
                            }
                          }
                        },
                        [_vm._v("删除订单")]
                      )
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.order.status === "need_to_pay"
                ? _c(
                    "wv-flex-item",
                    [
                      _c(
                        "wv-button",
                        {
                          attrs: { type: "primary", mini: "" },
                          on: {
                            click: function($event) {
                              _vm.$router.push("/payment/" + _vm.order.number)
                            }
                          }
                        },
                        [_vm._v("去付款")]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ],
            1
          )
        ],
        1
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
    require("vue-hot-reload-api")      .rerender("data-v-9ac06c62", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9idXR0b24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9wcmljZV9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbmF2YmFyLWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbmF2YmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZT9lZDJhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZT82OGM4Iiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlPzM2MzUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT9kMGNkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWU/NjlhYyIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3N0YXR1c19maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT8wZmQzIl0sIm5hbWVzIjpbImZpbHRlcnMiLCJwcmljZUZpbHRlciIsInZhbCIsIk51bWJlciIsInRvRml4ZWQiLCJzdGF0dXNGaWx0ZXIiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsaUJBQWlCO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6QztBQUNBO0FBQ0EsdUJBQXVCLDJCQUEyQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQSxZQUFZLHVCQUF1QjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCLHVCQUF1QjtBQUM1QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0TkE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0EseUJBQXFNO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBLDRDQUE0ZDtBQUM1ZDtBQUNBLDhDQUFrTDtBQUNsTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFzTTtBQUN0TTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNGQ7QUFDNWQ7QUFDQSw4Q0FBbUw7QUFDbkw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7QUM1Q0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsc0NBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7OztBQ3ZCQSxrQkFBa0IseUQ7Ozs7Ozs7QUNBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0EscUVBQXVFLDRDQUE0Qzs7Ozs7Ozs7QUNGbkgsZUFBZSwyQkFBd0UsMkRBQTJELEtBQUssVUFBVSw2REFBNkQsK0NBQStDLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxrQkFBa0IsRUFBRSxnQkFBZ0IsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLG9CQUFvQixhQUFhLEtBQUssT0FBTyw4Q0FBOEMsVUFBVSxzQkFBc0IsdURBQXVELDBHQUEwRyxvQkFBb0IsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLFlBQVksMkJBQTJCLFdBQVcsRUFBRSxvQkFBb0IsYUFBYSxjQUFjLE1BQU0sd0VBQXdFLGNBQWMsbUJBQW1CLG9CQUFvQixhQUFhLFlBQVksS0FBSyxtQ0FBbUMsT0FBTyxxQkFBcUIsUUFBUSxxQkFBcUIsZ0JBQWdCLG9CQUFvQiw0Q0FBNEMsVUFBVSxtQkFBbUIseUNBQXlDLG9CQUFvQixhQUFhLGlCQUFpQiw4Q0FBOEMsZ0JBQWdCLCtCQUErQiw0QkFBNEIsS0FBSyxpQkFBaUIsV0FBVywyQkFBMkIsc0NBQXNDLDRCQUE0QixvQkFBb0IsVUFBVSx5QkFBeUIsMkJBQTJCLDRCQUE0Qix5Q0FBeUMsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7QUNBejBGLGVBQWUsMkJBQXdFLDJEQUEyRCxLQUFLLFVBQVUsNkRBQTZELCtDQUErQyxtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLGdDQUFnQyxlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLGlIQUFpSCxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyw0Q0FBNEMsd0JBQXdCLHNDQUFzQyxPQUFPLGlDQUFpQyxxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsYUFBYSxjQUFjLE9BQU8sMEVBQTBFLGNBQWMsb0JBQW9CLHFCQUFxQixhQUFhLEtBQUssdUJBQXVCLGlDQUFpQyxxQkFBcUIsYUFBYSxpQkFBaUIsOENBQThDLGlDQUFpQyx1Q0FBdUMsbUJBQW1CLFdBQVcseUJBQXlCLDRCQUE0Qix5QkFBeUIsd0JBQXdCLFNBQVMsNEJBQTRCLE9BQU8sRUFBRSxFOzs7Ozs7O0FDQTd0RSxlQUFlLDJCQUF3RSwyREFBMkQsS0FBSyxVQUFVLDZEQUE2RCwrQ0FBK0MsbUJBQW1CLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxTQUFTLHVDQUF1QyxxQ0FBcUMsb0NBQW9DLEVBQUUsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELG1CQUFtQixFQUFFLGdCQUFnQixnQ0FBZ0MsZUFBZSxvQkFBb0IsZ0RBQWdELHVDQUF1QyxpSEFBaUgsTUFBTSxvQkFBb0IsMFBBQTBQLCtCQUErQiwrQ0FBK0MsNENBQTRDLHdCQUF3QixzQ0FBc0MsT0FBTyxpQ0FBaUMscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxhQUFhLDJCQUEyQixXQUFXLEVBQUUscUJBQXFCLGFBQWEsY0FBYyxPQUFPLDBFQUEwRSxjQUFjLG9CQUFvQixxQkFBcUIsYUFBYSxLQUFLLHdCQUF3QixNQUFNLDhCQUE4QiwrREFBK0QsVUFBVSx3QkFBd0IsdUJBQXVCLFdBQVcsdUJBQXVCLFFBQVEsMkhBQTJILHlHQUF5RyxxQkFBcUIsYUFBYSxpQkFBaUIsOENBQThDLG1CQUFtQixrREFBa0Qsb0JBQW9CLEtBQUsscUJBQXFCLHFCQUFxQiwyQkFBMkIsdUNBQXVDLFNBQVMsNEJBQTRCLE9BQU8sRUFBRSxFOzs7Ozs7O0FDQXJtRixlQUFlLDJCQUF3RSwyREFBMkQsS0FBSyxVQUFVLDZEQUE2RCwrQ0FBK0MsbUJBQW1CLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxTQUFTLHVDQUF1QyxxQ0FBcUMsb0NBQW9DLEVBQUUsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELG1CQUFtQixFQUFFLGdCQUFnQixnQ0FBZ0MsZUFBZSxvQkFBb0IsZ0RBQWdELHVDQUF1QyxpSEFBaUgsTUFBTSxvQkFBb0IsMFBBQTBQLCtCQUErQiwrQ0FBK0MsNENBQTRDLHdCQUF3QixzQ0FBc0MsT0FBTyxpQ0FBaUMscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxhQUFhLDJCQUEyQixXQUFXLEVBQUUscUJBQXFCLGFBQWEsY0FBYyxPQUFPLDBFQUEwRSxjQUFjLG9CQUFvQixxQkFBcUIsYUFBYSxLQUFLLDJCQUEyQixNQUFNLGdDQUFnQyxXQUFXLGtCQUFrQiwyQkFBMkIsa0JBQWtCLFNBQVMsMEdBQTBHLHFCQUFxQixhQUFhLGlCQUFpQiw4QkFBOEIsNkJBQTZCLDRDQUE0QyxzQkFBc0IsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7QUNBdHlFLGVBQWUsMkJBQXdFLDJEQUEyRCxLQUFLLFVBQVUsNkRBQTZELCtDQUErQyxtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLGdDQUFnQyxlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLGlIQUFpSCxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyw0Q0FBNEMsd0JBQXdCLHNDQUFzQyxPQUFPLGlDQUFpQyxxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsYUFBYSxjQUFjLE9BQU8sMEVBQTBFLGNBQWMsb0JBQW9CLHFCQUFxQixhQUFhLEtBQUssc0JBQXNCLFFBQVEsdUJBQXVCLFdBQVcsaUJBQWlCLFNBQVMsZ0JBQWdCLDZCQUE2QiwrQkFBK0IsWUFBWSxxQkFBcUIsYUFBYSxpQkFBaUIsOEJBQThCLDZCQUE2QixzQ0FBc0Msc0JBQXNCLFNBQVMsNEJBQTRCLE9BQU8sRUFBRSxFOzs7Ozs7OztBQ0FwdEUseURBQWU7QUFDYkEsV0FBUztBQUNQQyxpQkFBYSxxQkFBVUMsR0FBVixFQUFlO0FBQzFCLGFBQU8sTUFBTUMsT0FBT0QsR0FBUCxFQUFZRSxPQUFaLENBQW9CLENBQXBCLENBQWI7QUFDRDtBQUhNO0FBREksQ0FBZixFOzs7Ozs7O0FDQUEsZUFBZSwyQkFBd0UsMkRBQTJELEtBQUssVUFBVSw2REFBNkQsK0NBQStDLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsYUFBYSwyQkFBMkIsV0FBVyxFQUFFLHFCQUFxQixhQUFhLGNBQWMsT0FBTywwRUFBMEUsY0FBYyxvQkFBb0IscUJBQXFCLGFBQWEsS0FBSyw2QkFBNkIsMkJBQTJCLFdBQVcsc0JBQXNCLG9DQUFvQyxrQkFBa0IsT0FBTyxpSkFBaUosVUFBVSxtQkFBbUIsc0RBQXNELHFCQUFxQixhQUFhLGlCQUFpQiw4QkFBOEIsNkJBQTZCLHFDQUFxQyxvRkFBb0YsbUJBQW1CLGlCQUFpQixzQkFBc0IsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7QUNBbmhGLGVBQWUsMkJBQXdFLDJEQUEyRCxLQUFLLFVBQVUsNkRBQTZELCtDQUErQyxtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLGdDQUFnQyxlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLGlIQUFpSCxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyw0Q0FBNEMsd0JBQXdCLHNDQUFzQyxPQUFPLGlDQUFpQyxxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsYUFBYSxjQUFjLE9BQU8sMEVBQTBFLGNBQWMsb0JBQW9CLHFCQUFxQixhQUFhLEtBQUssd0JBQXdCLHFCQUFxQiwyQkFBMkIsa0JBQWtCLDJCQUEyQixjQUFjLDhCQUE4QixnQkFBZ0IsOEJBQThCLFlBQVksc0JBQXNCLFVBQVUsd0JBQXdCLFVBQVUsaUJBQWlCLE9BQU8sZ0NBQWdDLFdBQVcsaUJBQWlCLE9BQU8sNkVBQTZFLGtEQUFrRCxzQkFBc0IsK0JBQStCLE9BQU8sdUdBQXVHLG9CQUFvQixXQUFXLDBCQUEwQiwwREFBMEQsRUFBRSxVQUFVLDhCQUE4QixXQUFXLHFDQUFxQyxtQ0FBbUMsR0FBRyxRQUFRLGtCQUFrQixvREFBb0QscUJBQXFCLGFBQWEsaUJBQWlCLDhDQUE4QyxnQkFBZ0Isc0NBQXNDLCtDQUErQyxvREFBb0QsYUFBYSxTQUFTLDRCQUE0QixPQUFPLEVBQUUsRTs7Ozs7OztBQ0ExbEc7O0FBRUE7QUFDQSxxQ0FBd087QUFDeE87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNKQUFzSixpRkFBaUY7QUFDdk8sK0pBQStKLGlGQUFpRjtBQUNoUDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSx5REFBMEQsc0JBQXNCLEdBQUcsNENBQTRDLHFCQUFxQix1QkFBdUIsa0JBQWtCLG9CQUFvQiw2QkFBNkIseUJBQXlCLEdBQUcsZ0RBQWdELHVCQUF1Qix5QkFBeUIsR0FBRyw4REFBOEQsc0JBQXNCLDBCQUEwQixzQkFBc0IsR0FBRyw0REFBNEQsdUJBQXVCLDBCQUEwQixzQkFBc0IsNkJBQTZCLEdBQUcsZ0RBQWdELHVCQUF1Qix5QkFBeUIsa0NBQWtDLEdBQUcseURBQXlELCtCQUErQiwrQkFBK0Isd0JBQXdCLHdCQUF3QixHQUFHLG9FQUFvRSx3QkFBd0IseUJBQXlCLEdBQUcsK0RBQStELDhCQUE4Qix3QkFBd0IsR0FBRyxnREFBZ0Qsc0JBQXNCLDBCQUEwQixHQUFHLCtCQUErQix5QkFBeUIseUJBQXlCLGtCQUFrQixnQkFBZ0IsaUJBQWlCLGlDQUFpQyxrQ0FBa0MsbUNBQW1DLG1DQUFtQyw2QkFBNkIsOEJBQThCLG9DQUFvQyw4QkFBOEIsK0JBQStCLGdDQUFnQyxnQkFBZ0IsR0FBRyx5Q0FBeUMsc0JBQXNCLEdBQUcsb0NBQW9DLHNCQUFzQixHQUFHLFVBQVUsaUhBQWlILEtBQUssWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsS0FBSyxNQUFNLFVBQVUsWUFBWSxXQUFXLFlBQVksS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLEtBQUssTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxNQUFNLFlBQVksV0FBVyxLQUFLLE1BQU0sVUFBVSxZQUFZLEtBQUssTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLEtBQUssS0FBSyxZQUFZLEtBQUssTUFBTSxZQUFZLDhEQUE4RCxzQkFBc0IsRUFBRSw2QkFBNkIscUJBQXFCLHVCQUF1QixrQkFBa0Isb0JBQW9CLDZCQUE2Qix5QkFBeUIsRUFBRSxtQ0FBbUMsdUJBQXVCLHlCQUF5QixFQUFFLG1EQUFtRCxzQkFBc0IsMEJBQTBCLHNCQUFzQixFQUFFLGlEQUFpRCx1QkFBdUIsMEJBQTBCLHNCQUFzQiw2QkFBNkIsRUFBRSxtQ0FBbUMsdUJBQXVCLHlCQUF5QixrQ0FBa0MsRUFBRSw4Q0FBOEMsd0JBQXdCLHdCQUF3QixFQUFFLDJEQUEyRCx3QkFBd0IseUJBQXlCLEVBQUUsc0RBQXNELDhCQUE4Qix3QkFBd0IsRUFBRSxtQ0FBbUMsc0JBQXNCLDBCQUEwQixFQUFFLGdCQUFnQixrQkFBa0IsZ0JBQWdCLGlCQUFpQiwyQkFBMkIsNEJBQTRCLHdCQUF3QixnQkFBZ0IsRUFBRSwwQkFBMEIsc0JBQXNCLEVBQUUscUJBQXFCLHNCQUFzQixFQUFFLHFCQUFxQjs7QUFFcmhJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3VDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBOztBQUdBO0FBRUEscUxBQ0EsMk5BQ0EsMk5BR0E7O3dCQUNBOztjQUVBO2NBRUE7QUFIQTtBQUtBOzs7QUFDQTs7bUJBS0E7O0FBSkE7OzhCQUtBO1NBQ0E7QUFFQTs7Ozs7QUFFQTs7OytCQUVBO0FBREEsa0NBRUE7cUNBQ0E7Z0NBQ0E7b0JBQ0E7QUFDQTtBQUVBO29DQUNBO1dBQ0E7QUFFQTs7QUFDQTs7OERBQ0E7bUZBQ0E7K0JBQ0E7a0NBQ0E7c0JBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBQ0E7OzhEQUNBO3NGQUNBOytCQUNBO2tDQUNBO3NCQUNBO0FBQ0E7QUFDQTtBQUVBO0FBbENBO0FBeEJBLEc7Ozs7Ozs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixtQ0FBbUM7QUFDckQsZUFBZSx3QkFBd0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdDQUFnQyxTQUFTLFlBQVksRUFBRTtBQUN2RDtBQUNBLGdDQUFnQyxTQUFTLG9CQUFvQixFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTLGtCQUFrQixFQUFFO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTLGlCQUFpQixFQUFFO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxTQUFTLGlCQUFpQixFQUFFO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixpQkFBaUI7QUFDakI7QUFDQSw2QkFBNkIsb0JBQW9CO0FBQ2pELGdDQUFnQyw4QkFBOEI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCLG9DQUFvQyxzQ0FBc0M7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsb0RBQW9EO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsdUNBQXVDO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHVDQUF1QztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx1Q0FBdUM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsdUJBQXVCLDJCQUEyQjtBQUNsRCx1QkFBdUIscUNBQXFDO0FBQzVEO0FBQ0EseUJBQXlCLHFCQUFxQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7O0FDckxBOztBQUVBO0FBQ0EscUNBQXlPO0FBQ3pPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSkFBc0osa0ZBQWtGO0FBQ3hPLCtKQUErSixrRkFBa0Y7QUFDalA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0NBQXlDLHlCQUF5Qix5QkFBeUIsa0JBQWtCLGdCQUFnQixpQkFBaUIsNEZBQTRGLGtFQUFrRSxtQkFBbUIsd0JBQXdCLEdBQUcsNEJBQTRCLGtCQUFrQixzQkFBc0IsdUJBQXVCLEdBQUcsaUJBQWlCLG1CQUFtQixxQkFBcUIsMkJBQTJCLGtCQUFrQix3QkFBd0IsR0FBRyxpQkFBaUIsbUJBQW1CLHFCQUFxQiwyQkFBMkIsR0FBRywrQkFBK0IsMkJBQTJCLDJCQUEyQixvQkFBb0IsbUJBQW1CLHVDQUF1Qyx5QkFBeUIsR0FBRywwQ0FBMEMsb0JBQW9CLHFCQUFxQixHQUFHLDJDQUEyQyw2QkFBNkIsNkJBQTZCLHNCQUFzQixxQ0FBcUMsc0NBQXNDLHVDQUF1Qyx1Q0FBdUMsd0JBQXdCLGtDQUFrQyxtQ0FBbUMsK0NBQStDLEdBQUcsaURBQWlELHNCQUFzQix5QkFBeUIsMEJBQTBCLDJCQUEyQixHQUFHLG1EQUFtRCx5QkFBeUIsMEJBQTBCLHNCQUFzQixHQUFHLGtEQUFrRCxzQkFBc0IseUJBQXlCLDBCQUEwQixHQUFHLHdEQUF3RCwwQkFBMEIsNkJBQTZCLHNCQUFzQix1QkFBdUIsaUNBQWlDLDJCQUEyQix3QkFBd0IsNkJBQTZCLEdBQUcsYUFBYSx3QkFBd0IsR0FBRyxVQUFVLG1CQUFtQixxQkFBcUIsb0JBQW9CLGNBQWMsZ0JBQWdCLDJCQUEyQix3QkFBd0IsOEJBQThCLEdBQUcsMkJBQTJCLDJCQUEyQiwyQkFBMkIsb0JBQW9CLCtCQUErQixnQ0FBZ0Msc0NBQXNDLEdBQUcsVUFBVSw0R0FBNEcsS0FBSyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxNQUFNLFdBQVcsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxLQUFLLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsS0FBSyxNQUFNLFVBQVUsVUFBVSxZQUFZLEtBQUssTUFBTSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksS0FBSyxNQUFNLFlBQVksS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxLQUFLLE1BQU0sV0FBVyxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEseURBQXlELGtCQUFrQixnQkFBZ0IsaUJBQWlCLGtFQUFrRSxtQkFBbUIsd0JBQXdCLEVBQUUsOEJBQThCLGtCQUFrQixzQkFBc0IsdUJBQXVCLEVBQUUsbUJBQW1CLG1CQUFtQixxQkFBcUIsMkJBQTJCLGtCQUFrQix3QkFBd0IsRUFBRSxtQkFBbUIsbUJBQW1CLHFCQUFxQiwyQkFBMkIsRUFBRSxpQ0FBaUMsb0JBQW9CLG1CQUFtQix1Q0FBdUMseUJBQXlCLEVBQUUsOENBQThDLG9CQUFvQixxQkFBcUIsRUFBRSwrQ0FBK0Msc0JBQXNCLCtCQUErQix3QkFBd0IsdUNBQXVDLEVBQUUsdURBQXVELHNCQUFzQix5QkFBeUIsMEJBQTBCLDJCQUEyQixFQUFFLHlEQUF5RCx5QkFBeUIsMEJBQTBCLHNCQUFzQixFQUFFLHdEQUF3RCxzQkFBc0IseUJBQXlCLDBCQUEwQixFQUFFLDhEQUE4RCwwQkFBMEIsNkJBQTZCLHNCQUFzQix1QkFBdUIsaUNBQWlDLDJCQUEyQix3QkFBd0IsNkJBQTZCLEVBQUUsZUFBZSx3QkFBd0IsRUFBRSxZQUFZLG1CQUFtQixxQkFBcUIsb0JBQW9CLGNBQWMsZ0JBQWdCLDJCQUEyQix3QkFBd0IsOEJBQThCLEVBQUUsNkJBQTZCLG9CQUFvQiw4QkFBOEIsRUFBRSxxQkFBcUI7O0FBRS8zSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNtREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZBOztBQUdBOztBQUVBO0FBRUEsb0xBQ0EsbU5BQ0Esb05BQ0Esb05BQ0EsdU5BR0E7O1VBQ0EsQ0FDQSx1RUFHQTs7d0JBQ0E7O2VBRUE7YUFFQTtBQUhBO0FBS0E7OEJBQ0E7MENBRUE7O1NBQ0E7QUFFQTs7Ozs7QUFFQTs7MkVBQ0E7b0NBQ0E7Z0NBQ0E7b0JBQ0E7QUFDQTtBQUVBOztBQUNBOztrQkFFQTs7O21CQUVBO2dCQUdBO0FBSkE7O3FFQUtBOzZCQUNBO0FBQ0E7QUFFQTs7QUFDQTs7K0RBQ0E7NkJBQ0E7QUFDQTtBQUVBOztBQUNBOzsrREFDQTs2QkFDQTtBQUNBO0FBRUE7QUFqQ0E7QUEzQkEsRzs7Ozs7Ozs7QUM5REEseURBQWU7QUFDYkosV0FBUztBQUNQSyxrQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM5QixjQUFRQSxNQUFSO0FBQ0UsYUFBSyxhQUFMO0FBQ0UsaUJBQU8sS0FBUDtBQUNGLGFBQUssTUFBTDtBQUNFLGlCQUFPLEtBQVA7QUFDRixhQUFLLFdBQUw7QUFDRSxpQkFBTyxLQUFQO0FBQ0YsYUFBSyxVQUFMO0FBQ0UsaUJBQU8sS0FBUDtBQUNGLGFBQUssVUFBTDtBQUNFLGlCQUFPLEtBQVA7QUFDRjtBQUNFLGlCQUFPLEVBQVA7QUFaSjtBQWNEO0FBaEJNO0FBREksQ0FBZixFOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNEJBQTRCO0FBQzdDLG9CQUFvQiw2QkFBNkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsOEJBQThCO0FBQy9DO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsOEJBQThCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCLGVBQWU7QUFDZjtBQUNBLHlCQUF5Qiw0QkFBNEI7QUFDckQ7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixpQkFBaUI7QUFDakI7QUFDQSwyQkFBMkIsd0JBQXdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQix1QkFBdUI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw0QkFBNEI7QUFDckM7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUywwQkFBMEI7QUFDbkM7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLGFBQWEsRUFBRTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlCQUF5QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MseUJBQXlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw0QkFBNEI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvc2hvcC1vcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyMDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDIxIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcblxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMjAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAyMSIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAyMSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzg5MzNhOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXItbGlzdC52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFtcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMSVcXFwiLFxcXCJsYXN0IDIgdmVyc2lvbnNcXFwiLFxcXCJub3QgaWUgPD0gOFxcXCJdfX1dLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCIsW1xcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIse1xcXCJwb2x5ZmlsbFxcXCI6ZmFsc2UsXFxcImhlbHBlcnNcXFwiOmZhbHNlfV0sXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIixbXFxcImltcG9ydFxcXCIsW3tcXFwibGlicmFyeU5hbWVcXFwiOlxcXCJ3ZS12dWVcXFwiLFxcXCJzdHlsZVxcXCI6ZmFsc2V9XV1dfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci1saXN0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzg5MzNhOGNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci1saXN0LnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtNzg5MzNhOGNcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxzaG9wXFxcXHBhZ2VzXFxcXG9yZGVyLWxpc3QudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTc4OTMzYThjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNzg5MzNhOGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWFjMDZjNjJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAxJVxcXCIsXFxcImxhc3QgMiB2ZXJzaW9uc1xcXCIsXFxcIm5vdCBpZSA8PSA4XFxcIl19fV0sXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XSxcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFtcXFwiaW1wb3J0XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjpmYWxzZX1dXV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWFjMDZjNjJcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxccGFnZXNcXFxcb3JkZXIudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTlhYzA2YzYyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOWFjMDZjNjJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDU3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDU4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIG8gaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtvXT1uW29dfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQobyl7aWYobltvXSlyZXR1cm4gbltvXS5leHBvcnRzO3ZhciByPW5bb109e2k6byxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW29dLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLHQpLHIubD0hMCxyLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4sbyl7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpvfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0zMCl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLG8scixpKXt2YXIgcyxjPWU9ZXx8e30sdT10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT11JiZcImZ1bmN0aW9uXCIhPT11fHwocz1lLGM9ZS5kZWZhdWx0KTt2YXIgbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBjP2Mub3B0aW9uczpjO3QmJihsLnJlbmRlcj10LnJlbmRlcixsLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxsLl9jb21waWxlZD0hMCksbiYmKGwuZnVuY3Rpb25hbD0hMCksciYmKGwuX3Njb3BlSWQ9cik7dmFyIGE7aWYoaT8oYT1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksbyYmby5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sbC5fc3NyUmVnaXN0ZXI9YSk6byYmKGE9byksYSl7dmFyIGY9bC5mdW5jdGlvbmFsLGQ9Zj9sLnJlbmRlcjpsLmJlZm9yZUNyZWF0ZTtmPyhsLl9pbmplY3RTdHlsZXM9YSxsLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksZChlLHQpfSk6bC5iZWZvcmVDcmVhdGU9ZD9bXS5jb25jYXQoZCxhKTpbYV19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czpjLG9wdGlvbnM6bH19fSwyMDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtwcm9wczp7dXJsOlN0cmluZyxyZXBsYWNlOkJvb2xlYW4sdG86W1N0cmluZyxPYmplY3RdfSxtZXRob2RzOntyb3V0ZXJMaW5rOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy50byx0PXRoaXMudXJsLG49dGhpcy4kcm91dGVyLG89dGhpcy5yZXBsYWNlO2NvbnNvbGUubG9nKGUpLGNvbnNvbGUubG9nKHQpLGUmJm4/bltvP1wicmVwbGFjZVwiOlwicHVzaFwiXShlKTp0JiYobz9sb2NhdGlvbi5yZXBsYWNlKHQpOmxvY2F0aW9uLmhyZWY9dCl9fX19LDMwOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbz1uKDMxKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiBvLmF9KX0sMzE6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG8oZSl7bigzMil9dmFyIHI9bigzMyksaT1uKDM0KSxzPW4oMCksYz1vLHU9cyhyLmEsaS5hLCExLGMsXCJkYXRhLXYtMTc5MDdkZThcIixudWxsKTt0LmE9dS5leHBvcnRzfSwzMjpmdW5jdGlvbihlLHQpe30sMzM6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciBvPW4oMjApO3QuYT17bmFtZTpcInd2LWNlbGxcIixtaXhpbnM6W28uYV0scHJvcHM6e3RpdGxlOnt0eXBlOltTdHJpbmcsTnVtYmVyXX0sdmFsdWU6e3R5cGU6W1N0cmluZyxOdW1iZXJdfSxpc0xpbms6Qm9vbGVhbn0sbW91bnRlZDpmdW5jdGlvbigpe3RoaXMuJG9uKFwiQ0xJQ0tfSU5fQ0VMTFNXSVBFXCIsdGhpcy5vbkNsaWNrKX0sbWV0aG9kczp7b25DbGljazpmdW5jdGlvbigpe3RoaXMuJGVtaXQoXCJjbGlja1wiKSx0aGlzLnJvdXRlckxpbmsoKX19fX0sMzQ6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciBvPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsXCIsY2xhc3M6e1wid2V1aS1jZWxsX2FjY2Vzc1wiOmUuaXNMaW5rfSxvbjp7Y2xpY2s6ZS5vbkNsaWNrfX0sW24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfaGRcIn0sW2UuX3QoXCJpY29uXCIpXSwyKSxlLl92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19iZFwifSxbZS5fdChcImJkXCIsW24oXCJwXCIse2RvbVByb3BzOntpbm5lckhUTUw6ZS5fcyhlLnRpdGxlKX19KV0pXSwyKSxlLl92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX19mdFwifSxbZS5fdChcImZ0XCIsW2UuX3YoZS5fcyhlLnZhbHVlKSldKV0sMildKX0scj1bXSxpPXtyZW5kZXI6byxzdGF0aWNSZW5kZXJGbnM6cn07dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTExOSl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sYz10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1jJiZcImZ1bmN0aW9uXCIhPT1jfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihmLnJlbmRlcj10LnJlbmRlcixmLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxmLl9jb21waWxlZD0hMCksbiYmKGYuZnVuY3Rpb25hbD0hMCksbyYmKGYuX3Njb3BlSWQ9byk7dmFyIGE7aWYoaT8oYT1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sZi5fc3NyUmVnaXN0ZXI9YSk6ciYmKGE9ciksYSl7dmFyIGw9Zi5mdW5jdGlvbmFsLGQ9bD9mLnJlbmRlcjpmLmJlZm9yZUNyZWF0ZTtsPyhmLl9pbmplY3RTdHlsZXM9YSxmLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksZChlLHQpfSk6Zi5iZWZvcmVDcmVhdGU9ZD9bXS5jb25jYXQoZCxhKTpbYV19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6Zn19fSwxMTk6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMTIwKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMTIwOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMTIxKX12YXIgbz1uKDEyMiksaT1uKDEyMykscz1uKDApLHU9cixjPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LWYwOTMzMDBjXCIsbnVsbCk7dC5hPWMuZXhwb3J0c30sMTIxOmZ1bmN0aW9uKGUsdCl7fSwxMjI6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LWdyb3VwXCIscHJvcHM6e3RpdGxlOlN0cmluZyx0aXRsZUNvbG9yOlN0cmluZ319fSwxMjM6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIsW2UudGl0bGU/bihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbHNfX3RpdGxlXCIsc3R5bGU6e2NvbG9yOmUudGl0bGVDb2xvcn0sZG9tUHJvcHM6e2lubmVySFRNTDplLl9zKGUudGl0bGUpfX0pOmUuX2UoKSxlLl92KFwiIFwiKSxuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsc1wifSxbZS5fdChcImRlZmF1bHRcIildLDIpXSl9LG89W10saT17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOm99O3QuYT1pfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciBpIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbaV09bltpXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KGkpe2lmKG5baV0pcmV0dXJuIG5baV0uZXhwb3J0czt2YXIgbz1uW2ldPXtpOmksbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtpXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLGkpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6aX0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MTE0KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4saSxvLHIpe3ZhciBzLGE9ZT1lfHx7fSx1PXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PXUmJlwiZnVuY3Rpb25cIiE9PXV8fChzPWUsYT1lLmRlZmF1bHQpO3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YS5vcHRpb25zOmE7dCYmKGMucmVuZGVyPXQucmVuZGVyLGMuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGMuX2NvbXBpbGVkPSEwKSxuJiYoYy5mdW5jdGlvbmFsPSEwKSxvJiYoYy5fc2NvcGVJZD1vKTt2YXIgZDtpZihyPyhkPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxpJiZpLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKHIpfSxjLl9zc3JSZWdpc3Rlcj1kKTppJiYoZD1pKSxkKXt2YXIgbD1jLmZ1bmN0aW9uYWwsZj1sP2MucmVuZGVyOmMuYmVmb3JlQ3JlYXRlO2w/KGMuX2luamVjdFN0eWxlcz1kLGMucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQuY2FsbCh0KSxmKGUsdCl9KTpjLmJlZm9yZUNyZWF0ZT1mP1tdLmNvbmNhdChmLGQpOltkXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOmEsb3B0aW9uczpjfX19LDExNDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGk9bigxMTUpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIGkuYX0pfSwxMTU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkoZSl7bigxMTYpfXZhciBvPW4oMTE3KSxyPW4oMTE4KSxzPW4oMCksYT1pLHU9cyhvLmEsci5hLCExLGEsXCJkYXRhLXYtOTBiYzRjMjBcIixudWxsKTt0LmE9dS5leHBvcnRzfSwxMTY6ZnVuY3Rpb24oZSx0KXt9LDExNzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3YtYnV0dG9uXCIscHJvcHM6e3R5cGU6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCJkZWZhdWx0XCJ9LGlzTG9hZGluZzpCb29sZWFuLGRpc2FibGVkOkJvb2xlYW4sbWluaTpCb29sZWFuLHBsYWluOkJvb2xlYW59LG1ldGhvZHM6e2hhbmRsZUNsaWNrOmZ1bmN0aW9uKGUpe3RoaXMuJGVtaXQoXCJjbGlja1wiLGUpfX0sY29tcHV0ZWQ6e2NsYXNzT2JqZWN0OmZ1bmN0aW9uKCl7dmFyIGU9e30sdD10aGlzLnBsYWluP1wid2V1aS1idG5fcGxhaW4tXCIrdGhpcy50eXBlOlwid2V1aS1idG5fXCIrdGhpcy50eXBlLG49dGhpcy5wbGFpbj9cIndldWktYnRuX3BsYWluLWRpc2FibGVkXCI6XCJ3ZXVpLWJ0bl9kaXNhYmxlZFwiO3JldHVybiBlW3RdPSEwLGVbbl09dGhpcy5kaXNhYmxlZCxlW1wid2V1aS1idG5fbG9hZGluZ1wiXT10aGlzLmlzTG9hZGluZyxlW1wid2V1aS1idG5fbWluaVwiXT10aGlzLm1pbmksZX19fX0sMTE4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50LG49ZS5fc2VsZi5fY3x8dDtyZXR1cm4gbihcImJ1dHRvblwiLHtzdGF0aWNDbGFzczpcIndldWktYnRuXCIsY2xhc3M6ZS5jbGFzc09iamVjdCxhdHRyczp7ZGlzYWJsZWQ6ZS5kaXNhYmxlZH0sb246e2NsaWNrOmUuaGFuZGxlQ2xpY2t9fSxbZS5pc0xvYWRpbmc/bihcImlcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWxvYWRpbmdcIn0pOmUuX2UoKSxlLl92KFwiIFwiKSxlLl90KFwiZGVmYXVsdFwiKV0sMil9LG89W10scj17cmVuZGVyOmksc3RhdGljUmVuZGVyRm5zOm99O3QuYT1yfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9idXR0b24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA2IiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtyXT1uW3JdfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4scil7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0yNjEpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIHMsdT1lPWV8fHt9LGY9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09ZiYmXCJmdW5jdGlvblwiIT09Znx8KHM9ZSx1PWUuZGVmYXVsdCk7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgdT91Lm9wdGlvbnM6dTt0JiYoYy5yZW5kZXI9dC5yZW5kZXIsYy5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMsYy5fY29tcGlsZWQ9ITApLG4mJihjLmZ1bmN0aW9uYWw9ITApLG8mJihjLl9zY29wZUlkPW8pO3ZhciBhO2lmKGk/KGE9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLHImJnIuY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LGMuX3NzclJlZ2lzdGVyPWEpOnImJihhPXIpLGEpe3ZhciBkPWMuZnVuY3Rpb25hbCxsPWQ/Yy5yZW5kZXI6Yy5iZWZvcmVDcmVhdGU7ZD8oYy5faW5qZWN0U3R5bGVzPWEsYy5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYS5jYWxsKHQpLGwoZSx0KX0pOmMuYmVmb3JlQ3JlYXRlPWw/W10uY29uY2F0KGwsYSk6W2FdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6dSxvcHRpb25zOmN9fX0sMjYxOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI2Mik7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gci5hfSl9LDI2MjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtuKDI2Myl9dmFyIG89bigyNjQpLGk9bigyNjUpLHM9bigwKSx1PXIsZj1zKG8uYSxpLmEsITEsdSxcImRhdGEtdi00ZDZlY2NmN1wiLG51bGwpO3QuYT1mLmV4cG9ydHN9LDI2MzpmdW5jdGlvbihlLHQpe30sMjY0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmE9e25hbWU6XCJ3di1mbGV4LWl0ZW1cIixwcm9wczp7ZmxleDp7dHlwZTpbTnVtYmVyLFN0cmluZ10sZGVmYXVsdDoxfX0sY29tcHV0ZWQ6e2d1dHRlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLiRwYXJlbnQuZ3V0dGVyfSxzdHlsZTpmdW5jdGlvbigpe3ZhciBlPXt9O3JldHVybiB0aGlzLmd1dHRlciYmKGUucGFkZGluZ0xlZnQ9dGhpcy5ndXR0ZXIvMitcInB4XCIsZS5wYWRkaW5nUmlnaHQ9ZS5wYWRkaW5nTGVmdCksZS5mbGV4PXRoaXMuZmxleCxlfX19fSwyNjU6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuKGUuX3NlbGYuX2N8fHQpKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1mbGV4X19pdGVtXCIsc3R5bGU6ZS5zdHlsZX0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgtaXRlbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI1Nil9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihhLnJlbmRlcj10LnJlbmRlcixhLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxhLl9jb21waWxlZD0hMCksbiYmKGEuZnVuY3Rpb25hbD0hMCksbyYmKGEuX3Njb3BlSWQ9byk7dmFyIGM7aWYoaT8oYz1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYS5fc3NyUmVnaXN0ZXI9Yyk6ciYmKGM9ciksYyl7dmFyIGQ9YS5mdW5jdGlvbmFsLGw9ZD9hLnJlbmRlcjphLmJlZm9yZUNyZWF0ZTtkPyhhLl9pbmplY3RTdHlsZXM9YyxhLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCksbChlLHQpfSk6YS5iZWZvcmVDcmVhdGU9bD9bXS5jb25jYXQobCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6YX19fSwyNTY6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjU3KTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMjU3OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMjU4KX12YXIgbz1uKDI1OSksaT1uKDI2MCkscz1uKDApLHU9cixmPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LTZmZDZhNzZjXCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMjU4OmZ1bmN0aW9uKGUsdCl7fSwyNTk6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LWZsZXhcIixwcm9wczp7Z3V0dGVyOnt0eXBlOk51bWJlcixkZWZhdWx0OjB9fSxjb21wdXRlZDp7c3R5bGU6ZnVuY3Rpb24oKXt2YXIgZT17fTtpZih0aGlzLmd1dHRlcil7dmFyIHQ9XCItXCIrdGhpcy5ndXR0ZXIvMitcInB4XCI7ZS5tYXJnaW5MZWZ0PXQsZS5tYXJnaW5SaWdodD10fXJldHVybiBlfX19fSwyNjA6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuKGUuX3NlbGYuX2N8fHQpKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1mbGV4XCIsc3R5bGU6ZS5zdHlsZX0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSA1IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGZpbHRlcnM6IHtcclxuICAgIHByaWNlRmlsdGVyOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgIHJldHVybiAn77+lJyArIE51bWJlcih2YWwpLnRvRml4ZWQoMilcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9wcmljZV9maWx0ZXIuanMiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTE1OSl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyxhPWU9ZXx8e30sYz10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1jJiZcImZ1bmN0aW9uXCIhPT1jfHwocz1lLGE9ZS5kZWZhdWx0KTt2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2Eub3B0aW9uczphO3QmJih1LnJlbmRlcj10LnJlbmRlcix1LnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyx1Ll9jb21waWxlZD0hMCksbiYmKHUuZnVuY3Rpb25hbD0hMCksbyYmKHUuX3Njb3BlSWQ9byk7dmFyIGQ7aWYoaT8oZD1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sdS5fc3NyUmVnaXN0ZXI9ZCk6ciYmKGQ9ciksZCl7dmFyIGY9dS5mdW5jdGlvbmFsLGw9Zj91LnJlbmRlcjp1LmJlZm9yZUNyZWF0ZTtmPyh1Ll9pbmplY3RTdHlsZXM9ZCx1LnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBkLmNhbGwodCksbChlLHQpfSk6dS5iZWZvcmVDcmVhdGU9bD9bXS5jb25jYXQobCxkKTpbZF19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czphLG9wdGlvbnM6dX19fSwxNTk6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMTYwKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMTYwOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMTYxKX12YXIgbz1uKDE2MiksaT1uKDE2Mykscz1uKDApLGE9cixjPXMoby5hLGkuYSwhMSxhLFwiZGF0YS12LTM2Y2ZiYTU1XCIsbnVsbCk7dC5hPWMuZXhwb3J0c30sMTYxOmZ1bmN0aW9uKGUsdCl7fSwxNjI6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LW5hdmJhci1pdGVtXCIscHJvcHM6e2lkOlN0cmluZyxkaXNhYmxlZDpCb29sZWFufSxjb21wdXRlZDp7aXNTZWxlY3RlZDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmlkPT09dGhpcy4kcGFyZW50LnZhbHVlfSxzdHlsZTpmdW5jdGlvbigpe3JldHVybntib3JkZXJXaWR0aDp0aGlzLiRwYXJlbnQubGluZVdpZHRoK1wicHhcIixib3JkZXJDb2xvcjp0aGlzLiRwYXJlbnQuYWN0aXZlQ29sb3IsY29sb3I6dGhpcy5pc1NlbGVjdGVkP3RoaXMuJHBhcmVudC5hY3RpdmVDb2xvcjp0aGlzLiRwYXJlbnQuY29sb3J9fX0sbWV0aG9kczp7b25DbGljazpmdW5jdGlvbigpe3RoaXMuZGlzYWJsZWR8fHRoaXMuJHBhcmVudC4kZW1pdChcImlucHV0XCIsdGhpcy5pZCl9fX19LDE2MzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3di1uYXZiYXJfX2l0ZW1cIixjbGFzczp7XCJ3di1uYXZiYXJfX2l0ZW1fb25cIjohZS4kcGFyZW50LmFuaW1hdGUmJmUuJHBhcmVudC52YWx1ZT09PWUuaWQsZGlzYWJsZWQ6ZS5kaXNhYmxlZH0sc3R5bGU6ZS5zdHlsZSxvbjp7Y2xpY2s6ZS5vbkNsaWNrfX0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL25hdmJhci1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtyXT1uW3JdfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4scil7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0xNTQpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIHUsYT1lPWV8fHt9LGY9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09ZiYmXCJmdW5jdGlvblwiIT09Znx8KHU9ZSxhPWUuZGVmYXVsdCk7dmFyIHM9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hLm9wdGlvbnM6YTt0JiYocy5yZW5kZXI9dC5yZW5kZXIscy5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMscy5fY29tcGlsZWQ9ITApLG4mJihzLmZ1bmN0aW9uYWw9ITApLG8mJihzLl9zY29wZUlkPW8pO3ZhciBjO2lmKGk/KGM9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLHImJnIuY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LHMuX3NzclJlZ2lzdGVyPWMpOnImJihjPXIpLGMpe3ZhciBkPXMuZnVuY3Rpb25hbCxsPWQ/cy5yZW5kZXI6cy5iZWZvcmVDcmVhdGU7ZD8ocy5faW5qZWN0U3R5bGVzPWMscy5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYy5jYWxsKHQpLGwoZSx0KX0pOnMuYmVmb3JlQ3JlYXRlPWw/W10uY29uY2F0KGwsYyk6W2NdfXJldHVybntlc01vZHVsZTp1LGV4cG9ydHM6YSxvcHRpb25zOnN9fX0sMTU0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDE1NSk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gci5hfSl9LDE1NTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtuKDE1Nil9dmFyIG89bigxNTcpLGk9bigxNTgpLHU9bigwKSxhPXIsZj11KG8uYSxpLmEsITEsYSxcImRhdGEtdi03OWY2M2ZiM1wiLG51bGwpO3QuYT1mLmV4cG9ydHN9LDE1NjpmdW5jdGlvbihlLHQpe30sMTU3OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmE9e25hbWU6XCJ3di1uYXZiYXJcIixwcm9wczp7Zml4ZWQ6Qm9vbGVhbixjb2xvcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIiMzMzNcIn0sYmFja2dyb3VuZENvbG9yOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiI2ZmZlwifSxhY3RpdmVDb2xvcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIiMyMTk2ZjNcIn0sZGlzYWJsZWRDb2xvcjp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcIiNjZmNmY2ZcIn0sbGluZVdpZHRoOnt0eXBlOk51bWJlcixkZWZhdWx0OjJ9LGFuaW1hdGU6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiEwfSx2YWx1ZTp7fX0sZGF0YTpmdW5jdGlvbigpe3JldHVybntjaGlsZHJlbkNvdW50OjAsY3VycmVudEluZGV4OjB9fSxjb21wdXRlZDp7c3R5bGU6ZnVuY3Rpb24oKXt2YXIgZT17cG9zaXRpb246dGhpcy5maXhlZD9cImZpeGVkXCI6XCJhYnNvbHV0ZVwiLGJhY2tncm91bmRDb2xvcjp0aGlzLmJhY2tncm91bmRDb2xvcn07cmV0dXJuIHRoaXMuZml4ZWQmJihlLnRvcD0wLGUubGVmdD0wLGUucmlnaHQ9MCksZX0sbGluZVN0eWxlOmZ1bmN0aW9uKCl7dmFyIGU9MS90aGlzLmNoaWxkcmVuQ291bnQqMTAwO3JldHVybntiYWNrZ3JvdW5kQ29sb3I6dGhpcy5hY3RpdmVDb2xvcixsZWZ0OmUqdGhpcy5jdXJyZW50SW5kZXgrXCIlXCIsd2lkdGg6ZStcIiVcIixoZWlnaHQ6dGhpcy5saW5lV2lkdGgrXCJweFwifX19LG1vdW50ZWQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzO3RoaXMuJG5leHRUaWNrKGZ1bmN0aW9uKCl7ZS5jaGlsZHJlbkNvdW50PWUuJGNoaWxkcmVuLmxlbmd0aCxlLnVwZGF0ZUN1cnJlbnRJbmRleCgpfSl9LG1ldGhvZHM6e3VwZGF0ZUN1cnJlbnRJbmRleDpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy4kY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbih0LG4pe3QuaWQ9PT1lLnZhbHVlJiYoZS5jdXJyZW50SW5kZXg9bil9KX19LHdhdGNoOnt2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLiRlbWl0KFwiY2hhbmdlXCIsZSksdGhpcy51cGRhdGVDdXJyZW50SW5kZXgoKX19fX0sMTU4OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50LG49ZS5fc2VsZi5fY3x8dDtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LW5hdmJhclwiLHN0eWxlOmUuc3R5bGV9LFtlLl90KFwiZGVmYXVsdFwiKSxlLl92KFwiIFwiKSxlLmFuaW1hdGU/bihcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LW5hdmJhci11bmRlcmxpbmVcIixzdHlsZTplLmxpbmVTdHlsZX0pOmUuX2UoKV0sMil9LG89W10saT17cmVuZGVyOnIsc3RhdGljUmVuZGVyRm5zOm99O3QuYT1pfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9uYXZiYXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzg5MzNhOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXItbGlzdC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjIyMjQ1OWQ1XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTc4OTMzYThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLWxpc3QudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTc4OTMzYThjXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLWxpc3QudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTc4OTMzYThjXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ub3JkZXItbGlzdFtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gIHBhZGRpbmctdG9wOiA2NXB4O1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbVtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAuMmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5oZFtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbSAuaGQgLm9yZGVyLW51bWJlcltkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICAgIGZsb2F0OiBsZWZ0O1xcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICAgICAgY29sb3I6ICM2NjY7XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5oZCAuYnRuLWRlbGV0ZVtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGNvbG9yOiAjNzc3O1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmRbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmQgLnByb2R1Y3RbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIHBhZGRpbmc6IC4yZW07XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCAucHJvZHVjdCAudGh1bWJuYWlsW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICAgICAgICB3aWR0aDogNjBweDtcXG4gICAgICAgICAgaGVpZ2h0OiA2MHB4O1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmQgLnByb2R1Y3QgLm5hbWVbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICAgICAgICBjb2xvcjogIzU1NTtcXG59XFxuLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmZ0W2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcbi5lbXB0eS1tc2dbZGF0YS12LTc4OTMzYThjXSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA4MHZoO1xcbiAgLXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcXG4gIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogIzc3NztcXG59XFxuLmVtcHR5LW1zZyAuaWNvbmZvbnRbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgIGZvbnQtc2l6ZTogODBweDtcXG59XFxuLmVtcHR5LW1zZyAubXNnW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9Db2RlL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxrQkFBa0I7Q0FBRTtBQUNwQjtJQUNFLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGNBQWM7SUFDZCx1QkFBdUI7SUFDdkIsbUJBQW1CO0NBQUU7QUFDckI7TUFDRSxlQUFlO01BQ2YsaUJBQWlCO0NBQUU7QUFDbkI7UUFDRSxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtRQUNFLGFBQWE7UUFDYixnQkFBZ0I7UUFDaEIsWUFBWTtRQUNaLG1CQUFtQjtDQUFFO0FBQ3pCO01BQ0UsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQiwwQkFBMEI7Q0FBRTtBQUM1QjtRQUNFLHFCQUFjO1FBQWQscUJBQWM7UUFBZCxjQUFjO1FBQ2QsY0FBYztDQUFFO0FBQ2hCO1VBQ0UsWUFBWTtVQUNaLGFBQWE7Q0FBRTtBQUNqQjtVQUNFLGtCQUFrQjtVQUNsQixZQUFZO0NBQUU7QUFDcEI7TUFDRSxjQUFjO01BQ2Qsa0JBQWtCO0NBQUU7QUFFMUI7RUFDRSxxQkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztFQUNkLFlBQVk7RUFDWixhQUFhO0VBQ2IsNkJBQXVCO0VBQXZCLDhCQUF1QjtNQUF2QiwyQkFBdUI7VUFBdkIsdUJBQXVCO0VBQ3ZCLHlCQUF3QjtNQUF4QixzQkFBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDBCQUFvQjtNQUFwQix1QkFBb0I7VUFBcEIsb0JBQW9CO0VBQ3BCLFlBQVk7Q0FBRTtBQUNkO0lBQ0UsZ0JBQWdCO0NBQUU7QUFDcEI7SUFDRSxnQkFBZ0I7Q0FBRVwiLFwiZmlsZVwiOlwib3JkZXItbGlzdC52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm9yZGVyLWxpc3Qge1xcbiAgcGFkZGluZy10b3A6IDY1cHg7IH1cXG4gIC5vcmRlci1saXN0IC5vcmRlci1pdGVtIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiAuMmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxZW07IH1cXG4gICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmhkIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmhkIC5vcmRlci1udW1iZXIge1xcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgICBjb2xvcjogIzY2NjsgfVxcbiAgICAgIC5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5oZCAuYnRuLWRlbGV0ZSB7XFxuICAgICAgICBmbG9hdDogcmlnaHQ7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBjb2xvcjogIzc3NztcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTBweDsgfVxcbiAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTsgfVxcbiAgICAgIC5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCAucHJvZHVjdCB7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgcGFkZGluZzogLjJlbTsgfVxcbiAgICAgICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmJkIC5wcm9kdWN0IC50aHVtYm5haWwge1xcbiAgICAgICAgICB3aWR0aDogNjBweDtcXG4gICAgICAgICAgaGVpZ2h0OiA2MHB4OyB9XFxuICAgICAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmQgLnByb2R1Y3QgLm5hbWUge1xcbiAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcXG4gICAgICAgICAgY29sb3I6ICM1NTU7IH1cXG4gICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmZ0IHtcXG4gICAgICBwYWRkaW5nOiAxMHB4O1xcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLmVtcHR5LW1zZyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDgwdmg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY29sb3I6ICM3Nzc7IH1cXG4gIC5lbXB0eS1tc2cgLmljb25mb250IHtcXG4gICAgZm9udC1zaXplOiA4MHB4OyB9XFxuICAuZW1wdHktbXNnIC5tc2cge1xcbiAgICBmb250LXNpemU6IDE0cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNzg5MzNhOGNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA2MjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiPHRlbXBsYXRlPlxyXG4gIDxkaXY+XHJcbiAgICA8d3YtbmF2YmFyIHYtbW9kZWw9XCJzdGF0dXNcIiBAY2hhbmdlPVwidGFiQ2hhbmdlXCIgYWN0aXZlLWNvbG9yPVwicmVkXCIgZml4ZWQgY2xhc3M9XCJ0YWJcIj5cclxuICAgICAgPHd2LW5hdmJhci1pdGVtIGlkPVwiYWxsXCI+5YWo6YOoPC93di1uYXZiYXItaXRlbT5cclxuICAgICAgPHd2LW5hdmJhci1pdGVtIGlkPVwibmVlZF90b19wYXlcIj7lvoXku5jmrL48L3d2LW5hdmJhci1pdGVtPlxyXG4gICAgICA8d3YtbmF2YmFyLWl0ZW0gaWQ9XCJkZWxpdmVyZWRcIj7lvoXmlLbotKc8L3d2LW5hdmJhci1pdGVtPlxyXG4gICAgICA8d3YtbmF2YmFyLWl0ZW0gaWQ9XCJmaW5pc2hlZFwiPuW3suWujOaIkDwvd3YtbmF2YmFyLWl0ZW0+XHJcbiAgICAgIDx3di1uYXZiYXItaXRlbSBpZD1cImNhbmNlbGVkXCI+5bey5Y+W5raIPC93di1uYXZiYXItaXRlbT5cclxuICAgIDwvd3YtbmF2YmFyPlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJvcmRlci1saXN0XCIgdi1pZj1cIm9yZGVycy5kYXRhICYmIG9yZGVycy5kYXRhLmxlbmd0aD4wXCI+XHJcbiAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL29yZGVyLycgKyBvcmRlci5udW1iZXJcIiBjbGFzcz1cIm9yZGVyLWl0ZW1cIiB2LWZvcj1cIm9yZGVyIGluIG9yZGVycy5kYXRhXCIgOmtleT1cIm9yZGVyLmlkXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImhkXCI+XHJcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm9yZGVyLW51bWJlclwiPnt7IG9yZGVyLm51bWJlciB9fTwvc3Bhbj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZGVsZXRlXCIgdi1pZj1cIm9yZGVyLnN0YXR1cyA9PT0gJ2NhbmNlbGVkJyB8fCBvcmRlci5zdGF0dXMgPT09ICdjYW5jZWxlZCdcIlxyXG4gICAgICAgICAgICAgICBAY2xpY2sucHJldmVudC5zdG9wPVwiZGVzdHJveU9yZGVyKG9yZGVyLmlkKVwiPjxpIGNsYXNzPVwiaWNvbmZvbnQgaWNvbi1kZWxldGVcIj48L2k+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJkXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdFwiIHYtZm9yPVwib3JkZXJJdGVtIGluIG9yZGVyLm9yZGVyX2l0ZW1zXCIgOmtleT1cIm9yZGVySXRlbS5wcm9kdWN0LmlkXCI+XHJcbiAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJ0aHVtYm5haWxcIiA6c3JjPVwib3JkZXJJdGVtLnByb2R1Y3QudGh1bWJuYWlsXCIgYWx0PVwiXCIvPlxyXG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJuYW1lXCIgdi1odG1sPVwib3JkZXJJdGVtLnByb2R1Y3QubmFtZVwiPjwvaDQ+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZnRcIj5cclxuICAgICAgICAgIDx3di1idXR0b24gdHlwZT1cInByaW1hcnlcIiBtaW5pIHBsYWluIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICduZWVkX3RvX3BheSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICBAY2xpY2sucHJldmVudC5zdG9wPVwiJHJvdXRlci5wdXNoKCcvcGF5bWVudC8nICsgb3JkZXIubnVtYmVyKVwiPuaUr+S7mFxyXG4gICAgICAgICAgPC93di1idXR0b24+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgbWluaSBwbGFpbiBAY2xpY2sucHJldmVudC5zdG9wPVwiJHJvdXRlci5wdXNoKCdwYXltZW50LycgKyBvcmRlci5udW1iZXIpXCI+XHJcbiAgICAgICAgICAgIOWGjeasoei0reS5sFxyXG4gICAgICAgICAgPC93di1idXR0b24+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJkZWZhdWx0XCIgbWluaSBwbGFpbiB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnbmVlZF90b19wYXknXCJcclxuICAgICAgICAgICAgICAgICAgICAgQGNsaWNrLnByZXZlbnQuc3RvcD1cImNhbmNlbE9yZGVyKG9yZGVyLmlkKVwiPuWPlua2iFxyXG4gICAgICAgICAgPC93di1idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiZW1wdHktbXNnXCIgdi1lbHNlLWlmPVwiIWlzTG9hZGluZyAmJiBvcmRlcnMuZGF0YSAmJiBvcmRlcnMuZGF0YS5sZW5ndGggPT09IDBcIj5cclxuICAgICAgPGkgY2xhc3M9XCJpY29uZm9udCBpY29uLW9yZGVyXCI+PC9pPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibXNnXCI+5rKh5pyJ55u45YWz6K6i5Y2V6K6w5b2VPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgaW1wb3J0IHsgTmF2YmFyLCBOYXZiYXJJdGVtLCBCdXR0b24gfSBmcm9tICd3ZS12dWUnXHJcbiAgaW1wb3J0IHsgbWFwU3RhdGUgfSBmcm9tICd2dWV4J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtOYXZiYXIubmFtZV06IE5hdmJhcixcclxuICAgICAgW05hdmJhckl0ZW0ubmFtZV06IE5hdmJhckl0ZW0sXHJcbiAgICAgIFtCdXR0b24ubmFtZV06IEJ1dHRvblxyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGF0dXM6ICdhbGwnLFxyXG4gICAgICAgIG9yZGVyczogW11cclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAuLi5tYXBTdGF0ZSh7XHJcbiAgICAgICAgaXNMb2FkaW5nOiBzdGF0ZSA9PiBzdGF0ZS5pc0xvYWRpbmdcclxuICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0T3JkZXJzKClcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRPcmRlcnMgKCkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdvcmRlcicsIHtcclxuICAgICAgICAgIHBhcmFtczoge3N0YXR1czogdGhpcy5zdGF0dXN9XHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMub3JkZXJzID0gcmVzcG9uc2UuZGF0YS5vcmRlcnNcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICB0YWJDaGFuZ2UgKCkge1xyXG4gICAgICAgIHRoaXMuZ2V0T3JkZXJzKClcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNhbmNlbE9yZGVyIChvcmRlcklkKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdC5jb25maXJtKCfmk43kvZznoa7orqQnLCAn56Gu5a6a6KaB5Y+W5raI6K6i5Y2V77yfJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmF4aW9zLnBvc3QoYG9yZGVyLyR7b3JkZXJJZH0vY2FuY2VsYCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCflj5bmtojmiJDlip8nKVxyXG4gICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZGVzdHJveU9yZGVyIChvcmRlcklkKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdC5jb25maXJtKCfmk43kvZznoa7orqQnLCAn56Gu5a6a6KaB5Yig6Zmk6K6i5Y2V77yfJykudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmF4aW9zLmRlbGV0ZShgb3JkZXIvJHtvcmRlcklkfS9kZXN0cm95YCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAudGFiIHtcclxuICB9XHJcblxyXG4gIC5vcmRlci1saXN0IHtcclxuICAgIHBhZGRpbmctdG9wOiA2NXB4O1xyXG5cclxuICAgIC5vcmRlci1pdGVtIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBwYWRkaW5nOiAuMmVtO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxZW07XHJcblxyXG4gICAgICAuaGQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gICAgICAgIC5vcmRlci1udW1iZXIge1xyXG4gICAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgICAgICBjb2xvcjogIzY2NjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5idG4tZGVsZXRlIHtcclxuICAgICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgIGNvbG9yOiAjNzc3O1xyXG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLmJkIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XHJcblxyXG4gICAgICAgIC5wcm9kdWN0IHtcclxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgICBwYWRkaW5nOiAuMmVtO1xyXG5cclxuICAgICAgICAgIC50aHVtYm5haWwge1xyXG4gICAgICAgICAgICB3aWR0aDogNjBweDtcclxuICAgICAgICAgICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC5uYW1lIHtcclxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNTU1O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLmZ0IHtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZW1wdHktbXNnIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogODB2aDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzc3NztcclxuXHJcbiAgICAuaWNvbmZvbnQge1xyXG4gICAgICBmb250LXNpemU6IDgwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm1zZyB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWU/OTg4ZjZhZGEiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwid3YtbmF2YmFyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0YWJcIixcbiAgICAgICAgICBhdHRyczogeyBcImFjdGl2ZS1jb2xvclwiOiBcInJlZFwiLCBmaXhlZDogXCJcIiB9LFxuICAgICAgICAgIG9uOiB7IGNoYW5nZTogX3ZtLnRhYkNoYW5nZSB9LFxuICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICB2YWx1ZTogX3ZtLnN0YXR1cyxcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgX3ZtLnN0YXR1cyA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwic3RhdHVzXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInd2LW5hdmJhci1pdGVtXCIsIHsgYXR0cnM6IHsgaWQ6IFwiYWxsXCIgfSB9LCBbX3ZtLl92KFwi5YWo6YOoXCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LW5hdmJhci1pdGVtXCIsIHsgYXR0cnM6IHsgaWQ6IFwibmVlZF90b19wYXlcIiB9IH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIuW+heS7mOasvlwiKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ3di1uYXZiYXItaXRlbVwiLCB7IGF0dHJzOiB7IGlkOiBcImRlbGl2ZXJlZFwiIH0gfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwi5b6F5pS26LSnXCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LW5hdmJhci1pdGVtXCIsIHsgYXR0cnM6IHsgaWQ6IFwiZmluaXNoZWRcIiB9IH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIuW3suWujOaIkFwiKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ3di1uYXZiYXItaXRlbVwiLCB7IGF0dHJzOiB7IGlkOiBcImNhbmNlbGVkXCIgfSB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCLlt7Llj5bmtohcIilcbiAgICAgICAgICBdKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF92bS5vcmRlcnMuZGF0YSAmJiBfdm0ub3JkZXJzLmRhdGEubGVuZ3RoID4gMFxuICAgICAgICA/IF9jKFxuICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwib3JkZXItbGlzdFwiIH0sXG4gICAgICAgICAgICBfdm0uX2woX3ZtLm9yZGVycy5kYXRhLCBmdW5jdGlvbihvcmRlcikge1xuICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgXCJyb3V0ZXItbGlua1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGtleTogb3JkZXIuaWQsXG4gICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJvcmRlci1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvb3JkZXIvXCIgKyBvcmRlci5udW1iZXIgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJoZFwiIH0sIFtcbiAgICAgICAgICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwib3JkZXItbnVtYmVyXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3Mob3JkZXIubnVtYmVyKSlcbiAgICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyLnN0YXR1cyA9PT0gXCJjYW5jZWxlZFwiIHx8IG9yZGVyLnN0YXR1cyA9PT0gXCJjYW5jZWxlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1kZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmRlc3Ryb3lPcmRlcihvcmRlci5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJpY29uZm9udCBpY29uLWRlbGV0ZVwiIH0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImJkXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl9sKG9yZGVyLm9yZGVyX2l0ZW1zLCBmdW5jdGlvbihvcmRlckl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBrZXk6IG9yZGVySXRlbS5wcm9kdWN0LmlkLCBzdGF0aWNDbGFzczogXCJwcm9kdWN0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogb3JkZXJJdGVtLnByb2R1Y3QudGh1bWJuYWlsLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJoNFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbm5lckhUTUw6IF92bS5fcyhvcmRlckl0ZW0ucHJvZHVjdC5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZ0XCIgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIG9yZGVyLnN0YXR1cyA9PT0gXCJuZWVkX3RvX3BheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid3YtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwcmltYXJ5XCIsIG1pbmk6IFwiXCIsIHBsYWluOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJvdXRlci5wdXNoKFwiL3BheW1lbnQvXCIgKyBvcmRlci5udW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLmlK/ku5hcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3di1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwcmltYXJ5XCIsIG1pbmk6IFwiXCIsIHBsYWluOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRyb3V0ZXIucHVzaChcInBheW1lbnQvXCIgKyBvcmRlci5udW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIlxcbiAgICAgICAgICDlho3mrKHotK3kubBcXG4gICAgICAgIFwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgb3JkZXIuc3RhdHVzID09PSBcIm5lZWRfdG9fcGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3di1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcImRlZmF1bHRcIiwgbWluaTogXCJcIiwgcGxhaW46IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jYW5jZWxPcmRlcihvcmRlci5pZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWPlua2iFxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICA6ICFfdm0uaXNMb2FkaW5nICYmIF92bS5vcmRlcnMuZGF0YSAmJiBfdm0ub3JkZXJzLmRhdGEubGVuZ3RoID09PSAwXG4gICAgICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImVtcHR5LW1zZ1wiIH0sIFtcbiAgICAgICAgICAgICAgX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiaWNvbmZvbnQgaWNvbi1vcmRlclwiIH0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm1zZ1wiIH0sIFtfdm0uX3YoXCLmsqHmnInnm7jlhbPorqLljZXorrDlvZVcIildKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtNzg5MzNhOGNcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTc4OTMzYThjXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA2MjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlhYzA2YzYyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjE0ZTU5YTQ2XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTlhYzA2YzYyXFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWFjMDZjNjJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05YWMwNmM2MlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uc3RhdHVzLWJhciB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIGxlZnQgdG9wLCBsZWZ0IGJvdHRvbSwgZnJvbSgjZTY0MzQwKSwgdG8oI2VjNmY2ZCkpO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2U2NDM0MCAwJSwgI2VjNmY2ZCAxMDAlKTtcXG4gIHBhZGRpbmc6IDFlbSAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuLnN0YXR1cy1iYXIgLnN0YXR1cy10ZXh0IHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDJlbTtcXG59XFxuLmFkZHJlc3MtaW5mbyB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcbi5wcm9kdWN0LWxpc3Qge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIHtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNlY2VjO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAudGh1bWJuYWlsIHtcXG4gICAgICB3aWR0aDogNzBweDtcXG4gICAgICBoZWlnaHQ6IDcwcHg7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCB7XFxuICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgICAgIC13ZWJraXQtYm94LWRpcmVjdGlvbjogbm9ybWFsO1xcbiAgICAgICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgcGFkZGluZzogMCAxNHB4O1xcbiAgICAgIC13ZWJraXQtYm94LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgIC1tcy1mbGV4LXBhY2s6IGp1c3RpZnk7XFxuICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAubmFtZSB7XFxuICAgICAgICBjb2xvcjogIzU1NTtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5hbW91bnQge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICBjb2xvcjogIzg4ODtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5wcmljZSB7XFxuICAgICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLmFkZC10by1jYXJ0IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHJpZ2h0OiAxMHB4O1xcbiAgICAgICAgYm90dG9tOiAxMHB4O1xcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgICAgcGFkZGluZzogLjJlbSAuM2VtO1xcbn1cXG4uZmVlLWluZm8ge1xcbiAgbWFyZ2luLWJvdHRvbTogNzBweDtcXG59XFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJvdHRvbTogMDtcXG4gIHotaW5kZXg6IDIwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IC41cmVtIDFyZW07XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pO1xcbn1cXG5mb290ZXIgLndldWktZmxleF9faXRlbSB7XFxuICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovQ29kZS93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLHFCQUFjO0VBQWQscUJBQWM7RUFBZCxjQUFjO0VBQ2QsWUFBWTtFQUNaLGFBQWE7RUFDYix3RkFBOEQ7RUFBOUQsOERBQThEO0VBQzlELGVBQWU7RUFDZixvQkFBb0I7Q0FBRTtBQUN0QjtJQUNFLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQUU7QUFFdkI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixjQUFjO0VBQ2Qsb0JBQW9CO0NBQUU7QUFFeEI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtDQUFFO0FBQ3pCO0lBQ0UscUJBQWM7SUFBZCxxQkFBYztJQUFkLGNBQWM7SUFDZCxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLG1CQUFtQjtDQUFFO0FBQ3JCO01BQ0UsWUFBWTtNQUNaLGFBQWE7Q0FBRTtBQUNqQjtNQUNFLHFCQUFjO01BQWQscUJBQWM7TUFBZCxjQUFjO01BQ2QsNkJBQXVCO01BQXZCLDhCQUF1QjtVQUF2QiwyQkFBdUI7Y0FBdkIsdUJBQXVCO01BQ3ZCLGdCQUFnQjtNQUNoQiwwQkFBK0I7VUFBL0IsdUJBQStCO2NBQS9CLCtCQUErQjtDQUFFO0FBQ2pDO1FBQ0UsWUFBWTtRQUNaLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsaUJBQWlCO0NBQUU7QUFDckI7UUFDRSxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLFlBQVk7Q0FBRTtBQUNoQjtRQUNFLFlBQVk7UUFDWixlQUFlO1FBQ2YsZ0JBQWdCO0NBQUU7QUFDcEI7UUFDRSxnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixhQUFhO1FBQ2IsdUJBQXVCO1FBQ3ZCLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsbUJBQW1CO0NBQUU7QUFFN0I7RUFDRSxvQkFBb0I7Q0FBRTtBQUV4QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFVBQVU7RUFDVixZQUFZO0VBQ1osdUJBQXVCO0VBQ3ZCLG9CQUFvQjtFQUNwQiwwQkFBMEI7Q0FBRTtBQUM1QjtJQUNFLHFCQUFjO0lBQWQscUJBQWM7SUFBZCxjQUFjO0lBQ2QseUJBQXdCO1FBQXhCLHNCQUF3QjtZQUF4Qix3QkFBd0I7Q0FBRVwiLFwiZmlsZVwiOlwib3JkZXIudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zdGF0dXMtYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICNlNjQzNDAgMCUsICNlYzZmNmQgMTAwJSk7XFxuICBwYWRkaW5nOiAxZW0gMDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7IH1cXG4gIC5zdGF0dXMtYmFyIC5zdGF0dXMtdGV4dCB7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAyZW07IH1cXG5cXG4uYWRkcmVzcy1pbmZvIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxcblxcbi5wcm9kdWN0LWxpc3Qge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgfVxcbiAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VjZWNlYztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxuICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAudGh1bWJuYWlsIHtcXG4gICAgICB3aWR0aDogNzBweDtcXG4gICAgICBoZWlnaHQ6IDcwcHg7IH1cXG4gICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IHtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgcGFkZGluZzogMCAxNHB4O1xcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxcbiAgICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAubmFtZSB7XFxuICAgICAgICBjb2xvcjogIzU1NTtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDsgfVxcbiAgICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAuYW1vdW50IHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgY29sb3I6ICM4ODg7IH1cXG4gICAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLnByaWNlIHtcXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7IH1cXG4gICAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLmFkZC10by1jYXJ0IHtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIHJpZ2h0OiAxMHB4O1xcbiAgICAgICAgYm90dG9tOiAxMHB4O1xcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcXG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XFxuICAgICAgICBvdXRsaW5lOiBub25lO1xcbiAgICAgICAgcGFkZGluZzogLjJlbSAuM2VtOyB9XFxuXFxuLmZlZS1pbmZvIHtcXG4gIG1hcmdpbi1ib3R0b206IDcwcHg7IH1cXG5cXG5mb290ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMjA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogLjVyZW0gMXJlbTtcXG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC0gMnJlbSk7IH1cXG4gIGZvb3RlciAud2V1aS1mbGV4X19pdGVtIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOWFjMDZjNjJcIixcInNjb3BlZFwiOmZhbHNlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWVcbi8vIG1vZHVsZSBpZCA9IDYyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJzdGF0dXMtYmFyXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwic3RhdHVzLXRleHRcIj57eyBvcmRlci5zdGF0dXMgfCBzdGF0dXNGaWx0ZXIgfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiYWRkcmVzcy1pbmZvXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibmFtZVwiIHYtdGV4dD1cIm9yZGVyLmNvbnN1bWVyX25hbWVcIj48L3NwYW4+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwibW9iaWxlXCIgdi10ZXh0PVwib3JkZXIuY29uc3VtZXJfbW9iaWxlXCI+PC9zcGFuPlxyXG4gICAgICA8cCBjbGFzcz1cImFkZHJlc3NcIiB2LXRleHQ9XCJvcmRlci5hZGRyZXNzXCI+PC9wPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtbGlzdFwiPlxyXG4gICAgICA8cm91dGVyLWxpbmsgOnRvPVwiJy9wcm9kdWN0LycgKyBvcmRlckl0ZW0ucHJvZHVjdC5pZFwiIGNsYXNzPVwicHJvZHVjdC1pdGVtXCJcclxuICAgICAgICAgICAgICAgICAgIHYtZm9yPVwib3JkZXJJdGVtIGluIG9yZGVyLm9yZGVyX2l0ZW1zXCIgOmtleT1cIm9yZGVySXRlbS5wcm9kdWN0LmlkXCI+XHJcbiAgICAgICAgPGltZyA6c3JjPVwib3JkZXJJdGVtLnByb2R1Y3QudGh1bWJuYWlsXCIgYWx0PVwiXCIgY2xhc3M9XCJ0aHVtYm5haWxcIi8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtLXJpZ2h0XCI+XHJcbiAgICAgICAgICA8aDQgY2xhc3M9XCJuYW1lXCIgdi1odG1sPVwib3JkZXJJdGVtLnByb2R1Y3QubmFtZVwiPjwvaDQ+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYW1vdW50XCI+5pWw6YeP77yae3sgb3JkZXJJdGVtLmFtb3VudCB9fTwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCI+e3sgb3JkZXJJdGVtLnByb2R1Y3QucHJpY2UgfCBwcmljZUZpbHRlciB9fTwvZGl2PlxyXG5cclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGQtdG8tY2FydFwiIEBjbGljay5wcmV2ZW50LnN0b3A9XCJhZGRUb0NhcnQob3JkZXJJdGVtLnByb2R1Y3QuaWQpXCI+5Yqg5YWl6LSt54mp6L2mPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvcm91dGVyLWxpbms+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8d3YtZ3JvdXAgY2xhc3M9XCJvcmRlci1pbmZvXCI+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi6K6i5Y2V5Y+3XCIgOnZhbHVlPVwib3JkZXIubnVtYmVyXCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuS4i+WNleaXtumXtFwiIDp2YWx1ZT1cIm9yZGVyLmNyZWF0ZWRfYXRcIj48L3d2LWNlbGw+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi5pSv5LuY5pe26Ze0XCIgOnZhbHVlPVwib3JkZXIuY3JlYXRlZF9hdFwiPjwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmlK/ku5jmlrnlvI9cIiA6dmFsdWU9XCJvcmRlci5jcmVhdGVkX2F0XCI+PC93di1jZWxsPlxyXG4gICAgPC93di1ncm91cD5cclxuXHJcbiAgICA8d3YtZ3JvdXAgY2xhc3M9XCJmZWUtaW5mb1wiPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuiuouWNleaAu+minVwiIDp2YWx1ZT1cIm9yZGVyLnRvdGFsX2ZlZVwiPjwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLov5DotLlcIiA6dmFsdWU9XCJvcmRlci50b3RhbF9mZWVcIj48L3d2LWNlbGw+XHJcbiAgICA8L3d2LWdyb3VwPlxyXG5cclxuICAgIDxmb290ZXI+XHJcbiAgICAgIDx3di1mbGV4IDpndXR0ZXI9XCIyMFwiPlxyXG4gICAgICAgIDx3di1mbGV4LWl0ZW0gdi1pZj1cIm9yZGVyLnN0YXR1cyA9PT0gJ25lZWRfdG9fcGF5J1wiPlxyXG4gICAgICAgICAgPHd2LWJ1dHRvbiB0eXBlPVwid2FyblwiIG1pbmkgQGNsaWNrLm5hdGl2ZT1cImNhbmNlbE9yZGVyXCI+5Y+W5raI6K6i5Y2VPC93di1idXR0b24+XHJcbiAgICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICAgICAgPHd2LWZsZXgtaXRlbSB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnY2FuY2VsZWQnIHx8IG9yZGVyLnN0YXR1cyA9PT0gJ2ZpbmlzaGVkJ1wiPlxyXG4gICAgICAgICAgPHd2LWJ1dHRvbiB0eXBlPVwid2FyblwiIG1pbmkgQGNsaWNrLm5hdGl2ZT1cImRlbGV0ZU9yZGVyXCI+5Yig6Zmk6K6i5Y2VPC93di1idXR0b24+XHJcbiAgICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICAgICAgPHd2LWZsZXgtaXRlbSB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnbmVlZF90b19wYXknXCI+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgbWluaSBAY2xpY2s9XCIkcm91dGVyLnB1c2goJy9wYXltZW50LycgKyBvcmRlci5udW1iZXIpXCI+5Y675LuY5qy+PC93di1idXR0b24+XHJcbiAgICAgICAgPC93di1mbGV4LWl0ZW0+XHJcbiAgICAgIDwvd3YtZmxleD5cclxuICAgIDwvZm9vdGVyPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBHcm91cCwgQ2VsbCwgRmxleCwgRmxleEl0ZW0sIEJ1dHRvbiB9IGZyb20gJ3dlLXZ1ZSdcclxuXHJcbiAgaW1wb3J0IHByaWNlRmlsdGVyIGZyb20gJy4uL21peGlucy9wcmljZV9maWx0ZXInXHJcbiAgaW1wb3J0IHN0YXR1c0ZpbHRlciBmcm9tICcuLi9taXhpbnMvc3RhdHVzX2ZpbHRlcidcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcG9uZW50czoge1xyXG4gICAgICBbR3JvdXAubmFtZV06IEdyb3VwLFxyXG4gICAgICBbQ2VsbC5uYW1lXTogQ2VsbCxcclxuICAgICAgW0J1dHRvbi5uYW1lXTogQnV0dG9uLFxyXG4gICAgICBbRmxleC5uYW1lXTogRmxleCxcclxuICAgICAgW0ZsZXhJdGVtLm5hbWVdOiBGbGV4SXRlbVxyXG4gICAgfSxcclxuXHJcbiAgICBtaXhpbnM6IFtcclxuICAgICAgcHJpY2VGaWx0ZXIsXHJcbiAgICAgIHN0YXR1c0ZpbHRlclxyXG4gICAgXSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBvcmRlcklkOiBudWxsLFxyXG4gICAgICAgIG9yZGVyOiB7fVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLm9yZGVyTnVtYmVyID0gdGhpcy4kcm91dGUucGFyYW1zLm9yZGVyTnVtYmVyXHJcblxyXG4gICAgICB0aGlzLmdldE9yZGVyKClcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICBnZXRPcmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoYG9yZGVyLyR7dGhpcy5vcmRlck51bWJlcn1gKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vcmRlciA9IHJlc3BvbnNlLmRhdGEub3JkZXJcclxuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBhZGRUb0NhcnQgKHByb2R1Y3RJZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3RJZClcclxuXHJcbiAgICAgICAgY29uc3QgcG9zdERhdGEgPSB7XHJcbiAgICAgICAgICBwcm9kdWN0SWQ6IHByb2R1Y3RJZCxcclxuICAgICAgICAgIGFtb3VudDogMVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdjYXJ0L2FkZCcsIHBvc3REYXRhKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCfmt7vliqDmiJDlip8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBjYW5jZWxPcmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdvcmRlci9jYW5jZWwnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCflj5bmtojmiJDlip8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBkZWxldGVPcmRlciAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdvcmRlci9jYW5jZWwnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kcm9vdC5zdWNjZXNzKCfliKDpmaTmiJDlip8nKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIGxhbmc9XCJzY3NzXCI+XHJcbiAgJHdldWktcmVkOiAjZTY0MzQwO1xyXG5cclxuICAuc3RhdHVzLWJhciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAkd2V1aS1yZWQgMCUsIGxpZ2h0ZW4oJHdldWktcmVkLCAxMCUpIDEwMCUpO1xyXG4gICAgcGFkZGluZzogMWVtIDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG5cclxuICAgIC5zdGF0dXMtdGV4dCB7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAyZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuYWRkcmVzcy1pbmZvIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuICB9XHJcblxyXG4gIC5wcm9kdWN0LWxpc3Qge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuXHJcbiAgICAucHJvZHVjdC1pdGVtIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgcGFkZGluZzogOHB4O1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VjZWNlYztcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgICAgLnRodW1ibmFpbCB7XHJcbiAgICAgICAgd2lkdGg6IDcwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiA3MHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAuaXRlbS1yaWdodCB7XHJcbiAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIHBhZGRpbmc6IDAgMTRweDtcclxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gICAgICAgIC5uYW1lIHtcclxuICAgICAgICAgIGNvbG9yOiAjNTU1O1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmFtb3VudCB7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgIGNvbG9yOiAjODg4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLnByaWNlIHtcclxuICAgICAgICAgIGNvbG9yOiAjNDQ0O1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYWRkLXRvLWNhcnQge1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgICAgcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgICBib3R0b206IDEwcHg7XHJcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcclxuICAgICAgICAgIG91dGxpbmU6IG5vbmU7XHJcbiAgICAgICAgICBwYWRkaW5nOiAuMmVtIC4zZW07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAuZmVlLWluZm8ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNzBweDtcclxuICB9XHJcblxyXG4gIGZvb3RlciB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB6LWluZGV4OiAyMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAuNXJlbSAxcmVtO1xyXG4gICAgd2lkdGg6IGNhbGMoMTAwdncgLSAycmVtKTtcclxuXHJcbiAgICAud2V1aS1mbGV4X19pdGVtIHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT83ZjlmYjA3YSIsImV4cG9ydCBkZWZhdWx0IHtcclxuICBmaWx0ZXJzOiB7XHJcbiAgICBzdGF0dXNGaWx0ZXI6IGZ1bmN0aW9uIChzdGF0dXMpIHtcclxuICAgICAgc3dpdGNoIChzdGF0dXMpIHtcclxuICAgICAgICBjYXNlICduZWVkX3RvX3BheSc6XHJcbiAgICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgICBjYXNlICdwYWlkJzpcclxuICAgICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICAgIGNhc2UgJ2RlbGl2ZXJlZCc6XHJcbiAgICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgICBjYXNlICdmaW5pc2hlZCc6XHJcbiAgICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgICBjYXNlICdjYW5jZWxlZCc6XHJcbiAgICAgICAgICByZXR1cm4gJ+W+heaUr+S7mCdcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9zdGF0dXNfZmlsdGVyLmpzIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwic3RhdHVzLWJhclwiIH0sIFtcbiAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwic3RhdHVzLXRleHRcIiB9LCBbXG4gICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJzdGF0dXNGaWx0ZXJcIikoX3ZtLm9yZGVyLnN0YXR1cykpKVxuICAgICAgICBdKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhZGRyZXNzLWluZm9cIiB9LCBbXG4gICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoX3ZtLm9yZGVyLmNvbnN1bWVyX25hbWUpIH1cbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibW9iaWxlXCIsXG4gICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0ub3JkZXIuY29uc3VtZXJfbW9iaWxlKSB9XG4gICAgICAgIH0pLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcInBcIiwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFkZHJlc3NcIixcbiAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKF92bS5vcmRlci5hZGRyZXNzKSB9XG4gICAgICAgIH0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWxpc3RcIiB9LFxuICAgICAgICBfdm0uX2woX3ZtLm9yZGVyLm9yZGVyX2l0ZW1zLCBmdW5jdGlvbihvcmRlckl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGtleTogb3JkZXJJdGVtLnByb2R1Y3QuaWQsXG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInByb2R1Y3QtaXRlbVwiLFxuICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcHJvZHVjdC9cIiArIG9yZGVySXRlbS5wcm9kdWN0LmlkIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IG9yZGVySXRlbS5wcm9kdWN0LnRodW1ibmFpbCwgYWx0OiBcIlwiIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiaXRlbS1yaWdodFwiIH0sIFtcbiAgICAgICAgICAgICAgICBfYyhcImg0XCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm5hbWVcIixcbiAgICAgICAgICAgICAgICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKG9yZGVySXRlbS5wcm9kdWN0Lm5hbWUpIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KFwi5pWw6YeP77yaXCIgKyBfdm0uX3Mob3JkZXJJdGVtLmFtb3VudCkpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcInByaWNlXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJwcmljZUZpbHRlclwiKShvcmRlckl0ZW0ucHJvZHVjdC5wcmljZSkpKVxuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhZGQtdG8tY2FydFwiLFxuICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgIF92bS5hZGRUb0NhcnQob3JkZXJJdGVtLnByb2R1Y3QuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWKoOWFpei0reeJqei9plwiKV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ3di1ncm91cFwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcIm9yZGVyLWluZm9cIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ3di1jZWxsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRpdGxlOiBcIuiuouWNleWPt1wiLCB2YWx1ZTogX3ZtLm9yZGVyLm51bWJlciB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IFwi5LiL5Y2V5pe26Ze0XCIsIHZhbHVlOiBfdm0ub3JkZXIuY3JlYXRlZF9hdCB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IFwi5pSv5LuY5pe26Ze0XCIsIHZhbHVlOiBfdm0ub3JkZXIuY3JlYXRlZF9hdCB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IFwi5pSv5LuY5pa55byPXCIsIHZhbHVlOiBfdm0ub3JkZXIuY3JlYXRlZF9hdCB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ3di1ncm91cFwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZlZS1pbmZvXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLorqLljZXmgLvpop1cIiwgdmFsdWU6IF92bS5vcmRlci50b3RhbF9mZWUgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ3di1jZWxsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRpdGxlOiBcIui/kOi0uVwiLCB2YWx1ZTogX3ZtLm9yZGVyLnRvdGFsX2ZlZSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJmb290ZXJcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ3di1mbGV4XCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IGd1dHRlcjogMjAgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfdm0ub3JkZXIuc3RhdHVzID09PSBcIm5lZWRfdG9fcGF5XCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInd2LWZsZXgtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIndhcm5cIiwgbWluaTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5jYW5jZWxPcmRlcigkZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWPlua2iOiuouWNlVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0ub3JkZXIuc3RhdHVzID09PSBcImNhbmNlbGVkXCIgfHwgX3ZtLm9yZGVyLnN0YXR1cyA9PT0gXCJmaW5pc2hlZFwiXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ3di1mbGV4LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3di1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ3YXJuXCIsIG1pbmk6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGVsZXRlT3JkZXIoJGV2ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLliKDpmaTorqLljZVcIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLm9yZGVyLnN0YXR1cyA9PT0gXCJuZWVkX3RvX3BheVwiXG4gICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJ3di1mbGV4LWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3di1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwcmltYXJ5XCIsIG1pbmk6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJvdXRlci5wdXNoKFwiL3BheW1lbnQvXCIgKyBfdm0ub3JkZXIubnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLljrvku5jmrL5cIildXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi05YWMwNmM2MlwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtOWFjMDZjNjJcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=