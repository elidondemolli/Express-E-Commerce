import axios from "axios";

export const getUsers = async () => {
    const res = await axios.get('/api/auth/');
    console.log('currUser', res.data);
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