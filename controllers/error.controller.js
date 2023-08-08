import { GraphQLError } from 'graphql';

const handleCastError = (error) => {
	const message = `Invalid ${error.path}: ${error.value}`;
	throw new GraphQLError(message, {
		extensions: {
		    code: 'FORBIDDEN',
	    }
	});
  };
  
  const handleValidationError = (error) => {
	const message = Object.values(error.errors).map((el) => el.message);
	throw new GraphQLError(
	  `Invalid input: ${message.join(', ')}`, {
		extensions: {
		    code: 'FORBIDDEN',
	    }
    });
  };
  
  const errorHandler = (err) => {
	if (err.name === 'CastError') handleCastError(err);
	if (err.name === 'ValidationError') handleValidationError(err);
	throw err;
  };
  
export default errorHandler;  