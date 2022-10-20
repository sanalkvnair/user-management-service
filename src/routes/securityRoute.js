import * as securityController from "../controllers/securityController.js"
import bunyan from "bunyan"

const route = "/api/signin"
const log = bunyan.createLogger({ name: "securityRoute" })

export default (app) => {
	app.post(route, (req, res) => {
		log.info(`Sign request initiated for user ${req.body.username}`)
		securityController.signin(req, res)
	})
}
