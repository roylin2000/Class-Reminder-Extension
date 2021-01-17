var courseName = document.querySelector('#class-name');
var timeStart = document.querySelector('#time-start');
var day = document.querySelector('#weekday');
var link = document.querySelector('#link');
var saveClass = document.querySelector("#save-class");

saveClass.onclick = function() {

    var d = new Date();
    
    let course = {[courseName.value]: [timeStart.value, link.value]};

    let dayValue = day.value;

    chrome.storage.local.get(dayValue, classes =>{
        if(classes[dayValue])
            classes[dayValue][0] = {...classes[dayValue][0], [courseName.value]: [timeStart.value, link.value]};
        else
            classes[dayValue] = [course]
        
        chrome.storage.local.set(classes);
    });

};

