export interface SheetResponse {
  isError: boolean;
  status: number;
  message: string;
  data: Record<string, any> | string[] | undefined;
}
