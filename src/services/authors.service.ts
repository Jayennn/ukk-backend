import {prisma} from "../../prisma/prisma-client";
import {AuthorBody} from "../models/author.model";
import {HttpException} from "../models/http-exception.model";

export const getAuthors = async() => {
  return await prisma.author.findMany({
    include: {
      author_books: {
        include: {
          book: true
        }
      }
    }
  })
}

export const getDetailAuthor = async(id: number) => {
  const author = await prisma.author.findFirst({
    where: {
      id
    },
    include: {
      author_books: true
    }
  })

  if(!author){
    throw new HttpException(404, "Author is not exist")
  }

  return author
}

export const createAuthor = async(data: AuthorBody, image: string | undefined) => {

  const checkAuthorIsExist = await prisma.author.findUnique({
    where: {
      author_name: data.author_name
    }
  })

  // ?.author_name.match(/([A-za-z])/gi)
  if(checkAuthorIsExist) {
    throw new HttpException(400, "Author already exists")
  }

  return await prisma.author.create({
    data: {
      author_name: data.author_name,
      phone_number: data.phone_number,
      address: data.address,
      author_image: image
    }
  })
}

export const updateAuthor = async(id: number, data: AuthorBody, image: string | undefined) => {
  const checkIDAuthorIsExist = await prisma.author.findFirst({
    where: {
      id
    }
  })

  console.log("INI IMAGE", image)
  if(!checkIDAuthorIsExist){
    throw new HttpException(202, "Author is not exist")
  }

  return await prisma.author.update({
    where: {
      id
    },
    data: {
      author_name: data.author_name,
      address: data.address,
      phone_number: data.phone_number,
      author_image: image
    }
  })
}

export const deleteAuthor = async(id: number) => {
  const checkAuthorIsExist = await prisma.author.findFirst({
    where: {
      id
    }
  })

  if(!checkAuthorIsExist){
    throw new HttpException(202, "Author is not exist")
  }

  return await prisma.author.delete({
    where: {
      id
    }
  })
}
