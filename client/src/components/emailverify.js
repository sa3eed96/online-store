import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerify = (props)=> {
    const {id} = useParams();
    const [verified, setVerified] = useState(false);
    const [done, setDone] = useState(false);
    useEffect(()=>{
        const verify = async()=> {
            try{
                await axios.delete(`/api/verify/${id}`);
                setVerified(true);
                setDone(true);
            }catch(err){
                setVerified(false);
                setDone(true);
            }
        };
        verify();
    }, []);



    return(
        <div className="row">
            <div className="col">
                {verified && done && 
                    <h3 className="text-success">Email Verfied successfully</h3>
                }
                {!verified && done &&
                    <h3 className="text-danger">Error verifying</h3>
                }
            </div>
        </div>
    )


};


export default EmailVerify;