import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './discountbanner.scss';

const DiscountBanner = (props)=>{

    const [discounts, setDiscounts] = useState([]); 

    useEffect(()=>{
        const getBanners = async()=>{
            const {data} = await axios.get('/api/discount?count=1');
            setDiscounts(data.discounts);
        }
        getBanners();
    },[]);

    return(
        <div>
            {discounts.map(discount=>
                <div className="discountBanner">
                    <p>{discount.name} Sale on Selected Items {discount.discount}% Off</p>
                </div>    
            )}
        </div>
    );
};

export default DiscountBanner;