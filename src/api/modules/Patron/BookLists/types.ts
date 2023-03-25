import { BookParams } from "./Book/types"
import { BorrowedBookParams } from "./BorrowedBook/types"

export interface BookLists {
  bookLists: BookParams
}

export interface BorrowedBookLists {
  bookLists: BorrowedBookParams
}

export interface HistoryBookLists {
  bookLists: HistoryBookLists
}

