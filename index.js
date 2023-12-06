import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto", //true kalau https, false kalau http
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:4000", "http://172.16.10.53:4000", "http://172.16.10.53:3000", "https://certifichain.seculab.space", "https://hyperledger.seculab.space", "https://backend.seculab.space"], //pake araay [] bila domain kita banyak
  })
);
app.use(express.json()); //menerima data dalam format json
app.use(fileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
