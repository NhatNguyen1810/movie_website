import React, {useState} from 'react'
import { Card , Row, Col} from 'antd';
import {useQuery} from '@apollo/react-hooks';
import {getAllMovie} from '../schema/schema';
import {
    Link
} from "react-router-dom";
import './popularMovie.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {ClockCircleFilled,StarFilled} from '@ant-design/icons';
import MovieDisplay from './movieDisplay';
import SelfMadePagination from './pagination'; 

const PopularMovie = (props) => {

    const {data, loading, error} = useQuery(getAllMovie);
    const [senditem, senditemState] = useState(null);
    const [sizeChange, sizeChangeState] = useState({
        width:'240px',
        height: '360px',
    })
    const [flag, flagState] = useState(false);

    const convertToHours = (time) => {
        let hours = Math.floor(time/60);
        let min = time - hours*60;
        let result = hours.toString() + "h" + " " + min.toString() + "m"; 
        return result; 
    }
    
    const handleOnClick = (item) => {
        return <Link  to={{
            pathname: `/popularmovie/${item.id}`,
            
        }}>
        </Link>
    }

    const [currentPage, setCurrentPage] = useState(1); 
    const [postsPerPage, setPostsPerPage] = useState(20);



    if(loading){
        return(
        <React.Fragment>
            <div className="loading-mode">
                <LoadingOutlined className="spin" size="large" />
                <h1>Loading</h1>
            </div>
        </React.Fragment>
        )
    }
    if(error){
        return(
            <React.Fragment>
                <h1>Error</h1>
            </React.Fragment>
        )
    }



    const indexOfLastPost = currentPage*postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.movie.slice(indexOfFirstPost,indexOfLastPost);

    const paginate = (number) => setCurrentPage(number)
   
    return(
        <React.Fragment>

            <MovieDisplay data={currentPosts} />

            <SelfMadePagination
             postsPerPage={postsPerPage}
              totalPosts={data.movie.length}
             paginate={paginate}/>
            
        </React.Fragment>
    )
}


export default PopularMovie;
