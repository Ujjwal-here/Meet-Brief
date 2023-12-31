console.log("Content Runs");

//Extracts Caption For Particular Speaker and Saves it LOCALLY


const myChild = document.getElementsByClassName("iOzk7");
let script = [];
let last_speaker = "";

const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
        if (
            mutation.target.classList &&
            mutation.target.classList.contains("iTTPOb")
        ) {
            if (mutation.addedNodes.length) {
                let newNodes = mutation.addedNodes;
                let speaker = newNodes[
                    "0"
                    ]?.parentNode?.parentNode?.parentNode?.querySelector(".zs7s8d.jxFHg")
                    ?.textContent;
                console.log(speaker);
                if (speaker) {
                    setTimeout(function () {
                        if (newNodes.length) {
                            if (last_speaker !== speaker) {
                                script.push(speaker + " : " + newNodes["0"].innerText + "\r\n");
                                last_speaker = speaker;
                            } else {
                                let lastText = script.pop();
                                lastText = lastText.slice(0, -2);
                                lastText = lastText + newNodes["0"].innerText + "\r\n";
                                script.push(lastText);
                            }
                            chrome.storage.sync.set({
                                script: script,
                            });
                        }
                    }, 10000);
                }
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.message === "Generate") {
        observer.observe(myChild[0], {
            subtree: true,
            childList: true,
        })
    } else {
        observer.disconnect()
    }

})