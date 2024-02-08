import {z} from "zod";

const loanBodySchema = z.object({
  book_id: z.number()
})

const updateLoanSchema = z.object({
  loan_status: z.enum(["done", "pending"]),
  description: z.string()
})

const updateLoanDetailSchema = z.object({
  loan_detail_status: z.enum(["returned", "pending", "missing"]),
  description: z.string()
})

export type LoanDetailBody = z.infer<typeof updateLoanDetailSchema>;
export type LoanUpdateBody = z.infer<typeof updateLoanSchema>;
export type LoanBody = z.infer<typeof loanBodySchema>
