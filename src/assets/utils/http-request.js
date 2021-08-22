import axios from "axios";

// const uri = 'http://localhost:9005/v1' // local
const uri = 'https://camelogserve.appbuildtest.com/v1' // staging
// const uri = 'https://api2.appbuiltest.com/api/v1' // live
const Axios = axios.create({baseURL: uri});
export default Axios;