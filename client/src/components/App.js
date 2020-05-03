import React from 'react';
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
import PageNotFound from './PageNotFound';



function App(props){
    return (
        <div>
            <UserContextProvider>
                <UserContext.Consumer>
                    {user=>(
                        <div>
                            <Header user={user} />
                            <Switch>
                                <Route exact path="/" component={Products} />
                                <Route exact path="/product/:id" component={Product} />
                                <Route path="/login" render={(props)=><Login {...props} user={user} />} />
                                <Route path="/register" render={(props)=><Register {...props} user={user} />} />
                                <Route path="/addtocart" render={(props) =>user.state.isAuthenticated ? <AddToCart {...props} /> : <Redirect to='/login' />} />
                                <Route path="/cart" render={(props) =>user.state.isAuthenticated ? <Cart {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/purchase" render={(props) =>user.state.isAuthenticated ? <Purchase {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/purchases" render={(props) =>user.state.isAuthenticated ? <Purchases {...props} /> : <Redirect to='/login' /> } />
                                <Route path={"/settings/addresses/add" } render={(props) =>user.state.isAuthenticated ? <Address {...props} />: <Redirect to='/login' /> } />
                                <Route path={`/settings/addresses/:addId`}  render={(props) =>user.state.isAuthenticated ? <Address {...props} />: <Redirect to='/login' /> } />
                                <Route path="/settings/addresses" render={(props) =>user.state.isAuthenticated ? <Addresses {...props} />: <Redirect to='/login' /> } />
                                <Route path="/settings/userinfo" render={(props) =>user.state.isAuthenticated ? <UserInfo {...props} user={user} />: <Redirect to='/login' /> } />
                                <Route path="/settings/changepassword" render={(props) =>user.state.isAuthenticated ? <ChangePassword {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/settings/deleteaccount" render={(props) =>user.state.isAuthenticated ? <DeleteAccount user={user} {...props} /> : <Redirect to='/login' /> } />
                                <Route path="/settings" render={(props) =>user.state.isAuthenticated ? <Settings {...props} /> : <Redirect to='/login' /> } />
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