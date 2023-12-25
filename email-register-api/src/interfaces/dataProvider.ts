interface DataProvider {
  saveEmail: (email: string) => Promise<void>;
  deleteDemail: (email: string) => Promise<void>;
}

export { DataProvider };
