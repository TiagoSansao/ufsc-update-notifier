from ufsc_update_notifier.errors.application import ApplicationError


class MailingError(ApplicationError):

    def __init__(self, destination: str):
        self.message = (
            f"An error happened while trying to send an email to {destination}"
        )
