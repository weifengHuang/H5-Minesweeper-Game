var ticTok = function() {
	var time = e('#id-span-time')
	if(!time.classList.contains("time")) {
		time.classList.add("time")
		time.interval = setInterval(function() {
			var t = parseInt(time.innerHTML) + 1
			time.innerHTML = t
		}, 1000)
	}
}

var resetTimer = function() {
	var time = e('#id-span-time')
	time.innerHTML = 0
}

var stopTimer = function() {
	var time = e('#id-span-time')
	if(time.classList.contains("time")) {
		clearInterval(time.interval)
		time.classList.remove("time")
	}
}
