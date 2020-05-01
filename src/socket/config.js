import io from "socket.io-client";
const endpoint = process.env.REACT_APP_THREE_API_URL;
export const socket = io(endpoint);
