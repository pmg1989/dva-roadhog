const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/src/mock')).forEach(function(file) {
	Object.assign(mock, require('./mock/' + file))
})
module.exports = mock
