import {NextFunction, Request, Response, Router} from "express";
import {
  createLoans,
  deleteLoans,
  getDetailLoans,
  getLoans,
  updateStatusDetailLoans,
  updateStatusLoans
} from "../services/loans.service";
import {ValidationRequest} from "../types/validation-request";

const router = Router();


router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const loans = await getLoans();

    if(!loans){
      res.json({
        message: "Loans is empty"
      })
    }

    res.json({
      message: "Success get data",
      data: loans
    })
  } catch (e){
    next(e)
  }
})

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const loan_id = req.params.id
    const loans = await getDetailLoans(Number(req.params.id));
    res.json({
      message: `Get loan-${loan_id} success`,
      data: loans
    })

  } catch (e) {
    next(e)
  }
})


router.post('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    // const student = (req as ValidationRequest).user
    const student = {
      id: 1232
    }

    if(req.body.loan_details.length > 3) {
     return res.json({
        message: "Maximum borrow 3 books"
      })
    }

    console.log(student.id)
    const loans = await createLoans(student.id ,req.body);


    res.status(200).json({
      message: "Booking Success",
      data: loans
    })

  } catch (e){
    next(e)
  }
})

router.delete('/:id', async(req: Request, res: Response, next: NextFunction)=> {
  try {

    const loans = await deleteLoans(Number(req.params.id))
    res.status(200).json({
      message: "Booking Success",
      data: loans
    })

  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const loan_id = Number(req.params.id);
    const loans = await updateStatusLoans(loan_id, req.body)
    res.status(200).json({
      message: "Update status success",
      data: loans
    })
  } catch (e) {
    next(e)
  }
})

router.patch('/:id/details/:detailId', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const loan_id = Number(req.params.id);
    const detail_id = Number(req.params.detailId);

    const loans = await updateStatusDetailLoans(loan_id, detail_id, req.body)

    res.status(200).json({
      message: "Update status success",
      data: loans
    })
  } catch (e) {
    next(e)
  }
})

export default router;
