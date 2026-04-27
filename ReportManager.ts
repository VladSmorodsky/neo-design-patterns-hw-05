import { ReportAdapter } from "./ReportAdapter";
import { JsonReportAdapter } from "./JsonReportAdapter";
import { CsvReportAdapter } from "./CsvReportAdapter";
import { XmlReportAdapter } from "./XmlReportAdapter";
import { AnalyzerFacade } from "./AnalyzerFacade";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import { ReportTypeRegistry } from "./ReportTypeRegistry";
import { ReportFormat, VALID_FORMATS, isValidFormat } from "./ReportFormat";

export class ReportManager {
  private static readonly REPORTS_DIR = "reports";
  private adapter: ReportAdapter;
  private fileExtension: string;
  private facade: AnalyzerFacade;
  private reportTypeRegistry = new ReportTypeRegistry();

  constructor(format: ReportFormat = "json") {
    this.initReportsDirectory();
    [this.adapter, this.fileExtension] = this.getAdapter(format);
    this.facade = new AnalyzerFacade(this.adapter);
  }

  public generateReport(targetPath: string): string {
    const result = this.facade.generateReport(targetPath);
    const timestamp = new Date()
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\..+/, "");
    const filename = `report-${timestamp}.${this.fileExtension}`;
    const filePath = path.join(ReportManager.REPORTS_DIR, filename);
    fs.writeFileSync(filePath, result);
    return filePath;
  }

  private initReportsDirectory(): void {
    if (!fs.existsSync(ReportManager.REPORTS_DIR)) {
      fs.mkdirSync(ReportManager.REPORTS_DIR);
    }
  }

  private getAdapter(format: string): [ReportAdapter, string] {
    if (!isValidFormat(format)) {
      throw new Error(
        `Invalid format: ${format}. Supported formats are: ${VALID_FORMATS.join(", ")}`,
      );
    }

    const adapter = this.reportTypeRegistry.getAdapter(format);
    return [adapter, format];
  }
}
