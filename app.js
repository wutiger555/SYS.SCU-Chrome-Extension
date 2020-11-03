document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#setcookie').addEventListener('click', setCookie);
});

function setCookie() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		const url = tabs[0].url;
		if(!url.includes("web.sys.scu.edu.tw")){
			if(window.confirm("您目前頁面並非課務系統，無法作用\n是否前往課務系統?")){
				chrome.tabs.create({'url': "https://web.sys.scu.edu.tw/" } )
			}else{
				return
			}
			return;
		}
	});
	
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