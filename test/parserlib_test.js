var is = require('assert'),
	util = require('util'),
	path = require('path'),
//	human_date = require('date.js'),
	PEG = require('pegjs'),
	cf = require(__dirname + '/../cf'),
	plib = require(__dirname + '/../lib/parselib'),
	testlib = require('./testlib');

// Default object prototype additions
is({key: 'value'}.has_key('key'));
is.equal('abc'.reduce(), 'abc');
is.equal('xyz'.join(), 'xyz');

//String helper functions
is.equal(plib.to_underbar('abc'), 'abc');
is.equal(plib.to_underbar('Abc'), '_abc');
is.equal(plib.to_underbar('aBc'), 'a_bc');
is.equal(plib.to_underbar('abC'), 'ab_c');
is.equal(plib.to_underbar('abCdeFgh'), 'ab_cde_fgh');
is.equal(plib.to_underbar('abCdeFghIjklM'), 'ab_cde_fgh_ijkl_m');

is.equal(plib.to_capitalize('abc'), 'Abc');
is.equal(plib.to_capitalize('ABC'), 'ABC');
is.equal(plib.to_capitalize(' abc'), ' abc');
is.equal(plib.to_capitalize('abCdeFghIjklM'), 'AbCdeFghIjklM');

is.equal(plib.to_camelcase('a_b_c'), 'ABC');
is.equal(plib.to_camelcase('A_B_C'), 'ABC');
is.equal(plib.to_camelcase(' a_bc'), ' aBc');
is.equal(plib.to_camelcase('a_bC_de'), 'ABCDe');
is.equal(plib.to_camelcase('a_BC_de'), 'ABCDe');

is.equal(plib.stringify(['a', '1', '2']), 'a12');
//is.strictEqual(plib.stringify(['a', '1', '2'], 'int'), Number.NaN);
is.equal(plib.stringify(['1', '2']), '12');
is.equal(plib.stringify(['1', '2'], 'int'), 12);
is.equal(plib.stringify(['a', 'b', 'c']), 'abc');
is.equal(plib.stringify(['A', 'B', 'C']), 'ABC');
is.equal(plib.stringify('abc'), 'abc');
is.equal(plib.stringify('ABC'), 'ABC');
is.equal(plib.stringify(['A', 'B', 'C'], 'lower'), 'abc');
is.equal(plib.stringify(['a', 'B', 'C'], 'under'), 'a_b_c');
is.equal(plib.stringify('ABC', 'lower'), 'abc');
is.equal(plib.stringify('aBC', 'under'), 'a_b_c');
is.equal(plib.stringify([' a', ['B'], 'C ', ' ', ' '], 'trim'), 'aBC');
is.equal(plib.stringify([' a', ['B'], ' ', 'C ', ' ', ' '], 'trim'), 'aB C');
is.equal(plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim'), 'aBC');
is.equal(plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim', 'lower'), 'abc');
is.equal(plib.stringify(['a', ['B'], 'C', ' ', ' '], 'trim', 'under'), 'a_b_c');
is.equal(plib.stringify(['a_', ['B'], 'C_', 'd', 'e'], 'camel'), 'ABCDe');
is.equal(plib.stringify(['a_', ['B'], 'C_', ' ', 'e'], 'trim', 'camel'), 'ABC e');
is.equal(plib.stringify(['a', '_', ['b'], 'C_', 'd', 'e'], 'trim', 'camel'), 'ABCDe');
is.equal(plib.stringify(['a', '_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ], 'j'], 'trim', 'camel'), 'ABcDeGhiJ');
is.equal(plib.stringify(['a', ['', ' '], ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], ' ' ]], 'camel'), 'A bcDeGhi ');
is.equal(plib.stringify(['_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ], 'j'], 'trim', 'camel'), 'BcDeGhiJ');
is.equal(plib.stringify(['a', '_', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ]], 'trim', 'camel'), 'ABcDeGhi');
is.equal(plib.stringify(['a', '', ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], '_' ]], 'trim', 'camel'), 'AbcDeGhi');
is.equal(plib.stringify(['a', ['', ' '], ['b'], 'c', '_', 'd', 'e', [['_', 'ghi'], ' ' ]], 'trim', 'camel'), 'A bcDeGhi');
is.equal(plib.stringify(['h', ['t', 't'], ['p'], ':', '/', '/', 'a', [['.', 'com'], '/', '?' ], 'q=y'], 'uri'), 'http://a.com/?q=y');

//Array helper function
is.deepEqual(plib.flatten(['abc']), ['abc']);
is.deepEqual(plib.flatten([['abc', 'def', 'ghi']]), ['abc', 'def', 'ghi']);
is.deepEqual(plib.flatten([['abc', ['def'], 'ghi']]), ['abc', 'def', 'ghi']);
is.deepEqual(plib.flatten([['abc', ['def'], 'ghi', ['jkl']]]), ['abc', 'def', 'ghi', 'jkl']);
is.deepEqual(plib.flatten([['abc', [['d'], ['e'], ['f']], 'ghi']]), ['abc', 'd', 'e', 'f', 'ghi']);
is.deepEqual(plib.flatten([['abc', ['def'], 'ghi', ['jkl'], ['abc', [['d'], ['e'], ['f']], 'ghi']]]), ['abc', 'def', 'ghi', 'jkl', 'abc', 'd', 'e', 'f', 'ghi']);

//Date helper function 
is(plib.mkDate('NOW') instanceof Date);
is(plib.mkDate(new Date()) instanceof Date);
is(plib.mkDate('') instanceof Date);
date = '2014-08-12 00:12:34 PST'
is.deepEqual(plib.mkDate(date), new Date(Date.parse(date)));

//Null/nil helper
is.equal(plib.is_nil(null), true);
is.equal(plib.is_nil(undefined), true);
is.equal(plib.is_nil(''), false);

//String/Array helper
is(plib.is_empty(''));
is(plib.is_empty([]));
is(plib.is_empty(undefined));
is.equal(plib.is_empty("\b"), false);
is.equal(plib.is_empty(' '), false);
is.equal(plib.is_empty(['a']), false);

testlib.die("Success!", 0);
