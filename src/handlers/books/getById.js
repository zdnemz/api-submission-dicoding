import { books } from '../../libs/database.js';
import { response } from '../../libs/utils/response.js';

export function getBooksById(req, h) {
  const bookId = req.params.bookId;

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return h.response(response('fail', 'Buku tidak ditemukan')).code(404);
  }

  return h.response(response('success', null, { book: books[bookIndex] }));
}
