(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{104:function(e,t,a){"use strict";t.a=function(e){return Array.prototype.slice.call(e).filter((function(e){return e.name.length>0})).map((function(e){var t=e.validity.typeMismatch;return{name:e.name,typeMismatch:t,valid:e.checkValidity()}})).reduce((function(e,t){return e[t.name]=t.valid,e}),{})}},141:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),c=a(4),o=a(20),s=a(21),i=a(2),l=a(0),d=a.n(l),u=a(17),m=a(5),p=a.n(m),y=a(104);t.default=function(e){var t=Object(l.useState)(e.location.hasOwnProperty("state")?e.location.state:{country:"Egypt",city:"Cairo",address:"",zipCode:""}),a=Object(i.a)(t,2),r=a[0],m=a[1],f=Object(l.useState)({address:!0,zipCode:!0,country:!0,city:!0}),b=Object(i.a)(f,2),g=b[0],h=b[1],v=function(e){console.log(e.target.value),console.log(e.target.name),m(Object(s.a)({},r,Object(o.a)({},e.target.name,e.target.value)))},E=function(){var t=Object(c.a)(n.a.mark((function t(a){var c;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a.preventDefault(),c=Object(y.a)(a.target.elements),!(Object.keys(c).filter((function(e){return!c[e]})).length>0)){t.next=6;break}return h(c),t.abrupt("return");case 6:if(!e.location.hasOwnProperty("state")){t.next=11;break}return t.next=9,p.a.put("/api/address/".concat(r.id),r);case 9:t.next=13;break;case 11:return t.next=13,p.a.post("/api/address",r);case 13:e.history.goBack(),t.next=19;break;case 16:t.prev=16,t.t0=t.catch(0),e.showNotification("failed to add Addess","bg-danger","Error");case 19:case"end":return t.stop()}}),t,null,[[0,16]])})));return function(e){return t.apply(this,arguments)}}();return d.a.createElement("div",{className:"row"},d.a.createElement("div",{className:"card offset-sm-1 col-sm-10 offset-md-4 col-md-4 border border-radius p-4 mt-4"},d.a.createElement("form",{className:"card-body",onSubmit:E,noValidate:!0},d.a.createElement("h5",{className:"card-title pb-1 text-center"},"Edit Address"),d.a.createElement("div",{className:"form-group"},d.a.createElement("label",{htmlFor:"country"},"Country"),d.a.createElement("select",{name:"country",className:"form-control",id:"country",onChange:v,required:!0},d.a.createElement("option",null,"Egypt")),!g.country&&d.a.createElement("small",{className:"text-danger"},"country is required")),d.a.createElement("div",{className:"form-group"},d.a.createElement("label",{htmlFor:"city"},"City"),d.a.createElement("select",{name:"city",className:"form-control",id:"city",onChange:v,required:!0},d.a.createElement("option",null,"Cairo"),d.a.createElement("option",null,"Alexandria")),!g.city&&d.a.createElement("small",{className:"text-danger"},"city is required")),d.a.createElement(u.a,{id:"address",label:"address",value:r.address,name:"address",onChange:v,type:"text",required:"required",pattern:"[a-z|A-Z|0-9]+(\\s|[a-z|A-Z|0-9])*$",error:!g.address,errormsg:"address can only contain letters, digits and whitespace"}),d.a.createElement(u.a,{id:"zipcode",label:"zipcode",value:r.zipCode,name:"zipCode",onChange:v,type:"text",required:"required",pattern:"[0-9]{3,6}",error:!g.zipCode,errormsg:"invalid zipcode, must be only digits and 6 characters maximum"}),d.a.createElement("button",{className:"btn btn-primary"},"save"))))}}}]);
//# sourceMappingURL=6.bundle.js.map