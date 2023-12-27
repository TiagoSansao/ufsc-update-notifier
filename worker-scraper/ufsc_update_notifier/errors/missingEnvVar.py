from application import ApplicationError


class MissingEnvVarError(ApplicationError):

    def __init__(self, varName: str):
        self.message = f'Environment variable {varName} is missing.'
