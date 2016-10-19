.PHONY: test
test: cf.js test/*_test.js
ifdef file
	./bin/ntest $(file)
else
	./bin/ntest test/*_test.js
endif

t: test

clean: cf.js
	rm cf.js

cf.js: cf.pegjs
	./node_modules/pegjs/bin/pegjs $?

sync:
	rsync -vr --delete . eclipta:git/cfnode

mount:
	mount /mnt/flash
/mnt/flash/bares: mount
/mnt/flash/bares/cfnode.git: /mnt/flash/bares
	git pull flash master:master
	git push flash master:master
	umount /mnt/flash
