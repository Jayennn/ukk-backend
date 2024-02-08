import {NextFunction, Request, Response, Router} from "express";
import {createStudentLoan, deleteStudentLoan, getStudentLoans} from "../services/student-loans.service";

const router = Router();

router.get('/:studentId/loans', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const student_id = Number(req.params.studentId)
    const studentLoans = await getStudentLoans(student_id)
    res.status(200).json({
      message: "Show data Success",
      data: studentLoans
    })
  } catch (e) {
    next(e)
  }
})

router.post('/:studentId/loans', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const student_id = Number(req.params.studentId)
    const studentLoans = await createStudentLoan(student_id, req.body);

    res.status(200).json({
      message: "Create loan success",
      data: studentLoans
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:studentId/loans/:loanId', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const student_id = Number(req.params.studentId)
    const loan_id = Number(req.params.loanId)

    const studentLoans = await deleteStudentLoan(student_id, loan_id);

    res.status(200).json({
      message: "Delete loan success",
      data: studentLoans
    })

  } catch (e){
    next(e)
  }
})

// router.patch('/:studentId/loans/:loanId', (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const student_id = Number(req.params.studentId)
//     const loan_id = Number(req.params.loanId)
//
//   } catch (e) {
//     next(e)
//   }
// })

export default router;
