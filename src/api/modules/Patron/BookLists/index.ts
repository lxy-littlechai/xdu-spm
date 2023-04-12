import { baseInstance } from "@/api"
const { post } = baseInstance;
import { BookLists, BorrowedBookLists, HistoryBookLists } from "./types";
import { BookParams } from "./Book/types";
import axios from "axios";

const getBookLists = (data: any) => {
  return baseInstance({
    url: "/Patron/BookSearch",
    method: 'post',
    data
  });
}

const getBorrowedBookLists = (data: any) => {
  return baseInstance({
    url: "/Patron/GetBorrowedBook",
    method: 'post',
    data
  });
}

const getHistoryBookLists = (params: string) => {
  return post<HistoryBookLists>("/url", params);
}

export { getBookLists, getBorrowedBookLists, getHistoryBookLists }