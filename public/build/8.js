webpackJsonp([8],{

/***/ 196:
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

var listToStyles = __webpack_require__(246)

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

/***/ 197:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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

/***/ 246:
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
  __webpack_require__(649)
}
var normalizeComponent = __webpack_require__(197)
/* script */
var __vue_script__ = __webpack_require__(651)
/* template */
var __vue_template__ = __webpack_require__(652)
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\shop\\pages\\category.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] category.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48d70dc5", Component.options)
  } else {
    hotAPI.reload("data-v-48d70dc5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(584);

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

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(585), __esModule: true };

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(586);
var $Object = __webpack_require__(14).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(28);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(29), 'Object', { defineProperty: __webpack_require__(42).f });


/***/ }),

/***/ 593:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  filters: {
    priceFilter: function priceFilter(val) {
      return '￥' + Number(val).toFixed(2);
    }
  }
};

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(599);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 600:
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=297)}({0:function(e,t){e.exports=function(e,t,n,r,o){var s,i=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(s=e,i=e.default);var a="function"==typeof i?i.options:i;t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),r&&(a._scopeId=r);var c;if(o?(c=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},a._ssrRegister=c):n&&(c=n),c){var f=a.functional,d=f?a.render:a.beforeCreate;f?a.render=function(e,t){return c.call(t),d(e,t)}:a.beforeCreate=d?[].concat(d,c):[c]}return{esModule:s,exports:i,options:a}}},297:function(e,t,n){e.exports=n(298)},298:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(299),o=n.n(r);n.d(t,"default",function(){return o.a})},299:function(e,t,n){function r(e){n(300)}var o=n(0)(n(301),n(302),r,"data-v-26130cab",null);e.exports=o.exports},300:function(e,t){},301:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"wv-swipe-item",mounted:function(){this.$parent&&this.$parent.swipeItemCreated(this)},destroyed:function(){this.$parent&&this.$parent.swipeItemDestroyed(this)}}},302:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{staticClass:"wv-swipe-item"},[e._t("default")],2)},staticRenderFns:[]}}});

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(602);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(35)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(undefined);
// imports


// module
exports.push([module.i, ".wv-swipe[data-v-47370521]{overflow:hidden;position:relative;width:100%}.wv-swipe .wv-swipe-wrapper[data-v-47370521]{position:relative;overflow:hidden;height:100%}.wv-swipe .wv-swipe-wrapper div[data-v-47370521]{position:absolute;transform:translateX(-100%);width:100%;height:100%;display:none}.wv-swipe .wv-swipe-wrapper div.is-active[data-v-47370521]{display:block;transform:none}.wv-swipe .wv-swipe-indicators[data-v-47370521]{position:absolute;bottom:10px;left:50%;transform:translateX(-50%)}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator[data-v-47370521]{display:inline-block;width:7px;height:7px;border-radius:50%;margin:0 4px;background-color:#000;opacity:.3}.wv-swipe .wv-swipe-indicators .wv-swipe-indicator.is-active[data-v-47370521]{background-color:#fff}", ""]);

// exports


/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

module.exports=function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=290)}([function(t,e){t.exports=function(t,e,n,r,i){var o,u=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(o=t,u=t.default);var s="function"==typeof u?u.options:u;e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),r&&(s._scopeId=r);var c;if(i?(c=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),n&&n.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(i)},s._ssrRegister=c):n&&(c=n),c){var f=s.functional,l=f?s.render:s.beforeCreate;f?s.render=function(t,e){return c.call(e),l(t,e)}:s.beforeCreate=l?[].concat(l,c):[c]}return{esModule:o,exports:u,options:s}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(8),i=n(19),o=n(15),u=Object.defineProperty;e.f=n(2)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n=t.exports={version:"2.5.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(3),i=n(11);t.exports=n(2)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(29)("wks"),i=n(22),o=n(1).Symbol,u="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=u&&o[t]||(u?o:i)("Symbol."+t))}).store=r},function(t,e,n){var r=n(4);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=__webpack_require__(8)},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(73),i=n(27);t.exports=function(t){return r(i(t))}},function(t,e,n){var r=n(1),i=n(5),o=n(16),u=n(6),a=function(t,e,n){var s,c,f,l=t&a.F,p=t&a.G,h=t&a.S,d=t&a.P,v=t&a.B,g=t&a.W,y=p?i:i[e]||(i[e]={}),m=y.prototype,b=p?r:h?r[e]:(r[e]||{}).prototype;p&&(n=e);for(s in n)(c=!l&&b&&void 0!==b[s])&&s in y||(f=c?b[s]:n[s],y[s]=p&&"function"!=typeof b[s]?n[s]:v&&c?o(f,r):g&&b[s]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):d&&"function"==typeof f?o(Function.call,f):f,d&&((y.virtual||(y.virtual={}))[s]=f,t&a.R&&m&&!m[s]&&u(m,s,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(4);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(17);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(4),i=n(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){t.exports=!n(2)&&!n(9)(function(){return 7!=Object.defineProperty(n(18)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports={}},function(t,e,n){var r=n(53),i=n(30);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports=!0},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(3).f,i=n(12),o=n(7)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(29)("keys"),i=n(22);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){e.f=n(7)},function(t,e,n){var r=n(1),i=n(5),o=n(23),u=n(31),a=n(3).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:u.f(t)})}},function(t,e){e.f={}.propertyIsEnumerable},,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var r=n(23),i=n(14),o=n(51),u=n(6),a=n(12),s=n(20),c=n(71),f=n(25),l=n(76),p=n(7)("iterator"),h=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,v,g,y,m){c(n,e,v);var b,x,S,w=function(t){if(!h&&t in P)return P[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},_=e+" Iterator",T="values"==g,O=!1,P=t.prototype,L=P[p]||P["@@iterator"]||g&&P[g],E=L||w(g),j=g?T?w("entries"):E:void 0,M="Array"==e?P.entries||L:L;if(M&&(S=l(M.call(new t)))!==Object.prototype&&S.next&&(f(S,_,!0),r||a(S,p)||u(S,p,d)),T&&L&&"values"!==L.name&&(O=!0,E=function(){return L.call(this)}),r&&!m||!h&&!O&&P[p]||u(P,p,E),s[e]=E,s[_]=d,g)if(b={values:T?E:w("values"),keys:y?E:w("keys"),entries:j},m)for(x in b)x in P||o(P,x,b[x]);else i(i.P+i.F*(h||O),e,b);return b}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(8),i=n(72),o=n(30),u=n(28)("IE_PROTO"),a=function(){},s=function(){var t,e=n(18)("iframe"),r=o.length;for(e.style.display="none",n(59).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),s=t.F;r--;)delete s.prototype[o[r]];return s()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=r(t),n=new a,a.prototype=null,n[u]=t):n=s(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(12),i=n(13),o=n(74)(!1),u=n(28)("IE_PROTO");t.exports=function(t,e){var n,a=i(t),s=0,c=[];for(n in a)n!=u&&r(a,n)&&c.push(n);for(;e.length>s;)r(a,n=e[s++])&&(~o(c,n)||c.push(n));return c}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(53),i=n(30).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},,function(t,e,n){"use strict";var r=n(70)(!0);n(50)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(26),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){n(78);for(var r=n(1),i=n(6),o=n(20),u=n(7)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),s=0;s<a.length;s++){var c=a[s],f=r[c],l=f&&f.prototype;l&&!l[u]&&i(l,u,c),o[c]=o.Array}},function(t,e){},,,,,,function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=n(68),o=r(i),u=n(81),a=r(u),s="function"==typeof a.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":typeof t};e.default="function"==typeof a.default&&"symbol"===s(o.default)?function(t){return void 0===t?"undefined":s(t)}:function(t){return t&&"function"==typeof a.default&&t.constructor===a.default&&t!==a.default.prototype?"symbol":void 0===t?"undefined":s(t)}},function(t,e,n){t.exports={default:n(69),__esModule:!0}},function(t,e,n){n(57),n(60),t.exports=n(31).f("iterator")},function(t,e,n){var r=n(26),i=n(27);t.exports=function(t){return function(e,n){var o,u,a=String(i(e)),s=r(n),c=a.length;return s<0||s>=c?t?"":void 0:(o=a.charCodeAt(s),o<55296||o>56319||s+1===c||(u=a.charCodeAt(s+1))<56320||u>57343?t?a.charAt(s):o:t?a.slice(s,s+2):u-56320+(o-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(52),i=n(11),o=n(25),u={};n(6)(u,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(3),i=n(8),o=n(21);t.exports=n(2)?Object.defineProperties:function(t,e){i(t);for(var n,u=o(e),a=u.length,s=0;a>s;)r.f(t,n=u[s++],e[n]);return t}},function(t,e,n){var r=n(24);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(13),i=n(58),o=n(75);t.exports=function(t){return function(e,n,u){var a,s=r(e),c=i(s.length),f=o(u,c);if(t&&n!=n){for(;c>f;)if((a=s[f++])!=a)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(26),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(12),i=n(77),o=n(28)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(27);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(79),i=n(80),o=n(20),u=n(13);t.exports=n(50)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,i(1)):"keys"==e?i(0,n):"values"==e?i(0,t[n]):i(0,[n,t[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports={default:n(82),__esModule:!0}},function(t,e,n){n(83),n(61),n(90),n(91),t.exports=n(5).Symbol},function(t,e,n){"use strict";var r=n(1),i=n(12),o=n(2),u=n(14),a=n(51),s=n(84).KEY,c=n(9),f=n(29),l=n(25),p=n(22),h=n(7),d=n(31),v=n(32),g=n(85),y=n(86),m=n(87),b=n(8),x=n(13),S=n(15),w=n(11),_=n(52),T=n(88),O=n(89),P=n(3),L=n(21),E=O.f,j=P.f,M=T.f,I=r.Symbol,N=r.JSON,$=N&&N.stringify,k=h("_hidden"),C=h("toPrimitive"),A={}.propertyIsEnumerable,F=f("symbol-registry"),D=f("symbols"),W=f("op-symbols"),R=Object.prototype,G="function"==typeof I,V=r.QObject,B=!V||!V.prototype||!V.prototype.findChild,H=o&&c(function(){return 7!=_(j({},"a",{get:function(){return j(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=E(R,e);r&&delete R[e],j(t,e,n),r&&t!==R&&j(R,e,r)}:j,Y=function(t){var e=D[t]=_(I.prototype);return e._k=t,e},J=G&&"symbol"==typeof I.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof I},X=function(t,e,n){return t===R&&X(W,e,n),b(t),e=S(e,!0),b(n),i(D,e)?(n.enumerable?(i(t,k)&&t[k][e]&&(t[k][e]=!1),n=_(n,{enumerable:w(0,!1)})):(i(t,k)||j(t,k,w(1,{})),t[k][e]=!0),H(t,e,n)):j(t,e,n)},K=function(t,e){b(t);for(var n,r=y(e=x(e)),i=0,o=r.length;o>i;)X(t,n=r[i++],e[n]);return t},U=function(t,e){return void 0===e?_(t):K(_(t),e)},q=function(t){var e=A.call(this,t=S(t,!0));return!(this===R&&i(D,t)&&!i(W,t))&&(!(e||!i(this,t)||!i(D,t)||i(this,k)&&this[k][t])||e)},z=function(t,e){if(t=x(t),e=S(e,!0),t!==R||!i(D,e)||i(W,e)){var n=E(t,e);return!n||!i(D,e)||i(t,k)&&t[k][e]||(n.enumerable=!0),n}},Q=function(t){for(var e,n=M(x(t)),r=[],o=0;n.length>o;)i(D,e=n[o++])||e==k||e==s||r.push(e);return r},Z=function(t){for(var e,n=t===R,r=M(n?W:x(t)),o=[],u=0;r.length>u;)!i(D,e=r[u++])||n&&!i(R,e)||o.push(D[e]);return o};G||(I=function(){if(this instanceof I)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(W,n),i(this,k)&&i(this[k],t)&&(this[k][t]=!1),H(this,t,w(1,n))};return o&&B&&H(R,t,{configurable:!0,set:e}),Y(t)},a(I.prototype,"toString",function(){return this._k}),O.f=z,P.f=X,n(55).f=T.f=Q,n(33).f=q,n(54).f=Z,o&&!n(23)&&a(R,"propertyIsEnumerable",q,!0),d.f=function(t){return Y(h(t))}),u(u.G+u.W+u.F*!G,{Symbol:I});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),et=0;tt.length>et;)h(tt[et++]);for(var nt=L(h.store),rt=0;nt.length>rt;)v(nt[rt++]);u(u.S+u.F*!G,"Symbol",{for:function(t){return i(F,t+="")?F[t]:F[t]=I(t)},keyFor:function(t){if(J(t))return g(F,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){B=!0},useSimple:function(){B=!1}}),u(u.S+u.F*!G,"Object",{create:U,defineProperty:X,defineProperties:K,getOwnPropertyDescriptor:z,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),N&&u(u.S+u.F*(!G||c(function(){var t=I();return"[null]"!=$([t])||"{}"!=$({a:t})||"{}"!=$(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!J(t)){for(var e,n,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return e=r[1],"function"==typeof e&&(n=e),!n&&m(e)||(e=function(t,e){if(n&&(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,$.apply(N,r)}}}),I.prototype[C]||n(6)(I.prototype,C,I.prototype.valueOf),l(I,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,e,n){var r=n(22)("meta"),i=n(4),o=n(12),u=n(3).f,a=0,s=Object.isExtensible||function(){return!0},c=!n(9)(function(){return s(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:"O"+ ++a,w:{}}})},l=function(t,e){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!s(t))return"F";if(!e)return"E";f(t)}return t[r].i},p=function(t,e){if(!o(t,r)){if(!s(t))return!0;if(!e)return!1;f(t)}return t[r].w},h=function(t){return c&&d.NEED&&s(t)&&!o(t,r)&&f(t),t},d=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:p,onFreeze:h}},function(t,e,n){var r=n(21),i=n(13);t.exports=function(t,e){for(var n,o=i(t),u=r(o),a=u.length,s=0;a>s;)if(o[n=u[s++]]===e)return n}},function(t,e,n){var r=n(21),i=n(54),o=n(33);t.exports=function(t){var e=r(t),n=i.f;if(n)for(var u,a=n(t),s=o.f,c=0;a.length>c;)s.call(t,u=a[c++])&&e.push(u);return e}},function(t,e,n){var r=n(24);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(13),i=n(55).f,o={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==o.call(t)?a(t):i(r(t))}},function(t,e,n){var r=n(33),i=n(11),o=n(13),u=n(15),a=n(12),s=n(19),c=Object.getOwnPropertyDescriptor;e.f=n(2)?c:function(t,e){if(t=o(t),e=u(e,!0),s)try{return c(t,e)}catch(t){}if(a(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){n(32)("asyncIterator")},function(t,e,n){n(32)("observable")},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){t.exports=n(291)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(292),i=n.n(r);n.d(e,"default",function(){return i.a})},function(t,e,n){function r(t){n(293)}var i=n(0)(n(294),n(296),r,"data-v-47370521",null);t.exports=i.exports},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(295);e.default={name:"wv-swipe",created:function(){this.dragState={}},data:function(){return{ready:!1,dragging:!1,userScrolling:!1,animating:!1,index:0,pages:[],timer:null,reInitTimer:null,noDrag:!1}},props:{height:{type:Number,default:180},speed:{type:Number,default:300},defaultIndex:{type:Number,default:0},auto:{type:Number,default:3e3},continuous:{type:Boolean,default:!0},showIndicators:{type:Boolean,default:!0},noDragWhenSingle:{type:Boolean,default:!0},prevent:{type:Boolean,default:!1}},mounted:function(){var t=this;this.ready=!0,this.auto>0&&(this.timer=setInterval(function(){if(!t.continuous&&t.index>=t.pages.length-1)return t.clearTimer();t.dragging||t.animating||t.next()},this.auto)),this.reInitPages();var e=this.$el;e.addEventListener("touchstart",function(e){t.prevent&&e.preventDefault(),t.animating||(t.dragging=!0,t.userScrolling=!1,t.onTouchStart(e))}),e.addEventListener("touchmove",function(e){t.dragging&&t.onTouchMove(e)}),e.addEventListener("touchend",function(e){if(t.userScrolling)return t.dragging=!1,void(t.dragState={});t.dragging&&(t.onTouchEnd(e),t.dragging=!1)})},methods:{swipeItemCreated:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},swipeItemDestroyed:function(){var t=this;this.ready&&(clearTimeout(this.reInitTimer),this.reInitTimer=setTimeout(function(){t.reInitPages()},100))},translate:function(t,e,n,i){var o=this,u=arguments;if(n){this.animating=!0,t.style.webkitTransition="-webkit-transform "+n+"ms ease-in-out",setTimeout(function(){t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},50);var a=!1,s=function(){a||(a=!0,o.animating=!1,t.style.webkitTransition="",t.style.webkitTransform="",i&&i.apply(o,u))};Object(r.b)(t,"webkitTransitionEnd",s),setTimeout(s,n+100)}else t.style.webkitTransition="",t.style.webkitTransform="translate3d("+e+"px, 0, 0)"},reInitPages:function(){var t=this.$children;this.noDrag=1===t.length&&this.noDragWhenSingle;var e=[],n=Math.floor(this.defaultIndex),i=n>=0&&n<t.length?n:0;this.index=i,t.forEach(function(t,n){e.push(t.$el),Object(r.c)(t.$el,"is-active"),n===i&&Object(r.a)(t.$el,"is-active")}),this.pages=e},doAnimate:function(t,e){var n=this;if(0!==this.$children.length&&(e||!(this.$children.length<2))){var i=void 0,o=void 0,u=void 0,a=void 0,s=void 0,c=this.speed||300,f=this.index,l=this.pages,p=l.length;e?(i=e.prevPage,u=e.currentPage,o=e.nextPage,a=e.pageWidth,s=e.offsetLeft):(a=this.$el.clientWidth,u=l[f],i=l[f-1],o=l[f+1],this.continuous&&l.length>1&&(i||(i=l[l.length-1]),o||(o=l[0])),i&&(i.style.display="block",this.translate(i,-a)),o&&(o.style.display="block",this.translate(o,a)));var h=void 0,d=this.$children[f].$el;"prev"===t?(f>0&&(h=f-1),this.continuous&&0===f&&(h=p-1)):"next"===t&&(f<p-1&&(h=f+1),this.continuous&&f===p-1&&(h=0));var v=function(){if(void 0!==h){var t=n.$children[h].$el;Object(r.c)(d,"is-active"),Object(r.a)(t,"is-active"),n.index=h}i&&(i.style.display=""),o&&(o.style.display="")};setTimeout(function(){"next"===t?(n.translate(u,-a,c,v),o&&n.translate(o,0,c)):"prev"===t?(n.translate(u,a,c,v),i&&n.translate(i,0,c)):(n.translate(u,0,c,v),void 0!==s?(i&&s>0&&n.translate(i,-1*a,c),o&&s<0&&n.translate(o,a,c)):(i&&n.translate(i,-1*a,c),o&&n.translate(o,a,c)))},10)}},next:function(){this.doAnimate("next")},prev:function(){this.doAnimate("prev")},onTouchStart:function(t){if(!this.noDrag){var e=this.$el,n=this.dragState,r=t.touches[0];n.startTime=new Date,n.startLeft=r.pageX,n.startTop=r.pageY,n.startTopAbsolute=r.clientY,n.pageWidth=e.offsetWidth,n.pageHeight=e.offsetHeight;var i=this.$children[this.index-1],o=this.$children[this.index],u=this.$children[this.index+1];this.continuous&&this.pages.length>1&&(i||(i=this.$children[this.$children.length-1]),u||(u=this.$children[0])),n.prevPage=i?i.$el:null,n.dragPage=o?o.$el:null,n.nextPage=u?u.$el:null,n.prevPage&&(n.prevPage.style.display="block"),n.nextPage&&(n.nextPage.style.display="block")}},onTouchMove:function(t){if(!this.noDrag){var e=this.dragState,n=t.touches[0];e.currentLeft=n.pageX,e.currentTop=n.pageY,e.currentTopAbsolute=n.clientY;var r=e.currentLeft-e.startLeft,i=e.currentTopAbsolute-e.startTopAbsolute,o=Math.abs(r),u=Math.abs(i);if(o<5||o>=5&&u>=1.73*o)return void(this.userScrolling=!0);this.userScrolling=!1,t.preventDefault(),r=Math.min(Math.max(1-e.pageWidth,r),e.pageWidth-1);var a=r<0?"next":"prev";e.prevPage&&"prev"===a&&this.translate(e.prevPage,r-e.pageWidth),this.translate(e.dragPage,r),e.nextPage&&"next"===a&&this.translate(e.nextPage,r+e.pageWidth)}},onTouchEnd:function(){if(!this.noDrag){var t=this.dragState,e=new Date-t.startTime,n=null,r=t.currentLeft-t.startLeft,i=t.currentTop-t.startTop,o=t.pageWidth,u=this.index,a=this.pages.length;if(e<300){var s=Math.abs(r)<5&&Math.abs(i)<5;(isNaN(r)||isNaN(i))&&(s=!0),s&&this.$children[this.index].$emit("tap")}e<300&&void 0===t.currentLeft||((e<300||Math.abs(r)>o/2)&&(n=r<0?"next":"prev"),this.continuous||(0===u&&"prev"===n||u===a-1&&"next"===n)&&(n=null),this.$children.length<2&&(n=null),this.doAnimate(n,{offsetLeft:r,pageWidth:t.pageWidth,prevPage:t.prevPage,currentPage:t.dragPage,nextPage:t.nextPage}),this.dragState={})}},clearTimer:function(){clearInterval(this.timer),this.timer=null}},destroyed:function(){this.timer&&(clearInterval(this.timer),this.timer=null),this.reInitTimer&&(clearTimeout(this.reInitTimer),this.reInitTimer=null)},watch:{index:function(t){this.$emit("change",t)}}}},function(t,e,n){"use strict";function r(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function i(t,e){if(t){for(var n=t.className,i=(e||"").split(" "),o=0,u=i.length;o<u;o++){var a=i[o];a&&(t.classList?t.classList.add(a):r(t,a)||(n+=" "+a))}t.classList||(t.className=n)}}function o(t,e){if(t&&e){for(var n=e.split(" "),i=" "+t.className+" ",o=0,u=n.length;o<u;o++){var a=n[o];a&&(t.classList?t.classList.remove(a):r(t,a)&&(i=i.replace(" "+a+" "," ")))}t.classList||(t.className=f(i))}}n.d(e,"b",function(){return h}),e.a=i,e.c=o;var u=n(67),a=(n.n(u),n(10)),s=n.n(a),c=s.a.prototype.$isServer,f=(c||Number(document.documentMode),function(t){return(t||"").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g,"")}),l=function(){return!c&&document.addEventListener?function(t,e,n){t&&e&&n&&t.addEventListener(e,n,!1)}:function(t,e,n){t&&e&&n&&t.attachEvent("on"+e,n)}}(),p=function(){return!c&&document.removeEventListener?function(t,e,n){t&&e&&t.removeEventListener(e,n,!1)}:function(t,e,n){t&&e&&t.detachEvent("on"+e,n)}}(),h=function(t,e,n){l(t,e,function r(){n&&n.apply(this,arguments),p(t,e,r)})}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wv-swipe",style:{height:t.height+"px"}},[n("div",{ref:"wrapper",staticClass:"wv-swipe-wrapper"},[t._t("default")],2),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showIndicators,expression:"showIndicators"}],staticClass:"wv-swipe-indicators"},t._l(t.pages,function(e,r){return n("div",{key:r,staticClass:"wv-swipe-indicator",class:{"is-active":r===t.index}})}))])},staticRenderFns:[]}}]);

