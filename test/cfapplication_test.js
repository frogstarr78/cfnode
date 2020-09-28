const should = require('should'),
        test = require('./testlib');

describe("Parser parsing a cfapplication tag", function () {
    it("thows an error without a defined name attribute", function () {
        (function () { test.cfparser.parse('<cfapplication datasource="something">') }).should.throw('Missing required "name" attribute.');
    });

    it('should work as expected with few attributes defined', function () {
        r = test.cfparser.parse('<cfapplication name="cfapplication_test1" />');
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication_test1');
        should(r.attributes.datasource).be.undefined;
        should(r.attributes.timeout).be.undefined;
    });

    it('should work as expected with some more attributes defined', function () {
        r = test.cfparser.parse('<cfapplication name="cfapplication-test2" datasource="abc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication-test2');
        r.attributes.datasource.should.eql('abc');
        should(r.attributes.timeout).be.undefined;
    });

    it('should work as expected with still more attributes defined', function () {
        r = test.cfparser.parse('<cfapplication name="cfapplicationtest" datasource="abc" applicationTimeout="">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplicationtest');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
    });

    it('should work as expected with more attributes defined', function () {
        r = test.cfparser.parse('<cfapplication name="cfapplication_test" setclientcookies="no">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication_test');
        r.attributes.client_variables.should.be.false;
        r.attributes.client_storage.should.eql('registry');
        r.attributes.login_storage.should.eql('cookie');
        r.attributes.server_side_form_validation.should.be.true;
        r.attributes.session_management.should.be.false;
        r.attributes.client_cookies.should.be.false;
        r.attributes.domain_cookies.should.be.false;
    });

    it('should work as expected with some other attributes defined', function () {
        r = test.cfparser.parse('<cfapplication name="cfapplication_test" applicationTimeout="" datasource="abc">');
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication_test');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
    });

    it('should work as expected with some different attributes defined', function () {
        r = test.cfparser.parse("<cfapplication\n" +
        "name=\"cfapplication_test\"\n" +
        "applicationTimeout=\"\"\n" + 
        "datasource=\"abc\"\n" + 
        ">");
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication_test');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
    });

    it('should work as expected with some lots of attributes defined', function () {
        r = test.cfparser.parse("<cfapplication\n" +
        "name=\"cfapplication_test\"\n" +
        "applicationTimeout=\"\"\n" + 
        "datasource=\"abc\"\n" + 
        "clientManagement=\"yes\"\n" +
        "clientStorage=\"Cookie\"\n" +
        "loginStorage=\"cookie\"\n" +
        "googleMapKey=\"any\"\n" +
        "scriptProtect=\"all\"\n" +
        "serverSideFormValidation=\"yes\"\n" +
        "sessionManagement=\"yes\"\n" +
        "sessionTimeout=\"\"\n" +
        "secureJSON=\"yes\"\n" +
        "setClientCookies=\"no\"\n" +
        "secureJSONPrefix=\"//\"\n" +
        "setDomainCookies=\"yes\"\n" +
        ">");
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication_test');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
        r.attributes.client_variables.should.be.true;
        r.attributes.login_storage.should.eql('cookie');
        r.attributes.google_map_key.should.eql('any');
        r.attributes.script_protection.should.eql('all');
        r.attributes.server_side_form_validation.should.be.true;
        r.attributes.session_management.should.be.true;
        r.attributes.session_timeout.should.be.instanceof(Date);
        r.attributes.client_cookies.should.be.false;
        r.attributes.domain_cookies.should.be.true;
        r.attributes.secure_json.should.be.true;
        r.attributes.secure_json_prefix.should.eql("//");
    });

    it('should work as expected with lots more attributes defined', function () {
        r = test.cfparser.parse("<cfapplication\n" +
        "applicationTimeout=\"\"\n" + 
        "datasource=\"abc\"\n" + 
        "clientManagement=\"yes\"\n" +
        "secureJSON=\"no\"\n" +
        "name=\"cfapplication-test\"\n" +
        "serverSideFormValidation=\"no\"\n" +
        "loginStorage=\"cookie\"\n" +
        "googleMapKey=\"any\"\n" +
        "clientStorage=\"Cookie\"\n" +
        "scriptProtect=\"all\"\n" +
        "setClientCookies=\"no\"\n" +
        "secureJSONPrefix=\"#\"\n" +
        "sessionManagement=\"yes\"\n" +
        "sessionTimeout=\"\"\n" +
        ">");
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication-test');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
        r.attributes.client_variables.should.be.true;
        r.attributes.login_storage.should.eql('cookie');
        r.attributes.google_map_key.should.eql('any');
        r.attributes.script_protection.should.eql('all');
        r.attributes.server_side_form_validation.should.eql(false);
        r.attributes.secure_json.should.eql(false);
        r.attributes.secure_json_prefix.should.eql("#");
        r.attributes.session_management.should.be.true;
        r.attributes.session_timeout.should.be.instanceof(Date);
        r.attributes.client_cookies.should.eql(false);
        r.attributes.domain_cookies.should.eql(false);
    });

    it('should work as expected with lots of attributes in-caps defined', function () {
        r = test.cfparser.parse("<CFAPPLICATION\n" +
        "APPLICATIONTIMEOUT=\"\"\n" + 
        "DATASOURCE=\"abc\"\n" + 
        "CLIENTMANAGEMENT=\"yes\"\n" +
        "SECUREJSON=\"no\"\n" +
        "NAME=\"cfapplication-test\"\n" +
        "SERVERSIDEFORMVALIDATION=\"no\"\n" +
        "LOGINSTORAGE=\"cookie\"\n" +
        "GOOGLEMAPKEY=\"any\"\n" +
        "CLIENTSTORAGE=\"Cookie\"\n" +
        "SCRIPTPROTECT=\"all\"\n" +
        "SETCLIENTCOOKIES=\"no\"\n" +
        "SECUREJSONPREFIX=\"#\"\n" +
        "SESSIONMANAGEMENT=\"yes\"\n" +
        "SESSIONTIMEOUT=\"\"\n" +
        ">");
        r.should.be.instanceof(Object);
        r.tag.should.eql('application');
        r.attributes.name.should.eql('cfapplication-test');
        r.attributes.datasource.should.eql('abc');
        r.attributes.timeout.should.be.instanceof(Date);
        r.attributes.client_variables.should.be.true;
        r.attributes.login_storage.should.eql('cookie');
        r.attributes.google_map_key.should.eql('any');
        r.attributes.script_protection.should.eql('all');
        r.attributes.server_side_form_validation.should.eql(false);
        r.attributes.secure_json.should.eql(false);
        r.attributes.secure_json_prefix.should.eql("#");
        r.attributes.session_management.should.be.true;
        r.attributes.session_timeout.should.be.instanceof(Date);
        r.attributes.client_cookies.should.eql(false);
        r.attributes.domain_cookies.should.eql(false);
    });
});
