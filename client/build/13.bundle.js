(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{181:function(e,a,t){"use strict";t.r(a);var c=t(3),l=t.n(c),n=t(5),r=t(2),s=t(0),m=t.n(s),i=t(18),u=t(6),o=t(4),d=t.n(o),p=t(153),E=t(35),v=t(10);a.default=function(e){var a=Object(s.useState)([]),t=Object(r.a)(a,2),c=t[0],o=t[1],b=Object(s.useState)(1),N=Object(r.a)(b,2),h=N[0],w=N[1],f=Object(s.useState)(0),g=Object(r.a)(f,2),O=g[0],j=g[1],x=Object(i.h)().url,Y=Object(s.useState)(!0),y=Object(r.a)(Y,2),P=y[0],D=y[1];Object(s.useEffect)((function(){(function(){var e=Object(n.a)(l.a.mark((function e(){var a,t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.a.get("/api/purchase?page=".concat(h));case 3:a=e.sent,t=a.data,o(t.purchases),j(t.count),D(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}})()()}),[h]);return m.a.createElement("div",{className:"row mt-4 thirdWindowHeight"},m.a.createElement("div",{className:"col-8 mx-auto bg-white"},m.a.createElement(v.a,{loading:P},m.a.createElement("div",{className:"row"},m.a.createElement("h5",{className:"col"},"My Purchases")),m.a.createElement("hr",null),m.a.createElement("div",{className:"row"},0===c.length&&m.a.createElement("div",{className:"alert-warning col mx-2"},m.a.createElement("p",null,"You Have No Purchases",m.a.createElement("br",null),"Order items to view them here")),c.length>0&&m.a.createElement("div",{className:"col list-group list-group-flush"},c.map((function(e){return m.a.createElement(u.b,{to:"".concat(x,"/").concat(e.id),className:"list-group-item list-group-item-action",key:e.id},m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,"status: ",e.isPaid?m.a.createElement("span",{className:"text-success"},"Paid"):m.a.createElement("span",{className:"text-danger"},"Not Paid")," ",function(e){return e?m.a.createElement("span",{className:"text-success"},"Delivered"):m.a.createElement("span",{className:"text-warning"},"Not Delivered")}(e.Shipment.delivered)))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"ordered on:")," ",Object(p.a)(e.createdAt).format("DD-MM-YYYY HH:mm"))),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"delivered on:")," ",Object(p.a)(e.Shipment.delivery).format("DD-MM-YYYY")))),m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"payment type:")," ",e.paymentType)),m.a.createElement("div",{className:"col"},m.a.createElement("p",null,m.a.createElement("b",null,"total:")," ",e.total,m.a.createElement("small",null," EGP")))))})),m.a.createElement("hr",null))),O>0&&m.a.createElement(E.a,{page:h,count:O,updatePage:function(e){D(!0),w(e)},perPage:12}))))}}}]);
//# sourceMappingURL=13.bundle.js.map