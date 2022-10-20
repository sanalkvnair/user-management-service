import jwt from "jsonwebtoken"

import authConfig from "../config/authConfig.js"

export const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"]
	if (!token) {
		return res.status(403).send({ message: "Token missing!!" })
	}
	jwt.verify(token, authConfig().secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized" })
		}
		req.username = decoded.id
		req.roles = decoded.roles
		next()
	})
}
