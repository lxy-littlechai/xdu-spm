import { baseInstance } from "@/api/instance";
const { post } = baseInstance;

import { addBookParams, IdBookParams, ResBookParams, UserParams } from "./types";

const getBookByISBN = (ISBN: any) => {
  return baseInstance({
    url: "/Staff/GetBookByISBN",
    method: "get",
    data: {
      ISBN
    }
  });
}

const addBook = (book: any) => {
  return baseInstance({
    url: "/Staff/AddBook",
    method: "post",
    data: {
      book
    }
  });
}

const deleteBook = (ISBN: any) => {
  return baseInstance({
    url: "/Staff/DeleteBook",
    method: "post",
    data: {
      ISBN
    }
  });
}

const updateBook = (book: any) => {
  return baseInstance({
    url: "/Staff/UpdateBook",
    method: "post",
    data: {
      book
    }
  });
}

const returnBook = (book: any) => {
  return baseInstance({
    url: "/Staff/ReturnBook",
    method: "post",
    data: {
      book
    }
  });
}

export { getBookByISBN, addBook, deleteBook, updateBook, returnBook }