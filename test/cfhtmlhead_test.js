const is = require('assert'), test = require('./testlib');

var r;


is.throws(function () {
	r = test.cfparser.parse('<cfhtmlhead>');
}, Error, "Missing required text attribute");

r = test.cfparser.parse('<cfhtmlhead text="cfhtmlhead test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, 'cfhtmlhead test');

r = test.cfparser.parse('<cfhtmlhead text="#chr(13)##chr(10)#" />');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, "#chr(13)##chr(10)#");

r = test.cfparser.parse('<CFHTMLHEAD TEXT="cfhtmlhead test">');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, 'cfhtmlhead test');

r = test.cfparser.parse("<cfhtmlhead text=\"<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#\" />");
is.equal(r instanceof Object, true);
is.equal(r.tag, 'htmlhead');
is.equal(r.attributes.text, "<link href='/blog/custom/img/favicon.ico' rel='shortcut icon' type='image/x-icon'>#chr(13)##chr(10)#");

test.ok();
