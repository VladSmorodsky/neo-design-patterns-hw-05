export type ReportFormat = "json" | "csv" | "xml";

export const VALID_FORMATS: readonly ReportFormat[] = ["json", "csv", "xml"];

export function isValidFormat(format: string): format is ReportFormat {
  return VALID_FORMATS.includes(format as ReportFormat);
}
