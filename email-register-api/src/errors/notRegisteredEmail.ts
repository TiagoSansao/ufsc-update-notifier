import { ApplicationError } from './application';

class NotRegisteredEmailError extends ApplicationError {
  constructor(email: string) {
    super();
    this.message = `The e-mail: ${email} was not registered.`;
    this.statusCode = 404;
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}

export { NotRegisteredEmailError };
