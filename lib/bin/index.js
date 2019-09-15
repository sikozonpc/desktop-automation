const path = require('path')
const FileSys = require('./filesys')
const chokidar = require('chokidar')

// Constants
const ROOT_DIR = path.dirname(process.mainModule.filename)
const DEFAULT_CONFIG_PATH = path.resolve(ROOT_DIR, '../', 'defaultConfig.json')

const fileSys = new FileSys(DEFAULT_CONFIG_PATH)

chokidar.watch(fileSys.desktop, {ignored: /(^|[\/\\])\../, atomic: true}).on('all', (event, path) => {
  //TODO: do this logic inside the fileSys so it doesnt build the same path again
  //TODO: Debug the running twice bug
  const filename = path.split(fileSys.desktop)[1].slice(1)
  console.log(event, filename)
  event !== 'unlink' && fileSys.read(event, filename)
});
