import { bookInstance } from "@/api"
import { BookParams, IdBookParams, ResBookParams } from "./types"
const { post: bookPost } = bookInstance;

const getBook = (params: IdBookParams) => {
  return bookPost<BookParams>("/url", params);
}

const borrowBook = (params: IdBookParams) => {
  return bookPost<ResBookParams>("/url", params);
}

export { getBook, borrowBook, }