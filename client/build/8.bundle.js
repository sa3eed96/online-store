(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{105:function(e,t,a){"use strict";t.a=function(e){return Array.prototype.slice.call(e).filter((function(e){return e.name.length>0})).map((function(e){var t=e.validity.typeMismatch;return{name:e.name,typeMismatch:t,valid:e.checkValidity()}})).reduce((function(e,t){return e[t.name]=t.valid,e}),{})}},139:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),s=a(4),i=a(20),l=a(21),m=a(2),o=a(0),u=a.n(o),c=a(5),p=a.n(c),d=a(17),f=a(8),b=a(105);t.default=function(e){var t=Object(o.useState)({firstName:e.user.state.user.firstName,lastName:e.user.state.user.lastName,email:e.user.state.user.email,phone:e.user.state.user.phone}),a=Object(m.a)(t,2),r=a[0],c=a[1],N=Object(o.useState)({firstName:!0,lastName:!0,email:!0,phone:!0}),h=Object(m.a)(N,2),g=h[0],y=h[1],v=Object(o.useState)(""),O=Object(m.a)(v,2),j=O[0],E=O[1],w=Object(o.useState)(!1),x=Object(m.a)(w,2),S=x[0],k=x[1],q=function(e){c(Object(l.a)({},r,Object(i.a)({},e.target.name,e.target.value)))},C=function(){var t=Object(s.a)(n.a.mark((function t(a){var s,i,m;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a.preventDefault(),E(""),k(!0),s=Object(b.a)(a.target.elements),!(Object.keys(s).filter((function(e){return!s[e]})).length>0)){t.next=9;break}return y(s),k(!1),t.abrupt("return");case 9:return t.next=11,p.a.put("/api/user",r);case 11:i=t.sent,(m=i.data).hasOwnProperty("user")&&e.user.dispatch({type:"infoUpdate",payload:Object(l.a)({},e.user.state.user,{firstName:m.user.firstName,lastName:m.user.lastName,phone:m.user.phone,email:m.user.email})}),e.showNotification("Info updated","bg-success","Success"),e.history.replace("/settings"),t.next=24;break;case 18:if(t.prev=18,t.t0=t.catch(0),k(!1),!("response"in t.t0)||!("data"in t.t0.response)){t.next=23;break}return t.abrupt("return",E(t.t0.response.data));case 23:e.showNotification("Could Not Updated Info, try again later","bg-danger","Error");case 24:case"end":return t.stop()}}),t,null,[[0,18]])})));return function(e){return t.apply(this,arguments)}}();return u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},u.a.createElement("form",{className:"card-body",onSubmit:C,noValidate:!0},u.a.createElement("h5",{className:"card-title pb-1 text-center"},"Edit Personal Information"),u.a.createElement(d.a,{id:"firstName",label:"firstName",value:r.firstName,name:"firstName",onChange:q,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}",error:(!g.firstName).toString(),errormsg:"firstname must consist of only letters"}),u.a.createElement(d.a,{id:"lastName",label:"lastName",value:r.lastName,name:"lastName",onChange:q,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}",error:(!g.lastName).toString(),errormsg:"lastname must consist of only letters"}),u.a.createElement(d.a,{id:"email",label:"email",value:r.email,name:"email",onChange:q,type:"email",required:"required",error:(!g.email).toString(),errormsg:"invalid email"}),u.a.createElement(d.a,{id:"phone",label:"mobile number",value:r.phone,name:"phone",onChange:q,type:"text",required:"required",pattern:"[0-9]{11}",error:(!g.phone).toString(),errormsg:"mobile number must be 11 digit egyptian number"}),u.a.createElement("p",{className:"text-danger"},u.a.createElement("small",null,j)),u.a.createElement(f.a,{loading:S}),u.a.createElement("button",{className:"btn btn-primary"},"update"))))}}}]);
//# sourceMappingURL=8.bundle.js.map