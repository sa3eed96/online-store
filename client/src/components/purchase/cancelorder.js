import React,{useState} from 'react';
import axios from 'axios';
import $ from 'jquery';
import Spinner from '../common/spinner';
import eventBus from '../../utils/eventbus';

const CancelOrder = (props)=> {
    const [loading, setLoading] = useState(false);
    
    const cancel = async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/purchase/${props.id}`);
            eventBus.dispatch("showNotification", {
                body: 'order has been canceled',
                background: 'bg-success',
                header: 'Success',
            });
            $('#cancelModal').modal('hide');
            props.history.replace('/purchases');
        }catch(err){
            setLoading(false);
            eventBus.dispatch("showNotification", {
                body: 'could not cancel order, try again later',
                background: 'bg-danger',
                header: 'Error',
            });
        }
    };

    return (
        <div>
            <button data-toggle="modal" data-target="#cancelModal" className="btn btn-danger btn-sm">
                cancel order
            </button>
            <div className="modal fade" id="cancelModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered " role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h6>Are you sure you want to cancel the order?</h6>
                        </div>
                        <div className="modal-footer">
                                <button onClick={cancel} className="btn btn-danger">Confirm</button>
                                <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <Spinner loading={loading}></Spinner>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
