.PHONY: test
test: lib/cf.js test/*_test.js
ifdef file
	./bin/ntest $(file)
else
	./bin/ntest test/*_test.js
endif

t: test

clean: lib/cf.js
	rm lib/cf.js

lib/cf.js: lib/cf.pegjs
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

doc: doc/cf9/coldfusion_9_cfmlref.pdf
	mupdf $^ &

