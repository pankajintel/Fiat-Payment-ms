const express = require("express");
const path = require("path");
const connectDB = require("./config/database/db");
const { expressMiddleware } = require("./config/middleware/express_middleware");
const dotenv = require("dotenv");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
connectDB();
expressMiddleware(app);

const swaggerOptions = require('./swagger');

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use("/api/user", require("./router/user"));

// router middleware

app.get("/", (_, res) => {
  return res.send("API running");
});

app.use((err,req,res,next)=>{
  return res.status(err.status).json({message:err.message});
})

app.listen(PORT, () => console.log(`Server started on port http://localhost:${PORT}`));
