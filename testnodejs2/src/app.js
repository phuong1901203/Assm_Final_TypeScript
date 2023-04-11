import express from "express";
import mongoose from "mongoose";
import routerProduct from "./routers/product";
import routerUser from "./routers/user";
import routerCategory from "./routers/category";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routerProduct);
app.use("/api", routerUser);
app.use("/api", routerCategory);
mongoose.connect("mongodb://127.0.0.1:27017/web503");

export const viteNodeApp = app;
