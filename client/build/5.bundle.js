(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{111:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(30);var r=a(36);function c(e){return function(e){if(Array.isArray(e))return Object(n.a)(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(r.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},150:function(e,t,a){"use strict";a.r(t);var n=a(22),r=a(3),c=a.n(r),l=a(111),u=a(23),o=a(5),i=a(2),s=a(0),m=a.n(s),d=a(37),b=a(4),p=a.n(b),h=a(1),f=a(28),k=a(14);t.default=function(e){var t=Object(s.useContext)(k.a),a=Object(s.useState)(e.rate),r=Object(i.a)(a,2),b=r[0],E=r[1],v=Object(s.useState)([]),j=Object(i.a)(v,2),O=j[0],y=j[1],g=Object(s.useState)({comment:"",checkedRate:"4"}),w=Object(i.a)(g,2),R=w[0],x=w[1],N=Object(s.useState)(1),C=Object(i.a)(N,2),S=C[0],P=C[1],A=Object(s.useState)(0),I=Object(i.a)(A,2),F=I[0],D=I[1],J=Object(s.useState)([m.a.createElement(h.a,null),m.a.createElement(h.a,null),m.a.createElement(h.a,null),m.a.createElement(h.a,null),m.a.createElement(h.a,null)]),U=Object(i.a)(J,2),T=U[0],q=U[1],z=Object(s.useState)(null),B=Object(i.a)(z,2),G=B[0],H=B[1];Object(s.useEffect)((function(){(function(){var a=Object(o.a)(c.a.mark((function a(){var n,r,o,i;return c.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(!t.state.isAuthenticated){a.next=6;break}return a.next=3,p.a.get("/api/product/".concat(e.productId,"/userrate/myrate"));case 3:if(n=a.sent,(r=n.data).hasOwnProperty("myRate")){for(x(Object(u.a)({},r.myRate,{checkedRate:r.myRate.rate.toString()})),o=Object(l.a)(T),i=0;i<5;i++)i<=r.myRate.rate?o[i]=m.a.createElement(h.c,null):o[i]=m.a.createElement(h.a,null);q(o)}case 6:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}})()()}),[]),Object(s.useEffect)((function(){(function(){var t=Object(o.a)(c.a.mark((function t(){var a,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,H(""),t.next=4,p.a.get("/api/product/".concat(e.productId,"/userrate?page=").concat(S));case 4:a=t.sent,n=a.data,y(n.rates),D(n.count),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),H("could not fetch rate");case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(){return t.apply(this,arguments)}})()()}),[S]);var K=function(){var t=Object(o.a)(c.a.mark((function t(a){var n,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a.preventDefault(),n=null,!("id"in R)){t.next=9;break}return t.next=6,p.a.put("/api/product/".concat(e.productId,"/userrate/").concat(R.id),{rateArray:b,rate:R.checkedRate,comment:R.comment});case 6:n=t.sent,t.next=12;break;case 9:return t.next=11,p.a.post("/api/product/".concat(e.productId,"/userrate"),{rateArray:b,rate:R.checkedRate,comment:R.comment});case 11:n=t.sent;case 12:r=n.data,H(null),E(r.rate),x(Object(u.a)({},r.userRate,{checkedRate:r.userRate.rate})),t.next=21;break;case 18:t.prev=18,t.t0=t.catch(0),H(t.t0.response.data);case 21:case"end":return t.stop()}}),t,null,[[0,18]])})));return function(e){return t.apply(this,arguments)}}(),L=function(e){x(Object(u.a)({},R,Object(n.a)({},e.target.name,e.target.value)))},M=function(e,t){t.preventDefault(),x(Object(u.a)({},R,{checkedRate:e-1}));for(var a=Object(l.a)(T),n=0;n<5;n++)a[n]=n<e?m.a.createElement(h.c,null):m.a.createElement(h.a,null);q(a)};return m.a.createElement("div",null,t.state.isAuthenticated&&m.a.createElement("div",null,m.a.createElement("h3",null,"Rate Product:"),m.a.createElement("form",{onSubmit:K},m.a.createElement("label",{className:"text-warning clickable",onClick:function(e){return M(1,e)},htmlFor:"r1"},T[0]),m.a.createElement("input",{className:"d-none",type:"radio",name:"checkedRate",value:"0",label:"1",id:"r1",checked:"0"===R.checkedRate,onChange:L}),m.a.createElement("label",{className:"text-warning clickable",onClick:function(e){return M(2,e)},htmlFor:"r2"},T[1]),m.a.createElement("input",{className:"d-none",type:"radio",name:"checkedRate",value:"1",label:"2",id:"r2",checked:"1"===R.checkedRate,onChange:L}),m.a.createElement("label",{className:"text-warning clickable",onClick:function(e){return M(3,e)},htmlFor:"r3"},T[2]),m.a.createElement("input",{className:"d-none",type:"radio",name:"checkedRate",value:"2",label:"3",id:"r3",checked:"2"===R.checkedRate,onChange:L}),m.a.createElement("label",{className:"text-warning clickable",onClick:function(e){return M(4,e)},htmlFor:"r4"},T[3]),m.a.createElement("input",{className:"d-none",type:"radio",name:"checkedRate",value:"3",label:"4",id:"r4",checked:"3"===R.checkedRate,onChange:L}),m.a.createElement("label",{className:"text-warning clickable",onClick:function(e){return M(5,e)},htmlFor:"r5"},T[4]),m.a.createElement("input",{className:"d-none",type:"radio",name:"checkedRate",value:"4",label:"5",id:"r5",checked:"4"===R.checkedRate,onChange:L}),m.a.createElement("textarea",{className:"form-control w-50",name:"comment",placeholder:"optional rate review",value:R.comment,onChange:L}),m.a.createElement("button",{className:"btn btn-outline-success mt-1"},R.id?"update rate":"rate"))),G&&m.a.createElement("p",{className:"text-danger"},m.a.createElement("small",null,G)),0==O.length&&m.a.createElement("h6",null,"0 reviews"),O.length>0&&m.a.createElement("h6",null,O.length," reviews"),O.map((function(e){return m.a.createElement("div",{key:e.id},e.comment&&(!t.state.user||e.PurchaseDetails[0].Purchase.User.id!==t.state.user.id)&&m.a.createElement("div",null,m.a.createElement("i",null,e.PurchaseDetails[0].Purchase.User.fullName)," | ",m.a.createElement("b",null,function(e){var t=[0,0,0,0,0];return t[e]+=1,m.a.createElement(f.a,{rate:t})}(e.rate)),m.a.createElement("br",null),m.a.createElement("p",null,e.comment),m.a.createElement("hr",null)))})),m.a.createElement("br",null),F>0&&m.a.createElement(d.a,{page:S,count:F,updatePage:function(e){P(e)},perPage:5}))}}}]);
//# sourceMappingURL=5.bundle.js.map