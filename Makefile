
public/index.html: views/game.jade
	./node_modules/.bin/jade views/game.jade
	mv views/game.html public/index.html
