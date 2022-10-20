import { roles, userData, nextUserId } from "../data/userdata.js"
import bcrypt from "bcryptjs"
import bunyan from "bunyan"

const log = bunyan.createLogger({ name: "userService" })

export function getUsers() {
	return new Promise((resolve, reject) => {
		resolve(getUsersService()), reject("No users found")
	})
}

export function getUser(username) {
	return new Promise((resolve, reject) => {
		resolve(getUserService(username)), reject("No user found")
	})
}

export function createUser(user) {
	return new Promise((resolve, reject) => {
		resolve(createUserService(user)), reject("Create user service failed")
	})
}

export function updateUser(username, user) {
	return new Promise((resolve, reject) => {
		resolve(updateUserService(username, user)),
			reject("Create user service failed")
	})
}

const getUsersService = () => {
	log.info("Fetch all users from repo.")
	const fetchedUsers = userData.map((user) => {
		// eslint-disable-next-line no-unused-vars
		const { password, ...fetchedUser } = user
		return fetchedUser
	})
	return fetchedUsers
}

const getUserService = (username) => {
	log.info(`Fetch user detail for ${username} from repo.`)
	const user = userData.find((u) => u.email === username)
	if (user) {
		// eslint-disable-next-line no-unused-vars
		const { password, ...fetchedUser } = user
		return fetchedUser
	} else {
		return { message: "Username not found" }
	}
}

const createUserService = (user) => {
	log.info("Create new user in repo.")
	nextUserId.id += 1

	const newUser = {
		id: nextUserId.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		password: bcrypt.hashSync(user.password, 8),
		roles: [],
	}
	user.roles.forEach((element) => {
		const role = roles.find((r) => r.id === element)
		newUser.roles.push(role)
	})
	userData.push(newUser)
	return newUser
}

const updateUserService = (username, user) => {
	log.info(`Update user detail for ${username} in repo.`)
	const userDetail = userData.find((o) => o.email === username)
	if (userDetail) {
		userDetail.firstName = user.firstName
		userDetail.lastName = user.lastName
		userDetail.password = bcrypt.hashSync(user.password, 8)
	}
	return userDetail
}
