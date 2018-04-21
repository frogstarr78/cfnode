const test = require('./testlib'),
    should = require('should');

describe("Parsing a cftransaction tag", function() {
    it('woks as expected', function () {
        r = test.cfparser.parse('<cftransaction></cftransaction>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('transaction');
        r.content.should.eql('');
        r.attributes.action.should.eql('begin');
        r.attributes.nested.should.be.true;

        r = test.cfparser.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
        "\n</cftransaction>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('transaction');
        r.content.should.eql("\n");
        r.attributes.action.should.eql('commit');
        r.attributes.nested.should.be.false;
        r.attributes.savepoint.should.eql('transaction_savepoint');
        r.attributes.isolation.should.eql('serializable');

        r = test.cfparser.parse('<cftransaction action="commit" savepoint="transaction_savepoint" isolation="serializable" nested="no">' +
        "\n</cftransaction>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('transaction');
        r.content.should.eql("\n");

        r = test.cfparser.parse('<CFTRANSACTION' +
                ' ACTION="commit"' +
                ' SAVEPOINT="transaction_savepoint"' + 
                ' NESTED="no"' + 
                ' ISOLATION="serializable"' + 
        '>' + 
        "\nThis is the content that is saved #NOW()#" +
        "\n</CFTRANSACTION>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('transaction');
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
        r.attributes.action.should.eql('commit');
        r.attributes.nested.should.be.false;
        r.attributes.savepoint.should.eql('transaction_savepoint');
        r.attributes.isolation.should.eql('serializable');
    })
})
