var throughTheWire = function() {

	// tasks:

	// get every .box with correct class .dynamic-box
	// create a new class name
	// create styles for each class
		// initially numbers with 0-255
	// apply styles to each original .dynamic-box
	// apply style to bottom of head
	// voila

	var settings = {
		defaultClass: '.box--random',
		classes: [],
	};

	var domCache = {

	};

	var init = function() {
		// get all the random boxes and assign them to domcache
		domCache.boxes = document.querySelectorAll('.box--random');
		domCache.style = document.createElement('style');
		_run();
	};

	var _run = function() {
		_createClasses();
		// _createClassNames();
		_createPoints();
		_joinPoints();
		_addHeadStyle();
		_addDomClasses();
		console.log(settings);
	};

	var _createClasses = function() {
		
		for (var i = 0; i < domCache.boxes.length; i++) {
			var newClass = {};
			newClass.name = 'box--random-' + i;
			settings.classes.push(newClass);
			
		}
		console.log(settings);
	};

	var _createClassNames = function() {
		settings.classNames = [];
		for (var i = 0; i < settings.classes.length; i++) {
			settings.classes.class[i].classNames.push(settings.defaultClass + i);
		}
	};

	var _createPoints = function() {
		var style = 'border-radius';
		var tempArray = [];
		for (var i = 0; i < settings.classes.length; i++) {
			settings.classes[i].classPoints = [];
			for (var x = 0; x < 8; x++) {
				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
				var randomNumber = Math.random() * (255 - 0) + 0;
				settings.classes[i].classPoints.push(randomNumber.toFixed(0) + 'px');
			}

		}
	};

	var _joinPoints = function() {
		for (var i = 0; i < settings.classes.length; i++) {
			var leftChunk = settings.classes[i].classPoints.slice(0, 4);
			var rightChunk = settings.classes[i].classPoints.slice(4, 8);
			settings.classes[i].borderRadius = leftChunk.join(' ') + '/' + rightChunk.join(' ');
		}
	};

	var _addHeadStyle = function() {
		for (var i = 0; i < settings.classes.length; i++) {
			domCache.style.innerHTML = domCache.style.innerHTML + '.' +settings.classes[i].name + '{' + 'border-radius: ' + settings.classes[i].borderRadius + ';} ';
		}
		document.head.appendChild(domCache.style);
	};

	var _addDomClasses = function() {
		for (var i = 0; i < settings.classes.length; i++) {
			domCache.boxes[i].className += ' ' + settings.classes[i].name;
		}
	};

	return {
		init: init
	}
}

var newWire = throughTheWire();
newWire.init();

