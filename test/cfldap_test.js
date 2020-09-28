const should = require('should'),
        test = require('./testlib');

describe("Parser should parse cfldap tags", function () {
  describe('using the default action "query".should.eql(should eror without', function () {
      it('a required server attribute', function () {
        (function () { test.cfparser.parse('<cfldap />') }).should.throw(/Expected " ", "\\n", "\\t", \[aA\], \[dD\], \[fF\], \[mM\], \[nN\], \[pP\], \[rR\], \[sS\], \[tT\], or \[uU\] but "\/" found./);
      });

      it('a required name attribute', function () {
        (function () { test.cfparser.parse('<cfldap server="localhost" />') }).should.throw('Missing required "name" attribute.');
      });

      it('a required name attribute', function () {
        (function () { test.cfparser.parse('<cfldap server="localhost" action="query" attributes="*" />') }).should.throw('Missing required "name" attribute.');
      });

      it('a required start attribute', function () {
        (function () { test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" attributes="*" />') }).should.throw('Missing required "start" attribute.');
      });

      it('a required password attribute', function () {
        (function () { test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" start="dc=example,dc=org" secure="CFSSL_BASIC" attributes="*" />') }).should.throw('Missing required "password" attribute.');
      });

      it('a required attributes attribute', function () {
        (function () { test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" start="dc=example,dc=org" secure="CFSSL_BASIC" />') }).should.throw('Missing required "attributes" attribute.');
      });
  });

  describe('using "add" action should error without', function () {
    it('a required dn attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="add" attributes="name" />') }).should.throw('Missing required "dn" attribute.');
    });

    it('a missing required attributes attribute without', function () {
      (function () { test.cfparser.parse('<cfldap action="add" dn="dc=example,dc=org" />') }).should.throw('Missing required "attributes" attribute.');
    });
  });

  describe('using "modify" action should error without', function () {
    it('a missing required dn attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="modify" attributes="name" />') }).should.throw('Missing required "dn" attribute.');
    });

    it('a missing required attributes attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="modify" dn="dc=example,dc=org" />') }).should.throw('Missing required "attributes" attribute.');
    });
  });

  describe('using "modify_dn" action should error without', function () {
    it('a required dn attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="modify_dn" attributes="name" />') }).should.throw('Missing required "dn" attribute.');
    });

    it('a missing required attributes attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="modify_dn" dn="dc=example,dc=org" />') }).should.throw('Missing required "attributes" attribute.');
    });
  });

  describe('using "delete" action should error without', function () {
    it('a missing required dn attribute', function () {
      (function () { test.cfparser.parse('<cfldap action="delete" />') }).should.throw('Missing required "dn" attribute.');
    });

    it("an unexpected secue attribute value", function () {
      (function () { test.cfparser.parse('<cfldap server="localhost" name="cfldap_test" username="user" password="pass" attributes="*" start="dc=example,dc=org" secure="CFSSL_RSA" />') }).should.throw(/Expected "CFSSL_BASIC" but "C" found./);
    });
  });

  describe('creating expected structures when everything is as it should be', function () {
    it("setting default attibutes when they aren't defined in the call", function () {
      r = test.cfparser.parse('<cfldap ' +
      'server="localhost" ' +
      'action="add" ' +
      'dn="dc=example,dc=org" ' +
      'attributes="*" ' +
      '/>');
      r.attributes.action.should.eql('add');
      r.attributes.delimiter.should.eql(';');
      r.attributes.filter.should.eql('objectclass = *');
      r.attributes.port.should.eql(389);
      r.attributes.rebind.should.eql(false);
      r.attributes.modify_type.should.eql('replace');
      r.attributes.scope.should.eql('one_level');
      r.attributes.separator.should.eql(',');
      r.attributes.sort_control.should.eql('asc');
      r.attributes.start_row.should.eql(1);
      r.attributes.timeout.should.eql(60000);
      r.attributes.username.should.eql('anonymous');
    });

    it("ovewriting default attributes when they are defined in the call", function () {
      r = test.cfparser.parse('<cfldap ' +
      'username="user" ' +
      'secure="CFSSL_BASIC" ' +
      'filter="objectclass = posixAccount" ' +
      'password="pass" ' +
      'delimiter="|" ' +
      'start_row="3" ' +
      'sort_control="nocase,desc" ' +
      'rebind="yes" ' +
      'modify_type="delete" ' +
      'name="cfldap_test" ' +
      'port="636" ' +
      'dn="dc=example,dc=org" ' +
      'scope="subtree" ' +
      'attributes="*" ' +
      'start="dc=example,dc=org" ' +
      'timeout="30" ' +
      'separator="." ' +
      'server="localhost" ' +
      '/>');
      r.attributes.action.should.eql('query');
      r.attributes.attributes.should.eql("*");
      r.attributes.delimiter.should.eql('|');
      r.attributes.dn.should.eql("dc=example,dc=org");
      r.attributes.filter.should.eql('objectclass = posixAccount');
      r.attributes.modify_type.should.eql('delete');
      r.attributes.name.should.eql("cfldap_test");
      r.attributes.password.should.eql("pass");
      r.attributes.port.should.eql(636);
      r.attributes.rebind.should.eql(true);
      r.attributes.scope.should.eql('subtree');
      r.attributes.secure.should.eql("CFSSL_BASIC");
      r.attributes.separator.should.eql('.');
      r.attributes.server.should.eql("localhost");
      r.attributes.sort_control.should.eql("nocase,desc");
      r.attributes.start.should.eql("dc=example,dc=org");
      r.attributes.start_row.should.eql(3);
      r.attributes.timeout.should.eql(30);
      r.attributes.username.should.eql('user');
    });

    it("should work as expected", function () {
      r = test.cfparser.parse('<cfldap ' +
      'server="localhost" ' +
      'action="add" ' +
      'sort_control="desc" ' +
      'dn="dc=example,dc=org" ' +
      'modify_type="add" ' +
      'attributes="email" ' +
      '/>');
      r.attributes.action.should.eql('add');
      r.attributes.attributes.should.eql("email");
      r.attributes.dn.should.eql("dc=example,dc=org");
      r.attributes.modify_type.should.eql('add');
      r.attributes.server.should.eql("localhost");
      r.attributes.sort_control.should.eql("desc");
    });

    it("should work as expected again", function () {
      r = test.cfparser.parse('<cfldap ' +
      'server="localhost" ' +
      'action="add" ' +
      'sort_control="nocase,asc" ' +
      'dn="dc=example,dc=net" ' +
      'modify_type="add" ' +
      'attributes="name,org" ' +
      '/>');
      r.attributes.action.should.eql('add');
      r.attributes.attributes.should.eql("name,org");
      r.attributes.dn.should.eql("dc=example,dc=net");
      r.attributes.modify_type.should.eql('add');
      r.attributes.server.should.eql("localhost");
	  r.attributes.sort_control.should.eql("nocase,asc");
    });
  });
});
