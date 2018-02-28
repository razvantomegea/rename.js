const fs = require('fs');
const process = require('process');

process.argv.forEach((val, idx) => {
  if (idx >= 2 && val.includes('=>')) {
    const paths = val.split('=>');
    const oldPath = paths[0].trim();
    const newPath = paths[1].trim();
    fs.rename(oldPath, newPath, err => {
      if (err) throw err;
      fs.stat(newPath, (err, stats) => {
        if (err) throw err;
      });
    });
  }
});
