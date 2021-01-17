chrome.runtime.onMessage.addListener(
    (req, sender, sendResponse) => {
        console.log("just lmk whneaweasd")
    if (!sender.tab)
    {
        var body = document.getElementsByTagName("body")[0];
        var notif = document.createElement("div");
        var hyplink = document.createElement("a");
        hyplink.innerText = "You have " + req.name + " right now! Go to class!";
        hyplink.setAttribute('href', req.link);

        notif.setAttribute("id", "notif");
        notif.setAttribute("class","notif-class");
        notif.appendChild(hyplink);
        body.prepend(notif)

        sendResponse({status: "complete"});
    }
  });
