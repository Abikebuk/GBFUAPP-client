import axios from "axios";

async function getRaidsData() {
    return await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}raidsData`)
        .then(res => {
            return res.data;
        });
}
export default getRaidsData;