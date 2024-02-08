import {prisma} from "../../prisma/prisma-client";
import {CategoryBody} from "../models/category.model";
import {HttpException} from "../models/http-exception.model";

export const getCategories = async() => {
  return await prisma.category.findMany()
}

export const getDetailCategory = async(id: number) => {
  const checkCategoryIDisExist = await prisma.category.findFirst({
    where: {
      id
    }
  })



  if(!checkCategoryIDisExist){
    throw new HttpException(400, "Category ID is not exists")
  }

  return checkCategoryIDisExist
}

export const createCategory = async(data: CategoryBody) => {

  const checkCategoryIsExist = await prisma.category.findUnique({
    where: {
      category_name: data.category_name
    }
  })

  if(checkCategoryIsExist){
   throw new HttpException(400, "Category already exists")
  }


  return await prisma.category.create({
    data: {
      category_name: data.category_name
    }
  })
}


export const updateCategory = async(id: number, data: CategoryBody) => {
  const checkCategoryIsExist = await prisma.category.findUnique({
    where: {
      category_name: data.category_name
    }
  })

  if(checkCategoryIsExist){
    throw new HttpException(400, "Category already exists")
  }

  const checkCategoryIDisExist = await prisma.category.findFirst({
    where: {
      id
    }
  })

  if(!checkCategoryIDisExist){
    throw new HttpException(400, "Category ID is not exists")
  }

  return await prisma.category.update({
    where: {
      id
    },
    data: {
      category_name: data.category_name
    }
  })
}
