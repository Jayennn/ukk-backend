import {NextFunction, Request, Response, Router} from "express";
import {createBook, deleteBook, getBooks, getDetailBook, updateBook} from "../services/books.services";
import {HttpException} from "../models/http-exception.model";
import {handleSaveImages, imageUrl} from "../utils/multer";


const router = Router();
const {upload} = handleSaveImages('./public/cover')
router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await getBooks(req);

    res.status(200).json({
      message: "Get books success",
      data: books
    })
  }catch (e) {
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

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const book_id = Number(req.params.id)
    const books = await getDetailBook(book_id)

    res.status(200).json({
      message: "Get books success",
      data: books
    })
  } catch (e){
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

router.post('/', upload.single('book_cover'), async(req: Request, res: Response, next: NextFunction)=>{
  try {
    console.log(req.body)
    const books = await createBook(req.body, imageUrl(req, "cover"));

    res.status(201).json({
      message: "Create book success",
      data: books
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

router.put('/:id', upload.single('book_cover') ,async(req: Request, res: Response, next: NextFunction) => {
  try {
    const book_id = Number(req.params.id);
    const books = await updateBook(book_id, req.body, imageUrl(req, "cover"))

    res.status(200).json({
      message: "Update book success",
      data: books
    })
  } catch(e) {
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

router.delete('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const book_id = Number(req.params.id)
    const books = await deleteBook(book_id)

    res.status(200).json({
      message: "Delete book success",
      data: books
    })

  } catch(e){
    if(e instanceof HttpException){
      console.log(e.message)
      return res.status(e.status).json({
        message: e.message ?? "test"
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
