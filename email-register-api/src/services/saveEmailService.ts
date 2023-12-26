import { BaseService } from '../interfaces/baseService';
import { DataProvider } from '../interfaces/dataProvider';

class SaveEmailService implements BaseService<string, string> {
  private dataProvider: DataProvider;

  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  public async execute(email: string): Promise<string> {
    const response = await this.dataProvider.saveEmail(email);

    return response;
  }
}

export { SaveEmailService };
