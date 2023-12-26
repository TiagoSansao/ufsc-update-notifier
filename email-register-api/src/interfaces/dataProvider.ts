interface DataProvider {
  saveEmail: (email: string) => Promise<string>;
  deleteEmail: (email: string) => Promise<string>;
}

export { DataProvider };
