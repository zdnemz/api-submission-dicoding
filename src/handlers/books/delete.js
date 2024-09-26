import { books } from "../../libs/database.js";
import { response } from "../../libs/utils/response.js";

export function deleteBook(req, h) {
  const bookId = req.params.bookId;

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return h
      .response(response("fail", "Buku gagal dihapus. Id tidak ditemukan"))
      .code(404);
  }

  books.splice(bookIndex, 1);

  return h.response(response("success", "Buku berhasil dihapus")).code(200);
}
