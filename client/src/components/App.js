import React, {useState} from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import {UserContext, UserContextProvider} from '../contexts/user';
//import needed component
import Header from './common/header';
import Products from './product/products';
import Product from './product/product';
import Login from './authentication/login';
import Register from './authentication/register';
import Cart from './cart/cart';
import AddToCart from './cart/addtocart';
import Settings from './settings';
import Address from './user/address/address';
import Addresses from './user/address/addresses';
import UserInfo from './user/userinfo';
import ChangePassword from './user/changepassword';
import DeleteAccount from './user/deleteaccount';
import Purchase from './purchase/purchase';
import Purchases from './purchase/purchases';
import PurchaseDetails from './purchase/purchasedetails';
import PageNotFound from './PageNotFound';
import ForgotPassword from './authentication/forogtpassword';
import EmailVerify from './emailverify';
import Toast from './common/toast';
import './App.css';

function App(props){
    const [notification, setNotification] = useState({});

    const showNotification = (body, background, header)=>{
        setNotification({
            body,
            background,
            header,
        });
    };

    return (
        <div className="container-fluid">
            <UserContextProvider>
                <UserContext.Consumer>
                    {user=>(
                        <div>
                            <Header user={user} />
                            <Toast body={notification.body} background={notification.background} header={notification.header} />
                            <Switch>
                                <Route exact path="/" showNotification={showNotification} component={Products} />
                                <Route path="/product/:id" component={Product} />
                                <Route path="/login" render={(props)=>!user.state.isAuthenticated ?<Login {...props} user={user} />: <Redirect to='/' />} />
                                <Route path="/register" render={(props)=>!user.state.isAuthenticated ?<Register showNotification={showNotification} {...props} user={user} />:<Redirect to='/' />} />
                                <Route path="/addtocart" render={(props) =>user.state.isAuthenticated ? <AddToCart {...props} /> : <Redirect to='/login' />} />
                                <Route path="/cart" render={(props) =>user.state.isAuthenticated ? <Cart {...props} showNotification={showNotification} /> : <Redirect to='/login' /> } />
                                <Route path="/purchase" render={(props) =>user.state.isAuthenticated ? <Purchase {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/purchases/:id" render={(props) =>user.state.isAuthenticated ? <PurchaseDetails showNotification={showNotification} {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/purchases" render={(props) =>user.state.isAuthenticated ? <Purchases {...props} /> : <Redirect to='/login' /> } />
                                <Route path={"/settings/addresses/add" } render={(props) =>user.state.isAuthenticated ? <Address {...props} />: <Redirect to='/login' /> } />
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
                        </div>
                    )}
                </UserContext.Consumer>
            </UserContextProvider>
        </div>
    );
}

export default App;