// References to field elements
var fromNumber = document.getElementById('fromNumber');
var toNumber = document.getElementById('toNumber');
var dialBtn = document.getElementById('dial');
var exotelResultsValue = document.getElementById('exotelResultsValue');
var txt1 = document.getElementById('txt1');
var txt2 = document.getElementById('txt2');
var txt3 = document.getElementById('txt3');


// References to values stored in the plug-in parameters
var apikey = getPluginParameter('apikey');
var apitoken = getPluginParameter('apitoken');
var accountSid = getPluginParameter('accountSid');
var pfromNumber = getPluginParameter('fromNumber');
var ptoNumber = getPluginParameter('toNumber');
var calledID = getPluginParameter('calledID');
var recording = getPluginParameter('recording');
var displaynumber = getPluginParameter('displaynumber');
var type = getPluginParameter('type');
var msgBody = getPluginParameter('msgBody');


// First, show the current values form the fieldParams object
if (type) {
    if (type === "sms") {
        txt1.innerText = "Please check the number & click the button";
        txt2.style.visibility = 'hidden';
        dialBtn.innerText = 'SEND SMS';
        txt3.innerText = "This will send the SMS to the respondent.";
    } else {
        fromNumber.innerHTML = pfromNumber;
    }

} else {
    fromNumber.innerHTML = pfromNumber;
}

toNumber.innerHTML = ptoNumber;
if (displaynumber === 0){
	toNumber.innerHTML = '**********';
}


// Define the dial function
dialBtn.onclick = function () {
    getSite();
}

function makeHttpObject() {
    try { return new XMLHttpRequest(); }
    catch (error) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (error) { }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (error) { }

    throw new Error("Could not create HTTP request object.");
}

function getSite() {
    var request = makeHttpObject();
    var sresponse;

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            sresponse = request.responseText;
            exotelResultsValue.value = sresponse;
        }
    };
    var urlstring = "https://jpalsouth.asia/ExotelCallAPI.aspx?From=";
	if (recording===0){
		urlstring = urlstring.concat(pfromNumber, "&To=", ptoNumber, "&CalledID=", calledID, "&APIKey=", apikey, "&APIToken=", apitoken, "&AccountSid=", accountSid, "&Task=Call&Record=false");
	} else {
		urlstring = urlstring.concat(pfromNumber, "&To=", ptoNumber, "&CalledID=", calledID, "&APIKey=", apikey, "&APIToken=", apitoken, "&AccountSid=", accountSid, "&Task=Call&Record=true");
    }
    if (type) {
        if (type === "sms") {
            urlstring = "https://jpalsouth.asia/ExotelCallAPI.aspx?To=";
            urlstring = urlstring.concat(ptoNumber, "&APIKey=", apikey, "&APIToken=", apitoken, "&AccountSid=", accountSid, "&MsgBody=", msgBody, "&Task=SMS");
            urlstring = encodeURI(urlstring);
        }
    }
    request.open("GET", urlstring, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();
}
