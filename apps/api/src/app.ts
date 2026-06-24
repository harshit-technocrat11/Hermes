import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRoute from "./modules/health/health.routes"
import  authRoutes from "./modules/auth/auth.routes" 
import morgan from 'morgan'

import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware)
app.use(morgan('dev'))

app.use("/health",healthRoute);

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
