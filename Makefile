.PHONY: test
test: cf.js
	for test in test/*_test.js; do echo $$test; node $$test; done

t: test

cf.js: cf.pegjs
	pegjs $?

sync:
	rsync -vr --delete . eclipta:git/cfnode
