const should = require('should'),
  human_date = require('date.js'),
	    test = require('./testlib');

describe('Parsing the cfcookie tag', function () {
    it('thows an error with a required name attribute', function () {
        (function () { test.cfparser.parse('<cfcookie secure="no" />'); }).should.throw('Missing required "name" attribute.');
    });

    it('works as expected with more attributes defined', function () {
        (function () { test.cfparser.parse('<cfcookie path="/path/here" name="cfcookietest">'); })
            .should.throw("Missing domain value, required with path attribute.");
    });

    it('works as expected with few attributes defined', function () {
        r = test.cfparser.parse('<cfcookie name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
    });

    it('works as expected with more attributes defined', function () {
        r = test.cfparser.parse('<cfcookie name="cfcookietest" domain=".example.com">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        r.attributes.domain.should.eql('.example.com');
    });

    it('works as expected with more attributes defined', function () {
        r = test.cfparser.parse('<cfcookie domain=".example.com" name="cfcookietest" secure="no">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        r.attributes.domain.should.eql('.example.com');
        r.attributes.secure.should.eql(false);
        r.attributes.expires.should.eql('session');
    });

    it('works as expected with lots of attributes defined', function () {
        r = test.cfparser.parse('<cfcookie path="/path/here" domain=".example.com" value="hello test" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        r.attributes.path.should.eql('/path/here');
        r.attributes.domain.should.eql('.example.com');
        r.attributes.value.should.eql('hello test');
    });

    it('works as expected with "now" value defined for expires attribute', function () {
        r = test.cfparser.parse('<cfcookie expires="now" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        test.equalDate(r.attributes.expires.should.eql(new Date()));
    });

    it('works as expected with "never" value defined for expires attribute', function () {
        r = test.cfparser.parse('<cfcookie expires="never" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        test.equalDate(r.attributes.expires.should.eql(human_date('in 30 years')));
    });

    it('works as expected with a date value defined for expires attribute', function () {
        r = test.cfparser.parse('<cfcookie expires="2013-01-01" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        r.attributes.expires.should.eql(new Date(2013, 0, 01));
        //test.equalDate(r.attributes.expires.should.eql(new Date(2013, 0, 01));
    });

    it('works as expected with a date and time value defined for expires attribute', function () {
        r = test.cfparser.parse('<cfcookie expires="2013-01-01 12:34:56" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        test.equalTime(r.attributes.expires.should.eql(new Date(2013, 01, 01, 12, 34, 56)));
    });

    it('works as expected with a number value defined for expires attribute', function () {
        r = test.cfparser.parse('<cfcookie expires="5" name="cfcookietest">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        test.equalDate(r.attributes.expires.should.eql(human_date('in 5 days')));
    });

    it('works as expected with every concievable attribute defined', function () {
        r = test.cfparser.parse('<cfcookie name="cfcookietest" domain=".example.com" expires="now" httponly="yes" path="/" secure="no" value="abc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest');
        r.attributes.domain.should.eql('.example.com');
        test.equalDate(r.attributes.expires.should.eql(new Date()));
        r.attributes.http_only.should.eql(true);
        r.attributes.path.should.eql('/');
        r.attributes.secure.should.eql(false);
        r.attributes.value.should.eql('abc');
    });

    it('works as expected with every concievable attribute defined all in caps', function () {
        r = test.cfparser.parse('<CFCOOKIE NAME="cfcookietest2" DOMAIN=".example.com" EXPIRES="now" HTTPONLY="yes" PATH="/" SECURE="no" VALUE="abc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('cookie');
        r.attributes.name.should.eql('cfcookietest2');
        r.attributes.domain.should.eql('.example.com');
        test.equalDate(r.attributes.expires.should.eql(new Date()));
        r.attributes.http_only.should.eql(true);
        r.attributes.path.should.eql('/');
        r.attributes.secure.should.eql(false);
        r.attributes.value.should.eql('abc');
    });
});
