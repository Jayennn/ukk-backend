import {prisma} from "../../prisma/prisma-client";
import {BookBody} from "../models/book.model";
import {HttpException} from "../models/http-exception.model";
import {Request} from "express";


export const getBooks = async(req: Request) => {
  const { page, limit } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  return await prisma.book.findMany({
    take: Number(limit),
    skip: skip,
    include: {
      bookshelf: true,
      author_books: {
        include: {
          author: true
        }
      }  ,
      category: true
    }
  })
}

export const getDetailBook = async(id: number) => {
  const books = await prisma.book.findFirst({
    where: {
      id
    },
    include: {
      category: true,
      author_books: {
        include: {
          author: true
        }
      }
      // bookshelf: {
      //   select: {
      //     shelf: {
      //       select: {
      //         id: true,
      //         shelf_code: true
      //       }
      //     }
      //   }
      // }
    }
  })

  if(!books) {
    throw new HttpException(202,"Book is not exist")
  }

  return books
}

export const createBook = async(data: BookBody, image: string | undefined) => {
  const checkExistingBooks = await prisma.book.findUnique({
    where: {
      book_title: data.book_title
    }
  })

  // const checkCapacityBookShelf = await prisma.bookshelf.count({
  //   where: {
  //     shelf_id: Number(data.shelf_id)
  //   }
  // })

  if(checkExistingBooks){
    throw new HttpException(202, "Book already exists")
  }
  //
  // if(checkCapacityBookShelf === 3){
  //   throw new HttpException(202, "Bookshelf is full")
  // }


  const book = await prisma.book.create({
    data: {
      book_title: data.book_title,
      category_id: Number(data.category_id),
      book_cover: image,
      release_date: data.release_date,
    },
  })

  for(const author_id of data.author_id){
    await prisma.author_books.createMany({
      data: {
        book_id: book.id,
        author_id: Number(author_id)
      },
    })
  }


  return book

}

export const updateBook = async(id: number, data: BookBody, image: string | undefined) => {
  const checkIdBookIsExist = await prisma.book.findFirst({
    where: {
      id
    },
  })

  // const checkExistingBooks = await prisma.book.findUnique({
  //   where: {
  //     book_title: data.book_title
  //   }
  // })

  if(!checkIdBookIsExist){
    throw new HttpException(204, "Book is not exist")
  }

  // if(checkExistingBooks){
  //   throw new HttpException(202, "Book already exists")
  // }


  const book = await prisma.book.update({
    where: {
      id
    },
    data: {
      book_title: data.book_title,
      book_cover: image,
      category_id:  Number(data.category_id),
      release_date: data.release_date,
    },
    include: {
      author_books: true
    }
  })

  await prisma.author_books.deleteMany({
    where: {
      book_id: id
    }
  })

  for (const author_id of data.author_id) {
    await prisma.author_books.createMany({
      data: {
        book_id: id,
        author_id: Number(author_id)
      }
    });
  }

  return book;

}

export const deleteBook = async(book_id: number) => {
  const checkBookIsExist = await prisma.book.findFirst({
    where: {
      id: book_id
    }
  })

  if(!checkBookIsExist){
    throw new HttpException(202, "Book is not exist")
  }

  // const isBookOnShelf =  await prisma.bookshelf.findFirst({
  //   where: {
  //     book_id
  //   }
  // })
  //
  // if(!isBookOnShelf){
  //   throw new HttpException(400, "Book is not on the specified bookshelf")
  // }

  await prisma.bookshelf.deleteMany({
    where: {
      book_id
    }
  })

  await prisma.author_books.deleteMany({
    where: {
      book_id
    }
  })

  return await prisma.book.delete({
    where: {
      id: book_id,
    }
  })
}
