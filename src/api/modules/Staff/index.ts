import { baseInstance } from "@/api/instance";
const { post } = baseInstance;

import { addBookParams, IdBookParams, ResBookParams, UserParams } from "./types";

const addBook = (params: addBookParams) => {
  return post<ResBookParams>("/url", params);
}

const deleteBook = (params: IdBookParams) => {
  return post<ResBookParams>("/url", params);
}

const clearFee = (params: UserParams) => {
  return post<ResBookParams>("/url", params);
}

export { addBook, deleteBook, clearFee }