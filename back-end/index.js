import express from "express";
import cors from "cors";
import path from "path";
import ProdukRoute from "./routes/ProdukRoute.js";

const port = 3000;
const app = express();

app.use(express.static(path.resolve('public')));

app.use(cors());
app.use(express.json());
app.use(ProdukRoute);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
