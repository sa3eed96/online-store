(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{140:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),c=a(5),s=a(2),o=a(0),u=a.n(o),l=a(14),i=a(4),d=a(6),p=a.n(d);t.default=function(e){var t=Object(o.useState)(!1),a=Object(s.a)(t,2),r=a[0],d=a[1],m=Object(o.useState)(""),b=Object(s.a)(m,2),f=b[0],w=b[1],v=Object(o.useState)(""),h=Object(s.a)(v,2),E=h[0],g=h[1],y=function(){var e=Object(c.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:w(t.target.value);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var t=Object(c.a)(n.a.mark((function t(a){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,a.preventDefault(),g(""),t.next=5,p.a.delete("/api/user",{data:{password:f}});case 5:e.user.dispatch({type:"logout"}),e.showNotification("Account Deleted","bg-success","Success"),e.history.replace("/login"),t.next=15;break;case 10:if(t.prev=10,t.t0=t.catch(0),400!==t.t0.response.status){t.next=14;break}return t.abrupt("return",g(t.t0.response.data));case 14:e.showNotification("Could Not Delete Account, try again later","bg-danger","Error");case 15:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}(),x=function(){var e=Object(c.a)(n.a.mark((function e(t){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),d(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return u.a.createElement("div",{className:"row mt-4"},!r&&u.a.createElement("div",{className:"card col-sm-10 col-md-4 mx-auto border-radius p-4"},u.a.createElement("div",{className:"card-body"},u.a.createElement("h5",null,"Note: you cannot recover your account after deletion"),u.a.createElement("a",{className:"btn btn-danger my-4 mr-2",href:"#",onClick:x},"Proceed and Delete"),u.a.createElement(i.b,{className:"btn btn-success",to:"/settings"},"Cancel"))),r&&u.a.createElement("div",{className:"card mx-auto col-sm-10 col-md-4 border border-radius p-4"},u.a.createElement("form",{className:"card-body",onSubmit:N},u.a.createElement("h5",{className:"card-title pb-1 text-center"},"Enter Password to Delete"),u.a.createElement(l.a,{id:"password",label:"password",value:f,onChange:y,name:"password",type:"password",required:"required",minLength:"8",maxLength:"30"}),u.a.createElement("p",{style:{color:"red"}},u.a.createElement("small",null,E)),u.a.createElement("button",{className:"btn btn-danger"},"Delete Account"))))}}}]);
//# sourceMappingURL=14.bundle.js.map