import {prisma} from "../../prisma/prisma-client";


export const getBookShelf = async() => {
  return await prisma.bookshelf.findMany({
    include: {
      shelf: true,
      book: true
    }
  })
}
