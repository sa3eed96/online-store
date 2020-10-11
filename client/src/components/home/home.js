import React from 'react';
import NewsBanner from './news banner/newsbanner';
import Products from './products/products';

const Home = (props) => {

    return (
        <div className="container">
            {props.location.search === '' &&
                <NewsBanner />
            }
            <Products props={props} />
        </div>
    );
};
//as
export default Home;

