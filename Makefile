.PHONY: test
test: cf.js test/*_test.js
	$(foreach test,$(wildcard test/*_test.js),echo $(test) && node $(test);)

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
