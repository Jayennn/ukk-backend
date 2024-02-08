import {NextFunction, Request, Response, Router} from "express";
import {createUsers, getUsers} from "../services/users.service";
import {HttpException} from "../models/http-exception.model";


const router = Router();


router.get('/', async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const users = await getUsers();
    res.status(200).json({
      message: "Get users success",
      data: users
    })
  } catch(e){

    if(e instanceof HttpException){
      return res.status(e.status).json({
        message: e.message
      })
    }

    if(e instanceof Error){
      return res.status(400).json({
        message: e.message
      })
    }
    next(e)
  }
})

router.post('/', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const users = await createUsers(req.body)
    res.status(200).json({
      message: "Create user success",
      data: users
    })
  } catch (e) {

    if(e instanceof HttpException){
      return res.status(e.status).json({
        message: e.message
      })
    }

    if(e instanceof Error){
      return res.status(400).json({
        message: e.message
      })
    }

    next(e)
  }
})

export default router;
