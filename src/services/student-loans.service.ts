import {prisma} from "../../prisma/prisma-client";
import {LoanBody} from "../models/loan.model";


export const getStudentLoans = async(student_id: number) => {
  return await prisma.loan.findFirst({
    where: {
      student_id: student_id
    },
    include: {
      loan_details: {
        include: {
          book: true
        }
      },
      student: true
    }
  })
}

export const createStudentLoan = async(student_id: number, data: LoanBody) => {

  const date_now = Date.now()
  const due_date = new Date(date_now)
  due_date.setDate(due_date.getDate() + 10);


  const checkStudentHaveActiveLoan = await prisma.student.findFirst({
    where: {
      id: student_id,
      loan: {
        some: {
          student_id: student_id
        }
      }
    }
  })


  const loan = await prisma.loan.create({
    data: {
      student_id: student_id,
      due_date: due_date
    }
  })

  await prisma.loan_details.create({
    data: {
      loan_id: loan.id,
      book_id: data.book_id
    }
  })

  return loan
}

export const deleteStudentLoan = async(student_id: number, loan_id: number) => {

  // const loan_details = await prisma.loan_details

  return await prisma.loan.delete({
    where: {
      id: loan_id,
      AND: {
        student_id: student_id
      },
    }
  })
}

// export const update
