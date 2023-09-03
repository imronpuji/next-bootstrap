const express = require("express")
const app = express()
const userRouter = require("./routes/userRouter")
const roleRouter = require("./routes/roleRouter")
const authRouter = require("./routes/authRouter")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")
const bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express")
const authenticateToken = require("./middleware/authenticateToken")

app.use(fileUpload())
app.use(cors())
app.use(
  bodyParser.json({
    limit: "50mb",
  })
)
app.use(express.static(path.join(__dirname, "public")))
// in latest body-parser use like below.
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: false,
  })
)

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Voting Ruas Digital",
      version: "0.1.0",
      description: "Dokumentasi Lengkap Restfull Api",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Muhamad Imron",
        url: "imronsadewa.my.id",
        email: "imronpuji5@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3002/auth",
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const specs = swaggerJsdoc(options)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
app.use("/auth", authRouter)
app.use("/role", roleRouter)
app.use("/", authenticateToken, userRouter)

app.listen(3002)
