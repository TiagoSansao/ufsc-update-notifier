import { BaseService } from '../interfaces/baseService';
import { DataProvider } from '../interfaces/dataProvider';

class DeleteEmailService implements BaseService<string, string> {
  private dataProvider: DataProvider;

  constructor(dataProvider: DataProvider) {
    this.dataProvider = dataProvider;
  }

  public async execute(email: string): Promise<string> {
    const response = await this.dataProvider.deleteEmail(email);

    return response;
  }
}

export { DeleteEmailService };
