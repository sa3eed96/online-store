import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'


const RateView = (props) => {
    const [size, setSize] = useState(props.size ? props.size : 16);

    const noStar = <span className="text-warning"><FaRegStar size={size} /><FaRegStar size={size}/><FaRegStar size={size}/><FaRegStar size={size}/><FaRegStar size={size}/></span>
    const rates = [
    <span className="text-warning"><FaStar   size={size} /><FaRegStar size={size} /><FaRegStar size={size}/><FaRegStar size={size}/><FaRegStar size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStarHalfAlt size={size} size={size} /><FaRegStar size={size}/><FaRegStar /><FaRegStar /></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaRegStar size={size} size={size}/><FaRegStar size={size}/><FaRegStar size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStarHalfAlt size={size} size={size}/><FaRegStar size={size}/><FaRegStar /></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStar size={size}/><FaRegStar size={size}/><FaRegStar size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStar size={size}/><FaStarHalfAlt size={size}/><FaRegStar size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStar size={size}/><FaStar size={size}/><FaRegStar size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStar size={size}/><FaStar size={size}/><FaStarHalfAlt size={size}/></span>
    , <span className="text-warning"><FaStar size={size} /><FaStar size={size} /><FaStar size={size}/><FaStar size={size}/><FaStar size={size}/></span>
    ];

    const [rate, setRate] = useState(props.rate);
    const [expression, setExpression] = useState(noStar);

    useEffect(() => {
        const avg = (rate[0] + rate[1] * 2 + rate[2] * 3 + rate[3] * 4 + rate[4] * 5) / (rate[0] + rate[1] + rate[2] + rate[3] + rate[4]);
        if (avg !== 0) {
            for (let index = 0; index <= 4; index++) {
                if (index+ 1.3 <= avg && index + 1.8 > avg) {
                    setExpression(rates[index * 2 + 1]);
                    break;
                } else if(index + 1.3 > avg && avg < index + 2){
                    setExpression(rates[index * 2]);
                    break;
                }
            }
        }
    }, []);

    return expression;
};

export default RateView;