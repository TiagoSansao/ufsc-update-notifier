class AlreadyRegisteredEmailError extends ApplicationError {
  constructor(email: string) {
    super();
    this.message = `The e-mail: ${email} was already registered`;
    this.statusCode = 409;
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}

export { AlreadyRegisteredEmailError };
