webpackJsonp([5],{

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

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(650)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(652)
/* template */
var __vue_template__ = __webpack_require__(654)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5167d8da"
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
Component.options.__file = "resources\\assets\\js\\shop\\pages\\user.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5167d8da", Component.options)
  } else {
    hotAPI.reload("data-v-5167d8da", Component.options)
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

/***/ 597:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=30)}({0:function(e,t){e.exports=function(e,t,n,o,r,i){var s,c=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,c=e.default);var l="function"==typeof c?c.options:c;t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},l._ssrRegister=a):o&&(a=o),a){var f=l.functional,d=f?l.render:l.beforeCreate;f?(l._injectStyles=a,l.render=function(e,t){return a.call(t),d(e,t)}):l.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:c,options:l}}},20:function(e,t,n){"use strict";t.a={props:{url:String,replace:Boolean,to:[String,Object]},methods:{routerLink:function(){var e=this.to,t=this.url,n=this.$router,o=this.replace;console.log(e),console.log(t),e&&n?n[o?"replace":"push"](e):t&&(o?location.replace(t):location.href=t)}}}},30:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(31);n.d(t,"default",function(){return o.a})},31:function(e,t,n){"use strict";function o(e){n(32)}var r=n(33),i=n(34),s=n(0),c=o,u=s(r.a,i.a,!1,c,"data-v-17907de8",null);t.a=u.exports},32:function(e,t){},33:function(e,t,n){"use strict";var o=n(20);t.a={name:"wv-cell",mixins:[o.a],props:{title:{type:[String,Number]},value:{type:[String,Number]},isLink:Boolean},mounted:function(){this.$on("CLICK_IN_CELLSWIPE",this.onClick)},methods:{onClick:function(){this.$emit("click"),this.routerLink()}}}},34:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell",class:{"weui-cell_access":e.isLink},on:{click:e.onClick}},[n("div",{staticClass:"weui-cell_hd"},[e._t("icon")],2),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[e._t("bd",[n("p",{domProps:{innerHTML:e._s(e.title)}})])],2),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[e._t("ft",[e._v(e._s(e.value))])],2)])},r=[],i={render:o,staticRenderFns:r};t.a=i}})});

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=119)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},c=typeof e.default;"object"!==c&&"function"!==c||(s=e,u=e.default);var f="function"==typeof u?u.options:u;t&&(f.render=t.render,f.staticRenderFns=t.staticRenderFns,f._compiled=!0),n&&(f.functional=!0),o&&(f._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},f._ssrRegister=a):r&&(a=r),a){var l=f.functional,d=l?f.render:f.beforeCreate;l?(f._injectStyles=a,f.render=function(e,t){return a.call(t),d(e,t)}):f.beforeCreate=d?[].concat(d,a):[a]}return{esModule:s,exports:u,options:f}}},119:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(120);n.d(t,"default",function(){return r.a})},120:function(e,t,n){"use strict";function r(e){n(121)}var o=n(122),i=n(123),s=n(0),u=r,c=s(o.a,i.a,!1,u,"data-v-f093300c",null);t.a=c.exports},121:function(e,t){},122:function(e,t,n){"use strict";t.a={name:"wv-group",props:{title:String,titleColor:String}}},123:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.title?n("div",{staticClass:"weui-cells__title",style:{color:e.titleColor},domProps:{innerHTML:e._s(e.title)}}):e._e(),e._v(" "),n("div",{staticClass:"weui-cells"},[e._t("default")],2)])},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=261)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var c="function"==typeof u?u.options:u;t&&(c.render=t.render,c.staticRenderFns=t.staticRenderFns,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o);var a;if(i?(a=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=a):r&&(a=r),a){var d=c.functional,l=d?c.render:c.beforeCreate;d?(c._injectStyles=a,c.render=function(e,t){return a.call(t),l(e,t)}):c.beforeCreate=l?[].concat(l,a):[a]}return{esModule:s,exports:u,options:c}}},261:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(262);n.d(t,"default",function(){return r.a})},262:function(e,t,n){"use strict";function r(e){n(263)}var o=n(264),i=n(265),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-4d6eccf7",null);t.a=f.exports},263:function(e,t){},264:function(e,t,n){"use strict";t.a={name:"wv-flex-item",props:{flex:{type:[Number,String],default:1}},computed:{gutter:function(){return this.$parent.gutter},style:function(){var e={};return this.gutter&&(e.paddingLeft=this.gutter/2+"px",e.paddingRight=e.paddingLeft),e.flex=this.flex,e}}}},265:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex__item",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=256)}({0:function(e,t){e.exports=function(e,t,n,r,o,i){var s,u=e=e||{},f=typeof e.default;"object"!==f&&"function"!==f||(s=e,u=e.default);var a="function"==typeof u?u.options:u;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId=o);var c;if(i?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(i)},a._ssrRegister=c):r&&(c=r),c){var d=a.functional,l=d?a.render:a.beforeCreate;d?(a._injectStyles=c,a.render=function(e,t){return c.call(t),l(e,t)}):a.beforeCreate=l?[].concat(l,c):[c]}return{esModule:s,exports:u,options:a}}},256:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(257);n.d(t,"default",function(){return r.a})},257:function(e,t,n){"use strict";function r(e){n(258)}var o=n(259),i=n(260),s=n(0),u=r,f=s(o.a,i.a,!1,u,"data-v-6fd6a76c",null);t.a=f.exports},258:function(e,t){},259:function(e,t,n){"use strict";t.a={name:"wv-flex",props:{gutter:{type:Number,default:0}},computed:{style:function(){var e={};if(this.gutter){var t="-"+this.gutter/2+"px";e.marginLeft=t,e.marginRight=t}return e}}}},260:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"weui-flex",style:e.style},[e._t("default")],2)},o=[],i={render:r,staticRenderFns:o};t.a=i}})});

