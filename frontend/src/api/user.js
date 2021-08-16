import axios from "axios";

export const getUsers = async () => {
    const res = await axios.get('/api/auth/');
    console.log('currUser', res.data);
    return res.data;
}

export const getUserById = async (id) => {
    const res = await axios.get(`/api/user/${id}`);
    console.log('byIdUser', res.data);
    return res.data;
}

export const updateUser = async (id, body) => {
    const res = await axios.put(`/api/user/update/${id}`, body);
    console.log('updateUser', res.data);
    return res.data;
}

export const getAllUsers = async () => {
    const res = await axios.get('/api/user/all');
    console.log('alluser', res.data);
    return res.data;
}

export const forgotPassword = async (body) => {
    const res = await axios.put('/api/user/forgot-password', body);
    console.log('forgotPassword', res.data);
    return res.data;
}

export const resetPassword = async (token, body) => {
    const res = await axios.put(`/api/user/reset-password/${token}`, body);
    console.log('resetPassword', res.data);
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

export const deleteUser = async (id) => {
    const res = await axios.delete(`/api/user/delete/${id}`);
    return res.data
}

export const carts = async (id, body) => {
    const res = await axios.put(`/api/user/add/${id}`, body);
    console.log('cart', res.data);
    return res.data;
}

export const getCarts = async (id) => {
    const res = await axios.get(`/api/user/getCart/${id}`);
    console.log('cartGet', res.data.cart);
    return res.data.cart;
}

export const deleteCarts = async (userId,id) => {
    const res = await axios.delete(`/api/user/delete/cart/${userId}/${id}`);
    return res.data
}