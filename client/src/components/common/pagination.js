import React, {useState, useEffect} from 'react';

const Pagination = (props)=> {

    const [page, setPage] = useState(props.page);
    const [pages, setPages] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(Math.ceil(props.count/props.perPage));

    useEffect(()=>{
        const tempArr = [];
        if(page == 1){
            for (let index = 1; index <= numberOfPages &&index <= 3; index++) {
                tempArr.push(index);
            }
        }
        else if(page == numberOfPages){
            for (let index = page; index > numberOfPages-3 && index >= 1; index--) {
                tempArr.unshift(index);
            }
        }
        else{
            tempArr.push(page-1);
            tempArr.push(page);
            tempArr.push(page+1);
        }
        setPages(tempArr);
    },[page]);

    const incPage = (e)=>{
        e.preventDefault();
        if(props.count > props.perPage * page){
            setPage(page + 1);
            props.updatePage(page);
        }
    };

    const decPage = (e)=>{
        e.preventDefault();
        if(page > 1){
            setPage(page - 1);
            props.updatePage(page);
        }
    };

    const setPagetoNumber = (page, e)=> {
        e.preventDefault();
        setPage(page);
        props.updatePage(page);
    }

    return (
        <div className="col-12 mt-4">
            <nav aria-label="Pagination bar">
                <ul className="pagination justify-content-center">
                <li className={`page-item ${page==1 ? 'disabled': ''}`}>
                    <a className="page-link" href="#" onClick={decPage}>Previous</a>
                </li>
                {pages.map((p, index)=>(
                    <li key={index} className={`page-item ${page == p ? 'active': ''}`}>
                        <a className="page-link" href="#" onClick={e=> setPagetoNumber(p, e)}>{p}</a>
                    </li>
                ))}
                <li className={`page-item ${page == numberOfPages ? 'disabled': ''}`}>
                    <a className="page-link" href="#" onClick={incPage}>Next</a>
                </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;