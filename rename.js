const fs = require('fs');
const path = require('path');
const process = require('process');

class Rename {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

const renameFileFolder = (from, to) => {
  return new Promise((resolve, reject) => {
    fs.stat(from, (err, stats) => {
      if (err) {
        reject('Path does not exist', err)
      } else if (stats) {
        const fromPathStats = stats;
        const type = fromPathStats.isDirectory() ? 'folder' : 'file';
        fs.rename(from, to, err => {
          if (err) {
            reject(`Error renaming ${type} ${from}`, err)
          } else {
            resolve(`${from} renamed successfully to ${to}`);
          }
        });
      }
    });
  })
}

const renameFilesandFolders = paths => {
  return new Promise((resolve, reject) => {
    if (!paths.length) {
      console.log('Job done!');
      resolve(true);
    }

    const p = paths[0];
    renameFileFolder(paths[0].from, paths[0].to)
      .then(res => {
        console.log(res);
        renameFilesandFolders(paths.slice(1));
      }).catch(err => {
        /**
         * Stop at first error
         * reject(err);
         */
        console.error(err);
        renameFilesandFolders(paths.slice(1));
      });
  });
}

const main = () => {
  const renameJob = [];

  process.argv.forEach((val, idx) => {
    if (idx >= 2 && val.includes('=>')) {
      const paths = val.split('=>');
      const oldPath = path.resolve(paths[0].trim());
      const newPath = path.resolve(paths[1].trim());
      renameJob.push(new Rename(oldPath, newPath));
    }
  });

  renameFilesandFolders(renameJob)
    .then(() => {
      console.log('Job done!');
    }).catch(err => {
      console.error(err);
    });
};

main();
