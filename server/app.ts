import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import appRouter from "./routers";
// import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();

// Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// Midedlewares
// app.use(express.json());
// process.env.COOKIE_SECRET ? app.use(cookieParser(process.env.COOKIE_SECRET)) : console.log("Missing cookie secret key");

// Remove in production
// app.use(morgan("dev"));

// // Endpoints
// app.use("/api/v1", appRouter);
// console.log("Mounted appRouter successfully");

// Export app
export default app;
