import { SheetResponse } from "./sheet/model.js";
import { del, findAll, findOne, insert, sync, update } from "./sheet/utils.js";
import { Model, QueryOptions, SheetabaseConfig } from "./sheetModels.js";

class Sheetabase {
  private sheetUrl: string;
  private models: Model[];

  constructor(config: SheetabaseConfig) {
    this.sheetUrl = config.sheetUrl;
    this.models = config.models;
  }

  public async sync() {
    console.log("Sync in process.");

    await this.models.map(async (item: Model) => {
      const result = await sync(this.sheetUrl, item);
      console.log(result.message);
    });

    console.log("Sync Completed.");
  }

  public use(modelName: string) {
    const model = this.models.find((m) => m.name === modelName);
    if (!model) throw new Error(`Model ${modelName} not found`);

    return {
      create: async (data: Record<string, any>): Promise<SheetResponse> =>
        await insert(this.sheetUrl, model, data),
      update: async (
        data: Record<string, any>,
        options: QueryOptions
      ): Promise<SheetResponse> =>
        await update(this.sheetUrl, model, data, options),
      delete: async (options: QueryOptions): Promise<SheetResponse> =>
        await del(this.sheetUrl, model, options),
      findOne: async (options: QueryOptions): Promise<SheetResponse> =>
        await findOne(this.sheetUrl, model, options),
      findAll: async (options: QueryOptions): Promise<SheetResponse> =>
        await findAll(this.sheetUrl, model, options),
    };
  }
}

export function setupSheetabase(config: SheetabaseConfig) {
  return new Sheetabase(config);
}
