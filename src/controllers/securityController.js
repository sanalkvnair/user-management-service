import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import bunyan from "bunyan"

import authConfig from "../config/authConfig.js"
import { userData } from "../data/userdata.js"

const log = bunyan.createLogger({ name: "securityController" })

export function signin(req, res) {
	const user = userData.find((u) => u.email === req.body.username)
	if (user) {
		const passworIsValid = bcrypt.compareSync(req.body.password, user.password)
		log.debug(`Is password valid ${passworIsValid}`)
		if (!passworIsValid) {
			log.warn("Invalid credentials provided.")
			return res
				.status(401)
				.send({ accessToken: null, message: "Invalid Credentials." })
		}

		const authorities = []
		user.roles.forEach((role) => {
			authorities.push(role.role)
		})

		const token = jwt.sign(
			{ id: user.email, roles: authorities },
			authConfig().secret,
			{
				expiresIn: 86400,
			}
		)

		return res.status(200).send({
			id: user.id,
			username: user.email,
			roles: authorities,
			accessToken: token,
		})
	} else {
		log.error("Username not found.")
		return res.status(404).send({ message: "Username not found" })
	}
}
