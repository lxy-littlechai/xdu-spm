import { baseInstance } from "@/api"
const { post } = baseInstance;
import { BookLists, BorrowedBookLists, HistoryBookLists } from "./types";

const getBookLists = () => {
  return post<BookLists>("/url");
}

const getBorrowedBookLists = (params: string) => {
  return post<BorrowedBookLists>("/url", params);
}

const getHistoryBookLists = (params: string) => {
  return post<HistoryBookLists>("/url", params);
}

export { getBookLists, getBorrowedBookLists, getHistoryBookLists }