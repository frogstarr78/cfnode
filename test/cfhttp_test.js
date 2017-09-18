const is = require('assert'), test = require('./testlib');

var r;

is.equal = is.deepEqual;
is.throws(function () {
	r = test.cfparser.parse('<cfhttp charset="us-ascii"></cfhttp>');
}, Error, 'Missing required attributes');

is.throws(function () {
	r = test.cfparser.parse('<cfhttp url="nfs://example.com"></cfhttp>');
}, Error, 'Unknown port');

r = test.cfparser.parse('<cfhttp url="http://example.com"></cfhttp>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'http');
is.equal(r.content, '');
is.equal(r.attributes.url, 'http://example.com/');
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.get_as_binary, false);
is.equal(r.attributes.method, 'GET');
is.equal(r.attributes.port, 80);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.redirect, true);
is.equal(r.attributes.resolve_url, false);
is.equal(r.attributes.throw_on_error, false);
is.equal(r.attributes.user_agent, 'ColdFusion');
is.equal(r.attributes.multipart, false);
is.equal(r.attributes.multipart_type, 'form-data');

r = test.cfparser.parse('<cfhttp url="https://example.com"></cfhttp>');
is.equal(r instanceof Object, true);
is.equal(r.tag, 'http');
is.equal(r.content, '');
is.equal(r.attributes.url, 'https://example.com/');
is.equal(r.attributes.charset, 'utf-8');
is.equal(r.attributes.get_as_binary, false);
is.equal(r.attributes.method, 'GET');
is.equal(r.attributes.port, 443);
is.equal(r.attributes.proxy_port, 80);
is.equal(r.attributes.redirect, true);
is.equal(r.attributes.resolve_url, false);
is.equal(r.attributes.throw_on_error, false);
is.equal(r.attributes.user_agent, 'ColdFusion');
is.equal(r.attributes.multipart, false);
is.equal(r.attributes.multipart_type, 'form-data');

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'http');
is.equal(r.content, "\nTest stuff");
is.equal(r.attributes.url, 'https://example.com/');
is.equal(r.attributes.charset, 'us-ascii');
is.equal(r.attributes.get_as_binary, true);
is.equal(r.attributes.method, 'post');
is.equal(r.attributes.port, 9443);
is.equal(r.attributes.proxy_port, 8080);
is.equal(r.attributes.redirect, false);
is.equal(r.attributes.resolve_url, true);
is.equal(r.attributes.throw_on_error, true);
is.equal(r.attributes.user_agent, 'ColdFusion;CFNode');
is.equal(r.attributes.multipart, true);
is.equal(r.attributes.multipart_type, 'related');

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
is.equal(r instanceof Object, true);
is.equal(r.tag, 'http');
is.equal(r.content, "\nTest stuff");
is.equal(r.attributes.charset, 'iso-8859-1');
is.equal(r.attributes.client_cert, '/path/to/cert.crt');
is.equal(r.attributes.client_cert_password, 'pass');
is.equal(r.attributes.compression, 'none');
is.equal(r.attributes.get_as_binary, true);
is.equal(r.attributes.method, 'trace');
is.equal(r.attributes.multipart, true);
is.equal(r.attributes.multipart_type, 'related');
is.equal(r.attributes.password, 'pass2');
is.equal(r.attributes.port, 123);
is.equal(r.attributes.proxy_server, 'serv.example.com');
is.equal(r.attributes.proxy_port, 321);
is.equal(r.attributes.proxy_user, 'pxyusr');
is.equal(r.attributes.proxy_password, 'pxypass');
is.equal(r.attributes.url, 'http://example.info/');
is.equal(r.attributes.redirect, false);
is.equal(r.attributes.resolve_url, true);
is.equal(r.attributes.result, '#cfvar#');
is.equal(r.attributes.throw_on_error, true);
is.equal(r.attributes.timeout, 10);
is.equal(r.attributes.user_agent, 'CFNode');
is.equal(r.attributes.username, 'usr');

test.ok();
