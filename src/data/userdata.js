import bcrypt from "bcryptjs"

export const accessList = [
	{ id: 1, access: "CREATE_ADMIN" },
	{ id: 2, access: "VIEW_ADMIN" },
	{ id: 3, access: "DELETE_ADMIN" },
	{ id: 4, access: "CREATE_USER" },
	{ id: 5, access: "VIEW_USER" },
	{ id: 6, access: "DELETE_USER" },
]

export const roles = [
	{
		id: 1,
		role: "SUPER_ADMIN",
		access: [
			{ id: 1, access: "CREATE_ADMIN" },
			{ id: 2, access: "VIEW_ADMIN" },
			{ id: 3, access: "DELETE_ADMIN" },
		],
	},
	{
		id: 2,
		role: "ADMIN",
		access: [
			{ id: 4, access: "CREATE_USER" },
			{ id: 5, access: "VIEW_USER" },
			{ id: 6, access: "DELETE_USER" },
		],
	},
	{ id: 3, role: "USER", access: [{ id: 5, access: "VIEW_USER" }] },
]

export const userData = [
	{
		id: 1,
		email: "test@test.com",
		firstName: "Test",
		lastName: "Test",
		password: bcrypt.hashSync("12345678", 8),
		roles: [
			{
				id: 1,
				role: "SUPER_ADMIN",
				access: [
					{ id: 1, access: "CREATE_ADMIN" },
					{ id: 2, access: "VIEW_ADMIN" },
					{ id: 3, access: "DELETE_ADMIN" },
				],
			},
		],
	},
]

export const nextUserId = { id: 1 }
