import axios from 'axios';

export const getQR_Code = async (id) => {
    const res = await axios.post(`/api/qrCode/qr/${id}`);
    console.log('qr', res.data)
    return res.data;
}

export const code = async (code) => {
    const res = await axios.get(`/api/qrCode/code/${code}`);
    console.log('code', res.data)
    return res.data;
}

export const discountToken = async (token) => {
    const res = await axios.get(`/api/qrCode/disc/${token}`);
    console.log('disc', res.data)
    return res.data;
}

export const delete_discountCodes = async (id) => {
    const res = await axios.delete(`/api/qrCode/discount-delete/${id}`);
    console.log('delete_discount', res.data);
    return res.data;
}