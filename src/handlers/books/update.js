import { books } from '../../libs/database.js';
import { response } from '../../libs/utils/response.js';

export function updateBook(req, h) {
  const bookId = req.params.bookId;
  const data = req.payload;

  if (!data.name) {
    return h
      .response(response('fail', 'Gagal memperbarui buku. Mohon isi nama buku'))
      .code(400);
  }

  if (data.readPage > data.pageCount) {
    return h
      .response(
        response(
          'fail',
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        )
      )
      .code(400);
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex === -1) {
    return h
      .response(response('fail', 'Gagal memperbarui buku. Id tidak ditemukan'))
      .code(404);
  }

  const updatedAt = new Date().toISOString();

  const updatedBook = {
    ...books[bookIndex],
    ...data,
    finished: data.readPage === data.pageCount,
    updatedAt,
  };

  books[bookIndex] = updatedBook;

  return h.response(response('success', 'Buku berhasil diperbarui')).code(200);
}
