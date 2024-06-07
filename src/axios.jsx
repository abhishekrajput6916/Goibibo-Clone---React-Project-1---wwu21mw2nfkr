import axios from 'axios';
const API= axios.create({
    baseURL:"https://academics.newtonschool.co/api/v1/bookingportals",
});
export default API; 