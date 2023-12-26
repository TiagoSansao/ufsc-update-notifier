import { ApplicationError } from './application';

class MissingEnvVar extends ApplicationError {
  constructor(envName: string, ENV_PATH: string) {
    super();
    this.message = `${envName} environment variable was not retrieved. Set it on ${ENV_PATH} and restart the program.`;
    this.statusCode = 500;
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}

export { MissingEnvVar };
