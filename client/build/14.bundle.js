(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{145:function(e,a,r){"use strict";r.r(a);var t=r(23),s=r(22),n=r(3),o=r.n(n),c=r(5),d=r(2),i=r(0),u=r.n(i),w=r(19),l=r(4),p=r.n(l),m=r(17);a.default=function(e){var a=Object(i.useState)({oldPassword:"",newPassword:"",confirmPassword:""}),r=Object(d.a)(a,2),n=r[0],l=r[1],b=Object(i.useState)(""),f=Object(d.a)(b,2),h=f[0],g=f[1],P=function(){var a=Object(c.a)(o.a.mark((function a(r){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,r.preventDefault(),g(""),n.newPassword===n.confirmPassword){a.next=6;break}return g("new password does not match confirm password"),a.abrupt("return");case 6:return a.next=8,p.a.put("/api/changepassword",{newPassword:n.newPassword,oldPassword:n.oldPassword});case 8:m.a.dispatch("showNotification",{body:"Password Updated",background:"bg-success",header:"Success"}),e.history.replace("/settings"),a.next=17;break;case 12:if(a.prev=12,a.t0=a.catch(0),400!==a.t0.response.status){a.next=16;break}return a.abrupt("return",g(a.t0.response.data));case 16:m.a.dispatch("showNotification",{body:"error changing password, try again later",background:"bg-danger",header:"Error"});case 17:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(e){return a.apply(this,arguments)}}(),v=function(){var e=Object(c.a)(o.a.mark((function e(a){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(Object(s.a)({},n,Object(t.a)({},a.target.name,a.target.value)));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},u.a.createElement("form",{className:"card-body",onSubmit:P},u.a.createElement("h5",{className:"card-title pb-1 text-center"},"change password"),u.a.createElement(w.a,{id:"old",label:"old password",value:n.oldPassword,onChange:v,name:"oldPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement(w.a,{id:"newPassword",label:"enter new password",value:n.newPassword,onChange:v,name:"newPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement(w.a,{id:"confirmPassword",label:"confirm new password",value:n.confirmPassword,onChange:v,name:"confirmPassword",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement("p",{className:"text-danger"},u.a.createElement("small",null,h)),u.a.createElement("button",{className:"btn btn-success"},"Update"))))}}}]);
//# sourceMappingURL=14.bundle.js.map