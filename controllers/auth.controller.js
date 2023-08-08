import userModel from "../models/user.model.js";
import config from 'config';
import { GraphQLError } from 'graphql';
import errorHandler from './error.controller.js';
import redisClient from '../utils/connectRedis.js';
import { signJwt, verifyJwt } from '../utils/jwt.js';
import dotenv from 'dotenv';

dotenv.config();

/*********************************************************************************************** */
const cookieOptions = {
	httpOnly: true,
	// domain: 'localhost',
	sameSite: 'none',
	secure: true,
};

const accessTokenCookieOptions = {
	...cookieOptions,
	maxAge: 15 * 60 * 1000,
	expires: new Date(Date.now() + 15 * 60 * 1000),
};

const refreshTokenCookieOptions = {
	...cookieOptions,
	maxAge: 60 * 60 * 1000,
	expires: new Date(Date.now() + 60 * 60 * 1000),
};

if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

/*********************************************************************************************** */
// Utility Functions
async function signTokens(user) {
	// Create a Session
	console.log(user);
	await redisClient.set(user.id, JSON.stringify(user), {
	  EX: 60 * 60,
	});

	console.log(config.get('jwtAccessTokenExpiresIn'));
  
	// Create access token
	const access_token = signJwt({ user: user.id }, 'JWT_ACCESS_PRIVATE_KEY', {
	  expiresIn: config.get('jwtAccessTokenExpiresIn'),
	});

	// console.log("Access Token", access_token);
  
	// Create refresh token
	const refresh_token = signJwt({ user: user.id }, 'JWT_REFRESH_PRIVATE_KEY', {
	  expiresIn: config.get('jwtRefreshTokenExpiresIn'),
	});

	
	// console.log("Refresh Token", refresh_token);
  
	return { access_token, refresh_token };
}
// ************************************************************************************************ //

const signup = async (parent, { input: { name, email, password, passwordConfirm } }, { req }) => {
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
};

const login = async (parent, { input: { email, password } }, {req, res}) => {
	try {
		console.log('223344', res);
	    // Check if user exist and password is correct
		const user = await userModel
			.findOne({ email })
			.select('+password +verified');

		//console.log(user);
	
		if (!user || !(await user.comparePasswords(password, user.password))) {
			throw new GraphQLError('Invalid email or password', {
				extensions: {
					code: 'FORBIDDEN',
				}
			});
		}
	
		user.password = undefined;
	
		// Create a session and tokens
		const { access_token, refresh_token } = await signTokens(user);

		//console.log(access_token);
		//console.log(refresh_token);
	
		// Add refreshToken to cookie
		res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
		res.cookie('access_token', access_token, accessTokenCookieOptions);
		res.cookie('logged_in', 'true', {
			...accessTokenCookieOptions,
			httpOnly: false,
		});
	
		return {
			status: 'success',
			access_token,
		};
	} catch (error) {
		errorHandler(error);
	}
};


export {
	signup,
	login
}