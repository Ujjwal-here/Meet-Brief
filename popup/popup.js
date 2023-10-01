console.log("Popup Runs")


document.addEventListener("DOMContentLoaded", function () {

    const signDiv = document.getElementById("signup")
    const loginDiv = document.getElementById("login")
    const popupDiv = document.getElementById("popup")

    const toSignUp = document.getElementById("toSignUp")
    const toLogin = document.getElementById("toLogin")


    const signupForm = document.getElementById("signupForm")
    const signEmail = document.getElementById("email-address-sign")
    const signPassword = document.getElementById("password-sign")

    const loginForm = document.getElementById("loginForm")
    const logEmail = document.getElementById("email-address-log")
    const logPassword = document.getElementById("password-log")


    const signUrl = "http://146.190.9.235/auth/register/"
    const loginUrl = "http://146.190.9.235/auth/login/"

    const btn_signup = document.getElementById("btn-signup")


    toLogin.addEventListener("click", function () {
        popupDiv.style.display = "none"
        loginDiv.style.display = "block"
        signDiv.style.display = "none"
    })

    toSignUp.addEventListener("click", function () {
        popupDiv.style.display = "none"
        loginDiv.style.display = "none"
        signDiv.style.display = "block"
    })


    function onAuthentication(url, email, password, formElement) {

        formElement.addEventListener("submit", function (e) {
            e.preventDefault()

            if (email.value === "" || password.value === "") {
                alert("Please Enter Email and Password")
            } else {
                const data = {email: email.value, password: password.value}

                async function sendDetails() {
                    const response = await fetch(url, {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(data)
                    })
                    const dataResponse = await response.json()

                    if (dataResponse) {
                        chrome.storage.sync.set({"token": dataResponse.token})
                        popupDiv.style.display = "block"
                        loginDiv.style.display = "none"
                        signDiv.style.display = "none"
                    } else {
                        console.log("WTF")
                    }

                }

                sendDetails()
            }
        })
    }


    btn_signup.addEventListener("click", function () {
        onAuthentication(signUrl, signEmail, signPassword, signupForm)
    })


    chrome.storage.sync.get("token", function (res) {
        if (res.token) {
            popupDiv.style.display = "block"
            loginDiv.style.display = "none"
            signDiv.style.display = "none"
        } else {
            popupDiv.style.display = "none"
            loginDiv.style.display = "block"
            signDiv.style.display = "none"
            onAuthentication(loginUrl, logEmail, logPassword, loginForm)
        }
    })


})

// const generateButton=document.getElementsByClassName("generate")
// const stopButton=document.getElementsByClassName("save")
// const downloadButton=document.getElementsByClassName("download")
//
// generateButton[0].addEventListener("click",function () {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message:"Generate",tabUrl:tabs[0].url});
//     });
//     return true
// })
//
// stopButton[0].addEventListener("click",function () {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message:"Stop",tabUrl:tabs[0].url});
//     });
//     return true
// })


//downloadButton[0].addEventListener("click", function (){
//    console.log("Download PDF")
//})