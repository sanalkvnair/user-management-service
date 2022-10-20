import { json, urlencoded } from "express"
import cors from "cors"
import bunyan from "bunyan"

const log = bunyan.createLogger({ name: "expressConfig" })

export function expressConfig(app) {
	log.info("Configuring express....")
	app.use(cors())
	app.use(json())
	app.use(urlencoded({ extended: true }))
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		)
		next()
	})
}
