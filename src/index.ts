import express, {NextFunction, Request, Response} from "express";
import routes from "./routes";
import cors from "cors";
import * as dotenv from "dotenv";
import {HttpException} from "./models/http-exception.model";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(routes)

app.get("/",(req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!"
        })
    } catch(e){
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        })
    }
})

/* eslint-disable */
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (err && err.name === 'UnauthorizedError') {
        return res.status(401).json({
            status: 'error',
            message: 'missing authorization credentials',
        });
        // @ts-ignore
    } else if (err && err.errorCode) {
        // @ts-ignore
        res.status(err.errorCode).json(err.message);
    } else if (err) {
        res.status(500).json(err.message);
    }
});

app.listen(port, () => {
    console.log(`
        🚀 Server ready at: http://localhost:${port}
    `)
})
