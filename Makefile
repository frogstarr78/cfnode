.PHONY: test
test: cf.js test/*_test.js
	ls test/*_test.js | while read t1; read t2; read t3; read t4; read t5; do \
		./bin/ntest $$t1 & \
		./bin/ntest $$t2 & \
		./bin/ntest $$t3 & \
		./bin/ntest $$t4 & \
		./bin/ntest $$t5 & \
	done

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
