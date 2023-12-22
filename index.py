import requests
import os

URL = 'https://vestibularunificado2024.ufsc.br/'
FILE_NAME = 'ufsc-last-copy.html'

def get_current_site_data(): 
  try:
    response = requests.get(URL)
    data = response.text

    return data
  except Exception as exception:
    print('An error happened while trying to request site html.')
    print(exception)

def get_old_site_data():
    with open(FILE_NAME, 'r') as file:
      old_site_content = file.read()

      return old_site_content

def create_file(data: str):
  with open(FILE_NAME, 'w') as file:
    file.write(data)
  print(f'Created file {FILE_NAME} for the first time.')
  print('No check was made.')

def check_for_site_changes(new_site_content: str, old_site_content: str):
  
  if old_site_content == new_site_content:
    print('No changes were made.')
    return False
  
  print('Changes were made.')
  return True


def save_new_site_data(data: str):
  with open(FILE_NAME, 'w') as file:
    file.write(data)

  print('New site copy was saved')

def main(): 
  new_site_content = get_current_site_data()

  if not os.path.isfile(FILE_NAME):
    create_file(new_site_content)
    return

  old_site_content = get_old_site_data()

  has_changed = check_for_site_changes(new_site_content, old_site_content)

  if has_changed:
    save_new_site_data(new_site_content)

main()