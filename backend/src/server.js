import dotenv from "dotenv";
import connectDb from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./src/.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 6000);
    console.log(`Server is running on port : ${process.env.PORT}`);
  })
  .catch((error) => {
    console.log(`MONGO Db failed ${error}`);
  });
