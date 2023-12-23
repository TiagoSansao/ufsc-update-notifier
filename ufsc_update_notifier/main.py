import requests
import os
import re
import json
import smtplib, ssl
import dotenv

dotenv.load_dotenv()

URL = 'https://vestibularunificado2024.ufsc.br/'
FILE_NAME = 'ufsc-last-updates.json'
DESTINATION_EMAIL = os.getenv('DESTINATION_EMAIL')
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')

def get_current_site_data(): 
  try:
    response = requests.get(URL)
    data = response.text

    return data
  except Exception as exception:
    print('An error happened while trying to request site html.')
    print(exception)

def get_ufsc_old_updates():
    with open(FILE_NAME, 'r') as file:
      old_site_content = file.read()
      parsed_content = json.loads(old_site_content)

      return parsed_content

def check_for_site_changes(new_site_content: str, old_site_content: str):
  
  if old_site_content == new_site_content:
    print('No changes were made.')
    return False
  
  print('Changes were made.')
  return True


def save_new_site_data(data: list[str]):
  with open(FILE_NAME, 'w') as file:
      file.write(json.dumps(data))

  print('New site copy was saved')

def get_updates_from_site_content(site_content: str) -> list[str]:
  results = re.findall('\[\d\d\/*.*">(.*)<\/a>', site_content)

  return results

def send_notification(subject: str, ufsc_last_updates: list[str]):
  context = ssl.create_default_context()

  with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as server:
    server.login(SENDER_EMAIL, SENDER_PASSWORD)

    updates = '\n'.join(ufsc_last_updates)
    message = f'Subject: {subject}\n\n{updates}'

    server.sendmail(SENDER_EMAIL, DESTINATION_EMAIL, message.encode('utf-8'))
    print('Email was sent successfully.')

def main(): 
  new_site_content = get_current_site_data()

  ufsc_last_updates: list[str] = get_updates_from_site_content(new_site_content)

  if not os.path.isfile(FILE_NAME):
    save_new_site_data(ufsc_last_updates)

    print(f'Created file {FILE_NAME} for the first time.')
    print('No check was made.')
    return

  ufsc_old_updates = get_ufsc_old_updates()
  has_changed = check_for_site_changes(ufsc_last_updates, ufsc_old_updates)

  if has_changed:
    save_new_site_data(ufsc_last_updates)
    send_notification('NOVA ATUALIZAÇÃO, ABRE AGR O SITE KRL!!!', ufsc_last_updates)
    return
  
  send_notification('No updates so far, you are a winner man (; kkkkkk', ufsc_last_updates)
  
if __name__ == "__main__": 
  main()