import axios from "axios";

/**
 * Async function. Recover raids data from the back-end.
 * @returns {Promise<AxiosResponse<Object>>}, list of known raids with their Data.
 */
function getRaidsData() {
    return axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}raidsData`)
        .then(res => {
          console.log(res.data);
            return res.data;
        });
}
export default getRaidsData;