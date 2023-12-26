abstract class ApplicationError extends Error {
  message!: string;
  statusCode!: number;
}

export { ApplicationError };
