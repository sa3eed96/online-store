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
import Addresses from './user/address/addresses';
import PrivateRoute from './common/privateRoute';
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
                                <Route path="/settings/addresses" render={(props) =>user.state.isAuthenticated ? <Addresses {...props} />: <Redirect to='/login' /> } />
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