webpackJsonp([18],{

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(703)
}
var normalizeComponent = __webpack_require__(203)
/* script */
var __vue_script__ = __webpack_require__(705)
/* template */
var __vue_template__ = __webpack_require__(706)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d9d7730e"
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
Component.options.__file = "resources\\assets\\js\\admin\\pages\\auth\\login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d9d7730e", Component.options)
  } else {
    hotAPI.reload("data-v-d9d7730e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(704);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(202)("b3205064", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d9d7730e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./login.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-d9d7730e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(53)(true);
// imports


// module
exports.push([module.i, "\n.login[data-v-d9d7730e] {\n  position: fixed;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background: #324057;\n  background-size: cover;\n}\n.login .login-form[data-v-d9d7730e] {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px;\n}\n.login .login-form .title[data-v-d9d7730e] {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei', sans-serif;\n      font-weight: 400;\n      margin-bottom: 1.5em;\n}\n.login .login-form .el-input[data-v-d9d7730e] {\n      display: block;\n      margin: 1rem 0;\n}\n.login .login-form .btn-submit[data-v-d9d7730e] {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem;\n}\n.icon-wechat-login[data-v-d9d7730e] {\n  display: block;\n  overflow: hidden;\n  text-align: center;\n  margin-top: 20px;\n}\n.icon-wechat-login .iconfont[data-v-d9d7730e] {\n    color: #fff;\n    font-size: 40px;\n    cursor: pointer;\n}\n.icon-wechat-login .iconfont[data-v-d9d7730e]:hover {\n      color: #b3b3b3;\n}\n.qrcode[data-v-d9d7730e] {\n  display: block;\n  margin: 0 auto;\n  width: 300px;\n  height: 300px;\n}\n", "", {"version":3,"sources":["D:/Code/willshop/resources/assets/js/admin/pages/auth/login.vue"],"names":[],"mappings":";AAAA;EACE,gBAAgB;EAChB,qBAAc;EAAd,qBAAc;EAAd,cAAc;EACd,QAAQ;EACR,SAAS;EACT,OAAO;EACP,UAAU;EACV,yBAAwB;MAAxB,sBAAwB;UAAxB,wBAAwB;EACxB,0BAAoB;MAApB,uBAAoB;UAApB,oBAAoB;EACpB,oBAAoB;EACpB,uBAAuB;CAAE;AACzB;IACE,eAAe;IACf,aAAa;IACb,qCAAqC;IACrC,cAAc;IACd,oBAAoB;CAAE;AACtB;MACE,YAAY;MACZ,gBAAgB;MAChB,kBAAkB;MAClB,mBAAmB;MACnB,2CAA2C;MAC3C,iBAAiB;MACjB,qBAAqB;CAAE;AACzB;MACE,eAAe;MACf,eAAe;CAAE;AACnB;MACE,eAAe;MACf,iBAAiB;MACjB,YAAY;MACZ,iBAAiB;CAAE;AAEzB;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,iBAAiB;CAAE;AACnB;IACE,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;CAAE;AAClB;MACE,eAAe;CAAE;AAEvB;EACE,eAAe;EACf,eAAe;EACf,aAAa;EACb,cAAc;CAAE","file":"login.vue","sourcesContent":[".login {\n  position: fixed;\n  display: flex;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  background: #324057;\n  background-size: cover; }\n  .login .login-form {\n    display: block;\n    width: 360px;\n    background-color: rgba(0, 0, 0, 0.6);\n    padding: 40px;\n    border-radius: 10px; }\n    .login .login-form .title {\n      color: #fff;\n      font-size: 2rem;\n      line-height: 2rem;\n      text-align: center;\n      font-family: 'Microsoft Yahei', sans-serif;\n      font-weight: 400;\n      margin-bottom: 1.5em; }\n    .login .login-form .el-input {\n      display: block;\n      margin: 1rem 0; }\n    .login .login-form .btn-submit {\n      display: block;\n      overflow: hidden;\n      width: 100%;\n      margin-top: 3rem; }\n\n.icon-wechat-login {\n  display: block;\n  overflow: hidden;\n  text-align: center;\n  margin-top: 20px; }\n  .icon-wechat-login .iconfont {\n    color: #fff;\n    font-size: 40px;\n    cursor: pointer; }\n    .icon-wechat-login .iconfont:hover {\n      color: #b3b3b3; }\n\n.qrcode {\n  display: block;\n  margin: 0 auto;\n  width: 300px;\n  height: 300px; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(76);

//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginQrcode: null,
      dialogQrcodeVisible: false
    };
  },
  mounted: function mounted() {},


  methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["mapActions"])(['storeUserToLocal']), {
    login: function login() {
      var _this = this;

      this.axios.post('login', this.loginForm).then(function (response) {
        console.log(response);

        localStorage.setItem(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].authTokenKey, response.data.access_token);

        _this.$router.push('/');
      }).catch(function (error) {
        _this.$message({
          message: error.response.data,
          type: 'error'
        });
      });
    },
    scanLogin: function scanLogin() {
      var _this2 = this;

      if (this.loginQrcode === null) {
        this.axios.get('login-qrcode').then(function (response) {
          _this2.loginQrcode = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + response.data.ticket;
          _this2.dialogQrcodeVisible = true;
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        this.dialogQrcodeVisible = true;
      }
    }
  })
});

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "login" },
    [
      _c(
        "div",
        { staticClass: "login-form" },
        [
          _c("h1", { staticClass: "title" }, [_vm._v("WILLSHOP")]),
          _vm._v(" "),
          _c("el-input", {
            attrs: { type: "text", placeholder: "请输入用户名" },
            nativeOn: {
              keyup: function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13, $event.key)
                ) {
                  return null
                }
                _vm.login($event)
              }
            },
            model: {
              value: _vm.loginForm.name,
              callback: function($$v) {
                _vm.$set(_vm.loginForm, "name", $$v)
              },
              expression: "loginForm.name"
            }
          }),
          _vm._v(" "),
          _c("el-input", {
            attrs: { type: "password", placeholder: "请输入登录密码" },
            nativeOn: {
              keyup: function($event) {
                if (
                  !("button" in $event) &&
                  _vm._k($event.keyCode, "enter", 13, $event.key)
                ) {
                  return null
                }
                _vm.login($event)
              }
            },
            model: {
              value: _vm.loginForm.password,
              callback: function($$v) {
                _vm.$set(_vm.loginForm, "password", $$v)
              },
              expression: "loginForm.password"
            }
          }),
          _vm._v(" "),
          _c(
            "el-button",
            {
              staticClass: "btn-submit",
              attrs: { type: "primary", disabled: false },
              nativeOn: {
                click: function($event) {
                  _vm.login($event)
                }
              }
            },
            [_vm._v("登录")]
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "icon-wechat-login", on: { click: _vm.scanLogin } },
            [_c("i", { staticClass: "iconfont icon-wechat-circle" })]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "el-dialog",
        {
          attrs: {
            title: "微信扫码登录",
            size: "tiny",
            "modal-append-to-body": false
          },
          model: {
            value: _vm.dialogQrcodeVisible,
            callback: function($$v) {
              _vm.dialogQrcodeVisible = $$v
            },
            expression: "dialogQrcodeVisible"
          }
        },
        [
          _c("img", {
            staticClass: "qrcode",
            attrs: { src: _vm.loginQrcode, alt: "" }
          })
        ]
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
    require("vue-hot-reload-api")      .rerender("data-v-d9d7730e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvYXV0aC9sb2dpbi52dWU/OTRiMSIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlP2M3Y2UiLCJ3ZWJwYWNrOi8vL3Jlc291cmNlcy9hc3NldHMvanMvYWRtaW4vcGFnZXMvYXV0aC9sb2dpbi52dWUiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZT9hMTgyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EseUJBQXdNO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBLDRDQUE0ZDtBQUM1ZDtBQUNBLDhDQUFxTDtBQUNyTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7O0FDNUNBOztBQUVBO0FBQ0EscUNBQThPO0FBQzlPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0SkFBNEosaUZBQWlGO0FBQzdPLHFLQUFxSyxpRkFBaUY7QUFDdFA7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsZ0NBQWdDLFVBQVUsRUFBRTtBQUM1QyxDOzs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esb0RBQXFELG9CQUFvQix5QkFBeUIseUJBQXlCLGtCQUFrQixZQUFZLGFBQWEsV0FBVyxjQUFjLDZCQUE2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QUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSx3Q0FBd0MsdUJBQXVCLEVBQUU7QUFDOUUsc0JBQXNCLDZDQUE2QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEMiLCJmaWxlIjoianMvYWRtaW4tYXV0aC1sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXNwb3NlZCA9IGZhbHNlXG5mdW5jdGlvbiBpbmplY3RTdHlsZSAoc3NyQ29udGV4dCkge1xuICBpZiAoZGlzcG9zZWQpIHJldHVyblxuICByZXF1aXJlKFwiISF2dWUtc3R5bGUtbG9hZGVyIWNzcy1sb2FkZXI/c291cmNlTWFwIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlci9pbmRleD97XFxcInZ1ZVxcXCI6dHJ1ZSxcXFwiaWRcXFwiOlxcXCJkYXRhLXYtZDlkNzczMGVcXFwiLFxcXCJzY29wZWRcXFwiOnRydWUsXFxcImhhc0lubGluZUNvbmZpZ1xcXCI6dHJ1ZX0hc2Fzcy1sb2FkZXIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vbG9naW4udnVlXCIpXG59XG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XSxbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDElXFxcIixcXFwibGFzdCAyIHZlcnNpb25zXFxcIixcXFwibm90IGllIDw9IDhcXFwiXX19XSxcXFwic3RhZ2UtMlxcXCJdLFxcXCJwbHVnaW5zXFxcIjpbXFxcInRyYW5zZm9ybS1vYmplY3QtcmVzdC1zcHJlYWRcXFwiLFtcXFwidHJhbnNmb3JtLXJ1bnRpbWVcXFwiLHtcXFwicG9seWZpbGxcXFwiOmZhbHNlLFxcXCJoZWxwZXJzXFxcIjpmYWxzZX1dLFxcXCJ0cmFuc2Zvcm0tcnVudGltZVxcXCIsW1xcXCJpbXBvcnRcXFwiLFt7XFxcImxpYnJhcnlOYW1lXFxcIjpcXFwid2UtdnVlXFxcIixcXFwic3R5bGVcXFwiOmZhbHNlfV1dXX0hLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAmYnVzdENhY2hlIS4vbG9naW4udnVlXCIpXG4vKiB0ZW1wbGF0ZSAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX18gPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXIvaW5kZXg/e1xcXCJpZFxcXCI6XFxcImRhdGEtdi1kOWQ3NzMwZVxcXCIsXFxcImhhc1Njb3BlZFxcXCI6dHJ1ZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wJmJ1c3RDYWNoZSEuL2xvZ2luLnZ1ZVwiKVxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IGluamVjdFN0eWxlXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gXCJkYXRhLXYtZDlkNzczMGVcIlxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9fLFxuICBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzXFxcXGFzc2V0c1xcXFxqc1xcXFxhZG1pblxcXFxwYWdlc1xcXFxhdXRoXFxcXGxvZ2luLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi1kOWQ3NzMwZVwiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LWQ5ZDc3MzBlXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnQuZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSA1OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxOCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kOWQ3NzMwZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9sb2dpbi52dWVcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlc0NsaWVudC5qc1wiKShcImIzMjA1MDY0XCIsIGNvbnRlbnQsIGZhbHNlKTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcbiAvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuIGlmKCFjb250ZW50LmxvY2Fscykge1xuICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXIvaW5kZXguanM/e1xcXCJ2dWVcXFwiOnRydWUsXFxcImlkXFxcIjpcXFwiZGF0YS12LWQ5ZDc3MzBlXFxcIixcXFwic2NvcGVkXFxcIjp0cnVlLFxcXCJoYXNJbmxpbmVDb25maWdcXFwiOnRydWV9IS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXN0eWxlcyZpbmRleD0wJmJ1c3RDYWNoZSEuL2xvZ2luLnZ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz9zb3VyY2VNYXAhLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3N0eWxlLWNvbXBpbGVyL2luZGV4LmpzP3tcXFwidnVlXFxcIjp0cnVlLFxcXCJpZFxcXCI6XFxcImRhdGEtdi1kOWQ3NzMwZVxcXCIsXFxcInNjb3BlZFxcXCI6dHJ1ZSxcXFwiaGFzSW5saW5lQ29uZmlnXFxcIjp0cnVlfSEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9sb2dpbi52dWVcIik7XG4gICAgIGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuICAgICB1cGRhdGUobmV3Q29udGVudCk7XG4gICB9KTtcbiB9XG4gLy8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Z1ZS1zdHlsZS1sb2FkZXIhLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc3R5bGUtY29tcGlsZXI/e1widnVlXCI6dHJ1ZSxcImlkXCI6XCJkYXRhLXYtZDlkNzczMGVcIixcInNjb3BlZFwiOnRydWUsXCJoYXNJbmxpbmVDb25maWdcIjp0cnVlfSEuL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzIS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9c3R5bGVzJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMTgiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmxvZ2luW2RhdGEtdi1kOWQ3NzMwZV0ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICAtd2Via2l0LWJveC1wYWNrOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWFsaWduOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMzMjQwNTc7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm1bZGF0YS12LWQ5ZDc3MzBlXSB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICB3aWR0aDogMzYwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gICAgcGFkZGluZzogNDBweDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuLmxvZ2luIC5sb2dpbi1mb3JtIC50aXRsZVtkYXRhLXYtZDlkNzczMGVdIHtcXG4gICAgICBjb2xvcjogI2ZmZjtcXG4gICAgICBmb250LXNpemU6IDJyZW07XFxuICAgICAgbGluZS1oZWlnaHQ6IDJyZW07XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGZvbnQtZmFtaWx5OiAnTWljcm9zb2Z0IFlhaGVpJywgc2Fucy1zZXJpZjtcXG4gICAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDEuNWVtO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm0gLmVsLWlucHV0W2RhdGEtdi1kOWQ3NzMwZV0ge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG1hcmdpbjogMXJlbSAwO1xcbn1cXG4ubG9naW4gLmxvZ2luLWZvcm0gLmJ0bi1zdWJtaXRbZGF0YS12LWQ5ZDc3MzBlXSB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBtYXJnaW4tdG9wOiAzcmVtO1xcbn1cXG4uaWNvbi13ZWNoYXQtbG9naW5bZGF0YS12LWQ5ZDc3MzBlXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG4uaWNvbi13ZWNoYXQtbG9naW4gLmljb25mb250W2RhdGEtdi1kOWQ3NzMwZV0ge1xcbiAgICBjb2xvcjogI2ZmZjtcXG4gICAgZm9udC1zaXplOiA0MHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5pY29uLXdlY2hhdC1sb2dpbiAuaWNvbmZvbnRbZGF0YS12LWQ5ZDc3MzBlXTpob3ZlciB7XFxuICAgICAgY29sb3I6ICNiM2IzYjM7XFxufVxcbi5xcmNvZGVbZGF0YS12LWQ5ZDc3MzBlXSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkQ6L0NvZGUvd2lsbHNob3AvcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVwiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiO0FBQUE7RUFDRSxnQkFBZ0I7RUFDaEIscUJBQWM7RUFBZCxxQkFBYztFQUFkLGNBQWM7RUFDZCxRQUFRO0VBQ1IsU0FBUztFQUNULE9BQU87RUFDUCxVQUFVO0VBQ1YseUJBQXdCO01BQXhCLHNCQUF3QjtVQUF4Qix3QkFBd0I7RUFDeEIsMEJBQW9CO01BQXBCLHVCQUFvQjtVQUFwQixvQkFBb0I7RUFDcEIsb0JBQW9CO0VBQ3BCLHVCQUF1QjtDQUFFO0FBQ3pCO0lBQ0UsZUFBZTtJQUNmLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsY0FBYztJQUNkLG9CQUFvQjtDQUFFO0FBQ3RCO01BQ0UsWUFBWTtNQUNaLGdCQUFnQjtNQUNoQixrQkFBa0I7TUFDbEIsbUJBQW1CO01BQ25CLDJDQUEyQztNQUMzQyxpQkFBaUI7TUFDakIscUJBQXFCO0NBQUU7QUFDekI7TUFDRSxlQUFlO01BQ2YsZUFBZTtDQUFFO0FBQ25CO01BQ0UsZUFBZTtNQUNmLGlCQUFpQjtNQUNqQixZQUFZO01BQ1osaUJBQWlCO0NBQUU7QUFFekI7RUFDRSxlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixpQkFBaUI7Q0FBRTtBQUNuQjtJQUNFLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0NBQUU7QUFDbEI7TUFDRSxlQUFlO0NBQUU7QUFFdkI7RUFDRSxlQUFlO0VBQ2YsZUFBZTtFQUNmLGFBQWE7RUFDYixjQUFjO0NBQUVcIixcImZpbGVcIjpcImxvZ2luLnZ1ZVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIubG9naW4ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHRvcDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQ6ICMzMjQwNTc7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyB9XFxuICAubG9naW4gLmxvZ2luLWZvcm0ge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDM2MHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICAgIHBhZGRpbmc6IDQwcHg7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7IH1cXG4gICAgLmxvZ2luIC5sb2dpbi1mb3JtIC50aXRsZSB7XFxuICAgICAgY29sb3I6ICNmZmY7XFxuICAgICAgZm9udC1zaXplOiAycmVtO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgICBmb250LWZhbWlseTogJ01pY3Jvc29mdCBZYWhlaScsIHNhbnMtc2VyaWY7XFxuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gICAgICBtYXJnaW4tYm90dG9tOiAxLjVlbTsgfVxcbiAgICAubG9naW4gLmxvZ2luLWZvcm0gLmVsLWlucHV0IHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBtYXJnaW46IDFyZW0gMDsgfVxcbiAgICAubG9naW4gLmxvZ2luLWZvcm0gLmJ0bi1zdWJtaXQge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgbWFyZ2luLXRvcDogM3JlbTsgfVxcblxcbi5pY29uLXdlY2hhdC1sb2dpbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBtYXJnaW4tdG9wOiAyMHB4OyB9XFxuICAuaWNvbi13ZWNoYXQtbG9naW4gLmljb25mb250IHtcXG4gICAgY29sb3I6ICNmZmY7XFxuICAgIGZvbnQtc2l6ZTogNDBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIC5pY29uLXdlY2hhdC1sb2dpbiAuaWNvbmZvbnQ6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjYjNiM2IzOyB9XFxuXFxuLnFyY29kZSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgd2lkdGg6IDMwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDsgfVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyP3NvdXJjZU1hcCEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zdHlsZS1jb21waWxlcj97XCJ2dWVcIjp0cnVlLFwiaWRcIjpcImRhdGEtdi1kOWQ3NzMwZVwiLFwic2NvcGVkXCI6dHJ1ZSxcImhhc0lubGluZUNvbmZpZ1wiOnRydWV9IS4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanMhLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT1zdHlsZXMmaW5kZXg9MCZidXN0Q2FjaGUhLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlXG4vLyBtb2R1bGUgaWQgPSA3MDRcbi8vIG1vZHVsZSBjaHVua3MgPSAxOCIsIjx0ZW1wbGF0ZT5cclxuICA8ZGl2IGNsYXNzPVwibG9naW5cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJsb2dpbi1mb3JtXCI+XHJcbiAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+V0lMTFNIT1A8L2gxPlxyXG4gICAgICA8ZWwtaW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeeUqOaIt+WQjVwiIHYtbW9kZWw9XCJsb2dpbkZvcm0ubmFtZVwiIEBrZXl1cC5uYXRpdmUuZW50ZXI9XCJsb2dpblwiPjwvZWwtaW5wdXQ+XHJcbiAgICAgIDxlbC1pbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIuivt+i+k+WFpeeZu+W9leWvhueggVwiIHYtbW9kZWw9XCJsb2dpbkZvcm0ucGFzc3dvcmRcIlxyXG4gICAgICAgICAgICAgICAgQGtleXVwLm5hdGl2ZS5lbnRlcj1cImxvZ2luXCI+PC9lbC1pbnB1dD5cclxuICAgICAgPGVsLWJ1dHRvbiBjbGFzcz1cImJ0bi1zdWJtaXRcIiB0eXBlPVwicHJpbWFyeVwiIEBjbGljay5uYXRpdmU9XCJsb2dpblwiIDpkaXNhYmxlZD1cImZhbHNlXCI+55m75b2VPC9lbC1idXR0b24+XHJcblxyXG4gICAgICA8ZGl2IGNsYXNzPVwiaWNvbi13ZWNoYXQtbG9naW5cIiBAY2xpY2s9XCJzY2FuTG9naW5cIj48aSBjbGFzcz1cImljb25mb250IGljb24td2VjaGF0LWNpcmNsZVwiPjwvaT48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxlbC1kaWFsb2cgdGl0bGU9XCLlvq7kv6HmiavnoIHnmbvlvZVcIiBzaXplPVwidGlueVwiIDptb2RhbC1hcHBlbmQtdG8tYm9keT1cImZhbHNlXCIgdi1tb2RlbD1cImRpYWxvZ1FyY29kZVZpc2libGVcIj5cclxuICAgICAgPGltZyA6c3JjPVwibG9naW5RcmNvZGVcIiBhbHQ9XCJcIiBjbGFzcz1cInFyY29kZVwiLz5cclxuICAgIDwvZWwtZGlhbG9nPlxyXG4gIDwvZGl2PlxyXG48L3RlbXBsYXRlPlxyXG5cclxuPHNjcmlwdD5cclxuICBpbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2NvbmZpZydcclxuICBpbXBvcnQgeyBtYXBBY3Rpb25zIH0gZnJvbSAndnVleCdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgZGF0YSAoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9naW5Gb3JtOiB7XHJcbiAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgIHBhc3N3b3JkOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbG9naW5RcmNvZGU6IG51bGwsXHJcbiAgICAgICAgZGlhbG9nUXJjb2RlVmlzaWJsZTogZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBtb3VudGVkICgpIHtcclxuICAgIH0sXHJcblxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAuLi5tYXBBY3Rpb25zKFtcclxuICAgICAgICAnc3RvcmVVc2VyVG9Mb2NhbCdcclxuICAgICAgXSksXHJcblxyXG4gICAgICBsb2dpbiAoKSB7XHJcbiAgICAgICAgdGhpcy5heGlvcy5wb3N0KCdsb2dpbicsIHRoaXMubG9naW5Gb3JtKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcblxyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oY29uZmlnLmF1dGhUb2tlbktleSwgcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4pXHJcblxyXG4gICAgICAgICAgdGhpcy4kcm91dGVyLnB1c2goJy8nKVxyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgdGhpcy4kbWVzc2FnZSh7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLnJlc3BvbnNlLmRhdGEsXHJcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcidcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHNjYW5Mb2dpbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9naW5RcmNvZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYXhpb3MuZ2V0KCdsb2dpbi1xcmNvZGUnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luUXJjb2RlID0gJ2h0dHBzOi8vbXAud2VpeGluLnFxLmNvbS9jZ2ktYmluL3Nob3dxcmNvZGU/dGlja2V0PScgKyByZXNwb25zZS5kYXRhLnRpY2tldFxyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1FyY29kZVZpc2libGUgPSB0cnVlXHJcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmRpYWxvZ1FyY29kZVZpc2libGUgPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG48L3NjcmlwdD5cclxuXHJcbjxzdHlsZSBzY29wZWQgbGFuZz1cInNjc3NcIj5cclxuICAubG9naW4ge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIHRvcDogMDtcclxuICAgIGJvdHRvbTogMDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQ6ICMzMjQwNTc7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG5cclxuICAgIC5sb2dpbi1mb3JtIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAzNjBweDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAuNik7XHJcbiAgICAgIHBhZGRpbmc6IDQwcHg7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcblxyXG4gICAgICAudGl0bGUge1xyXG4gICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcclxuICAgICAgICBsaW5lLWhlaWdodDogMnJlbTtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6ICdNaWNyb3NvZnQgWWFoZWknLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMS41ZW07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5lbC1pbnB1dCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgbWFyZ2luOiAxcmVtIDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC5idG4tc3VibWl0IHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDNyZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5pY29uLXdlY2hhdC1sb2dpbiB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xyXG5cclxuICAgIC5pY29uZm9udCB7XHJcbiAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGNvbG9yOiBkYXJrZW4oI2ZmZiwgMzAlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnFyY29kZSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICB9XHJcbjwvc3R5bGU+XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL2FkbWluL3BhZ2VzL2F1dGgvbG9naW4udnVlPzJhMTExODI0IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwibG9naW5cIiB9LFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImxvZ2luLWZvcm1cIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJoMVwiLCB7IHN0YXRpY0NsYXNzOiBcInRpdGxlXCIgfSwgW192bS5fdihcIldJTExTSE9QXCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcImVsLWlucHV0XCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGV4dFwiLCBwbGFjZWhvbGRlcjogXCLor7fovpPlhaXnlKjmiLflkI1cIiB9LFxuICAgICAgICAgICAgbmF0aXZlT246IHtcbiAgICAgICAgICAgICAga2V5dXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICEoXCJidXR0b25cIiBpbiAkZXZlbnQpICYmXG4gICAgICAgICAgICAgICAgICBfdm0uX2soJGV2ZW50LmtleUNvZGUsIFwiZW50ZXJcIiwgMTMsICRldmVudC5rZXkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdm0ubG9naW4oJGV2ZW50KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5sb2dpbkZvcm0ubmFtZSxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5sb2dpbkZvcm0sIFwibmFtZVwiLCAkJHYpXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4cHJlc3Npb246IFwibG9naW5Gb3JtLm5hbWVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXCJlbC1pbnB1dFwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0eXBlOiBcInBhc3N3b3JkXCIsIHBsYWNlaG9sZGVyOiBcIuivt+i+k+WFpeeZu+W9leWvhueggVwiIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBrZXl1cDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgIShcImJ1dHRvblwiIGluICRldmVudCkgJiZcbiAgICAgICAgICAgICAgICAgIF92bS5faygkZXZlbnQua2V5Q29kZSwgXCJlbnRlclwiLCAxMywgJGV2ZW50LmtleSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmxvZ2luRm9ybS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgIF92bS4kc2V0KF92bS5sb2dpbkZvcm0sIFwicGFzc3dvcmRcIiwgJCR2KVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImxvZ2luRm9ybS5wYXNzd29yZFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZWwtYnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJ0bi1zdWJtaXRcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJwcmltYXJ5XCIsIGRpc2FibGVkOiBmYWxzZSB9LFxuICAgICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5sb2dpbigkZXZlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihcIueZu+W9lVwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpY29uLXdlY2hhdC1sb2dpblwiLCBvbjogeyBjbGljazogX3ZtLnNjYW5Mb2dpbiB9IH0sXG4gICAgICAgICAgICBbX2MoXCJpXCIsIHsgc3RhdGljQ2xhc3M6IFwiaWNvbmZvbnQgaWNvbi13ZWNoYXQtY2lyY2xlXCIgfSldXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImVsLWRpYWxvZ1wiLFxuICAgICAgICB7XG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuW+ruS/oeaJq+eggeeZu+W9lVwiLFxuICAgICAgICAgICAgc2l6ZTogXCJ0aW55XCIsXG4gICAgICAgICAgICBcIm1vZGFsLWFwcGVuZC10by1ib2R5XCI6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtb2RlbDoge1xuICAgICAgICAgICAgdmFsdWU6IF92bS5kaWFsb2dRcmNvZGVWaXNpYmxlLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICBfdm0uZGlhbG9nUXJjb2RlVmlzaWJsZSA9ICQkdlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwiZGlhbG9nUXJjb2RlVmlzaWJsZVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJpbWdcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwicXJjb2RlXCIsXG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IF92bS5sb2dpblFyY29kZSwgYWx0OiBcIlwiIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgIHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIikgICAgICAucmVyZW5kZXIoXCJkYXRhLXYtZDlkNzczMGVcIiwgbW9kdWxlLmV4cG9ydHMpXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlcj97XCJpZFwiOlwiZGF0YS12LWQ5ZDc3MzBlXCIsXCJoYXNTY29wZWRcIjp0cnVlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAmYnVzdENhY2hlIS4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9hZG1pbi9wYWdlcy9hdXRoL2xvZ2luLnZ1ZVxuLy8gbW9kdWxlIGlkID0gNzA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMTgiXSwic291cmNlUm9vdCI6IiJ9