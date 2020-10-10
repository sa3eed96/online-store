import React, {useState, lazy, Suspense} from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {UserContext, UserContextProvider} from '../contexts/user';
//import needed component
import Header from './common/header/header';
import Products from './product/products';
import Home from './home/home';
import Product from './product/product';
import Login from './authentication/login';
import PageNotFound from './PageNotFound';
import Toast from './common/toast';
import AddToCart from './cart/addtocart';
import ErrorBoundry from './errorboundry';
import Spinner from './common/spinner';
import Footer from './common/footer/footer';
const Settings =lazy(()=> import('./settings'));
const Addresses=lazy(()=> import( './user/address/addresses'));
const UserInfo = lazy(()=> import('./user/userinfo'));
const Register =  lazy(()=> import('./authentication/register'));
const Cart = lazy(()=> import('./cart/cart'));
const Address = lazy(()=> import('./user/address/address'));
const ChangePassword =lazy(()=> import('./user/changepassword'));
const DeleteAccount  =lazy(()=> import('./user/deleteaccount'));
const Purchase = lazy(()=> import('./purchase/purchase'));
const Purchases = lazy(()=>import('./purchase/purchases'));
const PurchaseDetails =  lazy(()=>import( './purchase/purchasedetails'));
const ForgotPassword = lazy(()=> import('./authentication/forogtpassword'));
const EmailVerify = lazy(()=> import('./emailverify'));
import './App.css';

function App(props){

    return (
        <div className="appBody windowHeight">
            <UserContextProvider>
                <UserContext.Consumer>
                    {user=>(
                        <div>
                            <Header />
                            <Toast />
                            <ErrorBoundry>
                                <Suspense fallback={<Spinner loading={true}></Spinner>}>
                                    {user.state.isAuthenticated &&
                                        <Switch>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/product/:id" component={Product} />
                                            <Route path="/addtocart" component={AddToCart} />
                                            <Route path="/cart" component={Cart} />
                                            <Route path="/purchase" component={Purchase} />
                                            <Route path="/purchases/:id" component={PurchaseDetails} />
                                            <Route path="/purchases" component={Purchases} />
                                            <Route path="/settings/addresses/add" component={Address} />
                                            <Route path="/settings/addresses/:addId"component={Address} />
                                            <Route path="/settings/addresses" component={Addresses} />
                                            <Route path="/settings/userinfo" component={UserInfo} />
                                            <Route path="/settings/changepassword" component={ChangePassword} />
                                            <Route path="/settings/deleteaccount" component={DeleteAccount} />
                                            <Route path="/settings"  component={Settings} />
                                            <Route path="/emailverify/:id" component={EmailVerify} />
                                            <Route component={PageNotFound} />
                                        </Switch>
                                    }
                                    {!user.state.isAuthenticated &&
                                        <Switch>
                                            <Route exact path="/" component={Home} />
                                            <Route path="/product/:id" component={Product} />
                                            <Route path="/login" component={Login} />
                                            <Route path="/register" component={Register} />
                                            <Route path="/emailverify/:id" component={EmailVerify} />
                                            <Route path="/forgotpassword/:id" component = {ForgotPassword} />
                                            <Route component={PageNotFound} />
                                        </Switch>
                                    }
                                </Suspense>
                            </ErrorBoundry>
                            <Footer />
                        </div>
                    )}
                </UserContext.Consumer>
            </UserContextProvider>
        </div>
    );
}

export default App;