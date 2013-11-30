.PHONY: test
test: cf.js
	node test/*_test.js

cf.js: cf.pegjs
	pegjs $?
