import userModel from "../models/user.model.js";

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
		return {
			status: 'failure',
			error
		}
	}
}

export {
	signup
}