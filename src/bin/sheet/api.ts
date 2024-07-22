import { SHEET_ACTION } from "../sheetModels";

const GS_TOKEN =
  "AKfycbw34J9VCtC-5THGZKOH53Jt0BtlrUYKuU-g81iElsSyRJJHR66NU7tgp29hNYfEuvQ";

export const GS_SHEET_URL = (action: SHEET_ACTION, dbName: string) =>
  `https://script.google.com/macros/s/${GS_TOKEN}/exec?action=${action}&dbname=${dbName}`;
