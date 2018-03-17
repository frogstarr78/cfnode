const should = require('should'), test = require('./testlib');

describe('Parsing the cfpop tag', function () {
    it('should error when missing the required server attribute', function () {
        (function () { test.cfparser.parse('<cfpop />'); }).should.throw('Expected " ", "\\n", "\\t", [aA], [dD], [gG], [mM], [nN], [pP], [sS], [tT], or [uU] but "/" found.');
    });

    it('should error when missing the required server attribute', function () {
        (function () { test.cfparser.parse('<cfpop name="cfpop_test" />'); }).should.throw('Missing required "server" attribute.');
    });

    it('should error when missing the required name attribute with the get_all action attribute value', function () {
        (function () { test.cfparser.parse('<cfpop server="localhost" action="getAll" />'); }).should.throw('Missing required "name" attribute.');
    });

    it('should error when missing the required name attribute with the get_header_only action attribute value', function () {
        (function () { test.cfparser.parse('<cfpop server="localhost" action="get_header_only" />'); }).should.throw('Missing required "name" attribute.');
    });

    it('should should work as expected with minimal attributes defined and the default "get_header_only" action attribute value', function () {
        r = test.cfparser.parse('<cfpop ' +
        'server="localhost" ' +
        'name="cfpop_test" ' +
        '/>');
        r.attributes.action.should.eql('get_header_only');
        r.attributes.debug.should.be.false;
        r.attributes.generate_unique_filenames.should.eql(false);
        r.attributes.name.should.eql('cfpop_test');
        r.attributes.port.should.eql(110);
        r.attributes.server.should.eql('localhost');
        r.attributes.start_row.should.eql(1);
        r.attributes.timeout.should.eql(60);
    });

    it('should should work as expected with minimal attributes defined and the "get_all" action attribute value', function () {
        r = test.cfparser.parse('<cfpop ' +
        'server="localhost" ' +
        'action="getAll" ' +
        'name="cfpop_test2" ' +
        '/>');
        r.attributes.action.should.eql('get_all');
        r.attributes.debug.should.be.false;
        r.attributes.generate_unique_filenames.should.eql(false);
        r.attributes.name.should.eql('cfpop_test2');
        r.attributes.port.should.eql(110);
        r.attributes.server.should.eql('localhost');
        r.attributes.start_row.should.eql(1);
        r.attributes.timeout.should.eql(60);
    });

    it('should should work as expected with many attributes defined', function () {
        r = test.cfparser.parse('<cfpop ' +
        'name="cfpop_test3" ' +
        'start_row="6" ' +
        'attachmentPath="/tmp" ' +
        'uid="1234" ' +
        'server="localhost" ' +
        'action="delete" ' +
        'message_number="1234" ' +
        'debug="yes" ' +
        'timeout="90" ' +
        'generate_unique_filenames="yes" ' +
        'password="pass" ' +
        'username="user" ' +
        'port="995" ' +
        'max_rows="3" ' +
        '/>');
        r.attributes.action.should.eql("delete");
        r.attributes.debug.should.be.true;
        r.attributes.attachment_path.should.eql("/tmp");
        r.attributes.generate_unique_filenames.should.eql(true);
        r.attributes.max_rows.should.eql(3);
        r.attributes.message_number.should.eql("1234");
        r.attributes.name.should.eql("cfpop_test3");
        r.attributes.password.should.eql("pass");
        r.attributes.port.should.eql(995);
        r.attributes.server.should.eql("localhost");
        r.attributes.start_row.should.eql(6);
        r.attributes.timeout.should.eql(90);
        r.attributes.uid.should.eql(1234);
        r.attributes.username.should.eql("user");
    });
});
