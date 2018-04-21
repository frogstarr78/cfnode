const should = require('should'),
        test = require('./testlib');

describe('Parsing the cfinsert tag', function () {
    it('should throw an error when missing a required data_source attribute', function () {
        (function () { test.cfparser.parse('<cfinsert tableName="cfinsert_table">'); }).should.throw('Missing required "data_source" attribute.');
    });

    it('should throw an error when missing a required table_name attribute', function () {
        (function () { test.cfparser.parse('<cfinsert datasource="cfinsert_dsn">'); }).should.throw('Missing required "table_name" attribute.');
    });

    it('should throw an error when the data_source attribute is empty', function () {
        (function () { test.cfparser.parse('<cfinsert table_name="the_table" datasource="">'); }).should.throw('Empty "data_source" attribute.');
    });

    it('should throw an error when the table_name attribute is empty', function () {
        (function () { test.cfparser.parse('<cfinsert tableName="" datasource="dsn" >'); }).should.throw('Empty "table_name" attribute.');
    });

    it('should work as expected', function () {
        r = test.cfparser.parse('<cfinsert dataSource="cfinsert_dsn2" tableName="cfinsert_table2">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('insert');
        r.attributes.datasource.should.eql('cfinsert_dsn2');
        r.attributes.table_name.should.eql('cfinsert_table2');

        r = test.cfparser.parse('<cfinsert datasource="dsn3" tableName="tbl3" formFields="id,name,three" password="mypass2" tableOwner="noone_else" tableQualifier="pg_catalog2" username="me2" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('insert');
        r.attributes.datasource.should.eql('dsn3');
        r.attributes.table_name.should.eql('tbl3');
        r.attributes.form_fields.should.eql(['id', 'name', 'three']);
        r.attributes.password.should.eql("mypass2");
        r.attributes.table_owner.should.eql("noone_else");
        r.attributes.table_qualifier.should.eql("pg_catalog2");
        r.attributes.username.should.eql('me2');

        r = test.cfparser.parse('<CFINSERT DATASOURCE="dsn4" TABLENAME="tbl4" FORMFIELDS="id,name,three,four" PASSWORD="mypass3" TABLEOWNER="noone_else" TABLEQUALIFIER="pg_catalog3" USERNAME="me3">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('insert');
        r.attributes.datasource.should.eql('dsn4');
        r.attributes.table_name.should.eql('tbl4');
        r.attributes.form_fields.should.eql(['id', 'name', 'three', 'four']);
        r.attributes.password.should.eql("mypass3");
        r.attributes.table_owner.should.eql("noone_else");
        r.attributes.table_qualifier.should.eql("pg_catalog3");
        r.attributes.username.should.eql('me3');
    });
});
