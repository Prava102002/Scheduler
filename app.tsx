import express, { Application, Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import routes from "./routes/scheduler.route";
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("This is from App.ts schedules Routes");

app.use("/schedules", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Not Found");
  error.status = httpStatus.NOT_FOUND;
  next(error);
});

export default app;
