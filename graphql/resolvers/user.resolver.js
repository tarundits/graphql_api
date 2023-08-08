import { signup, login } from "../../controllers/auth.controller.js";

const userResolver = {
	Query: {
		hello: () => 'Hello World!!!'
	},

	Mutation: {
		signupUser: signup,
		loginUser: async (parent, args, context) => {
		    return await login(parent, args, context);
		},
	}
}

export {
	userResolver
}