import axios from 'axios';

export const mail = async (body) => {
    const res = await axios.post(`/api/mail/`, body);
    console.log(res.data);
    return res.data;
}