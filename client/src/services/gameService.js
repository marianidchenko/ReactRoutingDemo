import * as request from "./utils/requester";

const baseUrl = "http://localhost:3030";

export const getAll = () => request.get(`${baseUrl}/data/games`);