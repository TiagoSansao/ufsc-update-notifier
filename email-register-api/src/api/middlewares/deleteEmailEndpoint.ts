import { NextFunction, Request, Response } from 'express';
import { SaveEmailService } from '../../services/saveEmailService';
import { FsDataProvider } from '../../data/fsDataProvider';
import { DataProvider } from '../../interfaces/dataProvider';
import { getEnv } from '../../utils/getEnv';
import { DeleteEmailService } from '../../services/deleteEmailService';

const filePath = getEnv(`FILE_PATH`);
const fsDataProvider: DataProvider = new FsDataProvider(filePath);
const deleteEmailService = new DeleteEmailService(fsDataProvider);

async function deleteEmailEndpoint(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Missing 'email' property on request body" });
  }

  try {
    const response = await deleteEmailService.execute(email);

    res.status(200).json({ data: response });
  } catch (error: unknown) {
    next(error);
  }
}

export { deleteEmailEndpoint };
