const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfzip tag', function() {
	describe('with a list value for the action attribute', function () {
		it('should thow an error when missing a defined file attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="list" name="size" >'); }).should.throw('Missing required "file" attribute.');
		});

		it('should thow an error when missing a defined name attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="list" file="/path/to/file.zip" >'); }).should.throw('Missing required "name" attribute.');
		});

		it('should work as expected with minimal attributes defined', function () {
			r = test.cfparser.parse('<cfzip action="list" name="cfzip_list" variable="cfzip_list_test" file="/tmp/file.zip" entrypath="/tmp/files" >');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('list');
			r.attributes.entry_path.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.variable.should.eql('cfzip_list_test');
		});

		it('should work as expected with a couple attributes defined', function () {
			r = test.cfparser.parse('<cfzip ' +
			'entrypath="/tmp/files" ' +
			'filter="*.txt" ' +
			'recurse="true" ' +
			'show_directory="true" ' +
			'name="cfzip_list" '+
			'variable="cfzip_list_test2" ' +
			'action="list" ' +
			'file="/tmp/file.zip"' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('list');
			r.attributes.entry_path.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.true;
			r.attributes.show_directory.should.be.true;
			r.attributes.variable.should.eql('cfzip_list_test2');
		});

		it('should work as expected (with attributes defined all in caps)', function () {
			r = test.cfparser.parse('<cfzip ' +
			'ACTION="list" ' +
			'SHOW_DIRECTORY="true" ' +
			'FILTER="*.txt" ' +
			'ENTRY_PATH="/tmp/files" ' +
			'RECURSE="true" ' +
			'NAME="cfzip_list" '+
			'VARIABLE="cfzip_list_test3" ' +
			'FILE="/tmp/file.zip"' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('list');
			r.attributes.entry_path.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.true;
			r.attributes.show_directory.should.be.true;
			r.attributes.variable.should.eql('cfzip_list_test3');
		});

		it('should work as expected.should.eql(with some attibutes defined', function () {
			r = test.cfparser.parse('<CFZIP ' +
			'entrypath="/tmp/files" ' +
			'filter="*.txt" ' +
			'variable="cfzip_list_test4" ' +
			'name="cfzip_list" '+
			'action="list" ' +
			'file="/tmp/file.zip"' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('list');
			r.attributes.entry_path.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.false;
			r.attributes.show_directory.should.be.false;
			r.attributes.variable.should.eql('cfzip_list_test4');
		});

		it('should work as expected.should.eql(with some moe attributes defined', function () {
			r = test.cfparser.parse('<CFZIP ' +
			'entrypath="/tmp/files" ' +
			'filter="*.jpg" ' +
			'variable="cfzip_list_test5" ' +
			'file="/tmp/file.zip" ' +
			'entrypath="/tmp/files2" ' +
			'action="list" ' +
			'variable="cfzip_list_test6" ' +
			'file="/tmp/file2.zip" ' +
			'name="cfzip_list" '+
			'filter="*.png" ' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('list');
			r.attributes.entry_path.should.eql('/tmp/files2');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.png');
			r.attributes.recurse.should.be.false;
			r.attributes.show_directory.should.be.false;
			r.attributes.variable.should.eql('cfzip_list_test6');
		});
	});

	describe('with a read_binary value for the action attribute', function () {
		it('should thow an error when it is missing entry_path attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="read_binary" file="file.zip" variable="read_zip" >'); }).should.throw('Missing required "entry_path" attribute.');
		});

		it('should thow an error when missing a defined entry_path attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="readbinary" variable="something" file="/tmp/files.zip" />'); }).should.throw('Missing required "entry_path" attribute.');
		});

		it('should thow an error when it is missing file attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="readBinary" entry_path="/path/to/" variable="read_zip" >'); }).should.throw('Missing required "file" attribute.');
		});

		it('should thow an error when missing a defined file attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="readbinary" variable="something" entry_path="/tmp/files2" />'); }).should.throw('Missing required "file" attribute.');
		});

		it('should thow an error when missing a defined variable attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="readbinary" file="/tmp/file.zip" entry_path="/tmp/files" >'); }).should.throw('Missing required "variable" attribute.');
		});

		it('should work as expected.should.eql(with some attibutes defined', function () {
			r = test.cfparser.parse('<cfzip action="readbinary" variable="cfzip_test" file="/tmp/file.zip" entry_path="/tmp/files3" >');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('readbinary');
			r.attributes.variable.should.eql('cfzip_test');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.entry_path.should.eql('/tmp/files3');
		});

		it('should work as expected.should.eql(with some attibutes defined.should.eql(all in caps', function () {
			r = test.cfparser.parse('<CFZIP ' +
			'ENTRY_PATH="/tmp/files4" ' +
			'VARIABLE="cfzip_test3" ' +
			'ACTION="read_binary" ' +
			'FILE="/tmp/file.zip" ' + 
			'/>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('read_binary');
			r.attributes.entry_path.should.eql('/tmp/files4');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.variable.should.eql('cfzip_test3');
		});

		it('should work as expected.should.eql(with some moe attributes defined.should.eql(all in caps', function () {
			r = test.cfparser.parse('<CFZIP ' +
			'VARIABLE="cfzip_test3" ' +
			'ACTION="readBinary" ' +
			'ENTRYPATH="/tmp/files5" ' +
			'FILE="/tmp/file.zip" ' + 
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('read_binary');
			r.attributes.entry_path.should.eql('/tmp/files5');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.variable.should.eql('cfzip_test3');
		});
	});

	describe('with a delete value for the action attribute', function () {
		it('should thow an error when it is a missing file attribute', function () {
			(function () { test.cfparser.parse('<cfzip action="delete" >'); }).should.throw('Missing required "file" attribute.');
		});
	});

	describe('with an unzip value for the action attribute', function () {
		it('should thow an error when it is missing destination attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="unzip" file="/path/to/file.zip" >'); }).should.throw('Missing required "destination" attribute.');
		});

		it('should thow an error when it is missing file attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="unzip" destination="/path/to/unzip/to" >'); }).should.throw('Missing required "file" attribute.');
		});

		it('works as expected', function () {
			r = test.cfparser.parse('<cfzip action="unzip" file="/tmp/file.zip" destination="/tmp/files" >');
			r.should.be.instanceof(Object);
			r.tag.should.eql('zip');
			r.attributes.action.should.eql('unzip');
			r.attributes.destination.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.overwrite.should.be.false;
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip ' +
			'destination="/tmp/dst" ' +
			'filter="*.txt" ' +
			'recurse="true" ' +
			'overwrite="true" ' +
			'entry_path="/tmp/" ' +
			'action="unzip" ' +
			'store_path="false" ' +
			'file="/tmp/file2.zip" ' +
			'>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('zip');
			r.attributes.action.should.eql('unzip');
			r.attributes.destination.should.eql('/tmp/dst');
			r.attributes.entry_path.should.eql('/tmp/');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.overwrite.should.be.true;
			r.attributes.recurse.should.be.true;
			r.attributes.store_path.should.be.false;

			r = test.cfparser.parse('<CFZIP ' +
			'RECURSE="yes" ' +
			'FILE="/tmp/file3.zip" ' +
			'OVERWRITE="true" ' +
			'FILTER="*.txt" ' +
			'ENTRYPATH="/files" ' +
			'DESTINATION="/tmp/dst2" ' +
			'STORE_PATH="yes" ' +
			'ACTION="unzip"' +
			'>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('zip');
			r.attributes.action.should.eql('unzip');
			r.attributes.destination.should.eql('/tmp/dst2');
			r.attributes.entry_path.should.eql('/files');
			r.attributes.file.should.eql('/tmp/file3.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.true;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip ' +
			'entrypath="/tmp/files" ' +
			'filter="*.txt" ' +
			'destination="/tmp/dst3" ' +
			'action="unzip" ' +
			'file="/tmp/file.zip"' +
			'>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('zip');
			r.attributes.action.should.eql('unzip');
			r.attributes.destination.should.eql('/tmp/dst3');
			r.attributes.entry_path.should.eql('/tmp/files');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<CFZIP ' +
			'entrypath="/tmp/files" ' +
			'filter="*.jpg" ' +
			'destination="/tmp/dst4" ' +
			'file="/tmp/file.zip" ' +
			'entrypath="/tmp/files2" ' +
			'action="unzip" ' +
			'file="/tmp/file2.zip" ' +
			'filter="*.png" ' +
			'>');
			r.should.be.instanceof(Object);
			r.tag.should.eql('zip');
			r.attributes.action.should.eql('unzip');
			r.attributes.destination.should.eql('/tmp/dst4');
			r.attributes.entry_path.should.eql('/tmp/files2');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.png');
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;
		});
	});

	describe('with an zip value for the action attribute', function () {

		it('should thow an error when the action is zip and it is missing file attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="zip" source="/path/to/unzip/to" >'); }).should.throw('Missing required "file" attribute.');
			(function () { r = test.cfparser.parse('<cfzip source="/tmp" />'); }).should.throw('Missing required "file" attribute.');
		});

		it('should thow an error when the action is zip and it is missing source attribute', function () {
			(function () { r = test.cfparser.parse('<cfzip action="zip" file="/path/to/zip/dir" >'); }).should.throw('Missing required "source" attribute.');
			(function () { r = test.cfparser.parse('<cfzip file="/tmp/file.zip" >'); }).should.throw('Missing required "source" attribute.');
		});

		it('should work as expected', function () {
			r = test.cfparser.parse('<cfzip file="/path/to/destination.file" source="/path/to/source" >');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.file.should.eql('/path/to/destination.file');
			r.attributes.source.should.eql('/path/to/source');

			r = test.cfparser.parse('<cfzip source="/tmp" file="/tmp/file.zip" >');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.source.should.eql('/tmp');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.overwrite.should.be.false;
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip action="zip" file="/tmp/file.zip" source="/tmp" >');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.source.should.eql('/tmp');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.overwrite.should.be.false;
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip file="/path/to/file.zip" source="/path/to/content_to/zip" />');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.charset.should.eql('utf-8');
			r.attributes.action.should.eql('zip');
			r.attributes.store_path.should.be.true;
			r.attributes.show_directory.should.be.false;
			r.attributes.recurse.should.be.true;
			r.attributes.overwrite.should.be.false;
			r.attributes.file.should.eql("/path/to/file.zip");
			r.attributes.source.should.eql("/path/to/content_to/zip");

			r = test.cfparser.parse('<cfzip ' +
			'filter="*.txt" ' +
			'action="zip" ' +
			'source="/tmp4" ' +
			'file="/tmp/file.zip"' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.file.should.eql('/tmp/file.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.recurse.should.be.false;
			r.attributes.source.should.eql('/tmp4');
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip ' +
			'charset="us-ascii" ' +
			'file="/path/to/file.zip" ' +
			'recurse="yes" ' +
			'filter="*.txt" ' +
			'store_path="no" ' +
			'prefix="prefix_path" ' +
			'source="/tmp/spath" ' +
			'store_path="no" ' +
			'/>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.action.should.eql('zip');
			r.attributes.store_path.should.be.false;
			r.attributes.show_directory.should.be.false;
			r.attributes.recurse.should.be.true;
			r.attributes.prefix.should.eql("prefix_path");
			r.attributes.file.should.eql("/path/to/file.zip");
			r.attributes.source.should.eql("/tmp/spath");

			r = test.cfparser.parse('<CFZIP ' +
			'source="/tmp/files" ' +
			'filter="*.jpg" ' +
			'source="/tmp/dst5" ' +
			'file="/tmp/file.zip" ' +
			'action="zip" ' +
			'file="/tmp/file2.zip" ' +
			'filter="*.png" ' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.source.should.eql('/tmp/dst5');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.png');
			r.attributes.recurse.should.be.false;
			r.attributes.store_path.should.be.true;

			r = test.cfparser.parse('<cfzip ' +
			'action="unzip" ' +
			'charset="us-ascii" ' +
			'file="/path/to/file.zip" ' +
			'recurse="yes" ' +
			'filter="*.txt" ' +
			'store_path="no" ' +
			'destination="/tmp/dpath" ' +
			'prefix="prefix_path" ' +
			'overwrite="no" ' +
			'store_path="no" ' +
			'/>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.action.should.eql('unzip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.store_path.should.be.false;
			r.attributes.show_directory.should.be.false;
			r.attributes.recurse.should.be.true;
			r.attributes.prefix.should.eql("prefix_path");
			r.attributes.file.should.eql("/path/to/file.zip");
			r.attributes.destination.should.eql("/tmp/dpath");

			r = test.cfparser.parse('<cfzip ' +
			'prefix="/tmp" ' +
			'store_path="false" ' +
			'filter="*.txt" ' +
			'recurse="true" ' +
			'action="zip" ' +
			'overwrite="true" ' +
			'source="/tmp2" ' +
			'file="/tmp/file2.zip" ' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.overwrite.should.be.true;
			r.attributes.prefix.should.eql("/tmp");
			r.attributes.recurse.should.be.true;
			r.attributes.source.should.eql('/tmp2');
			r.attributes.store_path.should.be.false;

			r = test.cfparser.parse('<CFZIPPARAM '+
			'CHARSET="us-ascii" ' +
			'CONTENT="content written" ' +
			'RECURSE="yes" ' +
			'ENTRYPATH="/tmp/dpath" ' +
			'FILTER="*.txt" ' +
			'PREFIX="/tmp/prefix_path" ' +
			'SOURCE="/tmp/spath" ' +
			'/>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zipparam');
			r.attributes.charset.should.eql('us-ascii');
			r.attributes.recurse.should.be.true;
			r.attributesr.content.should.eql('content written');
			r.attributes.entry_path.should.eql('/tmp/dpath');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.prefix.should.eql('/tmp/prefix_path');
			r.attributes.source.should.eql('/tmp/spath');

			r = test.cfparser.parse('<CFZIP ' +
			'FILTER="*.txt" ' +
			'OVERWRITE="true" ' +
			'PREFIX="/tmp" ' +
			'ACTION="zip" ' +
			'STORE_PATH="false" ' +
			'SOURCE="/tmp3" ' +
			'FILE="/tmp/file2.zip" ' +
			'RECURSE="true" ' +
			'>');
			r.should.be.instanceof(Object);
			rr.tag.should.eql('zip');
			r.attributes.action.should.eql('zip');
			r.attributes.file.should.eql('/tmp/file2.zip');
			r.attributes.filter.should.eql('*.txt');
			r.attributes.overwrite.should.be.true;
			r.attributes.prefix.should.eql("/tmp");
			r.attributes.recurse.should.be.true;
			r.attributes.source.should.eql('/tmp3');
			r.attributes.store_path.should.be.false;
		});
	});
});
