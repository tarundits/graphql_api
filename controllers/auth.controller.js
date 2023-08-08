import userModel from "../models/user.model.js";
import { GraphQLError } from 'graphql';
import errorHandler from './error.controller.js';

const signup = async (
	parent, 
	{ input: { name, email, password, passwordConfirm } }, 
	{ req }
) => {
	try {
		const user = await userModel.create({
			name,
			email,
			password,
			passwordConfirm
		});

		return {
			status: 'success',
			user
		}
	} catch (error) {
		if (error.code === 11000) {
			throw new GraphQLError('Duplicate entry exists', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}
		errorHandler(error);
	}
}

export {
	signup
}