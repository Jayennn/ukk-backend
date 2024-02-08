import {NextFunction, Request, Response, Router} from "express";
import {HttpException} from "../models/http-exception.model";
import {getBookShelf} from "../services/bookshelf.services";


const router = Router();

router.get('/', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const bookshelf = await getBookShelf()
    res.status(200).json({
      message: "Get bookshelf success",
      data: bookshelf
    })
  } catch (e) {
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
