import { books } from '../../libs/database.js';
import { response } from '../../libs/utils/response.js';

export function getAllBooks(req, h) {
  const { name, reading, finished } = req.query;

  let result = books;

  if (name) {
    result = result.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading) {
    const isReading = reading === '1';
    result = result.filter((book) => book.reading === isReading);
  }

  if (finished) {
    const isFinished = finished === '1';
    result = result.filter((book) => book.finished === isFinished);
  }

  return h
    .response(
      response('success', null, {
        books: result.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      })
    )
    .code(200);
}
