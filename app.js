document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#setcookie').addEventListener('click', setCookie);
});

function setCookie() {
	chrome.cookies.set({
		url  : 'https://web.sys.scu.edu.tw/',
		name : 'parselimit',
		value : 'Infinity',
		expirationDate : (new Date().getTime()/1000) + 31536000
	}, function(msg){
		console.dir(msg);
	});
	
	chrome.cookies.set({
		url  : 'https://web.sys.scu.edu.tw/',
		name : 'login0',
		value : 'TRUE',
		expirationDate : (new Date().getTime()/1000) + 31536000
	}, function(msg){
		console.dir(msg);
	});

	
	
}