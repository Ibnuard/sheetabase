import { Model, QueryOptions, SHEET_ACTION } from "../sheetModels";
import { GS_SHEET_URL } from "./api";
import { fetchData } from "./fetch";
import { SheetResponse } from "./model";

// Sync data to sheet
export async function sync(
  sheetUrl: string,
  model: Model
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.CREATE, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        columns: model.columns,
      }),
    });

    return response.status == 200
      ? {
          isError: false,
          status: 200,
          message: `Model ${model.name} is successfully synced.`,
          data: [],
        }
      : {
          isError: true,
          status: 400,
          message: `Model ${model.name} is failed to sync.`,
          data: [],
        };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}

// Insert data to sheet
export async function insert(
  sheetUrl: string,
  model: Model,
  data: Record<string, any>
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.INSERT, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        columns: data,
      }),
    });
    return response.status == 200
      ? { isError: false, status: 200, message: "REQUEST COMPLETE", data: [] }
      : { isError: true, status: 400, message: "REQUEST ERROR", data: [] };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}

// Update data to sheet
export async function update(
  sheetUrl: string,
  model: Model,
  data: Record<string, any>,
  options: QueryOptions
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.UPDATE, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        update: data,
        where: options.where,
      }),
    });

    return response.status == 200
      ? { isError: false, status: 200, message: "REQUEST COMPLETE", data: [] }
      : { isError: true, status: 400, message: "REQUEST ERROR", data: [] };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}

// Update data to sheet
export async function del(
  sheetUrl: string,
  model: Model,
  options: QueryOptions
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.DELETE, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        where: options.where,
      }),
    });

    return response.status == 200
      ? { isError: false, status: 200, message: "REQUEST COMPLETE", data: [] }
      : { isError: true, status: 400, message: "REQUEST ERROR", data: [] };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}

// Find one data
export async function findOne(
  sheetUrl: string,
  model: Model,
  options: QueryOptions
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.GET, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        where: options.where,
      }),
    });

    return response.status == 200
      ? {
          isError: false,
          status: 200,
          message: "REQUEST COMPLETE",
          data: response?.data[0] || [],
        }
      : { isError: true, status: 400, message: "REQUEST ERROR", data: [] };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}

// Find all data
export async function findAll(
  sheetUrl: string,
  model: Model,
  options: QueryOptions
): Promise<SheetResponse> {
  // get url action and db name
  const URL = GS_SHEET_URL(SHEET_ACTION.GET, model.name);

  try {
    const response = await fetchData(URL, {
      method: "POST",
      body: JSON.stringify({
        sheetUrl,
        where: options.where,
      }),
    });

    return response.status == 200
      ? {
          isError: false,
          status: 200,
          message: "REQUEST COMPLETE",
          data: response?.data || [],
        }
      : { isError: true, status: 400, message: "REQUEST ERROR", data: [] };
  } catch (error) {
    return { isError: true, status: 500, message: error.message, data: [] };
  }
}
