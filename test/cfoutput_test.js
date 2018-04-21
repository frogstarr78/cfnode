const test = require('./testlib'),
    should = require('should');

describe("Parsing a cfoutput tag", function() {
    it('works as expected', function () {
        r = test.cfparser.parse('<cfoutput ></cfoutput>');
        r.should.be.instanceof(Object);
        r.tag.should.eql('output');
        r.content.should.eql('');

        r = test.cfparser.parse('<cfoutput query="output">' +
        "\n</cfoutput>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('output');
        r.attributes.query.should.eql("output");
        r.attributes.start_row.should.eql(1);
        r.attributes.max_rows.should.eql(-1);
        r.attributes.group_case_sensitive.should.be.true;
        r.content.should.eql("\n");

        r = test.cfparser.parse('<cfoutput query="output">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</cfoutput>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('output');
        r.attributes.query.should.eql('output');
        r.attributes.start_row.should.eql(1);
        r.attributes.max_rows.should.eql(-1);
        r.attributes.group_case_sensitive.should.be.true;
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");

        r = test.cfparser.parse('<cfoutput query="output" startRow="2" maxRows="10" group="id" groupCaseSensitive="no">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</cfoutput>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('output');
        r.attributes.query.should.eql('output');
        r.attributes.start_row.should.eql(2);
        r.attributes.max_rows.should.eql(10);
        r.attributes.group.should.eql('id');
        r.attributes.group_case_sensitive.should.be.false;
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");

        r = test.cfparser.parse('<CFOUTPUT QUERY="output2" STARTROW="2" MAXROWS="10" GROUP="id" GROUPCASESENSITIVE="no">' +
        "\nThis is the content that is saved #NOW()#" +
        "\n</CFOUTPUT>");
        r.should.be.instanceof(Object);
        r.tag.should.eql('output');
        r.attributes.query.should.eql('output2');
        r.attributes.start_row.should.eql(2);
        r.attributes.max_rows.should.eql(10);
        r.attributes.group.should.eql('id');
        r.attributes.group_case_sensitive.should.be.false;
        r.content.should.eql("\nThis is the content that is saved #NOW()#\n");
    });
});
