import {NextFunction, Request, Response, Router} from "express";
import {createStaff, deleteStaff, getDetailStaff, getStaffs, updateStaff} from "../services/staffs.service";
import {HttpException} from "../models/http-exception.model";

const router = Router();

router.get('/', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const staffs = await getStaffs();
    res.status(200).json({
      message: "Get data success",
      data: staffs
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

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const staff_id = Number(req.params.id)
    const staffs = await getDetailStaff(staff_id)

    return res.status(200).json({
      message: "Get detail staff success",
      data: staffs
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


router.post('/', async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const staffs = await createStaff(req.body);
    res.status(201).json({
      message: "Create data success",
      data: staffs
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

router.put('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const staff_id = Number(req.params.id)
    const staffs = await updateStaff(staff_id, req.body)

    res.status(201).json({
      message: "Update staff success",
      data: staffs
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
    const staff_id = Number(req.params.id)
    const staffs = await deleteStaff(staff_id)

    res.status(200).json({
      message: "Delete staff success",
      data: staffs
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
