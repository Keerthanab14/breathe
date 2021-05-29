let seconds = 0;
let minutes = 0;
let hours = 0;

//Define vars to hold display value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define var to hold setInterval() func
let interval = null;

//Define var to hold status
let status = "stopped";

// Logic to when to increment next value
function stopWatch(){

    seconds++;

    // When mins change
    if(seconds/60 == 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 == 1){
            minutes = 0;
            hours++;
        }
    }

    // If secs/mins/hrs are 1 digit, add leading 0
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }
    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }
    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }
    
    // Display time
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}


function startStop(){
    if(status == "stopped"){
        //Start stopwatch (call setInterval)
        interval = window.setInterval(stopWatch,1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started"
    }
    else{
        window.clearInterval(interval)
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped"
    }
}

//Function reset
function reset(){
    window.clearInterval("interval");
    seconds = 0;
    minutes = 0;
    hours = 0;
    count = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start"
    startStop();
}


// How many times button is clicked

var count = 0;


function counter(){
    var btn = document.getElementById("Counter");
    var disp = document.getElementById("disp");
    count++;
    disp.innerHTML = count;
  };



  //Breathe IN / OUT
  function change() {

    var btn = document.getElementById("Breather");

    if (btn.value == "Inhale") {
        btn.value = "Exhale";
        btn.innerHTML = "Exhale";
    }
    else {
        btn.value = "Inhale";
        btn.innerHTML = "Inhale";
    }
}

// Reset Timer and Button click counter
function reset_count() {
    var disp = document.getElementById("disp");
    disp.innerHTML = 0;

}