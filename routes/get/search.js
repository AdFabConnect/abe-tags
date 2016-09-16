'use strict';

var path = require('path');

var route = function route(req, res, next, abe) {
    var files = abe.FileParser.getFiles(path.join(abe.config.root, abe.config.data.url), true)
    var tags = []

	if(typeof req.query.q !== 'undefined' && req.query.q !== null
		&& req.query.q !== '' && req.query.q.length > 3) {
		Array.prototype.forEach.call(files, (file) => {
			var json = abe.FileParser.getJson(file.path)
			if(typeof json.abe_tags !== 'undefined' && json.abe_tags !== null) {
				Array.prototype.forEach.call(json.abe_tags, (tag) => {
					if (tag.indexOf(req.query.q) > -1) {
						tags.push(tag)
					}
				})
			}
		})
	}

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