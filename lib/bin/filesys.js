const fs = require('fs')
const path = require('path')
const moveFile = require('move-file')

/**
 * Comunicator between the File System and the events
 */
class FileSys {
  constructor (_config) {
    // read json file
    this.config = JSON.parse(fs.readFileSync(_config))
    this.destination = this.config.destination
    this.homeDir = require('os').homedir()
    this.desktop = path.join(this.homeDir, 'Desktop')
  }

  /**
   *  reads a change in the file system and reacts to it depending on the type of file and event
   * @param {string} event
   * @param {string} filename
   */
  read (event, filename) {
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

    console.log(file)

    for (let ext in destination) {
      if (destination[ext].includes(file.ext)) {
        const capitalziedExt = ext[0].toUpperCase() + ext.slice(1)
       
        const f = path.join(desktop, file.filename)
        const dest = path.join(this.homeDir, capitalziedExt, file.filename)

        if (dest) {
          return FileSys.moveFile(f, dest)
        }
      }
    }
  }

  /**
   * Helper to move files on FS
   * @param {string} from 
   * @param {string} to 
   */
  static async moveFile (from, to) {
    await moveFile(from, to)
      .then(() => console.log('FILE HASB EEN MOVED'))
      .catch(err => console.log(err))
  }
}

module.exports = FileSys
