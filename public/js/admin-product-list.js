webpackJsonp([14],{

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(691)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(693)
/* template */
var __vue_template__ = __webpack_require__(694)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-95d1f3fa"
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
Component.options.__file = "resources\\assets\\js\\admin\\pages\\product\\lsit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95d1f3fa", Component.options)
  } else {
    hotAPI.reload("data-v-95d1f3fa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    // 搜索
    search: function search() {
      this.loadData(1);
    },
    handleCurrentChange: function handleCurrentChange(page) {
      this.loadData(page);
    }
  }
});

/***/ }),

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(692);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("680cb6b3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95d1f3fa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./lsit.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-95d1f3fa\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./lsit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)(true);
// imports


// module
exports.push([module.i, "\n.thumbnail[data-v-95d1f3fa] {\n  display: block;\n  overflow: hidden;\n  margin: 10px 0;\n  width: 65px;\n  height: 65px;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/admin/pages/product/lsit.vue"],"names":[],"mappings":";AAAA;EACE,eAAe;EACf,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,aAAa;CAAE","file":"lsit.vue","sourcesContent":[".thumbnail {\n  display: block;\n  overflow: hidden;\n  margin: 10px 0;\n  width: 65px;\n  height: 65px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_table_mixin__ = __webpack_require__(606);
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
  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_table_mixin__["a" /* default */]],

  data: function data() {
    return {
      products: {},
      searchForm: {
        name: '',
        sex: 'all'
      }
    };
  },
  mounted: function mounted() {
    this.loadData();
  },


  methods: {
    loadData: function loadData() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      this.axios.get('product/list', {
        params: {
          keyword: this.searchForm.keyword,
          sex: this.searchForm.sex,
          page: page
        }
      }).then(function (response) {
        _this.products = response.data.products;
      });
    },
    deleteProduct: function deleteProduct(id) {
      console.log('fuck');
    }
  }
});

