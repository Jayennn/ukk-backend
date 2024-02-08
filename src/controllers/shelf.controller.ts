import {NextFunction, Request, Response, Router} from "express";
import {createShelf, deleteShelf, getShelf, updateShelf} from "../services/shelf.services";
import {HttpException} from "../models/http-exception.model";

const router = Router();

router.get('/', async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const shelf = await getShelf();
    res.status(200).json({
      message: "Get shelf success",
      data: shelf
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


router.post('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const shelf = await createShelf(req.body)
    res.status(201).json({
      message: "Create shelf success",
      data: shelf
    })
  } catch(e) {
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

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const shelf_id = Number(req.params.id)
    const shelf = await updateShelf(shelf_id, req.body)

    res.status(200).json({
      message: "Success update shelf",
      data: shelf
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

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const shelf_id = Number(req.params.id)
    const shelf = await deleteShelf(shelf_id)

    res.status(200).json({
      message: "Shelf delete success",
      data: shelf
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
