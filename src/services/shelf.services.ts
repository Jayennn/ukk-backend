import {prisma} from "../../prisma/prisma-client";
import {ShelfBody} from "../models/shelf.model";
import {HttpException} from "../models/http-exception.model";


export const getShelf = async() => {
  return await prisma.shelf.findMany({
    include: {
      bookshelf: {
        include: {
          shelf: true,
          book: true
        }
      }
    }
  })
}

export const createShelf = async(data: ShelfBody) => {
  console.log(data)
  const findExistingShelf = await prisma.shelf.findUnique({
    where: {
      shelf_code: data.shelf_code
    }
  })

  if(findExistingShelf){
    throw new HttpException(202, "Shelf already exists")
  }

  return await prisma.shelf.create({
    data: {
      shelf_code: data.shelf_code
    }
  })
}

export const updateShelf = async(id: number, data: ShelfBody) => {
  const findExistingShelf = await prisma.shelf.findUnique({
    where: {
      shelf_code: data.shelf_code
    }
  })

  if(findExistingShelf){
    throw new HttpException(202, "Shelf already exists")
  }

  return prisma.shelf.update({
    where: {
      id
    },
    data: {
      shelf_code: data.shelf_code
    }
  })

}

export const deleteShelf = async(id: number) => {
  const checkShelfIsExisting = await prisma.shelf.findFirst({
    where: {
      id
    }
  })

  if(!checkShelfIsExisting){
    throw new HttpException(202, "Shelf is not exist")
  }

  return prisma.shelf.delete({
    where: {
      id
    }
  })
}
