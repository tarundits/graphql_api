import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),

    MONGODB_URI_LOCAL: str(),

    JWT_ACCESS_PRIVATE_KEY: str(),
    //JWT_ACCESS_PUBLIC_KEY: str(),

    JWT_REFRESH_PRIVATE_KEY: str(),
    //JWT_REFRESH_PUBLIC_KEY: str(),
  });
};

export default validateEnv;
