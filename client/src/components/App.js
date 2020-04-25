import React from 'react';
import { Route, Switch} from 'react-router-dom';
import {UserContext, UserContextProvider} from '../contexts/user';
//import needed component
import Header from './common/header';
import Home from './product/home';
import Login from './authentication/login';
import Register from './authentication/register';
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
                                <Route exact path="/" component={Home} />
                                <Route path="/login" render={(props)=><Login {...props} user={user} />} />
                                <Route path="/register" render={(props)=><Register {...props} user={user} />} />
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