import multer from "multer";
import path from "path";
import {Request} from "express";

export const handleSaveImages = (destination: string) => {
   const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, destination)
    },
    filename(req, file, callback){
      callback(
        null,
        path.parse(file.originalname).name
        + "-"
        + Date.now()
        + path.extname(file.originalname)
      )
    }
  })

  const upload = multer({storage})

  return {
    storage,
    upload
  }
}

export const imageUrl = (req: Request, folder: string) => {
  if(typeof req.file !== "undefined"){
    return req.protocol + "://" + req.get('host') + `/${folder}/` + req.file.filename;
  }

  return req.file;
}
