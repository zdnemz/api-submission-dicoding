import { nanoid } from 'nanoid';
import { books } from '../../libs/database.js';
import { response } from '../../libs/utils/response.js';

export function addBooks(req, h) {
  const data = req.payload;

  if (!data.name) {
    return h
      .response(response('fail', 'Gagal menambahkan buku. Mohon isi nama buku'))
      .code(400);
  }

  if (data.readPage > data.pageCount) {
    return h
      .response(
        response(
          'fail',
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        )
      )
      .code(400);
  }

  const id = nanoid();
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name: data.name,
    year: data.year || new Date().getFullYear(),
    author: data.author || 'Unknown',
    summary: data.summary || '',
    publisher: data.publisher || '',
    pageCount: data.pageCount || 0,
    readPage: data.readPage || 0,
    finished: data.readPage === data.pageCount,
    reading: data.reading || false,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h
    .response(response('success', 'Buku berhasil ditambahkan', { bookId: id }))
    .code(201);
}
