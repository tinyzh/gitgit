define(function(require,exports,module){
	var util = require("./util");
	var helloSeaJs = document.getElementById('hello-seajs');
	var helloSeaJs2 = document.getElementById('hello-seajs2');
	//helloSeaJs.style.color = util.randomColor();
	//helloSeaJs2.style.color = util.randomColor();
	window.setInterval(function(){
		helloSeaJs.style.color = util.randomColor();
		helloSeaJs2.style.color = util.randomColor();
	},100);
});