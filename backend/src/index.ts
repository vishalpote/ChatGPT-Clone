import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { connection } from "./database/database";
import morgan from 'morgan';
import appRouter from "./routes";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config()

const app = express();
const port = process.env.PORT || 8090;

app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({origin:'http://localhost:5173',credentials:true}));


app.use('/api/v1',appRouter);




connection();
app.listen(port, () => {
  (`Server is running at http://localhost:${port}`);
});
