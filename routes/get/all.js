'use strict';

var route = function route(req, res, abe) {
    var files = abe.FileParser.getFiles(abe.fileUtils.concatPath(abe.config.root, abe.config.data.url), true)
    var tags = []

	Array.prototype.forEach.call(files, (file) => {
		var json = abe.FileParser.getJson(file.path)
		if(typeof json.abe_tags !== 'undefined' && json.abe_tags !== null) {
			tags = tags.concat(json.abe_tags)
		}
	})

	tags = tags.filter(function(item, pos) {
	    return tags.indexOf(item) == pos;
	})

	res.set('Content-Type', 'application/json')
	res.send(JSON.stringify({
		route: 'search',
		success: 1,
		result: tags
	}))
}

exports.default = route;