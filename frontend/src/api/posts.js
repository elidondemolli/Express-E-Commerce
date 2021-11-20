import axios from 'axios';

export const getQR_Code = async (id) => {
    const res = await axios.post(`/api/post/qr/${id}`);
    console.log('qr', res.data)
    return res.data;
}

export const code = async (code) => {
    const res = await axios.get(`/api/post/code/${code}`);
    console.log('code', res.data)
    return res.data;
}

export const discountToken = async (token) => {
    const res = await axios.get(`/api/post/disc/${token}`);
    console.log('disc', res.data)
    return res.data;
}

export const delete_discountCodes = async (id) => {
    const res = await axios.delete(`/api/post/discount-delete/${id}`);
    console.log('delete_discount', res.data);
    return res.data;
}

// export const getDiscount = async (id, body) => {
//     const res = await axios.put(`/api/post/discount/${id}`, {code: body});
//     console.log('discount', res.data)
//     return res.data;
// }

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