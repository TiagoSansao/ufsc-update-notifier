from email.mime.text import MIMEText
import requests
import sys
import os
import re
import json
import smtplib
import ssl
import dotenv

from ufsc_update_notifier.errors.application import ApplicationError
from ufsc_update_notifier.errors.crawling import CrawlingError
from ufsc_update_notifier.errors.mailing import MailingError
from ufsc_update_notifier.errors.missingEnvVar import MissingEnvVarError

dotenv.load_dotenv(".env")

URL = "https://vestibularunificado2024.ufsc.br/"
FILE_NAME = "ufsc-last-updates.json"
EMAIL_FILE_PATH = os.getenv("EMAIL_FILE_PATH")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

if not SENDER_EMAIL:
    raise MissingEnvVarError("SENDER_EMAIL")
if not SENDER_PASSWORD:
    raise MissingEnvVarError("SENDER_PASSWORD")
if not EMAIL_FILE_PATH:
    raise MissingEnvVarError("EMAIL_FILE_PATH")


def get_current_site_data():
    try:
        response = requests.get(URL)
        data = response.text

        return data
    except Exception as exception:
        print(exception)
        raise CrawlingError()


def get_ufsc_old_updates():
    with open(FILE_NAME, "r") as file:
        old_site_content = file.read()
        parsed_content = json.loads(old_site_content)

        return parsed_content


def check_for_site_changes(new_site_content: str, old_site_content: str):
    if old_site_content == new_site_content:
        print("No changes were made.")
        return False

    print("Changes were made.")
    return True


def save_new_site_data(data: list[str]):
    with open(FILE_NAME, "w") as file:
        file.write(json.dumps(data))

    print("New site copy was saved")


def get_updates_from_site_content(site_content: str) -> list[str]:
    results = re.findall('\[\d\d\/*.*">(.*)<\/a>', site_content)

    return results


def send_notifications(subject: str, ufsc_last_updates: list[str],
                       emails: list[str]):
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        footer = """
Acesse o site: https://vestibularunificado2024.ufsc.br/

Este e-mail NÃO é de origem da UFSC ou de qualquer orgão ligado a ela!
Trata-se de um projeto sem fins lucrativos feito por um indivíduo.
LinkedIn do desenvolvedor: https://www.linkedin.com/in/tiago-sansao/
Repositório do projeto: https://github.com/TiagoSansao/ufsc-update-notifier
        """
        updates = "\n".join(ufsc_last_updates)
        message = f"Subject: {subject}\n\n{updates}\n{footer}"

        for email in emails:
            try:
                server.sendmail(SENDER_EMAIL, email, message.encode("utf-8"))
                print(f"Sent e-mail to {email}")
            except Exception as exception:
                print(exception, file=sys.stderr)
                print(MailingError(email).message)


def get_list_of_emails():
    with open(EMAIL_FILE_PATH, "r") as file:
        emails = file.readlines()
        return emails


def main():
    try:
        new_site_content = get_current_site_data()

        ufsc_last_updates: list[str] = get_updates_from_site_content(
            new_site_content)

        if not os.path.isfile(FILE_NAME):
            save_new_site_data(ufsc_last_updates)

            print(f"Created file {FILE_NAME} for the first time.")
            print("No check was made.")
            return

        ufsc_old_updates = get_ufsc_old_updates()
        has_changed = check_for_site_changes(ufsc_last_updates,
                                             ufsc_old_updates)
        emails = get_list_of_emails()

        if has_changed:
            save_new_site_data(ufsc_last_updates)
            send_notifications(
                "Nova atualização no vestibular da UFSC 2024, confira!!!",
                ufsc_last_updates, emails)
    except ApplicationError as application_error:
        print(application_error.message)
    except Exception as exception:
        print("An unexpected error happened.")
        print(exception)


if __name__ == "__main__":
    main()
