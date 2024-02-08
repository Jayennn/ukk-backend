import {NextFunction, Request, Response, Router} from "express";
import {createAuthor, deleteAuthor, getAuthors, getDetailAuthor, updateAuthor} from "../services/authors.service";
import {HttpException} from "../models/http-exception.model";
import {handleSaveImages, imageUrl} from "../utils/multer";


const router = Router();
const {upload} = handleSaveImages('./public/avatar');

router.get('/', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await getAuthors();

    res.status(200).json({
      message: "Get authors success",
      data: authors
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

router.get('/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const author_id = Number(req.params.id)
    const authors = await getDetailAuthor(author_id)

    return res.status(200).json({
      message: "Get detail author success",
      data: authors
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

router.put('/:id', upload.single('author_image'),async(req: Request, res: Response, next: NextFunction) => {
  try {

    const author_id = Number(req.params.id)
    const authors = await updateAuthor(author_id, req.body, imageUrl(req, "avatar"))

    return res.status(200).json({
      message: "Update author success",
      data: authors
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

router.post('/', upload.single('author_image') ,async(req: Request, res: Response, next: NextFunction)=>{
  try {

    const authors = await createAuthor(req.body, imageUrl(req, "avatar"));

    return res.status(201).json({
      message: "Create author success",
      data: authors,
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

router.delete('/:id', async(req: Request, res: Response, next: NextFunction)=> {
  try {
    const author_id = Number(req.params.id)
    const authors = await deleteAuthor(author_id);

    return res.status(200).json({
      message: "Delete author success",
      data: authors
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