/***/ }),

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "main-container main-with-padding" },
    [
      _c(
        "div",
        { staticClass: "table-tools" },
        [
          _c(
            "el-form",
            {
              staticClass: "demo-form-inline",
              attrs: { inline: true, model: _vm.searchForm }
            },
            [
              _c(
                "el-form-item",
                [
                  _c("el-input", {
                    attrs: { placeholder: "按昵称搜索" },
                    nativeOn: {
                      keyup: function($event) {
                        if (
                          !("button" in $event) &&
                          _vm._k($event.keyCode, "enter", 13, $event.key)
                        ) {
                          return null
                        }
                        _vm.loadData($event)
                      }
                    },
                    model: {
                      value: _vm.searchForm.keyword,
                      callback: function($$v) {
                        _vm.$set(_vm.searchForm, "keyword", $$v)
                      },
                      expression: "searchForm.keyword"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-select",
                    {
                      attrs: { placeholder: "性别筛选" },
                      on: { change: _vm.loadData },
                      model: {
                        value: _vm.searchForm.sex,
                        callback: function($$v) {
                          _vm.$set(_vm.searchForm, "sex", $$v)
                        },
                        expression: "searchForm.sex"
                      }
                    },
                    [
                      _c("el-option", {
                        attrs: { label: "全部", value: "all" }
                      }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "男", value: "0" } }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "女", value: "1" } }),
                      _vm._v(" "),
                      _c("el-option", { attrs: { label: "其它", value: "2" } })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "el-form-item",
                [
                  _c(
                    "el-button",
                    {
                      attrs: { type: "primary", icon: "search" },
                      on: { click: _vm.search }
                    },
                    [_vm._v("搜索")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-table",
        { attrs: { data: _vm.products.data, border: "" } },
        [
          _c("el-table-column", {
            attrs: { label: "预览图" },
            inlineTemplate: {
              render: function() {
                var _vm = this
                var _h = _vm.$createElement
                var _c = _vm._self._c || _h
                return _c("img", {
                  staticClass: "thumbnail",
                  attrs: { src: _vm.row.thumbnail }
                })
              },
              staticRenderFns: []
            }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "name", label: "名称" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "price", label: "价格（元）" }
          }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "stock", label: "库存" } }),
          _vm._v(" "),
          _c("el-table-column", { attrs: { prop: "status", label: "状态" } }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { prop: "updated_at", label: "更新时间" }
          }),
          _vm._v(" "),
          _c("el-table-column", {
            attrs: { label: "操作" },
            inlineTemplate: {
              render: function() {
                var _vm = this
                var _h = _vm.$createElement
                var _c = _vm._self._c || _h
                return _c(
                  "div",
                  [
                    _c(
                      "router-link",
                      {
                        staticClass:
                          "el-button el-button--primary el-button--small",
                        attrs: { to: "/product/edit/" + _vm.row.id }
                      },
                      [_vm._v("\n          编辑\n        ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        attrs: { size: "small", type: "danger" },
                        on: {
                          click: function($event) {
                            _vm.deleteProduct(_vm.row.id)
                          }
                        }
                      },
                      [_vm._v("删除")]
                    )
                  ],
                  1
                )
              },
              staticRenderFns: []
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "paginator" },
        [
          _c("el-pagination", {
            attrs: {
              "current-page": _vm.products.current_page,
              "page-size": _vm.products.per_page,
              layout: "total, prev, pager, next, jumper",
              total: _vm.products.tatal
            },
            on: { "current-change": _vm.handleCurrentChange }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-95d1f3fa", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9taXhpbnMvdGFibGVfbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlP2QxMmMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlP2M4YTQiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvcHJvZHVjdC9sc2l0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWU/ZGRhMCJdLCJuYW1lcyI6WyJtZXRob2RzIiwic2VhcmNoIiwibG9hZERhdGEiLCJoYW5kbGVDdXJyZW50Q2hhbmdlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd007QUFDeE07QUFDQTtBQUNBO0FBQ0EsNENBQTRkO0FBQzVkO0FBQ0EsOENBQXFMO0FBQ3JMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDs7Ozs7Ozs7O0FDNUNBLHlEQUFlO0FBQ2JBLFdBQVM7QUFDUDtBQUNBQyxVQUZPLG9CQUVHO0FBQ1IsV0FBS0MsUUFBTCxDQUFjLENBQWQ7QUFDRCxLQUpNO0FBTVBDLHVCQU5PLCtCQU1jQyxJQU5kLEVBTW9CO0FBQ3pCLFdBQUtG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QUNBLGdDQUFnQztBQUNoQyx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGdDQUFnQztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLDJCQUEyQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJqcy9hZG1pbi1wcm9kdWN0LWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGlzcG9zZWQgPSBmYWxzZVxuZnVuY3Rpb24gaW5qZWN0U3R5bGUgKHNzckNvbnRleHQpIHtcbiAgaWYgKGRpc3Bvc2VkKSByZXR1cm5cbiAgcmVxdWlyZShcIiEhdnVlLXN0eWxlLWxvYWRlciFjc3MtbG9hZGVyP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXg/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTk1ZDFmM2ZhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IXNhc3MtbG9hZGVyIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2xzaXQudnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vbHNpdC52dWVcIilcbi8qIHRlbXBsYXRlICovXG52YXIgX192dWVfdGVtcGxhdGVfXyA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTk1ZDFmM2ZhXFxcIixcXFwiaGFzU2NvcGVkXFxcIjp0cnVlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vbHNpdC52dWVcIilcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBpbmplY3RTdHlsZVxuLyogc2NvcGVJZCAqL1xudmFyIF9fdnVlX3Njb3BlSWRfXyA9IFwiZGF0YS12LTk1ZDFmM2ZhXCJcbi8qIG1vZHVsZUlkZW50aWZpZXIgKHNlcnZlciBvbmx5KSAqL1xudmFyIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX18gPSBudWxsXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfdGVtcGxhdGVfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInJlc291cmNlc1xcXFxhc3NldHNcXFxcanNcXFxcYWRtaW5cXFxccGFnZXNcXFxccHJvZHVjdFxcXFxsc2l0LnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi05NWQxZjNmYVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTk1ZDFmM2ZhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL3Byb2R1Y3QvbHNpdC52dWVcbi8vIG1vZHVsZSBpZCA9IDU4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDE0IiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIG1ldGhvZHM6IHtcclxuICAgIC8vIOaQnOe0olxyXG4gICAgc2VhcmNoICgpIHtcclxuICAgICAgdGhpcy5sb2FkRGF0YSgxKVxyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVDdXJyZW50Q2hhbmdlIChwYWdlKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEocGFnZSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9taXhpbnMvdGFibGVfbWl4aW4uanMiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleC5qcz97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtOTVkMWYzZmFcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vbHNpdC52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcIjY4MGNiNmIzXCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTk1ZDFmM2ZhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2xzaXQudnVlXCIsIGZ1bmN0aW9uKCkge1xuICAgICB2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LTk1ZDFmM2ZhXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2xzaXQudnVlXCIpO1xuICAgICBpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcbiAgICAgdXBkYXRlKG5ld0NvbnRlbnQpO1xuICAgfSk7XG4gfVxuIC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3NcbiBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtc3R5bGUtbG9hZGVyIS4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXI/c291cmNlTWFwIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyP3tcInZ1ZVwiOnRydWUsXCJpZFwiOlwiZGF0YS12LTk1ZDFmM2ZhXCIsXCJzY29wZWRcIjp0cnVlLFwiaGFzSW5saW5lQ29uZmlnXCI6dHJ1ZX0hLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvcHJvZHVjdC9sc2l0LnZ1ZVxuLy8gbW9kdWxlIGlkID0gNjkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMTQiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLnRodW1ibmFpbFtkYXRhLXYtOTVkMWYzZmFdIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMTBweCAwO1xcbiAgd2lkdGg6IDY1cHg7XFxuICBoZWlnaHQ6IDY1cHg7XFxufVxcblwiLCBcIlwiLCB7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJEOi9Db2RlL3dpbGxzaG9wL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvcHJvZHVjdC9sc2l0LnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtDQUFFXCIsXCJmaWxlXCI6XCJsc2l0LnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIudGh1bWJuYWlsIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG1hcmdpbjogMTBweCAwO1xcbiAgd2lkdGg6IDY1cHg7XFxuICBoZWlnaHQ6IDY1cHg7IH1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtOTVkMWYzZmFcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibWFpbi1jb250YWluZXIgbWFpbi13aXRoLXBhZGRpbmdcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZS10b29sc1wiPlxyXG4gICAgICA8ZWwtZm9ybSA6aW5saW5lPVwidHJ1ZVwiIDptb2RlbD1cInNlYXJjaEZvcm1cIiBjbGFzcz1cImRlbW8tZm9ybS1pbmxpbmVcIj5cclxuICAgICAgICA8ZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgPGVsLWlucHV0IHYtbW9kZWw9XCJzZWFyY2hGb3JtLmtleXdvcmRcIiBwbGFjZWhvbGRlcj1cIuaMieaYteensOaQnOe0olwiXHJcbiAgICAgICAgICAgICAgICAgICAgQGtleXVwLmVudGVyLm5hdGl2ZT1cImxvYWREYXRhXCI+PC9lbC1pbnB1dD5cclxuICAgICAgICA8L2VsLWZvcm0taXRlbT5cclxuICAgICAgICA8ZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgICAgPGVsLXNlbGVjdCB2LW1vZGVsPVwic2VhcmNoRm9ybS5zZXhcIiBwbGFjZWhvbGRlcj1cIuaAp+WIq+etm+mAiVwiIEBjaGFuZ2U9XCJsb2FkRGF0YVwiPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi5YWo6YOoXCIgdmFsdWU9XCJhbGxcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgICAgPGVsLW9wdGlvbiBsYWJlbD1cIueUt1wiIHZhbHVlPVwiMFwiPjwvZWwtb3B0aW9uPlxyXG4gICAgICAgICAgICA8ZWwtb3B0aW9uIGxhYmVsPVwi5aWzXCIgdmFsdWU9XCIxXCI+PC9lbC1vcHRpb24+XHJcbiAgICAgICAgICAgIDxlbC1vcHRpb24gbGFiZWw9XCLlhbblroNcIiB2YWx1ZT1cIjJcIj48L2VsLW9wdGlvbj5cclxuICAgICAgICAgIDwvZWwtc2VsZWN0PlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICAgIDxlbC1mb3JtLWl0ZW0+XHJcbiAgICAgICAgICA8ZWwtYnV0dG9uIHR5cGU9XCJwcmltYXJ5XCIgaWNvbj1cInNlYXJjaFwiIEBjbGljaz1cInNlYXJjaFwiPuaQnOe0ojwvZWwtYnV0dG9uPlxyXG4gICAgICAgIDwvZWwtZm9ybS1pdGVtPlxyXG4gICAgICA8L2VsLWZvcm0+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZWwtdGFibGUgOmRhdGE9XCJwcm9kdWN0cy5kYXRhXCIgYm9yZGVyPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIGxhYmVsPVwi6aKE6KeI5Zu+XCIgaW5saW5lLXRlbXBsYXRlPlxyXG4gICAgICAgIDxpbWcgOnNyYz1cInJvdy50aHVtYm5haWxcIiBjbGFzcz1cInRodW1ibmFpbFwiLz5cclxuICAgICAgPC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cIm5hbWVcIiBsYWJlbD1cIuWQjeensFwiPjwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgICA8ZWwtdGFibGUtY29sdW1uIHByb3A9XCJwcmljZVwiIGxhYmVsPVwi5Lu35qC877yI5YWD77yJXCI+PC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gcHJvcD1cInN0b2NrXCIgbGFiZWw9XCLlupPlrZhcIj48L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwic3RhdHVzXCIgbGFiZWw9XCLnirbmgIFcIj48L2VsLXRhYmxlLWNvbHVtbj5cclxuICAgICAgPGVsLXRhYmxlLWNvbHVtbiBwcm9wPVwidXBkYXRlZF9hdFwiIGxhYmVsPVwi5pu05paw5pe26Ze0XCI+PC9lbC10YWJsZS1jb2x1bW4+XHJcbiAgICAgIDxlbC10YWJsZS1jb2x1bW4gbGFiZWw9XCLmk43kvZxcIiBpbmxpbmUtdGVtcGxhdGU+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxyb3V0ZXItbGluayA6dG89XCInL3Byb2R1Y3QvZWRpdC8nICsgcm93LmlkXCIgY2xhc3M9XCJlbC1idXR0b24gZWwtYnV0dG9uLS1wcmltYXJ5IGVsLWJ1dHRvbi0tc21hbGxcIj5cclxuICAgICAgICAgICAg57yW6L6RXHJcbiAgICAgICAgICA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgPGVsLWJ1dHRvbiBzaXplPVwic21hbGxcIiB0eXBlPVwiZGFuZ2VyXCIgQGNsaWNrPVwiZGVsZXRlUHJvZHVjdChyb3cuaWQpXCI+5Yig6ZmkPC9lbC1idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZWwtdGFibGUtY29sdW1uPlxyXG4gICAgPC9lbC10YWJsZT5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwicGFnaW5hdG9yXCI+XHJcbiAgICAgIDxlbC1wYWdpbmF0aW9uXHJcbiAgICAgICAgICBAY3VycmVudC1jaGFuZ2U9XCJoYW5kbGVDdXJyZW50Q2hhbmdlXCJcclxuICAgICAgICAgIDpjdXJyZW50LXBhZ2U9XCJwcm9kdWN0cy5jdXJyZW50X3BhZ2VcIlxyXG4gICAgICAgICAgOnBhZ2Utc2l6ZT1cInByb2R1Y3RzLnBlcl9wYWdlXCJcclxuICAgICAgICAgIGxheW91dD1cInRvdGFsLCBwcmV2LCBwYWdlciwgbmV4dCwganVtcGVyXCJcclxuICAgICAgICAgIDp0b3RhbD1cInByb2R1Y3RzLnRhdGFsXCI+XHJcbiAgICAgIDwvZWwtcGFnaW5hdGlvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgVGFibGVNaXhpbiBmcm9tICcuLi8uLi9taXhpbnMvdGFibGVfbWl4aW4nXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IHtcclxuICAgIG1peGluczogW1RhYmxlTWl4aW5dLFxyXG5cclxuICAgIGRhdGEgKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb2R1Y3RzOiB7fSxcclxuICAgICAgICBzZWFyY2hGb3JtOiB7XHJcbiAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgIHNleDogJ2FsbCdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbW91bnRlZCAoKSB7XHJcbiAgICAgIHRoaXMubG9hZERhdGEoKVxyXG4gICAgfSxcclxuXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgIGxvYWREYXRhIChwYWdlID0gMSkge1xyXG4gICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdwcm9kdWN0L2xpc3QnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAga2V5d29yZDogdGhpcy5zZWFyY2hGb3JtLmtleXdvcmQsXHJcbiAgICAgICAgICAgIHNleDogdGhpcy5zZWFyY2hGb3JtLnNleCxcclxuICAgICAgICAgICAgcGFnZTogcGFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gcmVzcG9uc2UuZGF0YS5wcm9kdWN0c1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBkZWxldGVQcm9kdWN0IChpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmdWNrJylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuPC9zY3JpcHQ+XHJcblxyXG48c3R5bGUgc2NvcGVkIGxhbmc9XCJzY3NzXCI+XHJcbiAgLnRodW1ibmFpbCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBtYXJnaW46IDEwcHggMDtcclxuICAgIHdpZHRoOiA2NXB4O1xyXG4gICAgaGVpZ2h0OiA2NXB4O1xyXG4gIH1cclxuPC9zdHlsZT5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlPzBkNDYxZDNjIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwibWFpbi1jb250YWluZXIgbWFpbi13aXRoLXBhZGRpbmdcIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInRhYmxlLXRvb2xzXCIgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJlbC1mb3JtXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImRlbW8tZm9ybS1pbmxpbmVcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgaW5saW5lOiB0cnVlLCBtb2RlbDogX3ZtLnNlYXJjaEZvcm0gfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJlbC1mb3JtLWl0ZW1cIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcImVsLWlucHV0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcGxhY2Vob2xkZXI6IFwi5oyJ5pi156ew5pCc57SiXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAgICAgICAgICBrZXl1cDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICEoXCJidXR0b25cIiBpbiAkZXZlbnQpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMywgJGV2ZW50LmtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLmxvYWREYXRhKCRldmVudClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5zZWFyY2hGb3JtLmtleXdvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLiRzZXQoX3ZtLnNlYXJjaEZvcm0sIFwia2V5d29yZFwiLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcInNlYXJjaEZvcm0ua2V5d29yZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZWwtZm9ybS1pdGVtXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZWwtc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBwbGFjZWhvbGRlcjogXCLmgKfliKvnrZvpgIlcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNoYW5nZTogX3ZtLmxvYWREYXRhIH0sXG4gICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfdm0uc2VhcmNoRm9ybS5zZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oJCR2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5zZWFyY2hGb3JtLCBcInNleFwiLCAkJHYpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzZWFyY2hGb3JtLnNleFwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJlbC1vcHRpb25cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgbGFiZWw6IFwi5YWo6YOoXCIsIHZhbHVlOiBcImFsbFwiIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiZWwtb3B0aW9uXCIsIHsgYXR0cnM6IHsgbGFiZWw6IFwi55S3XCIsIHZhbHVlOiBcIjBcIiB9IH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJlbC1vcHRpb25cIiwgeyBhdHRyczogeyBsYWJlbDogXCLlpbNcIiwgdmFsdWU6IFwiMVwiIH0gfSksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcImVsLW9wdGlvblwiLCB7IGF0dHJzOiB7IGxhYmVsOiBcIuWFtuWug1wiLCB2YWx1ZTogXCIyXCIgfSB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiZWwtZm9ybS1pdGVtXCIsXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInByaW1hcnlcIiwgaWNvbjogXCJzZWFyY2hcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgIG9uOiB7IGNsaWNrOiBfdm0uc2VhcmNoIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW192bS5fdihcIuaQnOe0olwiKV1cbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZWwtdGFibGVcIixcbiAgICAgICAgeyBhdHRyczogeyBkYXRhOiBfdm0ucHJvZHVjdHMuZGF0YSwgYm9yZGVyOiBcIlwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiZWwtdGFibGUtY29sdW1uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGxhYmVsOiBcIumihOiniOWbvlwiIH0sXG4gICAgICAgICAgICBpbmxpbmVUZW1wbGF0ZToge1xuICAgICAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBfdm0gPSB0aGlzXG4gICAgICAgICAgICAgICAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gICAgICAgICAgICAgICAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInRodW1ibmFpbFwiLFxuICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBfdm0ucm93LnRodW1ibmFpbCB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwgeyBhdHRyczogeyBwcm9wOiBcIm5hbWVcIiwgbGFiZWw6IFwi5ZCN56ewXCIgfSB9KSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFwiZWwtdGFibGUtY29sdW1uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHByb3A6IFwicHJpY2VcIiwgbGFiZWw6IFwi5Lu35qC877yI5YWD77yJXCIgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwgeyBhdHRyczogeyBwcm9wOiBcInN0b2NrXCIsIGxhYmVsOiBcIuW6k+WtmFwiIH0gfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLXRhYmxlLWNvbHVtblwiLCB7IGF0dHJzOiB7IHByb3A6IFwic3RhdHVzXCIsIGxhYmVsOiBcIueKtuaAgVwiIH0gfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLXRhYmxlLWNvbHVtblwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBwcm9wOiBcInVwZGF0ZWRfYXRcIiwgbGFiZWw6IFwi5pu05paw5pe26Ze0XCIgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC10YWJsZS1jb2x1bW5cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgbGFiZWw6IFwi5pON5L2cXCIgfSxcbiAgICAgICAgICAgIGlubGluZVRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIF92bSA9IHRoaXNcbiAgICAgICAgICAgICAgICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiZWwtYnV0dG9uIGVsLWJ1dHRvbi0tcHJpbWFyeSBlbC1idXR0b24tLXNtYWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0bzogXCIvcHJvZHVjdC9lZGl0L1wiICsgX3ZtLnJvdy5pZCB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgIOe8lui+kVxcbiAgICAgICAgXCIpXVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICBcImVsLWJ1dHRvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHNpemU6IFwic21hbGxcIiwgdHlwZTogXCJkYW5nZXJcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5kZWxldGVQcm9kdWN0KF92bS5yb3cuaWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIFtfdm0uX3YoXCLliKDpmaRcIildXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IFtdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcbiAgICAgICAgXCJkaXZcIixcbiAgICAgICAgeyBzdGF0aWNDbGFzczogXCJwYWdpbmF0b3JcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJlbC1wYWdpbmF0aW9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIFwiY3VycmVudC1wYWdlXCI6IF92bS5wcm9kdWN0cy5jdXJyZW50X3BhZ2UsXG4gICAgICAgICAgICAgIFwicGFnZS1zaXplXCI6IF92bS5wcm9kdWN0cy5wZXJfcGFnZSxcbiAgICAgICAgICAgICAgbGF5b3V0OiBcInRvdGFsLCBwcmV2LCBwYWdlciwgbmV4dCwganVtcGVyXCIsXG4gICAgICAgICAgICAgIHRvdGFsOiBfdm0ucHJvZHVjdHMudGF0YWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyBcImN1cnJlbnQtY2hhbmdlXCI6IF92bS5oYW5kbGVDdXJyZW50Q2hhbmdlIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtOTVkMWYzZmFcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LTk1ZDFmM2ZhXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9wcm9kdWN0L2xzaXQudnVlXG4vLyBtb2R1bGUgaWQgPSA2OTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxNCJdLCJzb3VyY2VSb290IjoiIn0=