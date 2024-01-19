import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "./.env") });

interface EnvVars {
  PORT: number;
  MONGODB_URL: string;
}

const envVarSchema = Joi.object<EnvVars>({
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string().description("Mongo DB Url").required(),
}).unknown();

const { value: envVars, error } = envVarSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
  },
};

export default config;
