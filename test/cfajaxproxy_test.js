const should = require('assert'), test = require('./testlib');

describe("Parser parsing a cfajaxproxy tag", function () {
  describe("should error without...", function () {
    it("...any required attributes", function () {
    	test.cfparser.parse('<cfajaxproxy >').throws("Missing required bind or cfc attribute");
    });
    
    it("...a bind or cfc required attributes", function () {
    	test.cfparser.parse('<cfajaxproxy on_success="ajaxproxy_success" on_error="ajaxProxy_error" />').throws("Missing required bind or cfc attribute.");
    });
    
    it("...conflicting attributes", function () {
    	test.cfparser.parse('<cfajaxproxy bind="ajaxproxybind" cfc="ajaxproxycfc">').throws("Invalid attributes. Cannot define both bind and cfc attributes simultaneously.");
    });
    
    it("...an empty bind required attributes", function () {
    	test.cfparser.parse('<cfajaxproxy bind="">').throws("Empty bind attribute value.");
    });
    
    it("...an empty cfc required attributes", function () {
    	test.cfparser.parse('<cfajaxproxy cfc="">').throws("Empty cfc attribute value");
    });
  });
    
  describe("should do what we'd expect with...", function () {
    it("minimal attributes for a cfc (setting expected defaults)", function () {
      r = test.cfparser.parse("<cfajaxproxy cfc='ajaxproxy_cfc' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      r.attributes.cfc.should.equal('ajaxproxy_cfc');
      should(r.attributes.bind).be.undefined;
      r.attributes.js_class_name.should.equal('ajaxproxy_cfc');
    });
      
    it("some additional cfc attributes", function () {
      r = test.cfparser.parse("<cfajaxproxy cfc='ajaxproxy_cfc' jsClassName='ajaxproxy_js_class' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      r.attributes.cfc.should.equal('ajaxproxy_cfc');
      should(r.attributes.bind).be.undefined;
      r.attributes.js_class_name.should.equal('ajaxproxy_js_class');
    });
      
    it("some additional cfc attributes (which are all uppercase)", function () {
      r = test.cfparser.parse("<CFAJAXPROXY CFC='ajaxproxy_cfc2' JSCLASSNAME='ajaxproxy_js_class2'>");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      r.attributes.cfc.should.equal('ajaxproxy_cfc2');
      should(r.attributes.bind).be.undefined;
      r.attributes.js_class_name.should.equal('ajaxproxy_js_class2');
    });
      
    it("minimal attributes for a bind (setting expected defaults)", function () {
      r = test.cfparser.parse("<cfajaxproxy bind='ajaxproxy_bind' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      should(r.attributes.cfc).be.undefined;
      r.attributes.bind.should.equal('ajaxproxy_bind');
    });
      
    it("some additional bind attributes", function () {
      r = test.cfparser.parse("<cfajaxproxy bind='ajaxproxy_bind' onError='showError' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      should(r.attributes.cfc).be.undefined;
      r.attributes.bind.should.equal('ajaxproxy_bind');
      r.attributes.on_error.should.equal('showError');
    });
      
    it("some additional, additional bind attributes", function () {
      r = test.cfparser.parse('<cfajaxproxy bind="ajaxproxy_bind" onError="showError" onSuccess="successFunc" />');
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      should(r.attributes.cfc).be.undefined;
      r.attributes.bind.should.equal('ajaxproxy_bind');
      r.attributes.on_error.should.equal('showError');
      r.attributes.on_success.should.equal('successFunc');
    });
      
    it("some additional bind attributes (which are all uppercase)", function () {
      r = test.cfparser.parse("<CFAJAXPROXY BIND='ajaxproxy_bind2' ONERROR='showError2' ONSUCCESS='successFunc2' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      should(r.attributes.cfc).be.undefined;
      r.attributes.bind.should.equal('ajaxproxy_bind2');
      r.attributes.on_error.should.equal('showError2');
      r.attributes.on_success.should.equal('successFunc2');
    });
      
    it("some additional bind attributes and inline onsuccess, albeit trivial, code", function () {
      r = test.cfparser.parse("<cfajaxproxy bind='ajaxproxy_bind3' onError='showError3' onSuccess='function (rval) { console.log(rval); }' />");
      r.should.be.instanceof(Object);
      r.tag.should.equal('ajaxproxy');
      should(r.attributes.cfc).be.undefined;
      r.attributes.bind.should.equal('ajaxproxy_bind3');
      r.attributes.on_error.should.equal('showError3');
      r.attributes.on_success.should.equal('function (rval) { console.log(rval); }');
    });
  });
});
