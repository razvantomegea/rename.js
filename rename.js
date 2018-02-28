const fs = require('fs');
const path = require('path');
const process = require('process');

process.argv.forEach((val, idx) => {
  if (idx >= 2 && val.includes('=>')) {
    const paths = val.split('=>');
    const oldPath = path.resolve(paths[0].trim());
    const newPath = path.resolve(paths[1].trim());
    const oldPathStats = fs.statSync(newPath);
    try {
      fs.renameSync(oldPath, newPath);
    } catch (err) {
      console.error(`Error renaming ${oldPathStats.isDirectory() ? 'folder ' : 'file ' + oldPath}`, err);
    }
  }
});
