import axios from 'axios';

export const searchPosts = async (title) => {
    const res = await axios.get(`/api/post/search/${title}`);
    return res.data;
}

export const getPosts = async () => {
    const res = await axios.get('/api/post/');
    // return res.data.splice(0, 4);
    console.log(res.data)
    return res.data.sort().reverse(); 
}

export const getPostByID = async (id) => {
    const res = await axios.get(`/api/post/${id}`);
    console.log(res.data)
    return res.data;
}

export const createPost = async (body) => {
    const res = await axios.post(`/api/post/`, body);
    console.log('res', res)
    return res.data;
}

export const updatePost = async (id, body) => {
    const res = await axios.patch(`/api/post/${id}`, body);
    console.log('update', res.data)
    return res.data;
}

export const deletePost = async (id) => {
    const res = await axios.delete(`/api/post/${id}`);
    return res.data;
}

export const login = async (body) => {
    const res = await axios.post(`/api/user/login`, body);
    console.log('asd', res.data)
    return res.data;
}

export const register = async (body) => {
    const res = await axios.post('/api/user/register', body);
    console.log('register', res.data);
    return res.data;
}

export const getUsers = async () => {
    const res = await axios.get('/api/auth/');
    console.log('currUser', res.data);
    return res.data;
}