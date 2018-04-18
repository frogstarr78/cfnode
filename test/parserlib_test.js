const is = require('assert'),
  should = require('should'),
    plib = require(__dirname + '/../lib/parselib');

describe("ParseLib adds functionality", function () {
    describe("Hash'es have has_key method", function () {
        it("{key: 'value'}.has_key('key') is true", function () {
            is({key: 'value'}.has_key('key'));
        });
    });

    describe('Strings', function() {
        describe('have a reduce method', function () {
            it("'value'.reduce() is 'value'", function () {
                'value'.reduce().should.eql('value');
            });

        describe("have a join method", function () {
            it("'value'.join() is 'value'", function () {
                'value'.join().should.eql('value');
            });
        });

        describe("helper functions", function () {
          describe("to_underbar", function () {
            it("does what we'd expect", function () {
              plib.to_underbar('abc').should.equal('abc');
              plib.to_underbar('Abc').should.equal('_abc');
              plib.to_underbar('aBc').should.equal('a_bc');
              plib.to_underbar('abC').should.equal('ab_c');
              plib.to_underbar('abCdeFgh').should.equal('ab_cde_fgh');
              plib.to_underbar('abCdeFghIjklM').should.equal('ab_cde_fgh_ijkl_m');
              plib.to_underbar('ABCDEFGHIJKLM').should.equal('_a_b_c_d_e_f_g_h_i_j_k_l_m');
            });
          });

          describe("to_capitalize", function () {
            it("does what we'd expect", function () {
              plib.to_capitalize('abc').should.equal('Abc');
              plib.to_capitalize('ABC').should.equal('ABC');
              plib.to_capitalize(' abc').should.equal(' abc');
              plib.to_capitalize('abCdeFghIjklM').should.equal('AbCdeFghIjklM');
            });
          });

          describe("to_camelcase", function () {
            it("does what we'd expect", function () {
              plib.to_camelcase('a_b_c').should.equal('ABC');
              plib.to_camelcase('A_B_C').should.equal('ABC');
              plib.to_camelcase(' a_bc').should.equal(' aBc');
              plib.to_camelcase('a_bC_de').should.equal('ABCDe');
              plib.to_camelcase('a_BC_de').should.equal('ABCDe');
            });
          });

          describe("stringify", function () {
            it("creates a string from an array", function () {
              plib.stringify(['a', '1', '2']).should.equal('a12');
              //is.strictEqual(plib.stringify(['a', '1', '2'], 'int'), Number.NaN);
              plib.stringify(['1', '2']).should.equal('12');
              plib.stringify(['1', '2'], 'int').should.equal(12);
              plib.stringify(['a', 'b', 'c']).should.equal('abc');
              plib.stringify(['A', 'B', 'C']).should.equal('ABC');
              plib.stringify('abc').should.equal('abc');
              plib.stringify('ABC').should.equal('ABC');
              plib.stringify(['A', 'B', 'C'], 'lower').should.equal('abc');
              plib.stringify(['a', 'B', 'C'], 'under').should.equal('a_b_c');
              plib.stringify('ABC', 'lower').should.equal('abc');
              plib.stringify('aBC', 'under').should.equal('a_b_c');
              plib.stringify([' a', ['B'], 'C ', ' ', ' '], 'trim').should.equal('aBC');
              plib.stringify([' a', ['B'], ' ', 'C ', ' ', ' '], 'trim').should.equal('aB C');
              plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim').should.equal('aBC');
              plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim', 'lower').should.equal('abc');
              plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim', 'under').should.equal('a_b_c');
              plib.stringify(['a_', ['B'], 'C_', 'd', 'e'], 'camel').should.equal('ABCDe');
              plib.stringify(['a_', ['B'], 'C_', ' ', 'e'], 'trim', 'camel').should.equal('ABC e');
              plib.stringify(['a', '_', ['b'], 'C_', 'd', 'e'], 'trim', 'camel').should.equal('ABCDe');
              plib.stringify(['a', '_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ], 'j'], 'trim', 'camel').should.equal('ABcDeGhiJ');
              plib.stringify(['a', ['', ' '], ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], ' ' ]], 'camel').should.equal('A bcDeGhi ');
              plib.stringify(['_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ], 'j'], 'trim', 'camel').should.equal('BcDeGhiJ');
              plib.stringify(['a', '_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ]], 'trim', 'camel').should.equal('ABcDeGhi');
              plib.stringify(['a', '', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ]], 'trim', 'camel').should.equal('AbcDeGhi');
              plib.stringify(['a', ['', ' '], ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], ' ' ]], 'trim', 'camel').should.equal('A bcDeGhi');
              plib.stringify(['h', ['t', 't'], ['p'], ':', '/', '/', 'a', [['.', 'com'], '/', '?' ], 'q=y'], 'uri').should.equal('http://a.com/?q=y');
              plib.stringify(['a="b",', 'c="d"'], 'object').should.deepEqual({a: 'b', c: 'd'});
              plib.stringify(['a="b"', 'c="d"'], 'object').should.deepEqual({a: 'bc'});
            });
          });

          describe("objectify", function () {
            it("does what you'd expect", function () {
              is.deepEqual(plib.objectify('a="b", c="d"'), {a: 'b', c: 'd'});
            });
          });
        });
      });

      describe("mkDate", function() {
        it("creates a date", function () {
          plib.is_empty('').should.be.true();
          plib.is_empty("\b").should.be.false();
          plib.is_empty(' ').should.be.false();
        });
      });

    });

    describe("Array helper function", function () {
      describe("flatten", function () {
        it("flattens a nested array", function () {
          plib.flatten(['abc']).should.deepEqual(['abc']);
          plib.flatten([['abc', 'def', 'ghi']]).should.deepEqual(['abc', 'def', 'ghi']);
          plib.flatten([['abc', ['def'], 'ghi']]).should.deepEqual(['abc', 'def', 'ghi']);
          plib.flatten([['abc', ['def'], 'ghi', ['jkl']]]).should.deepEqual(['abc', 'def', 'ghi', 'jkl']);
          plib.flatten([['abc', [['d'], ['e'], ['f']], 'ghi']]).should.deepEqual(['abc', 'd', 'e', 'f', 'ghi']);
          plib.flatten([['abc', ['def'], 'ghi', ['jkl'], ['abc', [['d'], ['e'], ['f']], 'ghi']]]).should.deepEqual(['abc', 'def', 'ghi', 'jkl', 'abc', 'd', 'e', 'f', 'ghi']);
          plib.flatten([['abc', ['def'], 'ghi', ['jkl'], ['abc', [['d'], ['e'], ['f']], 'ghi']]]).should.deepEqual(['abc', 'def', 'ghi', 'jkl', 'abc', 'd', 'e', 'f', 'ghi']);
        });
      });

      describe("denullify", function () {
        it("removes empty values", function () {
          plib.flatten([ null, { name: 'value', value: '#cfcase_test#' }, null ], true).should.deepEqual([{ name: 'value', value: '#cfcase_test#' }]);
          plib.denullify([ null, { name: 'value', value: '#cfcase_test#' }, null ]).should.deepEqual([{ name: 'value', value: '#cfcase_test#' }]);
        });
      });

      describe("mkDate", function() {
        it("creates a date", function () {
          plib.is_empty([]).should.be.true();
          plib.is_empty(undefined).should.be.true();
          plib.is_empty(['a']).should.be.false();
        });
      });
    });

    describe("Date helper function", function () {
      describe("mkDate", function() {
        it("creates a date", function () {
          plib.mkDate('NOW').should.be.instanceof(Date);
          plib.mkDate(new Date()).should.be.instanceof(Date);
          plib.mkDate('').should.be.instanceof(Date);
          plib.mkDate([]).should.be.instanceof(Date);
          plib.mkDate({}).should.be.instanceof(Date);
          date = '2014-08-12 00:12:34 PST'
          plib.mkDate(date).should.deepEqual(new Date(Date.parse(date)));
        });
      });
    });

    describe("is_missing", function () {
        it('should work as expected', function () {
            should(plib.is_missing(undefined)).should.be.true;
            should(plib.is_missing(null)).should.be.true;
            should(plib.is_missing('')).should.not.be.true;
            should(plib.is_missing([])).should.not.be.true;
            should(plib.is_missing({})).should.not.be.true;
            should(plib.is_missing(0)).should.not.be.true;
        });
    });
});
