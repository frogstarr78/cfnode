const should = require('should'), 
        test = require('./testlib');

describe('Parsing a cfupdate tag', function () {
    it('throws an error when missing required attributes', function () {
        (function () { test.cfparser.parse('<cfupdate>'); }).should.throw('Expected " ", "\\n", or "\\t" but ">" found.');
        (function () { test.cfparser.parse('<cfupdate />'); }).should.throw('Expected " ", "\\n", "\\t", [dD], [fF], [pP], [tT], or [uU] but "/" found.');
    });

    it('throws an error when missing a required datasource attributes', function () {
        (function () { test.cfparser.parse('<cfupdate tableName="cfupdate_table">'); }).should.throw('Missing required "datasource" attribute.');
    });

    it('throws an error when missing a required table_name attributes', function () {
        (function () { test.cfparser.parse('<cfupdate datasource="cfupdate_dsn">'); }).should.throw('Missing required "table_name" attribute.');
    });

    it('throws an error when the datasource attribute value is empty', function () {
        (function () { test.cfparser.parse('<cfupdate datasource="" table_name="tbl">'); }).should.throw('Empty "datasource" attribute.');
    });

    it('throws an error when the table_name attribute value is empty', function () {
        (function () { test.cfparser.parse('<cfupdate tableName="" datasource="dsn">'); }).should.throw('Empty "table_name" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfupdate dataSource="cfupdate_dsn2" tableName="cfupdate_table2">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('update');
        r.attributes.datasource.should.eql('cfupdate_dsn2');
        r.attributes.table_name.should.eql('cfupdate_table2');

        r = test.cfparser.parse('<cfupdate datasource="dsn3" tableName="tbl3" formFields="id,name,three" password="mypass2" tableOwner="noone_else" tableQualifier="pg_catalog2" username="me2" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('update');
        r.attributes.datasource.should.eql('dsn3');
        r.attributes.table_name.should.eql('tbl3');
        r.attributes.form_fields.should.eql(['id', 'name', 'three']);
        r.attributes.password.should.eql("mypass2");
        r.attributes.table_owner.should.eql("noone_else");
        r.attributes.table_qualifier.should.eql("pg_catalog2");
        r.attributes.username.should.eql('me2');

        r = test.cfparser.parse('<CFUPDATE DATASOURCE="dsn4" TABLENAME="tbl4" FORMFIELDS="id,name,three,four" PASSWORD="mypass3" TABLEOWNER="noone_else" TABLEQUALIFIER="pg_catalog3" USERNAME="me3">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('update');
        r.attributes.datasource.should.eql('dsn4');
        r.attributes.table_name.should.eql('tbl4');
        r.attributes.form_fields.should.eql(['id', 'name', 'three', 'four']);
        r.attributes.password.should.eql("mypass3");
        r.attributes.table_owner.should.eql("noone_else");
        r.attributes.table_qualifier.should.eql("pg_catalog3");
        r.attributes.username.should.eql('me3');
    });
});
