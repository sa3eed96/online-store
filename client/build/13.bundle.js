(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{141:function(e,a,r){"use strict";r.r(a);var t=r(20),s=r(21),n=r(3),o=r.n(n),c=r(5),d=r(2),i=r(0),u=r.n(i),w=r(16),l=r(6),p=r.n(l);a.default=function(e){var a=Object(i.useState)({oldPassword:"",newPassword:"",confirmPassword:""}),r=Object(d.a)(a,2),n=r[0],l=r[1],m=Object(i.useState)(""),f=Object(d.a)(m,2),b=f[0],h=f[1],g=function(){var a=Object(c.a)(o.a.mark((function a(r){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,r.preventDefault(),h(""),n.newPassword===n.confirmPassword){a.next=6;break}return h("new password does not match confirm password"),a.abrupt("return");case 6:return a.next=8,p.a.put("/api/changepassword",{newPassword:n.newPassword,oldPassword:n.oldPassword});case 8:e.showNotification("Password Updated","bg-success","Success"),e.history.replace("/settings"),a.next=18;break;case 12:if(a.prev=12,a.t0=a.catch(0),console.log(a.t0.response),400!==a.t0.response.status){a.next=17;break}return a.abrupt("return",h(a.t0.response.data));case 17:e.showNotification("error changing password, try again later","bg-danger","Error");case 18:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(e){return a.apply(this,arguments)}}(),P=function(){var e=Object(c.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(Object(s.a)({},n,Object(t.a)({},a.target.name,a.target.value)));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return u.a.createElement("div",{class:"row"},u.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},u.a.createElement("form",{className:"card-body",onSubmit:g},u.a.createElement("h5",{className:"card-title pb-1 text-center"},"change password"),u.a.createElement(w.a,{id:"old",label:"old password",value:n.oldPassword,onChange:P,name:"oldPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement(w.a,{id:"newPassword",label:"enter new password",value:n.newPassword,onChange:P,name:"newPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement(w.a,{id:"confirmPassword",label:"confirm new password",value:n.confirmPassword,onChange:P,name:"confirmPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement("p",{style:{color:"red"}},u.a.createElement("small",null,b)),u.a.createElement("button",{className:"btn btn-success"},"Update"))))}}}]);
//# sourceMappingURL=13.bundle.js.map