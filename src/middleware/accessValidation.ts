import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {getTokenFromAuthorizationHeader} from "../utils/getToken";
import {UserData, ValidationRequest} from "../types/validation-request";




export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = getTokenFromAuthorizationHeader(authorization);

  if (!token) {
    return res.status(401).json({
      message: "Token diperlukan",
    });
  }

  const secret = process.env.JWT_SECRET!;

  try {
    const jwtDecode = jwt.verify(token, secret);

    if (typeof jwtDecode !== "string") {
      (req as ValidationRequest).user = jwtDecode as UserData;
    }

  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  next();
};

const checkUserRole = (req: Request, res: Response, next: NextFunction, requiredRole: string) => {
  const { authorization } = req.headers;
  const token = getTokenFromAuthorizationHeader(authorization);

  if (!token) {
    return res.status(401).json({
      message: "Token diperlukan",
    });
  }

  try {
    const jwtDecode = jwt.decode(token) as UserData;

    if (jwtDecode.role !== requiredRole) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    next();
  } catch (e) {
    next(e);
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  checkUserRole(req, res, next, "admin");
};

export const isOperator = (req: Request, res: Response, next: NextFunction) => {
  checkUserRole(req, res, next, "operator");
};
