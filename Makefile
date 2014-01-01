.PHONY: test
test: cf.js
	for test in test/*_test.js; do echo $$test; node $$test; done

t: test

cf.js: cf.pegjs
	pegjs $?

sync:
	rsync -vr --delete . eclipta:git/cfnode

mount:
	mount /mnt/flash
/mnt/flash/bares: mount
/mnt/flash/bares/cfnode.git: /mnt/flash/bares
	git pull flash master:master
	git push flash master:master
	umount /mnt/flash
