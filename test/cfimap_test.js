const test = require('./testlib'),
	should = require('should');

describe('parsing the cfimap tag', function () {
  it('thows an error when missing the required "connection" attribute', function () {
    (function () { test.cfparser.parse('<cfimap action="close" />') }).should.throw('Missing required "connection" attribute.');
  });

  it('thows an error when missing the required "connection" attribute', function () {
    (function () { test.cfparser.parse('<cfimap action="open" username="user" password="pass" server="localhost" />') }).should.throw('Missing required "connection" attribute.');
  });

  it('thows an error when missing the required "username" attribute', function () {
    (function () { test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" password="pass" server="localhost" />') }).should.throw('Missing required "username" attribute.');
  });

  it('thows an error when missing the required "password" attribute', function () {
    (function () { test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" username="user" server="localhost" />') }).should.throw('Missing required "password" attribute.');
  });

  it('thows an error when missing the required "server" attribute', function () {
    (function () { test.cfparser.parse('<cfimap action="open" connection="cfimap_conn" username="user" password="pass" />') }).should.throw('Missing required "server" attribute.');
  });

  ['delete_folder', 'create_folder'].forEach(function(action, i, arry) {
      it('thows an error when missing the required "' + action + '" attribute', function () {
        (function () { test.cfparser.parse('<cfimap action="' + action + '" />') }).should.throw('Missing required "folder" attribute.');
      });
  });

  ['get_all', 'get_header_only', 'list_all_folders'].forEach(function(action, i, arry) {
      it('thows an error when missing the required "' + action + '" attribute', function () {
        (function () { test.cfparser.parse('<cfimap action="' + action + '" />'); }).should.throw('Missing required "name" attribute.');
      });
  });

  it('erors when missing the required "folder" attribute.', function () {
    (function () { test.cfparser.parse('<cfimap action="rename_folder" new_folder="nu_folder" />') }).should.throw('Missing required "folder" attribute.');
  });

  it('erors when missing the required "folder" attribute.', function () {
      (function () { test.cfparser.parse('<cfimap action="rename_folder" folder="old_folder" />') }).should.throw('Missing required "new_folder" attribute.');
  });

  it('erors when missing the required "folder" attribute.', function () {
      (function () { test.cfparser.parse('<cfimap action="move_mail" />') }).should.throw('Missing required "new_folder" attribute.');
  });

  r = test.cfparser.parse('<cfimap ' +
  'name="cfimap_test" ' +
  '/>');
  r.attributes.action.should.eql('get_header_only');
  r.attributes.folder.should.eql('INBOX');
  r.attributes.name.should.eql('cfimap_test');
  r.attributes.port.should.eql(143);
  r.attributes.recurse.should.eql(false);
  r.attributes.secure.should.eql(false);
  r.attributes.stop_on_error.should.eql(true);
  r.attributes.timeout.should.eql(60);

  r = test.cfparser.parse('<cfimap ' +
  'action="list_all_folders" ' +
  'name="cfimap_test2" ' +
  '/>');
  r.attributes.action.should.eql('list_all_folders');
  r.attributes.folder.should.eql('mailbox');
  r.attributes.name.should.eql('cfimap_test2');
  r.attributes.port.should.eql(143);
  r.attributes.recurse.should.eql(false);
  r.attributes.secure.should.eql(false);
  r.attributes.stop_on_error.should.eql(true);
  r.attributes.timeout.should.eql(60);

  r = test.cfparser.parse('<cfimap ' +
  'name="cfimap_test3" ' +
  'secure="yes" ' +
  '/>');
  r.attributes.action.should.eql('get_header_only');
  r.attributes.folder.should.eql('INBOX');
  r.attributes.name.should.eql('cfimap_test3');
  r.attributes.port.should.eql(993);
  r.attributes.recurse.should.eql(false);
  r.attributes.secure.should.eql(true);
  r.attributes.stop_on_error.should.eql(true);
  r.attributes.timeout.should.eql(60);

  it('can pase a cfimap tag opening a connection', function (){
    r = test.cfparser.parse('<cfimap ' +
    'server="localhost" ' +
    'connection="cfimap_conn" ' +
    'action="open" ' +
    'password="pass" ' +
    'username="user" ' +
    '/>');
    r.attributes.action.should.equal('open');
    r.attributes.connection.should.equal('cfimap_conn');
    r.attributes.server.should.equal('localhost');
    r.attributes.username.should.equal('user');
    r.attributes.password.should.equal('pass');
  });

  r = test.cfparser.parse('<cfimap action="create_folder" folder="old_folder" />');
  r.attributes.action.should.eql('create_folder');
  r.attributes.folder.should.eql('old_folder');

  r = test.cfparser.parse('<cfimap action="delete_folder" folder="old_folder" />');
  r.attributes.action.should.eql('delete_folder');
  r.attributes.folder.should.eql('old_folder');

  r = test.cfparser.parse('<cfimap action="get_all" name="cfimap_test4" />');
  r.attributes.action.should.eql('get_all');
  r.attributes.name.should.eql('cfimap_test4');

  r = test.cfparser.parse('<cfimap action="move_mail" newFolder="/tmp/flder" />');
  r.attributes.action.should.eql('move_mail');
  r.attributes.new_folder.should.eql('/tmp/flder');

  r = test.cfparser.parse('<cfimap action="rename_folder" folder="old_folder" new_folder="new_folder" />');
  r.attributes.action.should.eql('rename_folder');
  r.attributes.new_folder.should.eql('new_folder');
  r.attributes.folder.should.eql('old_folder');
});
