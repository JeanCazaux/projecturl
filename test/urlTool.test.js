const urlTool = require(`${process.cwd()}/src/urlTool`)

test('URL format', () => {
  expect(urlTool.check('www.lunii.com')).toBe(true)
  expect(urlTool.check('https://lunii')).toBe(false)
})
