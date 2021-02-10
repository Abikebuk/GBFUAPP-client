import axios from "axios";
import CONFIG from "../config";

async function getRaidsData() {
    return await axios.get(`${CONFIG.server_hostname}/raidsData`)
        .then(res => {
            return res.data;
        });
}
export default getRaidsData;