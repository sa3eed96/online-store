import React, {useState, lazy, Suspense} from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {UserContext, UserContextProvider} from '../contexts/user';
//import needed component
import Header from './common/header';
import Products from './product/products';
import Product from './product/product';
import Login from './authentication/login';
import PageNotFound from './PageNotFound';
import Toast from './common/toast';
import AddToCart from './cart/addtocart';
import ErrorBoundry from './errorboundry';
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
    const [notification, setNotification] = useState({});
    const [show, setShow] = useState(false);

    const showNotification = (body, background, header)=>{
        setNotification({
            body,
            background,
            header,
        });
        setShow(!show);
    };

    return (
        <div className="container-fluid">
            <UserContextProvider>
                <UserContext.Consumer>
                    {user=>(
                        <div>
                            <Header user={user} />
                            <Toast show={show} body={notification.body} background={notification.background} header={notification.header} />
                            <ErrorBoundry>
                                <Suspense fallback={<div></div>}>
                                    <Switch>
                                        <Route exact path="/" render={(props)=> <Products {...props} showNotification={showNotification} />} />
                                        <Route path="/product/:id" component={Product} />
                                        <Route path="/login" render={(props)=>!user.state.isAuthenticated ?<Login {...props} user={user} />: <Redirect to='/' />} />
                                        <Route path="/register" render={(props)=>!user.state.isAuthenticated ?<Register showNotification={showNotification} {...props} user={user} />:<Redirect to='/' />} />
                                        <Route path="/addtocart" render={(props) =>user.state.isAuthenticated ? <AddToCart {...props} /> : <Redirect to='/login' />} />
                                        <Route path="/cart" render={(props) =>user.state.isAuthenticated ? <Cart {...props} showNotification={showNotification} /> : <Redirect to='/login' /> } />
                                        <Route path="/purchase" render={(props) =>user.state.isAuthenticated ? <Purchase {...props} /> : <Redirect to='/login' /> } />
                                        <Route path="/purchases/:id" render={(props) =>user.state.isAuthenticated ? <PurchaseDetails showNotification={showNotification} {...props} /> : <Redirect to='/login' /> } />
                                        <Route path="/purchases" render={(props) =>user.state.isAuthenticated ? <Purchases {...props} /> : <Redirect to='/login' /> } />
                                        <Route path={"/settings/addresses/add" } render={(props) =>user.state.isAuthenticated ? <Address {...props} showNotification={showNotification} />: <Redirect to='/login' /> } />
                                        <Route path={`/settings/addresses/:addId`}  render={(props) =>user.state.isAuthenticated ? <Address {...props} showNotification={showNotification} />: <Redirect to='/login' /> } />
                                        <Route path="/settings/addresses" render={(props) =>user.state.isAuthenticated ? <Addresses {...props} showNotification={showNotification} />: <Redirect to='/login' /> } />
                                        <Route path="/settings/userinfo" render={(props) =>user.state.isAuthenticated ? <UserInfo {...props} user={user} showNotification={showNotification} />: <Redirect to='/login' /> } />
                                        <Route path="/settings/changepassword" render={(props) =>user.state.isAuthenticated ? <ChangePassword {...props} showNotification={showNotification} /> : <Redirect to='/login' /> } />
                                        <Route path="/settings/deleteaccount" render={(props) =>user.state.isAuthenticated ? <DeleteAccount user={user} {...props} showNotification={showNotification} /> : <Redirect to='/login' /> } />
                                        <Route path="/settings" render={(props) =>user.state.isAuthenticated ? <Settings {...props} /> : <Redirect to='/login' /> } />
                                        <Route path="/forgotpassword/:id" showNotification={showNotification} component={ForgotPassword} />
                                        <Route path="/emailverify/:id" component={EmailVerify} />
                                        <Route component={PageNotFound} />
                                    </Switch>
                                </Suspense>
                            </ErrorBoundry>
                        </div>
                    )}
                </UserContext.Consumer>
            </UserContextProvider>
        </div>
    );
}

export default App;