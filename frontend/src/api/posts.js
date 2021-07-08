import axios from 'axios';

export const getPosts = async () => {
    const res = await axios.get('/api/post/');
    // return res.data.splice(0, 4);
    console.log(res.data)
    return res.data; 
}

export const getPostByID = async (id) => {
    const res = await axios.get(`/api/post/${id}`);
    return res.data;
}

export const createPost = async (body) => {
    const res = await axios.post(`/api/post/${post}`);
    return res.data;
}

export const updatePost = async (id, body) => {
    const res = await axios.patch(`/api/post/${id}`, body);
    return res.data;
}

export const deletePost = async (id) => {
    const res = await axios.delete(`/api/post/${id}`);
    return res.data;
}