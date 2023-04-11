import { baseInstance } from "@/api"
const { post } = baseInstance;
import { BookLists, BorrowedBookLists, HistoryBookLists } from "./types";
import { BookParams } from "./Book/types";
import axios from "axios";

const getBookLists = (label: string) => {
  return baseInstance({
    url: "/Patron/BookSearch",
    method: 'post',
    data: {
      label: label

    }
  });
}

const getBorrowedBookLists = (username: string) => {
  return baseInstance({
    url: "/Patron/getBorrowedBook",
    method: 'get',
    data: {
      username
    }
  });
}

const getHistoryBookLists = (params: string) => {
  return post<HistoryBookLists>("/url", params);
}

export { getBookLists, getBorrowedBookLists, getHistoryBookLists }