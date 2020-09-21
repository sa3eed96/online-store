(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{107:function(e,t,a){"use strict";t.a=function(e){return Array.prototype.slice.call(e).filter((function(e){return e.name.length>0})).map((function(e){var t=e.validity.typeMismatch;return{name:e.name,typeMismatch:t,valid:e.checkValidity()}})).reduce((function(e,t){return e[t.name]=t.valid,e}),{})}},142:function(e,t,a){"use strict";a.r(t);var r=a(3),n=a.n(r),s=a(5),i=a(23),o=a(25),l=a(26),m=a(21),c=a(28),d=a(27),h=a(0),u=a.n(h),p=a(19),b=a(4),g=a.n(b),f=a(8),y=a(107),v=a(14),w=a(17),N=function(e){Object(c.a)(r,e);var t,a=Object(d.a)(r);function r(e){var t;return Object(o.a)(this,r),(t=a.call(this,e)).state={firstName:"",lastName:"",email:"",password:"",phone:"",serverError:"",loadng:!1,formValidation:{firstName:!0,lastName:!0,email:!0,password:!0,phone:!0}},t.handleChange=t.handleChange.bind(Object(m.a)(t)),t.handleSubmit=t.handleSubmit.bind(Object(m.a)(t)),t}return Object(l.a)(r,[{key:"handleChange",value:function(e){this.setState(Object(i.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:(t=Object(s.a)(n.a.mark((function e(t){var a,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),this.setState({serverError:"",loading:!0}),a=Object(y.a)(t.target.elements),!(Object.keys(a).filter((function(e){return!a[e]})).length>0)){e.next=7;break}return this.setState({formValidation:a,loading:!1,serverError:""}),e.abrupt("return");case 7:return e.next=9,g.a.post("/api/register",this.state);case 9:r=e.sent,this.context.dispatch({type:"register",payload:r.data.user}),this.props.history.replace("/"),w.a.dispatch("showNotification",{body:"confirmation link has been sent to your email",background:"bg-success",header:"Registered successfully"}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(0),this.setState({loading:!1}),this.setState({serverError:e.t0.response.data});case 19:case"end":return e.stop()}}),e,this,[[0,15]])}))),function(e){return t.apply(this,arguments)})},{key:"render",value:function(){return u.a.createElement("div",{className:"card mx-auto col-sm-10 col-md-3 border border-radius mt-4"},u.a.createElement("form",{className:"card-body",onSubmit:this.handleSubmit,noValidate:!0},u.a.createElement("h5",{className:"card-title pb-1 text-center text-secondary"},"Register"),u.a.createElement(p.a,{type:"text",name:"firstName",value:this.state.firstName,onChange:this.handleChange,id:"firstName",label:"First name",required:"required",pattern:"[a-zA-Z]{1,250}",error:(!this.state.formValidation.firstName).toString(),errormsg:"firstname must consist of only letters"}),u.a.createElement(p.a,{type:"text",name:"lastName",value:this.state.lastName,onChange:this.handleChange,id:"lastName",label:"Last name",required:"required",pattern:"[a-zA-Z]{1,250}",error:(!this.state.formValidation.lastName).toString(),errormsg:"lastname must consist of only letters"}),u.a.createElement(p.a,{type:"email",name:"email",value:this.state.email,onChange:this.handleChange,id:"email",label:"Email",required:"required",error:(!this.state.formValidation.email).toString(),errormsg:"invalid email"}),u.a.createElement(p.a,{type:"password",name:"password",value:this.state.password,onChange:this.handleChange,id:"password",label:"Password",required:"required",minLength:"8",maxLength:"30",error:(!this.state.formValidation.password).toString(),errormsg:"password must be between 8 and 30 characters"}),u.a.createElement(p.a,{type:"text",name:"phone",value:this.state.phone,onChange:this.handleChange,id:"phone",label:"Mobile Number",pattern:"01[0-9]{9}",required:"required",error:(!this.state.formValidation.phone).toString(),errormsg:"mobile number must be 11 digit egyptian number"}),u.a.createElement(f.a,{loading:this.state.loading}),u.a.createElement("p",null,u.a.createElement("small",{className:"text-danger"},this.state.serverError)),u.a.createElement("button",{className:"btn btn-primary form-control"},"register")))}}]),r}(u.a.Component);N.contextType=v.a,t.default=N}}]);
//# sourceMappingURL=3.bundle.js.map