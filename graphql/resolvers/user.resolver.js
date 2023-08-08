import { signup } from "../../controllers/auth.controller.js";

const userResolver = {
	Query: {
		hello: () => 'Hello World!!!'
	},

	Mutation: {
		signupUser: signup
	}
}

export {
	userResolver
}