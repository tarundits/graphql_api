import { gql } from "graphql-tag";

const userTypeDefs = gql`
	scalar DateTime
	type Query {
		hello: String

		# Auth
		refreshAccessToken: TokenResponse!
		logoutUser: Boolean!

		# User
		getMe: UserResponse!
	}

	type TokenResponse {
		status: String!
		access_token: String!
	}

	type UserData {
		id: ID!
		name: String!
		email: String!
		photo: String!
		role: String!
		createdAt: DateTime
		updatedAt: DateTime
	}

	type UserResponse {
		status: String!
		user: UserData
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input SignUpInput {
		name: String!
		email: String!
		password: String!
		passwordConfirm: String!
		photo: String!
	}

	type Mutation {
		loginUser(input: LoginInput): TokenResponse!
		signupUser(input: SignUpInput): UserResponse!
	}
`;

export { userTypeDefs };