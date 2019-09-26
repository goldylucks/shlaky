const axios = require('axios')

var GoogleSpreadsheet = require('google-spreadsheet')
var doc = new GoogleSpreadsheet('19g7tm7JYV2yxWZyss34mxcZzhDfLnJJIrcYQmAhdWMA')

doc.getRows(1, {}, (error, rows) => {
  if (error) {
    console.error('[getRows] error', error.message)
  }
  axios.post(endpoint(), { data: rows }).catch(console.error)
})

function endpoint() {
  return 'http://localhost:3000/api/users/reset'
}
