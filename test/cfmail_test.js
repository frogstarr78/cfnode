const test = require('./testlib'),
    should = require('should');

describe("Parsing a cflocation tag", function() {
    it('should thow an error when missing attributes', function () {
        (function () { test.cfparser.parse('<cfmail remove="yes"></cfmail>'); }).should.throw('Missing required "subject" attribute.');
    });

    it('should thow an error when missing required subject attribute', function () {
        (function () { test.cfparser.parse('<cfmail to="me@example.com" from="me@example.com"></cfmail>'); }).should.throw('Missing required "subject" attribute.');
    });

    it('should thow an error when missing required from attribute', function () {
        (function () { test.cfparser.parse('<cfmail to="me@example.com" subject="cfmail test"></cfmail>'); }).should.throw('Missing required "from" attribute.');
    });

    it('should thow an error when missing required to attribute', function () {
        (function () { test.cfparser.parse('<cfmail from="me@example.com" subject="cfmail test"></cfmail>'); }).should.throw('Missing required "to" attribute.');
    });

    it('works as expected', function () {
        r = test.cfparser.parse('<cfmail ' +
        'to="me@example.com" ' +
        'from="you@example.com" ' +
        'subject="cfmail test"' +
        '></cfmail>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mail');
        r.content.should.eql('');
        r.attributes.charset.should.eql('utf-8');
        r.attributes.debug.should.be.false;
        r.attributes.from.should.eql('you@example.com');
        r.attributes.group.should.eql('CurrentRow');
        r.attributes.group_case_sensitive.should.be.false;
        r.attributes.mailer_id.should.eql('ColdFusion Application Server');
        r.attributes.port.should.eql(25);
        r.attributes.priority.should.eql('normal');
        r.attributes.remove.should.be.false;
        r.attributes.start_row.should.eql(1);
        r.attributes.subject.should.eql('cfmail test');
        r.attributes.to.should.eql('me@example.com');
        r.attributes.type.should.eql('text/plain');
        r.attributes.wrap_text.should.eql(80);

        r = test.cfparser.parse('<cfmail ' +
        'debug="yes" ' +
        'group="date" ' +
        'to="me@example.com" ' +
        'group_case_sensitive="yes" ' +
        'charset="us-ascii" ' +
        'from="you@example.com" ' +
        'mailer_id="CFNode Mail Test" ' +
        'wrap_text="30" ' +
        'subject="cfmail test" ' +
        'priority="1" ' +
        'remove="yes" ' +
        'type="text/html" ' +
        ">\nStuff" +
        '</cfmail>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mail');
        r.content.should.eql("\nStuff");
        r.attributes.charset.should.eql('us-ascii');
        r.attributes.debug.should.be.true;
        r.attributes.from.should.eql('you@example.com');
        r.attributes.group.should.eql('date');
        r.attributes.group_case_sensitive.should.be.true;
        r.attributes.mailer_id.should.eql('CFNode Mail Test');
        r.attributes.priority.should.eql('highest');
        r.attributes.port.should.eql(25);
        r.attributes.remove.should.be.true;
        r.attributes.start_row.should.eql(1);
        r.attributes.subject.should.eql('cfmail test');
        r.attributes.to.should.eql('me@example.com');
        r.attributes.type.should.eql('text/html');
        r.attributes.wrap_text.should.eql(30);

        r = test.cfparser.parse('<CFMAIL ' +
        'DEBUG="yes" ' +
        'GROUP="date" ' +
        'CC="other@example.com" ' +
        'BCC="another@example.com" ' +
        'USERNAME="mail_user" ' +
        'USESSL="yes" ' +
        'FAILTO="none@example.com" ' +
        'TO="me@example.com" ' +
        'FROM="you@example.com" ' +
        'SUBJECT="cfmail test" ' +
        'GROUPCASESENSITIVE="yes" ' +
        'CHARSET="us-ascii" ' +
        'KEYALIAS="ks_alias_name" ' +
        'KEYPASSWORD="pk_pass" ' +
        'KEYSTORE="/path/to/ks" ' +
        'REMOVE="yes" ' +
        'SERVER="mail.example.com" ' +
        'KEYSTOREPASSWORD="ks_pass" ' +
        'MAILERID="CFNode Mail Test2" ' +
        'MAXROWS="2" ' +
        'MIMEATTACH="/path/to/mime/file" ' +
        'PASSWORD="passwd" ' +
        'PORT="587" ' +
        'QUERY="qry" ' +
        'WRAPTEXT="31" ' +
        'REPLYTO="me2@example.org" ' +
        'PRIORITY="2" ' +
        'SIGN="yes" ' +
        'TYPE="text/html" ' +
        'SPOOLENABLE="yes" ' +
        'STARTROW="4" ' +
        'TIMEOUT="4" ' +
        'USETSL="yes" ' +
        ">\nStuff" +
        '</CFMAIL>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('mail');
        r.content.should.eql("\nStuff");
        r.attributes.bcc.should.eql('another@example.com');
        r.attributes.cc.should.eql('other@example.com');
        r.attributes.charset.should.eql('us-ascii');
        r.attributes.debug.should.be.true;
        r.attributes.fail_to.should.eql('none@example.com');
        r.attributes.from.should.eql('you@example.com');
        r.attributes.group.should.eql('date');
        r.attributes.group_case_sensitive.should.be.true;
        r.attributes.key_alias.should.eql('ks_alias_name');
        r.attributes.key_password.should.eql('pk_pass');
        r.attributes.key_store.should.eql('/path/to/ks');
        r.attributes.key_store_password.should.eql('ks_pass');
        r.attributes.mailer_id.should.eql('CFNode Mail Test2');
        r.attributes.max_rows.should.eql(2);
        r.attributes.mime_attach.should.eql('/path/to/mime/file');
        r.attributes.password.should.eql('passwd');
        r.attributes.port.should.eql(587);
        r.attributes.priority.should.eql('high');
        r.attributes.query.should.eql('qry');
        r.attributes.remove.should.be.true;
        r.attributes.reply_to.should.eql('me2@example.org');
        r.attributes.server.should.eql('mail.example.com');
        r.attributes.sign.should.be.true;
        r.attributes.spool_enable.should.be.true;
        r.attributes.start_row.should.eql(4);
        r.attributes.subject.should.eql('cfmail test');
        r.attributes.timeout.should.eql(4);
        r.attributes.to.should.eql('me@example.com');
        r.attributes.type.should.eql('text/html');
        r.attributes.username.should.eql('mail_user');
        r.attributes.use_ssl.should.be.true;
        r.attributes.use_tsl.should.be.true;
        r.attributes.wrap_text.should.eql(31);
    });
});
