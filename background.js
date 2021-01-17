var pageConditions = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
                schemes: ["https", "http"]    
            },
        })],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}

chrome.runtime.onInstalled.addListener(function() {

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([pageConditions]);
    });
});

function setnewdaytimer(){
    if(window.newdaytimer) clearTimeout(newdaytimer);
    var now= new Date,
    tomorrow= new Date(now.getFullYear(), now.getMonth(), now.getDate()+1); 
    window.newdaytimer= setTimeout(newdayalarm, Math.abs(tomorrow-now));
};

function newdayalarm(){
    //chrome.storage.local.get(function(result){console.log(result)})
    // chrome.alarms.clearAll(()=>{
    //     console.log("nice");
    // });
    // chrome.storage.local.clear(()=>{
    //     console.log("cleared storage")
    // });
    var d = new Date();
    let dayIndex = d.getDay();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dayValue = weekdays[dayIndex];

    chrome.storage.local.get(dayValue, classes => {
        if(classes[dayValue]){
            for (let i in classes[dayValue][0]){
                var curSeconds = Math.floor(d /1000);
                var hours = classes[dayValue][0][i][0].split(":")[0] - new Date().getHours();
                var mins = classes[dayValue][0][i][0].split(":")[1] - new Date().getMinutes();
                var secs = hours * 60 * 60 + mins * 60
                console.log("this is negative? " + secs)
                console.log("We set it for this time", new Date((curSeconds+secs)*1000));
                if(secs > 0){
                    chrome.alarms.create(i, {when: Math.abs(new Date((curSeconds+secs)*1000))});
                }
                
                
            }
        }
    });
//
};

setnewdaytimer();
newdayalarm();

chrome.alarms.onAlarm.addListener(
    alarm => {
        let name = alarm.name
        var link
        var d = new Date();
        let dayIndex = d.getDay();
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let dayValue = weekdays[dayIndex];
        chrome.storage.local.get(dayValue, classes => {
           link = classes[dayValue][0][name][1];
        })


        chrome.tabs.query({active: true, currentWindow: true}, 
            function(tabs) {
          
                chrome.tabs.sendMessage(tabs[0].id, {name, link}
                    , _ => {
                        console.log("told it");
                    }
                );
            });
        
        

        
});