/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(651);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("a5c73de6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5167d8da\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./user.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5167d8da\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./user.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)(true);
// imports


// module
exports.push([module.i, "\n.main[data-v-5167d8da] {\n  margin-bottom: 70px;\n}\n.user-profile[data-v-5167d8da] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #2696cb;\n  padding: 20px;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.user-profile .avatar[data-v-5167d8da] {\n    display: block;\n    float: left;\n    width: 80px;\n    height: 80px;\n    border-radius: 70px;\n}\n.user-profile .nickname[data-v-5167d8da] {\n    display: block;\n    color: #fff;\n    font-size: 1.1rem;\n    margin-top: .5rem;\n}\n.user-profile .mobile[data-v-5167d8da] {\n    display: block;\n    color: #fff;\n    font-size: 15px;\n}\n.card .br-1px[data-v-5167d8da] {\n  border-right: 1px solid #ececec;\n}\n.card .card-item[data-v-5167d8da] {\n  display: block;\n  padding: .3rem;\n  overflow: hidden;\n  background-color: #fff;\n  text-align: center;\n}\n.card .card-item .amount[data-v-5167d8da] {\n    display: block;\n    color: #f74c31;\n    font-size: 16px;\n    font-weight: 500;\n}\n.card .card-item .label[data-v-5167d8da] {\n    display: block;\n    color: #666;\n    font-size: 14px;\n    font-weight: 400;\n}\n.icon[data-v-5167d8da] {\n  display: inline-block;\n  float: left;\n  margin-right: 5px;\n  color: #777;\n}\n.card-demo-flex[data-v-5167d8da] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.card-demo-content01[data-v-5167d8da] {\n  padding: 10px 0;\n}\n.card-padding[data-v-5167d8da] {\n  padding: 15px;\n}\n.card-demo-flex > div[data-v-5167d8da] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  text-align: center;\n  font-size: 12px;\n}\n.card-demo-flex span[data-v-5167d8da] {\n  color: #f74c31;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/shop/pages/user.vue"],"names":[],"mappings":";AAAA;EACE,oBAAoB;CAAE;AAExB;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,6BAAuB;EAAvB,8BAAuB;MAAvB,2BAAuB;UAAvB,uBAAuB;EACvB,0BAA0B;EAC1B,cAAc;EACd,yBAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;CAAE;AACtB;IACE,eAAe;IACf,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,oBAAoB;CAAE;AACxB;IACE,eAAe;IACf,YAAY;IACZ,kBAAkB;IAClB,kBAAkB;CAAE;AACtB;IACE,eAAe;IACf,YAAY;IACZ,gBAAgB;CAAE;AAEtB;EACE,gCAAgC;CAAE;AAEpC;EACE,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,eAAe;IACf,gBAAgB;IAChB,iBAAiB;CAAE;AACrB;IACE,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,iBAAiB;CAAE;AAEvB;EACE,sBAAsB;EACtB,YAAY;EACZ,kBAAkB;EAClB,YAAY;CAAE;AAEhB;EACE,qBAAc;EAAd,qBAAc;EAAd,cAAc;CAAE;AAElB;EACE,gBAAgB;CAAE;AAEpB;EACE,cAAc;CAAE;AAElB;EACE,oBAAQ;MAAR,YAAQ;UAAR,QAAQ;EACR,mBAAmB;EACnB,gBAAgB;CAAE;AAEpB;EACE,eAAe;CAAE","file":"user.vue","sourcesContent":[".main {\n  margin-bottom: 70px; }\n\n.user-profile {\n  display: flex;\n  flex-direction: column;\n  background-color: #2696cb;\n  padding: 20px;\n  justify-content: center;\n  align-items: center; }\n  .user-profile .avatar {\n    display: block;\n    float: left;\n    width: 80px;\n    height: 80px;\n    border-radius: 70px; }\n  .user-profile .nickname {\n    display: block;\n    color: #fff;\n    font-size: 1.1rem;\n    margin-top: .5rem; }\n  .user-profile .mobile {\n    display: block;\n    color: #fff;\n    font-size: 15px; }\n\n.card .br-1px {\n  border-right: 1px solid #ececec; }\n\n.card .card-item {\n  display: block;\n  padding: .3rem;\n  overflow: hidden;\n  background-color: #fff;\n  text-align: center; }\n  .card .card-item .amount {\n    display: block;\n    color: #f74c31;\n    font-size: 16px;\n    font-weight: 500; }\n  .card .card-item .label {\n    display: block;\n    color: #666;\n    font-size: 14px;\n    font-weight: 400; }\n\n.icon {\n  display: inline-block;\n  float: left;\n  margin-right: 5px;\n  color: #777; }\n\n.card-demo-flex {\n  display: flex; }\n\n.card-demo-content01 {\n  padding: 10px 0; }\n\n.card-padding {\n  padding: 15px; }\n\n.card-demo-flex > div {\n  flex: 1;\n  text-align: center;\n  font-size: 12px; }\n\n.card-demo-flex span {\n  color: #f74c31; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg__);










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




/* harmony default export */ __webpack_exports__["default"] = ({
  components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a.name, __WEBPACK_IMPORTED_MODULE_4_we_vue_lib_group___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a.name, __WEBPACK_IMPORTED_MODULE_3_we_vue_lib_cell___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a.name, __WEBPACK_IMPORTED_MODULE_2_we_vue_lib_flex___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a.name, __WEBPACK_IMPORTED_MODULE_1_we_vue_lib_flex_item___default.a), _components),

  data: function data() {
    return {
      user: {},
      defaultAvatar: __WEBPACK_IMPORTED_MODULE_5__img_default_avatar_jpg___default.a
    };
  },
  mounted: function mounted() {
    this.getUser();
  },


  methods: {
    getUser: function getUser() {
      var _this = this;

      this.axios.get('current-user').then(function (response) {
        _this.user = response.data.user;
      });
    }
  }
});

/***/ }),

