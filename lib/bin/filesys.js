const fs = require('fs')
const path = require('path')
const moveFile = require('move-file')

module.exports = class FileSys {
  constructor (_config) {
    // read json file
    this.config = JSON.parse(fs.readFileSync(_config))
    this.destination = this.config.destination
    this.homeDir = require('os').homedir()
    this.desktop = path.join(this.homeDir, 'Desktop')
  }

  read (event, filename) {
    console.log('RUUUn');
    const temp = filename.split('.')
    const file = {
      name: temp[0],
      ext: temp.slice(1).join('.'),
      filename: filename,
    }

    file.ext && this.evaluate(file)
  }

  /**
   * Evaluation to determine what to do with the file
   * @param {{ name: string, ext: string, size: number, filename: string }} file 
   */
  evaluate (file) {
    const { destination, desktop } = this
    console.log(file);
    for (let ext in destination) {
      if (destination[ext].includes(file.ext)) {
        const capitalziedExt = ext[0].toUpperCase() + ext.slice(1)
       
        const f = path.join(desktop, file.filename)
        const dest = path.join(this.homeDir, capitalziedExt, file.filename)
        console.log(f);
        console.log(dest);

        if (dest) {
          return FileSys.moveFile(f, dest)
        }
      }
    }
  }

  static async moveFile (from, to) {
    console.log('MOOOVE');
    await moveFile(from, to)
      .then(() => console.log('FILE HASB EEN MOVED'))
      .catch(err => console.log(err))
  }
}