webpackJsonp([8],{LoKY:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o("Dd8w"),n=o.n(s),i=o("y/jF"),r=o("NYxO"),a={components:{loading:i.a},data:function(){return{phoneNumber:"",password:""}},computed:n()({},Object(r.c)(["isLoading","loginCode"]),{errorInfo:function(){var e="";switch(!0){case!/(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g.test(this.phoneNumber):e="这位同志, 请严肃的对待你的手机号码";break;case this.password.length<6:e="这位同志, 请严肃的对待你的密码";break;case 502===this.loginCode:e="同志, 这个密码不对";break;default:e="同志, 账号不存在, 莫非你还未注册"}return e}}),methods:{goback:function(){this.$router.go(-1)},login:function(){if(this.phoneNumber&&this.password){var e={account:this.phoneNumber,password:this.password};this.$store.dispatch("login",e)}else this.$store.commit("setLoginCode","密码或账号未填入")}},activated:function(){this.$store.commit("setLoginCode",0)},watch:{loginCode:function(e,t){200===e&&this.$router.push("/home")}}},d={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"phone-login"},[o("loading",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}]},[e._v("(/ω＼)害羞")]),e._v(" "),o("div",{staticClass:"header"},[o("div",{staticClass:"back",on:{click:function(t){e.goback()}}},[o("i",{staticClass:"fa fa-arrow-left",attrs:{"aria-hidden":"true"}})]),e._v(" "),o("span",{staticClass:"title"},[e._v("手机号登录")])]),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneNumber,expression:"phoneNumber"}],staticClass:"phone",attrs:{type:"text",placeholder:"请输入手机号",required:"required"},domProps:{value:e.phoneNumber},on:{keypress:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login()},input:function(t){t.target.composing||(e.phoneNumber=t.target.value)}}}),e._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],staticClass:"password",attrs:{type:"password",placeholder:"请输入密码",required:"required"},domProps:{value:e.password},on:{keypress:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.login()},input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),o("div",{staticClass:"login-btn",on:{click:function(t){e.login()}}},[e._v("登录")]),e._v(" "),0!==e.loginCode&200!==e.loginCode?o("div",{staticClass:"error"},[e._v(e._s(e.errorInfo))]):e._e()],1)},staticRenderFns:[]},c=o("VU/8")(a,d,!1,function(e){o("fk9L")},"data-v-b18a1588",null);t.default=c.exports},fk9L:function(e,t){}});
//# sourceMappingURL=8.9cb014a98f359b98d014.js.map