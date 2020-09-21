import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DiscountBanner = (props)=>{

    const [discounts, setDiscounts] = useState([]); 

    useEffect(()=>{
        const getBanners = async()=>{
            const {data} = await axios.get('/api/discount');
            setDiscounts(data.discounts);
        }
        getBanners();
    },[]);

    return(
        <div>
            {discounts.map(discount=>
                <div className="col-11 mx-auto my-3 p-2 alert bg-dark">
                    <h4 className="text-center text-white mx-auto">{discount.name} Sale on Selected Items <span className="text-warning">{discount.discount}% Off</span></h4>
                </div>    
            )}
        </div>
    );
};

export default DiscountBanner;