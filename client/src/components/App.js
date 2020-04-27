import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {UserContext, UserContextProvider} from '../contexts/user';
//import needed component
import Header from './common/header';
import Products from './product/products';
import Product from './product/product';
import Login from './authentication/login';
import Register from './authentication/register';
import Cart from './cart/cart';
import addToCart from './cart/addtocart';
import PageNotFound from './PageNotFound';



function App(){
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
                                <Route path="/cart" component={Cart} />
                                <Route path="/addtocart" component={addToCart} />
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