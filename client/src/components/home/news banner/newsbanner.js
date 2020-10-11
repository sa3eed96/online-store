import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newsbanner.scss';
import Spinner from '../../common/spinner';

const NewsBanner = (props) => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const {data} = await axios.get(`/api/news`);
                setNews(data.news);
                setLoading(false);
            } catch (err) {}
        };
        getNews();
    }, []);
//s
    return (
        <Spinner loading={loading}>
            <div className="row justify-content-center">
                <div className="col-12">

                    <div id="newsBannerCourousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {news.map((item, index)=>(
                                <div key={item.id} className={`carousel-item ${index===0? 'active':''}`}>
                                    <div className="carousel-caption">
                                        <p>{item.content}</p>
                                    </div>
                                    <img src={item.image} />
                                </div>)
                            )}
                        </div>
                        <a className="carousel-control-prev" href="#newsBannerCourousel" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#newsBannerCourousel" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>
        </Spinner>
    );
};

export default NewsBanner;

