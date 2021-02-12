import request from "request";
import CONFIG from "../config";

function getRaidStream() {
    return request(`${process.env.GBFUAPP_SERVER_HOSTNAME}raids`);
}
export default getRaidStream;