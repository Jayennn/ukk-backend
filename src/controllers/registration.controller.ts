import {NextFunction, Request, Response, Router} from "express";
import {createStudent} from "../services/students.service";
import {HttpException} from "../models/http-exception.model";
import {getUsers} from "../services/users.service";


const router = Router();



router.post('/', async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const student = await createStudent(req.body)

    res.status(200).json({
      message: "Registration Success",
      data: student
    })

  } catch (e){
    if(e instanceof HttpException){
      return res.status(e.status).json({
        message: e.message
      })
    }

    if(e instanceof Error) {
      return res.status(500).json({
        message: e.message
      })
    }

    next(e)
  }
})

export default router;
