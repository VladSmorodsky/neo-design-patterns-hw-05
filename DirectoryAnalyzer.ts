import * as fs from "fs";
import * as path from "path";
import { DirectoryReport } from "./DirectoryReport";

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    let dirItems = {
      files: 0,
      directories: 0,
      totalSize: 0,
      extensions: {} as Record<string, number>,
    };

    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    items.forEach((item) => {
      const fullpath = path.join(dirPath, item.name);
      const stat = fs.lstatSync(fullpath);

      if (stat.isDirectory()) {
        dirItems.directories++;
        const subDirReport = this.analyze(fullpath);
        dirItems.files += subDirReport.files;
        dirItems.directories += subDirReport.directories;
        dirItems.totalSize += subDirReport.totalSize;
        for (const ext in subDirReport.extensions) {
          dirItems.extensions[ext] =
            (dirItems.extensions[ext] || 0) + subDirReport.extensions[ext];
        }
      } else if (stat.isFile()) {
        const ext = path.extname(item.name).slice(1);
        dirItems.extensions[ext] = (dirItems.extensions[ext] || 0) + 1;
        dirItems.files++;
        dirItems.totalSize += stat.size;
      }
    });

    return dirItems;
  }
}
