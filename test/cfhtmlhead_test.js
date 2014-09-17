var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	test = require('./testlib');

var r;


is.throws(function () {
	r = cf.parse('<cfhtmlhead>');
}, Error, "Missing required text attribute");

r = cf.parse('<cfhtmlhead text="cfhtmlhead test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, 'cfhtmlhead test');

r = cf.parse('<cfhtmlhead text="#chr(13)##chr(10)#" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, "#chr(13)##chr(10)#");

r = cf.parse('<CFHTMLHEAD TEXT="cfhtmlhead test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, 'cfhtmlhead test');

r = cf.parse("<cfhtmlhead text=\"<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#\" />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, "<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#");

test.ok();
