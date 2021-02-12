import request from "request";

/**
 * Recover the twitter stream of GBF backup requests.
 * @returns {*}, a stream of backup request.
 */
function getRaidStream() {
    console.log(`${process.env.REACT_APP_SERVER_HOSTNAME}raids`);
    return request(`${process.env.REACT_APP_SERVER_HOSTNAME}raids`);
}
export default getRaidStream;