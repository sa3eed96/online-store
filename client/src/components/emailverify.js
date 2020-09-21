import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from './common/spinner';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'


const EmailVerify = (props)=> {
    const {id} = useParams();
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const verify = async()=> {
            try{
                await axios.delete(`/api/verify/${id}`);
                setVerified(true);
                setLoading(false);
            }catch(err){
                setVerified(false);
                setLoading(false);
            }
        };
        verify();
    }, []);



    return(
        <Spinner loading={loading}>
            <div className="row">
                {verified && 
                    <div className="col-12">
                        <h1 className="text-success text-center"><FaCheckCircle size={128} /></h1>
                        <h3 className="text-center">Email Verfied successfully</h3>
                    </div>
                }
                {!verified &&
                    <div className="col-12">
                        <h1 className="text-danger text-center"><FaTimesCircle size={128} /></h1>
                        <h3 className="text-center">Error verifying email</h3>
                    </div>
                }
            </div>
        </Spinner>
    )


};


export default EmailVerify;