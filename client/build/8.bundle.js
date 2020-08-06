(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{104:function(e,t,a){"use strict";t.a=function(e){return Array.prototype.slice.call(e).filter((function(e){return e.name.length>0})).map((function(e){var t=e.validity.typeMismatch;return{name:e.name,typeMismatch:t,valid:e.checkValidity()}})).reduce((function(e,t){return e[t.name]=t.valid,e}),{})}},138:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),s=a(4),i=a(20),l=a(21),o=a(2),u=a(0),c=a.n(u),m=a(5),p=a.n(m),d=a(17),f=a(8),b=a(104);t.default=function(e){var t=Object(u.useState)({firstName:e.user.state.user.firstName,lastName:e.user.state.user.lastName,email:e.user.state.user.email,phone:e.user.state.user.phone}),a=Object(o.a)(t,2),r=a[0],m=a[1],h=Object(u.useState)({firstName:!0,lastName:!0,email:!0,phone:!0}),N=Object(o.a)(h,2),y=N[0],g=N[1],v=Object(u.useState)(""),O=Object(o.a)(v,2),j=O[0],E=O[1],w=Object(u.useState)(!1),x=Object(o.a)(w,2),k=x[0],q=x[1],M=function(e){m(Object(l.a)({},r,Object(i.a)({},e.target.name,e.target.value)))},S=function(){var t=Object(s.a)(n.a.mark((function t(a){var s,i,o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a.preventDefault(),E(""),q(!0),s=Object(b.a)(a.target.elements),!(Object.keys(s).filter((function(e){return!s[e]})).length>0)){t.next=9;break}return g(s),q(!1),t.abrupt("return");case 9:return t.next=11,p.a.put("/api/user",r);case 11:i=t.sent,(o=i.data).hasOwnProperty("user")&&(console.log(o),e.user.dispatch({type:"infoUpdate",payload:Object(l.a)({},e.user.state.user,{firstName:o.user[0].firstName,lastName:o.user[0].lastName,phone:o.user[0].phone,email:o.user[0].email})})),e.showNotification("Info updated","bg-success","Success"),e.history.replace("/settings"),t.next=24;break;case 18:if(t.prev=18,t.t0=t.catch(0),q(!1),!t.t0.response.hasOwnProperty("data")){t.next=23;break}return t.abrupt("return",E(t.t0.response.data));case 23:e.showNotification("Could Not Updated Info, try again later","bg-danger","Error");case 24:case"end":return t.stop()}}),t,null,[[0,18]])})));return function(e){return t.apply(this,arguments)}}();return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},c.a.createElement("form",{className:"card-body",onSubmit:S,noValidate:!0},c.a.createElement("h5",{className:"card-title pb-1 text-center"},"Edit Personal Information"),c.a.createElement(d.a,{id:"firstName",label:"firstName",value:r.firstName,name:"firstName",onChange:M,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}",error:!y.firstName,errorMsg:"firstname must consist of only letters"}),c.a.createElement(d.a,{id:"lastName",label:"lastName",value:r.lastName,name:"lastName",onChange:M,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}",error:!y.lastName,errorMsg:"lastname must consist of only letters"}),c.a.createElement(d.a,{id:"email",label:"email",value:r.email,name:"email",onChange:M,type:"email",required:"required",error:!y.email,errorMsg:"invalid email"}),c.a.createElement(d.a,{id:"phone",label:"mobile number",value:r.phone,name:"phone",onChange:M,type:"text",required:"required",pattern:"[0-9]{11}",error:!y.phone,errorMsg:"mobile number must be 11 digit egyptian number"}),c.a.createElement("p",{style:{color:"red"}},c.a.createElement("small",null,j)),c.a.createElement(f.a,{loading:k}),c.a.createElement("button",{class:"btn btn-primary"},"update"))))}}}]);
//# sourceMappingURL=8.bundle.js.map