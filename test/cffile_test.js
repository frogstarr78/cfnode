const test = require('./testlib'),
	should = require('should');

describe("Parsing a cffile tag", function() {
	it('throws an error when missing a required action attribute', function () {
		(function () { test.cfparser.parse('<cffile >'); }).should.throw('Expected " ", "\\n", "\\t", [aA], [cC], [dD], [fF], [mM], [nN], [oO], [rR], [sS], or [vV] but ">" found.');
	});

	describe('with the action value "append"', function () {
		it('throws an error when missing a required output attribute', function () {
			(function () { test.cfparser.parse('<cffile action="append" file="/tmp/file" >'); }).should.throw('Missing required "output" attribute.');
		});

		it('throws an error when missing a required file attribute', function () {
			(function () { r = test.cfparser.parse('<cffile action="append" output="something" />'); }).should.throw('Missing required "file" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="append" output="cffile_test" file="/tmp/file">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('append');
			r.attributes.output.should.eql('cffile_test');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.true;
			r.attributes.charset.should.eql('utf-8');
			r.attributes.fix_newline.should.be.false;

			r = test.cfparser.parse('<cffile action="append" output="cffile_test2" file="/tmp/file" ' +
			'add_newline="no" charset="us-ascii" fix_newline="yes" mode="721" attributes="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('append');
			r.attributes.output.should.eql('cffile_test2');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.false;
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.fix_newline.should.be.true;
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');

			r = test.cfparser.parse('<CFFILE ' +
			'ADDNEWLINE="no" ' +
			'ACTION="append" ' +
			'OUTPUT="cffile_test2" ' +
			'FIXNEWLINE="yes" ' +
			'FILE="/tmp/file" ' +
			'CHARSET="us-ascii" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('append');
			r.attributes.output.should.eql('cffile_test2');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.false;
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.fix_newline.should.be.true;
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');
		});
	});

	describe('with the action value "copy"', function () {
		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" >'); }).should.throw('Missing required "destination" attribute.');
		});

		it('throws an error when missing the required source attribute', function () {
			(function () { test.cfparser.parse('<cffile action="copy" destination="/tmp/dfile" />'); }).should.throw('Missing required "source" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="copy" source="/tmp/sfile" destination="/tmp/dfile">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('copy');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');

			r = test.cfparser.parse('<cffile action="copy" mode="721" attributes="normal" destination="/tmp/dfile" source="/tmp/sfile">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('copy');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="copy" ' +
			'MODE="721" ' +
			'SOURCE="/tmp/sfile" ' +
			'ATTRIBUTES="normal,readOnly" ' +
			'DESTINATION="/tmp/dfile">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('copy');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.attributes.should.eql(['normal', 'readOnly']);
			r.attributes.mode.should.eql('721');
		});
	});

	describe('with the action value "delete"', function () {
		it('throws an error when missing the required file attribute', function () {
			(function () { test.cfparser.parse('<cffile action="delete">'); }).should.throw('Missing required "file" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="delete" file="/tmp/file">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('delete');
			r.attributes.file.should.eql('/tmp/file');

			r = test.cfparser.parse('<CFFILE ' +
			'FILE="/tmp/file" ' +
			'ACTION="delete">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('delete');
			r.attributes.file.should.eql('/tmp/file');
		});
	});

	describe('with the action value "move"', function () {
		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile source="/tmp/sfile" action="move" >'); }).should.throw('Missing required "destination" attribute.');
		});

		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile action="move" destination="/tmp/file" >'); }).should.throw('Missing required "source" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('move');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.charset.should.eql('utf-8');

			r = test.cfparser.parse('<cffile action="move" destination="/tmp/dfile" source="/tmp/sfile" ' +
			'charset="us-ascii" mode="721" attributes="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('move');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="move" ' +
			'DESTINATION="/tmp/dfile" ' +
			'SOURCE="/tmp/sfile" ' +
			'CHARSET="us-ascii" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('move');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');
		});
	});

	describe('with the action value "read_binary"', function () {
		it('thow an error when missing the variable attribute', function () {
			(function () { test.cfparser.parse('<cffile action="read_binary" file="/tmp/file" >') }).should.throw('Missing required "variable" attribute.');
		});

		it('thows an error when missing the required file attribute', function () {
			(function () { test.cfparser.parse('<cffile action="read_binary" variable="something" />') }).should.throw('Missing required "file" attribute.');
		});

		it("works as exected", function () {
			r = test.cfparser.parse('<cffile action="readbinary" variable="cffile_test" file="/tmp/file" >');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('readbinary');
			r.attributes.variable.should.eql('cffile_test');
			r.attributes.file.should.eql('/tmp/file');

			r = test.cfparser.parse('<CFFILE ' +
			'VARIABLE="cffile_test3" ' +
			'ACTION="read_binary" ' +
			'FILE="/tmp/file" />');
			r instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('read_binary');
			r.attributes.variable.should.eql('cffile_test3');
			r.attributes.file.should.eql('/tmp/file');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="readBinary" ' +
			'VARIABLE="cffile_test3" ' +
			'FILE="/tmp/file" />');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('read_binary');
			r.attributes.variable.should.eql('cffile_test3');
			r.attributes.file.should.eql('/tmp/file');
		});
	});

	describe('with the action value "read"', function () {
		it('throws an error when missing the required variable attribute', function () {
			(function () { test.cfparser.parse('<cffile action="read" file="/tmp/file" >'); }).should.throw('Missing required "variable" attribute.');
		});

		it('throws an error when missing the required file attribute', function () {
			(function () { test.cfparser.parse('<cffile action="read" variable="something" />'); }).should.throw('Missing required "file" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="read" variable="cffile_test" file="/tmp/file" >');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('read');
			r.attributes.variable.should.eql('cffile_test');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.charset.should.eql('utf-8');

			r = test.cfparser.parse('<cffile action="read" charset="us-ascii" variable="cffile_test2" file="/tmp/file">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('read');
			r.attributes.variable.should.eql('cffile_test2');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.charset.should.eql('us-ascii');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="read" ' +
			'VARIABLE="cffile_test3" ' +
			'FILE="/tmp/file" ' +
			'CHARSET="us-ascii" />');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('read');
			r.attributes.variable.should.eql('cffile_test3');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.charset.should.eql('us-ascii');
		});
	});

	describe('with the action value "rename"', function () {
		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile source="/tmp/sfile" action="rename" >'); }).should.throw('Missing required "destination" attribute.');
		});

		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile action="rename" destination="/tmp/file" >'); }).should.throw('Missing required "source" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('rename');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');

			r = test.cfparser.parse('<cffile action="rename" destination="/tmp/dfile" source="/tmp/sfile" ' +
			'mode="721" attributes="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('rename');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="rename" ' +
			'DESTINATION="/tmp/dfile" ' +
			'SOURCE="/tmp/sfile" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('rename');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.source.should.eql('/tmp/sfile');
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');
		});
	});

	describe('with the action value "upload_all"', function () {
		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile action="upload_all" >'); }).should.throw('Missing required "destination" attribute.');
		})

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="upload_all" destination="/tmp/dfile" />');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload_all');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.name_conflict.should.eql('error');

			r = test.cfparser.parse('<cffile action="upload_all" ' +
			'destination="/tmp/dfile" ' +
			'name_conflict="make_unique" ' +
			'accept="text/plain" ' +
			'mode="721" ' +
			'attributes="normal,hidden" '+
			'result="upload_res" />');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload_all');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.accept.should.eql('text/plain');
			r.attributes.name_conflict.should.eql('make_unique');
			r.attributes.attributes.should.eql(['normal', 'hidden']);
			r.attributes.mode.should.eql('721');
			r.attributes.result.should.eql('upload_res');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="uploadAll" ' +
			'ACCEPT="text/plain" ' +
			'DESTINATION="/tmp/dfile" ' +
			'NAMECONFLICT="make_unique" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal, hidden, readOnly" '+
			'RESULT="upload_res" ' +
			'/>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload_all');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.accept.should.eql('text/plain');
			r.attributes.name_conflict.should.eql('error');
			r.attributes.attributes.should.eql(['normal', 'hidden', 'readOnly']);
			r.attributes.mode.should.eql('721');
			r.attributes.result.should.eql('upload_res');
		});
	});

	describe('with the action value "upload"', function () {
		it('throws an error when missing the required destination attribute', function () {
			(function () { test.cfparser.parse('<cffile fileField="sfile" action="upload" >'); }).should.throw('Missing required "destination" attribute.');
		});

		it('throws an error when missing the required file_field attribute', function () {
			(function () { test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" >'); }).should.throw('Missing required "file_field" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="upload" destination="/tmp/dfile" fileField="cffile_upload_test">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.file_field.should.eql('cffile_upload_test');
			r.attributes.name_conflict.should.eql('error');

			r = test.cfparser.parse('<cffile action="upload" ' +
			'destination="/tmp/dfile" ' +
			'name_conflict="make_unique" ' +
			'fileField="cffile_upload_test2" ' +
			'accept="text/plain" ' +
			'mode="721" attributes="normal,hidden" '+
			'result="upload_res" />');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.accept.should.eql('text/plain');
			r.attributes.name_conflict.should.eql('make_unique');
			r.attributes.file_field.should.eql('cffile_upload_test2');
			r.attributes.attributes.should.eql(['normal', 'hidden']);
			r.attributes.mode.should.eql('721');
			r.attributes.result.should.eql('upload_res');

			r = test.cfparser.parse('<CFFILE ' +
			'ACTION="upload" ' +
			'ACCEPT="text/plain" ' +
			'DESTINATION="/tmp/dfile" ' +
			'FILEFIELD="cffile_upload_test3" ' +
			'NAMECONFLICT="make_unique" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal, hidden, readOnly" '+
			'RESULT="upload_res" ' +
			'/>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('upload');
			r.attributes.destination.should.eql('/tmp/dfile');
			r.attributes.accept.should.eql('text/plain');
			r.attributes.name_conflict.should.eql('error');
			r.attributes.file_field.should.eql('cffile_upload_test3');
			r.attributes.attributes.should.eql(['normal', 'hidden', 'readOnly']);
			r.attributes.mode.should.eql('721');
			r.attributes.result.should.eql('upload_res');
		});
	});

	describe('with the action value "write"', function () {
		it('throws an error missing a required output attribute', function () {
			(function () { test.cfparser.parse('<cffile action="write" file="/tmp/file" >'); }).should.throw('Missing required "output" attribute.');
		});

		it('throws an error missing a required file attribute', function () {
			(function () { test.cfparser.parse('<cffile action="write" output="something" />'); }).should.throw('Missing required "file" attribute.');
		})

		it('works as expected', function () {
			r = test.cfparser.parse('<cffile action="write" output="cffile_test" file="/tmp/file">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('write');
			r.attributes.output.should.eql('cffile_test');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.true;
			r.attributes.charset.should.eql('utf-8');
			r.attributes.fix_newline.should.be.false;

			r = test.cfparser.parse('<cffile action="write" output="cffile_test2" file="/tmp/file" ' +
			'add_newline="no" charset="us-ascii" fix_newline="yes" mode="721" attributes="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('write');
			r.attributes.output.should.eql('cffile_test2');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.false;
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.fix_newline.should.be.true;
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');

			r = test.cfparser.parse('<CFFILE ' +
			'ADDNEWLINE="no" ' +
			'ACTION="write" ' +
			'OUTPUT="cffile_test2" ' +
			'FIXNEWLINE="yes" ' +
			'FILE="/tmp/file" ' +
			'CHARSET="us-ascii" ' +
			'MODE="721" ' +
			'ATTRIBUTES="normal">');
			r.should.be.instanceof(Object);
			r.tag.should.eql('file');
			r.attributes.action.should.eql('write');
			r.attributes.output.should.eql('cffile_test2');
			r.attributes.file.should.eql('/tmp/file');
			r.attributes.add_newline.should.be.false;
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.fix_newline.should.be.true;
			r.attributes.attributes.should.eql(['normal']);
			r.attributes.mode.should.eql('721');
		});
	});
});
