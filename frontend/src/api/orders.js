import axios from 'axios';

export const getOrderedItems = async (id) => {
    const res = await axios.get(`/api/order/orderTrack/${id}`);
    console.log('getOrderedItems', res.data);
    return res.data;
}

export const getAllOrderedItems = async () => {
    const res = await axios.get(`/api/order/orderedItems`);
    console.log('AllOrderedItems', res.data);
    return res.data;
}

export const createOrderedItems = async (body) => {
    const res = await axios.post(`/api/order/order`, body);
    console.log('createOrderedItems', res.data);
    return res.data;
}

export const updateOrderStatus = async (id, body) => {
    const res = await axios.patch(`/api/order/updateOrderStatus/${id}`, body);
    console.log('updateOrder', res.data);
    return res.data;
}

export const deleteOrderedItems = async (id) => {
    const res = await axios.delete(`/api/order/orderTrack/${id}`);
    console.log('deleteOrderedItems', res.data);
    return res.data;
}