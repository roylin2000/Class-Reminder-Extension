chrome.runtime.onMessage.addListener(
    (req, sender, sendResponse) => {
        console.log("just lmk whneaweasd")
    if (!sender.tab)
    {
        console.log("why no work")


        var body = document.getElementsByTagName("body")[0];
        var notif = document.createElement("div");
        var hyplink = document.createElement("a");
        hyplink.innerText = "You have " + req.name + " right now! Go to class!";
        hyplink.setAttribute('href', req.link);

        notif.setAttribute("id", "notif");
        notif.setAttribute("class","notif-class");
        notif.appendChild(hyplink);
        //notif.style.width = "50%";
        // notif.style.top = "10px";
        body.prepend(notif)

        sendResponse({status: "complete"});
    }
  });

// window.onload=function(){
//     console.log("page load!");
//     alert("wtf");
// }