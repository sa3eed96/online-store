import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './components/App';
import axios from 'axios';

const metas = document.getElementsByTagName('meta'); 
let token = '';
for(let i=0; i<metas.length; i++){
    if(metas[i].getAttribute('name') === 'csrf_token'){
        token = metas[i].getAttribute('content');
        break;
    }
}
axios.defaults.headers.common['CSRF-Token'] = token;
axios.defaults.withCredentials = true

render(
<Router>
    <App />
</Router>,
document.getElementById('app')
);