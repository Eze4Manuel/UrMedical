import axios from "axios";

const ENV = 'local';

const getBaseURL = (env) => {
    if (env === 'local') {
        return 'http://localhost:9005/v1'
    }

    if (env === 'staging') {
        return 'https://camelogserve.appbuildtest.com/v1'
    }

    return 'https://api.urmed.ng/api/v1'
}

// const uri = 'http://localhost:9005/v1' // local
// const uri = 'https://camelogserve.appbuildtest.com/v1' // staging
// const uri = 'https://api2.appbuiltest.com/api/v1' // live

const uri = getBaseURL(ENV)
const Axios = axios.create({baseURL: uri});
export default Axios;