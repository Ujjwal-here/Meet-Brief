console.log("Popup Runs")


const generateButton=document.getElementsByClassName("generate")
const stopButton=document.getElementsByClassName("save")
const downloadButton=document.getElementsByClassName("download")

generateButton[0].addEventListener("click",function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message:"Generate",tabUrl:tabs[0].url});
    });
    return true
})

stopButton[0].addEventListener("click",function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message:"Stop",tabUrl:tabs[0].url});
    });
    return true
})


//downloadButton[0].addEventListener("click", function (){
//    console.log("Download PDF")
//})