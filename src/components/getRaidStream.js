import request from "request";

function getRaidStream() {
    return request("http://localhost:3001/raids");
}
export default getRaidStream;