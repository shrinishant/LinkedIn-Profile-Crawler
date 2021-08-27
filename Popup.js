// var go_btn = document.getElementById('go');

document.getElementById('go').onclick = function() {

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {start: document.getElementById('start').value, end: document.getElementById('end').value ,go: "true"}, function(response) {
            // alert(response.farewell);
            // console.log(response.farewell);
        });
    });
}