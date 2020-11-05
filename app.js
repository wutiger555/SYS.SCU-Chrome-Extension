document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#setcookie').addEventListener('click', setCookie);
});
window.addEventListener("load", function(event) {
    getCalendars();
  });

function linkGithub(){
	window.location.href="https://github.com/wutiger555/SYS.SCU-Chrome-Extension"
}

function reqListener() {
	const data = JSON.parse(this.responseText);
	var ul = document.getElementById("calendar");
	for(i=0;i<data['items'].length-1;i++){
		const calendarContent = data['items'][i]['summary'];
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(calendarContent));
  		ul.appendChild(li);
		console.log(calendarContent)
	}
}

function reqError(err) {
	console.log('Fetch Error :-S', err)
}

function getCalendars() {
	var timeMinDate = new Date(); 
	timeMinDate.setDate(new Date().getDate()-1)
	var timeMin = timeMinDate.getFullYear()+"-"
				+ (timeMinDate.getMonth()+1)+"-"
				+ (timeMinDate.getDate());

	var timeMaxDate = new Date(); 
	timeMaxDate.setDate(new Date().getDate()+10)
	var timeMax = timeMaxDate.getFullYear()+"-"
				+ (timeMaxDate.getMonth()+1)+"-"
				+ (timeMaxDate.getDate());
	
	var dateConfig = "&timeMin="+timeMin+"T00%3A00%3A00Z&timeMax="+timeMax+"T00%3A00%3A00Z";
	console.log(dateConfig);
	const oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.onerror = reqError;
	oReq.open('get', 'https://www.googleapis.com/calendar/v3/calendars/3k064p6cntvj0e9d31uobbdstg%40group.calendar.google.com/events?key=AIzaSyDCOz6Yz2wq6rGYMvzLmhd0DtIVm4cXcfM&singleEvents=true&maxResults=999'+dateConfig, true);
	oReq.send();
}

function setCookie() {
	chrome.tabs.query({
		active: true,
		lastFocusedWindow: true
	}, tabs => {
		const url = tabs[0].url;
		if (!url.includes("web.sys.scu.edu.tw")) {
			if (window.confirm("您目前頁面並非課務系統，無法作用\n是否前往課務系統?")) {
				chrome.tabs.create({
					'url': "https://web.sys.scu.edu.tw/"
				})
			} else {
				return;
			}
			return;
		}else{
			try {
				chrome.cookies.set({
					url: 'https://web.sys.scu.edu.tw/',
					name: 'parselimit',
					value: 'Infinity',
					expirationDate: (new Date().getTime() / 1000) + 31536000
				}, function (msg) {
					console.dir(msg);
				});
				alert("設置完畢!")
				var button = document.getElementById("setcookie");
				button.style['background'] = '#000000';
				button.style['color'] = '#fff';
				button.style['pointer-events'] = 'none';
				var button = document.getElementById("text");
				button.innerText = "已啟動選課作業時間無限"
				// chrome.cookies.set({
				// 	url: 'https://web.sys.scu.edu.tw/',
				// 	name: 'login0',
				// 	value: 'TRUE',
				// 	expirationDate: (new Date().getTime() / 1000) + 31536000
				// }, function (msg) {
				// 	console.dir(msg);
				// });
			} catch (error) {
				console.log(error)
			}
		}
	});

}