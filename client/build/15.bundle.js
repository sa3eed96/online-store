(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{136:function(e,a,t){"use strict";t.r(a);var r=t(3),n=t.n(r),s=t(5),l=t(18),u=t(19),i=t(2),o=t(0),c=t.n(o),m=t(6),p=t.n(m),d=t(14);a.default=function(e){var a=Object(o.useState)({firstName:e.user.state.user.firstName,lastName:e.user.state.user.lastName,email:e.user.state.user.email,phone:e.user.state.user.phone}),t=Object(i.a)(a,2),r=t[0],m=t[1],f=Object(o.useState)(""),b=Object(i.a)(f,2),h=b[0],N=b[1],v=function(e){m(Object(u.a)({},r,Object(l.a)({},e.target.name,e.target.value)))},y=function(){var a=Object(s.a)(n.a.mark((function a(t){var s,l;return n.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t.preventDefault(),N(""),a.next=5,p.a.put("/api/user",r);case 5:s=a.sent,(l=s.data).hasOwnProperty("user")&&(console.log(l),e.user.dispatch({type:"infoUpdate",payload:Object(u.a)({},e.user.state.user,{firstName:l.user[0].firstName,lastName:l.user[0].lastName,phone:l.user[0].phone,email:l.user[0].email})})),e.showNotification("Info updated","bg-success","Success"),e.history.replace("/settings"),a.next=17;break;case 12:if(a.prev=12,a.t0=a.catch(0),!a.t0.response.hasOwnProperty("data")){a.next=16;break}return a.abrupt("return",N(a.t0.response.data));case 16:e.showNotification("Could Not Updated Info, try again later","bg-danger","Error");case 17:case"end":return a.stop()}}),a,null,[[0,12]])})));return function(e){return a.apply(this,arguments)}}();return c.a.createElement("div",{class:"row"},c.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},c.a.createElement("form",{className:"card-body",onSubmit:y},c.a.createElement("h5",{className:"card-title pb-1 text-center"},"Edit Personal Information"),c.a.createElement(d.a,{id:"firstName",label:"firstName",value:r.firstName,name:"firstName",onChange:v,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}"}),c.a.createElement(d.a,{id:"lastName",label:"lastName",value:r.lastName,name:"lastName",onChange:v,type:"text",required:"required",pattern:"[a-z|A-Z]{2,}"}),c.a.createElement(d.a,{id:"email",label:"email",value:r.email,name:"email",onChange:v,type:"email",required:"required"}),c.a.createElement(d.a,{id:"phone",label:"mobile number",value:r.phone,name:"phone",onChange:v,type:"text",required:"required",pattern:"[0-9]{11}"}),c.a.createElement("p",{style:{color:"red"}},c.a.createElement("small",null,h)),c.a.createElement("button",{class:"btn btn-primary"},"update"))))}}}]);
//# sourceMappingURL=15.bundle.js.map