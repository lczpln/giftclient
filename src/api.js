import axios from 'axios';

const api = axios.create({
    baseURL: 'https://giftapi.lucaspellison.now.sh'
})

export default api;