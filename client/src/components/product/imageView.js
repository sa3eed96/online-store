import React, {useState, useEffect} from 'react';
import {IKImage} from  "imagekitio-react";
import $ from 'jquery';

const ImageView = (props)=>{
    const [images, setImages] = useState(props.images.Images);
    const [currentImage, setCurrentImage] = useState(props.images.Images[0].image);

    const changeImage = (img, e)=> {
        e.preventDefault();
        setCurrentImage(img);
    };

    useEffect(()=>{
        setImages(props.images.Images);
        setCurrentImage(props.images.Images[0].image);
        $('#carouselExampleIndicators').carousel(0);
    },[props.images])

    return (
        <div className="row">
            <div style={{height: (window.screen.height / 3)}} id="carouselExampleIndicators" className="carousel slide col-12" data-ride="carousel">
                <div className="carousel-inner h-100">
                    {images.map((image, index)=>(
                        <div key={index} className={`carousel-item h-100 ${index===0? 'active':''}`}>
                            <IKImage 
                                    key={image.id}
                                    publicKey="public_iTgWxt6Swv2sA/BUpcR3EA43QkI="
                                    urlEndpoint="https://ik.imagekit.io/rvfdomceug"
                                    src={image.image}
                                    className="mx-auto h-100 d-block img-fluid"
                                    alt="product image"
                                    transformation={[{
                                    "width": "200",
                                    "aspectRatio":"1-1",
                                    "cropMode":"pad_resize"
                                }]}
                            />
                        </div>
                    ))}
                </div>
                {images.length > 1 && 
                <div>
                <a className="carousel-control-prev bg-dark" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next bg-dark" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>}
            </div>
        </div>
    );
};

export default ImageView;