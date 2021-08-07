import axios from "axios";

const local = 'http://localhost:9005/v1'
// const staging = 'https://camelogserve.appbuildtest.com/v1'
// const live = 'https://api2.appbuiltest.com/api/v1'
const Axios = axios.create({baseURL: local});
export default Axios;