/***/ 653:
/***/ (function(module, exports) {

module.exports = "/images/default-avatar.jpg?2c52cb166feb5bf7ccd6bafed4818ae0";

/***/ }),

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main" },
    [
      _c("div", { staticClass: "user-profile" }, [
        _c("img", {
          staticClass: "avatar",
          attrs: { src: _vm.user.avatar || _vm.defaultAvatar }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "nickname" }, [
          _vm._v(_vm._s(_vm.user.nickname))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "mobile" }, [_vm._v(_vm._s(_vm.user.mobile))])
      ]),
      _vm._v(" "),
      _c(
        "wv-flex",
        { staticClass: "card" },
        [
          _c("wv-flex-item", { staticClass: "card-item br-1px" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("1130")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的余额")])
          ]),
          _vm._v(" "),
          _c("wv-flex-item", { staticClass: "card-item br-1px" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("15")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的积分")])
          ]),
          _vm._v(" "),
          _c("wv-flex-item", { staticClass: "card-item" }, [
            _c("span", { staticClass: "amount" }, [_vm._v("0")]),
            _vm._v(" "),
            _c("span", { staticClass: "label" }, [_vm._v("我的红包")])
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        [
          _c(
            "wv-cell",
            { attrs: { title: "我的订单", "is-link": "", to: "order-list" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-goods",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "收货地址", "is-link": "", to: "address" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-location",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "我的收藏", "is-link": "", to: "favourite" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-like",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "wv-group",
        [
          _c(
            "wv-cell",
            { attrs: { title: "使用帮助", "is-link": "", to: "help" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-question",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "wv-cell",
            { attrs: { title: "关于我们", "is-link": "", to: "about-us" } },
            [
              _c("i", {
                staticClass: "icon iconfont icon-info",
                attrs: { slot: "icon" },
                slot: "icon"
              })
            ]
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
    require("vue-hot-reload-api")      .rerender("data-v-5167d8da", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy91c2VyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2NlbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL2ZsZXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3VzZXIudnVlPzkwM2IiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3VzZXIudnVlPzdjOTUiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy91c2VyLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2ltZy9kZWZhdWx0LWF2YXRhci5qcGciLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3VzZXIudnVlPzJhNGYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ROQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7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Q2hEO0FBQ0Esd0JBQXdCLHVCQUF1QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxpREFBaUQsRUFBRTtBQUN6RTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLDhDQUE4QyxFQUFFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsZ0RBQWdELEVBQUU7QUFDeEU7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUywyQ0FBMkMsRUFBRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxTQUFTLCtDQUErQyxFQUFFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvc2hvcC11c2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuICBNb2RpZmllZCBieSBFdmFuIFlvdSBAeXl4OTkwODAzXG4qL1xuXG52YXIgaGFzRG9jdW1lbnQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG5cbmlmICh0eXBlb2YgREVCVUcgIT09ICd1bmRlZmluZWQnICYmIERFQlVHKSB7XG4gIGlmICghaGFzRG9jdW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3Z1ZS1zdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudC4gJyArXG4gICAgXCJVc2UgeyB0YXJnZXQ6ICdub2RlJyB9IGluIHlvdXIgV2VicGFjayBjb25maWcgdG8gaW5kaWNhdGUgYSBzZXJ2ZXItcmVuZGVyaW5nIGVudmlyb25tZW50LlwiXG4gICkgfVxufVxuXG52YXIgbGlzdFRvU3R5bGVzID0gcmVxdWlyZSgnLi9saXN0VG9TdHlsZXMnKVxuXG4vKlxudHlwZSBTdHlsZU9iamVjdCA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgcGFydHM6IEFycmF5PFN0eWxlT2JqZWN0UGFydD5cbn1cblxudHlwZSBTdHlsZU9iamVjdFBhcnQgPSB7XG4gIGNzczogc3RyaW5nO1xuICBtZWRpYTogc3RyaW5nO1xuICBzb3VyY2VNYXA6ID9zdHJpbmdcbn1cbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHsvKlxuICBbaWQ6IG51bWJlcl06IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHJlZnM6IG51bWJlcixcbiAgICBwYXJ0czogQXJyYXk8KG9iaj86IFN0eWxlT2JqZWN0UGFydCkgPT4gdm9pZD5cbiAgfVxuKi99XG5cbnZhciBoZWFkID0gaGFzRG9jdW1lbnQgJiYgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSlcbnZhciBzaW5nbGV0b25FbGVtZW50ID0gbnVsbFxudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwXG52YXIgaXNQcm9kdWN0aW9uID0gZmFsc2VcbnZhciBub29wID0gZnVuY3Rpb24gKCkge31cblxuLy8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG4vLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG52YXIgaXNPbGRJRSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9tc2llIFs2LTldXFxiLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSlcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFyZW50SWQsIGxpc3QsIF9pc1Byb2R1Y3Rpb24pIHtcbiAgaXNQcm9kdWN0aW9uID0gX2lzUHJvZHVjdGlvblxuXG4gIHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMocGFyZW50SWQsIGxpc3QpXG4gIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG4gICAgdmFyIG1heVJlbW92ZSA9IFtdXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc3R5bGVzW2ldXG4gICAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgICAgZG9tU3R5bGUucmVmcy0tXG4gICAgICBtYXlSZW1vdmUucHVzaChkb21TdHlsZSlcbiAgICB9XG4gICAgaWYgKG5ld0xpc3QpIHtcbiAgICAgIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbmV3TGlzdClcbiAgICAgIGFkZFN0eWxlc1RvRG9tKHN0eWxlcylcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVzID0gW11cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXVxuICAgICAgaWYgKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKClcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMgLyogQXJyYXk8U3R5bGVPYmplY3Q+ICovKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICB2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXVxuICAgIGlmIChkb21TdHlsZSkge1xuICAgICAgZG9tU3R5bGUucmVmcysrXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pXG4gICAgICB9XG4gICAgICBmb3IgKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIGlmIChkb21TdHlsZS5wYXJ0cy5sZW5ndGggPiBpdGVtLnBhcnRzLmxlbmd0aCkge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5sZW5ndGggPSBpdGVtLnBhcnRzLmxlbmd0aFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSBbXVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSkpXG4gICAgICB9XG4gICAgICBzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHsgaWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0cyB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAoKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gIHN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJ1xuICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudClcbiAgcmV0dXJuIHN0eWxlRWxlbWVudFxufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqIC8qIFN0eWxlT2JqZWN0UGFydCAqLykge1xuICB2YXIgdXBkYXRlLCByZW1vdmVcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlW2RhdGEtdnVlLXNzci1pZH49XCInICsgb2JqLmlkICsgJ1wiXScpXG5cbiAgaWYgKHN0eWxlRWxlbWVudCkge1xuICAgIGlmIChpc1Byb2R1Y3Rpb24pIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGFuZCBpbiBwcm9kdWN0aW9uIG1vZGUuXG4gICAgICAvLyBzaW1wbHkgZG8gbm90aGluZy5cbiAgICAgIHJldHVybiBub29wXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhcyBTU1Igc3R5bGVzIGJ1dCBpbiBkZXYgbW9kZS5cbiAgICAgIC8vIGZvciBzb21lIHJlYXNvbiBDaHJvbWUgY2FuJ3QgaGFuZGxlIHNvdXJjZSBtYXAgaW4gc2VydmVyLXJlbmRlcmVkXG4gICAgICAvLyBzdHlsZSB0YWdzIC0gc291cmNlIG1hcHMgaW4gPHN0eWxlPiBvbmx5IHdvcmtzIGlmIHRoZSBzdHlsZSB0YWcgaXNcbiAgICAgIC8vIGNyZWF0ZWQgYW5kIGluc2VydGVkIGR5bmFtaWNhbGx5LiBTbyB3ZSByZW1vdmUgdGhlIHNlcnZlciByZW5kZXJlZFxuICAgICAgLy8gc3R5bGVzIGFuZCBpbmplY3QgbmV3IG9uZXMuXG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgaWYgKGlzT2xkSUUpIHtcbiAgICAvLyB1c2Ugc2luZ2xldG9uIG1vZGUgZm9yIElFOS5cbiAgICB2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrK1xuICAgIHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKSlcbiAgICB1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSlcbiAgICByZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBtdWx0aS1zdHlsZS10YWcgbW9kZSBpbiBhbGwgb3RoZXIgY2FzZXNcbiAgICBzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQoKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpXG4gICAgcmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZShvYmopXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcbiAgICAgICAgICBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuICAgICAgICAgIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB1cGRhdGUob2JqID0gbmV3T2JqKVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKVxuICAgIH1cbiAgfVxufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgdGV4dFN0b3JlID0gW11cblxuICByZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuICAgIHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudFxuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpXG4gIH1cbn0pKClcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLmNzc1xuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKVxuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKVxuICAgIHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXNcbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSlcbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZUVsZW1lbnQsIG9iaikge1xuICB2YXIgY3NzID0gb2JqLmNzc1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWFcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXBcblxuICBpZiAobWVkaWEpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKVxuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCkge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vZGV2dG9vbHMvZG9jcy9qYXZhc2NyaXB0LWRlYnVnZ2luZ1xuICAgIC8vIHRoaXMgbWFrZXMgc291cmNlIG1hcHMgaW5zaWRlIHN0eWxlIHRhZ3Mgd29yayBwcm9wZXJseSBpbiBDaHJvbWVcbiAgICBjc3MgKz0gJ1xcbi8qIyBzb3VyY2VVUkw9JyArIHNvdXJjZU1hcC5zb3VyY2VzWzBdICsgJyAqLydcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArICcgKi8nXG4gIH1cblxuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzXG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcbi8vIG1vZHVsZSBpZCA9IDIwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTAgMTEgMTIgMjEiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gSU1QT1JUQU5UOiBEbyBOT1QgdXNlIEVTMjAxNSBmZWF0dXJlcyBpbiB0aGlzIGZpbGUuXG4vLyBUaGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGUuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgZnVuY3Rpb25hbFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgICBvcHRpb25zLl9jb21waWxlZCA9IHRydWVcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uYWwgdGVtcGxhdGVcbiAgaWYgKGZ1bmN0aW9uYWxUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMuZnVuY3Rpb25hbCA9IHRydWVcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuXG4gICAgaWYgKCFmdW5jdGlvbmFsKSB7XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHJlZ2lzdHJhdGlvbiBhcyBiZWZvcmVDcmVhdGUgaG9va1xuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIHRlbXBsYXRlLW9ubHkgaG90LXJlbG9hZCBiZWNhdXNlIGluIHRoYXQgY2FzZSB0aGUgcmVuZGVyIGZuIGRvZXNuJ3RcbiAgICAgIC8vIGdvIHRocm91Z2ggdGhlIG5vcm1hbGl6ZXJcbiAgICAgIG9wdGlvbnMuX2luamVjdFN0eWxlcyA9IGhvb2tcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDIxIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDIxIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi01MTY3ZDhkYVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi91c2VyLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAxJVxcXCIsXFxcImxhc3QgMiB2ZXJzaW9uc1xcXCIsXFxcIm5vdCBpZSA8PSA4XFxcIl19fV0sXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XSxcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFtcXFwiaW1wb3J0XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjpmYWxzZX1dXV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL3VzZXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi01MTY3ZDhkYVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL3VzZXIudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi01MTY3ZDhkYVwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXHNob3BcXFxccGFnZXNcXFxcdXNlci52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTE2N2Q4ZGFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01MTY3ZDhkYVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zaG9wL3BhZ2VzL3VzZXIudnVlXG4vLyBtb2R1bGUgaWQgPSA1ODFcbi8vIG1vZHVsZSBjaHVua3MgPSA1IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciBvIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbb109bltvXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KG8pe2lmKG5bb10pcmV0dXJuIG5bb10uZXhwb3J0czt2YXIgcj1uW29dPXtpOm8sbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtvXS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyx0KSxyLmw9ITAsci5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLG8pe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6b30pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MzApfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixvLHIsaSl7dmFyIHMsYz1lPWV8fHt9LHU9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09dSYmXCJmdW5jdGlvblwiIT09dXx8KHM9ZSxjPWUuZGVmYXVsdCk7dmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgYz9jLm9wdGlvbnM6Yzt0JiYobC5yZW5kZXI9dC5yZW5kZXIsbC5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMsbC5fY29tcGlsZWQ9ITApLG4mJihsLmZ1bmN0aW9uYWw9ITApLHImJihsLl9zY29wZUlkPXIpO3ZhciBhO2lmKGk/KGE9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLG8mJm8uY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LGwuX3NzclJlZ2lzdGVyPWEpOm8mJihhPW8pLGEpe3ZhciBmPWwuZnVuY3Rpb25hbCxkPWY/bC5yZW5kZXI6bC5iZWZvcmVDcmVhdGU7Zj8obC5faW5qZWN0U3R5bGVzPWEsbC5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYS5jYWxsKHQpLGQoZSx0KX0pOmwuYmVmb3JlQ3JlYXRlPWQ/W10uY29uY2F0KGQsYSk6W2FdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6YyxvcHRpb25zOmx9fX0sMjA6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17cHJvcHM6e3VybDpTdHJpbmcscmVwbGFjZTpCb29sZWFuLHRvOltTdHJpbmcsT2JqZWN0XX0sbWV0aG9kczp7cm91dGVyTGluazpmdW5jdGlvbigpe3ZhciBlPXRoaXMudG8sdD10aGlzLnVybCxuPXRoaXMuJHJvdXRlcixvPXRoaXMucmVwbGFjZTtjb25zb2xlLmxvZyhlKSxjb25zb2xlLmxvZyh0KSxlJiZuP25bbz9cInJlcGxhY2VcIjpcInB1c2hcIl0oZSk6dCYmKG8/bG9jYXRpb24ucmVwbGFjZSh0KTpsb2NhdGlvbi5ocmVmPXQpfX19fSwzMDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIG89bigzMSk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gby5hfSl9LDMxOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBvKGUpe24oMzIpfXZhciByPW4oMzMpLGk9bigzNCkscz1uKDApLGM9byx1PXMoci5hLGkuYSwhMSxjLFwiZGF0YS12LTE3OTA3ZGU4XCIsbnVsbCk7dC5hPXUuZXhwb3J0c30sMzI6ZnVuY3Rpb24oZSx0KXt9LDMzOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1uKDIwKTt0LmE9e25hbWU6XCJ3di1jZWxsXCIsbWl4aW5zOltvLmFdLHByb3BzOnt0aXRsZTp7dHlwZTpbU3RyaW5nLE51bWJlcl19LHZhbHVlOnt0eXBlOltTdHJpbmcsTnVtYmVyXX0saXNMaW5rOkJvb2xlYW59LG1vdW50ZWQ6ZnVuY3Rpb24oKXt0aGlzLiRvbihcIkNMSUNLX0lOX0NFTExTV0lQRVwiLHRoaXMub25DbGljayl9LG1ldGhvZHM6e29uQ2xpY2s6ZnVuY3Rpb24oKXt0aGlzLiRlbWl0KFwiY2xpY2tcIiksdGhpcy5yb3V0ZXJMaW5rKCl9fX19LDM0OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50LG49ZS5fc2VsZi5fY3x8dDtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbFwiLGNsYXNzOntcIndldWktY2VsbF9hY2Nlc3NcIjplLmlzTGlua30sb246e2NsaWNrOmUub25DbGlja319LFtuKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid2V1aS1jZWxsX2hkXCJ9LFtlLl90KFwiaWNvblwiKV0sMiksZS5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fYmRcIn0sW2UuX3QoXCJiZFwiLFtuKFwicFwiLHtkb21Qcm9wczp7aW5uZXJIVE1MOmUuX3MoZS50aXRsZSl9fSldKV0sMiksZS5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbF9fZnRcIn0sW2UuX3QoXCJmdFwiLFtlLl92KGUuX3MoZS52YWx1ZSkpXSldLDIpXSl9LHI9W10saT17cmVuZGVyOm8sc3RhdGljUmVuZGVyRm5zOnJ9O3QuYT1pfX0pfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9jZWxsL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1OTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9dCgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSx0KTtlbHNle3ZhciBuPXQoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czplKVtyXT1uW3JdfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4scil7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0xMTkpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8saSl7dmFyIHMsdT1lPWV8fHt9LGM9dHlwZW9mIGUuZGVmYXVsdDtcIm9iamVjdFwiIT09YyYmXCJmdW5jdGlvblwiIT09Y3x8KHM9ZSx1PWUuZGVmYXVsdCk7dmFyIGY9XCJmdW5jdGlvblwiPT10eXBlb2YgdT91Lm9wdGlvbnM6dTt0JiYoZi5yZW5kZXI9dC5yZW5kZXIsZi5zdGF0aWNSZW5kZXJGbnM9dC5zdGF0aWNSZW5kZXJGbnMsZi5fY29tcGlsZWQ9ITApLG4mJihmLmZ1bmN0aW9uYWw9ITApLG8mJihmLl9zY29wZUlkPW8pO3ZhciBhO2lmKGk/KGE9ZnVuY3Rpb24oZSl7ZT1lfHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fChlPV9fVlVFX1NTUl9DT05URVhUX18pLHImJnIuY2FsbCh0aGlzLGUpLGUmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LGYuX3NzclJlZ2lzdGVyPWEpOnImJihhPXIpLGEpe3ZhciBsPWYuZnVuY3Rpb25hbCxkPWw/Zi5yZW5kZXI6Zi5iZWZvcmVDcmVhdGU7bD8oZi5faW5qZWN0U3R5bGVzPWEsZi5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYS5jYWxsKHQpLGQoZSx0KX0pOmYuYmVmb3JlQ3JlYXRlPWQ/W10uY29uY2F0KGQsYSk6W2FdfXJldHVybntlc01vZHVsZTpzLGV4cG9ydHM6dSxvcHRpb25zOmZ9fX0sMTE5OmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDEyMCk7bi5kKHQsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gci5hfSl9LDEyMDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlKXtuKDEyMSl9dmFyIG89bigxMjIpLGk9bigxMjMpLHM9bigwKSx1PXIsYz1zKG8uYSxpLmEsITEsdSxcImRhdGEtdi1mMDkzMzAwY1wiLG51bGwpO3QuYT1jLmV4cG9ydHN9LDEyMTpmdW5jdGlvbihlLHQpe30sMTIyOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt0LmE9e25hbWU6XCJ3di1ncm91cFwiLHByb3BzOnt0aXRsZTpTdHJpbmcsdGl0bGVDb2xvcjpTdHJpbmd9fX0sMTIzOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1mdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1lLiRjcmVhdGVFbGVtZW50LG49ZS5fc2VsZi5fY3x8dDtyZXR1cm4gbihcImRpdlwiLFtlLnRpdGxlP24oXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWNlbGxzX190aXRsZVwiLHN0eWxlOntjb2xvcjplLnRpdGxlQ29sb3J9LGRvbVByb3BzOntpbm5lckhUTUw6ZS5fcyhlLnRpdGxlKX19KTplLl9lKCksZS5fdihcIiBcIiksbihcImRpdlwiLHtzdGF0aWNDbGFzczpcIndldWktY2VsbHNcIn0sW2UuX3QoXCJkZWZhdWx0XCIpXSwyKV0pfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZ3JvdXAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU5OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYiLCIhZnVuY3Rpb24oZSx0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7dmFyIG49dCgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW3JdPW5bcl19fShcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIGVbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsdCksby5sPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gdC5tPWUsdC5jPW4sdC5kPWZ1bmN0aW9uKGUsbixyKXt0Lm8oZSxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbix7Y29uZmlndXJhYmxlOiExLGVudW1lcmFibGU6ITAsZ2V0OnJ9KX0sdC5uPWZ1bmN0aW9uKGUpe3ZhciBuPWUmJmUuX19lc01vZHVsZT9mdW5jdGlvbigpe3JldHVybiBlLmRlZmF1bHR9OmZ1bmN0aW9uKCl7cmV0dXJuIGV9O3JldHVybiB0LmQobixcImFcIixuKSxufSx0Lm89ZnVuY3Rpb24oZSx0KXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsdCl9LHQucD1cIlwiLHQodC5zPTI2MSl9KHswOmZ1bmN0aW9uKGUsdCl7ZS5leHBvcnRzPWZ1bmN0aW9uKGUsdCxuLHIsbyxpKXt2YXIgcyx1PWU9ZXx8e30sZj10eXBlb2YgZS5kZWZhdWx0O1wib2JqZWN0XCIhPT1mJiZcImZ1bmN0aW9uXCIhPT1mfHwocz1lLHU9ZS5kZWZhdWx0KTt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiB1P3Uub3B0aW9uczp1O3QmJihjLnJlbmRlcj10LnJlbmRlcixjLnN0YXRpY1JlbmRlckZucz10LnN0YXRpY1JlbmRlckZucyxjLl9jb21waWxlZD0hMCksbiYmKGMuZnVuY3Rpb25hbD0hMCksbyYmKGMuX3Njb3BlSWQ9byk7dmFyIGE7aWYoaT8oYT1mdW5jdGlvbihlKXtlPWV8fHRoaXMuJHZub2RlJiZ0aGlzLiR2bm9kZS5zc3JDb250ZXh0fHx0aGlzLnBhcmVudCYmdGhpcy5wYXJlbnQuJHZub2RlJiZ0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCxlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfX3x8KGU9X19WVUVfU1NSX0NPTlRFWFRfXyksciYmci5jYWxsKHRoaXMsZSksZSYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMmJmUuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChpKX0sYy5fc3NyUmVnaXN0ZXI9YSk6ciYmKGE9ciksYSl7dmFyIGQ9Yy5mdW5jdGlvbmFsLGw9ZD9jLnJlbmRlcjpjLmJlZm9yZUNyZWF0ZTtkPyhjLl9pbmplY3RTdHlsZXM9YSxjLnJlbmRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBhLmNhbGwodCksbChlLHQpfSk6Yy5iZWZvcmVDcmVhdGU9bD9bXS5jb25jYXQobCxhKTpbYV19cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czp1LG9wdGlvbnM6Y319fSwyNjE6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciByPW4oMjYyKTtuLmQodCxcImRlZmF1bHRcIixmdW5jdGlvbigpe3JldHVybiByLmF9KX0sMjYyOmZ1bmN0aW9uKGUsdCxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUpe24oMjYzKX12YXIgbz1uKDI2NCksaT1uKDI2NSkscz1uKDApLHU9cixmPXMoby5hLGkuYSwhMSx1LFwiZGF0YS12LTRkNmVjY2Y3XCIsbnVsbCk7dC5hPWYuZXhwb3J0c30sMjYzOmZ1bmN0aW9uKGUsdCl7fSwyNjQ6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO3QuYT17bmFtZTpcInd2LWZsZXgtaXRlbVwiLHByb3BzOntmbGV4Ont0eXBlOltOdW1iZXIsU3RyaW5nXSxkZWZhdWx0OjF9fSxjb21wdXRlZDp7Z3V0dGVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJHBhcmVudC5ndXR0ZXJ9LHN0eWxlOmZ1bmN0aW9uKCl7dmFyIGU9e307cmV0dXJuIHRoaXMuZ3V0dGVyJiYoZS5wYWRkaW5nTGVmdD10aGlzLmd1dHRlci8yK1wicHhcIixlLnBhZGRpbmdSaWdodD1lLnBhZGRpbmdMZWZ0KSxlLmZsZXg9dGhpcy5mbGV4LGV9fX19LDI2NTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWZsZXhfX2l0ZW1cIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC1pdGVtL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgNSIsIiFmdW5jdGlvbihlLHQpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXQoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sdCk7ZWxzZXt2YXIgbj10KCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbcl09bltyXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gZVtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyx0KSxvLmw9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiB0Lm09ZSx0LmM9bix0LmQ9ZnVuY3Rpb24oZSxuLHIpe3QubyhlLG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSx0Lm49ZnVuY3Rpb24oZSl7dmFyIG49ZSYmZS5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIGUuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gZX07cmV0dXJuIHQuZChuLFwiYVwiLG4pLG59LHQubz1mdW5jdGlvbihlLHQpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSx0KX0sdC5wPVwiXCIsdCh0LnM9MjU2KX0oezA6ZnVuY3Rpb24oZSx0KXtlLmV4cG9ydHM9ZnVuY3Rpb24oZSx0LG4scixvLGkpe3ZhciBzLHU9ZT1lfHx7fSxmPXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PWYmJlwiZnVuY3Rpb25cIiE9PWZ8fChzPWUsdT1lLmRlZmF1bHQpO3ZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIHU/dS5vcHRpb25zOnU7dCYmKGEucmVuZGVyPXQucmVuZGVyLGEuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zLGEuX2NvbXBpbGVkPSEwKSxuJiYoYS5mdW5jdGlvbmFsPSEwKSxvJiYoYS5fc2NvcGVJZD1vKTt2YXIgYztpZihpPyhjPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxyJiZyLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKGkpfSxhLl9zc3JSZWdpc3Rlcj1jKTpyJiYoYz1yKSxjKXt2YXIgZD1hLmZ1bmN0aW9uYWwsbD1kP2EucmVuZGVyOmEuYmVmb3JlQ3JlYXRlO2Q/KGEuX2luamVjdFN0eWxlcz1jLGEucmVuZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGMuY2FsbCh0KSxsKGUsdCl9KTphLmJlZm9yZUNyZWF0ZT1sP1tdLmNvbmNhdChsLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6cyxleHBvcnRzOnUsb3B0aW9uczphfX19LDI1NjpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyNTcpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIHIuYX0pfSwyNTc6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHIoZSl7bigyNTgpfXZhciBvPW4oMjU5KSxpPW4oMjYwKSxzPW4oMCksdT1yLGY9cyhvLmEsaS5hLCExLHUsXCJkYXRhLXYtNmZkNmE3NmNcIixudWxsKTt0LmE9Zi5leHBvcnRzfSwyNTg6ZnVuY3Rpb24oZSx0KXt9LDI1OTpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dC5hPXtuYW1lOlwid3YtZmxleFwiLHByb3BzOntndXR0ZXI6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MH19LGNvbXB1dGVkOntzdHlsZTpmdW5jdGlvbigpe3ZhciBlPXt9O2lmKHRoaXMuZ3V0dGVyKXt2YXIgdD1cIi1cIit0aGlzLmd1dHRlci8yK1wicHhcIjtlLm1hcmdpbkxlZnQ9dCxlLm1hcmdpblJpZ2h0PXR9cmV0dXJuIGV9fX19LDI2MDpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLHQ9ZS4kY3JlYXRlRWxlbWVudDtyZXR1cm4oZS5fc2VsZi5fY3x8dCkoXCJkaXZcIix7c3RhdGljQ2xhc3M6XCJ3ZXVpLWZsZXhcIixzdHlsZTplLnN0eWxlfSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxvPVtdLGk9e3JlbmRlcjpyLHN0YXRpY1JlbmRlckZuczpvfTt0LmE9aX19KX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvZmxleC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDUiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTE2N2Q4ZGFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vdXNlci52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImE1YzczZGU2XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTUxNjdkOGRhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3VzZXIudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTUxNjdkOGRhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3VzZXIudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTUxNjdkOGRhXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy91c2VyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjUwXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ubWFpbltkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gIG1hcmdpbi1ib3R0b206IDcwcHg7XFxufVxcbi51c2VyLXByb2ZpbGVbZGF0YS12LTUxNjdkOGRhXSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XFxuICAtd2Via2l0LWJveC1kaXJlY3Rpb246IG5vcm1hbDtcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjk2Y2I7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgLXdlYmtpdC1ib3gtcGFjazogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXBhY2s6IGNlbnRlcjtcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi51c2VyLXByb2ZpbGUgLmF2YXRhcltkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogODBweDtcXG4gICAgaGVpZ2h0OiA4MHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA3MHB4O1xcbn1cXG4udXNlci1wcm9maWxlIC5uaWNrbmFtZVtkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgbWFyZ2luLXRvcDogLjVyZW07XFxufVxcbi51c2VyLXByb2ZpbGUgLm1vYmlsZVtkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxufVxcbi5jYXJkIC5ici0xcHhbZGF0YS12LTUxNjdkOGRhXSB7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWNlY2VjO1xcbn1cXG4uY2FyZCAuY2FyZC1pdGVtW2RhdGEtdi01MTY3ZDhkYV0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAuM3JlbTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4uY2FyZCAuY2FyZC1pdGVtIC5hbW91bnRbZGF0YS12LTUxNjdkOGRhXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogI2Y3NGMzMTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbn1cXG4uY2FyZCAuY2FyZC1pdGVtIC5sYWJlbFtkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjNjY2O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5pY29uW2RhdGEtdi01MTY3ZDhkYV0ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gIGNvbG9yOiAjNzc3O1xcbn1cXG4uY2FyZC1kZW1vLWZsZXhbZGF0YS12LTUxNjdkOGRhXSB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogZmxleDtcXG59XFxuLmNhcmQtZGVtby1jb250ZW50MDFbZGF0YS12LTUxNjdkOGRhXSB7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxufVxcbi5jYXJkLXBhZGRpbmdbZGF0YS12LTUxNjdkOGRhXSB7XFxuICBwYWRkaW5nOiAxNXB4O1xcbn1cXG4uY2FyZC1kZW1vLWZsZXggPiBkaXZbZGF0YS12LTUxNjdkOGRhXSB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgICAgIC1tcy1mbGV4OiAxO1xcbiAgICAgICAgICBmbGV4OiAxO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG4uY2FyZC1kZW1vLWZsZXggc3BhbltkYXRhLXYtNTE2N2Q4ZGFdIHtcXG4gIGNvbG9yOiAjZjc0YzMxO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovQ29kZS93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvdXNlci52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0Usb0JBQW9CO0NBQUU7QUFFeEI7RUFDRSxxQkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztFQUNkLDZCQUF1QjtFQUF2Qiw4QkFBdUI7TUFBdkIsMkJBQXVCO1VBQXZCLHVCQUF1QjtFQUN2QiwwQkFBMEI7RUFDMUIsY0FBYztFQUNkLHlCQUF3QjtNQUF4QixzQkFBd0I7VUFBeEIsd0JBQXdCO0VBQ3hCLDBCQUFvQjtNQUFwQix1QkFBb0I7VUFBcEIsb0JBQW9CO0NBQUU7QUFDdEI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2Isb0JBQW9CO0NBQUU7QUFDeEI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixrQkFBa0I7Q0FBRTtBQUN0QjtJQUNFLGVBQWU7SUFDZixZQUFZO0lBQ1osZ0JBQWdCO0NBQUU7QUFFdEI7RUFDRSxnQ0FBZ0M7Q0FBRTtBQUVwQztFQUNFLGVBQWU7RUFDZixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixtQkFBbUI7Q0FBRTtBQUNyQjtJQUNFLGVBQWU7SUFDZixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtDQUFFO0FBQ3JCO0lBQ0UsZUFBZTtJQUNmLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsaUJBQWlCO0NBQUU7QUFFdkI7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixZQUFZO0NBQUU7QUFFaEI7RUFDRSxxQkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztDQUFFO0FBRWxCO0VBQ0UsZ0JBQWdCO0NBQUU7QUFFcEI7RUFDRSxjQUFjO0NBQUU7QUFFbEI7RUFDRSxvQkFBUTtNQUFSLFlBQVE7VUFBUixRQUFRO0VBQ1IsbUJBQW1CO0VBQ25CLGdCQUFnQjtDQUFFO0FBRXBCO0VBQ0UsZUFBZTtDQUFFXCIsXCJmaWxlXCI6XCJ1c2VyLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubWFpbiB7XFxuICBtYXJnaW4tYm90dG9tOiA3MHB4OyB9XFxuXFxuLnVzZXItcHJvZmlsZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjk2Y2I7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAudXNlci1wcm9maWxlIC5hdmF0YXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiA4MHB4O1xcbiAgICBoZWlnaHQ6IDgwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDcwcHg7IH1cXG4gIC51c2VyLXByb2ZpbGUgLm5pY2tuYW1lIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGNvbG9yOiAjZmZmO1xcbiAgICBmb250LXNpemU6IDEuMXJlbTtcXG4gICAgbWFyZ2luLXRvcDogLjVyZW07IH1cXG4gIC51c2VyLXByb2ZpbGUgLm1vYmlsZSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1zaXplOiAxNXB4OyB9XFxuXFxuLmNhcmQgLmJyLTFweCB7XFxuICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWNlY2VjOyB9XFxuXFxuLmNhcmQgLmNhcmQtaXRlbSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBhZGRpbmc6IC4zcmVtO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IH1cXG4gIC5jYXJkIC5jYXJkLWl0ZW0gLmFtb3VudCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogI2Y3NGMzMTtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBmb250LXdlaWdodDogNTAwOyB9XFxuICAuY2FyZCAuY2FyZC1pdGVtIC5sYWJlbCB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBjb2xvcjogIzY2NjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBmb250LXdlaWdodDogNDAwOyB9XFxuXFxuLmljb24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZmxvYXQ6IGxlZnQ7XFxuICBtYXJnaW4tcmlnaHQ6IDVweDtcXG4gIGNvbG9yOiAjNzc3OyB9XFxuXFxuLmNhcmQtZGVtby1mbGV4IHtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uY2FyZC1kZW1vLWNvbnRlbnQwMSB7XFxuICBwYWRkaW5nOiAxMHB4IDA7IH1cXG5cXG4uY2FyZC1wYWRkaW5nIHtcXG4gIHBhZGRpbmc6IDE1cHg7IH1cXG5cXG4uY2FyZC1kZW1vLWZsZXggPiBkaXYge1xcbiAgZmxleDogMTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTJweDsgfVxcblxcbi5jYXJkLWRlbW8tZmxleCBzcGFuIHtcXG4gIGNvbG9yOiAjZjc0YzMxOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTUxNjdkOGRhXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy91c2VyLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjUxXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWFpblwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInVzZXItcHJvZmlsZVwiPlxyXG4gICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyXCIgOnNyYz1cInVzZXIuYXZhdGFyIHx8IGRlZmF1bHRBdmF0YXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5pY2tuYW1lXCI+e3sgdXNlci5uaWNrbmFtZSB9fTwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9iaWxlXCI+e3sgdXNlci5tb2JpbGUgfX08L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDx3di1mbGV4IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgICA8d3YtZmxleC1pdGVtIGNsYXNzPVwiY2FyZC1pdGVtIGJyLTFweFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYW1vdW50XCI+MTEzMDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+5oiR55qE5L2Z6aKdPC9zcGFuPlxyXG4gICAgICA8L3d2LWZsZXgtaXRlbT5cclxuICAgICAgPHd2LWZsZXgtaXRlbSBjbGFzcz1cImNhcmQtaXRlbSBici0xcHhcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImFtb3VudFwiPjE1PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj7miJHnmoTnp6/liIY8L3NwYW4+XHJcbiAgICAgIDwvd3YtZmxleC1pdGVtPlxyXG4gICAgICA8d3YtZmxleC1pdGVtIGNsYXNzPVwiY2FyZC1pdGVtXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhbW91bnRcIj4wPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj7miJHnmoTnuqLljIU8L3NwYW4+XHJcbiAgICAgIDwvd3YtZmxleC1pdGVtPlxyXG4gICAgPC93di1mbGV4PlxyXG5cclxuICAgIDx3di1ncm91cD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmiJHnmoTorqLljZVcIiBpcy1saW5rIHRvPVwib3JkZXItbGlzdFwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udCBpY29uLWdvb2RzXCIgc2xvdD1cImljb25cIj48L2k+XHJcbiAgICAgIDwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmlLbotKflnLDlnYBcIiBpcy1saW5rIHRvPVwiYWRkcmVzc1wiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udCBpY29uLWxvY2F0aW9uXCIgc2xvdD1cImljb25cIj48L2k+XHJcbiAgICAgIDwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLmiJHnmoTmlLbol49cIiBpcy1saW5rIHRvPVwiZmF2b3VyaXRlXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJpY29uIGljb25mb250IGljb24tbGlrZVwiIHNsb3Q9XCJpY29uXCI+PC9pPlxyXG4gICAgICA8L3d2LWNlbGw+XHJcbiAgICA8L3d2LWdyb3VwPlxyXG5cclxuICAgIDx3di1ncm91cD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLkvb/nlKjluK7liqlcIiBpcy1saW5rIHRvPVwiaGVscFwiPlxyXG4gICAgICAgIDxpIGNsYXNzPVwiaWNvbiBpY29uZm9udCBpY29uLXF1ZXN0aW9uXCIgc2xvdD1cImljb25cIj48L2k+XHJcbiAgICAgIDwvd3YtY2VsbD5cclxuICAgICAgPHd2LWNlbGwgdGl0bGU9XCLlhbPkuo7miJHku6xcIiBpcy1saW5rIHRvPVwiYWJvdXQtdXNcIj5cclxuICAgICAgICA8aSBjbGFzcz1cImljb24gaWNvbmZvbnQgaWNvbi1pbmZvXCIgc2xvdD1cImljb25cIj48L2k+XHJcbiAgICAgIDwvd3YtY2VsbD5cclxuICAgIDwvd3YtZ3JvdXA+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIGltcG9ydCBkZWZhdWx0QXZhdGFyIGZyb20gJy4uLy4uLy4uL2ltZy9kZWZhdWx0LWF2YXRhci5qcGcnXHJcbiAgaW1wb3J0IHsgR3JvdXAsIENlbGwsIEZsZXgsIEZsZXhJdGVtIH0gZnJvbSAnd2UtdnVlJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wb25lbnRzOiB7XHJcbiAgICAgIFtHcm91cC5uYW1lXTogR3JvdXAsXHJcbiAgICAgIFtDZWxsLm5hbWVdOiBDZWxsLFxyXG4gICAgICBbRmxleC5uYW1lXTogRmxleCxcclxuICAgICAgW0ZsZXhJdGVtLm5hbWVdOiBGbGV4SXRlbVxyXG4gICAgfSxcclxuXHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB1c2VyOiB7fSxcclxuICAgICAgICBkZWZhdWx0QXZhdGFyXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0VXNlcigpXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZ2V0VXNlciAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ2N1cnJlbnQtdXNlcicpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXJcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAkYXZhdGFyLXNpemU6IDgwcHg7XHJcblxyXG4gIC5tYWluIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDcwcHg7XHJcbiAgfVxyXG5cclxuICAudXNlci1wcm9maWxlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzI2OTZjYjtcclxuICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgLmF2YXRhciB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgd2lkdGg6ICRhdmF0YXItc2l6ZTtcclxuICAgICAgaGVpZ2h0OiAkYXZhdGFyLXNpemU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDcwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLm5pY2tuYW1lIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcclxuICAgICAgbWFyZ2luLXRvcDogLjVyZW07XHJcbiAgICB9XHJcblxyXG4gICAgLm1vYmlsZSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLmNhcmQge1xyXG4gICAgLmJyLTFweCB7XHJcbiAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlY2VjZWM7XHJcbiAgICB9XHJcblxyXG4gICAgLmNhcmQtaXRlbSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBwYWRkaW5nOiAuM3JlbTtcclxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICAgICAgLmFtb3VudCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgY29sb3I6ICNmNzRjMzE7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNnB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5sYWJlbCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgY29sb3I6ICM2NjY7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5pY29uIHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgICBjb2xvcjogIzc3NztcclxuICB9XHJcblxyXG4gIC5jYXJkLWRlbW8tZmxleCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtZGVtby1jb250ZW50MDEge1xyXG4gICAgcGFkZGluZzogMTBweCAwO1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtcGFkZGluZyB7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gIH1cclxuXHJcbiAgLmNhcmQtZGVtby1mbGV4ID4gZGl2IHtcclxuICAgIGZsZXg6IDE7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgfVxyXG5cclxuICAuY2FyZC1kZW1vLWZsZXggc3BhbiB7XHJcbiAgICBjb2xvcjogI2Y3NGMzMTtcclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvdXNlci52dWU/NjE4Zjk0MWUiLCJtb2R1bGUuZXhwb3J0cyA9IFwiL2ltYWdlcy9kZWZhdWx0LWF2YXRhci5qcGc/MmM1MmNiMTY2ZmViNWJmN2NjZDZiYWZlZDQ4MThhZTBcIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvaW1nL2RlZmF1bHQtYXZhdGFyLmpwZ1xuLy8gbW9kdWxlIGlkID0gNjUzXG4vLyBtb2R1bGUgY2h1bmtzID0gNSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcIm1haW5cIiB9LFxuICAgIFtcbiAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwidXNlci1wcm9maWxlXCIgfSwgW1xuICAgICAgICBfYyhcImltZ1wiLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYXZhdGFyXCIsXG4gICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0udXNlci5hdmF0YXIgfHwgX3ZtLmRlZmF1bHRBdmF0YXIgfVxuICAgICAgICB9KSxcbiAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuaWNrbmFtZVwiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoX3ZtLl9zKF92bS51c2VyLm5pY2tuYW1lKSlcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwibW9iaWxlXCIgfSwgW192bS5fdihfdm0uX3MoX3ZtLnVzZXIubW9iaWxlKSldKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwid3YtZmxleFwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImNhcmRcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJ3di1mbGV4LWl0ZW1cIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWl0ZW0gYnItMXB4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIgfSwgW192bS5fdihcIjExMzBcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJsYWJlbFwiIH0sIFtfdm0uX3YoXCLmiJHnmoTkvZnpop1cIildKVxuICAgICAgICAgIF0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJ3di1mbGV4LWl0ZW1cIiwgeyBzdGF0aWNDbGFzczogXCJjYXJkLWl0ZW0gYnItMXB4XCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIgfSwgW192bS5fdihcIjE1XCIpXSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwibGFiZWxcIiB9LCBbX3ZtLl92KFwi5oiR55qE56ev5YiGXCIpXSlcbiAgICAgICAgICBdKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwid3YtZmxleC1pdGVtXCIsIHsgc3RhdGljQ2xhc3M6IFwiY2FyZC1pdGVtXCIgfSwgW1xuICAgICAgICAgICAgX2MoXCJzcGFuXCIsIHsgc3RhdGljQ2xhc3M6IFwiYW1vdW50XCIgfSwgW192bS5fdihcIjBcIildKSxcbiAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJsYWJlbFwiIH0sIFtfdm0uX3YoXCLmiJHnmoTnuqLljIVcIildKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwid3YtZ3JvdXBcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ3di1jZWxsXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHRpdGxlOiBcIuaIkeeahOiuouWNlVwiLCBcImlzLWxpbmtcIjogXCJcIiwgdG86IFwib3JkZXItbGlzdFwiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24tZ29vZHNcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImljb25cIiB9LFxuICAgICAgICAgICAgICAgIHNsb3Q6IFwiaWNvblwiXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ3di1jZWxsXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHRpdGxlOiBcIuaUtui0p+WcsOWdgFwiLCBcImlzLWxpbmtcIjogXCJcIiwgdG86IFwiYWRkcmVzc1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24tbG9jYXRpb25cIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBzbG90OiBcImljb25cIiB9LFxuICAgICAgICAgICAgICAgIHNsb3Q6IFwiaWNvblwiXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJ3di1jZWxsXCIsXG4gICAgICAgICAgICB7IGF0dHJzOiB7IHRpdGxlOiBcIuaIkeeahOaUtuiXj1wiLCBcImlzLWxpbmtcIjogXCJcIiwgdG86IFwiZmF2b3VyaXRlXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImlcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnQgaWNvbi1saWtlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgc2xvdDogXCJpY29uXCIgfSxcbiAgICAgICAgICAgICAgICBzbG90OiBcImljb25cIlxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJ3di1ncm91cFwiLFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LWNlbGxcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgdGl0bGU6IFwi5L2/55So5biu5YqpXCIsIFwiaXMtbGlua1wiOiBcIlwiLCB0bzogXCJoZWxwXCIgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImlcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImljb24gaWNvbmZvbnQgaWNvbi1xdWVzdGlvblwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiaWNvblwiIH0sXG4gICAgICAgICAgICAgICAgc2xvdDogXCJpY29uXCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInd2LWNlbGxcIixcbiAgICAgICAgICAgIHsgYXR0cnM6IHsgdGl0bGU6IFwi5YWz5LqO5oiR5LusXCIsIFwiaXMtbGlua1wiOiBcIlwiLCB0bzogXCJhYm91dC11c1wiIH0gfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJpXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpY29uIGljb25mb250IGljb24taW5mb1wiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNsb3Q6IFwiaWNvblwiIH0sXG4gICAgICAgICAgICAgICAgc2xvdDogXCJpY29uXCJcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcbm1vZHVsZS5leHBvcnRzID0geyByZW5kZXI6IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi01MTY3ZDhkYVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNTE2N2Q4ZGFcIixcImhhc1Njb3BlZFwiOnRydWUsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvdXNlci52dWVcbi8vIG1vZHVsZSBpZCA9IDY1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDUiXSwic291cmNlUm9vdCI6IiJ9