import {NextFunction, Request, Response, Router} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {findUsers} from "../services/login.service";

const router = Router();

router.post('/', async(req: Request, res: Response, next: NextFunction) => {
  const {username, password} = req.body;
  const users = await findUsers(username);

  if(!users){
    return res.status(404).json({
      message: "User not found"
    })
  }

  if(!users.password){
    return res.status(404).json({
      message: "Password not set"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, users.password)


  if(!isPasswordValid){
    return res.status(403).json({
      message: "Wrong password"
    })
  }

  const payload = {
    id: users.id,
    name: users.name,
    username: users.username,
    address: users.address,
    phone_number: users.phone_number,
    role: users.role,
  }

  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: 60 * 60
  })
  
  const cookie = req.cookies.auth_session;
  if(cookie === undefined){
    // res.cookie('auth_session', token)
    res.cookie('auth_role', users.role)
    console.log('cookie created successfully')
  }

  return res.json({
    message: "Login success",
    data: {
      token,
      ...payload
    },
  })
})

export default router;
