import { gql } from "graphql-tag";
import { userTypeDefs } from "./user.typedefs.js";

const typeDefs = gql`
	${userTypeDefs}
`;

export { typeDefs };