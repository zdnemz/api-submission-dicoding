import Hapi from "@hapi/hapi";
import { addBooks } from "./handlers/books/add.js";
import { getAllBooks } from "./handlers/books/getAll.js";
import { getBooksById } from "./handlers/books/getById.js";
import { updateBook } from "./handlers/books/update.js";
import { deleteBook } from "./handlers/books/delete.js";

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route([
    {
      method: "POST",
      path: "/books",
      handler: addBooks,
    },
    {
      method: "GET",
      path: "/books",
      handler: getAllBooks,
    },
    {
      method: "GET",
      path: "/books/{bookId}",
      handler: getBooksById,
    },
    {
      method: "PUT",
      path: "/books/{bookId}",
      handler: updateBook,
    },
    {
      method: "DELETE",
      path: "/books/{bookId}",
      handler: deleteBook,
    },
  ]);

  await server.start();
  console.log("Server running on port %s", server.info.uri);
};

init();
