webpackJsonp([17],{

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(679)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(681)
/* template */
var __vue_template__ = __webpack_require__(682)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ee646100"
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
Component.options.__file = "resources\\assets\\js\\admin\\pages\\dashboard.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ee646100", Component.options)
  } else {
    hotAPI.reload("data-v-ee646100", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 679:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(680);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("f607bd1a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ee646100\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./dashboard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ee646100\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./dashboard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 680:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(74)(true);
// imports


// module
exports.push([module.i, "\n.setting-icon[data-v-ee646100] {\n  color: #777;\n  cursor: pointer;\n}\n.account-info[data-v-ee646100] {\n  padding: 0;\n  margin: 0;\n}\n.account-info li[data-v-ee646100] {\n    margin: .5em 0;\n    color: #444;\n}\n.account-info .label[data-v-ee646100] {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em;\n}\n.plus-card[data-v-ee646100] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative;\n}\n.plus-card i[data-v-ee646100] {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/admin/pages/dashboard.vue"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,gBAAgB;CAAE;AAEpB;EACE,WAAW;EACX,UAAU;CAAE;AACZ;IACE,eAAe;IACf,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,eAAe;IACf,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,kBAAkB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,SAAS;IACT,UAAU;IACV,oBAAoB;IACpB,qBAAqB;CAAE","file":"dashboard.vue","sourcesContent":[".setting-icon {\n  color: #777;\n  cursor: pointer; }\n\n.account-info {\n  padding: 0;\n  margin: 0; }\n  .account-info li {\n    margin: .5em 0;\n    color: #444; }\n  .account-info .label {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em; }\n\n.plus-card {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative; }\n  .plus-card i {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

// import userConfig from '../config'

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },
  mounted: function mounted() {
    this.axios.get('user').then(function (response) {
      // this.accounts = response.data.accounts;
      // window.localStorage.setItem(userConfig.accountsKey, JSON.stringify(response.data.accounts));
    }).catch(function (error) {
      console.log(error);
    });
  },


  methods: {}
});

/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main-container main-with-padding" },
    [
      _vm._v("\n  adfasdfasdf\n  "),
      _c(
        "el-row",
        { attrs: { gutter: 20, type: "flex", justify: "center" } },
        [
          _c("el-col", { attrs: { span: 6 } }, [
            _c("h1", [_vm._v("dashboard")])
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-ee646100", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlP2ZhYTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlP2FlMWYiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWU/MDI4YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFxTTtBQUNyTTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNGQ7QUFDNWQ7QUFDQSw4Q0FBa0w7QUFDbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzVDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLDJEQUE0RCxnQkFBZ0Isb0JBQW9CLEdBQUcsa0NBQWtDLGVBQWUsY0FBYyxHQUFHLHFDQUFxQyxxQkFBcUIsa0JBQWtCLEdBQUcseUNBQXlDLGtCQUFrQixxQkFBcUIsa0JBQWtCLGlCQUFpQiwrQkFBK0Isd0JBQXdCLEdBQUcsK0JBQStCLG1CQUFtQixxQkFBcUIsMkJBQTJCLGlCQUFpQix1QkFBdUIsR0FBRyxpQ0FBaUMseUJBQXlCLHNCQUFzQix1QkFBdUIsZUFBZSxnQkFBZ0IsMEJBQTBCLDJCQUEyQixHQUFHLFVBQVUsaUhBQWlILEtBQUssVUFBVSxZQUFZLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxLQUFLLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSwrREFBK0QsZ0JBQWdCLG9CQUFvQixFQUFFLG1CQUFtQixlQUFlLGNBQWMsRUFBRSxzQkFBc0IscUJBQXFCLGtCQUFrQixFQUFFLDBCQUEwQixrQkFBa0IscUJBQXFCLGtCQUFrQixpQkFBaUIsK0JBQStCLHdCQUF3QixFQUFFLGdCQUFnQixtQkFBbUIscUJBQXFCLDJCQUEyQixpQkFBaUIsdUJBQXVCLEVBQUUsa0JBQWtCLHlCQUF5QixzQkFBc0IsdUJBQXVCLGVBQWUsZ0JBQWdCLDBCQUEwQiwyQkFBMkIsRUFBRSxxQkFBcUI7O0FBRWwyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0tBOztBQUVBO3dCQUVBO1dBQ0E7QUFFQTs4QkFDQTtvREFDQTtBQUNBO0FBQ0E7OEJBQ0E7a0JBQ0E7QUFDQTtBQUVBOzs7V0FDQTtBQWRBLEc7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGtEQUFrRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyw4Q0FBOEMsRUFBRTtBQUNsRTtBQUNBLHdCQUF3QixTQUFTLFVBQVUsRUFBRTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImpzLzE3LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpc3Bvc2VkID0gZmFsc2VcbmZ1bmN0aW9uIGluamVjdFN0eWxlIChzc3JDb250ZXh0KSB7XG4gIGlmIChkaXNwb3NlZCkgcmV0dXJuXG4gIHJlcXVpcmUoXCIhIXZ1ZS1zdHlsZS1sb2FkZXIhY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4P3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lZTY0NjEwMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSFzYXNzLWxvYWRlciEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9kYXNoYm9hcmQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vZGFzaGJvYXJkLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWU2NDYxMDBcXFwiLFxcXCJoYXNTY29wZWRcXFwiOnRydWUsXFxcImJ1YmxlXFxcIjp7XFxcInRyYW5zZm9ybXNcXFwiOnt9fX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCZidXN0Q2FjaGUhLi9kYXNoYm9hcmQudnVlXCIpXG4vKiB0ZW1wbGF0ZSBmdW5jdGlvbmFsICovXG52YXIgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fID0gZmFsc2Vcbi8qIHN0eWxlcyAqL1xudmFyIF9fdnVlX3N0eWxlc19fID0gaW5qZWN0U3R5bGVcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBcImRhdGEtdi1lZTY0NjEwMFwiXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJyZXNvdXJjZXNcXFxcYXNzZXRzXFxcXGpzXFxcXGFkbWluXFxcXHBhZ2VzXFxcXGRhc2hib2FyZC52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtZWU2NDYxMDBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi1lZTY0NjEwMFwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA1ODJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lZTY0NjEwMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9kYXNoYm9hcmQudnVlXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXNDbGllbnQuanNcIikoXCJmNjA3YmQxYVwiLCBjb250ZW50LCBmYWxzZSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG4gLy8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3NcbiBpZighY29udGVudC5sb2NhbHMpIHtcbiAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lZTY0NjEwMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9kYXNoYm9hcmQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWVlNjQ2MTAwXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2Rhc2hib2FyZC52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZWU2NDYxMDBcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA2Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodHJ1ZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uc2V0dGluZy1pY29uW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5hY2NvdW50LWluZm9bZGF0YS12LWVlNjQ2MTAwXSB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG4uYWNjb3VudC1pbmZvIGxpW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgICBtYXJnaW46IC41ZW0gMDtcXG4gICAgY29sb3I6ICM0NDQ7XFxufVxcbi5hY2NvdW50LWluZm8gLmxhYmVsW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIGZsb2F0OiBsZWZ0O1xcbiAgICB3aWR0aDogNGVtO1xcbiAgICB0ZXh0LWFsaWduLWxhc3Q6IGp1c3RpZnk7XFxuICAgIG1hcmdpbi1yaWdodDogMWVtO1xcbn1cXG4ucGx1cy1jYXJkW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuLnBsdXMtY2FyZCBpW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGZvbnQtc2l6ZTogM3JlbTtcXG4gICAgY29sb3I6IGxpZ2h0Z3JheTtcXG4gICAgdG9wOiA1MCU7XFxuICAgIGxlZnQ6IDUwJTtcXG4gICAgbWFyZ2luLXRvcDogLTEuNXJlbTtcXG4gICAgbWFyZ2luLWxlZnQ6IC0xLjVyZW07XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9Db2RlL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxZQUFZO0VBQ1osZ0JBQWdCO0NBQUU7QUFFcEI7RUFDRSxXQUFXO0VBQ1gsVUFBVTtDQUFFO0FBQ1o7SUFDRSxlQUFlO0lBQ2YsWUFBWTtDQUFFO0FBQ2hCO0lBQ0UsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0lBQ1osV0FBVztJQUNYLHlCQUF5QjtJQUN6QixrQkFBa0I7Q0FBRTtBQUV4QjtFQUNFLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYixtQkFBbUI7Q0FBRTtBQUNyQjtJQUNFLG1CQUFtQjtJQUNuQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLFNBQVM7SUFDVCxVQUFVO0lBQ1Ysb0JBQW9CO0lBQ3BCLHFCQUFxQjtDQUFFXCIsXCJmaWxlXCI6XCJkYXNoYm9hcmQudnVlXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi5zZXR0aW5nLWljb24ge1xcbiAgY29sb3I6ICM3Nzc7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uYWNjb3VudC1pbmZvIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7IH1cXG4gIC5hY2NvdW50LWluZm8gbGkge1xcbiAgICBtYXJnaW46IC41ZW0gMDtcXG4gICAgY29sb3I6ICM0NDQ7IH1cXG4gIC5hY2NvdW50LWluZm8gLmxhYmVsIHtcXG4gICAgY29sb3I6ICMwMDA7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDRlbTtcXG4gICAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDFlbTsgfVxcblxcbi5wbHVzLWNhcmQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcbiAgLnBsdXMtY2FyZCBpIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBmb250LXNpemU6IDNyZW07XFxuICAgIGNvbG9yOiBsaWdodGdyYXk7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIG1hcmdpbi10b3A6IC0xLjVyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAtMS41cmVtOyB9XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWVlNjQ2MTAwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTciLCI8dGVtcGxhdGU+XHJcbiAgPGRpdiBjbGFzcz1cIm1haW4tY29udGFpbmVyIG1haW4td2l0aC1wYWRkaW5nXCI+XHJcbiAgICBhZGZhc2RmYXNkZlxyXG4gICAgPGVsLXJvdyA6Z3V0dGVyPVwiMjBcIiB0eXBlPVwiZmxleFwiIGp1c3RpZnk9XCJjZW50ZXJcIj5cclxuICAgICAgPGVsLWNvbCA6c3Bhbj1cIjZcIj5cclxuICAgICAgICA8aDE+ZGFzaGJvYXJkPC9oMT5cclxuICAgICAgPC9lbC1jb2w+XHJcbiAgICA8L2VsLXJvdz5cclxuICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcbiAgLy8gaW1wb3J0IHVzZXJDb25maWcgZnJvbSAnLi4vY29uZmlnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCB7XHJcbiAgICBkYXRhICgpIHtcclxuICAgICAgcmV0dXJuIHt9XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdW50ZWQgKCkge1xyXG4gICAgICB0aGlzLmF4aW9zLmdldCgndXNlcicpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgLy8gdGhpcy5hY2NvdW50cyA9IHJlc3BvbnNlLmRhdGEuYWNjb3VudHM7XHJcbiAgICAgICAgLy8gd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHVzZXJDb25maWcuYWNjb3VudHNLZXksIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEuYWNjb3VudHMpKTtcclxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIG1ldGhvZHM6IHt9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAuc2V0dGluZy1pY29uIHtcclxuICAgIGNvbG9yOiAjNzc3O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxuXHJcbiAgLmFjY291bnQtaW5mbyB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG5cclxuICAgIGxpIHtcclxuICAgICAgbWFyZ2luOiAuNWVtIDA7XHJcbiAgICAgIGNvbG9yOiAjNDQ0O1xyXG4gICAgfVxyXG5cclxuICAgIC5sYWJlbCB7XHJcbiAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICAgIHdpZHRoOiA0ZW07XHJcbiAgICAgIHRleHQtYWxpZ24tbGFzdDoganVzdGlmeTtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAxZW07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAucGx1cy1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgaSB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgZm9udC1zaXplOiAzcmVtO1xyXG4gICAgICBjb2xvcjogbGlnaHRncmF5O1xyXG4gICAgICB0b3A6IDUwJTtcclxuICAgICAgbGVmdDogNTAlO1xyXG4gICAgICBtYXJnaW4tdG9wOiAtMS41cmVtO1xyXG4gICAgICBtYXJnaW4tbGVmdDogLTEuNXJlbTtcclxuICAgIH1cclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWU/OGQxNTNmOGMiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiZGl2XCIsXG4gICAgeyBzdGF0aWNDbGFzczogXCJtYWluLWNvbnRhaW5lciBtYWluLXdpdGgtcGFkZGluZ1wiIH0sXG4gICAgW1xuICAgICAgX3ZtLl92KFwiXFxuICBhZGZhc2RmYXNkZlxcbiAgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZWwtcm93XCIsXG4gICAgICAgIHsgYXR0cnM6IHsgZ3V0dGVyOiAyMCwgdHlwZTogXCJmbGV4XCIsIGp1c3RpZnk6IFwiY2VudGVyXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJlbC1jb2xcIiwgeyBhdHRyczogeyBzcGFuOiA2IH0gfSwgW1xuICAgICAgICAgICAgX2MoXCJoMVwiLCBbX3ZtLl92KFwiZGFzaGJvYXJkXCIpXSlcbiAgICAgICAgICBdKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtZWU2NDYxMDBcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWVlNjQ2MTAwXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlXG4vLyBtb2R1bGUgaWQgPSA2ODJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNyJdLCJzb3VyY2VSb290IjoiIn0=