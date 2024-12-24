import dotenv from "dotenv";

dotenv.config({
  path: "./src/.env",
});

import connectDb from "./db/db.js";
import app from "./app.js";


connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8080);
    console.log(`Server is running on port : ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`MONGO Db failed ${error}`);
  });
