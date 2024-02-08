import {ErrorRequestHandler, NextFunction, Request, Response, Router} from "express";
import {createCategory, getCategories, getDetailCategory, updateCategory} from "../services/categories.service";
import {HttpException} from "../models/http-exception.model";
import {Prisma} from "@prisma/client";


const router = Router();


router.get('/', async(req: Request, res: Response, next: NextFunction)=> {
  try {

    const categories = await getCategories();


    return res.status(200).json({
      message: "Get categories success",
      data: categories
    })
  } catch (e) {
    if(e instanceof Error){
      return res.status(500).json({
        message: e.message
      })
    }
    next(e)
  }
})

router.get('/:id', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const category_id = Number(req.params.id);
    console.log("id", category_id)
    const categories = await getDetailCategory(category_id)

    res.status(200).json({
      message: "Get detail category success",
      data: categories
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

router.put('/:id', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const category_id = Number(req.params.id);
    const categories = await updateCategory(category_id, req.body);

    return res.status(200).json({
      message: "Update category success",
      data: categories
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

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await createCategory(req.body);

    res.status(201).json({
      message: "Create category success",
      data: categories
    })
  } catch(e){
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
