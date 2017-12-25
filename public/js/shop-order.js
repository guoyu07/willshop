webpackJsonp([1],{

/***/ 465:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(512)
}
var normalizeComponent = __webpack_require__(476)
/* script */
var __vue_script__ = __webpack_require__(514)
/* template */
var __vue_template__ = __webpack_require__(515)
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
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(516)
}
var normalizeComponent = __webpack_require__(476)
/* script */
var __vue_script__ = __webpack_require__(518)
/* template */
var __vue_template__ = __webpack_require__(520)
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
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=30)}({0:function(e,t){e.exports=function(e,t,n,o,r,i){var s,c=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,c=e.default);var l="function"==typeof c?c.options:c;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=a):o&&(a=o),a){var f=l.functional,d=f?l.render:l.beforeCreate;f?(l._injectStyles=a,l.render=function(e,t){return a.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:c,options:l}}},20:function(e,t,n){"use strict";t.a={props:{url:String,replace:Boolean,to:[String,Object]},methods:{routerLink:function(){var e=this.to,t=this.url,n=this.$router,o=this.replace;console.log(e),console.log(t),e&&n?n[o?"replace":"push"](e):t&&(o?location.replace(t):location.href=t)}}}},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(31);n.d(t,"default",function(){return o.a})},31:function(e,t,n){"use strict";function o(e){n(32)}var r=n(33),i=n(34),s=n(0),c=o,u=s(r.a,i.a,!1,c,"data-v-17907de8",null);t.a=u.exports},32:function(e,t){},33:function(e,t,n){"use strict";var o=n(20);t.a={name:"wv-cell",mixins:[o.a],props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean},mounted:function(){this.$on("CLICK_IN_CELLSWIPE",this.onClick)},methods:{onClick:function(){this.$emit("click"),this.routerLink()}}}},34:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell",class:{"weui-cell_access":e.isLink},on:{click:e.onClick}},[n("div",{staticClass:"weui-cell_hd"},[e._t("icon")],2),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[e._t("bd",[n("p",{domProps:{innerHTML:e._s(e.title)}})])],2),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[e._t("ft",[e._v(e._s(e.value))])],2)])},r=[],i={render:o,staticRenderFns:r};t.a=i}})});

/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=119)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,u=e.default);var f="function"==typeof u?u.options:u;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns,f._compiled=!0),n&&(f.functional=!0),o&&(f._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},f._ssrRegister=a):r&&(a=r),a){var l=f.functional,d=l?f.render:f.beforeCreate;l?(f._injectStyles=a,f.render=function(e,t){return a.call(t),d(e,t)}):f.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:u,options:f}}},119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(120);n.d(t,"default",function(){return r.a})},120:function(e,t,n){"use strict";function r(e){n(121)}var o=n(122),i=n(123),s=n(0),u=r,c=s(o.a,i.a,!1,u,"data-v-f093300c",null);t.a=c.exports},121:function(e,t){},122:function(e,t,n){"use strict";t.a={name:"wv-group",props:{title:String,titleColor:String}}},123:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.title?n("div",{staticClass:"weui-cells__title",style:{color:e.titleColor},domProps:{innerHTML:e._s(e.title)}}):e._e(),e._v(" "),n("div",{staticClass:"weui-cells"},[e._t("default")],2)])},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=114)}({0:function(e,t){e.exports=function(e,t,n,i,o,r){var s,a=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,a=e.default);var c="function"==typeof a?a.options:a;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var d;if(r?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=d):i&&(d=i),d){var l=c.functional,f=l?c.render:c.beforeCreate;l?(c._injectStyles=d,c.render=function(e,t){return d.call(t),f(e,t)}):c.beforeCreate=f?[].concat(f,d):[d]}return{esModule:s,exports:a,options:c}}},114:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(115);n.d(t,"default",function(){return i.a})},115:function(e,t,n){"use strict";function i(e){n(116)}var o=n(117),r=n(118),s=n(0),a=i,u=s(o.a,r.a,!1,a,"data-v-90bc4c20",null);t.a=u.exports},116:function(e,t){},117:function(e,t,n){"use strict";t.a={name:"wv-button",props:{type:{type:String,default:"default"},isLoading:Boolean,disabled:Boolean,mini:Boolean,plain:Boolean},methods:{handleClick:function(e){this.$emit("click",e)}},computed:{classObject:function(){var e={},t=this.plain?"weui-btn_plain-"+this.type:"weui-btn_"+this.type,n=this.plain?"weui-btn_plain-disabled":"weui-btn_disabled";return e[t]=!0,e[n]=this.disabled,e["weui-btn_loading"]=this.isLoading,e["weui-btn_mini"]=this.mini,e}}}},118:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{staticClass:"weui-btn",class:e.classObject,attrs:{disabled:e.disabled},on:{click:e.handleClick}},[e.isLoading?n("i",{staticClass:"weui-loading"}):e._e(),e._v(" "),e._t("default")],2)},o=[],r={render:i,staticRenderFns:o};t.a=r}})});

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=261)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var c="function"==typeof u?u.options:u;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=a):r&&(a=r),a){var d=c.functional,l=d?c.render:c.beforeCreate;d?(c._injectStyles=a,c.render=function(e,t){return a.call(t),l(e,t)}):c.beforeCreate=l?[].concat(l,a):[a]}return{esModule:s,exports:u,options:c}}},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(262);n.d(t,"default",function(){return r.a})},262:function(e,t,n){"use strict";function r(e){n(263)}var o=n(264),i=n(265),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-4d6eccf7",null);t.a=f.exports},263:function(e,t){},264:function(e,t,n){"use strict";t.a={name:"wv-flex-item",props:{flex:{type:[Number,String],default:1}},computed:{gutter:function(){return this.$parent.gutter},style:function(){var e={};return this.gutter&&(e.paddingLeft=this.gutter/2+"px",e.paddingRight=e.paddingLeft),e.flex=this.flex,e}}}},265:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex__item",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=256)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=c):r&&(c=r),c){var d=a.functional,l=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(e,t){return c.call(t),l(e,t)}):a.beforeCreate=l?[].concat(l,c):[c]}return{esModule:s,exports:u,options:a}}},256:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(257);n.d(t,"default",function(){return r.a})},257:function(e,t,n){"use strict";function r(e){n(258)}var o=n(259),i=n(260),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-6fd6a76c",null);t.a=f.exports},258:function(e,t){},259:function(e,t,n){"use strict";t.a={name:"wv-flex",props:{gutter:{type:Number,default:0}},computed:{style:function(){var e={};if(this.gutter){var t="-"+this.gutter/2+"px";e.marginLeft=t,e.marginRight=t}return e}}}},260:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

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

/***/ 493:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=159)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,a=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),o&&(u._scopeId=o);var d;if(i?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},u._ssrRegister=d):r&&(d=r),d){var f=u.functional,l=f?u.render:u.beforeCreate;f?(u._injectStyles=d,u.render=function(e,t){return d.call(t),l(e,t)}):u.beforeCreate=l?[].concat(l,d):[d]}return{esModule:s,exports:a,options:u}}},159:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(160);n.d(t,"default",function(){return r.a})},160:function(e,t,n){"use strict";function r(e){n(161)}var o=n(162),i=n(163),s=n(0),a=r,c=s(o.a,i.a,!1,a,"data-v-36cfba55",null);t.a=c.exports},161:function(e,t){},162:function(e,t,n){"use strict";t.a={name:"wv-navbar-item",props:{id:String,disabled:Boolean},computed:{isSelected:function(){return this.id===this.$parent.value},style:function(){return{borderWidth:this.$parent.lineWidth+"px",borderColor:this.$parent.activeColor,color:this.isSelected?this.$parent.activeColor:this.$parent.color}}},methods:{onClick:function(){this.disabled||this.$parent.$emit("input",this.id)}}}},163:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-navbar__item",class:{"wv-navbar__item_on":!e.$parent.animate&&e.$parent.value===e.id,disabled:e.disabled},style:e.style,on:{click:e.onClick}},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 494:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=154)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var u,a=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(u=e,a=e.default);var s="function"==typeof a?a.options:a;t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns,s._compiled=!0),n&&(s.functional=!0),o&&(s._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},s._ssrRegister=c):r&&(c=r),c){var d=s.functional,l=d?s.render:s.beforeCreate;d?(s._injectStyles=c,s.render=function(e,t){return c.call(t),l(e,t)}):s.beforeCreate=l?[].concat(l,c):[c]}return{esModule:u,exports:a,options:s}}},154:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(155);n.d(t,"default",function(){return r.a})},155:function(e,t,n){"use strict";function r(e){n(156)}var o=n(157),i=n(158),u=n(0),a=r,f=u(o.a,i.a,!1,a,"data-v-79f63fb3",null);t.a=f.exports},156:function(e,t){},157:function(e,t,n){"use strict";t.a={name:"wv-navbar",props:{fixed:Boolean,color:{type:String,default:"#333"},backgroundColor:{type:String,default:"#fff"},activeColor:{type:String,default:"#2196f3"},disabledColor:{type:String,default:"#cfcfcf"},lineWidth:{type:Number,default:2},animate:{type:Boolean,default:!0},value:{}},data:function(){return{childrenCount:0,currentIndex:0}},computed:{style:function(){var e={position:this.fixed?"fixed":"absolute",backgroundColor:this.backgroundColor};return this.fixed&&(e.top=0,e.left=0,e.right=0),e},lineStyle:function(){var e=1/this.childrenCount*100;return{backgroundColor:this.activeColor,left:e*this.currentIndex+"%",width:e+"%",height:this.lineWidth+"px"}}},mounted:function(){var e=this;this.$nextTick(function(){e.childrenCount=e.$children.length,e.updateCurrentIndex()})},methods:{updateCurrentIndex:function(){var e=this;this.$children.forEach(function(t,n){t.id===e.value&&(e.currentIndex=n)})}},watch:{value:function(e){this.$emit("change",e),this.updateCurrentIndex()}}}},158:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wv-navbar",style:e.style},[e._t("default"),e._v(" "),e.animate?n("div",{staticClass:"wv-navbar-underline",style:e.lineStyle}):e._e()],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 512:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(513);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(475)("222459d5", content, false);
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

/***/ 513:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(117)(true);
// imports


