import { DataProvider } from '../interfaces/dataProvider';
import { promisify } from 'util';
import fs from 'fs';
import { AlreadyRegisteredEmailError } from '../errors/alreadyRegisteredEmail';
import { NotRegisteredEmailError } from '../errors/notRegisteredEmail';

const readFilePromise = promisify(fs.readFile);
const appendFilePromise = promisify(fs.appendFile);
const writeFilePromise = promisify(fs.writeFile);

class FsDataProvider implements DataProvider {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private checkIfEmailIsAlreadyRegistered(email: string): boolean {
    const fileData = fs.readFileSync(this.filePath, 'utf-8');
    const emails = fileData.split('\n');

    return emails.includes(email);
  }

  public async saveEmail(email: string): Promise<void> {
    const isAlreadyRegistered = this.checkIfEmailIsAlreadyRegistered(email);
    if (isAlreadyRegistered) throw new AlreadyRegisteredEmailError(email);

    await appendFilePromise(this.filePath, email);
  }

  public async deleteDemail(email: string): Promise<void> {
    const isAlreadyRegistered = this.checkIfEmailIsAlreadyRegistered(email);
    if (isAlreadyRegistered) throw new NotRegisteredEmailError(email);

    const fileData = await readFilePromise(this.filePath, 'utf-8');
    const emails = fileData.split('\n');
    const newEmailsList = emails.filter(
      (registeredEmail) => registeredEmail !== email
    );
    const newFileData = newEmailsList.join('\n');

    writeFilePromise(this.filePath, newFileData, { encoding: 'utf-8' });
  }
}

export { FsDataProvider };
