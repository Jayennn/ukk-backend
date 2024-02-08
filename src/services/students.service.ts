import {prisma} from "../../prisma/prisma-client";
import {StudentBody} from "../models/student.model";
import bcrypt from "bcrypt";
import {HttpException} from "../models/http-exception.model";


export const getStudents = async() => {
  return await prisma.student.findMany({
    include: {
      loan: {
        include: {
          loan_details: true
        }
      }
    }
  })
}

export const createStudent = async(data: StudentBody) => {
  const findExistingUsername = await prisma.student.findUnique({
    where: {
      username: data.username
    }
  })
  const hashPassword = await bcrypt.hash(data.password, 10)

  if(findExistingUsername){
    throw new HttpException(202, "Username is already use")
  }

  return await prisma.student.create({
    data: {
      name: data.name,
      address: data.address,
      phone_number: data.phone_number,
      username: data.username,
      password: hashPassword
    },
  })
}

export const getDetailStudent = async(id: number) => {
  const student = await prisma.student.findFirst({
    where: {
      id
    }
  })

  if(!student){
    throw new HttpException(204,"Student is not exist")
  }

  return student

}

export const updateStudent = async(id: number, data: StudentBody) => {
  const student_id = await prisma.student.findFirst({
    where: {
      id
    }
  })


  if(!student_id){
    throw new HttpException(204,"Student is not exist")
  }

  return await prisma.student.update({
    where: {
      id: student_id.id
    },
    data: {
      name: data.name,
      phone_number: data.phone_number,
      gender: data.gender,
      address: data.address,
    }
  })
}

export const deleteStudent = async(id: number) => {
  const student_id = await prisma.student.findFirst({
    where: {
      id
    }
  })

  if(!student_id){
    throw new HttpException(204,"Student is not exist")
  }

  return await prisma.student.delete({
    where: {
      id: student_id.id
    }
  })
}
