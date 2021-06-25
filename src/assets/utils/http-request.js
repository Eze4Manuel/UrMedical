import axios from "axios";

const dev = 'https://traffledev.appbuiltest.com/api/v1'
// const staging = 'https://api2.appbuiltest.com/api/v1'
const Axios = axios.create({baseURL: dev});
export default Axios;