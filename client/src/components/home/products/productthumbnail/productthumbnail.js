import React, {useEffect} from 'react';
import './productthumbnail.scss';
import { FaChevronCircleRight } from 'react-icons/fa';
import RateView from '../../../rate/rateview';

const ProductThumbnail = ({product, props}) => {

    useEffect(()=>{
        document.querySelector(`#product${product.id}`).style.backgroundImage = `url(${product.Colors[0].images[0]})`;
    }, []);


    const redirectToProduct = (id, e)=>{
        e.preventDefault();
        props.history.push(`/product/${id}`);
    };

    const productPrice = (product)=> {
        if(product.Discount){
            return product.price - product.Discount.discount/100 * product.price;
        }
        return product.price;
    };

    return (
        <div id={`product${product.id}`} className="col-md-5 col-xs-10 thumbnail" onClick={e=> redirectToProduct(product.id, e)}>
            {product.Discount &&
                <div className="thumbnailDiscount">
                    <small>{product.Discount.discount}%</small>
                </div>
            }
            <div className="thumbnailContent">
                    <p className="col-12">{product.name.length > 50 ? product.name.substring(0,47)+"..." :product.name}</p>
                    <div className="d-flex justify-content-between">
                        <RateView rate={product.rate} />
                        <p className="pl-1">{productPrice(product)} EGP </p>
                    </div>
            </div>
        </div>
    );
};

export default ProductThumbnail;