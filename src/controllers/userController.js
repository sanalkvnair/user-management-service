import * as userService from "../services/userService.js"
import bunyan from "bunyan"

const log = bunyan.createLogger({ name: "userController" })

export async function getUsers() {
	try {
		log.info("Fetching all users...")
		return await userService.getUsers()
	} catch (error) {
		log.error(error)
	}
}

export async function getUser(username) {
	try {
		log.info(`Get user detail for username ${username}`)
		return await userService.getUser(username)
	} catch (error) {
		log.error(error)
	}
}

export async function createUser(user) {
	try {
		log.info(`create user with username ${user.email}`)
		return await userService.createUser(user)
	} catch (error) {
		log.error(error)
	}
}

export async function updateUser(username, user) {
	try {
		log.info(`update user detail for ${username}`)
		return await userService.updateUser(username, user)
	} catch (error) {
		log.error(error)
	}
}
