import request from "request";

function getRaidStream() {
    return request(`${process.env.GBFUAPP_SERVER_HOSTNAME}raids`);
}
export default getRaidStream;