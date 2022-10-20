import userRoute from "./userRoute.js"
import securityRoute from "./securityRoute.js"
import bunyan from "bunyan"

const log = bunyan.createLogger({ name: "router" })

export default (app) => {
	log.info("Configuring router.....")
	userRoute(app)
	securityRoute(app)
}
