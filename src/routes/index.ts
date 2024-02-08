import loansController from "../controllers/loan.controller"
import studentsController from "../controllers/student.controller"
import loginController from "../controllers/login.controller";
import staffController from "../controllers/staff.controller";
import categoriesController from "../controllers/category.controller";
import booksController from "../controllers/book.controller";
import registrationStudentController from "../controllers/registration.controller";
import authorController from "../controllers/author.controller";
import {Router} from "express";
import {accessValidation} from "../middleware/accessValidation";
import {errorHandler} from "../middleware/errorHandler";
import shelfController from "../controllers/shelf.controller";
import bookshelfController from "../controllers/bookshelf.controller";
import userController from "../controllers/user.controller";
import multer from "multer";
import studentLoansController from "../controllers/student-loans.controller";


const upload = multer();

const api = Router()
  .use("/auth/login", upload.none(), loginController)
  .use("/users", userController)
  .use("/shelf", upload.none() ,shelfController)
  .use("/bookshelf", bookshelfController)
  .use("/students", upload.none(), studentsController)
  .use("/students", upload.none(), studentLoansController)
  .use("/staffs", staffController)
  .use("/books", booksController)
  .use("/authors", authorController)
  .use("/categories", upload.none(), categoriesController)
  .use("/auth/registration", upload.none(), registrationStudentController)
  .use("/loans", upload.none(), loansController);

export default Router().use("/api/v1", api) as Router;
