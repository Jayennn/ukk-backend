import {prisma} from "../../prisma/prisma-client";
import {UserBody} from "../models/user.model";
import bcrypt from "bcrypt";
import {HttpException} from "../models/http-exception.model";


export const getUsers = async() => {
  return await prisma.user.findMany({
    include: {
      staff: true
    }
  })
}

export const createUsers = async(data: UserBody) => {

  const findUserAlreadyExist = await prisma.user.findUnique({
    where: {
      username: data.username
    }
  })

  if(findUserAlreadyExist){
    throw new HttpException(202, "User already exists")
  }

  const hashPassword = await bcrypt.hash(data.password, 10)
  return await prisma.user.create({
    data: {
      username: data.username,
      password: hashPassword,
      role: data.role,
      staff_id: Number(data.staff_id),
    }
  })
}

// export const deleteUsers = async(dat)
