import request from "request";
import CONFIG from "../config";

function getRaidStream() {
    return request(`${CONFIG.server_hostname}/raids`);
}
export default getRaidStream;