import {prisma} from "../../prisma/prisma-client";
import {LoanBody, LoanDetailBody, LoanUpdateBody} from "../models/loan.model";
import moment from "moment";
import {formatCurrency} from "../utils/formatCurrency";


export const getLoans = async() => {

  return await prisma.loan.findMany({
    include: {
      student: true,
      loan_details: {
        include: {
          book: true
        }
      }
    }
  });
}

export const getDetailLoans = async(id: number) => {
  return await prisma.loan.findFirst({
    where: {
      id
    },
    include: {
      student: true,
      loan_details: {
        include: {
          book: true
        }
      }
    }
  })
}


export const createLoans = async(student_id: number, data: LoanBody) => {

  const date_now = Date.now()
  const due_date = new Date(date_now)
  due_date.setDate(due_date.getDate() + 10)

  console.log(
    moment(new Date(date_now)).format('L'),
    moment(due_date).format('L')
  )

  return await prisma.loan.create({
    data: {
      student_id: 1,
      due_date: due_date,
      loan_details: {
        create: {
          book_id: data.book_id
        }
      }
    },
    include: {
      loan_details: true
    }
  })
}


export const deleteLoans = async(id: number)=> {
  return await prisma.loan.delete({
    where: {
      id
    },
    include: {
      loan_details: true
    }
  })
}


export const updateStatusLoans = async(id: number, data: LoanUpdateBody) => {

  const date_now = Date.now()
  const due_date = new Date(date_now)
  due_date.setDate(due_date.getDate() + 10)


  const loan = await prisma.loan.update({
    where: {
      id
    },
    data: {
      loan_status: data.loan_status,
      description: data.description
    }
  })

  const formatDueDate = moment(due_date)
  const formatLoanDate = moment(loan.loan_date)

  const different_time = formatLoanDate.diff(formatDueDate, 'days')



  if(different_time > 0){
    return await prisma.loan.update({
      where: {
        id
      },
      data: {
        ...loan,
        loan_penalties: formatCurrency(different_time * 10000)
      }
    })
  }

  return loan
}

export const updateStatusDetailLoans = async(id: number, detail_id: number, data: LoanDetailBody) => {
  await prisma.loan_details.update({
    where: {
      id: detail_id,
      AND: {
        loan_id: id
      }
    },
    data: {
      loan_detail_status: data.loan_detail_status,
      description: data.description
    }
  })

  return await prisma.loan.findFirst({
    where: {
      id
    },
    include: {
      loan_details: true
    }
  })
}
