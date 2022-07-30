import * as request from "./utils/requester";

const baseUrl = "http://localhost:3030/data/games";

export const getAll = () => request.get(baseUrl);

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) => request.put(`${baseUrl}/${gameId}`, gameData);

export const getOne = (gameId) => request.get(`${baseUrl}/${gameId}`);
