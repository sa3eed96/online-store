import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newsbanner.scss';

const NewsBanner = (props) => {

    const [news, setNews] = useState([]);

    useEffect(() => {
        const getNews = async () => {
            try {
                const {data} = await axios.get(`/api/news`);
                setNews(data.news);
            } catch (err) {}
        };
        getNews();
    }, []);
//s
    return (
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
                    <a class="carousel-control-prev" href="#newsBannerCourousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#newsBannerCourousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default NewsBanner;

