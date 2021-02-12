import axios from "axios";

async function getRaidsData() {
    return await axios.get(`${process.env.GBFUAPP_SERVER_HOSTNAME}raidsData`)
        .then(res => {
            return res.data;
        });
}
export default getRaidsData;