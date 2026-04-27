import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class CsvReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    const lines: string[] = [];

    lines.push("Metric,Value");
    lines.push(`Files,${report.files}`);
    lines.push(`Directories,${report.directories}`);
    lines.push(`Total Size (bytes),${report.totalSize}`);
    lines.push("");

    lines.push("Extension,Count");
    for (const [ext, count] of Object.entries(report.extensions)) {
      const extName = ext || "(no extension)";
      lines.push(`${extName},${count}`);
    }

    return lines.join("\n");
  }
}
