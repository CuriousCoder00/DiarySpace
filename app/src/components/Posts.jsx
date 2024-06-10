import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../services/Api';
import Post from './Post';


const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ category : category || '' });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category]);
  return (
    <>
    {
        posts?.length ? posts.map((post) => (
          <div key={post._id} className="flex flex-col gap-4">
              <Link to={`details/${post._id}`} className="text-2xl font-semibold text-sky-900">
                <Post post={post}/>
              </Link>
        </div> 
        )) : <div className="text-2xl font-semibold text-sky-900">No Posts Found</div>
    }
    </>
  )
}

export default Posts
