webpackJsonp([17],{

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(683)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(685)
/* template */
var __vue_template__ = __webpack_require__(686)
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

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(684);
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

/***/ 684:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)(true);
// imports


// module
exports.push([module.i, "\n.setting-icon[data-v-ee646100] {\n  color: #777;\n  cursor: pointer;\n}\n.account-info[data-v-ee646100] {\n  padding: 0;\n  margin: 0;\n}\n.account-info li[data-v-ee646100] {\n    margin: .5em 0;\n    color: #444;\n}\n.account-info .label[data-v-ee646100] {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em;\n}\n.plus-card[data-v-ee646100] {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative;\n}\n.plus-card i[data-v-ee646100] {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/admin/pages/dashboard.vue"],"names":[],"mappings":";AAAA;EACE,YAAY;EACZ,gBAAgB;CAAE;AAEpB;EACE,WAAW;EACX,UAAU;CAAE;AACZ;IACE,eAAe;IACf,YAAY;CAAE;AAChB;IACE,YAAY;IACZ,eAAe;IACf,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,kBAAkB;CAAE;AAExB;EACE,eAAe;EACf,iBAAiB;EACjB,uBAAuB;EACvB,aAAa;EACb,mBAAmB;CAAE;AACrB;IACE,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,SAAS;IACT,UAAU;IACV,oBAAoB;IACpB,qBAAqB;CAAE","file":"dashboard.vue","sourcesContent":[".setting-icon {\n  color: #777;\n  cursor: pointer; }\n\n.account-info {\n  padding: 0;\n  margin: 0; }\n  .account-info li {\n    margin: .5em 0;\n    color: #444; }\n  .account-info .label {\n    color: #000;\n    display: block;\n    float: left;\n    width: 4em;\n    text-align-last: justify;\n    margin-right: 1em; }\n\n.plus-card {\n  display: block;\n  overflow: hidden;\n  background-color: #fff;\n  height: 100%;\n  position: relative; }\n  .plus-card i {\n    position: absolute;\n    font-size: 3rem;\n    color: lightgray;\n    top: 50%;\n    left: 50%;\n    margin-top: -1.5rem;\n    margin-left: -1.5rem; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 685:
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

/***/ 686:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlP2ZhYTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlP2FlMWYiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWU/MDI4YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBLHlCQUFxTTtBQUNyTTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNGQ7QUFDNWQ7QUFDQSw4Q0FBa0w7QUFDbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7OztBQzVDQTs7QUFFQTtBQUNBLHFDQUF3TztBQUN4TztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0pBQXNKLGlGQUFpRjtBQUN2TywrSkFBK0osaUZBQWlGO0FBQ2hQO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLGdDQUFnQyxVQUFVLEVBQUU7QUFDNUMsQzs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLDJEQUE0RCxnQkFBZ0Isb0JBQW9CLEdBQUcsa0NBQWtDLGVBQWUsY0FBYyxHQUFHLHFDQUFxQyxxQkFBcUIsa0JBQWtCLEdBQUcseUNBQXlDLGtCQUFrQixxQkFBcUIsa0JBQWtCLGlCQUFpQiwrQkFBK0Isd0JBQXdCLEdBQUcsK0JBQStCLG1CQUFtQixxQkFBcUIsMkJBQTJCLGlCQUFpQix1QkFBdUIsR0FBRyxpQ0FBaUMseUJBQXlCLHNCQUFzQix1QkFBdUIsZUFBZSxnQkFBZ0IsMEJBQTBCLDJCQUEyQixHQUFHLFVBQVUsaUhBQWlILEtBQUssVUFBVSxZQUFZLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxLQUFLLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsS0FBSyxNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxLQUFLLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSwrREFBK0QsZ0JBQWdCLG9CQUFvQixFQUFFLG1CQUFtQixlQUFlLGNBQWMsRUFBRSxzQkFBc0IscUJBQXFCLGtCQUFrQixFQUFFLDBCQUEwQixrQkFBa0IscUJBQXFCLGtCQUFrQixpQkFBaUIsK0JBQStCLHdCQUF3QixFQUFFLGdCQUFnQixtQkFBbUIscUJBQXFCLDJCQUEyQixpQkFBaUIsdUJBQXVCLEVBQUUsa0JBQWtCLHlCQUF5QixzQkFBc0IsdUJBQXVCLGVBQWUsZ0JBQWdCLDBCQUEwQiwyQkFBMkIsRUFBRSxxQkFBcUI7O0FBRWwyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0tBOztBQUVBO3dCQUVBO1dBQ0E7QUFFQTs4QkFDQTtvREFDQTtBQUNBO0FBQ0E7OEJBQ0E7a0JBQ0E7QUFDQTtBQUVBOzs7V0FDQTtBQWRBLEc7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLGtEQUFrRDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsU0FBUyw4Q0FBOEMsRUFBRTtBQUNsRTtBQUNBLHdCQUF3QixTQUFTLFVBQVUsRUFBRTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImpzL2FkbWluLWRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWU2NDYxMDBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vZGFzaGJvYXJkLnZ1ZVwiKVxufVxudmFyIG5vcm1hbGl6ZUNvbXBvbmVudCA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyXCIpXG4vKiBzY3JpcHQgKi9cbnZhciBfX3Z1ZV9zY3JpcHRfXyA9IHJlcXVpcmUoXCIhIWJhYmVsLWxvYWRlcj97XFxcImNhY2hlRGlyZWN0b3J5XFxcIjp0cnVlLFxcXCJwcmVzZXRzXFxcIjpbW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAyJVxcXCJdLFxcXCJ1Z2xpZnlcXFwiOnRydWV9fV0sW1xcXCJlbnZcXFwiLHtcXFwibW9kdWxlc1xcXCI6ZmFsc2UsXFxcInRhcmdldHNcXFwiOntcXFwiYnJvd3NlcnNcXFwiOltcXFwiPiAxJVxcXCIsXFxcImxhc3QgMiB2ZXJzaW9uc1xcXCIsXFxcIm5vdCBpZSA8PSA4XFxcIl19fV0sXFxcInN0YWdlLTJcXFwiXSxcXFwicGx1Z2luc1xcXCI6W1xcXCJ0cmFuc2Zvcm0tb2JqZWN0LXJlc3Qtc3ByZWFkXFxcIixbXFxcInRyYW5zZm9ybS1ydW50aW1lXFxcIix7XFxcInBvbHlmaWxsXFxcIjpmYWxzZSxcXFwiaGVscGVyc1xcXCI6ZmFsc2V9XSxcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLFtcXFwiaW1wb3J0XFxcIixbe1xcXCJsaWJyYXJ5TmFtZVxcXCI6XFxcIndlLXZ1ZVxcXCIsXFxcInN0eWxlXFxcIjpmYWxzZX1dXV19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wJmJ1c3RDYWNoZSEuL2Rhc2hib2FyZC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LWVlNjQ2MTAwXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vZGFzaGJvYXJkLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtZWU2NDYxMDBcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxhZG1pblxcXFxwYWdlc1xcXFxkYXNoYm9hcmQudnVlXCJcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWVlNjQ2MTAwXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtZWU2NDYxMDBcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNTg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTciLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWU2NDYxMDBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vZGFzaGJvYXJkLnZ1ZVwiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLXN0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzQ2xpZW50LmpzXCIpKFwiZjYwN2JkMWFcIiwgY29udGVudCwgZmFsc2UpO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuIC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG4gaWYoIWNvbnRlbnQubG9jYWxzKSB7XG4gICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZWU2NDYxMDBcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vZGFzaGJvYXJkLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1lZTY0NjEwMFxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9kYXNoYm9hcmQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LWVlNjQ2MTAwXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTciLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnNldHRpbmctaWNvbltkYXRhLXYtZWU2NDYxMDBdIHtcXG4gIGNvbG9yOiAjNzc3O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4uYWNjb3VudC1pbmZvW2RhdGEtdi1lZTY0NjEwMF0ge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG59XFxuLmFjY291bnQtaW5mbyBsaVtkYXRhLXYtZWU2NDYxMDBdIHtcXG4gICAgbWFyZ2luOiAuNWVtIDA7XFxuICAgIGNvbG9yOiAjNDQ0O1xcbn1cXG4uYWNjb3VudC1pbmZvIC5sYWJlbFtkYXRhLXYtZWU2NDYxMDBdIHtcXG4gICAgY29sb3I6ICMwMDA7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBmbG9hdDogbGVmdDtcXG4gICAgd2lkdGg6IDRlbTtcXG4gICAgdGV4dC1hbGlnbi1sYXN0OiBqdXN0aWZ5O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDFlbTtcXG59XFxuLnBsdXMtY2FyZFtkYXRhLXYtZWU2NDYxMDBdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi5wbHVzLWNhcmQgaVtkYXRhLXYtZWU2NDYxMDBdIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBmb250LXNpemU6IDNyZW07XFxuICAgIGNvbG9yOiBsaWdodGdyYXk7XFxuICAgIHRvcDogNTAlO1xcbiAgICBsZWZ0OiA1MCU7XFxuICAgIG1hcmdpbi10b3A6IC0xLjVyZW07XFxuICAgIG1hcmdpbi1sZWZ0OiAtMS41cmVtO1xcbn1cXG5cIiwgXCJcIiwge1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiRDovQ29kZS93aWxsc2hvcC9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWVcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIjtBQUFBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtDQUFFO0FBRXBCO0VBQ0UsV0FBVztFQUNYLFVBQVU7Q0FBRTtBQUNaO0lBQ0UsZUFBZTtJQUNmLFlBQVk7Q0FBRTtBQUNoQjtJQUNFLFlBQVk7SUFDWixlQUFlO0lBQ2YsWUFBWTtJQUNaLFdBQVc7SUFDWCx5QkFBeUI7SUFDekIsa0JBQWtCO0NBQUU7QUFFeEI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsbUJBQW1CO0NBQUU7QUFDckI7SUFDRSxtQkFBbUI7SUFDbkIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixTQUFTO0lBQ1QsVUFBVTtJQUNWLG9CQUFvQjtJQUNwQixxQkFBcUI7Q0FBRVwiLFwiZmlsZVwiOlwiZGFzaGJvYXJkLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuc2V0dGluZy1pY29uIHtcXG4gIGNvbG9yOiAjNzc3O1xcbiAgY3Vyc29yOiBwb2ludGVyOyB9XFxuXFxuLmFjY291bnQtaW5mbyB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwOyB9XFxuICAuYWNjb3VudC1pbmZvIGxpIHtcXG4gICAgbWFyZ2luOiAuNWVtIDA7XFxuICAgIGNvbG9yOiAjNDQ0OyB9XFxuICAuYWNjb3VudC1pbmZvIC5sYWJlbCB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgZmxvYXQ6IGxlZnQ7XFxuICAgIHdpZHRoOiA0ZW07XFxuICAgIHRleHQtYWxpZ24tbGFzdDoganVzdGlmeTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAxZW07IH1cXG5cXG4ucGx1cy1jYXJkIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG4gIC5wbHVzLWNhcmQgaSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZm9udC1zaXplOiAzcmVtO1xcbiAgICBjb2xvcjogbGlnaHRncmF5O1xcbiAgICB0b3A6IDUwJTtcXG4gICAgbGVmdDogNTAlO1xcbiAgICBtYXJnaW4tdG9wOiAtMS41cmVtO1xcbiAgICBtYXJnaW4tbGVmdDogLTEuNXJlbTsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1lZTY0NjEwMFwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2Rhc2hib2FyZC52dWVcbi8vIG1vZHVsZSBpZCA9IDY4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDE3IiwiPHRlbXBsYXRlPlxyXG4gIDxkaXYgY2xhc3M9XCJtYWluLWNvbnRhaW5lciBtYWluLXdpdGgtcGFkZGluZ1wiPlxyXG4gICAgYWRmYXNkZmFzZGZcclxuICAgIDxlbC1yb3cgOmd1dHRlcj1cIjIwXCIgdHlwZT1cImZsZXhcIiBqdXN0aWZ5PVwiY2VudGVyXCI+XHJcbiAgICAgIDxlbC1jb2wgOnNwYW49XCI2XCI+XHJcbiAgICAgICAgPGgxPmRhc2hib2FyZDwvaDE+XHJcbiAgICAgIDwvZWwtY29sPlxyXG4gICAgPC9lbC1yb3c+XHJcbiAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG4gIC8vIGltcG9ydCB1c2VyQ29uZmlnIGZyb20gJy4uL2NvbmZpZydcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7fVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgICAgdGhpcy5heGlvcy5nZXQoJ3VzZXInKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIC8vIHRoaXMuYWNjb3VudHMgPSByZXNwb25zZS5kYXRhLmFjY291bnRzO1xyXG4gICAgICAgIC8vIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1c2VyQ29uZmlnLmFjY291bnRzS2V5LCBKU09OLnN0cmluZ2lmeShyZXNwb25zZS5kYXRhLmFjY291bnRzKSk7XHJcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7fVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLnNldHRpbmctaWNvbiB7XHJcbiAgICBjb2xvcjogIzc3NztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICB9XHJcblxyXG4gIC5hY2NvdW50LWluZm8ge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIG1hcmdpbjogMDtcclxuXHJcbiAgICBsaSB7XHJcbiAgICAgIG1hcmdpbjogLjVlbSAwO1xyXG4gICAgICBjb2xvcjogIzQ0NDtcclxuICAgIH1cclxuXHJcbiAgICAubGFiZWwge1xyXG4gICAgICBjb2xvcjogIzAwMDtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgICB3aWR0aDogNGVtO1xyXG4gICAgICB0ZXh0LWFsaWduLWxhc3Q6IGp1c3RpZnk7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMWVtO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnBsdXMtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG5cclxuICAgIGkge1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGZvbnQtc2l6ZTogM3JlbTtcclxuICAgICAgY29sb3I6IGxpZ2h0Z3JheTtcclxuICAgICAgdG9wOiA1MCU7XHJcbiAgICAgIGxlZnQ6IDUwJTtcclxuICAgICAgbWFyZ2luLXRvcDogLTEuNXJlbTtcclxuICAgICAgbWFyZ2luLWxlZnQ6IC0xLjVyZW07XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9kYXNoYm9hcmQudnVlPzhkMTUzZjhjIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwibWFpbi1jb250YWluZXIgbWFpbi13aXRoLXBhZGRpbmdcIiB9LFxuICAgIFtcbiAgICAgIF92bS5fdihcIlxcbiAgYWRmYXNkZmFzZGZcXG4gIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImVsLXJvd1wiLFxuICAgICAgICB7IGF0dHJzOiB7IGd1dHRlcjogMjAsIHR5cGU6IFwiZmxleFwiLCBqdXN0aWZ5OiBcImNlbnRlclwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZWwtY29sXCIsIHsgYXR0cnM6IHsgc3BhbjogNiB9IH0sIFtcbiAgICAgICAgICAgIF9jKFwiaDFcIiwgW192bS5fdihcImRhc2hib2FyZFwiKV0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxubW9kdWxlLmV4cG9ydHMgPSB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LWVlNjQ2MTAwXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1lZTY0NjEwMFwiLFwiaGFzU2NvcGVkXCI6dHJ1ZSxcImJ1YmxlXCI6e1widHJhbnNmb3Jtc1wiOnt9fX0hLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvZGFzaGJvYXJkLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTciXSwic291cmNlUm9vdCI6IiJ9