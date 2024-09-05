import express from 'express';
// import cors from "cors";
import appRouter from "./routes";
// import cookieParser from "cookie-parser";

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

// // Endpoints
app.use("/api/v1", appRouter);
console.log("Mounted appRouter successfully");

// Export app
export default app;
