import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SubmitMyRate from './submitmyrate';
import ViewMyRate from './viewmyrate';
import Spinner from '../../common/spinner';
import eventBus from '../../../utils/eventbus';

const MyRate = (props)=> {
    const [myRate, setMyRate] = useState({
        comment: '',
        checkedRate: '4',
    });
    const [editFlag, setEditFlag] = useState('edit');
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const getMyRate = async()=>{
            const {data} = await axios.get(`/api/product/${props.productId}/userrate/myrate`);
            console.log(data);
            if(data.myRate){
                setMyRate({
                    ...data.myRate,
                    checkedRate: data.myRate.rate,
                });
                setEditFlag('view');
            }
            setLoading(false);
        };
        getMyRate();
    }, []);

    const updateRate = (rate)=>{
        eventBus.dispatch("showNotification", {
            body: 'Rate Submitted',
            background: 'bg-success',
            header: 'Success',
        });
        setMyRate(rate);
        setEditFlag('view');
    };

    const edit = ()=>{
        if(editFlag === 'view')
            setEditFlag('edit');
        else
            setEditFlag('view');
    }

    return (
        <Spinner loading={loading}>
            {editFlag === 'edit' && 
                <SubmitMyRate myRate={myRate} edit={edit} updateRate={updateRate} productId={props.productId} rate={props.rate}/>
            }
            {editFlag === 'view' &&
                <ViewMyRate myRate={myRate} edit={edit} />
            }
        </Spinner>
    );
}

export default MyRate;