const mong = require('./index.js')


test('should work', () => {
	expect(mong.SongsInfos.findOne({_id: "1"}).toBeDefined())
})

