import dotenv from "dotenv"
import express from "express"
import { expressConfig } from "./config/expressConfig.js"
import router from "./routes/router.js"
import bunyan from "bunyan"

dotenv.config()
const app = express()
// eslint-disable-next-line no-undef
const PORT = process.env.port || 7070

expressConfig(app)
router(app)

const log = bunyan.createLogger({ name: "index" })

app.listen(PORT, () => log.info(`Application started on port ${PORT}`))
