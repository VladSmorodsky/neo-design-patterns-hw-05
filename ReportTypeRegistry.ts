import { CsvReportAdapter } from "./CsvReportAdapter";
import { JsonReportAdapter } from "./JsonReportAdapter";
import { ReportAdapter } from "./ReportAdapter";
import { XmlReportAdapter } from "./XmlReportAdapter";
import { ReportFormat } from "./ReportFormat";

export class ReportTypeRegistry {
  private reportTypes: Record<ReportFormat, ReportAdapter>;

  constructor() {
    this.reportTypes = {
      csv: new CsvReportAdapter(),
      json: new JsonReportAdapter(),
      xml: new XmlReportAdapter(),
    };
  }

  public getAdapter(reportType: ReportFormat): ReportAdapter {
    return this.reportTypes[reportType];
  }
}
