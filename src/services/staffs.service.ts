import {prisma} from "../../prisma/prisma-client";
import {StaffBody} from "../models/staff.model";
import bcrypt from "bcrypt";
import {HttpException} from "../models/http-exception.model";


export const getStaffs = async() => {
  return await prisma.staff.findMany()
}

export const getDetailStaff = async(id: number) => {
  const staff = await prisma.staff.findFirst({
    where: {
      id
    }
  })

  if(!staff) {
    throw new HttpException(202,"Staff is not exist")
  }

  return staff
}

export const createStaff = async(data: StaffBody) => {
  return await prisma.staff.create({
    data: {
      name: data.name,
      address: data.address,
      phone_number: data.phone_number,
    }
  })
}

export const updateStaff = async(id: number, data: StaffBody) => {
  const checkIDStaffIsExist = await prisma.staff.findFirst({
    where: {
      id
    }
  })

  if(!checkIDStaffIsExist){
    throw new HttpException(202, "Staff is not exist")
  }

  return prisma.staff.update({
    where: {
      id
    },
    data: {
      name: data.name,
      phone_number: data.phone_number,
      address: data.phone_number
    }
  })

}


export const deleteStaff = async(id: number) => {
  const checkStaffIsExist = await prisma.staff.findFirst({
    where: {
      id
    }
  })

  if(!checkStaffIsExist){
    throw new HttpException(400, "Staff is not exist")
  }


  return await prisma.staff.delete({
    where: {
      id
    }
  })
}
