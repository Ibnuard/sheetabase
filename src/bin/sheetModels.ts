export interface Model {
  name: string;
  columns: [string[], { pk: string; autoIncrement: boolean }];
}

export interface SheetabaseConfig {
  sheetUrl: string;
  models: Model[];
}

export interface QueryOptions {
  where?: Record<string, any>;
}

export enum SHEET_ACTION {
  CREATE = "createDatabase",
  INSERT = "insertData",
  UPDATE = "updateData",
  DELETE = "deleteData",
  GET = "getData",
}
