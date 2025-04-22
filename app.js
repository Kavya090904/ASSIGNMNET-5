const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authorRoutes = require("./routes/authorRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use("/authors", authorRoutes);
app.use("/blogposts", blogPostRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