/***/ }),

/***/ 649:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(650);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(196)("00a0dea2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48d70dc5\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-48d70dc5\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./category.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(true);
// imports


// module
exports.push([module.i, "\n.left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll;\n}\n.left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6;\n}\n.left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red;\n}\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n.right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem;\n}\n.right-panel .product-list {\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: space-between;\n    width: 100%;\n    column-count: 2;\n}\n.right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px;\n}\n.right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%;\n}\n.right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n}\n.right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px;\n}\n", "", {"version":3,"sources":["D:/UPUPW/vhosts/willshop/resources/assets/js/shop/pages/category.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,iBAAiB;IACjB,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,iCAAiC;CAAE;AACnC;MACE,0BAA0B;MAC1B,WAAW;CAAE;AAEnB;EACE,eAAe;EACf,gBAAgB;EAChB,UAAU;EACV,SAAS;EACT,OAAO;EACP,aAAa;EACb,cAAc;EACd,0BAA0B;EAC1B,mBAAmB;EACnB,mBAAmB;CAAE;AACrB;IACE,eAAe;IACf,YAAY;IACZ,uBAAuB;IACvB,oBAAoB;CAAE;AACxB;IACE,cAAc;IACd,oBAAoB;IACpB,+BAA+B;IAC/B,YAAY;IACZ,gBAAgB;CAAE;AAClB;MACE,aAAa;MACb,uBAAuB;MACvB,mBAAmB;CAAE;AACrB;QACE,eAAe;QACf,iBAAiB;QACjB,YAAY;CAAE;AAChB;QACE,gBAAgB;QAChB,YAAY;QACZ,iBAAiB;QACjB,wBAAwB;QACxB,oBAAoB;CAAE;AACxB;QACE,eAAe;QACf,YAAY;QACZ,gBAAgB;CAAE","file":"category.vue","sourcesContent":[".left-sidebar {\n  display: block;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 50px;\n  width: 5em;\n  background-color: #fff;\n  z-index: 200;\n  overflow-y: scroll; }\n  .left-sidebar .sidebar-item {\n    display: block;\n    overflow: hidden;\n    text-align: center;\n    padding: 1em 0;\n    font-size: 13px;\n    border-bottom: 1px solid #f6f6f6; }\n    .left-sidebar .sidebar-item.active {\n      background-color: #f2f2f2;\n      color: red; }\n\n.right-panel {\n  display: block;\n  position: fixed;\n  left: 5em;\n  right: 0;\n  top: 0;\n  bottom: 50px;\n  padding: .5em;\n  background-color: #f5f5f5;\n  overflow-x: hidden;\n  overflow-y: scroll; }\n  .right-panel .banner {\n    display: block;\n    width: 100%;\n    background-color: #fff;\n    margin-bottom: 1rem; }\n  .right-panel .product-list {\n    display: flex;\n    flex-flow: row wrap;\n    justify-content: space-between;\n    width: 100%;\n    column-count: 2; }\n    .right-panel .product-list .product-item {\n      width: 49.5%;\n      background-color: #fff;\n      margin-bottom: 5px; }\n      .right-panel .product-list .product-item .thumbnail {\n        display: block;\n        overflow: hidden;\n        width: 100%; }\n      .right-panel .product-list .product-item .name {\n        font-size: 14px;\n        color: #444;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap; }\n      .right-panel .product-list .product-item .price {\n        display: block;\n        color: #f00;\n        font-size: 13px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 651:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(583);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _style = __webpack_require__(598);

var _style2 = _interopRequireDefault(_style);

var _swipeItem = __webpack_require__(600);

var _swipeItem2 = _interopRequireDefault(_swipeItem);

var _style3 = __webpack_require__(601);

var _style4 = _interopRequireDefault(_style3);

var _swipe = __webpack_require__(603);

var _swipe2 = _interopRequireDefault(_swipe);

var _components;

var _price_filter = __webpack_require__(593);

var _price_filter2 = _interopRequireDefault(_price_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: (_components = {}, (0, _defineProperty3.default)(_components, _swipe2.default.name, _swipe2.default), (0, _defineProperty3.default)(_components, _swipeItem2.default.name, _swipeItem2.default), _components),

  mixins: [_price_filter2.default],

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
};

/***/ }),

/***/ 652:
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
     require("vue-hot-reload-api").rerender("data-v-48d70dc5", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvbWl4aW5zL3ByaWNlX2ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL3N0eWxlLmNzcz81ODE5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlLWl0ZW0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUvc3R5bGUuY3NzPzZjZjciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZS12dWUvbGliL3N3aXBlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWU/YzM2NCIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlPzhmOTkiLCJ3ZWJwYWNrOi8vL2NhdGVnb3J5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlPzdkYWYiXSwibmFtZXMiOlsiZmlsdGVycyIsInByaWNlRmlsdGVyIiwidmFsIiwiTnVtYmVyIiwidG9GaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBLFlBQVksdUJBQXVCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUIsdUJBQXVCO0FBQzVDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3ROQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q2Y7QUFDQSx5QkFBeUIsc0JBQXNCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6IjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4gIE1vZGlmaWVkIGJ5IEV2YW4gWW91IEB5eXg5OTA4MDNcbiovXG5cbnZhciBoYXNEb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuaWYgKHR5cGVvZiBERUJVRyAhPT0gJ3VuZGVmaW5lZCcgJiYgREVCVUcpIHtcbiAgaWYgKCFoYXNEb2N1bWVudCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAndnVlLXN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50LiAnICtcbiAgICBcIlVzZSB7IHRhcmdldDogJ25vZGUnIH0gaW4geW91ciBXZWJwYWNrIGNvbmZpZyB0byBpbmRpY2F0ZSBhIHNlcnZlci1yZW5kZXJpbmcgZW52aXJvbm1lbnQuXCJcbiAgKSB9XG59XG5cbnZhciBsaXN0VG9TdHlsZXMgPSByZXF1aXJlKCcuL2xpc3RUb1N0eWxlcycpXG5cbi8qXG50eXBlIFN0eWxlT2JqZWN0ID0ge1xuICBpZDogbnVtYmVyO1xuICBwYXJ0czogQXJyYXk8U3R5bGVPYmplY3RQYXJ0PlxufVxuXG50eXBlIFN0eWxlT2JqZWN0UGFydCA9IHtcbiAgY3NzOiBzdHJpbmc7XG4gIG1lZGlhOiBzdHJpbmc7XG4gIHNvdXJjZU1hcDogP3N0cmluZ1xufVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0gey8qXG4gIFtpZDogbnVtYmVyXToge1xuICAgIGlkOiBudW1iZXIsXG4gICAgcmVmczogbnVtYmVyLFxuICAgIHBhcnRzOiBBcnJheTwob2JqPzogU3R5bGVPYmplY3RQYXJ0KSA9PiB2b2lkPlxuICB9XG4qL31cblxudmFyIGhlYWQgPSBoYXNEb2N1bWVudCAmJiAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdKVxudmFyIHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsXG52YXIgc2luZ2xldG9uQ291bnRlciA9IDBcbnZhciBpc1Byb2R1Y3Rpb24gPSBmYWxzZVxudmFyIG5vb3AgPSBmdW5jdGlvbiAoKSB7fVxuXG4vLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cbi8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcbnZhciBpc09sZElFID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL21zaWUgWzYtOV1cXGIvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXJlbnRJZCwgbGlzdCwgX2lzUHJvZHVjdGlvbikge1xuICBpc1Byb2R1Y3Rpb24gPSBfaXNQcm9kdWN0aW9uXG5cbiAgdmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhwYXJlbnRJZCwgbGlzdClcbiAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuXG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcbiAgICB2YXIgbWF5UmVtb3ZlID0gW11cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzdHlsZXNbaV1cbiAgICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgICBkb21TdHlsZS5yZWZzLS1cbiAgICAgIG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKVxuICAgIH1cbiAgICBpZiAobmV3TGlzdCkge1xuICAgICAgc3R5bGVzID0gbGlzdFRvU3R5bGVzKHBhcmVudElkLCBuZXdMaXN0KVxuICAgICAgYWRkU3R5bGVzVG9Eb20oc3R5bGVzKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXMgPSBbXVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldXG4gICAgICBpZiAoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgZG9tU3R5bGUucGFydHNbal0oKVxuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcyAvKiBBcnJheTxTdHlsZU9iamVjdD4gKi8pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IHN0eWxlc1tpXVxuICAgIHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdXG4gICAgaWYgKGRvbVN0eWxlKSB7XG4gICAgICBkb21TdHlsZS5yZWZzKytcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSlcbiAgICAgIH1cbiAgICAgIGZvciAoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuICAgICAgICBkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0pKVxuICAgICAgfVxuICAgICAgaWYgKGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA+IGl0ZW0ucGFydHMubGVuZ3RoKSB7XG4gICAgICAgIGRvbVN0eWxlLnBhcnRzLmxlbmd0aCA9IGl0ZW0ucGFydHMubGVuZ3RoXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwYXJ0cyA9IFtdXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgcGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdKSlcbiAgICAgIH1cbiAgICAgIHN0eWxlc0luRG9tW2l0ZW0uaWRdID0geyBpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50ICgpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgc3R5bGVFbGVtZW50LnR5cGUgPSAndGV4dC9jc3MnXG4gIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KVxuICByZXR1cm4gc3R5bGVFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmogLyogU3R5bGVPYmplY3RQYXJ0ICovKSB7XG4gIHZhciB1cGRhdGUsIHJlbW92ZVxuICB2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc3R5bGVbZGF0YS12dWUtc3NyLWlkfj1cIicgKyBvYmouaWQgKyAnXCJdJylcblxuICBpZiAoc3R5bGVFbGVtZW50KSB7XG4gICAgaWYgKGlzUHJvZHVjdGlvbikge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYW5kIGluIHByb2R1Y3Rpb24gbW9kZS5cbiAgICAgIC8vIHNpbXBseSBkbyBub3RoaW5nLlxuICAgICAgcmV0dXJuIG5vb3BcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFzIFNTUiBzdHlsZXMgYnV0IGluIGRldiBtb2RlLlxuICAgICAgLy8gZm9yIHNvbWUgcmVhc29uIENocm9tZSBjYW4ndCBoYW5kbGUgc291cmNlIG1hcCBpbiBzZXJ2ZXItcmVuZGVyZWRcbiAgICAgIC8vIHN0eWxlIHRhZ3MgLSBzb3VyY2UgbWFwcyBpbiA8c3R5bGU+IG9ubHkgd29ya3MgaWYgdGhlIHN0eWxlIHRhZyBpc1xuICAgICAgLy8gY3JlYXRlZCBhbmQgaW5zZXJ0ZWQgZHluYW1pY2FsbHkuIFNvIHdlIHJlbW92ZSB0aGUgc2VydmVyIHJlbmRlcmVkXG4gICAgICAvLyBzdHlsZXMgYW5kIGluamVjdCBuZXcgb25lcy5cbiAgICAgIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudClcbiAgICB9XG4gIH1cblxuICBpZiAoaXNPbGRJRSkge1xuICAgIC8vIHVzZSBzaW5nbGV0b24gbW9kZSBmb3IgSUU5LlxuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrXG4gICAgc3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpKVxuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKVxuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgLy8gdXNlIG11bHRpLXN0eWxlLXRhZyBtb2RlIGluIGFsbCBvdGhlciBjYXNlc1xuICAgIHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpXG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudClcbiAgICByZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKG9iailcblxuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaiAvKiBTdHlsZU9iamVjdFBhcnQgKi8pIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuICAgICAgICAgIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG4gICAgICAgICAgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZSgpXG4gICAgfVxuICB9XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXVxuXG4gIHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50XG4gICAgcmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJylcbiAgfVxufSkoKVxuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xuICB2YXIgY3NzID0gcmVtb3ZlID8gJycgOiBvYmouY3NzXG5cbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpXG4gIH0gZWxzZSB7XG4gICAgdmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpXG4gICAgdmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2Rlc1xuICAgIGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKVxuICAgIGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgc3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlRWxlbWVudCwgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzXG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcFxuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpXG4gIH1cblxuICBpZiAoc291cmNlTWFwKSB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kZXZ0b29scy9kb2NzL2phdmFzY3JpcHQtZGVidWdnaW5nXG4gICAgLy8gdGhpcyBtYWtlcyBzb3VyY2UgbWFwcyBpbnNpZGUgc3R5bGUgdGFncyB3b3JrIHByb3Blcmx5IGluIENocm9tZVxuICAgIGNzcyArPSAnXFxuLyojIHNvdXJjZVVSTD0nICsgc291cmNlTWFwLnNvdXJjZXNbMF0gKyAnICovJ1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG4gICAgY3NzICs9ICdcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LCcgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgJyAqLydcbiAgfVxuXG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSAxMiAxMyAxNCAyMyIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyB0aGlzIG1vZHVsZSBpcyBhIHJ1bnRpbWUgdXRpbGl0eSBmb3IgY2xlYW5lciBjb21wb25lbnQgbW9kdWxlIG91dHB1dCBhbmQgd2lsbFxuLy8gYmUgaW5jbHVkZWQgaW4gdGhlIGZpbmFsIHdlYnBhY2sgdXNlciBidW5kbGVcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVDb21wb25lbnQgKFxuICByYXdTY3JpcHRFeHBvcnRzLFxuICBjb21waWxlZFRlbXBsYXRlLFxuICBpbmplY3RTdHlsZXMsXG4gIHNjb3BlSWQsXG4gIG1vZHVsZUlkZW50aWZpZXIgLyogc2VydmVyIG9ubHkgKi9cbikge1xuICB2YXIgZXNNb2R1bGVcbiAgdmFyIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyB8fCB7fVxuXG4gIC8vIEVTNiBtb2R1bGVzIGludGVyb3BcbiAgdmFyIHR5cGUgPSB0eXBlb2YgcmF3U2NyaXB0RXhwb3J0cy5kZWZhdWx0XG4gIGlmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXNNb2R1bGUgPSByYXdTY3JpcHRFeHBvcnRzXG4gICAgc2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICB9XG5cbiAgLy8gVnVlLmV4dGVuZCBjb25zdHJ1Y3RvciBleHBvcnQgaW50ZXJvcFxuICB2YXIgb3B0aW9ucyA9IHR5cGVvZiBzY3JpcHRFeHBvcnRzID09PSAnZnVuY3Rpb24nXG4gICAgPyBzY3JpcHRFeHBvcnRzLm9wdGlvbnNcbiAgICA6IHNjcmlwdEV4cG9ydHNcblxuICAvLyByZW5kZXIgZnVuY3Rpb25zXG4gIGlmIChjb21waWxlZFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSBjb21waWxlZFRlbXBsYXRlLnJlbmRlclxuICAgIG9wdGlvbnMuc3RhdGljUmVuZGVyRm5zID0gY29tcGlsZWRUZW1wbGF0ZS5zdGF0aWNSZW5kZXJGbnNcbiAgfVxuXG4gIC8vIHNjb3BlZElkXG4gIGlmIChzY29wZUlkKSB7XG4gICAgb3B0aW9ucy5fc2NvcGVJZCA9IHNjb3BlSWRcbiAgfVxuXG4gIHZhciBob29rXG4gIGlmIChtb2R1bGVJZGVudGlmaWVyKSB7IC8vIHNlcnZlciBidWlsZFxuICAgIGhvb2sgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgLy8gMi4zIGluamVjdGlvblxuICAgICAgY29udGV4dCA9XG4gICAgICAgIGNvbnRleHQgfHwgLy8gY2FjaGVkIGNhbGxcbiAgICAgICAgKHRoaXMuJHZub2RlICYmIHRoaXMuJHZub2RlLnNzckNvbnRleHQpIHx8IC8vIHN0YXRlZnVsXG4gICAgICAgICh0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC4kdm5vZGUgJiYgdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQpIC8vIGZ1bmN0aW9uYWxcbiAgICAgIC8vIDIuMiB3aXRoIHJ1bkluTmV3Q29udGV4dDogdHJ1ZVxuICAgICAgaWYgKCFjb250ZXh0ICYmIHR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9fICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb250ZXh0ID0gX19WVUVfU1NSX0NPTlRFWFRfX1xuICAgICAgfVxuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCBzdHlsZXNcbiAgICAgIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICAgICAgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgY29udGV4dClcbiAgICAgIH1cbiAgICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCBtb2R1bGUgaWRlbnRpZmllciBmb3IgYXN5bmMgY2h1bmsgaW5mZXJyZW5jZVxuICAgICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMpIHtcbiAgICAgICAgY29udGV4dC5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG1vZHVsZUlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHVzZWQgYnkgc3NyIGluIGNhc2UgY29tcG9uZW50IGlzIGNhY2hlZCBhbmQgYmVmb3JlQ3JlYXRlXG4gICAgLy8gbmV2ZXIgZ2V0cyBjYWxsZWRcbiAgICBvcHRpb25zLl9zc3JSZWdpc3RlciA9IGhvb2tcbiAgfSBlbHNlIGlmIChpbmplY3RTdHlsZXMpIHtcbiAgICBob29rID0gaW5qZWN0U3R5bGVzXG4gIH1cblxuICBpZiAoaG9vaykge1xuICAgIHZhciBmdW5jdGlvbmFsID0gb3B0aW9ucy5mdW5jdGlvbmFsXG4gICAgdmFyIGV4aXN0aW5nID0gZnVuY3Rpb25hbFxuICAgICAgPyBvcHRpb25zLnJlbmRlclxuICAgICAgOiBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgIGlmICghZnVuY3Rpb25hbCkge1xuICAgICAgLy8gaW5qZWN0IGNvbXBvbmVudCByZWdpc3RyYXRpb24gYXMgYmVmb3JlQ3JlYXRlIGhvb2tcbiAgICAgIG9wdGlvbnMuYmVmb3JlQ3JlYXRlID0gZXhpc3RpbmdcbiAgICAgICAgPyBbXS5jb25jYXQoZXhpc3RpbmcsIGhvb2spXG4gICAgICAgIDogW2hvb2tdXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIGZvciBmdW5jdGlvYWwgY29tcG9uZW50IGluIHZ1ZSBmaWxlXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBlc01vZHVsZTogZXNNb2R1bGUsXG4gICAgZXhwb3J0czogc2NyaXB0RXhwb3J0cyxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxOTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwiLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBsaXN0IGZvcm1hdCBwcm9kdWNlZCBieSBjc3MtbG9hZGVyIGludG8gc29tZXRoaW5nXG4gKiBlYXNpZXIgdG8gbWFuaXB1bGF0ZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaXN0VG9TdHlsZXMgKHBhcmVudElkLCBsaXN0KSB7XG4gIHZhciBzdHlsZXMgPSBbXVxuICB2YXIgbmV3U3R5bGVzID0ge31cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldXG4gICAgdmFyIGlkID0gaXRlbVswXVxuICAgIHZhciBjc3MgPSBpdGVtWzFdXG4gICAgdmFyIG1lZGlhID0gaXRlbVsyXVxuICAgIHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdXG4gICAgdmFyIHBhcnQgPSB7XG4gICAgICBpZDogcGFyZW50SWQgKyAnOicgKyBpLFxuICAgICAgY3NzOiBjc3MsXG4gICAgICBtZWRpYTogbWVkaWEsXG4gICAgICBzb3VyY2VNYXA6IHNvdXJjZU1hcFxuICAgIH1cbiAgICBpZiAoIW5ld1N0eWxlc1tpZF0pIHtcbiAgICAgIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7IGlkOiBpZCwgcGFydHM6IFtwYXJ0XSB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0eWxlc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvbGlzdFRvU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIDEyIDEzIDE0IDIzIiwidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi00OGQ3MGRjNVxcXCIsXFxcInNjb3BlZFxcXCI6ZmFsc2UsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9jYXRlZ29yeS52dWVcIilcbn1cbnZhciBub3JtYWxpemVDb21wb25lbnQgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplclwiKVxuLyogc2NyaXB0ICovXG52YXIgX192dWVfc2NyaXB0X18gPSByZXF1aXJlKFwiISFiYWJlbC1sb2FkZXI/e1xcXCJjYWNoZURpcmVjdG9yeVxcXCI6dHJ1ZSxcXFwicHJlc2V0c1xcXCI6W1tcXFwiZW52XFxcIix7XFxcIm1vZHVsZXNcXFwiOmZhbHNlLFxcXCJ0YXJnZXRzXFxcIjp7XFxcImJyb3dzZXJzXFxcIjpbXFxcIj4gMiVcXFwiXSxcXFwidWdsaWZ5XFxcIjp0cnVlfX1dLFxcXCJlczIwMTVcXFwiLFxcXCJzdGFnZS0yXFxcIl0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFxcXCJzeW50YXgtZHluYW1pYy1pbXBvcnRcXFwiLFtcXFwiY29tcG9uZW50XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjp0cnVlfV1dXSxcXFwiY29tbWVudHNcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL2NhdGVnb3J5LnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDhkNzBkYzVcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcc2hvcFxcXFxwYWdlc1xcXFxjYXRlZ29yeS52dWVcIlxuaWYgKENvbXBvbmVudC5lc01vZHVsZSAmJiBPYmplY3Qua2V5cyhDb21wb25lbnQuZXNNb2R1bGUpLnNvbWUoZnVuY3Rpb24gKGtleSkge3JldHVybiBrZXkgIT09IFwiZGVmYXVsdFwiICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIn0pKSB7Y29uc29sZS5lcnJvcihcIm5hbWVkIGV4cG9ydHMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gKi52dWUgZmlsZXMuXCIpfVxuaWYgKENvbXBvbmVudC5vcHRpb25zLmZ1bmN0aW9uYWwpIHtjb25zb2xlLmVycm9yKFwiW3Z1ZS1sb2FkZXJdIGNhdGVnb3J5LnZ1ZTogZnVuY3Rpb25hbCBjb21wb25lbnRzIGFyZSBub3Qgc3VwcG9ydGVkIHdpdGggdGVtcGxhdGVzLCB0aGV5IHNob3VsZCB1c2UgcmVuZGVyIGZ1bmN0aW9ucy5cIil9XG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi00OGQ3MGRjNVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTQ4ZDcwZGM1XCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlXG4vLyBtb2R1bGUgaWQgPSA1NzJcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA1ODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEwIDExIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNTg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMCAxMSIsImV4cG9ydCBkZWZhdWx0IHtcclxuICBmaWx0ZXJzOiB7XHJcbiAgICBwcmljZUZpbHRlcjogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICByZXR1cm4gJ++/pScgKyBOdW1iZXIodmFsKS50b0ZpeGVkKDIpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9taXhpbnMvcHJpY2VfZmlsdGVyLmpzIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS1pdGVtL3N0eWxlLmNzc1xuLy8gbW9kdWxlIGlkID0gNTk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiA4IDEwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHVuZGVmaW5lZCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUtaXRlbS9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDU5OVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgOCAxMCIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2k6cixsOiExLGV4cG9ydHM6e319O3JldHVybiBlW3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHQpLG8ubD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIHQubT1lLHQuYz1uLHQuZD1mdW5jdGlvbihlLG4scil7dC5vKGUsbil8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4se2NvbmZpZ3VyYWJsZTohMSxlbnVtZXJhYmxlOiEwLGdldDpyfSl9LHQubj1mdW5jdGlvbihlKXt2YXIgbj1lJiZlLl9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gZS5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiBlfTtyZXR1cm4gdC5kKG4sXCJhXCIsbiksbn0sdC5vPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLHQpfSx0LnA9XCJcIix0KHQucz0yOTcpfSh7MDpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz1mdW5jdGlvbihlLHQsbixyLG8pe3ZhciBzLGk9ZT1lfHx7fSx1PXR5cGVvZiBlLmRlZmF1bHQ7XCJvYmplY3RcIiE9PXUmJlwiZnVuY3Rpb25cIiE9PXV8fChzPWUsaT1lLmRlZmF1bHQpO3ZhciBhPVwiZnVuY3Rpb25cIj09dHlwZW9mIGk/aS5vcHRpb25zOmk7dCYmKGEucmVuZGVyPXQucmVuZGVyLGEuc3RhdGljUmVuZGVyRm5zPXQuc3RhdGljUmVuZGVyRm5zKSxyJiYoYS5fc2NvcGVJZD1yKTt2YXIgYztpZihvPyhjPWZ1bmN0aW9uKGUpe2U9ZXx8dGhpcy4kdm5vZGUmJnRoaXMuJHZub2RlLnNzckNvbnRleHR8fHRoaXMucGFyZW50JiZ0aGlzLnBhcmVudC4kdm5vZGUmJnRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0LGV8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBfX1ZVRV9TU1JfQ09OVEVYVF9ffHwoZT1fX1ZVRV9TU1JfQ09OVEVYVF9fKSxuJiZuLmNhbGwodGhpcyxlKSxlJiZlLl9yZWdpc3RlcmVkQ29tcG9uZW50cyYmZS5fcmVnaXN0ZXJlZENvbXBvbmVudHMuYWRkKG8pfSxhLl9zc3JSZWdpc3Rlcj1jKTpuJiYoYz1uKSxjKXt2YXIgZj1hLmZ1bmN0aW9uYWwsZD1mP2EucmVuZGVyOmEuYmVmb3JlQ3JlYXRlO2Y/YS5yZW5kZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gYy5jYWxsKHQpLGQoZSx0KX06YS5iZWZvcmVDcmVhdGU9ZD9bXS5jb25jYXQoZCxjKTpbY119cmV0dXJue2VzTW9kdWxlOnMsZXhwb3J0czppLG9wdGlvbnM6YX19fSwyOTc6ZnVuY3Rpb24oZSx0LG4pe2UuZXhwb3J0cz1uKDI5OCl9LDI5ODpmdW5jdGlvbihlLHQsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyOTkpLG89bi5uKHIpO24uZCh0LFwiZGVmYXVsdFwiLGZ1bmN0aW9uKCl7cmV0dXJuIG8uYX0pfSwyOTk6ZnVuY3Rpb24oZSx0LG4pe2Z1bmN0aW9uIHIoZSl7bigzMDApfXZhciBvPW4oMCkobigzMDEpLG4oMzAyKSxyLFwiZGF0YS12LTI2MTMwY2FiXCIsbnVsbCk7ZS5leHBvcnRzPW8uZXhwb3J0c30sMzAwOmZ1bmN0aW9uKGUsdCl7fSwzMDE6ZnVuY3Rpb24oZSx0LG4pe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHQuZGVmYXVsdD17bmFtZTpcInd2LXN3aXBlLWl0ZW1cIixtb3VudGVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtQ3JlYXRlZCh0aGlzKX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dGhpcy4kcGFyZW50JiZ0aGlzLiRwYXJlbnQuc3dpcGVJdGVtRGVzdHJveWVkKHRoaXMpfX19LDMwMjpmdW5jdGlvbihlLHQpe2UuZXhwb3J0cz17cmVuZGVyOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWUuJGNyZWF0ZUVsZW1lbnQ7cmV0dXJuKGUuX3NlbGYuX2N8fHQpKFwiZGl2XCIse3N0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaXRlbVwifSxbZS5fdChcImRlZmF1bHRcIildLDIpfSxzdGF0aWNSZW5kZXJGbnM6W119fX0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUtaXRlbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiA4IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge31cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDYwMVxuLy8gbW9kdWxlIGNodW5rcyA9IDIgOCAxMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh1bmRlZmluZWQpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnd2LXN3aXBlW2RhdGEtdi00NzM3MDUyMV17b3ZlcmZsb3c6aGlkZGVuO3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyW2RhdGEtdi00NzM3MDUyMV17cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxMDAlfS53di1zd2lwZSAud3Ytc3dpcGUtd3JhcHBlciBkaXZbZGF0YS12LTQ3MzcwNTIxXXtwb3NpdGlvbjphYnNvbHV0ZTt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtMTAwJSk7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5Om5vbmV9Lnd2LXN3aXBlIC53di1zd2lwZS13cmFwcGVyIGRpdi5pcy1hY3RpdmVbZGF0YS12LTQ3MzcwNTIxXXtkaXNwbGF5OmJsb2NrO3RyYW5zZm9ybTpub25lfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9yc1tkYXRhLXYtNDczNzA1MjFde3Bvc2l0aW9uOmFic29sdXRlO2JvdHRvbToxMHB4O2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVYKC01MCUpfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yW2RhdGEtdi00NzM3MDUyMV17ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6N3B4O2hlaWdodDo3cHg7Ym9yZGVyLXJhZGl1czo1MCU7bWFyZ2luOjAgNHB4O2JhY2tncm91bmQtY29sb3I6IzAwMDtvcGFjaXR5Oi4zfS53di1zd2lwZSAud3Ytc3dpcGUtaW5kaWNhdG9ycyAud3Ytc3dpcGUtaW5kaWNhdG9yLmlzLWFjdGl2ZVtkYXRhLXYtNDczNzA1MjFde2JhY2tncm91bmQtY29sb3I6I2ZmZn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL3dlLXZ1ZS9saWIvc3dpcGUvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA2MDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIDggMTAiLCJtb2R1bGUuZXhwb3J0cz1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgaT1uW3JdPXtpOnIsbDohMSxleHBvcnRzOnt9fTtyZXR1cm4gdFtyXS5jYWxsKGkuZXhwb3J0cyxpLGkuZXhwb3J0cyxlKSxpLmw9ITAsaS5leHBvcnRzfXZhciBuPXt9O3JldHVybiBlLm09dCxlLmM9bixlLmQ9ZnVuY3Rpb24odCxuLHIpe2Uubyh0LG4pfHxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHtjb25maWd1cmFibGU6ITEsZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxlLm49ZnVuY3Rpb24odCl7dmFyIG49dCYmdC5fX2VzTW9kdWxlP2Z1bmN0aW9uKCl7cmV0dXJuIHQuZGVmYXVsdH06ZnVuY3Rpb24oKXtyZXR1cm4gdH07cmV0dXJuIGUuZChuLFwiYVwiLG4pLG59LGUubz1mdW5jdGlvbih0LGUpe3JldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxlKX0sZS5wPVwiXCIsZShlLnM9MjkwKX0oW2Z1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLHIsaSl7dmFyIG8sdT10PXR8fHt9LGE9dHlwZW9mIHQuZGVmYXVsdDtcIm9iamVjdFwiIT09YSYmXCJmdW5jdGlvblwiIT09YXx8KG89dCx1PXQuZGVmYXVsdCk7dmFyIHM9XCJmdW5jdGlvblwiPT10eXBlb2YgdT91Lm9wdGlvbnM6dTtlJiYocy5yZW5kZXI9ZS5yZW5kZXIscy5zdGF0aWNSZW5kZXJGbnM9ZS5zdGF0aWNSZW5kZXJGbnMpLHImJihzLl9zY29wZUlkPXIpO3ZhciBjO2lmKGk/KGM9ZnVuY3Rpb24odCl7dD10fHx0aGlzLiR2bm9kZSYmdGhpcy4kdm5vZGUuc3NyQ29udGV4dHx8dGhpcy5wYXJlbnQmJnRoaXMucGFyZW50LiR2bm9kZSYmdGhpcy5wYXJlbnQuJHZub2RlLnNzckNvbnRleHQsdHx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX198fCh0PV9fVlVFX1NTUl9DT05URVhUX18pLG4mJm4uY2FsbCh0aGlzLHQpLHQmJnQuX3JlZ2lzdGVyZWRDb21wb25lbnRzJiZ0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQoaSl9LHMuX3NzclJlZ2lzdGVyPWMpOm4mJihjPW4pLGMpe3ZhciBmPXMuZnVuY3Rpb25hbCxsPWY/cy5yZW5kZXI6cy5iZWZvcmVDcmVhdGU7Zj9zLnJlbmRlcj1mdW5jdGlvbih0LGUpe3JldHVybiBjLmNhbGwoZSksbCh0LGUpfTpzLmJlZm9yZUNyZWF0ZT1sP1tdLmNvbmNhdChsLGMpOltjXX1yZXR1cm57ZXNNb2R1bGU6byxleHBvcnRzOnUsb3B0aW9uczpzfX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5leHBvcnRzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5NYXRoPT1NYXRoP3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZiYmc2VsZi5NYXRoPT1NYXRoP3NlbGY6RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wibnVtYmVyXCI9PXR5cGVvZiBfX2cmJihfX2c9bil9LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9IW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDgpLGk9bigxOSksbz1uKDE1KSx1PU9iamVjdC5kZWZpbmVQcm9wZXJ0eTtlLmY9bigyKT9PYmplY3QuZGVmaW5lUHJvcGVydHk6ZnVuY3Rpb24odCxlLG4pe2lmKHIodCksZT1vKGUsITApLHIobiksaSl0cnl7cmV0dXJuIHUodCxlLG4pfWNhdGNoKHQpe31pZihcImdldFwiaW4gbnx8XCJzZXRcImluIG4pdGhyb3cgVHlwZUVycm9yKFwiQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhXCIpO3JldHVyblwidmFsdWVcImluIG4mJih0W2VdPW4udmFsdWUpLHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIm9iamVjdFwiPT10eXBlb2YgdD9udWxsIT09dDpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0fX0sZnVuY3Rpb24odCxlKXt2YXIgbj10LmV4cG9ydHM9e3ZlcnNpb246XCIyLjUuMFwifTtcIm51bWJlclwiPT10eXBlb2YgX19lJiYoX19lPW4pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKSxpPW4oMTEpO3QuZXhwb3J0cz1uKDIpP2Z1bmN0aW9uKHQsZSxuKXtyZXR1cm4gci5mKHQsZSxpKDEsbikpfTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRbZV09bix0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjkpKFwid2tzXCIpLGk9bigyMiksbz1uKDEpLlN5bWJvbCx1PVwiZnVuY3Rpb25cIj09dHlwZW9mIG87KHQuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8KHJbdF09dSYmb1t0XXx8KHU/bzppKShcIlN5bWJvbC5cIit0KSl9KS5zdG9yZT1yfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big0KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoIXIodCkpdGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGFuIG9iamVjdCFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2godCl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9cmVxdWlyZShcInZ1ZVwiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57ZW51bWVyYWJsZTohKDEmdCksY29uZmlndXJhYmxlOiEoMiZ0KSx3cml0YWJsZTohKDQmdCksdmFsdWU6ZX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9Lmhhc093blByb3BlcnR5O3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybiBuLmNhbGwodCxlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDczKSxpPW4oMjcpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihpKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLGk9big1KSxvPW4oMTYpLHU9big2KSxhPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcyxjLGYsbD10JmEuRixwPXQmYS5HLGg9dCZhLlMsZD10JmEuUCx2PXQmYS5CLGc9dCZhLlcseT1wP2k6aVtlXXx8KGlbZV09e30pLG09eS5wcm90b3R5cGUsYj1wP3I6aD9yW2VdOihyW2VdfHx7fSkucHJvdG90eXBlO3AmJihuPWUpO2ZvcihzIGluIG4pKGM9IWwmJmImJnZvaWQgMCE9PWJbc10pJiZzIGluIHl8fChmPWM/YltzXTpuW3NdLHlbc109cCYmXCJmdW5jdGlvblwiIT10eXBlb2YgYltzXT9uW3NdOnYmJmM/byhmLHIpOmcmJmJbc109PWY/ZnVuY3Rpb24odCl7dmFyIGU9ZnVuY3Rpb24oZSxuLHIpe2lmKHRoaXMgaW5zdGFuY2VvZiB0KXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiBuZXcgdDtjYXNlIDE6cmV0dXJuIG5ldyB0KGUpO2Nhc2UgMjpyZXR1cm4gbmV3IHQoZSxuKX1yZXR1cm4gbmV3IHQoZSxuLHIpfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX07cmV0dXJuIGUucHJvdG90eXBlPXQucHJvdG90eXBlLGV9KGYpOmQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/byhGdW5jdGlvbi5jYWxsLGYpOmYsZCYmKCh5LnZpcnR1YWx8fCh5LnZpcnR1YWw9e30pKVtzXT1mLHQmYS5SJiZtJiYhbVtzXSYmdShtLHMsZikpKX07YS5GPTEsYS5HPTIsYS5TPTQsYS5QPTgsYS5CPTE2LGEuVz0zMixhLlU9NjQsYS5SPTEyOCx0LmV4cG9ydHM9YX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7aWYoIXIodCkpcmV0dXJuIHQ7dmFyIG4saTtpZihlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZihuPXQudG9TdHJpbmcpJiYhcihpPW4uY2FsbCh0KSkpcmV0dXJuIGk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Yobj10LnZhbHVlT2YpJiYhcihpPW4uY2FsbCh0KSkpcmV0dXJuIGk7aWYoIWUmJlwiZnVuY3Rpb25cIj09dHlwZW9mKG49dC50b1N0cmluZykmJiFyKGk9bi5jYWxsKHQpKSlyZXR1cm4gaTt0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtpZihyKHQpLHZvaWQgMD09PWUpcmV0dXJuIHQ7c3dpdGNoKG4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbChlLG4pfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKG4scil7cmV0dXJuIHQuY2FsbChlLG4scil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLGkpe3JldHVybiB0LmNhbGwoZSxuLHIsaSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KGUsYXJndW1lbnRzKX19fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhIGZ1bmN0aW9uIVwiKTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQpLGk9bigxKS5kb2N1bWVudCxvPXIoaSkmJnIoaS5jcmVhdGVFbGVtZW50KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIG8/aS5jcmVhdGVFbGVtZW50KHQpOnt9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbigyKSYmIW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KG4oMTgpKFwiZGl2XCIpLFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPXt9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1MyksaT1uKDMwKTt0LmV4cG9ydHM9T2JqZWN0LmtleXN8fGZ1bmN0aW9uKHQpe3JldHVybiByKHQsaSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPTAscj1NYXRoLnJhbmRvbSgpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm5cIlN5bWJvbChcIi5jb25jYXQodm9pZCAwPT09dD9cIlwiOnQsXCIpX1wiLCgrK24rcikudG9TdHJpbmcoMzYpKX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPSEwfSxmdW5jdGlvbih0LGUpe3ZhciBuPXt9LnRvU3RyaW5nO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gbi5jYWxsKHQpLnNsaWNlKDgsLTEpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMykuZixpPW4oMTIpLG89big3KShcInRvU3RyaW5nVGFnXCIpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7dCYmIWkodD1uP3Q6dC5wcm90b3R5cGUsbykmJnIodCxvLHtjb25maWd1cmFibGU6ITAsdmFsdWU6ZX0pfX0sZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLmNlaWwscj1NYXRoLmZsb29yO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gaXNOYU4odD0rdCk/MDoodD4wP3I6bikodCl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXtpZih2b2lkIDA9PXQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiK3QpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjkpKFwia2V5c1wiKSxpPW4oMjIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gclt0XXx8KHJbdF09aSh0KSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxKSxpPXJbXCJfX2NvcmUtanNfc2hhcmVkX19cIl18fChyW1wiX19jb3JlLWpzX3NoYXJlZF9fXCJdPXt9KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlbdF18fChpW3RdPXt9KX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPVwiY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mXCIuc3BsaXQoXCIsXCIpfSxmdW5jdGlvbih0LGUsbil7ZS5mPW4oNyl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLGk9big1KSxvPW4oMjMpLHU9bigzMSksYT1uKDMpLmY7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPWkuU3ltYm9sfHwoaS5TeW1ib2w9bz97fTpyLlN5bWJvbHx8e30pO1wiX1wiPT10LmNoYXJBdCgwKXx8dCBpbiBlfHxhKGUsdCx7dmFsdWU6dS5mKHQpfSl9fSxmdW5jdGlvbih0LGUpe2UuZj17fS5wcm9wZXJ0eUlzRW51bWVyYWJsZX0sLCwsLCwsLCwsLCwsLCwsLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDIzKSxpPW4oMTQpLG89big1MSksdT1uKDYpLGE9bigxMikscz1uKDIwKSxjPW4oNzEpLGY9bigyNSksbD1uKDc2KSxwPW4oNykoXCJpdGVyYXRvclwiKSxoPSEoW10ua2V5cyYmXCJuZXh0XCJpbltdLmtleXMoKSksZD1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4sdixnLHksbSl7YyhuLGUsdik7dmFyIGIseCxTLHc9ZnVuY3Rpb24odCl7aWYoIWgmJnQgaW4gUClyZXR1cm4gUFt0XTtzd2l0Y2godCl7Y2FzZVwia2V5c1wiOmNhc2VcInZhbHVlc1wiOnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgbih0aGlzLHQpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4odGhpcyx0KX19LF89ZStcIiBJdGVyYXRvclwiLFQ9XCJ2YWx1ZXNcIj09ZyxPPSExLFA9dC5wcm90b3R5cGUsTD1QW3BdfHxQW1wiQEBpdGVyYXRvclwiXXx8ZyYmUFtnXSxFPUx8fHcoZyksaj1nP1Q/dyhcImVudHJpZXNcIik6RTp2b2lkIDAsTT1cIkFycmF5XCI9PWU/UC5lbnRyaWVzfHxMOkw7aWYoTSYmKFM9bChNLmNhbGwobmV3IHQpKSkhPT1PYmplY3QucHJvdG90eXBlJiZTLm5leHQmJihmKFMsXywhMCkscnx8YShTLHApfHx1KFMscCxkKSksVCYmTCYmXCJ2YWx1ZXNcIiE9PUwubmFtZSYmKE89ITAsRT1mdW5jdGlvbigpe3JldHVybiBMLmNhbGwodGhpcyl9KSxyJiYhbXx8IWgmJiFPJiZQW3BdfHx1KFAscCxFKSxzW2VdPUUsc1tfXT1kLGcpaWYoYj17dmFsdWVzOlQ/RTp3KFwidmFsdWVzXCIpLGtleXM6eT9FOncoXCJrZXlzXCIpLGVudHJpZXM6an0sbSlmb3IoeCBpbiBiKXggaW4gUHx8byhQLHgsYlt4XSk7ZWxzZSBpKGkuUCtpLkYqKGh8fE8pLGUsYik7cmV0dXJuIGJ9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oNil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDgpLGk9big3Miksbz1uKDMwKSx1PW4oMjgpKFwiSUVfUFJPVE9cIiksYT1mdW5jdGlvbigpe30scz1mdW5jdGlvbigpe3ZhciB0LGU9bigxOCkoXCJpZnJhbWVcIikscj1vLmxlbmd0aDtmb3IoZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLG4oNTkpLmFwcGVuZENoaWxkKGUpLGUuc3JjPVwiamF2YXNjcmlwdDpcIix0PWUuY29udGVudFdpbmRvdy5kb2N1bWVudCx0Lm9wZW4oKSx0LndyaXRlKFwiPHNjcmlwdD5kb2N1bWVudC5GPU9iamVjdDxcXC9zY3JpcHQ+XCIpLHQuY2xvc2UoKSxzPXQuRjtyLS07KWRlbGV0ZSBzLnByb3RvdHlwZVtvW3JdXTtyZXR1cm4gcygpfTt0LmV4cG9ydHM9T2JqZWN0LmNyZWF0ZXx8ZnVuY3Rpb24odCxlKXt2YXIgbjtyZXR1cm4gbnVsbCE9PXQ/KGEucHJvdG90eXBlPXIodCksbj1uZXcgYSxhLnByb3RvdHlwZT1udWxsLG5bdV09dCk6bj1zKCksdm9pZCAwPT09ZT9uOmkobixlKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEyKSxpPW4oMTMpLG89big3NCkoITEpLHU9bigyOCkoXCJJRV9QUk9UT1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXt2YXIgbixhPWkodCkscz0wLGM9W107Zm9yKG4gaW4gYSluIT11JiZyKGEsbikmJmMucHVzaChuKTtmb3IoO2UubGVuZ3RoPnM7KXIoYSxuPWVbcysrXSkmJih+byhjLG4pfHxjLnB1c2gobikpO3JldHVybiBjfX0sZnVuY3Rpb24odCxlKXtlLmY9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc30sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNTMpLGk9bigzMCkuY29uY2F0KFwibGVuZ3RoXCIsXCJwcm90b3R5cGVcIik7ZS5mPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzfHxmdW5jdGlvbih0KXtyZXR1cm4gcih0LGkpfX0sLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDcwKSghMCk7big1MCkoU3RyaW5nLFwiU3RyaW5nXCIsZnVuY3Rpb24odCl7dGhpcy5fdD1TdHJpbmcodCksdGhpcy5faT0wfSxmdW5jdGlvbigpe3ZhciB0LGU9dGhpcy5fdCxuPXRoaXMuX2k7cmV0dXJuIG4+PWUubGVuZ3RoP3t2YWx1ZTp2b2lkIDAsZG9uZTohMH06KHQ9cihlLG4pLHRoaXMuX2krPXQubGVuZ3RoLHt2YWx1ZTp0LGRvbmU6ITF9KX0pfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyNiksaT1NYXRoLm1pbjt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ+MD9pKHIodCksOTAwNzE5OTI1NDc0MDk5MSk6MH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEpLmRvY3VtZW50O3QuZXhwb3J0cz1yJiZyLmRvY3VtZW50RWxlbWVudH0sZnVuY3Rpb24odCxlLG4pe24oNzgpO2Zvcih2YXIgcj1uKDEpLGk9big2KSxvPW4oMjApLHU9big3KShcInRvU3RyaW5nVGFnXCIpLGE9XCJDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LERPTVRva2VuTGlzdCxEYXRhVHJhbnNmZXJJdGVtTGlzdCxGaWxlTGlzdCxIVE1MQWxsQ29sbGVjdGlvbixIVE1MQ29sbGVjdGlvbixIVE1MRm9ybUVsZW1lbnQsSFRNTFNlbGVjdEVsZW1lbnQsTWVkaWFMaXN0LE1pbWVUeXBlQXJyYXksTmFtZWROb2RlTWFwLE5vZGVMaXN0LFBhaW50UmVxdWVzdExpc3QsUGx1Z2luLFBsdWdpbkFycmF5LFNWR0xlbmd0aExpc3QsU1ZHTnVtYmVyTGlzdCxTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCxUZXh0VHJhY2tMaXN0LFRvdWNoTGlzdFwiLnNwbGl0KFwiLFwiKSxzPTA7czxhLmxlbmd0aDtzKyspe3ZhciBjPWFbc10sZj1yW2NdLGw9ZiYmZi5wcm90b3R5cGU7bCYmIWxbdV0mJmkobCx1LGMpLG9bY109by5BcnJheX19LGZ1bmN0aW9uKHQsZSl7fSwsLCwsLGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1lLl9fZXNNb2R1bGU9ITA7dmFyIGk9big2OCksbz1yKGkpLHU9big4MSksYT1yKHUpLHM9XCJmdW5jdGlvblwiPT10eXBlb2YgYS5kZWZhdWx0JiZcInN5bWJvbFwiPT10eXBlb2Ygby5kZWZhdWx0P2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmdC5jb25zdHJ1Y3Rvcj09PWEuZGVmYXVsdCYmdCE9PWEuZGVmYXVsdC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH07ZS5kZWZhdWx0PVwiZnVuY3Rpb25cIj09dHlwZW9mIGEuZGVmYXVsdCYmXCJzeW1ib2xcIj09PXMoby5kZWZhdWx0KT9mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dD9cInVuZGVmaW5lZFwiOnModCl9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLmRlZmF1bHQmJnQuY29uc3RydWN0b3I9PT1hLmRlZmF1bHQmJnQhPT1hLmRlZmF1bHQucHJvdG90eXBlP1wic3ltYm9sXCI6dm9pZCAwPT09dD9cInVuZGVmaW5lZFwiOnModCl9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oNjkpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big1Nyksbig2MCksdC5leHBvcnRzPW4oMzEpLmYoXCJpdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjYpLGk9bigyNyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlLG4pe3ZhciBvLHUsYT1TdHJpbmcoaShlKSkscz1yKG4pLGM9YS5sZW5ndGg7cmV0dXJuIHM8MHx8cz49Yz90P1wiXCI6dm9pZCAwOihvPWEuY2hhckNvZGVBdChzKSxvPDU1Mjk2fHxvPjU2MzE5fHxzKzE9PT1jfHwodT1hLmNoYXJDb2RlQXQocysxKSk8NTYzMjB8fHU+NTczNDM/dD9hLmNoYXJBdChzKTpvOnQ/YS5zbGljZShzLHMrMik6dS01NjMyMCsoby01NTI5Njw8MTApKzY1NTM2KX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1MiksaT1uKDExKSxvPW4oMjUpLHU9e307big2KSh1LG4oNykoXCJpdGVyYXRvclwiKSxmdW5jdGlvbigpe3JldHVybiB0aGlzfSksdC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXt0LnByb3RvdHlwZT1yKHUse25leHQ6aSgxLG4pfSksbyh0LGUrXCIgSXRlcmF0b3JcIil9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzKSxpPW4oOCksbz1uKDIxKTt0LmV4cG9ydHM9bigyKT9PYmplY3QuZGVmaW5lUHJvcGVydGllczpmdW5jdGlvbih0LGUpe2kodCk7Zm9yKHZhciBuLHU9byhlKSxhPXUubGVuZ3RoLHM9MDthPnM7KXIuZih0LG49dVtzKytdLGVbbl0pO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjQpO3QuZXhwb3J0cz1PYmplY3QoXCJ6XCIpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApP09iamVjdDpmdW5jdGlvbih0KXtyZXR1cm5cIlN0cmluZ1wiPT1yKHQpP3Quc3BsaXQoXCJcIik6T2JqZWN0KHQpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTMpLGk9big1OCksbz1uKDc1KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUsbix1KXt2YXIgYSxzPXIoZSksYz1pKHMubGVuZ3RoKSxmPW8odSxjKTtpZih0JiZuIT1uKXtmb3IoO2M+ZjspaWYoKGE9c1tmKytdKSE9YSlyZXR1cm4hMH1lbHNlIGZvcig7Yz5mO2YrKylpZigodHx8ZiBpbiBzKSYmc1tmXT09PW4pcmV0dXJuIHR8fGZ8fDA7cmV0dXJuIXQmJi0xfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI2KSxpPU1hdGgubWF4LG89TWF0aC5taW47dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQ9cih0KSx0PDA/aSh0K2UsMCk6byh0LGUpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTIpLGk9big3Nyksbz1uKDI4KShcIklFX1BST1RPXCIpLHU9T2JqZWN0LnByb3RvdHlwZTt0LmV4cG9ydHM9T2JqZWN0LmdldFByb3RvdHlwZU9mfHxmdW5jdGlvbih0KXtyZXR1cm4gdD1pKHQpLHIodCxvKT90W29dOlwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29uc3RydWN0b3ImJnQgaW5zdGFuY2VvZiB0LmNvbnN0cnVjdG9yP3QuY29uc3RydWN0b3IucHJvdG90eXBlOnQgaW5zdGFuY2VvZiBPYmplY3Q/dTpudWxsfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjcpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gT2JqZWN0KHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNzkpLGk9big4MCksbz1uKDIwKSx1PW4oMTMpO3QuZXhwb3J0cz1uKDUwKShBcnJheSxcIkFycmF5XCIsZnVuY3Rpb24odCxlKXt0aGlzLl90PXUodCksdGhpcy5faT0wLHRoaXMuX2s9ZX0sZnVuY3Rpb24oKXt2YXIgdD10aGlzLl90LGU9dGhpcy5fayxuPXRoaXMuX2krKztyZXR1cm4hdHx8bj49dC5sZW5ndGg/KHRoaXMuX3Q9dm9pZCAwLGkoMSkpOlwia2V5c1wiPT1lP2koMCxuKTpcInZhbHVlc1wiPT1lP2koMCx0W25dKTppKDAsW24sdFtuXV0pfSxcInZhbHVlc1wiKSxvLkFyZ3VtZW50cz1vLkFycmF5LHIoXCJrZXlzXCIpLHIoXCJ2YWx1ZXNcIikscihcImVudHJpZXNcIil9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKCl7fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm57dmFsdWU6ZSxkb25lOiEhdH19fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtkZWZhdWx0Om4oODIpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big4Myksbig2MSksbig5MCksbig5MSksdC5leHBvcnRzPW4oNSkuU3ltYm9sfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxKSxpPW4oMTIpLG89bigyKSx1PW4oMTQpLGE9big1MSkscz1uKDg0KS5LRVksYz1uKDkpLGY9bigyOSksbD1uKDI1KSxwPW4oMjIpLGg9big3KSxkPW4oMzEpLHY9bigzMiksZz1uKDg1KSx5PW4oODYpLG09big4NyksYj1uKDgpLHg9bigxMyksUz1uKDE1KSx3PW4oMTEpLF89big1MiksVD1uKDg4KSxPPW4oODkpLFA9bigzKSxMPW4oMjEpLEU9Ty5mLGo9UC5mLE09VC5mLEk9ci5TeW1ib2wsTj1yLkpTT04sJD1OJiZOLnN0cmluZ2lmeSxrPWgoXCJfaGlkZGVuXCIpLEM9aChcInRvUHJpbWl0aXZlXCIpLEE9e30ucHJvcGVydHlJc0VudW1lcmFibGUsRj1mKFwic3ltYm9sLXJlZ2lzdHJ5XCIpLEQ9ZihcInN5bWJvbHNcIiksVz1mKFwib3Atc3ltYm9sc1wiKSxSPU9iamVjdC5wcm90b3R5cGUsRz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBJLFY9ci5RT2JqZWN0LEI9IVZ8fCFWLnByb3RvdHlwZXx8IVYucHJvdG90eXBlLmZpbmRDaGlsZCxIPW8mJmMoZnVuY3Rpb24oKXtyZXR1cm4gNyE9XyhqKHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaih0aGlzLFwiYVwiLHt2YWx1ZTo3fSkuYX19KSkuYX0pP2Z1bmN0aW9uKHQsZSxuKXt2YXIgcj1FKFIsZSk7ciYmZGVsZXRlIFJbZV0saih0LGUsbiksciYmdCE9PVImJmooUixlLHIpfTpqLFk9ZnVuY3Rpb24odCl7dmFyIGU9RFt0XT1fKEkucHJvdG90eXBlKTtyZXR1cm4gZS5faz10LGV9LEo9RyYmXCJzeW1ib2xcIj09dHlwZW9mIEkuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuXCJzeW1ib2xcIj09dHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgSX0sWD1mdW5jdGlvbih0LGUsbil7cmV0dXJuIHQ9PT1SJiZYKFcsZSxuKSxiKHQpLGU9UyhlLCEwKSxiKG4pLGkoRCxlKT8obi5lbnVtZXJhYmxlPyhpKHQsaykmJnRba11bZV0mJih0W2tdW2VdPSExKSxuPV8obix7ZW51bWVyYWJsZTp3KDAsITEpfSkpOihpKHQsayl8fGoodCxrLHcoMSx7fSkpLHRba11bZV09ITApLEgodCxlLG4pKTpqKHQsZSxuKX0sSz1mdW5jdGlvbih0LGUpe2IodCk7Zm9yKHZhciBuLHI9eShlPXgoZSkpLGk9MCxvPXIubGVuZ3RoO28+aTspWCh0LG49cltpKytdLGVbbl0pO3JldHVybiB0fSxVPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHZvaWQgMD09PWU/Xyh0KTpLKF8odCksZSl9LHE9ZnVuY3Rpb24odCl7dmFyIGU9QS5jYWxsKHRoaXMsdD1TKHQsITApKTtyZXR1cm4hKHRoaXM9PT1SJiZpKEQsdCkmJiFpKFcsdCkpJiYoIShlfHwhaSh0aGlzLHQpfHwhaShELHQpfHxpKHRoaXMsaykmJnRoaXNba11bdF0pfHxlKX0sej1mdW5jdGlvbih0LGUpe2lmKHQ9eCh0KSxlPVMoZSwhMCksdCE9PVJ8fCFpKEQsZSl8fGkoVyxlKSl7dmFyIG49RSh0LGUpO3JldHVybiFufHwhaShELGUpfHxpKHQsaykmJnRba11bZV18fChuLmVudW1lcmFibGU9ITApLG59fSxRPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPU0oeCh0KSkscj1bXSxvPTA7bi5sZW5ndGg+bzspaShELGU9bltvKytdKXx8ZT09a3x8ZT09c3x8ci5wdXNoKGUpO3JldHVybiByfSxaPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZSxuPXQ9PT1SLHI9TShuP1c6eCh0KSksbz1bXSx1PTA7ci5sZW5ndGg+dTspIWkoRCxlPXJbdSsrXSl8fG4mJiFpKFIsZSl8fG8ucHVzaChEW2VdKTtyZXR1cm4gb307R3x8KEk9ZnVuY3Rpb24oKXtpZih0aGlzIGluc3RhbmNlb2YgSSl0aHJvdyBUeXBlRXJyb3IoXCJTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhXCIpO3ZhciB0PXAoYXJndW1lbnRzLmxlbmd0aD4wP2FyZ3VtZW50c1swXTp2b2lkIDApLGU9ZnVuY3Rpb24obil7dGhpcz09PVImJmUuY2FsbChXLG4pLGkodGhpcyxrKSYmaSh0aGlzW2tdLHQpJiYodGhpc1trXVt0XT0hMSksSCh0aGlzLHQsdygxLG4pKX07cmV0dXJuIG8mJkImJkgoUix0LHtjb25maWd1cmFibGU6ITAsc2V0OmV9KSxZKHQpfSxhKEkucHJvdG90eXBlLFwidG9TdHJpbmdcIixmdW5jdGlvbigpe3JldHVybiB0aGlzLl9rfSksTy5mPXosUC5mPVgsbig1NSkuZj1ULmY9USxuKDMzKS5mPXEsbig1NCkuZj1aLG8mJiFuKDIzKSYmYShSLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixxLCEwKSxkLmY9ZnVuY3Rpb24odCl7cmV0dXJuIFkoaCh0KSl9KSx1KHUuRyt1LlcrdS5GKiFHLHtTeW1ib2w6SX0pO2Zvcih2YXIgdHQ9XCJoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlc1wiLnNwbGl0KFwiLFwiKSxldD0wO3R0Lmxlbmd0aD5ldDspaCh0dFtldCsrXSk7Zm9yKHZhciBudD1MKGguc3RvcmUpLHJ0PTA7bnQubGVuZ3RoPnJ0Oyl2KG50W3J0KytdKTt1KHUuUyt1LkYqIUcsXCJTeW1ib2xcIix7Zm9yOmZ1bmN0aW9uKHQpe3JldHVybiBpKEYsdCs9XCJcIik/Rlt0XTpGW3RdPUkodCl9LGtleUZvcjpmdW5jdGlvbih0KXtpZihKKHQpKXJldHVybiBnKEYsdCk7dGhyb3cgVHlwZUVycm9yKHQrXCIgaXMgbm90IGEgc3ltYm9sIVwiKX0sdXNlU2V0dGVyOmZ1bmN0aW9uKCl7Qj0hMH0sdXNlU2ltcGxlOmZ1bmN0aW9uKCl7Qj0hMX19KSx1KHUuUyt1LkYqIUcsXCJPYmplY3RcIix7Y3JlYXRlOlUsZGVmaW5lUHJvcGVydHk6WCxkZWZpbmVQcm9wZXJ0aWVzOkssZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOnosZ2V0T3duUHJvcGVydHlOYW1lczpRLGdldE93blByb3BlcnR5U3ltYm9sczpafSksTiYmdSh1LlMrdS5GKighR3x8YyhmdW5jdGlvbigpe3ZhciB0PUkoKTtyZXR1cm5cIltudWxsXVwiIT0kKFt0XSl8fFwie31cIiE9JCh7YTp0fSl8fFwie31cIiE9JChPYmplY3QodCkpfSkpLFwiSlNPTlwiLHtzdHJpbmdpZnk6ZnVuY3Rpb24odCl7aWYodm9pZCAwIT09dCYmIUoodCkpe2Zvcih2YXIgZSxuLHI9W3RdLGk9MTthcmd1bWVudHMubGVuZ3RoPmk7KXIucHVzaChhcmd1bWVudHNbaSsrXSk7cmV0dXJuIGU9clsxXSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobj1lKSwhbiYmbShlKXx8KGU9ZnVuY3Rpb24odCxlKXtpZihuJiYoZT1uLmNhbGwodGhpcyx0LGUpKSwhSihlKSlyZXR1cm4gZX0pLHJbMV09ZSwkLmFwcGx5KE4scil9fX0pLEkucHJvdG90eXBlW0NdfHxuKDYpKEkucHJvdG90eXBlLEMsSS5wcm90b3R5cGUudmFsdWVPZiksbChJLFwiU3ltYm9sXCIpLGwoTWF0aCxcIk1hdGhcIiwhMCksbChyLkpTT04sXCJKU09OXCIsITApfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigyMikoXCJtZXRhXCIpLGk9big0KSxvPW4oMTIpLHU9bigzKS5mLGE9MCxzPU9iamVjdC5pc0V4dGVuc2libGV8fGZ1bmN0aW9uKCl7cmV0dXJuITB9LGM9IW4oOSkoZnVuY3Rpb24oKXtyZXR1cm4gcyhPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKX0pLGY9ZnVuY3Rpb24odCl7dSh0LHIse3ZhbHVlOntpOlwiT1wiKyArK2Esdzp7fX19KX0sbD1mdW5jdGlvbih0LGUpe2lmKCFpKHQpKXJldHVyblwic3ltYm9sXCI9PXR5cGVvZiB0P3Q6KFwic3RyaW5nXCI9PXR5cGVvZiB0P1wiU1wiOlwiUFwiKSt0O2lmKCFvKHQscikpe2lmKCFzKHQpKXJldHVyblwiRlwiO2lmKCFlKXJldHVyblwiRVwiO2YodCl9cmV0dXJuIHRbcl0uaX0scD1mdW5jdGlvbih0LGUpe2lmKCFvKHQscikpe2lmKCFzKHQpKXJldHVybiEwO2lmKCFlKXJldHVybiExO2YodCl9cmV0dXJuIHRbcl0ud30saD1mdW5jdGlvbih0KXtyZXR1cm4gYyYmZC5ORUVEJiZzKHQpJiYhbyh0LHIpJiZmKHQpLHR9LGQ9dC5leHBvcnRzPXtLRVk6cixORUVEOiExLGZhc3RLZXk6bCxnZXRXZWFrOnAsb25GcmVlemU6aH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIxKSxpPW4oMTMpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe2Zvcih2YXIgbixvPWkodCksdT1yKG8pLGE9dS5sZW5ndGgscz0wO2E+czspaWYob1tuPXVbcysrXV09PT1lKXJldHVybiBufX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjEpLGk9big1NCksbz1uKDMzKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7dmFyIGU9cih0KSxuPWkuZjtpZihuKWZvcih2YXIgdSxhPW4odCkscz1vLmYsYz0wO2EubGVuZ3RoPmM7KXMuY2FsbCh0LHU9YVtjKytdKSYmZS5wdXNoKHUpO3JldHVybiBlfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjQpO3QuZXhwb3J0cz1BcnJheS5pc0FycmF5fHxmdW5jdGlvbih0KXtyZXR1cm5cIkFycmF5XCI9PXIodCl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyksaT1uKDU1KS5mLG89e30udG9TdHJpbmcsdT1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzP09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdyk6W10sYT1mdW5jdGlvbih0KXt0cnl7cmV0dXJuIGkodCl9Y2F0Y2godCl7cmV0dXJuIHUuc2xpY2UoKX19O3QuZXhwb3J0cy5mPWZ1bmN0aW9uKHQpe3JldHVybiB1JiZcIltvYmplY3QgV2luZG93XVwiPT1vLmNhbGwodCk/YSh0KTppKHIodCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMzMpLGk9bigxMSksbz1uKDEzKSx1PW4oMTUpLGE9bigxMikscz1uKDE5KSxjPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7ZS5mPW4oMik/YzpmdW5jdGlvbih0LGUpe2lmKHQ9byh0KSxlPXUoZSwhMCkscyl0cnl7cmV0dXJuIGModCxlKX1jYXRjaCh0KXt9aWYoYSh0LGUpKXJldHVybiBpKCFyLmYuY2FsbCh0LGUpLHRbZV0pfX0sZnVuY3Rpb24odCxlLG4pe24oMzIpKFwiYXN5bmNJdGVyYXRvclwiKX0sZnVuY3Rpb24odCxlLG4pe24oMzIpKFwib2JzZXJ2YWJsZVwiKX0sLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDI5MSl9LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgcj1uKDI5MiksaT1uLm4ocik7bi5kKGUsXCJkZWZhdWx0XCIsZnVuY3Rpb24oKXtyZXR1cm4gaS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXtmdW5jdGlvbiByKHQpe24oMjkzKX12YXIgaT1uKDApKG4oMjk0KSxuKDI5NikscixcImRhdGEtdi00NzM3MDUyMVwiLG51bGwpO3QuZXhwb3J0cz1pLmV4cG9ydHN9LGZ1bmN0aW9uKHQsZSl7fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIHI9bigyOTUpO2UuZGVmYXVsdD17bmFtZTpcInd2LXN3aXBlXCIsY3JlYXRlZDpmdW5jdGlvbigpe3RoaXMuZHJhZ1N0YXRlPXt9fSxkYXRhOmZ1bmN0aW9uKCl7cmV0dXJue3JlYWR5OiExLGRyYWdnaW5nOiExLHVzZXJTY3JvbGxpbmc6ITEsYW5pbWF0aW5nOiExLGluZGV4OjAscGFnZXM6W10sdGltZXI6bnVsbCxyZUluaXRUaW1lcjpudWxsLG5vRHJhZzohMX19LHByb3BzOntoZWlnaHQ6e3R5cGU6TnVtYmVyLGRlZmF1bHQ6MTgwfSxzcGVlZDp7dHlwZTpOdW1iZXIsZGVmYXVsdDozMDB9LGRlZmF1bHRJbmRleDp7dHlwZTpOdW1iZXIsZGVmYXVsdDowfSxhdXRvOnt0eXBlOk51bWJlcixkZWZhdWx0OjNlM30sY29udGludW91czp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHNob3dJbmRpY2F0b3JzOnt0eXBlOkJvb2xlYW4sZGVmYXVsdDohMH0sbm9EcmFnV2hlblNpbmdsZTp7dHlwZTpCb29sZWFuLGRlZmF1bHQ6ITB9LHByZXZlbnQ6e3R5cGU6Qm9vbGVhbixkZWZhdWx0OiExfX0sbW91bnRlZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeT0hMCx0aGlzLmF1dG8+MCYmKHRoaXMudGltZXI9c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtpZighdC5jb250aW51b3VzJiZ0LmluZGV4Pj10LnBhZ2VzLmxlbmd0aC0xKXJldHVybiB0LmNsZWFyVGltZXIoKTt0LmRyYWdnaW5nfHx0LmFuaW1hdGluZ3x8dC5uZXh0KCl9LHRoaXMuYXV0bykpLHRoaXMucmVJbml0UGFnZXMoKTt2YXIgZT10aGlzLiRlbDtlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oZSl7dC5wcmV2ZW50JiZlLnByZXZlbnREZWZhdWx0KCksdC5hbmltYXRpbmd8fCh0LmRyYWdnaW5nPSEwLHQudXNlclNjcm9sbGluZz0hMSx0Lm9uVG91Y2hTdGFydChlKSl9KSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixmdW5jdGlvbihlKXt0LmRyYWdnaW5nJiZ0Lm9uVG91Y2hNb3ZlKGUpfSksZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixmdW5jdGlvbihlKXtpZih0LnVzZXJTY3JvbGxpbmcpcmV0dXJuIHQuZHJhZ2dpbmc9ITEsdm9pZCh0LmRyYWdTdGF0ZT17fSk7dC5kcmFnZ2luZyYmKHQub25Ub3VjaEVuZChlKSx0LmRyYWdnaW5nPSExKX0pfSxtZXRob2RzOntzd2lwZUl0ZW1DcmVhdGVkOmZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLnJlYWR5JiYoY2xlYXJUaW1lb3V0KHRoaXMucmVJbml0VGltZXIpLHRoaXMucmVJbml0VGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe3QucmVJbml0UGFnZXMoKX0sMTAwKSl9LHN3aXBlSXRlbURlc3Ryb3llZDpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5yZWFkeSYmKGNsZWFyVGltZW91dCh0aGlzLnJlSW5pdFRpbWVyKSx0aGlzLnJlSW5pdFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnJlSW5pdFBhZ2VzKCl9LDEwMCkpfSx0cmFuc2xhdGU6ZnVuY3Rpb24odCxlLG4saSl7dmFyIG89dGhpcyx1PWFyZ3VtZW50cztpZihuKXt0aGlzLmFuaW1hdGluZz0hMCx0LnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCItd2Via2l0LXRyYW5zZm9ybSBcIituK1wibXMgZWFzZS1pbi1vdXRcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJ0cmFuc2xhdGUzZChcIitlK1wicHgsIDAsIDApXCJ9LDUwKTt2YXIgYT0hMSxzPWZ1bmN0aW9uKCl7YXx8KGE9ITAsby5hbmltYXRpbmc9ITEsdC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uPVwiXCIsdC5zdHlsZS53ZWJraXRUcmFuc2Zvcm09XCJcIixpJiZpLmFwcGx5KG8sdSkpfTtPYmplY3Qoci5iKSh0LFwid2Via2l0VHJhbnNpdGlvbkVuZFwiLHMpLHNldFRpbWVvdXQocyxuKzEwMCl9ZWxzZSB0LnN0eWxlLndlYmtpdFRyYW5zaXRpb249XCJcIix0LnN0eWxlLndlYmtpdFRyYW5zZm9ybT1cInRyYW5zbGF0ZTNkKFwiK2UrXCJweCwgMCwgMClcIn0scmVJbml0UGFnZXM6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRjaGlsZHJlbjt0aGlzLm5vRHJhZz0xPT09dC5sZW5ndGgmJnRoaXMubm9EcmFnV2hlblNpbmdsZTt2YXIgZT1bXSxuPU1hdGguZmxvb3IodGhpcy5kZWZhdWx0SW5kZXgpLGk9bj49MCYmbjx0Lmxlbmd0aD9uOjA7dGhpcy5pbmRleD1pLHQuZm9yRWFjaChmdW5jdGlvbih0LG4pe2UucHVzaCh0LiRlbCksT2JqZWN0KHIuYykodC4kZWwsXCJpcy1hY3RpdmVcIiksbj09PWkmJk9iamVjdChyLmEpKHQuJGVsLFwiaXMtYWN0aXZlXCIpfSksdGhpcy5wYWdlcz1lfSxkb0FuaW1hdGU6ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzO2lmKDAhPT10aGlzLiRjaGlsZHJlbi5sZW5ndGgmJihlfHwhKHRoaXMuJGNoaWxkcmVuLmxlbmd0aDwyKSkpe3ZhciBpPXZvaWQgMCxvPXZvaWQgMCx1PXZvaWQgMCxhPXZvaWQgMCxzPXZvaWQgMCxjPXRoaXMuc3BlZWR8fDMwMCxmPXRoaXMuaW5kZXgsbD10aGlzLnBhZ2VzLHA9bC5sZW5ndGg7ZT8oaT1lLnByZXZQYWdlLHU9ZS5jdXJyZW50UGFnZSxvPWUubmV4dFBhZ2UsYT1lLnBhZ2VXaWR0aCxzPWUub2Zmc2V0TGVmdCk6KGE9dGhpcy4kZWwuY2xpZW50V2lkdGgsdT1sW2ZdLGk9bFtmLTFdLG89bFtmKzFdLHRoaXMuY29udGludW91cyYmbC5sZW5ndGg+MSYmKGl8fChpPWxbbC5sZW5ndGgtMV0pLG98fChvPWxbMF0pKSxpJiYoaS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIix0aGlzLnRyYW5zbGF0ZShpLC1hKSksbyYmKG8uc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsdGhpcy50cmFuc2xhdGUobyxhKSkpO3ZhciBoPXZvaWQgMCxkPXRoaXMuJGNoaWxkcmVuW2ZdLiRlbDtcInByZXZcIj09PXQ/KGY+MCYmKGg9Zi0xKSx0aGlzLmNvbnRpbnVvdXMmJjA9PT1mJiYoaD1wLTEpKTpcIm5leHRcIj09PXQmJihmPHAtMSYmKGg9ZisxKSx0aGlzLmNvbnRpbnVvdXMmJmY9PT1wLTEmJihoPTApKTt2YXIgdj1mdW5jdGlvbigpe2lmKHZvaWQgMCE9PWgpe3ZhciB0PW4uJGNoaWxkcmVuW2hdLiRlbDtPYmplY3Qoci5jKShkLFwiaXMtYWN0aXZlXCIpLE9iamVjdChyLmEpKHQsXCJpcy1hY3RpdmVcIiksbi5pbmRleD1ofWkmJihpLnN0eWxlLmRpc3BsYXk9XCJcIiksbyYmKG8uc3R5bGUuZGlzcGxheT1cIlwiKX07c2V0VGltZW91dChmdW5jdGlvbigpe1wibmV4dFwiPT09dD8obi50cmFuc2xhdGUodSwtYSxjLHYpLG8mJm4udHJhbnNsYXRlKG8sMCxjKSk6XCJwcmV2XCI9PT10PyhuLnRyYW5zbGF0ZSh1LGEsYyx2KSxpJiZuLnRyYW5zbGF0ZShpLDAsYykpOihuLnRyYW5zbGF0ZSh1LDAsYyx2KSx2b2lkIDAhPT1zPyhpJiZzPjAmJm4udHJhbnNsYXRlKGksLTEqYSxjKSxvJiZzPDAmJm4udHJhbnNsYXRlKG8sYSxjKSk6KGkmJm4udHJhbnNsYXRlKGksLTEqYSxjKSxvJiZuLnRyYW5zbGF0ZShvLGEsYykpKX0sMTApfX0sbmV4dDpmdW5jdGlvbigpe3RoaXMuZG9BbmltYXRlKFwibmV4dFwiKX0scHJldjpmdW5jdGlvbigpe3RoaXMuZG9BbmltYXRlKFwicHJldlwiKX0sb25Ub3VjaFN0YXJ0OmZ1bmN0aW9uKHQpe2lmKCF0aGlzLm5vRHJhZyl7dmFyIGU9dGhpcy4kZWwsbj10aGlzLmRyYWdTdGF0ZSxyPXQudG91Y2hlc1swXTtuLnN0YXJ0VGltZT1uZXcgRGF0ZSxuLnN0YXJ0TGVmdD1yLnBhZ2VYLG4uc3RhcnRUb3A9ci5wYWdlWSxuLnN0YXJ0VG9wQWJzb2x1dGU9ci5jbGllbnRZLG4ucGFnZVdpZHRoPWUub2Zmc2V0V2lkdGgsbi5wYWdlSGVpZ2h0PWUub2Zmc2V0SGVpZ2h0O3ZhciBpPXRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXgtMV0sbz10aGlzLiRjaGlsZHJlblt0aGlzLmluZGV4XSx1PXRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXgrMV07dGhpcy5jb250aW51b3VzJiZ0aGlzLnBhZ2VzLmxlbmd0aD4xJiYoaXx8KGk9dGhpcy4kY2hpbGRyZW5bdGhpcy4kY2hpbGRyZW4ubGVuZ3RoLTFdKSx1fHwodT10aGlzLiRjaGlsZHJlblswXSkpLG4ucHJldlBhZ2U9aT9pLiRlbDpudWxsLG4uZHJhZ1BhZ2U9bz9vLiRlbDpudWxsLG4ubmV4dFBhZ2U9dT91LiRlbDpudWxsLG4ucHJldlBhZ2UmJihuLnByZXZQYWdlLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiKSxuLm5leHRQYWdlJiYobi5uZXh0UGFnZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIil9fSxvblRvdWNoTW92ZTpmdW5jdGlvbih0KXtpZighdGhpcy5ub0RyYWcpe3ZhciBlPXRoaXMuZHJhZ1N0YXRlLG49dC50b3VjaGVzWzBdO2UuY3VycmVudExlZnQ9bi5wYWdlWCxlLmN1cnJlbnRUb3A9bi5wYWdlWSxlLmN1cnJlbnRUb3BBYnNvbHV0ZT1uLmNsaWVudFk7dmFyIHI9ZS5jdXJyZW50TGVmdC1lLnN0YXJ0TGVmdCxpPWUuY3VycmVudFRvcEFic29sdXRlLWUuc3RhcnRUb3BBYnNvbHV0ZSxvPU1hdGguYWJzKHIpLHU9TWF0aC5hYnMoaSk7aWYobzw1fHxvPj01JiZ1Pj0xLjczKm8pcmV0dXJuIHZvaWQodGhpcy51c2VyU2Nyb2xsaW5nPSEwKTt0aGlzLnVzZXJTY3JvbGxpbmc9ITEsdC5wcmV2ZW50RGVmYXVsdCgpLHI9TWF0aC5taW4oTWF0aC5tYXgoMS1lLnBhZ2VXaWR0aCxyKSxlLnBhZ2VXaWR0aC0xKTt2YXIgYT1yPDA/XCJuZXh0XCI6XCJwcmV2XCI7ZS5wcmV2UGFnZSYmXCJwcmV2XCI9PT1hJiZ0aGlzLnRyYW5zbGF0ZShlLnByZXZQYWdlLHItZS5wYWdlV2lkdGgpLHRoaXMudHJhbnNsYXRlKGUuZHJhZ1BhZ2UsciksZS5uZXh0UGFnZSYmXCJuZXh0XCI9PT1hJiZ0aGlzLnRyYW5zbGF0ZShlLm5leHRQYWdlLHIrZS5wYWdlV2lkdGgpfX0sb25Ub3VjaEVuZDpmdW5jdGlvbigpe2lmKCF0aGlzLm5vRHJhZyl7dmFyIHQ9dGhpcy5kcmFnU3RhdGUsZT1uZXcgRGF0ZS10LnN0YXJ0VGltZSxuPW51bGwscj10LmN1cnJlbnRMZWZ0LXQuc3RhcnRMZWZ0LGk9dC5jdXJyZW50VG9wLXQuc3RhcnRUb3Asbz10LnBhZ2VXaWR0aCx1PXRoaXMuaW5kZXgsYT10aGlzLnBhZ2VzLmxlbmd0aDtpZihlPDMwMCl7dmFyIHM9TWF0aC5hYnMocik8NSYmTWF0aC5hYnMoaSk8NTsoaXNOYU4ocil8fGlzTmFOKGkpKSYmKHM9ITApLHMmJnRoaXMuJGNoaWxkcmVuW3RoaXMuaW5kZXhdLiRlbWl0KFwidGFwXCIpfWU8MzAwJiZ2b2lkIDA9PT10LmN1cnJlbnRMZWZ0fHwoKGU8MzAwfHxNYXRoLmFicyhyKT5vLzIpJiYobj1yPDA/XCJuZXh0XCI6XCJwcmV2XCIpLHRoaXMuY29udGludW91c3x8KDA9PT11JiZcInByZXZcIj09PW58fHU9PT1hLTEmJlwibmV4dFwiPT09bikmJihuPW51bGwpLHRoaXMuJGNoaWxkcmVuLmxlbmd0aDwyJiYobj1udWxsKSx0aGlzLmRvQW5pbWF0ZShuLHtvZmZzZXRMZWZ0OnIscGFnZVdpZHRoOnQucGFnZVdpZHRoLHByZXZQYWdlOnQucHJldlBhZ2UsY3VycmVudFBhZ2U6dC5kcmFnUGFnZSxuZXh0UGFnZTp0Lm5leHRQYWdlfSksdGhpcy5kcmFnU3RhdGU9e30pfX0sY2xlYXJUaW1lcjpmdW5jdGlvbigpe2NsZWFySW50ZXJ2YWwodGhpcy50aW1lciksdGhpcy50aW1lcj1udWxsfX0sZGVzdHJveWVkOmZ1bmN0aW9uKCl7dGhpcy50aW1lciYmKGNsZWFySW50ZXJ2YWwodGhpcy50aW1lciksdGhpcy50aW1lcj1udWxsKSx0aGlzLnJlSW5pdFRpbWVyJiYoY2xlYXJUaW1lb3V0KHRoaXMucmVJbml0VGltZXIpLHRoaXMucmVJbml0VGltZXI9bnVsbCl9LHdhdGNoOntpbmRleDpmdW5jdGlvbih0KXt0aGlzLiRlbWl0KFwiY2hhbmdlXCIsdCl9fX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKHQsZSl7aWYoIXR8fCFlKXJldHVybiExO2lmKC0xIT09ZS5pbmRleE9mKFwiIFwiKSl0aHJvdyBuZXcgRXJyb3IoXCJjbGFzc05hbWUgc2hvdWxkIG5vdCBjb250YWluIHNwYWNlLlwiKTtyZXR1cm4gdC5jbGFzc0xpc3Q/dC5jbGFzc0xpc3QuY29udGFpbnMoZSk6KFwiIFwiK3QuY2xhc3NOYW1lK1wiIFwiKS5pbmRleE9mKFwiIFwiK2UrXCIgXCIpPi0xfWZ1bmN0aW9uIGkodCxlKXtpZih0KXtmb3IodmFyIG49dC5jbGFzc05hbWUsaT0oZXx8XCJcIikuc3BsaXQoXCIgXCIpLG89MCx1PWkubGVuZ3RoO288dTtvKyspe3ZhciBhPWlbb107YSYmKHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LmFkZChhKTpyKHQsYSl8fChuKz1cIiBcIithKSl9dC5jbGFzc0xpc3R8fCh0LmNsYXNzTmFtZT1uKX19ZnVuY3Rpb24gbyh0LGUpe2lmKHQmJmUpe2Zvcih2YXIgbj1lLnNwbGl0KFwiIFwiKSxpPVwiIFwiK3QuY2xhc3NOYW1lK1wiIFwiLG89MCx1PW4ubGVuZ3RoO288dTtvKyspe3ZhciBhPW5bb107YSYmKHQuY2xhc3NMaXN0P3QuY2xhc3NMaXN0LnJlbW92ZShhKTpyKHQsYSkmJihpPWkucmVwbGFjZShcIiBcIithK1wiIFwiLFwiIFwiKSkpfXQuY2xhc3NMaXN0fHwodC5jbGFzc05hbWU9ZihpKSl9fW4uZChlLFwiYlwiLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KSxlLmE9aSxlLmM9bzt2YXIgdT1uKDY3KSxhPShuLm4odSksbigxMCkpLHM9bi5uKGEpLGM9cy5hLnByb3RvdHlwZS4kaXNTZXJ2ZXIsZj0oY3x8TnVtYmVyKGRvY3VtZW50LmRvY3VtZW50TW9kZSksZnVuY3Rpb24odCl7cmV0dXJuKHR8fFwiXCIpLnJlcGxhY2UoL15bXFxzXFx1RkVGRl0rfFtcXHNcXHVGRUZGXSskL2csXCJcIil9KSxsPWZ1bmN0aW9uKCl7cmV0dXJuIWMmJmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24odCxlLG4pe3QmJmUmJm4mJnQuYWRkRXZlbnRMaXN0ZW5lcihlLG4sITEpfTpmdW5jdGlvbih0LGUsbil7dCYmZSYmbiYmdC5hdHRhY2hFdmVudChcIm9uXCIrZSxuKX19KCkscD1mdW5jdGlvbigpe3JldHVybiFjJiZkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyP2Z1bmN0aW9uKHQsZSxuKXt0JiZlJiZ0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxuLCExKX06ZnVuY3Rpb24odCxlLG4pe3QmJmUmJnQuZGV0YWNoRXZlbnQoXCJvblwiK2Usbil9fSgpLGg9ZnVuY3Rpb24odCxlLG4pe2wodCxlLGZ1bmN0aW9uIHIoKXtuJiZuLmFwcGx5KHRoaXMsYXJndW1lbnRzKSxwKHQsZSxyKX0pfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e3JlbmRlcjpmdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10LiRjcmVhdGVFbGVtZW50LG49dC5fc2VsZi5fY3x8ZTtyZXR1cm4gbihcImRpdlwiLHtzdGF0aWNDbGFzczpcInd2LXN3aXBlXCIsc3R5bGU6e2hlaWdodDp0LmhlaWdodCtcInB4XCJ9fSxbbihcImRpdlwiLHtyZWY6XCJ3cmFwcGVyXCIsc3RhdGljQ2xhc3M6XCJ3di1zd2lwZS13cmFwcGVyXCJ9LFt0Ll90KFwiZGVmYXVsdFwiKV0sMiksdC5fdihcIiBcIiksbihcImRpdlwiLHtkaXJlY3RpdmVzOlt7bmFtZTpcInNob3dcIixyYXdOYW1lOlwidi1zaG93XCIsdmFsdWU6dC5zaG93SW5kaWNhdG9ycyxleHByZXNzaW9uOlwic2hvd0luZGljYXRvcnNcIn1dLHN0YXRpY0NsYXNzOlwid3Ytc3dpcGUtaW5kaWNhdG9yc1wifSx0Ll9sKHQucGFnZXMsZnVuY3Rpb24oZSxyKXtyZXR1cm4gbihcImRpdlwiLHtrZXk6cixzdGF0aWNDbGFzczpcInd2LXN3aXBlLWluZGljYXRvclwiLGNsYXNzOntcImlzLWFjdGl2ZVwiOnI9PT10LmluZGV4fX0pfSkpXSl9LHN0YXRpY1JlbmRlckZuczpbXX19XSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2UtdnVlL2xpYi9zd2lwZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiA4IDEwIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ4ZDcwZGM1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhdGVnb3J5LnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiMDBhMGRlYTJcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNDhkNzBkYzVcXFwiLFxcXCJzY29wZWRcXFwiOmZhbHNlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wIS4vY2F0ZWdvcnkudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTQ4ZDcwZGM1XFxcIixcXFwic2NvcGVkXFxcIjpmYWxzZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL2NhdGVnb3J5LnZ1ZVwiKTtcbiAgICAgaWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgIH0pO1xuIH1cbiAvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG4gbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlciEuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi00OGQ3MGRjNVwiLFwic2NvcGVkXCI6ZmFsc2UsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlXG4vLyBtb2R1bGUgaWQgPSA2NDlcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSh0cnVlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5sZWZ0LXNpZGViYXIge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgd2lkdGg6IDVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB6LWluZGV4OiAyMDA7XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxufVxcbi5sZWZ0LXNpZGViYXIgLnNpZGViYXItaXRlbSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDFlbSAwO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2O1xcbn1cXG4ubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0uYWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbiAgICAgIGNvbG9yOiByZWQ7XFxufVxcbi5yaWdodC1wYW5lbCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGxlZnQ6IDVlbTtcXG4gIHJpZ2h0OiAwO1xcbiAgdG9wOiAwO1xcbiAgYm90dG9tOiA1MHB4O1xcbiAgcGFkZGluZzogLjVlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBvdmVyZmxvdy15OiBzY3JvbGw7XFxufVxcbi5yaWdodC1wYW5lbCAuYmFubmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZmxvdzogcm93IHdyYXA7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGNvbHVtbi1jb3VudDogMjtcXG59XFxuLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSB7XFxuICAgICAgd2lkdGg6IDQ5LjUlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC50aHVtYm5haWwge1xcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxufVxcbi5yaWdodC1wYW5lbCAucHJvZHVjdC1saXN0IC5wcm9kdWN0LWl0ZW0gLm5hbWUge1xcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICAgICAgY29sb3I6ICM0NDQ7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbn1cXG4ucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5wcmljZSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGNvbG9yOiAjZjAwO1xcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovVVBVUFcvdmhvc3RzL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixPQUFPO0VBQ1AsUUFBUTtFQUNSLGFBQWE7RUFDYixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixtQkFBbUI7Q0FBRTtBQUNyQjtJQUNFLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUNBQWlDO0NBQUU7QUFDbkM7TUFDRSwwQkFBMEI7TUFDMUIsV0FBVztDQUFFO0FBRW5CO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixVQUFVO0VBQ1YsU0FBUztFQUNULE9BQU87RUFDUCxhQUFhO0VBQ2IsY0FBYztFQUNkLDBCQUEwQjtFQUMxQixtQkFBbUI7RUFDbkIsbUJBQW1CO0NBQUU7QUFDckI7SUFDRSxlQUFlO0lBQ2YsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixvQkFBb0I7Q0FBRTtBQUN4QjtJQUNFLGNBQWM7SUFDZCxvQkFBb0I7SUFDcEIsK0JBQStCO0lBQy9CLFlBQVk7SUFDWixnQkFBZ0I7Q0FBRTtBQUNsQjtNQUNFLGFBQWE7TUFDYix1QkFBdUI7TUFDdkIsbUJBQW1CO0NBQUU7QUFDckI7UUFDRSxlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLFlBQVk7Q0FBRTtBQUNoQjtRQUNFLGdCQUFnQjtRQUNoQixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4QixvQkFBb0I7Q0FBRTtBQUN4QjtRQUNFLGVBQWU7UUFDZixZQUFZO1FBQ1osZ0JBQWdCO0NBQUVcIixcImZpbGVcIjpcImNhdGVnb3J5LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubGVmdC1zaWRlYmFyIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogNTBweDtcXG4gIHdpZHRoOiA1ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgei1pbmRleDogMjAwO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyB9XFxuICAubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBwYWRkaW5nOiAxZW0gMDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y2ZjZmNjsgfVxcbiAgICAubGVmdC1zaWRlYmFyIC5zaWRlYmFyLWl0ZW0uYWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmYyO1xcbiAgICAgIGNvbG9yOiByZWQ7IH1cXG5cXG4ucmlnaHQtcGFuZWwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiA1ZW07XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogNTBweDtcXG4gIHBhZGRpbmc6IC41ZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyB9XFxuICAucmlnaHQtcGFuZWwgLmJhbm5lciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTsgfVxcbiAgLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3Qge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBjb2x1bW4tY291bnQ6IDI7IH1cXG4gICAgLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSB7XFxuICAgICAgd2lkdGg6IDQ5LjUlO1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogNXB4OyB9XFxuICAgICAgLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAudGh1bWJuYWlsIHtcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICAgIHdpZHRoOiAxMDAlOyB9XFxuICAgICAgLnJpZ2h0LXBhbmVsIC5wcm9kdWN0LWxpc3QgLnByb2R1Y3QtaXRlbSAubmFtZSB7XFxuICAgICAgICBmb250LXNpemU6IDE0cHg7XFxuICAgICAgICBjb2xvcjogIzQ0NDtcXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7IH1cXG4gICAgICAucmlnaHQtcGFuZWwgLnByb2R1Y3QtbGlzdCAucHJvZHVjdC1pdGVtIC5wcmljZSB7XFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgIGNvbG9yOiAjZjAwO1xcbiAgICAgICAgZm9udC1zaXplOiAxM3B4OyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTQ4ZDcwZGM1XCIsXCJzY29wZWRcIjpmYWxzZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvc2hvcC9wYWdlcy9jYXRlZ29yeS52dWVcbi8vIG1vZHVsZSBpZCA9IDY1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDgiLCI8dGVtcGxhdGU+XHJcbiAgPGRpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJsZWZ0LXNpZGViYXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItaXRlbVwiIDpjbGFzcz1cInsgJ2FjdGl2ZSc6IGNhdGVnb3J5LmlkID09PSBhY3RpdmVDYXRlZ29yeUlkIH1cIiB2LWZvcj1cImNhdGVnb3J5IGluIGNhdGVnb3JpZXNcIiA6a2V5PVwiY2F0ZWdvcnkuaWRcIiBAY2xpY2s9XCJzaWRlYmFySXRlbUNsaWNrKGNhdGVnb3J5LmlkKVwiPlxyXG4gICAgICAgIHt7IGNhdGVnb3J5Lm5hbWUgfX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIFxyXG4gICAgPGRpdiBjbGFzcz1cInJpZ2h0LXBhbmVsXCI+XHJcbiAgICAgIDxpbWcgY2xhc3M9XCJiYW5uZXJcIiBzcmM9XCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjQwLzE1MC8/Mjg0MjNcIiBhbHQ9XCJcIi8+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1saXN0XCI+XHJcbiAgICAgICAgPHJvdXRlci1saW5rIGNsYXNzPVwicHJvZHVjdC1pdGVtXCIgdG89XCIvcHJvZHVjdC8xXCIgdi1mb3I9XCJwcm9kdWN0IGluIHByb2R1Y3RzLmRhdGFcIiA6a2V5PVwicHJvZHVjdC5pZFwiPlxyXG4gICAgICAgICAgPGltZyA6c3JjPVwicHJvZHVjdC50aHVtYm5haWxcIiBhbHQ9XCJcIiBjbGFzcz1cInRodW1ibmFpbFwiLz5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+e3sgcHJvZHVjdC5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIj57eyBwcm9kdWN0LnByaWNlIHwgcHJpY2VGaWx0ZXIgfX08L2Rpdj5cclxuICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgeyBTd2lwZSwgU3dpcGVJdGVtIH0gZnJvbSAnd2UtdnVlJ1xyXG4gIGltcG9ydCBwcmljZU1peGluIGZyb20gJy4uL21peGlucy9wcmljZV9maWx0ZXInXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXBvbmVudHM6IHtcclxuICAgICAgW1N3aXBlLm5hbWVdOiBTd2lwZSxcclxuICAgICAgW1N3aXBlSXRlbS5uYW1lXTogU3dpcGVJdGVtXHJcbiAgICB9LFxyXG5cclxuICAgIG1peGluczogW1xyXG4gICAgICBwcmljZU1peGluXHJcbiAgICBdLFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhdGVnb3JpZXM6IFtdLFxyXG4gICAgICAgIGFjdGl2ZUNhdGVnb3J5SWQ6IG51bGwsXHJcbiAgICAgICAgcHJvZHVjdHM6IFtdXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMuZ2V0Q2F0ZWdvcmllcygpXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgZ2V0Q2F0ZWdvcmllcyAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5nZXQoJ3Byb2R1Y3QtY2F0ZWdvcmllcycpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhdGVnb3JpZXMgPSByZXNwb25zZS5kYXRhLmNhdGVnb3JpZXNcclxuXHJcbiAgICAgICAgICB0aGlzLmFjdGl2ZUNhdGVnb3J5SWQgPSB0aGlzLmNhdGVnb3JpZXNbMF0uaWRcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgZ2V0UHJvZHVjdHMgKGNhdGVnb3J5SWQpIHtcclxuICAgICAgICB0aGlzLmF4aW9zLmdldCgncHJvZHVjdCcsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBjYXRlZ29yeUlkOiBjYXRlZ29yeUlkXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdHMgPSByZXNwb25zZS5kYXRhLnByb2R1Y3RzXHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICB9KVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgc2lkZWJhckl0ZW1DbGljayAoY2F0ZWdvcnlJZCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUNhdGVnb3J5SWQgIT09IGNhdGVnb3J5SWQpIHRoaXMuYWN0aXZlQ2F0ZWdvcnlJZCA9IGNhdGVnb3J5SWRcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBhY3RpdmVDYXRlZ29yeUlkICh2YWwpIHtcclxuICAgICAgICB0aGlzLmdldFByb2R1Y3RzKHZhbClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cclxuICAkc2lkZWJhci13aWR0aDogNWVtO1xyXG5cclxuICAubGVmdC1zaWRlYmFyIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIGJvdHRvbTogNTBweDtcclxuICAgIHdpZHRoOiAkc2lkZWJhci13aWR0aDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICB6LWluZGV4OiAyMDA7XHJcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XHJcblxyXG4gICAgLnNpZGViYXItaXRlbSB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDFlbSAwO1xyXG4gICAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjZmNmY2O1xyXG4gICAgICBcclxuICAgICAgJi5hY3RpdmUge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7XHJcbiAgICAgICAgY29sb3I6IHJlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnJpZ2h0LXBhbmVsIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbGVmdDogJHNpZGViYXItd2lkdGg7XHJcbiAgICByaWdodDogMDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogNTBweDtcclxuICAgIHBhZGRpbmc6IC41ZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xyXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xyXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xyXG4gICAgXHJcbiAgICAuYmFubmVyIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAucHJvZHVjdC1saXN0IHtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgICAgZmxleC1mbG93OiByb3cgd3JhcDtcclxuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgY29sdW1uLWNvdW50OiAyO1xyXG5cclxuICAgICAgLnByb2R1Y3QtaXRlbSB7XHJcbiAgICAgICAgd2lkdGg6IDQ5LjUlO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xyXG5cclxuICAgICAgICAudGh1bWJuYWlsIHtcclxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAubmFtZSB7XHJcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICAgICAgICBjb2xvcjogIzQ0NDtcclxuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAucHJpY2Uge1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBjb2xvcjogI2YwMDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjYXRlZ29yeS52dWU/MmIxNjU1NzYiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwiZGl2XCIsIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcImxlZnQtc2lkZWJhclwiIH0sXG4gICAgICBfdm0uX2woX3ZtLmNhdGVnb3JpZXMsIGZ1bmN0aW9uKGNhdGVnb3J5KSB7XG4gICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGtleTogY2F0ZWdvcnkuaWQsXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzaWRlYmFyLWl0ZW1cIixcbiAgICAgICAgICAgIGNsYXNzOiB7IGFjdGl2ZTogY2F0ZWdvcnkuaWQgPT09IF92bS5hY3RpdmVDYXRlZ29yeUlkIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3ZtLnNpZGViYXJJdGVtQ2xpY2soY2F0ZWdvcnkuaWQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICBcIiArIF92bS5fcyhjYXRlZ29yeS5uYW1lKSArIFwiXFxuICAgIFwiKV1cbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJyaWdodC1wYW5lbFwiIH0sIFtcbiAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6IFwiYmFubmVyXCIsXG4gICAgICAgIGF0dHJzOiB7IHNyYzogXCJodHRwOi8vbG9yZW1waXhlbC5jb20vNjQwLzE1MC8/Mjg0MjNcIiwgYWx0OiBcIlwiIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInByb2R1Y3QtbGlzdFwiIH0sXG4gICAgICAgIF92bS5fbChfdm0ucHJvZHVjdHMuZGF0YSwgZnVuY3Rpb24ocHJvZHVjdCkge1xuICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgIFwicm91dGVyLWxpbmtcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAga2V5OiBwcm9kdWN0LmlkLFxuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJwcm9kdWN0LWl0ZW1cIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdG86IFwiL3Byb2R1Y3QvMVwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYm5haWxcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IHByb2R1Y3QudGh1bWJuYWlsLCBhbHQ6IFwiXCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJuYW1lXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MocHJvZHVjdC5uYW1lKSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicHJpY2VcIiB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uX2YoXCJwcmljZUZpbHRlclwiKShwcm9kdWN0LnByaWNlKSkpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIF0pXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKS5yZXJlbmRlcihcImRhdGEtdi00OGQ3MGRjNVwiLCBtb2R1bGUuZXhwb3J0cylcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNDhkNzBkYzVcIixcImhhc1Njb3BlZFwiOmZhbHNlfSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3Nob3AvcGFnZXMvY2F0ZWdvcnkudnVlXG4vLyBtb2R1bGUgaWQgPSA2NTJcbi8vIG1vZHVsZSBjaHVua3MgPSA4Il0sInNvdXJjZVJvb3QiOiIifQ==