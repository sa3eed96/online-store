import React, {useState, useEffect} from 'react';
import './imageView.scss';
import $ from 'jquery';

const ImageView = (props)=>{
    const [images, setImages] = useState(props.images);
    const [currentImage, setCurrentImage] = useState(props.images[0]);

    const changeImage = (img, e)=> {
        e.preventDefault();
        setCurrentImage(img);
    };

    useEffect(()=>{
        setImages(props.images);
        setCurrentImage(props.images[0]);
        $('#imageViewCourousel').carousel(0);
    },[props.images])

    return (
        <div id="imageViewCourousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner h-100">
                {images.map((image, index)=>(
                    <div key={index} className={`carousel-item h-100 ${index===0? 'active':''}`}>
                        <img src={image} />
                    </div>
                ))}
            </div>
            {images.length > 1 && 
            <div>
            <a className="carousel-control-prev bg-dark" href="#imageViewCourousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next bg-dark" href="#imageViewCourousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
            </div>}
        </div>
    );
};

export default ImageView;