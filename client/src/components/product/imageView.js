import React, {useState, useEffect} from 'react';

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
    },[props.images])

    return (
        <div className="row">
            <div className="col-5 p-1">
                <img src={'/public/images/'+currentImage} className="clickable img-thumbnail" width="250px" height="250px" alt="product image" data-toggle="modal" data-target="#fullImageModal"></img>
            </div>
            <div className="col-1 p-1">
                {images.map(image=>(
                    <img key={image.id} onClick={e=> changeImage(image.image, e)} src={'/public/images/'+image.image} className="clickable img-fluid img-thumbnail" alt="product image"></img>
                ))}
            </div>
            <div className="modal fade" id="fullImageModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered " role="document">
                <div className="modal-content">
                <div className="modal-body">
                    <img src={'/public/images/'+currentImage} className="clickable img-fluid img-thumbnail" alt="product image"></img>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ImageView;