import axios from 'axios';
const config = {
    headers: {
      projectID: "wwu21mw2nfkr",
    },
  };
const API= axios.create({
    baseURL:"https://academics.newtonschool.co/api/v1/bookingportals",
    headers: {
        projectID: "wwu21mw2nfkr",
      }
});
export default API; 