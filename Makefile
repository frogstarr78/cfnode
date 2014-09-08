.PHONY: test
test: cf.js test/*_test.js
	$(foreach test,$(wildcard test/*_test.js),node $(test) | tr "\n" ' '; basename $(test);)

t: test

clean: cf.js
	rm cf.js

cf.js: cf.pegjs
	pegjs --track-line-and-column $? $@

sync:
	rsync -vr --delete . eclipta:git/cfnode

mount:
	mount /mnt/flash
/mnt/flash/bares: mount
/mnt/flash/bares/cfnode.git: /mnt/flash/bares
	git pull flash master:master
	git push flash master:master
	umount /mnt/flash
