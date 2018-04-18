const should = require('should'),
	    test = require('./testlib');

describe('Parsing the cfhttp tag', function () {
	it('should throw an error when missing the required "type" attribute', function () {
		(function () { r = test.cfparser.parse('<cfhttp charset="us-ascii"></cfhttp>'); }).should.throw('Missing required "url" attribute.');
	})

	it('should throw an error when the url attribute is using an unknown protocol', function () {
		(function () { r = test.cfparser.parse('<cfhttp url="nfs://example.com"></cfhttp>'); }).should.throw('Unknown port');
	})

	it('should work as expected', function () {
		r = test.cfparser.parse('<cfhttp url="http://example.com"></cfhttp>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('http');
		r.content.should.eql('');
		r.attributes.url.should.eql('http://example.com/');
		r.attributes.charset.should.eql('utf-8');
		r.attributes.get_as_binary.should.be.false;
		r.attributes.method.should.eql('GET');
		r.attributes.port.should.eql(80);
		r.attributes.proxy_port.should.eql(80);
		r.attributes.redirect.should.be.true;
		r.attributes.resolve_url.should.be.false;
		r.attributes.throw_on_error.should.be.false;
		r.attributes.user_agent.should.eql('ColdFusion');
		r.attributes.multipart.should.be.false;
		r.attributes.multipart_type.should.eql('form-data');

		r = test.cfparser.parse('<cfhttp url="https://example.com"></cfhttp>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('http');
		r.content.should.eql('');
		r.attributes.url.should.eql('https://example.com/');
		r.attributes.charset.should.eql('utf-8');
		r.attributes.get_as_binary.should.be.false;
		r.attributes.method.should.eql('GET');
		r.attributes.port.should.eql(443);
		r.attributes.proxy_port.should.eql(80);
		r.attributes.redirect.should.be.true;
		r.attributes.resolve_url.should.be.false;
		r.attributes.throw_on_error.should.be.false;
		r.attributes.user_agent.should.eql('ColdFusion');
		r.attributes.multipart.should.be.false;
		r.attributes.multipart_type.should.eql('form-data');

		r = test.cfparser.parse('<cfhttp ' +
		'client_cert="/path/to/cert.crt" ' +
		'charset="us-ascii" ' +
		'get_as_binary="yes" ' +
		'multipart="yes" ' +
		'method="POST" ' +
		'client_cert_password="passwd" ' +
		'url="https://example.com" ' +
		'redirect="no" ' +
		'port="9443" ' +
		'multipart_type="related" ' +
		'proxy_port="8080" ' +
		'resolve_url="yes" ' +
		'throw_on_error="yes" ' +
		'user_agent="ColdFusion;CFNode" >' +
		"\nTest stuff" +
		'</cfhttp>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('http');
		r.content.should.eql("\nTest stuff");
		r.attributes.url.should.eql('https://example.com/');
		r.attributes.charset.should.eql('us-ascii');
		r.attributes.get_as_binary.should.be.true;
		r.attributes.method.should.eql('post');
		r.attributes.port.should.eql(9443);
		r.attributes.proxy_port.should.eql(8080);
		r.attributes.redirect.should.be.false;
		r.attributes.resolve_url.should.be.true;
		r.attributes.throw_on_error.should.be.true;
		r.attributes.user_agent.should.eql('ColdFusion;CFNode');
		r.attributes.multipart.should.be.true;
		r.attributes.multipart_type.should.eql('related');

		r = test.cfparser.parse('<CFHTTP ' +
		'CHARSET="iso-8859-1" ' +
		'CLIENTCERT="/path/to/cert.crt" ' +
		'CLIENTCERTPASSWORD="pass" ' +
		'COMPRESSION="none" ' +
		'GETASBINARY="yes" ' +
		'METHOD="TRACE" ' +
		'MULTIPART="yes" ' +
		'MULTIPART_TYPE="related" ' +
		'PASSWORD="pass2" ' +
		'PORT="123" ' +
		'PROXYSERVER="serv.example.com" ' +
		'PROXYPORT="321" ' +
		'PROXYUSER="pxyusr" ' +
		'PROXYPASSWORD="pxypass" ' +
		'URL="http://example.info" ' +
		'REDIRECT="no" ' +
		'RESOLVEURL="yes" ' +
		'RESULT="#cfvar#" ' +
		'THROWON_ERROR="yes" ' +
		'TIMEOUT="10" ' +
		'USERAGENT="CFNode" ' +
		'USERNAME="usr">' +
		"\nTest stuff" +
		'</CFHTTP>');
		r.should.be.instanceof(Object);
		r.tag.should.eql('http');
		r.content.should.eql("\nTest stuff");
		r.attributes.charset.should.eql('iso-8859-1');
		r.attributes.client_cert.should.eql('/path/to/cert.crt');
		r.attributes.client_cert_password.should.eql('pass');
		r.attributes.compression.should.eql('none');
		r.attributes.get_as_binary.should.be.true;
		r.attributes.method.should.eql('trace');
		r.attributes.multipart.should.be.true;
		r.attributes.multipart_type.should.eql('related');
		r.attributes.password.should.eql('pass2');
		r.attributes.port.should.eql(123);
		r.attributes.proxy_server.should.eql('serv.example.com');
		r.attributes.proxy_port.should.eql(321);
		r.attributes.proxy_user.should.eql('pxyusr');
		r.attributes.proxy_password.should.eql('pxypass');
		r.attributes.url.should.eql('http://example.info/');
		r.attributes.redirect.should.be.false;
		r.attributes.resolve_url.should.be.true;
		r.attributes.result.should.eql('#cfvar#');
		r.attributes.throw_on_error.should.be.true;
		r.attributes.timeout.should.eql(10);
		r.attributes.user_agent.should.eql('CFNode');
		r.attributes.username.should.eql('usr');
	});
});
