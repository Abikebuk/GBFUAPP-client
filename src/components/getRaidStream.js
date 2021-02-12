import request from "request";

function getRaidStream() {
    return request(`${process.env.REACT_APP_SERVER_HOSTNAME}raids`);
}
export default getRaidStream;