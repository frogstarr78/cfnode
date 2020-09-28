const test = require('./testlib'),
	should = require('should');

describe("Parsing a cfftp tag ", function() {
    describe("parsing a connection operation", function () {
        it('thows errors when missing required attributes', function () {
            (function () { test.cfparser.parse('<cfftp />') }).should.throw('Expected " ", "\\n", "\\t", \[aA\], \[bB\], \[cC\], \[dD\], \[eE\], \[fF\], \[iI\], \[kK\], \[lL\], \[nN\], \[pP\], \[rR\], \[sS\], \[tT\], or \[uU\] but "\/" found.');
        });

        it('thows errors when missing the required connection attribute', function () {
            (function () { test.cfparser.parse('<cfftp action="open" server="localhost" username="user" password="pass" />') }).should.throw('Missing required "connection" attribute.');
        });

        it('thows errors when missing the required password attribute', function () {
            (function () { test.cfparser.parse('<cfftp action="open" server="localhost" username="user" connection="conn" />') }).should.throw('Missing required "password" attribute.');
        });

        it('thows errors when missing the required server attribute', function () {
            (function () { test.cfparser.parse('<cfftp action="open" password="pass" username="user" connection="conn" />') })
                .should.throw('Missing required "server" attribute.');
        });

        it('thows errors when missing the required username attribute', function () {
            (function () { test.cfparser.parse('<cfftp action="open" server="localhost" password="pass" connection="conn" />') })
                .should.throw('Missing required "username" attribute.');
        });

        it('thows error when missing key or password attributes', function () {
            (function () { test.cfparser.parse('<cfftp action="open" secure="yes" server="localhost" username="user" connection="conn"/>') })
                .should.throw('Missing required "password" attribute.');
        });

        it('thows an error when the there is a passphrase but no key', function () {
            (function () { test.cfparser.parse('<cfftp action="open" secure="yes" server="localhost" username="user" password="pass" passphrase="passph" connection="conn"/>') })
                .should.throw('Unexpected passphrase used with no key attribute specified.');
        });

        it('thows an error when missing the connection attribute', function () {
            (function () { test.cfparser.parse('<cfftp action="close" />') })
                .should.throw('Missing required "connection" attribute.');
        });

        it('thows an error when the buffer_size is used with the "close" action', function () {
            (function () { test.cfparser.parse('<cfftp action="close" buffer_size="8" connection="conn"/>') })
                .should.throw('Unexpected buffer_size used with action == "close" attribute.');
        });

        it('thows an error when the action_param attribute is specified with the "close" action', function () {
            (function () { test.cfparser.parse('<cfftp action="close" action_param="user" connection="conn"/>') })
                .should.throw('Unexpected action_param used with action == "close" attribute.');
        });

        it('thows an error when the secure attribute is specified for the "quote" action', function () {
            (function () { test.cfparser.parse('<cfftp action="quote" action_param="user" secure="true" />') })
                .should.throw('Unexpected secure connection used with action == "quote" attribute.');
        });

        it('works as expected', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="open" ' +
            'secure="yes" ' +
            'server="localhost" ' +
            'username="user" ' +
            'password="pass" ' +
            'connection="myconn" ' +
            '/>');
            r.attributes.action.should.eql('open');
            r.attributes.connection.should.eql('myconn');
            r.attributes.passive.should.eql(false);
            r.attributes.password.should.eql('pass');
            r.attributes.server.should.eql('localhost');
            r.attributes.secure.should.eql(true);
            r.attributes.username.should.eql('user');
        });

        it('works as expected with other attributes', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="open" ' +
            'secure="yes" ' +
            'server="localhost" ' +
            'username="user" ' +
            'key="ssh-rsa" ' +
            'password="stuff" ' +
            'connection="myconn" ' +
            '/>');
            r.attributes.action.should.eql('open');
            r.attributes.connection.should.eql('myconn');
            r.attributes.key.should.eql('ssh-rsa');
            r.attributes.passive.should.eql(false);
            r.attributes.password.should.eql('stuff');
            r.attributes.server.should.eql('localhost');
            r.attributes.secure.should.eql(true);
            r.attributes.username.should.eql('user');
        });

        it('works as expected with other attributes', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="open" ' +
            'server="localhost" ' +
            'username="user" ' +
            'password="pass" ' +
            'connection="myconn" ' +
            '/>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('ftp');
            r.attributes.action.should.eql('open');
            r.attributes.connection.should.eql('myconn');
            r.attributes.passive.should.eql(false);
            r.attributes.password.should.eql('pass');
            r.attributes.port.should.eql(21);
            r.attributes.retry_count.should.eql(1);
            r.attributes.server.should.eql('localhost');
            r.attributes.stop_on_error.should.eql(true);
            r.attributes.timeout.should.eql(30);
            r.attributes.username.should.eql('user');
        });

        it('works as expected with the close action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="close" ' +
            'connection="myconn2" ' +
            '/>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('ftp');
            r.attributes.action.should.eql('close');
            r.attributes.connection.should.eql('myconn2');
        });

        it('works as expected with the open action', function () {
            r = test.cfparser.parse('<cfftp ' + 
            'stop_on_error="no" ' + 
            'action="open" ' + 
            'server="localhost" ' + 
            'retryCount="5" ' + 
            'username="user" ' + 
            'port="990" ' + 
            'timeout="90" ' + 
            'password="pass" ' + 
            'passive="yes" ' + 
            'connection="myconn3" ' + 
            '/>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('ftp');
            r.attributes.action.should.eql('open');
            r.attributes.connection.should.eql('myconn3');
            r.attributes.passive.should.eql(true);
            r.attributes.password.should.eql('pass');
            r.attributes.port.should.eql(990);
            r.attributes.retry_count.should.eql(5);
            r.attributes.server.should.eql('localhost');
            r.attributes.stop_on_error.should.eql(false);
            r.attributes.timeout.should.eql(90);
            r.attributes.username.should.eql('user');
        });

        it('works as expected with the acct action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="acct" ' +
            'action_param="user" ' +
            'buffer_size="12" ' +
            'connection="conn4" ' +
            'port="990" ' +
            'proxy_server="localhost" ' +
            'proxy_port="90" ' +
            'proxy_user="puser" ' +
            'proxy_password="ppass" ' +
            'retry_count="10" ' +
            'server="localhost" ' +
            'stop_on_error="false" ' +
            'timeout="31" ' +
            '/>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('ftp');
            r.attributes.action.should.eql("acct");
            r.attributes.action_param.should.eql('user');
            r.attributes.buffer_size.should.eql(12);
            r.attributes.connection.should.eql('conn4');
            r.attributes.port.should.eql(990);
            r.attributes.proxy_server.should.eql("localhost");
            r.attributes.proxy_port.should.eql(90);
            r.attributes.proxy_user.should.eql("puser");
            r.attributes.proxy_password.should.eql("ppass");
            r.attributes.retry_count.should.eql(10);
            r.attributes.stop_on_error.should.eql(false);
            r.attributes.timeout.should.eql(31);
        });

        it('works as expected with the open action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="open" ' +
            'buffer_size="11" ' +
            'connection="conn5" ' +
            'fingerprint="01:23:45:57::89:ab:cd:ef" ' +
            'key="/path/to/private.key" ' +
            'passive="true" ' +
            'password="pass" ' +
            'passphrase="key_pass" ' +
            'port="990" ' +
            'proxy_server="example.com" ' +
            'proxy_port="991" ' +
            'proxy_user="puser" ' +
            'proxy_password="ppass" ' +
            'retry_count="13" ' +
            'secure="true" ' +
            'server="localhost" ' +
            'stop_on_error="true" ' +
            'timeout="67" ' +
            'username="user3" ' +
            '/>');
            r.should.be.instanceof(Object);
            r.tag.should.eql('ftp');
            r.attributes.action.should.eql("open");
            r.attributes.buffer_size.should.eql(11);
            r.attributes.connection.should.eql("conn5");
            r.attributes.fingerprint.should.eql("01:23:45:57::89:ab:cd:ef");
            r.attributes.key.should.eql("/path/to/private.key");
            r.attributes.passive.should.eql(true);
            r.attributes.passphrase.should.eql("key_pass");
            r.attributes.password.should.eql("pass");
            r.attributes.port.should.eql(990);
            r.attributes.proxy_password.should.eql("ppass");
            r.attributes.proxy_port.should.eql(991);
            r.attributes.proxy_server.should.eql("example.com");
            r.attributes.proxy_user.should.eql("puser");
            r.attributes.retry_count.should.eql(13);
            r.attributes.secure.should.eql(true);
            r.attributes.server.should.eql("localhost");
            r.attributes.stop_on_error.should.eql(true);
            r.attributes.timeout.should.eql(67);
            r.attributes.username.should.eql("user3");
        });
    });

    describe('parsing file and directory operations', function () {
        it('erors when the required directory attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="changedir" />') }).should.throw('Missing required "directory" attribute.');
        });

        it('erors when the required directory attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="createdir" />') }).should.throw('Missing required "directory" attribute.');
        });

        it('erors when the required directory attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="listDir" name="dirname" />') }).should.throw('Missing required "directory" attribute.');
        });

        it('erors when the required name attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="listDir" directory="dirname" />') }).should.throw('Missing required "name" attribute.');
        });

        it('erors when the required directory attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="exists_dir" />') }).should.throw('Missing required "directory" attribute.');
        });

        it('erors when the required "existing" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="rename" new="newname" />') }).should.throw('Missing required "existing" attribute.');
        });

        it('erors when the required "new" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="rename" existing="oldname" />') }).should.throw('Missing required "new" attribute.');
        });

        it('erors when the required "item" attribute is missing', function () {
          (function () { test.cfparser.parse('<cfftp action="exists" />') }).should.throw('Missing required "item" attribute.');
        });

        it('erors when the required "item" attribute is missing', function () {
          (function () { test.cfparser.parse('<cfftp action="remove"/>') }).should.throw('Missing required "item" attribute.');
        });

        it('erors when the required "local_file" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="getFile" remote_file="remfile" />') }).should.throw('Missing required "local_file" attribute.');
        });

        it('erors when the required "remote_file" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="getFile" local_file="remfile" />') }).should.throw('Missing required "remote_file" attribute.');
        });

        it('erors when the required "local_file" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="put_file">') }).should.throw('Missing required "local_file" attribute.');
        });

        it('erors when the required "remote_file" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="get_file" local_file="remfile" />') }).should.throw('Missing required "remote_file" attribute.');
        });

        it('erors when the required "remote_file" attribute is missing', function () {
            (function () { test.cfparser.parse('<cfftp action="existsFile" />') }).should.throw('Missing required "remote_file" attribute.');
        });

        it('works as expected with the change_dir action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="changeDir" ' +
            'directory="newrmdir" ' +
            '/>');
            r.attributes.action.should.eql('change_dir');
            r.attributes.directory.should.eql('newrmdir');
            r.attributes.ascii_extension_list.should.eql('txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';'));
            r.attributes.fail_if_exists.should.be.true;
            r.attributes.passive.should.be.false;
            r.attributes.timeout.should.eql(30);
            r.attributes.transfer_mode.should.eql('auto');
        });

        it('works as expected with the list_dir action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'action="list_dir" ' +
            'directory="newrmdir2" ' +
            'name="qname" ' +
            '/>');
            r.attributes.action.should.eql('list_dir');
            r.attributes.ascii_extension_list.should.eql('txt;htm;html;cfm;cfml;shtm;shtml;css;asp;asa'.split(';'));
            r.attributes.directory.should.eql('newrmdir2');
            r.attributes.fail_if_exists.should.be.true;
            r.attributes.name.should.eql('qname');
            r.attributes.passive.should.be.false;
            r.attributes.timeout.should.eql(30);
            r.attributes.transfer_mode.should.eql('auto');
        });

        it('works as expected with the rename action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'new="newdirname" ' +
            'proxyPassword="ppass" ' +
            'proxyUser="puser" ' +
            'connection="conn" ' +
            'passive="true" ' +
            'timeout="60" ' +
            'proxyPort="91" ' +
            'fail_if_exists="false" ' +
            'proxyServer="localhost" ' + 
            'action="rename" ' +
            'password="pass" ' +
            'existing="oldrmdir" ' +
            '/>');
            r.attributes.action.should.eql('rename');
            r.attributes.connection.should.eql('conn');
            r.attributes.existing.should.eql('oldrmdir');
            r.attributes.fail_if_exists.should.eql(false);
            r.attributes.new.should.eql('newdirname');
            r.attributes.passive.should.eql(true);
            r.attributes.proxy_password.should.eql('ppass');
            r.attributes.proxy_port.should.eql(91);
            r.attributes.proxy_server.should.eql('localhost');
            r.attributes.proxy_user.should.eql('puser');
            r.attributes.timeout.should.eql(60);
        });

        it('works as expected with the put_file action', function () {
            r = test.cfparser.parse('<cfftp ' +
            'new="newdirname" ' +
            'proxyPassword="ppass" ' +
            'transfer_mode="ascii" ' +
            'proxyUser="puser" ' +
            'connection="conn" ' +
            'ascii_extension_list="txt;htm;html;php" ' +
            'local_file="localfile" ' +
            'remote_file="remotefile" ' +
            'passive="true" ' +
            'timeout="60" ' +
            'proxyPort="91" ' +
            'fail_if_exists="false" ' +
            'proxyServer="localhost" ' + 
            'action="put_file" ' +
            'password="pass" ' +
            'existing="oldrmdir" ' +
            '/>');
            r.attributes.action.should.eql('put_file');
            r.attributes.ascii_extension_list.should.eql('txt;htm;html;php'.split(';'));
            r.attributes.connection.should.eql('conn');
            r.attributes.existing.should.eql('oldrmdir');
            r.attributes.fail_if_exists.should.eql(false);
            r.attributes.new.should.eql('newdirname');
            r.attributes.passive.should.eql(true);
            r.attributes.proxy_password.should.eql('ppass');
            r.attributes.proxy_port.should.eql(91);
            r.attributes.proxy_server.should.eql('localhost');
            r.attributes.proxy_user.should.eql('puser');
            r.attributes.timeout.should.eql(60);
            r.attributes.transfer_mode.should.eql('ascii');
        });
    });
});
