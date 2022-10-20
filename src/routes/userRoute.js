import * as userController from "../controllers/userController.js"
import { verifyToken } from "../services/authenticationService.js"
import bunyan from "bunyan"

const route = "/api/user"
const log = bunyan.createLogger({ name: "userRoute" })

export default (app) => {
	app.get(route, [verifyToken], async (req, res) => {
		try {
			log.info("Fetching all user details")
			const response = await userController.getUsers()
			res.send(response)
		} catch (error) {
			log.error(`An error occurred: ${error}`)
			res.status(400)
			res.send(error)
		}
	})

	app.get(`${route}/:username`, [verifyToken], async (req, res) => {
		try {
			const username = req.params.username
			log.info(`Get user detail for username ${username}`)
			const dbResponse = await userController.getUser(username)
			res.send(dbResponse)
		} catch (error) {
			log.error(`An error occurred: ${error}`)
			res.status(400)
			res.send(error)
		}
	})

	app.post(route, async (req, res) => {
		try {
			log.info(`create user ${req.body}`)
			const dbResponse = await userController.createUser(req.body)
			res.send(dbResponse)
		} catch (error) {
			log.error(`An error occurred: ${error}`)
			res.status(400)
			res.send(error)
		}
	})

	app.put(`${route}/:username`, [verifyToken], async (req, res) => {
		try {
			log.info(`update user ${req.params.username}`)
			const dbResponse = await userController.updateUser(
				req.params.username,
				req.body
			)
			res.send(dbResponse)
		} catch (error) {
			log.error(`An error occurred: ${error}`)
			res.status(400)
			res.send(error)
		}
	})
}
