
public/index.html: views/game.jade
	./node_modules/.bin/pug views/game.jade
	mv views/game.html public/index.html
