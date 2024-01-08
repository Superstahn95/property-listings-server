const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const globalErrorHandler = require("./controllers/errorController.js");
const connectDb = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routing middleware
app.use("/api/v1/listing", require("./routes/listingRoute"));
app.use("/api/v1/request", require("./routes/requestRoute"));
app.use("/api/v1/message", require("./routes/messageRoute"));
app.use("/api/v1/subscriber", require("./routes/subscriberRoute"));

//global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
