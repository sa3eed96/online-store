import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Comment = (props) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const getComments = async()=>{
            try {
                const comments = await axios.get(`/api/product/${props.productId}/comment/${page}`);
                setComments(comments.data.comments);
            } catch (err) {
                alert(err);
            }
        }
        getComments();
    }, [page]);


    const handleOnChange = (e) => {
        e.preventDefault();
        setNewComment(e.target.value);
    };

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            const comment = await axios.post(`/api/product/${props.productId}/comment`, {
                comment: newComment,
                UserId: props.user.state.user.id,
                ProductId: props.productId,
            });
            comment.data.comment.User = props.user.state.user;
            setComments([comment.data.comment, ...comments]);
            setNewComment('');
        } catch (err) {
            alert(err);
        }
    };

    const handleDeleteComment = async(commentId, index, e) =>{
        try{
            e.preventDefault();
            await axios.delete(`/api/product/${props.productId}/comment/${commentId}`);
            const tempComments = [...comments];
            tempComments.splice(index, 1);
            setComments(tempComments);
        }catch(err){
            alert(err);
        }

    }

    const incPage = (e) => {
        e.preventDefault();
        if (count > 5 * page)
            setPage(page + 1);
    }

    const decPage = (e) => {
        e.preventDefault();
        if (page > 1)
            setPage(page - 1);
    }

    return (
        <div>
            <hr />
            <h3>Comments</h3>
            {comments.map((comment, index) => 
                (
                    <div key={comment.id}>
                        <h6>{comment.User.fullName}</h6>
                        {props.user.state.isAuthenticated &&
                            (props.user.state.user.id === comment.User.id) &&
                            <form onSubmit={(e)=>handleDeleteComment(comment.id, index, e)}>
                                <button>delete comment</button>
                            </form>
                        }
                        <p>{comment.comment}</p>
                        <hr />
                    </div>

                )
            )
            }
            <a href="#" onClick={decPage}>&lt;</a>
            page: {page}  
            <a href="#" onClick={incPage}>&gt;</a>
            {props.user.state.isAuthenticated &&
                <form onSubmit={handleOnSubmit}>
                    <textarea onChange={handleOnChange} value={newComment} placeholder="enter your comment"></textarea>
                    <button>Post Comment</button>
                </form>}
        </div>
    );
};

export default Comment;