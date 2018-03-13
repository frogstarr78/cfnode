const should = require('should'), test = require('./testlib');

describe('Prsing the cfdbinfo tag', function () {
    it('throws an error when missing all required attributes', function () {
        (function () { r = test.cfparser.parse('<cfdbinfo>'); }).should.throw(/Expected " ", "\\n", or "\\t" but ">" found./);
    });

    it('throws an error when missing required "name" attribute', function () {
        (function () { r = test.cfparser.parse('<cfdbinfo type="dbnames">'); }).should.throw('Missing required "name" attribute.');
    });

    it('throws an error when missing required "type" attribute', function () {
        (function () { r = test.cfparser.parse('<cfdbinfo name="cfdbinfo_test">'); }).should.throw('Missing required "type" attribute.');
    });

    it('throws an error when missing the required "table" attribute for certain type attributes', function () {
        (function () { r = test.cfparser.parse('<cfdbinfo type="columns" name="cfdbinfo_test">'); }).should.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
        (function () { r = test.cfparser.parse('<cfdbinfo type="foreignkeys" name="cfdbinfo_test">'); }).should.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
        (function () { r = test.cfparser.parse('<cfdbinfo type="index" name="cfdbinfo_test">'); }).should.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
    });

    it("doesn't throw an error when missing required \"table\" attribute for certain type attributes", function () {
        (function () { r = test.cfparser.parse('<cfdbinfo type="dbnames" name="cfdbinfo_test">'); }).should.not.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
        (function () { r = test.cfparser.parse('<cfdbinfo type="tables" name="cfdbinfo_test">'); }).should.not.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
        (function () { r = test.cfparser.parse('<cfdbinfo type="version" name="cfdbinfo_test">'); }).should.not.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
        (function () { r = test.cfparser.parse('<cfdbinfo type="procedures" name="cfdbinfo_test">'); }).should.not.throw('Missing table value, required with type attribute specified as one of columns,foreignkeys,index.');
    });

    it('works as expected with some attributes defined', function () {
        r = test.cfparser.parse('<cfdbinfo type="dbnames" name="cfdbinfo_test">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('dbinfo');
        r.attributes.type.should.eql('dbnames');
        r.attributes.name.should.eql('cfdbinfo_test');
    });

    it('works as expected with some more tributes defined', function () {
        r = test.cfparser.parse('<cfdbinfo name="cfdbinfo_test" table="users" type="columns">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('dbinfo');
        r.attributes.type.should.eql('columns');
        r.attributes.name.should.eql('cfdbinfo_test');
        r.attributes.table.should.eql('users');
    });

    it('works as expected with a bunch of attributes defined', function () {
        r = test.cfparser.parse('<cfdbinfo name="cfdbinfo_test" type="columns" datasource="dsn" table="users" dbname="thedb" username="user" password="thepassword">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('dbinfo');
        r.attributes.type.should.eql('columns');
        r.attributes.name.should.eql('cfdbinfo_test');
        r.attributes.table.should.eql('users');
        r.attributes.datasource.should.eql('dsn');
        r.attributes.dbname.should.eql('thedb');
        r.attributes.username.should.eql('user');
        r.attributes.password.should.eql('thepassword');
    });

    it('works as expected with a bunch of attributes defined all in caps', function () {
        r = test.cfparser.parse('<CFDBINFO DATASOURCE="dsn" TABLE="users" DBNAME="thedb" USERNAME="user" PASSWORD="thepassword" NAME="cfdbinfo_test" TYPE="columns">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('dbinfo');
        r.attributes.type.should.eql('columns');
        r.attributes.name.should.eql('cfdbinfo_test');
        r.attributes.table.should.eql('users');
        r.attributes.datasource.should.eql('dsn');
        r.attributes.dbname.should.eql('thedb');
        r.attributes.username.should.eql('user');
        r.attributes.password.should.eql('thepassword');
    });
});
