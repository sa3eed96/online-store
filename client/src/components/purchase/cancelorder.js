import React,{useState} from 'react';
import axios from 'axios';
import $ from 'jquery';

const CancelOrder = (props)=> {
    const [loading, setLoading] = useState(false);
    
    const cancel = async()=>{
        try{
            setLoading(true);
            await axios.delete(`/api/purchase/${props.id}`);
            props.showNotification('order has been canceled', 'bg-success', 'Success');
            $('#cancelModal').modal('hide');
            props.history.replace('/purchases');
        }catch(err){
            setLoading(false);
            props.showNotification('could not cancel order, try again later', 'bg-danger', 'Error');
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
                        <div class="modal-body">
                            <h6>Are you sure you want to cancel the order?</h6>
                        </div>
                        <div class="modal-footer">
                                <button onClick={cancel} class="btn btn-danger">Confirm</button>
                                <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                {loading &&
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancelOrder;
