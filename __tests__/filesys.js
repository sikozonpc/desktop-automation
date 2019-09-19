const fileSys = require('../lib/bin/filesys')
const path = requrie('path')

describe('FileSys', () => {

  const __fixtures = path.resolve(__dirname, '__fixtures')

  const pathA = 'home/victoria.js'
  const pathB = 'home/badCode/victoria.js'
  // TODO: Acess fixtures to test files, use after each to clean files/create new ones
  //  https://stackoverflow.com/questions/41111620/testing-the-file-system-with-jest
  it('should move a given file between directories', () => {
    expect().toBeCalled()
  })
})
