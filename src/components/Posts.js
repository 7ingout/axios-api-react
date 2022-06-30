import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = (props) => {
    const [ posts, setPosts ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const fetchPosts = async () => {
        try {
            setError(null);
            setPosts(null);
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        }
        catch(e) {
            setError(e);
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchPosts();
    }, [])
    if(loading) return <div>로딩중 ...</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!posts) return null;
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                </thead>
                <tbody>
                {posts.map(post=>(
                    <tr key={post.id}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={fetchPosts}>다시 불러오기</button>
        </div>
    );
};

export default Posts;