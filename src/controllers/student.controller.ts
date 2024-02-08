import {NextFunction, Request, Response, Router} from "express";
import {createStudent, deleteStudent, getDetailStudent, getStudents, updateStudent} from "../services/students.service";
import {HttpException} from "../models/http-exception.model";
const router = Router()


router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await getStudents();

    res.status(200).json({
      message: "Show data success",
      data: students
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

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const student_id = Number(req.params.id)
    const students = await getDetailStudent(student_id)

    if(!students){
      res.status(404).json({
        message: "Student not found"
      })
    }

    res.status(200).json({
      message: "Show detail success",
      data: students
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

router.put('/:id', async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const student_id = Number(req.params.id)
    const students = await updateStudent(student_id, req.body);

    res.status(200).json({
      message: "Update profile success",
      data: students
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
    const students = await createStudent(req.body);

    res.status(200).json({
      message: "Create student success",
      data: students
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
    const student_id = Number(req.params.id)
    const students = await deleteStudent(student_id)

    res.status(200).json({
      message: "Delete student success",
      data: students
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
