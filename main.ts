import { ReportManager } from "./ReportManager";
import { isValidFormat } from "./ReportFormat";

const targetPath = process.argv[2] || ".";
const formatArg = process.argv[3] || "json";

if (!isValidFormat(formatArg)) {
  console.error(`Invalid format: ${formatArg}`);
  process.exit(1);
}

const reportManager = new ReportManager(formatArg);
const reportPath = reportManager.generateReport(targetPath);
console.log(`Report generated: ${reportPath}`);
