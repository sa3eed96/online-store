(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{148:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),s=a(5),c=a(2),o=a(0),u=a.n(o),i=a(16),d=a(19),p=a(4),l=a.n(p),f=a(17),m=a(8);t.default=function(e){var t=Object(i.g)().id,a=Object(o.useState)(""),r=Object(c.a)(a,2),p=r[0],b=r[1],w=Object(o.useState)(!0),h=Object(c.a)(w,2),v=h[0],g=h[1];Object(o.useEffect)((function(){(function(){var a=Object(s.a)(n.a.mark((function a(){return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,l.a.get("/api/passwordreset/".concat(t));case 3:g(!1),a.next=9;break;case 6:a.prev=6,a.t0=a.catch(0),e.history.push("/login");case 9:case"end":return a.stop()}}),a,null,[[0,6]])})));return function(){return a.apply(this,arguments)}})()()}),[]);var E=function(){var a=Object(s.a)(n.a.mark((function a(r){return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,r.preventDefault(),a.next=4,l.a.post("/api/reset",{password:p,id:t});case 4:e.history.push("/login"),f.a.dispatch("showNotification",{body:"Password Reset Success, you can now login",background:"bg-success",header:"Success"}),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(0),f.a.dispatch("showNotification",{body:"Failed to Reset Password",background:"bg-danger",header:"Error"});case 11:case"end":return a.stop()}}),a,null,[[0,8]])})));return function(e){return a.apply(this,arguments)}}();return u.a.createElement(m.a,{loading:v},u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},u.a.createElement("form",{id:"forgotForm",className:"card-body",onSubmit:E}),u.a.createElement("div",null,u.a.createElement("h5",{className:"card-title pb-1 text-center"},"Reset Password"),u.a.createElement(d.a,{form:"forgotForm",type:"password",name:"password",value:p,onChange:function(e){b(e.target.value)},id:"password",label:"New password",required:"required"}),u.a.createElement("button",{form:"forgotForm",className:"btn btn-outline-success"},"update")))))}}}]);
//# sourceMappingURL=9.bundle.js.map