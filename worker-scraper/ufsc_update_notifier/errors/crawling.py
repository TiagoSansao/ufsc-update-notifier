from ufsc_update_notifier.errors.application import ApplicationError


class CrawlingError(ApplicationError):

    def __init__(self):
        self.message = "An error happened while trying to request site html."
