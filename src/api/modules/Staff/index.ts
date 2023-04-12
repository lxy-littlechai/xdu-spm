import { baseInstance } from "@/api/instance";
const { post } = baseInstance;

import { addBookParams, IdBookParams, ResBookParams, UserParams } from "./types";

const getBookByISBN = (data: any) => {
  return baseInstance({
    url: "/Staff/GetBookByISBN",
    method: "post",
    data
  });
}

const addBook = (data: any) => {
  return baseInstance({
    url: "/Staff/AddBook",
    method: "post",
    data
  });
}

const deleteBook = (data: any) => {
  return baseInstance({
    url: "/Staff/DeleteBook",
    method: "post",
    data
  });
}

const updateBook = (data: any) => {
  return baseInstance({
    url: "/Staff/UpdateBook",
    method: "post",
    data
  });
}

const borrowBook = (data: any) => {
  return baseInstance({
    url: "/Staff/BorrowBook",
    method: "post",
    data
  });
}

const returnBook = (data: any) => {
  return baseInstance({
    url: "/Staff/ReturnBook",
    method: "post",
    data
  });
}

export { getBookByISBN, addBook, deleteBook, updateBook, returnBook, borrowBook }