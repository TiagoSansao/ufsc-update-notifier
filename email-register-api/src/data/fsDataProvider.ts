import { DataProvider } from '../interfaces/dataProvider';
import fs from 'fs';

class FsDataProvider implements DataProvider {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public async getAllEmails(): Promise<string> {}
}

export { FsDataProvider };
