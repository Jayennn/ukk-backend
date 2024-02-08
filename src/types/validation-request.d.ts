import {Request} from "express";

export interface UserData {
  id: number;
  role: string;
  username: string;
}

export interface ValidationRequest extends Request {
  user: UserData;
}