// module
exports.push([module.i, "\n.order-list[data-v-78933a8c] {\n  padding-top: 65px;\n}\n.order-list .order-item[data-v-78933a8c] {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em;\n}\n.order-list .order-item .hd[data-v-78933a8c] {\n      display: block;\n      overflow: hidden;\n}\n.order-list .order-item .hd .order-number[data-v-78933a8c] {\n        float: left;\n        font-size: 13px;\n        color: #666;\n}\n.order-list .order-item .hd .btn-delete[data-v-78933a8c] {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px;\n}\n.order-list .order-item .bd[data-v-78933a8c] {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5;\n}\n.order-list .order-item .bd .product[data-v-78933a8c] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        padding: .2em;\n}\n.order-list .order-item .bd .product .thumbnail[data-v-78933a8c] {\n          width: 60px;\n          height: 60px;\n}\n.order-list .order-item .bd .product .name[data-v-78933a8c] {\n          margin-left: 10px;\n          color: #555;\n}\n.order-list .order-item .ft[data-v-78933a8c] {\n      padding: 10px;\n      text-align: right;\n}\n.empty-msg[data-v-78933a8c] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #777;\n}\n.empty-msg .iconfont[data-v-78933a8c] {\n    font-size: 80px;\n}\n.empty-msg .msg[data-v-78933a8c] {\n    font-size: 14px;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/order-list.vue"],"names":[],"mappings":";AAAA;EACE,kBAAkB;CAAE;AACpB;IACE,eAAe;IACf,iBAAiB;IACjB,YAAY;IACZ,cAAc;IACd,uBAAuB;IACvB,mBAAmB;CAAE;AACrB;MACE,eAAe;MACf,iBAAiB;CAAE;AACnB;QACE,YAAY;QACZ,gBAAgB;QAChB,YAAY;CAAE;AAChB;QACE,aAAa;QACb,gBAAgB;QAChB,YAAY;QACZ,mBAAmB;CAAE;AACzB;MACE,eAAe;MACf,iBAAiB;MACjB,0BAA0B;CAAE;AAC5B;QACE,qBAAc;QAAd,qBAAc;QAAd,cAAc;QACd,cAAc;CAAE;AAChB;UACE,YAAY;UACZ,aAAa;CAAE;AACjB;UACE,kBAAkB;UAClB,YAAY;CAAE;AACpB;MACE,cAAc;MACd,kBAAkB;CAAE;AAE1B;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,YAAY;EACZ,aAAa;EACb,6BAAuB;EAAvB,8BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,yBAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,YAAY;CAAE;AACd;IACE,gBAAgB;CAAE;AACpB;IACE,gBAAgB;CAAE","file":"order-list.vue","sourcesContent":[".order-list {\n  padding-top: 65px; }\n  .order-list .order-item {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    padding: .2em;\n    background-color: #fff;\n    margin-bottom: 1em; }\n    .order-list .order-item .hd {\n      display: block;\n      overflow: hidden; }\n      .order-list .order-item .hd .order-number {\n        float: left;\n        font-size: 13px;\n        color: #666; }\n      .order-list .order-item .hd .btn-delete {\n        float: right;\n        font-size: 14px;\n        color: #777;\n        margin-right: 10px; }\n    .order-list .order-item .bd {\n      display: block;\n      overflow: hidden;\n      background-color: #f5f5f5; }\n      .order-list .order-item .bd .product {\n        display: flex;\n        padding: .2em; }\n        .order-list .order-item .bd .product .thumbnail {\n          width: 60px;\n          height: 60px; }\n        .order-list .order-item .bd .product .name {\n          margin-left: 10px;\n          color: #555; }\n    .order-list .order-item .ft {\n      padding: 10px;\n      text-align: right; }\n\n.empty-msg {\n  display: flex;\n  width: 100%;\n  height: 80vh;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  color: #777; }\n  .empty-msg .iconfont {\n    font-size: 80px; }\n  .empty-msg .msg {\n    font-size: 14px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_navbar_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_navbar__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(80);









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

/***/ 515:
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

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(517);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(475)("14e59a46", content, false);
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

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(117)(true);
// imports


// module
exports.push([module.i, "\n.status-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: -webkit-gradient(linear, left top, left bottom, from(#e64340), to(#ec6f6d));\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px;\n}\n.status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em;\n}\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n}\n.product-list .product-item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative;\n}\n.product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px;\n}\n.product-list .product-item .item-right {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-direction: column;\n              flex-direction: column;\n      padding: 0 14px;\n      -webkit-box-pack: justify;\n          -ms-flex-pack: justify;\n              justify-content: space-between;\n}\n.product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500;\n}\n.product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888;\n}\n.product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px;\n}\n.product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em;\n}\n.fee-info {\n  margin-bottom: 70px;\n}\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem);\n}\nfooter .weui-flex__item {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/order.vue"],"names":[],"mappings":";AAAA;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,YAAY;EACZ,aAAa;EACb,wFAA8D;EAA9D,8DAA8D;EAC9D,eAAe;EACf,oBAAoB;CAAE;AACtB;IACE,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;CAAE;AAEvB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,cAAc;EACd,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;CAAE;AACzB;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,aAAa;IACb,iCAAiC;IACjC,mBAAmB;CAAE;AACrB;MACE,YAAY;MACZ,aAAa;CAAE;AACjB;MACE,qBAAc;MAAd,qBAAc;MAAd,cAAc;MACd,6BAAuB;MAAvB,8BAAuB;UAAvB,2BAAuB;cAAvB,uBAAuB;MACvB,gBAAgB;MAChB,0BAA+B;UAA/B,uBAA+B;cAA/B,+BAA+B;CAAE;AACjC;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;QAChB,iBAAiB;CAAE;AACrB;QACE,eAAe;QACf,gBAAgB;QAChB,YAAY;CAAE;AAChB;QACE,YAAY;QACZ,eAAe;QACf,gBAAgB;CAAE;AACpB;QACE,gBAAgB;QAChB,mBAAmB;QACnB,YAAY;QACZ,aAAa;QACb,uBAAuB;QACvB,iBAAiB;QACjB,cAAc;QACd,mBAAmB;CAAE;AAE7B;EACE,oBAAoB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,gBAAgB;EAChB,UAAU;EACV,YAAY;EACZ,uBAAuB;EACvB,oBAAoB;EACpB,0BAA0B;CAAE;AAC5B;IACE,qBAAc;IAAd,qBAAc;IAAd,cAAc;IACd,yBAAwB;QAAxB,sBAAwB;YAAxB,wBAAwB;CAAE","file":"order.vue","sourcesContent":[".status-bar {\n  display: flex;\n  width: 100%;\n  height: 30px;\n  background: linear-gradient(180deg, #e64340 0%, #ec6f6d 100%);\n  padding: 1em 0;\n  margin-bottom: 10px; }\n  .status-bar .status-text {\n    color: #fff;\n    font-size: 14px;\n    margin-left: 2em; }\n\n.address-info {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  padding: 10px;\n  margin-bottom: 10px; }\n\n.product-list {\n  display: block;\n  overflow: hidden;\n  background-color: #fff; }\n  .product-list .product-item {\n    display: flex;\n    padding: 8px;\n    border-bottom: 1px solid #ececec;\n    position: relative; }\n    .product-list .product-item .thumbnail {\n      width: 70px;\n      height: 70px; }\n    .product-list .product-item .item-right {\n      display: flex;\n      flex-direction: column;\n      padding: 0 14px;\n      justify-content: space-between; }\n      .product-list .product-item .item-right .name {\n        color: #555;\n        display: block;\n        font-size: 15px;\n        font-weight: 500; }\n      .product-list .product-item .item-right .amount {\n        display: block;\n        font-size: 12px;\n        color: #888; }\n      .product-list .product-item .item-right .price {\n        color: #444;\n        display: block;\n        font-size: 14px; }\n      .product-list .product-item .item-right .add-to-cart {\n        font-size: 12px;\n        position: absolute;\n        right: 10px;\n        bottom: 10px;\n        border: 1px solid #ddd;\n        background: none;\n        outline: none;\n        padding: .2em .3em; }\n\n.fee-info {\n  margin-bottom: 70px; }\n\nfooter {\n  display: block;\n  overflow: hidden;\n  position: fixed;\n  bottom: 0;\n  z-index: 20;\n  background-color: #fff;\n  padding: .5rem 1rem;\n  width: calc(100vw - 2rem); }\n  footer .weui-flex__item {\n    display: flex;\n    justify-content: center; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_price_filter__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_status_filter__ = __webpack_require__(519);












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

/***/ 519:
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

/***/ 520:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9ncm91cC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9idXR0b24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL21peGlucy9wcmljZV9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbmF2YmFyLWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbmF2YmFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZT9lZDJhIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZT82OGM4Iiwid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlPzM2MzUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT9kMGNkIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWU/NjlhYyIsIndlYnBhY2s6Ly8vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3N0YXR1c19maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZT8wZmQzIl0sIm5hbWVzIjpbImZpbHRlcnMiLCJwcmljZUZpbHRlciIsInZhbCIsIk51bWJlciIsInRvRml4ZWQiLCJzdGF0dXNGaWx0ZXIiLCJzdGF0dXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXFNO0FBQ3JNO0FBQ0E7QUFDQTtBQUNBLDRDQUE0ZDtBQUM1ZDtBQUNBLDhDQUFrTDtBQUNsTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0VBQStFLHdEQUF3RCxJQUFJOztBQUUzSTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBc007QUFDdE07QUFDQTtBQUNBO0FBQ0EsNENBQTRkO0FBQzVkO0FBQ0EsOENBQW1MO0FBQ25MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0Usd0RBQXdELElBQUk7O0FBRTNJO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTtBQUNBLHVCQUF1QiwyQkFBMkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQix1QkFBdUI7QUFDNUM7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdE5BOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3QkFBd0I7QUFDM0QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFCQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7O0FDdkJBLGtCQUFrQix5RDs7Ozs7OztBQ0FsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQSxxRUFBdUUsNENBQTRDOzs7Ozs7OztBQ0ZuSCxlQUFlLDJCQUF3RSwyREFBMkQsS0FBSyxVQUFVLDZEQUE2RCwrQ0FBK0MsbUJBQW1CLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxTQUFTLHVDQUF1QyxxQ0FBcUMsb0NBQW9DLEVBQUUsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELGtCQUFrQixFQUFFLGdCQUFnQixnQ0FBZ0MsZUFBZSxvQkFBb0IsZ0RBQWdELHVDQUF1QyxpSEFBaUgsTUFBTSxvQkFBb0IsMFBBQTBQLCtCQUErQiwrQ0FBK0MsNENBQTRDLHdCQUF3QixzQ0FBc0MsT0FBTyxpQ0FBaUMsb0JBQW9CLGFBQWEsS0FBSyxPQUFPLDhDQUE4QyxVQUFVLHNCQUFzQix1REFBdUQsMEdBQTBHLG9CQUFvQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsWUFBWSwyQkFBMkIsV0FBVyxFQUFFLG9CQUFvQixhQUFhLGNBQWMsTUFBTSx3RUFBd0UsY0FBYyxtQkFBbUIsb0JBQW9CLGFBQWEsWUFBWSxLQUFLLG1DQUFtQyxPQUFPLHFCQUFxQixRQUFRLHFCQUFxQixnQkFBZ0Isb0JBQW9CLDRDQUE0QyxVQUFVLG1CQUFtQix5Q0FBeUMsb0JBQW9CLGFBQWEsaUJBQWlCLDhDQUE4QyxnQkFBZ0IsK0JBQStCLDRCQUE0QixLQUFLLGlCQUFpQixXQUFXLDJCQUEyQixzQ0FBc0MsNEJBQTRCLG9CQUFvQixVQUFVLHlCQUF5QiwyQkFBMkIsNEJBQTRCLHlDQUF5QyxTQUFTLDRCQUE0QixPQUFPLEVBQUUsRTs7Ozs7OztBQ0F6MEYsZUFBZSwyQkFBd0UsMkRBQTJELEtBQUssVUFBVSw2REFBNkQsK0NBQStDLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsYUFBYSwyQkFBMkIsV0FBVyxFQUFFLHFCQUFxQixhQUFhLGNBQWMsT0FBTywwRUFBMEUsY0FBYyxvQkFBb0IscUJBQXFCLGFBQWEsS0FBSyx1QkFBdUIsaUNBQWlDLHFCQUFxQixhQUFhLGlCQUFpQiw4Q0FBOEMsaUNBQWlDLHVDQUF1QyxtQkFBbUIsV0FBVyx5QkFBeUIsNEJBQTRCLHlCQUF5Qix3QkFBd0IsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7QUNBN3RFLGVBQWUsMkJBQXdFLDJEQUEyRCxLQUFLLFVBQVUsNkRBQTZELCtDQUErQyxtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLGdDQUFnQyxlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLGlIQUFpSCxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyw0Q0FBNEMsd0JBQXdCLHNDQUFzQyxPQUFPLGlDQUFpQyxxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsYUFBYSxjQUFjLE9BQU8sMEVBQTBFLGNBQWMsb0JBQW9CLHFCQUFxQixhQUFhLEtBQUssd0JBQXdCLE1BQU0sOEJBQThCLCtEQUErRCxVQUFVLHdCQUF3Qix1QkFBdUIsV0FBVyx1QkFBdUIsUUFBUSwySEFBMkgseUdBQXlHLHFCQUFxQixhQUFhLGlCQUFpQiw4Q0FBOEMsbUJBQW1CLGtEQUFrRCxvQkFBb0IsS0FBSyxxQkFBcUIscUJBQXFCLDJCQUEyQix1Q0FBdUMsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7QUNBcm1GLGVBQWUsMkJBQXdFLDJEQUEyRCxLQUFLLFVBQVUsNkRBQTZELCtDQUErQyxtQkFBbUIsY0FBYyw0QkFBNEIsWUFBWSxxQkFBcUIsMkRBQTJELFNBQVMsdUNBQXVDLHFDQUFxQyxvQ0FBb0MsRUFBRSxpQkFBaUIsaUNBQWlDLGlCQUFpQixZQUFZLFVBQVUsc0JBQXNCLG1CQUFtQixpREFBaUQsbUJBQW1CLEVBQUUsZ0JBQWdCLGdDQUFnQyxlQUFlLG9CQUFvQixnREFBZ0QsdUNBQXVDLGlIQUFpSCxNQUFNLG9CQUFvQiwwUEFBMFAsK0JBQStCLCtDQUErQyw0Q0FBNEMsd0JBQXdCLHNDQUFzQyxPQUFPLGlDQUFpQyxxQkFBcUIsYUFBYSxzQ0FBc0MsU0FBUyxFQUFFLGFBQWEsMkJBQTJCLFdBQVcsRUFBRSxxQkFBcUIsYUFBYSxjQUFjLE9BQU8sMEVBQTBFLGNBQWMsb0JBQW9CLHFCQUFxQixhQUFhLEtBQUssMkJBQTJCLE1BQU0sZ0NBQWdDLFdBQVcsa0JBQWtCLDJCQUEyQixrQkFBa0IsU0FBUywwR0FBMEcscUJBQXFCLGFBQWEsaUJBQWlCLDhCQUE4Qiw2QkFBNkIsNENBQTRDLHNCQUFzQixTQUFTLDRCQUE0QixPQUFPLEVBQUUsRTs7Ozs7OztBQ0F0eUUsZUFBZSwyQkFBd0UsMkRBQTJELEtBQUssVUFBVSw2REFBNkQsK0NBQStDLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsYUFBYSwyQkFBMkIsV0FBVyxFQUFFLHFCQUFxQixhQUFhLGNBQWMsT0FBTywwRUFBMEUsY0FBYyxvQkFBb0IscUJBQXFCLGFBQWEsS0FBSyxzQkFBc0IsUUFBUSx1QkFBdUIsV0FBVyxpQkFBaUIsU0FBUyxnQkFBZ0IsNkJBQTZCLCtCQUErQixZQUFZLHFCQUFxQixhQUFhLGlCQUFpQiw4QkFBOEIsNkJBQTZCLHNDQUFzQyxzQkFBc0IsU0FBUyw0QkFBNEIsT0FBTyxFQUFFLEU7Ozs7Ozs7O0FDQXB0RSx5REFBZTtBQUNiQSxXQUFTO0FBQ1BDLGlCQUFhLHFCQUFVQyxHQUFWLEVBQWU7QUFDMUIsYUFBTyxNQUFNQyxPQUFPRCxHQUFQLEVBQVlFLE9BQVosQ0FBb0IsQ0FBcEIsQ0FBYjtBQUNEO0FBSE07QUFESSxDQUFmLEU7Ozs7Ozs7QUNBQSxlQUFlLDJCQUF3RSwyREFBMkQsS0FBSyxVQUFVLDZEQUE2RCwrQ0FBK0MsbUJBQW1CLGNBQWMsNEJBQTRCLFlBQVkscUJBQXFCLDJEQUEyRCxTQUFTLHVDQUF1QyxxQ0FBcUMsb0NBQW9DLEVBQUUsaUJBQWlCLGlDQUFpQyxpQkFBaUIsWUFBWSxVQUFVLHNCQUFzQixtQkFBbUIsaURBQWlELG1CQUFtQixFQUFFLGdCQUFnQixnQ0FBZ0MsZUFBZSxvQkFBb0IsZ0RBQWdELHVDQUF1QyxpSEFBaUgsTUFBTSxvQkFBb0IsMFBBQTBQLCtCQUErQiwrQ0FBK0MsNENBQTRDLHdCQUF3QixzQ0FBc0MsT0FBTyxpQ0FBaUMscUJBQXFCLGFBQWEsc0NBQXNDLFNBQVMsRUFBRSxhQUFhLDJCQUEyQixXQUFXLEVBQUUscUJBQXFCLGFBQWEsY0FBYyxPQUFPLDBFQUEwRSxjQUFjLG9CQUFvQixxQkFBcUIsYUFBYSxLQUFLLDZCQUE2QiwyQkFBMkIsV0FBVyxzQkFBc0Isb0NBQW9DLGtCQUFrQixPQUFPLGlKQUFpSixVQUFVLG1CQUFtQixzREFBc0QscUJBQXFCLGFBQWEsaUJBQWlCLDhCQUE4Qiw2QkFBNkIscUNBQXFDLG9GQUFvRixtQkFBbUIsaUJBQWlCLHNCQUFzQixTQUFTLDRCQUE0QixPQUFPLEVBQUUsRTs7Ozs7OztBQ0FuaEYsZUFBZSwyQkFBd0UsMkRBQTJELEtBQUssVUFBVSw2REFBNkQsK0NBQStDLG1CQUFtQixjQUFjLDRCQUE0QixZQUFZLHFCQUFxQiwyREFBMkQsU0FBUyx1Q0FBdUMscUNBQXFDLG9DQUFvQyxFQUFFLGlCQUFpQixpQ0FBaUMsaUJBQWlCLFlBQVksVUFBVSxzQkFBc0IsbUJBQW1CLGlEQUFpRCxtQkFBbUIsRUFBRSxnQkFBZ0IsZ0NBQWdDLGVBQWUsb0JBQW9CLGdEQUFnRCx1Q0FBdUMsaUhBQWlILE1BQU0sb0JBQW9CLDBQQUEwUCwrQkFBK0IsK0NBQStDLDRDQUE0Qyx3QkFBd0Isc0NBQXNDLE9BQU8saUNBQWlDLHFCQUFxQixhQUFhLHNDQUFzQyxTQUFTLEVBQUUsYUFBYSwyQkFBMkIsV0FBVyxFQUFFLHFCQUFxQixhQUFhLGNBQWMsT0FBTywwRUFBMEUsY0FBYyxvQkFBb0IscUJBQXFCLGFBQWEsS0FBSyx3QkFBd0IscUJBQXFCLDJCQUEyQixrQkFBa0IsMkJBQTJCLGNBQWMsOEJBQThCLGdCQUFnQiw4QkFBOEIsWUFBWSxzQkFBc0IsVUFBVSx3QkFBd0IsVUFBVSxpQkFBaUIsT0FBTyxnQ0FBZ0MsV0FBVyxpQkFBaUIsT0FBTyw2RUFBNkUsa0RBQWtELHNCQUFzQiwrQkFBK0IsT0FBTyx1R0FBdUcsb0JBQW9CLFdBQVcsMEJBQTBCLDBEQUEwRCxFQUFFLFVBQVUsOEJBQThCLFdBQVcscUNBQXFDLG1DQUFtQyxHQUFHLFFBQVEsa0JBQWtCLG9EQUFvRCxxQkFBcUIsYUFBYSxpQkFBaUIsOENBQThDLGdCQUFnQixzQ0FBc0MsK0NBQStDLG9EQUFvRCxhQUFhLFNBQVMsNEJBQTRCLE9BQU8sRUFBRSxFOzs7Ozs7O0FDQTFsRzs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHlEQUEwRCxzQkFBc0IsR0FBRyw0Q0FBNEMscUJBQXFCLHVCQUF1QixrQkFBa0Isb0JBQW9CLDZCQUE2Qix5QkFBeUIsR0FBRyxnREFBZ0QsdUJBQXVCLHlCQUF5QixHQUFHLDhEQUE4RCxzQkFBc0IsMEJBQTBCLHNCQUFzQixHQUFHLDREQUE0RCx1QkFBdUIsMEJBQTBCLHNCQUFzQiw2QkFBNkIsR0FBRyxnREFBZ0QsdUJBQXVCLHlCQUF5QixrQ0FBa0MsR0FBRyx5REFBeUQsK0JBQStCLCtCQUErQix3QkFBd0Isd0JBQXdCLEdBQUcsb0VBQW9FLHdCQUF3Qix5QkFBeUIsR0FBRywrREFBK0QsOEJBQThCLHdCQUF3QixHQUFHLGdEQUFnRCxzQkFBc0IsMEJBQTBCLEdBQUcsK0JBQStCLHlCQUF5Qix5QkFBeUIsa0JBQWtCLGdCQUFnQixpQkFBaUIsaUNBQWlDLGtDQUFrQyxtQ0FBbUMsbUNBQW1DLDZCQUE2Qiw4QkFBOEIsb0NBQW9DLDhCQUE4QiwrQkFBK0IsZ0NBQWdDLGdCQUFnQixHQUFHLHlDQUF5QyxzQkFBc0IsR0FBRyxvQ0FBb0Msc0JBQXNCLEdBQUcsVUFBVSxpSEFBaUgsS0FBSyxZQUFZLEtBQUssTUFBTSxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLEtBQUssTUFBTSxVQUFVLFlBQVksV0FBVyxLQUFLLE1BQU0sVUFBVSxZQUFZLFdBQVcsWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU0sWUFBWSxXQUFXLEtBQUssTUFBTSxVQUFVLFlBQVksS0FBSyxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsS0FBSyxLQUFLLFlBQVksS0FBSyxNQUFNLFlBQVksOERBQThELHNCQUFzQixFQUFFLDZCQUE2QixxQkFBcUIsdUJBQXVCLGtCQUFrQixvQkFBb0IsNkJBQTZCLHlCQUF5QixFQUFFLG1DQUFtQyx1QkFBdUIseUJBQXlCLEVBQUUsbURBQW1ELHNCQUFzQiwwQkFBMEIsc0JBQXNCLEVBQUUsaURBQWlELHVCQUF1QiwwQkFBMEIsc0JBQXNCLDZCQUE2QixFQUFFLG1DQUFtQyx1QkFBdUIseUJBQXlCLGtDQUFrQyxFQUFFLDhDQUE4Qyx3QkFBd0Isd0JBQXdCLEVBQUUsMkRBQTJELHdCQUF3Qix5QkFBeUIsRUFBRSxzREFBc0QsOEJBQThCLHdCQUF3QixFQUFFLG1DQUFtQyxzQkFBc0IsMEJBQTBCLEVBQUUsZ0JBQWdCLGtCQUFrQixnQkFBZ0IsaUJBQWlCLDJCQUEyQiw0QkFBNEIsd0JBQXdCLGdCQUFnQixFQUFFLDBCQUEwQixzQkFBc0IsRUFBRSxxQkFBcUIsc0JBQXNCLEVBQUUscUJBQXFCOztBQUVyaEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBREE7O0FBR0E7QUFFQSxxTEFDQSwyTkFDQSwyTkFHQTs7d0JBQ0E7O2NBRUE7Y0FFQTtBQUhBO0FBS0E7OztBQUNBOzttQkFLQTs7QUFKQTs7OEJBS0E7U0FDQTtBQUVBOzs7OztBQUVBOzs7K0JBRUE7QUFEQSxrQ0FFQTtxQ0FDQTtnQ0FDQTtvQkFDQTtBQUNBO0FBRUE7b0NBQ0E7V0FDQTtBQUVBOztBQUNBOzs4REFDQTttRkFDQTsrQkFDQTtrQ0FDQTtzQkFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTs7OERBQ0E7c0ZBQ0E7K0JBQ0E7a0NBQ0E7c0JBQ0E7QUFDQTtBQUNBO0FBRUE7QUFsQ0E7QUF4QkEsRzs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1DQUFtQztBQUNyRCxlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsZ0NBQWdDLFNBQVMsWUFBWSxFQUFFO0FBQ3ZEO0FBQ0EsZ0NBQWdDLFNBQVMsb0JBQW9CLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsa0JBQWtCLEVBQUU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsaUJBQWlCLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLFNBQVMsaUJBQWlCLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLGlCQUFpQjtBQUNqQjtBQUNBLDZCQUE2QixvQkFBb0I7QUFDakQsZ0NBQWdDLDhCQUE4QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0Isb0NBQW9DLHNDQUFzQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBb0Q7QUFDN0U7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyx1Q0FBdUM7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsdUNBQXVDO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLHVDQUF1QztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xELHVCQUF1QixxQ0FBcUM7QUFDNUQ7QUFDQSx5QkFBeUIscUJBQXFCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNyTEE7O0FBRUE7QUFDQSxxQ0FBeU87QUFDek87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNKQUFzSixrRkFBa0Y7QUFDeE8sK0pBQStKLGtGQUFrRjtBQUNqUDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEM7Ozs7Ozs7QUNwQkE7QUFDQTs7O0FBR0E7QUFDQSx3Q0FBeUMseUJBQXlCLHlCQUF5QixrQkFBa0IsZ0JBQWdCLGlCQUFpQiw0RkFBNEYsa0VBQWtFLG1CQUFtQix3QkFBd0IsR0FBRyw0QkFBNEIsa0JBQWtCLHNCQUFzQix1QkFBdUIsR0FBRyxpQkFBaUIsbUJBQW1CLHFCQUFxQiwyQkFBMkIsa0JBQWtCLHdCQUF3QixHQUFHLGlCQUFpQixtQkFBbUIscUJBQXFCLDJCQUEyQixHQUFHLCtCQUErQiwyQkFBMkIsMkJBQTJCLG9CQUFvQixtQkFBbUIsdUNBQXVDLHlCQUF5QixHQUFHLDBDQUEwQyxvQkFBb0IscUJBQXFCLEdBQUcsMkNBQTJDLDZCQUE2Qiw2QkFBNkIsc0JBQXNCLHFDQUFxQyxzQ0FBc0MsdUNBQXVDLHVDQUF1Qyx3QkFBd0Isa0NBQWtDLG1DQUFtQywrQ0FBK0MsR0FBRyxpREFBaUQsc0JBQXNCLHlCQUF5QiwwQkFBMEIsMkJBQTJCLEdBQUcsbURBQW1ELHlCQUF5QiwwQkFBMEIsc0JBQXNCLEdBQUcsa0RBQWtELHNCQUFzQix5QkFBeUIsMEJBQTBCLEdBQUcsd0RBQXdELDBCQUEwQiw2QkFBNkIsc0JBQXNCLHVCQUF1QixpQ0FBaUMsMkJBQTJCLHdCQUF3Qiw2QkFBNkIsR0FBRyxhQUFhLHdCQUF3QixHQUFHLFVBQVUsbUJBQW1CLHFCQUFxQixvQkFBb0IsY0FBYyxnQkFBZ0IsMkJBQTJCLHdCQUF3Qiw4QkFBOEIsR0FBRywyQkFBMkIsMkJBQTJCLDJCQUEyQixvQkFBb0IsK0JBQStCLGdDQUFnQyxzQ0FBc0MsR0FBRyxVQUFVLDRHQUE0RyxLQUFLLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLEtBQUssTUFBTSxVQUFVLFlBQVksYUFBYSxLQUFLLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsVUFBVSxLQUFLLE1BQU0sV0FBVyxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLEtBQUssTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLEtBQUssTUFBTSxVQUFVLFlBQVksV0FBVyxLQUFLLE1BQU0sVUFBVSxVQUFVLFlBQVksS0FBSyxNQUFNLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxLQUFLLE1BQU0sWUFBWSxLQUFLLE1BQU0sVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLEtBQUssTUFBTSxXQUFXLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSx5REFBeUQsa0JBQWtCLGdCQUFnQixpQkFBaUIsa0VBQWtFLG1CQUFtQix3QkFBd0IsRUFBRSw4QkFBOEIsa0JBQWtCLHNCQUFzQix1QkFBdUIsRUFBRSxtQkFBbUIsbUJBQW1CLHFCQUFxQiwyQkFBMkIsa0JBQWtCLHdCQUF3QixFQUFFLG1CQUFtQixtQkFBbUIscUJBQXFCLDJCQUEyQixFQUFFLGlDQUFpQyxvQkFBb0IsbUJBQW1CLHVDQUF1Qyx5QkFBeUIsRUFBRSw4Q0FBOEMsb0JBQW9CLHFCQUFxQixFQUFFLCtDQUErQyxzQkFBc0IsK0JBQStCLHdCQUF3Qix1Q0FBdUMsRUFBRSx1REFBdUQsc0JBQXNCLHlCQUF5QiwwQkFBMEIsMkJBQTJCLEVBQUUseURBQXlELHlCQUF5QiwwQkFBMEIsc0JBQXNCLEVBQUUsd0RBQXdELHNCQUFzQix5QkFBeUIsMEJBQTBCLEVBQUUsOERBQThELDBCQUEwQiw2QkFBNkIsc0JBQXNCLHVCQUF1QixpQ0FBaUMsMkJBQTJCLHdCQUF3Qiw2QkFBNkIsRUFBRSxlQUFlLHdCQUF3QixFQUFFLFlBQVksbUJBQW1CLHFCQUFxQixvQkFBb0IsY0FBYyxnQkFBZ0IsMkJBQTJCLHdCQUF3Qiw4QkFBOEIsRUFBRSw2QkFBNkIsb0JBQW9CLDhCQUE4QixFQUFFLHFCQUFxQjs7QUFFLzNLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ21EQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRkE7O0FBR0E7O0FBRUE7QUFFQSxvTEFDQSxtTkFDQSxvTkFDQSxvTkFDQSx1TkFHQTs7VUFDQSxDQUNBLHVFQUdBOzt3QkFDQTs7ZUFFQTthQUVBO0FBSEE7QUFLQTs4QkFDQTswQ0FFQTs7U0FDQTtBQUVBOzs7OztBQUVBOzsyRUFDQTtvQ0FDQTtnQ0FDQTtvQkFDQTtBQUNBO0FBRUE7O0FBQ0E7O2tCQUVBOzs7bUJBRUE7Z0JBR0E7QUFKQTs7cUVBS0E7NkJBQ0E7QUFDQTtBQUVBOztBQUNBOzsrREFDQTs2QkFDQTtBQUNBO0FBRUE7O0FBQ0E7OytEQUNBOzZCQUNBO0FBQ0E7QUFFQTtBQWpDQTtBQTNCQSxHOzs7Ozs7OztBQzlEQSx5REFBZTtBQUNiSixXQUFTO0FBQ1BLLGtCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzlCLGNBQVFBLE1BQVI7QUFDRSxhQUFLLGFBQUw7QUFDRSxpQkFBTyxLQUFQO0FBQ0YsYUFBSyxNQUFMO0FBQ0UsaUJBQU8sS0FBUDtBQUNGLGFBQUssV0FBTDtBQUNFLGlCQUFPLEtBQVA7QUFDRixhQUFLLFVBQUw7QUFDRSxpQkFBTyxLQUFQO0FBQ0YsYUFBSyxVQUFMO0FBQ0UsaUJBQU8sS0FBUDtBQUNGO0FBQ0UsaUJBQU8sRUFBUDtBQVpKO0FBY0Q7QUFoQk07QUFESSxDQUFmLEU7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw0QkFBNEI7QUFDN0Msb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyw4QkFBOEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsZUFBZTtBQUNmO0FBQ0EseUJBQXlCLDRCQUE0QjtBQUNyRDtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGlCQUFpQjtBQUNqQjtBQUNBLDJCQUEyQix3QkFBd0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDRCQUE0QjtBQUNyQztBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDBCQUEwQjtBQUNuQztBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsYUFBYSxFQUFFO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MseUJBQXlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx5QkFBeUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDRCQUE0QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJqcy9zaG9wLW9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi03ODkzM2E4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci1saXN0LnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAxJVxcXCIsXFxcImxhc3QgMiB2ZXJzaW9uc1xcXCIsXFxcIm5vdCBpZSA8PSA4XFxcIl19fV0sXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XSxcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFtcXFwiaW1wb3J0XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjpmYWxzZX1dXV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLWxpc3QudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi03ODkzM2E4Y1xcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLWxpc3QudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi03ODkzM2E4Y1wiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxccGFnZXNcXFxcb3JkZXItbGlzdC52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyAgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHsgIGNvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTc4OTMzYThjXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtNzg5MzNhOGNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4nICsgJyAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA0NjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05YWMwNmM2MlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXIudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi05YWMwNmM2MlxcXCIsXFxcImhhc1Njb3BlZFxcXCI6ZmFsc2UsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IG51bGxcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxwYWdlc1xcXFxvcmRlci52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkgeyAgcmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHsgIGNvbnNvbGUuZXJyb3IoXCJuYW1lZCBleHBvcnRzIGFyZSBub3Qgc3VwcG9ydGVkIGluICoudnVlIGZpbGVzLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LTlhYzA2YzYyXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtOWFjMDZjNjJcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4nICsgJyAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiAgTW9kaWZpZWQgYnkgRXZhbiBZb3UgQHl5eDk5MDgwM1xuKi9cblxudmFyIGhhc0RvY3VtZW50ID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuXG5pZiAodHlwZW9mIERFQlVHICE9PSAndW5kZWZpbmVkJyAmJiBERUJVRykge1xuICBpZiAoIWhhc0RvY3VtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2dWUtc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnQuICcgK1xuICAgIFwiVXNlIHsgdGFyZ2V0OiAnbm9kZScgfSBpbiB5b3VyIFdlYnBhY2sgY29uZmlnIHRvIGluZGljYXRlIGEgc2VydmVyLXJlbmRlcmluZyBlbnZpcm9ubWVudC5cIlxuICApIH1cbn1cblxudmFyIGxpc3RUb1N0eWxlcyA9IHJlcXVpcmUoJy4vbGlzdFRvU3R5bGVzJylcblxuLypcbnR5cGUgU3R5bGVPYmplY3QgPSB7XG4gIGlkOiBudW1iZXI7XG4gIHBhcnRzOiBBcnJheTxTdHlsZU9iamVjdFBhcnQ+XG59XG5cbnR5cGUgU3R5bGVPYmplY3RQYXJ0ID0ge1xuICBjc3M6IHN0cmluZztcbiAgbWVkaWE6IHN0cmluZztcbiAgc291cmNlTWFwOiA/c3RyaW5nXG59XG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7LypcbiAgW2lkOiBudW1iZXJdOiB7XG4gICAgaWQ6IG51bWJlcixcbiAgICByZWZzOiBudW1iZXIsXG4gICAgcGFydHM6IEFycmF5PChvYmo/OiBTdHlsZU9iamVjdFBhcnQpID0+IHZvaWQ+XG4gIH1cbiovfVxuXG52YXIgaGVhZCA9IGhhc0RvY3VtZW50ICYmIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0pXG52YXIgc2luZ2xldG9uRWxlbWVudCA9IG51bGxcbnZhciBzaW5nbGV0b25Db3VudGVyID0gMFxudmFyIGlzUHJvZHVjdGlvbiA9IGZhbHNlXG52YXIgbm9vcCA9IGZ1bmN0aW9uICgpIHt9XG5cbi8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuLy8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxudmFyIGlzT2xkSUUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvbXNpZSBbNi05XVxcYi8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhcmVudElkLCBsaXN0LCBfaXNQcm9kdWN0aW9uKSB7XG4gIGlzUHJvZHVjdGlvbiA9IF9pc1Byb2R1Y3Rpb25cblxuICB2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBsaXN0KVxuICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuICAgIHZhciBtYXlSZW1vdmUgPSBbXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICAgIGRvbVN0eWxlLnJlZnMtLVxuICAgICAgbWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpXG4gICAgfVxuICAgIGlmIChuZXdMaXN0KSB7XG4gICAgICBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIG5ld0xpc3QpXG4gICAgICBhZGRTdHlsZXNUb0RvbShzdHlsZXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlcyA9IFtdXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV1cbiAgICAgIGlmIChkb21TdHlsZS5yZWZzID09PSAwKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXSgpXG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzIC8qIEFycmF5PFN0eWxlT2JqZWN0PiAqLykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgdmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF1cbiAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgIGRvbVN0eWxlLnJlZnMrK1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKVxuICAgICAgfVxuICAgICAgZm9yICg7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBpZiAoZG9tU3R5bGUucGFydHMubGVuZ3RoID4gaXRlbS5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMubGVuZ3RoID0gaXRlbS5wYXJ0cy5sZW5ndGhcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHBhcnRzID0gW11cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgc3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7IGlkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHMgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKCkge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICBzdHlsZUVsZW1lbnQudHlwZSA9ICd0ZXh0L2NzcydcbiAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpXG4gIHJldHVybiBzdHlsZUVsZW1lbnRcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgdmFyIHVwZGF0ZSwgcmVtb3ZlXG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzdHlsZVtkYXRhLXZ1ZS1zc3ItaWR+PVwiJyArIG9iai5pZCArICdcIl0nKVxuXG4gIGlmIChzdHlsZUVsZW1lbnQpIHtcbiAgICBpZiAoaXNQcm9kdWN0aW9uKSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBhbmQgaW4gcHJvZHVjdGlvbiBtb2RlLlxuICAgICAgLy8gc2ltcGx5IGRvIG5vdGhpbmcuXG4gICAgICByZXR1cm4gbm9vcFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYXMgU1NSIHN0eWxlcyBidXQgaW4gZGV2IG1vZGUuXG4gICAgICAvLyBmb3Igc29tZSByZWFzb24gQ2hyb21lIGNhbid0IGhhbmRsZSBzb3VyY2UgbWFwIGluIHNlcnZlci1yZW5kZXJlZFxuICAgICAgLy8gc3R5bGUgdGFncyAtIHNvdXJjZSBtYXBzIGluIDxzdHlsZT4gb25seSB3b3JrcyBpZiB0aGUgc3R5bGUgdGFnIGlzXG4gICAgICAvLyBjcmVhdGVkIGFuZCBpbnNlcnRlZCBkeW5hbWljYWxseS4gU28gd2UgcmVtb3ZlIHRoZSBzZXJ2ZXIgcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlcyBhbmQgaW5qZWN0IG5ldyBvbmVzLlxuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIGlmIChpc09sZElFKSB7XG4gICAgLy8gdXNlIHNpbmdsZXRvbiBtb2RlIGZvciBJRTkuXG4gICAgdmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKytcbiAgICBzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpXG4gICAgdXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpXG4gICAgcmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICAvLyB1c2UgbXVsdGktc3R5bGUtdGFnIG1vZGUgaW4gYWxsIG90aGVyIGNhc2VzXG4gICAgc3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KClcbiAgICB1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KVxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICB1cGRhdGUob2JqKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG4gICAgICAgICAgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcbiAgICAgICAgICBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKG9iaiA9IG5ld09iailcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlKClcbiAgICB9XG4gIH1cbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRleHRTdG9yZSA9IFtdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcbiAgICB0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnRcbiAgICByZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKVxuICB9XG59KSgpXG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG4gIHZhciBjc3MgPSByZW1vdmUgPyAnJyA6IG9iai5jc3NcblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcylcbiAgfSBlbHNlIHtcbiAgICB2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcylcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzXG4gICAgaWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgaWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGVFbGVtZW50LCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3NcbiAgdmFyIG1lZGlhID0gb2JqLm1lZGlhXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwXG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSlcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXApIHtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5jaHJvbWUuY29tL2RldnRvb2xzL2RvY3MvamF2YXNjcmlwdC1kZWJ1Z2dpbmdcbiAgICAvLyB0aGlzIG1ha2VzIHNvdXJjZSBtYXBzIGluc2lkZSBzdHlsZSB0YWdzIHdvcmsgcHJvcGVybHkgaW4gQ2hyb21lXG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlVVJMPScgKyBzb3VyY2VNYXAuc291cmNlc1swXSArICcgKi8nXG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyAnICovJ1xuICB9XG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSlcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXG4vLyBtb2R1bGUgaWQgPSA0NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIiwiLyogZ2xvYmFscyBfX1ZVRV9TU1JfQ09OVEVYVF9fICovXG5cbi8vIElNUE9SVEFOVDogRG8gTk9UIHVzZSBFUzIwMTUgZmVhdHVyZXMgaW4gdGhpcyBmaWxlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoXG4gIHJhd1NjcmlwdEV4cG9ydHMsXG4gIGNvbXBpbGVkVGVtcGxhdGUsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gICAgb3B0aW9ucy5fY29tcGlsZWQgPSB0cnVlXG4gIH1cblxuICAvLyBmdW5jdGlvbmFsIHRlbXBsYXRlXG4gIGlmIChmdW5jdGlvbmFsVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLmZ1bmN0aW9uYWwgPSB0cnVlXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcblxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciB0ZW1wbGF0ZS1vbmx5IGhvdC1yZWxvYWQgYmVjYXVzZSBpbiB0aGF0IGNhc2UgdGhlIHJlbmRlciBmbiBkb2Vzbid0XG4gICAgICAvLyBnbyB0aHJvdWdoIHRoZSBub3JtYWxpemVyXG4gICAgICBvcHRpb25zLl9pbmplY3RTdHlsZXMgPSBob29rXG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIi8qKlxuICogVHJhbnNsYXRlcyB0aGUgbGlzdCBmb3JtYXQgcHJvZHVjZWQgYnkgY3NzLWxvYWRlciBpbnRvIHNvbWV0aGluZ1xuICogZWFzaWVyIHRvIG1hbmlwdWxhdGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChwYXJlbnRJZCwgbGlzdCkge1xuICB2YXIgc3R5bGVzID0gW11cbiAgdmFyIG5ld1N0eWxlcyA9IHt9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIHZhciBpZCA9IGl0ZW1bMF1cbiAgICB2YXIgY3NzID0gaXRlbVsxXVxuICAgIHZhciBtZWRpYSA9IGl0ZW1bMl1cbiAgICB2YXIgc291cmNlTWFwID0gaXRlbVszXVxuICAgIHZhciBwYXJ0ID0ge1xuICAgICAgaWQ6IHBhcmVudElkICsgJzonICsgaSxcbiAgICAgIGNzczogY3NzLFxuICAgICAgbWVkaWE6IG1lZGlhLFxuICAgICAgc291cmNlTWFwOiBzb3VyY2VNYXBcbiAgICB9XG4gICAgaWYgKCFuZXdTdHlsZXNbaWRdKSB7XG4gICAgICBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0geyBpZDogaWQsIHBhcnRzOiBbcGFydF0gfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpXG4gICAgfVxuICB9XG4gIHJldHVybiBzdHlsZXNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2xpc3RUb1N0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgbyBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW29dPW5bb119fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChvKXtpZihuW29dKXJldHVybiBuW29dLmV4cG9ydHM7dmFyIHI9bltvXT17aTpvLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbb10uY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsdCksci5sPSEwLHIuZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixvKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0Om99KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTMwKX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4sbyxyLGkpe3ZhciBzLGM9ZT1lfHx7fSx1PXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PXUmJlwiZnVuY3Rpb25cIiE9PXV8fChzPWUsYz1lLmRlZmF1bHQpO3ZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIGM/Yy5vcHRpb25zOmM7dCYmKGwucmVuZGVyPXQucmVuZGVyLGwuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGwuX2NvbXBpbGVkPSEwKSxuJiYobC5mdW5jdGlvbmFsPSEwKSxyJiYobC5fc2NvcGVJZD1yKTt2YXIgYTtpZihpPyhhPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxvJiZvLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxsLl9zc3JSZWdpc3Rlcj1hKTpvJiYoYT1vKSxhKXt2YXIgZj1sLmZ1bmN0aW9uYWwsZD1mP2wucmVuZGVyOmwuYmVmb3JlQ3JlYXRlO2Y/KGwuX2luamVjdFN0eWxlcz1hLGwucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGEuY2FsbCh0KSxkKGUsdCl9KTpsLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGEpOlthXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOmMsb3B0aW9uczpsfX19LDIwOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmE9e3Byb3BzOnt1cmw6U3RyaW5nLHJlcGxhY2U6Qm9vbGVhbix0bzpbU3RyaW5nLE9iamVjdF19LG1ldGhvZHM6e3JvdXRlckxpbms6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnRvLHQ9dGhpcy51cmwsbj10aGlzLiRyb3V0ZXIsbz10aGlzLnJlcGxhY2U7Y29uc29sZS5sb2coZSksY29uc29sZS5sb2codCksZSYmbj9uW28/XCJyZXBsYWNlXCI6XCJwdXNoXCJdKGUpOnQmJihvP2xvY2F0aW9uLnJlcGxhY2UodCk6bG9jYXRpb24uaHJlZj10KX19fX0sMzA6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBvPW4oMzEpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG8uYX0pfSwzMTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbyhlKXtuKDMyKX12YXIgcj1uKDMzKSxpPW4oMzQpLHM9bigwKSxjPW8sdT1zKHIuYSxpLmEsITEsYyxcImRhdGEtdi0xNzkwN2RlOFwiLG51bGwpO3QuYT11LmV4cG9ydHN9LDMyOmZ1bmN0aW9uKGUsdCl7fSwzMzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89bigyMCk7dC5hPXtuYW1lOlwid3YtY2VsbFwiLG1peGluczpbby5hXSxwcm9wczp7dGl0bGU6e3R5cGU6W1N0cmluZyxOdW1iZXJdfSx2YWx1ZTp7dHlwZTpbU3RyaW5nLE51bWJlcl19LGlzTGluazpCb29sZWFufSxtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy4kb24oXCJDTElDS19JTl9DRUxMU1dJUEVcIix0aGlzLm9uQ2xpY2spfSxtZXRob2RzOntvbkNsaWNrOmZ1bmN0aW9uKCl7dGhpcy4kZW1pdChcImNsaWNrXCIpLHRoaXMucm91dGVyTGluaygpfX19fSwzNDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudCxuPWUuX3NlbGYuX2N8fHQ7cmV0dXJuIG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxcIixjbGFzczp7XCJ3ZXVpLWNlbGxfYWNjZXNzXCI6ZS5pc0xpbmt9LG9uOntjbGljazplLm9uQ2xpY2t9fSxbbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9oZFwifSxbZS5fdChcImljb25cIildLDIpLGUuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2JkXCJ9LFtlLl90KFwiYmRcIixbbihcInBcIix7ZG9tUHJvcHM6e2lubmVySFRNTDplLl9zKGUudGl0bGUpfX0pXSldLDIpLGUuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxfX2Z0XCJ9LFtlLl90KFwiZnRcIixbZS5fdihlLl9zKGUudmFsdWUpKV0pXSwyKV0pfSxyPVtdLGk9e3JlbmRlcjpvLHN0YXRpY1JlbmRlckZuczpyfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvY2VsbC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MTE5KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBzLHU9ZT1lfHx7fSxjPXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PWMmJlwiZnVuY3Rpb25cIiE9PWN8fChzPWUsdT1lLmRlZmF1bHQpO3ZhciBmPVwiZnVuY3Rpb25cIj09dHlwZW9mIHU/dS5vcHRpb25zOnU7dCYmKGYucmVuZGVyPXQucmVuZGVyLGYuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGYuX2NvbXBpbGVkPSEwKSxuJiYoZi5mdW5jdGlvbmFsPSEwKSxvJiYoZi5fc2NvcGVJZD1vKTt2YXIgYTtpZihpPyhhPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxmLl9zc3JSZWdpc3Rlcj1hKTpyJiYoYT1yKSxhKXt2YXIgbD1mLmZ1bmN0aW9uYWwsZD1sP2YucmVuZGVyOmYuYmVmb3JlQ3JlYXRlO2w/KGYuX2luamVjdFN0eWxlcz1hLGYucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGEuY2FsbCh0KSxkKGUsdCl9KTpmLmJlZm9yZUNyZWF0ZT1kP1tdLmNvbmNhdChkLGEpOlthXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOnUsb3B0aW9uczpmfX19LDExOTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigxMjApO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSwxMjA6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7bigxMjEpfXZhciBvPW4oMTIyKSxpPW4oMTIzKSxzPW4oMCksdT1yLGM9cyhvLmEsaS5hLCExLHUsXCJkYXRhLXYtZjA5MzMwMGNcIixudWxsKTt0LmE9Yy5leHBvcnRzfSwxMjE6ZnVuY3Rpb24oZSx0KXt9LDEyMjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3YtZ3JvdXBcIixwcm9wczp7dGl0bGU6U3RyaW5nLHRpdGxlQ29sb3I6U3RyaW5nfX19LDEyMzpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudCxuPWUuX3NlbGYuX2N8fHQ7cmV0dXJuIG4oXCJkaXZcIixbZS50aXRsZT9uKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsc19fdGl0bGVcIixzdHlsZTp7Y29sb3I6ZS50aXRsZUNvbG9yfSxkb21Qcm9wczp7aW5uZXJIVE1MOmUuX3MoZS50aXRsZSl9fSk6ZS5fZSgpLGUuX3YoXCIgXCIpLG4oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxzXCJ9LFtlLl90KFwiZGVmYXVsdFwiKV0sMildKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2dyb3VwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0ODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIGkgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtpXT1uW2ldfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoaSl7aWYobltpXSlyZXR1cm4gbltpXS5leHBvcnRzO3ZhciBvPW5baV09e2k6aSxsOiExLGV4cG9ydHM6e319O3JldHVybiBlW2ldLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4saSl7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDppfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0xMTQpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixpLG8scil7dmFyIHMsYT1lPWV8fHt9LHU9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09dSYmXCJmdW5jdGlvblwiIT09dXx8KHM9ZSxhPWUuZGVmYXVsdCk7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgYT9hLm9wdGlvbnM6YTt0JiYoYy5yZW5kZXI9dC5yZW5kZXIsYy5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMsYy5fY29tcGlsZWQ9ITApLG4mJihjLmZ1bmN0aW9uYWw9ITApLG8mJihjLl9zY29wZUlkPW8pO3ZhciBkO2lmKHI/KGQ9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLGkmJmkuY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQocil9LGMuX3NzclJlZ2lzdGVyPWQpOmkmJihkPWkpLGQpe3ZhciBsPWMuZnVuY3Rpb25hbCxmPWw/Yy5yZW5kZXI6Yy5iZWZvcmVDcmVhdGU7bD8oYy5faW5qZWN0U3R5bGVzPWQsYy5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZC5jYWxsKHQpLGYoZSx0KX0pOmMuYmVmb3JlQ3JlYXRlPWY/W10uY29uY2F0KGYsZCk6W2RdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6YSxvcHRpb25zOmN9fX0sMTE0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgaT1uKDExNSk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gaS5hfSl9LDExNTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaShlKXtuKDExNil9dmFyIG89bigxMTcpLHI9bigxMTgpLHM9bigwKSxhPWksdT1zKG8uYSxyLmEsITEsYSxcImRhdGEtdi05MGJjNGMyMFwiLG51bGwpO3QuYT11LmV4cG9ydHN9LDExNjpmdW5jdGlvbihlLHQpe30sMTE3OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmE9e25hbWU6XCJ3di1idXR0b25cIixwcm9wczp7dHlwZTp7dHlwZTpTdHJpbmcsZGVmYXVsdDpcImRlZmF1bHRcIn0saXNMb2FkaW5nOkJvb2xlYW4sZGlzYWJsZWQ6Qm9vbGVhbixtaW5pOkJvb2xlYW4scGxhaW46Qm9vbGVhbn0sbWV0aG9kczp7aGFuZGxlQ2xpY2s6ZnVuY3Rpb24oZSl7dGhpcy4kZW1pdChcImNsaWNrXCIsZSl9fSxjb21wdXRlZDp7Y2xhc3NPYmplY3Q6ZnVuY3Rpb24oKXt2YXIgZT17fSx0PXRoaXMucGxhaW4/XCJ3ZXVpLWJ0bl9wbGFpbi1cIit0aGlzLnR5cGU6XCJ3ZXVpLWJ0bl9cIit0aGlzLnR5cGUsbj10aGlzLnBsYWluP1wid2V1aS1idG5fcGxhaW4tZGlzYWJsZWRcIjpcIndldWktYnRuX2Rpc2FibGVkXCI7cmV0dXJuIGVbdF09ITAsZVtuXT10aGlzLmRpc2FibGVkLGVbXCJ3ZXVpLWJ0bl9sb2FkaW5nXCJdPXRoaXMuaXNMb2FkaW5nLGVbXCJ3ZXVpLWJ0bl9taW5pXCJdPXRoaXMubWluaSxlfX19fSwxMTg6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciBpPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiYnV0dG9uXCIse3N0YXRpY0NsYXNzOlwid2V1aS1idG5cIixjbGFzczplLmNsYXNzT2JqZWN0LGF0dHJzOntkaXNhYmxlZDplLmRpc2FibGVkfSxvbjp7Y2xpY2s6ZS5oYW5kbGVDbGlja319LFtlLmlzTG9hZGluZz9uKFwiaVwiLHtzdGF0aWNDbGFzczpcIndldWktbG9hZGluZ1wifSk6ZS5fZSgpLGUuX3YoXCIgXCIpLGUuX3QoXCJkZWZhdWx0XCIpXSwyKX0sbz1bXSxyPXtyZW5kZXI6aSxzdGF0aWNSZW5kZXJGbnM6b307dC5hPXJ9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2J1dHRvbi9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDYiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI2MSl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihjLnJlbmRlcj10LnJlbmRlcixjLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxjLl9jb21waWxlZD0hMCksbiYmKGMuZnVuY3Rpb25hbD0hMCksbyYmKGMuX3Njb3BlSWQ9byk7dmFyIGE7aWYoaT8oYT1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYy5fc3NyUmVnaXN0ZXI9YSk6ciYmKGE9ciksYSl7dmFyIGQ9Yy5mdW5jdGlvbmFsLGw9ZD9jLnJlbmRlcjpjLmJlZm9yZUNyZWF0ZTtkPyhjLl9pbmplY3RTdHlsZXM9YSxjLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksbChlLHQpfSk6Yy5iZWZvcmVDcmVhdGU9bD9bXS5jb25jYXQobCxhKTpbYV19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6Y319fSwyNjE6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjYyKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMjYyOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMjYzKX12YXIgbz1uKDI2NCksaT1uKDI2NSkscz1uKDApLHU9cixmPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LTRkNmVjY2Y3XCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMjYzOmZ1bmN0aW9uKGUsdCl7fSwyNjQ6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LWZsZXgtaXRlbVwiLHByb3BzOntmbGV4Ont0eXBlOltOdW1iZXIsU3RyaW5nXSxkZWZhdWx0OjF9fSxjb21wdXRlZDp7Z3V0dGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJHBhcmVudC5ndXR0ZXJ9LHN0eWxlOmZ1bmN0aW9uKCl7dmFyIGU9e307cmV0dXJuIHRoaXMuZ3V0dGVyJiYoZS5wYWRkaW5nTGVmdD10aGlzLmd1dHRlci8yK1wicHhcIixlLnBhZGRpbmdSaWdodD1lLnBhZGRpbmdMZWZ0KSxlLmZsZXg9dGhpcy5mbGV4LGV9fX19LDI2NTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWZsZXhfX2l0ZW1cIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0ODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgNSIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MjU2KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBzLHU9ZT1lfHx7fSxmPXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PWYmJlwiZnVuY3Rpb25cIiE9PWZ8fChzPWUsdT1lLmRlZmF1bHQpO3ZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIHU/dS5vcHRpb25zOnU7dCYmKGEucmVuZGVyPXQucmVuZGVyLGEuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGEuX2NvbXBpbGVkPSEwKSxuJiYoYS5mdW5jdGlvbmFsPSEwKSxvJiYoYS5fc2NvcGVJZD1vKTt2YXIgYztpZihpPyhjPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxhLl9zc3JSZWdpc3Rlcj1jKTpyJiYoYz1yKSxjKXt2YXIgZD1hLmZ1bmN0aW9uYWwsbD1kP2EucmVuZGVyOmEuYmVmb3JlQ3JlYXRlO2Q/KGEuX2luamVjdFN0eWxlcz1jLGEucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGMuY2FsbCh0KSxsKGUsdCl9KTphLmJlZm9yZUNyZWF0ZT1sP1tdLmNvbmNhdChsLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOnUsb3B0aW9uczphfX19LDI1NjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyNTcpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSwyNTc6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7bigyNTgpfXZhciBvPW4oMjU5KSxpPW4oMjYwKSxzPW4oMCksdT1yLGY9cyhvLmEsaS5hLCExLHUsXCJkYXRhLXYtNmZkNmE3NmNcIixudWxsKTt0LmE9Zi5leHBvcnRzfSwyNTg6ZnVuY3Rpb24oZSx0KXt9LDI1OTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3YtZmxleFwiLHByb3BzOntndXR0ZXI6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH19LGNvbXB1dGVkOntzdHlsZTpmdW5jdGlvbigpe3ZhciBlPXt9O2lmKHRoaXMuZ3V0dGVyKXt2YXIgdD1cIi1cIit0aGlzLmd1dHRlci8yK1wicHhcIjtlLm1hcmdpbkxlZnQ9dCxlLm1hcmdpblJpZ2h0PXR9cmV0dXJuIGV9fX19LDI2MDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWZsZXhcIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCJleHBvcnQgZGVmYXVsdCB7XHJcbiAgZmlsdGVyczoge1xyXG4gICAgcHJpY2VGaWx0ZXI6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgcmV0dXJuICfvv6UnICsgTnVtYmVyKHZhbCkudG9GaXhlZCgyKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3ByaWNlX2ZpbHRlci5qcyIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MTU5KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBzLGE9ZT1lfHx7fSxjPXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PWMmJlwiZnVuY3Rpb25cIiE9PWN8fChzPWUsYT1lLmRlZmF1bHQpO3ZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YS5vcHRpb25zOmE7dCYmKHUucmVuZGVyPXQucmVuZGVyLHUuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLHUuX2NvbXBpbGVkPSEwKSxuJiYodS5mdW5jdGlvbmFsPSEwKSxvJiYodS5fc2NvcGVJZD1vKTt2YXIgZDtpZihpPyhkPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSx1Ll9zc3JSZWdpc3Rlcj1kKTpyJiYoZD1yKSxkKXt2YXIgZj11LmZ1bmN0aW9uYWwsbD1mP3UucmVuZGVyOnUuYmVmb3JlQ3JlYXRlO2Y/KHUuX2luamVjdFN0eWxlcz1kLHUucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGQuY2FsbCh0KSxsKGUsdCl9KTp1LmJlZm9yZUNyZWF0ZT1sP1tdLmNvbmNhdChsLGQpOltkXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOmEsb3B0aW9uczp1fX19LDE1OTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigxNjApO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSwxNjA6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7bigxNjEpfXZhciBvPW4oMTYyKSxpPW4oMTYzKSxzPW4oMCksYT1yLGM9cyhvLmEsaS5hLCExLGEsXCJkYXRhLXYtMzZjZmJhNTVcIixudWxsKTt0LmE9Yy5leHBvcnRzfSwxNjE6ZnVuY3Rpb24oZSx0KXt9LDE2MjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3YtbmF2YmFyLWl0ZW1cIixwcm9wczp7aWQ6U3RyaW5nLGRpc2FibGVkOkJvb2xlYW59LGNvbXB1dGVkOntpc1NlbGVjdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaWQ9PT10aGlzLiRwYXJlbnQudmFsdWV9LHN0eWxlOmZ1bmN0aW9uKCl7cmV0dXJue2JvcmRlcldpZHRoOnRoaXMuJHBhcmVudC5saW5lV2lkdGgrXCJweFwiLGJvcmRlckNvbG9yOnRoaXMuJHBhcmVudC5hY3RpdmVDb2xvcixjb2xvcjp0aGlzLmlzU2VsZWN0ZWQ/dGhpcy4kcGFyZW50LmFjdGl2ZUNvbG9yOnRoaXMuJHBhcmVudC5jb2xvcn19fSxtZXRob2RzOntvbkNsaWNrOmZ1bmN0aW9uKCl7dGhpcy5kaXNhYmxlZHx8dGhpcy4kcGFyZW50LiRlbWl0KFwiaW5wdXRcIix0aGlzLmlkKX19fX0sMTYzOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50O3JldHVybihlLl9zZWxmLl9jfHx0KShcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LW5hdmJhcl9faXRlbVwiLGNsYXNzOntcInd2LW5hdmJhcl9faXRlbV9vblwiOiFlLiRwYXJlbnQuYW5pbWF0ZSYmZS4kcGFyZW50LnZhbHVlPT09ZS5pZCxkaXNhYmxlZDplLmRpc2FibGVkfSxzdHlsZTplLnN0eWxlLG9uOntjbGljazplLm9uQ2xpY2t9fSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvbmF2YmFyLWl0ZW0vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTE1NCl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgdSxhPWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwodT1lLGE9ZS5kZWZhdWx0KTt2YXIgcz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2Eub3B0aW9uczphO3QmJihzLnJlbmRlcj10LnJlbmRlcixzLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxzLl9jb21waWxlZD0hMCksbiYmKHMuZnVuY3Rpb25hbD0hMCksbyYmKHMuX3Njb3BlSWQ9byk7dmFyIGM7aWYoaT8oYz1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0scy5fc3NyUmVnaXN0ZXI9Yyk6ciYmKGM9ciksYyl7dmFyIGQ9cy5mdW5jdGlvbmFsLGw9ZD9zLnJlbmRlcjpzLmJlZm9yZUNyZWF0ZTtkPyhzLl9pbmplY3RTdHlsZXM9YyxzLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBjLmNhbGwodCksbChlLHQpfSk6cy5iZWZvcmVDcmVhdGU9bD9bXS5jb25jYXQobCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnUsZXhwb3J0czphLG9wdGlvbnM6c319fSwxNTQ6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMTU1KTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMTU1OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMTU2KX12YXIgbz1uKDE1NyksaT1uKDE1OCksdT1uKDApLGE9cixmPXUoby5hLGkuYSwhMSxhLFwiZGF0YS12LTc5ZjYzZmIzXCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMTU2OmZ1bmN0aW9uKGUsdCl7fSwxNTc6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LW5hdmJhclwiLHByb3BzOntmaXhlZDpCb29sZWFuLGNvbG9yOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiIzMzM1wifSxiYWNrZ3JvdW5kQ29sb3I6e3R5cGU6U3RyaW5nLGRlZmF1bHQ6XCIjZmZmXCJ9LGFjdGl2ZUNvbG9yOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiIzIxOTZmM1wifSxkaXNhYmxlZENvbG9yOnt0eXBlOlN0cmluZyxkZWZhdWx0OlwiI2NmY2ZjZlwifSxsaW5lV2lkdGg6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6Mn0sYW5pbWF0ZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHZhbHVlOnt9fSxkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue2NoaWxkcmVuQ291bnQ6MCxjdXJyZW50SW5kZXg6MH19LGNvbXB1dGVkOntzdHlsZTpmdW5jdGlvbigpe3ZhciBlPXtwb3NpdGlvbjp0aGlzLmZpeGVkP1wiZml4ZWRcIjpcImFic29sdXRlXCIsYmFja2dyb3VuZENvbG9yOnRoaXMuYmFja2dyb3VuZENvbG9yfTtyZXR1cm4gdGhpcy5maXhlZCYmKGUudG9wPTAsZS5sZWZ0PTAsZS5yaWdodD0wKSxlfSxsaW5lU3R5bGU6ZnVuY3Rpb24oKXt2YXIgZT0xL3RoaXMuY2hpbGRyZW5Db3VudCoxMDA7cmV0dXJue2JhY2tncm91bmRDb2xvcjp0aGlzLmFjdGl2ZUNvbG9yLGxlZnQ6ZSp0aGlzLmN1cnJlbnRJbmRleCtcIiVcIix3aWR0aDplK1wiJVwiLGhlaWdodDp0aGlzLmxpbmVXaWR0aCtcInB4XCJ9fX0sbW91bnRlZDpmdW5jdGlvbigpe3ZhciBlPXRoaXM7dGhpcy4kbmV4dFRpY2soZnVuY3Rpb24oKXtlLmNoaWxkcmVuQ291bnQ9ZS4kY2hpbGRyZW4ubGVuZ3RoLGUudXBkYXRlQ3VycmVudEluZGV4KCl9KX0sbWV0aG9kczp7dXBkYXRlQ3VycmVudEluZGV4OmZ1bmN0aW9uKCl7dmFyIGU9dGhpczt0aGlzLiRjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKHQsbil7dC5pZD09PWUudmFsdWUmJihlLmN1cnJlbnRJbmRleD1uKX0pfX0sd2F0Y2g6e3ZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuJGVtaXQoXCJjaGFuZ2VcIixlKSx0aGlzLnVwZGF0ZUN1cnJlbnRJbmRleCgpfX19fSwxNTg6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3ZhciByPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQsbj1lLl9zZWxmLl9jfHx0O3JldHVybiBuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3YtbmF2YmFyXCIsc3R5bGU6ZS5zdHlsZX0sW2UuX3QoXCJkZWZhdWx0XCIpLGUuX3YoXCIgXCIpLGUuYW5pbWF0ZT9uKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3YtbmF2YmFyLXVuZGVybGluZVwiLHN0eWxlOmUubGluZVN0eWxlfSk6ZS5fZSgpXSwyKX0sbz1bXSxpPXtyZW5kZXI6cixzdGF0aWNSZW5kZXJGbnM6b307dC5hPWl9fSl9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL25hdmJhci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi03ODkzM2E4Y1xcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9vcmRlci1saXN0LnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMjIyNDU5ZDVcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzg5MzNhOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXItbGlzdC52dWVcIiwgZnVuY3Rpb24oKSB7XG4gICAgIHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNzg5MzNhOGNcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXItbGlzdC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtNzg5MzNhOGNcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlXG4vLyBtb2R1bGUgaWQgPSA1MTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5vcmRlci1saXN0W2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgcGFkZGluZy10b3A6IDY1cHg7XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IC4yZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcXG59XFxuLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmhkW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5oZCAub3JkZXItbnVtYmVyW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XFxuICAgICAgICBmb250LXNpemU6IDEzcHg7XFxuICAgICAgICBjb2xvcjogIzY2NjtcXG59XFxuLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmhkIC5idG4tZGVsZXRlW2RhdGEtdi03ODkzM2E4Y10ge1xcbiAgICAgICAgZmxvYXQ6IHJpZ2h0O1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgY29sb3I6ICM3Nzc7XFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZFtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCAucHJvZHVjdFtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgcGFkZGluZzogLjJlbTtcXG59XFxuLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmJkIC5wcm9kdWN0IC50aHVtYm5haWxbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgICAgICAgIHdpZHRoOiA2MHB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDYwcHg7XFxufVxcbi5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCAucHJvZHVjdCAubmFtZVtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxuICAgICAgICAgIGNvbG9yOiAjNTU1O1xcbn1cXG4ub3JkZXItbGlzdCAub3JkZXItaXRlbSAuZnRbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgICAgcGFkZGluZzogMTBweDtcXG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuLmVtcHR5LW1zZ1tkYXRhLXYtNzg5MzNhOGNdIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDgwdmg7XFxuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xcbiAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiAjNzc3O1xcbn1cXG4uZW1wdHktbXNnIC5pY29uZm9udFtkYXRhLXYtNzg5MzNhOGNdIHtcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcbn1cXG4uZW1wdHktbXNnIC5tc2dbZGF0YS12LTc4OTMzYThjXSB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L0NvZGUvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLWxpc3QudnVlXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCI7QUFBQTtFQUNFLGtCQUFrQjtDQUFFO0FBQ3BCO0lBQ0UsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osY0FBYztJQUNkLHVCQUF1QjtJQUN2QixtQkFBbUI7Q0FBRTtBQUNyQjtNQUNFLGVBQWU7TUFDZixpQkFBaUI7Q0FBRTtBQUNuQjtRQUNFLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsWUFBWTtDQUFFO0FBQ2hCO1FBQ0UsYUFBYTtRQUNiLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osbUJBQW1CO0NBQUU7QUFDekI7TUFDRSxlQUFlO01BQ2YsaUJBQWlCO01BQ2pCLDBCQUEwQjtDQUFFO0FBQzVCO1FBQ0UscUJBQWM7UUFBZCxxQkFBYztRQUFkLGNBQWM7UUFDZCxjQUFjO0NBQUU7QUFDaEI7VUFDRSxZQUFZO1VBQ1osYUFBYTtDQUFFO0FBQ2pCO1VBQ0Usa0JBQWtCO1VBQ2xCLFlBQVk7Q0FBRTtBQUNwQjtNQUNFLGNBQWM7TUFDZCxrQkFBa0I7Q0FBRTtBQUUxQjtFQUNFLHFCQUFjO0VBQWQscUJBQWM7RUFBZCxjQUFjO0VBQ2QsWUFBWTtFQUNaLGFBQWE7RUFDYiw2QkFBdUI7RUFBdkIsOEJBQXVCO01BQXZCLDJCQUF1QjtVQUF2Qix1QkFBdUI7RUFDdkIseUJBQXdCO01BQXhCLHNCQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIsMEJBQW9CO01BQXBCLHVCQUFvQjtVQUFwQixvQkFBb0I7RUFDcEIsWUFBWTtDQUFFO0FBQ2Q7SUFDRSxnQkFBZ0I7Q0FBRTtBQUNwQjtJQUNFLGdCQUFnQjtDQUFFXCIsXCJmaWxlXCI6XCJvcmRlci1saXN0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIub3JkZXItbGlzdCB7XFxuICBwYWRkaW5nLXRvcDogNjVweDsgfVxcbiAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IC4yZW07XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIG1hcmdpbi1ib3R0b206IDFlbTsgfVxcbiAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuaGQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gICAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuaGQgLm9yZGVyLW51bWJlciB7XFxuICAgICAgICBmbG9hdDogbGVmdDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgICAgIGNvbG9yOiAjNjY2OyB9XFxuICAgICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmhkIC5idG4tZGVsZXRlIHtcXG4gICAgICAgIGZsb2F0OiByaWdodDtcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICAgIGNvbG9yOiAjNzc3O1xcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMHB4OyB9XFxuICAgIC5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1OyB9XFxuICAgICAgLm9yZGVyLWxpc3QgLm9yZGVyLWl0ZW0gLmJkIC5wcm9kdWN0IHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBwYWRkaW5nOiAuMmVtOyB9XFxuICAgICAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuYmQgLnByb2R1Y3QgLnRodW1ibmFpbCB7XFxuICAgICAgICAgIHdpZHRoOiA2MHB4O1xcbiAgICAgICAgICBoZWlnaHQ6IDYwcHg7IH1cXG4gICAgICAgIC5vcmRlci1saXN0IC5vcmRlci1pdGVtIC5iZCAucHJvZHVjdCAubmFtZSB7XFxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbiAgICAgICAgICBjb2xvcjogIzU1NTsgfVxcbiAgICAub3JkZXItbGlzdCAub3JkZXItaXRlbSAuZnQge1xcbiAgICAgIHBhZGRpbmc6IDEwcHg7XFxuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH1cXG5cXG4uZW1wdHktbXNnIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogODB2aDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogIzc3NzsgfVxcbiAgLmVtcHR5LW1zZyAuaWNvbmZvbnQge1xcbiAgICBmb250LXNpemU6IDgwcHg7IH1cXG4gIC5lbXB0eS1tc2cgLm1zZyB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi03ODkzM2E4Y1wiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWVcbi8vIG1vZHVsZSBpZCA9IDUxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDx3di1uYXZiYXIgdi1tb2RlbD1cInN0YXR1c1wiIEBjaGFuZ2U9XCJ0YWJDaGFuZ2VcIiBhY3RpdmUtY29sb3I9XCJyZWRcIiBmaXhlZCBjbGFzcz1cInRhYlwiPlxyXG4gICAgICA8d3YtbmF2YmFyLWl0ZW0gaWQ9XCJhbGxcIj7lhajpg6g8L3d2LW5hdmJhci1pdGVtPlxyXG4gICAgICA8d3YtbmF2YmFyLWl0ZW0gaWQ9XCJuZWVkX3RvX3BheVwiPuW+heS7mOasvjwvd3YtbmF2YmFyLWl0ZW0+XHJcbiAgICAgIDx3di1uYXZiYXItaXRlbSBpZD1cImRlbGl2ZXJlZFwiPuW+heaUtui0pzwvd3YtbmF2YmFyLWl0ZW0+XHJcbiAgICAgIDx3di1uYXZiYXItaXRlbSBpZD1cImZpbmlzaGVkXCI+5bey5a6M5oiQPC93di1uYXZiYXItaXRlbT5cclxuICAgICAgPHd2LW5hdmJhci1pdGVtIGlkPVwiY2FuY2VsZWRcIj7lt7Llj5bmtog8L3d2LW5hdmJhci1pdGVtPlxyXG4gICAgPC93di1uYXZiYXI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm9yZGVyLWxpc3RcIiB2LWlmPVwib3JkZXJzLmRhdGEgJiYgb3JkZXJzLmRhdGEubGVuZ3RoPjBcIj5cclxuICAgICAgPHJvdXRlci1saW5rIDp0bz1cIicvb3JkZXIvJyArIG9yZGVyLm51bWJlclwiIGNsYXNzPVwib3JkZXItaXRlbVwiIHYtZm9yPVwib3JkZXIgaW4gb3JkZXJzLmRhdGFcIiA6a2V5PVwib3JkZXIuaWRcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGRcIj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwib3JkZXItbnVtYmVyXCI+e3sgb3JkZXIubnVtYmVyIH19PC9zcGFuPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1kZWxldGVcIiB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnY2FuY2VsZWQnIHx8IG9yZGVyLnN0YXR1cyA9PT0gJ2NhbmNlbGVkJ1wiXHJcbiAgICAgICAgICAgICAgIEBjbGljay5wcmV2ZW50LnN0b3A9XCJkZXN0cm95T3JkZXIob3JkZXIuaWQpXCI+PGkgY2xhc3M9XCJpY29uZm9udCBpY29uLWRlbGV0ZVwiPjwvaT48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0XCIgdi1mb3I9XCJvcmRlckl0ZW0gaW4gb3JkZXIub3JkZXJfaXRlbXNcIiA6a2V5PVwib3JkZXJJdGVtLnByb2R1Y3QuaWRcIj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInRodW1ibmFpbFwiIDpzcmM9XCJvcmRlckl0ZW0ucHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIi8+XHJcbiAgICAgICAgICAgIDxoNCBjbGFzcz1cIm5hbWVcIiB2LWh0bWw9XCJvcmRlckl0ZW0ucHJvZHVjdC5uYW1lXCI+PC9oND5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmdFwiPlxyXG4gICAgICAgICAgPHd2LWJ1dHRvbiB0eXBlPVwicHJpbWFyeVwiIG1pbmkgcGxhaW4gdi1pZj1cIm9yZGVyLnN0YXR1cyA9PT0gJ25lZWRfdG9fcGF5J1wiXHJcbiAgICAgICAgICAgICAgICAgICAgIEBjbGljay5wcmV2ZW50LnN0b3A9XCIkcm91dGVyLnB1c2goJy9wYXltZW50LycgKyBvcmRlci5udW1iZXIpXCI+5pSv5LuYXHJcbiAgICAgICAgICA8L3d2LWJ1dHRvbj5cclxuICAgICAgICAgIDx3di1idXR0b24gdHlwZT1cInByaW1hcnlcIiBtaW5pIHBsYWluIEBjbGljay5wcmV2ZW50LnN0b3A9XCIkcm91dGVyLnB1c2goJ3BheW1lbnQvJyArIG9yZGVyLm51bWJlcilcIj5cclxuICAgICAgICAgICAg5YaN5qyh6LSt5LmwXHJcbiAgICAgICAgICA8L3d2LWJ1dHRvbj5cclxuICAgICAgICAgIDx3di1idXR0b24gdHlwZT1cImRlZmF1bHRcIiBtaW5pIHBsYWluIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICduZWVkX3RvX3BheSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICBAY2xpY2sucHJldmVudC5zdG9wPVwiY2FuY2VsT3JkZXIob3JkZXIuaWQpXCI+5Y+W5raIXHJcbiAgICAgICAgICA8L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJlbXB0eS1tc2dcIiB2LWVsc2UtaWY9XCIhaXNMb2FkaW5nICYmIG9yZGVycy5kYXRhICYmIG9yZGVycy5kYXRhLmxlbmd0aCA9PT0gMFwiPlxyXG4gICAgICA8aSBjbGFzcz1cImljb25mb250IGljb24tb3JkZXJcIj48L2k+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtc2dcIj7msqHmnInnm7jlhbPorqLljZXorrDlvZU8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBOYXZiYXIsIE5hdmJhckl0ZW0sIEJ1dHRvbiB9IGZyb20gJ3dlLXZ1ZSdcclxuICBpbXBvcnQgeyBtYXBTdGF0ZSB9IGZyb20gJ3Z1ZXgnXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgW05hdmJhci5uYW1lXTogTmF2YmFyLFxyXG4gICAgICBbTmF2YmFySXRlbS5uYW1lXTogTmF2YmFySXRlbSxcclxuICAgICAgW0J1dHRvbi5uYW1lXTogQnV0dG9uXHJcbiAgICB9LFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN0YXR1czogJ2FsbCcsXHJcbiAgICAgICAgb3JkZXJzOiBbXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgICBpc0xvYWRpbmc6IHN0YXRlID0+IHN0YXRlLmlzTG9hZGluZ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5nZXRPcmRlcnMoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldE9yZGVycyAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ29yZGVyJywge1xyXG4gICAgICAgICAgcGFyYW1zOiB7c3RhdHVzOiB0aGlzLnN0YXR1c31cclxuICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vcmRlcnMgPSByZXNwb25zZS5kYXRhLm9yZGVyc1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHRhYkNoYW5nZSAoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRPcmRlcnMoKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY2FuY2VsT3JkZXIgKG9yZGVySWQpIHtcclxuICAgICAgICB0aGlzLiRyb290LmNvbmZpcm0oJ+aTjeS9nOehruiupCcsICfnoa7lrpropoHlj5bmtojorqLljZXvvJ8nKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuYXhpb3MucG9zdChgb3JkZXIvJHtvcmRlcklkfS9jYW5jZWxgKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+WPlua2iOaIkOWKnycpXHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBkZXN0cm95T3JkZXIgKG9yZGVySWQpIHtcclxuICAgICAgICB0aGlzLiRyb290LmNvbmZpcm0oJ+aTjeS9nOehruiupCcsICfnoa7lrpropoHliKDpmaTorqLljZXvvJ8nKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuYXhpb3MuZGVsZXRlKGBvcmRlci8ke29yZGVySWR9L2Rlc3Ryb3lgKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+WIoOmZpOaIkOWKnycpXHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlIHNjb3BlZCBsYW5nPVwic2Nzc1wiPlxyXG4gIC50YWIge1xyXG4gIH1cclxuXHJcbiAgLm9yZGVyLWxpc3Qge1xyXG4gICAgcGFkZGluZy10b3A6IDY1cHg7XHJcblxyXG4gICAgLm9yZGVyLWl0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHBhZGRpbmc6IC4yZW07XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuXHJcbiAgICAgIC5oZCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgICAgICAgLm9yZGVyLW51bWJlciB7XHJcbiAgICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLmJ0bi1kZWxldGUge1xyXG4gICAgICAgICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgY29sb3I6ICM3Nzc7XHJcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAuYmQge1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcclxuXHJcbiAgICAgICAgLnByb2R1Y3Qge1xyXG4gICAgICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgICAgIHBhZGRpbmc6IC4yZW07XHJcblxyXG4gICAgICAgICAgLnRodW1ibmFpbCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA2MHB4O1xyXG4gICAgICAgICAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLm5hbWUge1xyXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICAgICAgICAgICAgY29sb3I6ICM1NTU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAuZnQge1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5lbXB0eS1tc2cge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiA4MHZoO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjNzc3O1xyXG5cclxuICAgIC5pY29uZm9udCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogODBweDtcclxuICAgIH1cclxuXHJcbiAgICAubXNnIHtcclxuICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gIH1cclxuPC9zdHlsZT5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHJlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci1saXN0LnZ1ZT85ODhmNmFkYSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ3di1uYXZiYXJcIixcbiAgICAgICAge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRhYlwiLFxuICAgICAgICAgIGF0dHJzOiB7IFwiYWN0aXZlLWNvbG9yXCI6IFwicmVkXCIsIGZpeGVkOiBcIlwiIH0sXG4gICAgICAgICAgb246IHsgY2hhbmdlOiBfdm0udGFiQ2hhbmdlIH0sXG4gICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgIHZhbHVlOiBfdm0uc3RhdHVzLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uc3RhdHVzID0gJCR2XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzdGF0dXNcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwid3YtbmF2YmFyLWl0ZW1cIiwgeyBhdHRyczogeyBpZDogXCJhbGxcIiB9IH0sIFtfdm0uX3YoXCLlhajpg6hcIildKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtbmF2YmFyLWl0ZW1cIiwgeyBhdHRyczogeyBpZDogXCJuZWVkX3RvX3BheVwiIH0gfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwi5b6F5LuY5qy+XCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LW5hdmJhci1pdGVtXCIsIHsgYXR0cnM6IHsgaWQ6IFwiZGVsaXZlcmVkXCIgfSB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXCLlvoXmlLbotKdcIilcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtbmF2YmFyLWl0ZW1cIiwgeyBhdHRyczogeyBpZDogXCJmaW5pc2hlZFwiIH0gfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwi5bey5a6M5oiQXCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LW5hdmJhci1pdGVtXCIsIHsgYXR0cnM6IHsgaWQ6IFwiY2FuY2VsZWRcIiB9IH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcIuW3suWPlua2iFwiKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLm9yZGVycy5kYXRhICYmIF92bS5vcmRlcnMuZGF0YS5sZW5ndGggPiAwXG4gICAgICAgID8gX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJvcmRlci1saXN0XCIgfSxcbiAgICAgICAgICAgIF92bS5fbChfdm0ub3JkZXJzLmRhdGEsIGZ1bmN0aW9uKG9yZGVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAga2V5OiBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm9yZGVyLWl0ZW1cIixcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRvOiBcIi9vcmRlci9cIiArIG9yZGVyLm51bWJlciB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImhkXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJvcmRlci1udW1iZXJcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhvcmRlci5udW1iZXIpKVxuICAgICAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIuc3RhdHVzID09PSBcImNhbmNlbGVkXCIgfHwgb3JkZXIuc3RhdHVzID09PSBcImNhbmNlbGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuLWRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uZGVzdHJveU9yZGVyKG9yZGVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW19jKFwiaVwiLCB7IHN0YXRpY0NsYXNzOiBcImljb25mb250IGljb24tZGVsZXRlXCIgfSldXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgOiBfdm0uX2UoKVxuICAgICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiYmRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBfdm0uX2wob3JkZXIub3JkZXJfaXRlbXMsIGZ1bmN0aW9uKG9yZGVySXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGtleTogb3JkZXJJdGVtLnByb2R1Y3QuaWQsIHN0YXRpY0NsYXNzOiBcInByb2R1Y3RcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWJuYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBvcmRlckl0ZW0ucHJvZHVjdC50aHVtYm5haWwsIGFsdDogXCJcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImg0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlubmVySFRNTDogX3ZtLl9zKG9yZGVySXRlbS5wcm9kdWN0Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgb3JkZXIuc3RhdHVzID09PSBcIm5lZWRfdG9fcGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ3di1idXR0b25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgbWluaTogXCJcIiwgcGxhaW46IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kcm91dGVyLnB1c2goXCIvcGF5bWVudC9cIiArIG9yZGVyLm51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuaUr+S7mFxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgbWluaTogXCJcIiwgcGxhaW46IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uJHJvdXRlci5wdXNoKFwicGF5bWVudC9cIiArIG9yZGVyLm51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgIOWGjeasoei0reS5sFxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBvcmRlci5zdGF0dXMgPT09IFwibmVlZF90b19wYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwiZGVmYXVsdFwiLCBtaW5pOiBcIlwiLCBwbGFpbjogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmNhbmNlbE9yZGVyKG9yZGVyLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi5Y+W5raIXFxuICAgICAgICBcIildXG4gICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApXG4gICAgICAgIDogIV92bS5pc0xvYWRpbmcgJiYgX3ZtLm9yZGVycy5kYXRhICYmIF92bS5vcmRlcnMuZGF0YS5sZW5ndGggPT09IDBcbiAgICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZW1wdHktbXNnXCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImlcIiwgeyBzdGF0aWNDbGFzczogXCJpY29uZm9udCBpY29uLW9yZGVyXCIgfSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibXNnXCIgfSwgW192bS5fdihcIuayoeacieebuOWFs+iuouWNleiusOW9lVwiKV0pXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi03ODkzM2E4Y1wiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNzg5MzNhOGNcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXItbGlzdC52dWVcbi8vIG1vZHVsZSBpZCA9IDUxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWFjMDZjNjJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMTRlNTlhNDZcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOWFjMDZjNjJcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL29yZGVyLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi05YWMwNmM2MlxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vb3JkZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTlhYzA2YzYyXCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA1MTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5zdGF0dXMtYmFyIHtcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgbGVmdCB0b3AsIGxlZnQgYm90dG9tLCBmcm9tKCNlNjQzNDApLCB0bygjZWM2ZjZkKSk7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjZTY0MzQwIDAlLCAjZWM2ZjZkIDEwMCUpO1xcbiAgcGFkZGluZzogMWVtIDA7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG4uc3RhdHVzLWJhciAuc3RhdHVzLXRleHQge1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMmVtO1xcbn1cXG4uYWRkcmVzcy1pbmZvIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuLnByb2R1Y3QtbGlzdCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0ge1xcbiAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHBhZGRpbmc6IDhweDtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlY2VjZWM7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIHdpZHRoOiA3MHB4O1xcbiAgICAgIGhlaWdodDogNzBweDtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IHtcXG4gICAgICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAgICAgLXdlYmtpdC1ib3gtZGlyZWN0aW9uOiBub3JtYWw7XFxuICAgICAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBwYWRkaW5nOiAwIDE0cHg7XFxuICAgICAgLXdlYmtpdC1ib3gtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAgLW1zLWZsZXgtcGFjazoganVzdGlmeTtcXG4gICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5uYW1lIHtcXG4gICAgICAgIGNvbG9yOiAjNTU1O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLmFtb3VudCB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgICAgIGNvbG9yOiAjODg4O1xcbn1cXG4ucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQgLnByaWNlIHtcXG4gICAgICAgIGNvbG9yOiAjNDQ0O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxufVxcbi5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAuYWRkLXRvLWNhcnQge1xcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgcmlnaHQ6IDEwcHg7XFxuICAgICAgICBib3R0b206IDEwcHg7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBwYWRkaW5nOiAuMmVtIC4zZW07XFxufVxcbi5mZWUtaW5mbyB7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4O1xcbn1cXG5mb290ZXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYm90dG9tOiAwO1xcbiAgei1pbmRleDogMjA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgcGFkZGluZzogLjVyZW0gMXJlbTtcXG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC0gMnJlbSk7XFxufVxcbmZvb3RlciAud2V1aS1mbGV4X19pdGVtIHtcXG4gICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXI7XFxuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9Db2RlL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9vcmRlci52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UscUJBQWM7RUFBZCxxQkFBYztFQUFkLGNBQWM7RUFDZCxZQUFZO0VBQ1osYUFBYTtFQUNiLHdGQUE4RDtFQUE5RCw4REFBOEQ7RUFDOUQsZUFBZTtFQUNmLG9CQUFvQjtDQUFFO0FBQ3RCO0lBQ0UsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixpQkFBaUI7Q0FBRTtBQUV2QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGNBQWM7RUFDZCxvQkFBb0I7Q0FBRTtBQUV4QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0NBQUU7QUFDekI7SUFDRSxxQkFBYztJQUFkLHFCQUFjO0lBQWQsY0FBYztJQUNkLGFBQWE7SUFDYixpQ0FBaUM7SUFDakMsbUJBQW1CO0NBQUU7QUFDckI7TUFDRSxZQUFZO01BQ1osYUFBYTtDQUFFO0FBQ2pCO01BQ0UscUJBQWM7TUFBZCxxQkFBYztNQUFkLGNBQWM7TUFDZCw2QkFBdUI7TUFBdkIsOEJBQXVCO1VBQXZCLDJCQUF1QjtjQUF2Qix1QkFBdUI7TUFDdkIsZ0JBQWdCO01BQ2hCLDBCQUErQjtVQUEvQix1QkFBK0I7Y0FBL0IsK0JBQStCO0NBQUU7QUFDakM7UUFDRSxZQUFZO1FBQ1osZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixpQkFBaUI7Q0FBRTtBQUNyQjtRQUNFLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsWUFBWTtDQUFFO0FBQ2hCO1FBQ0UsWUFBWTtRQUNaLGVBQWU7UUFDZixnQkFBZ0I7Q0FBRTtBQUNwQjtRQUNFLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGFBQWE7UUFDYix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxtQkFBbUI7Q0FBRTtBQUU3QjtFQUNFLG9CQUFvQjtDQUFFO0FBRXhCO0VBQ0UsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsVUFBVTtFQUNWLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsb0JBQW9CO0VBQ3BCLDBCQUEwQjtDQUFFO0FBQzVCO0lBQ0UscUJBQWM7SUFBZCxxQkFBYztJQUFkLGNBQWM7SUFDZCx5QkFBd0I7UUFBeEIsc0JBQXdCO1lBQXhCLHdCQUF3QjtDQUFFXCIsXCJmaWxlXCI6XCJvcmRlci52dWVcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLnN0YXR1cy1iYXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgI2U2NDM0MCAwJSwgI2VjNmY2ZCAxMDAlKTtcXG4gIHBhZGRpbmc6IDFlbSAwO1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDsgfVxcbiAgLnN0YXR1cy1iYXIgLnN0YXR1cy10ZXh0IHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDJlbTsgfVxcblxcbi5hZGRyZXNzLWluZm8ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4OyB9XFxuXFxuLnByb2R1Y3QtbGlzdCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9XFxuICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBwYWRkaW5nOiA4cHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNlY2VjO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgIHdpZHRoOiA3MHB4O1xcbiAgICAgIGhlaWdodDogNzBweDsgfVxcbiAgICAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLml0ZW0tcmlnaHQge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICBwYWRkaW5nOiAwIDE0cHg7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyB9XFxuICAgICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5uYW1lIHtcXG4gICAgICAgIGNvbG9yOiAjNTU1O1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDE1cHg7XFxuICAgICAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAgICAgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5pdGVtLXJpZ2h0IC5hbW91bnQge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBmb250LXNpemU6IDEycHg7XFxuICAgICAgICBjb2xvcjogIzg4ODsgfVxcbiAgICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAucHJpY2Uge1xcbiAgICAgICAgY29sb3I6ICM0NDQ7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDsgfVxcbiAgICAgIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAuaXRlbS1yaWdodCAuYWRkLXRvLWNhcnQge1xcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgcmlnaHQ6IDEwcHg7XFxuICAgICAgICBib3R0b206IDEwcHg7XFxuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcXG4gICAgICAgIG91dGxpbmU6IG5vbmU7XFxuICAgICAgICBwYWRkaW5nOiAuMmVtIC4zZW07IH1cXG5cXG4uZmVlLWluZm8ge1xcbiAgbWFyZ2luLWJvdHRvbTogNzBweDsgfVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAyMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBwYWRkaW5nOiAuNXJlbSAxcmVtO1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSAycmVtKTsgfVxcbiAgZm9vdGVyIC53ZXVpLWZsZXhfX2l0ZW0ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi05YWMwNmM2MlwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL29yZGVyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInN0YXR1cy1iYXJcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJzdGF0dXMtdGV4dFwiPnt7IG9yZGVyLnN0YXR1cyB8IHN0YXR1c0ZpbHRlciB9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJhZGRyZXNzLWluZm9cIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJuYW1lXCIgdi10ZXh0PVwib3JkZXIuY29uc3VtZXJfbmFtZVwiPjwvc3Bhbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJtb2JpbGVcIiB2LXRleHQ9XCJvcmRlci5jb25zdW1lcl9tb2JpbGVcIj48L3NwYW4+XHJcbiAgICAgIDxwIGNsYXNzPVwiYWRkcmVzc1wiIHYtdGV4dD1cIm9yZGVyLmFkZHJlc3NcIj48L3A+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1saXN0XCI+XHJcbiAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3Byb2R1Y3QvJyArIG9yZGVySXRlbS5wcm9kdWN0LmlkXCIgY2xhc3M9XCJwcm9kdWN0LWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgdi1mb3I9XCJvcmRlckl0ZW0gaW4gb3JkZXIub3JkZXJfaXRlbXNcIiA6a2V5PVwib3JkZXJJdGVtLnByb2R1Y3QuaWRcIj5cclxuICAgICAgICA8aW1nIDpzcmM9XCJvcmRlckl0ZW0ucHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIiBjbGFzcz1cInRodW1ibmFpbFwiLz5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcmlnaHRcIj5cclxuICAgICAgICAgIDxoNCBjbGFzcz1cIm5hbWVcIiB2LWh0bWw9XCJvcmRlckl0ZW0ucHJvZHVjdC5uYW1lXCI+PC9oND5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhbW91bnRcIj7mlbDph4/vvJp7eyBvcmRlckl0ZW0uYW1vdW50IH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj57eyBvcmRlckl0ZW0ucHJvZHVjdC5wcmljZSB8IHByaWNlRmlsdGVyIH19PC9kaXY+XHJcblxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFkZC10by1jYXJ0XCIgQGNsaWNrLnByZXZlbnQuc3RvcD1cImFkZFRvQ2FydChvcmRlckl0ZW0ucHJvZHVjdC5pZClcIj7liqDlhaXotK3nianovaY8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9yb3V0ZXItbGluaz5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx3di1ncm91cCBjbGFzcz1cIm9yZGVyLWluZm9cIj5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLorqLljZXlj7dcIiA6dmFsdWU9XCJvcmRlci5udW1iZXJcIj48L3d2LWNlbGw+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi5LiL5Y2V5pe26Ze0XCIgOnZhbHVlPVwib3JkZXIuY3JlYXRlZF9hdFwiPjwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmlK/ku5jml7bpl7RcIiA6dmFsdWU9XCJvcmRlci5jcmVhdGVkX2F0XCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIuaUr+S7mOaWueW8j1wiIDp2YWx1ZT1cIm9yZGVyLmNyZWF0ZWRfYXRcIj48L3d2LWNlbGw+XHJcbiAgICA8L3d2LWdyb3VwPlxyXG5cclxuICAgIDx3di1ncm91cCBjbGFzcz1cImZlZS1pbmZvXCI+XHJcbiAgICAgIDx3di1jZWxsIHRpdGxlPVwi6K6i5Y2V5oC76aKdXCIgOnZhbHVlPVwib3JkZXIudG90YWxfZmVlXCI+PC93di1jZWxsPlxyXG4gICAgICA8d3YtY2VsbCB0aXRsZT1cIui/kOi0uVwiIDp2YWx1ZT1cIm9yZGVyLnRvdGFsX2ZlZVwiPjwvd3YtY2VsbD5cclxuICAgIDwvd3YtZ3JvdXA+XHJcblxyXG4gICAgPGZvb3Rlcj5cclxuICAgICAgPHd2LWZsZXggOmd1dHRlcj1cIjIwXCI+XHJcbiAgICAgICAgPHd2LWZsZXgtaXRlbSB2LWlmPVwib3JkZXIuc3RhdHVzID09PSAnbmVlZF90b19wYXknXCI+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJ3YXJuXCIgbWluaSBAY2xpY2submF0aXZlPVwiY2FuY2VsT3JkZXJcIj7lj5bmtojorqLljZU8L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgICA8d3YtZmxleC1pdGVtIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICdjYW5jZWxlZCcgfHwgb3JkZXIuc3RhdHVzID09PSAnZmluaXNoZWQnXCI+XHJcbiAgICAgICAgICA8d3YtYnV0dG9uIHR5cGU9XCJ3YXJuXCIgbWluaSBAY2xpY2submF0aXZlPVwiZGVsZXRlT3JkZXJcIj7liKDpmaTorqLljZU8L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgICA8d3YtZmxleC1pdGVtIHYtaWY9XCJvcmRlci5zdGF0dXMgPT09ICduZWVkX3RvX3BheSdcIj5cclxuICAgICAgICAgIDx3di1idXR0b24gdHlwZT1cInByaW1hcnlcIiBtaW5pIEBjbGljaz1cIiRyb3V0ZXIucHVzaCgnL3BheW1lbnQvJyArIG9yZGVyLm51bWJlcilcIj7ljrvku5jmrL48L3d2LWJ1dHRvbj5cclxuICAgICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgPC93di1mbGV4PlxyXG4gICAgPC9mb290ZXI+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCB7IEdyb3VwLCBDZWxsLCBGbGV4LCBGbGV4SXRlbSwgQnV0dG9uIH0gZnJvbSAnd2UtdnVlJ1xyXG5cclxuICBpbXBvcnQgcHJpY2VGaWx0ZXIgZnJvbSAnLi4vbWl4aW5zL3ByaWNlX2ZpbHRlcidcclxuICBpbXBvcnQgc3RhdHVzRmlsdGVyIGZyb20gJy4uL21peGlucy9zdGF0dXNfZmlsdGVyJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtHcm91cC5uYW1lXTogR3JvdXAsXHJcbiAgICAgIFtDZWxsLm5hbWVdOiBDZWxsLFxyXG4gICAgICBbQnV0dG9uLm5hbWVdOiBCdXR0b24sXHJcbiAgICAgIFtGbGV4Lm5hbWVdOiBGbGV4LFxyXG4gICAgICBbRmxleEl0ZW0ubmFtZV06IEZsZXhJdGVtXHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluczogW1xyXG4gICAgICBwcmljZUZpbHRlcixcclxuICAgICAgc3RhdHVzRmlsdGVyXHJcbiAgICBdLFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG9yZGVySWQ6IG51bGwsXHJcbiAgICAgICAgb3JkZXI6IHt9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMub3JkZXJOdW1iZXIgPSB0aGlzLiRyb3V0ZS5wYXJhbXMub3JkZXJOdW1iZXJcclxuXHJcbiAgICAgIHRoaXMuZ2V0T3JkZXIoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGdldE9yZGVyICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldChgb3JkZXIvJHt0aGlzLm9yZGVyTnVtYmVyfWApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLm9yZGVyID0gcmVzcG9uc2UuZGF0YS5vcmRlclxyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGFkZFRvQ2FydCAocHJvZHVjdElkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdElkKVxyXG5cclxuICAgICAgICBjb25zdCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgIHByb2R1Y3RJZDogcHJvZHVjdElkLFxyXG4gICAgICAgICAgYW1vdW50OiAxXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ2NhcnQvYWRkJywgcG9zdERhdGEpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+a3u+WKoOaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGNhbmNlbE9yZGVyICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ29yZGVyL2NhbmNlbCcpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+WPlua2iOaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGRlbGV0ZU9yZGVyICgpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLnBvc3QoJ29yZGVyL2NhbmNlbCcpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLiRyb290LnN1Y2Nlc3MoJ+WIoOmZpOaIkOWKnycpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuICAkd2V1aS1yZWQ6ICNlNjQzNDA7XHJcblxyXG4gIC5zdGF0dXMtYmFyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICR3ZXVpLXJlZCAwJSwgbGlnaHRlbigkd2V1aS1yZWQsIDEwJSkgMTAwJSk7XHJcbiAgICBwYWRkaW5nOiAxZW0gMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcblxyXG4gICAgLnN0YXR1cy10ZXh0IHtcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDJlbTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5hZGRyZXNzLWluZm8ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3QtbGlzdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG5cclxuICAgIC5wcm9kdWN0LWl0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWNlY2VjO1xyXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAudGh1bWJuYWlsIHtcclxuICAgICAgICB3aWR0aDogNzBweDtcclxuICAgICAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5pdGVtLXJpZ2h0IHtcclxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICAgICAgcGFkZGluZzogMCAxNHB4O1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuXHJcbiAgICAgICAgLm5hbWUge1xyXG4gICAgICAgICAgY29sb3I6ICM1NTU7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAuYW1vdW50IHtcclxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgICAgICAgY29sb3I6ICM4ODg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucHJpY2Uge1xyXG4gICAgICAgICAgY29sb3I6ICM0NDQ7XHJcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC5hZGQtdG8tY2FydCB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgICByaWdodDogMTBweDtcclxuICAgICAgICAgIGJvdHRvbTogMTBweDtcclxuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgICAgICAgb3V0bGluZTogbm9uZTtcclxuICAgICAgICAgIHBhZGRpbmc6IC4yZW0gLjNlbTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5mZWUtaW5mbyB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA3MHB4O1xyXG4gIH1cclxuXHJcbiAgZm9vdGVyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIHotaW5kZXg6IDIwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IC41cmVtIDFyZW07XHJcbiAgICB3aWR0aDogY2FsYygxMDB2dyAtIDJyZW0pO1xyXG5cclxuICAgIC53ZXVpLWZsZXhfX2l0ZW0ge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlPzdmOWZiMDdhIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGZpbHRlcnM6IHtcclxuICAgIHN0YXR1c0ZpbHRlcjogZnVuY3Rpb24gKHN0YXR1cykge1xyXG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xyXG4gICAgICAgIGNhc2UgJ25lZWRfdG9fcGF5JzpcclxuICAgICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICAgIGNhc2UgJ3BhaWQnOlxyXG4gICAgICAgICAgcmV0dXJuICflvoXmlK/ku5gnXHJcbiAgICAgICAgY2FzZSAnZGVsaXZlcmVkJzpcclxuICAgICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICAgIGNhc2UgJ2ZpbmlzaGVkJzpcclxuICAgICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICAgIGNhc2UgJ2NhbmNlbGVkJzpcclxuICAgICAgICAgIHJldHVybiAn5b6F5pSv5LuYJ1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3N0YXR1c19maWx0ZXIuanMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0dXMtYmFyXCIgfSwgW1xuICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJzdGF0dXMtdGV4dFwiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInN0YXR1c0ZpbHRlclwiKShfdm0ub3JkZXIuc3RhdHVzKSkpXG4gICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImFkZHJlc3MtaW5mb1wiIH0sIFtcbiAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJuYW1lXCIsXG4gICAgICAgICAgZG9tUHJvcHM6IHsgdGV4dENvbnRlbnQ6IF92bS5fcyhfdm0ub3JkZXIuY29uc3VtZXJfbmFtZSkgfVxuICAgICAgICB9KSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJzcGFuXCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJtb2JpbGVcIixcbiAgICAgICAgICBkb21Qcm9wczogeyB0ZXh0Q29udGVudDogX3ZtLl9zKF92bS5vcmRlci5jb25zdW1lcl9tb2JpbGUpIH1cbiAgICAgICAgfSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwicFwiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYWRkcmVzc1wiLFxuICAgICAgICAgIGRvbVByb3BzOiB7IHRleHRDb250ZW50OiBfdm0uX3MoX3ZtLm9yZGVyLmFkZHJlc3MpIH1cbiAgICAgICAgfSlcbiAgICAgIF0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInByb2R1Y3QtbGlzdFwiIH0sXG4gICAgICAgIF92bS5fbChfdm0ub3JkZXIub3JkZXJfaXRlbXMsIGZ1bmN0aW9uKG9yZGVySXRlbSkge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBvcmRlckl0ZW0ucHJvZHVjdC5pZCxcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicHJvZHVjdC1pdGVtXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHRvOiBcIi9wcm9kdWN0L1wiICsgb3JkZXJJdGVtLnByb2R1Y3QuaWQgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogb3JkZXJJdGVtLnByb2R1Y3QudGh1bWJuYWlsLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJpdGVtLXJpZ2h0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF9jKFwiaDRcIiwge1xuICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3Mob3JkZXJJdGVtLnByb2R1Y3QubmFtZSkgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhbW91bnRcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoXCLmlbDph4/vvJpcIiArIF92bS5fcyhvcmRlckl0ZW0uYW1vdW50KSlcbiAgICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpY2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS5fZihcInByaWNlRmlsdGVyXCIpKG9yZGVySXRlbS5wcm9kdWN0LnByaWNlKSkpXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImFkZC10by1jYXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmFkZFRvQ2FydChvcmRlckl0ZW0ucHJvZHVjdC5pZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi5Yqg5YWl6LSt54mp6L2mXCIpXVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwib3JkZXItaW5mb1wiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IFwi6K6i5Y2V5Y+3XCIsIHZhbHVlOiBfdm0ub3JkZXIubnVtYmVyIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLkuIvljZXml7bpl7RcIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLmlK/ku5jml7bpl7RcIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtY2VsbFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0aXRsZTogXCLmlK/ku5jmlrnlvI9cIiwgdmFsdWU6IF92bS5vcmRlci5jcmVhdGVkX2F0IH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcInd2LWdyb3VwXCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZmVlLWluZm9cIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ3di1jZWxsXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRpdGxlOiBcIuiuouWNleaAu+minVwiLCB2YWx1ZTogX3ZtLm9yZGVyLnRvdGFsX2ZlZSB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcInd2LWNlbGxcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGl0bGU6IFwi6L+Q6LS5XCIsIHZhbHVlOiBfdm0ub3JkZXIudG90YWxfZmVlIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImZvb3RlclwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LWZsZXhcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgZ3V0dGVyOiAyMCB9IH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5vcmRlci5zdGF0dXMgPT09IFwibmVlZF90b19wYXlcIlxuICAgICAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgICAgIFwid3YtZmxleC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid3YtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwid2FyblwiLCBtaW5pOiBcIlwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hdGl2ZU9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmNhbmNlbE9yZGVyKCRldmVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwi5Y+W5raI6K6i5Y2VXCIpXVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF92bS5vcmRlci5zdGF0dXMgPT09IFwiY2FuY2VsZWRcIiB8fCBfdm0ub3JkZXIuc3RhdHVzID09PSBcImZpbmlzaGVkXCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInd2LWZsZXgtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcIndhcm5cIiwgbWluaTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWxldGVPcmRlcigkZXZlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWIoOmZpOiuouWNlVwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0ub3JkZXIuc3RhdHVzID09PSBcIm5lZWRfdG9fcGF5XCJcbiAgICAgICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgICAgICBcInd2LWZsZXgtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInd2LWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgbWluaTogXCJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kcm91dGVyLnB1c2goXCIvcGF5bWVudC9cIiArIF92bS5vcmRlci5udW1iZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuWOu+S7mOasvlwiKV1cbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTlhYzA2YzYyXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi05YWMwNmM2MlwiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvb3JkZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA1MjBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==