// Get the events stored in the JSON file-----
/// The original contents of the events file was gotten 
///from the exercise 4 of eloquent javascript and modified
///to fit the current exercise.

var eventJson = require('./journal.json');
// get the events from the Json
var eventsJournal = eventJson.allEvents;
// // display first five events in eventsJournal
// for ( let i=0; i<6; i++ ){
//     console.log( eventsJournal[i] )
// }

/// display basic data statistics
// get total transformations
var countTransform = 0;
for ( let i=0; i<eventsJournal.length; i++ ){
    if (eventsJournal[i].werewolf){
        countTransform += 1;
    };
}
// get total events
var allEvents = [];
for ( let i=0; i<eventsJournal.length; i++ ){
    let currEvents = eventsJournal[i].events
    for ( let j=0; j<currEvents.length; j++ ){
        if ( !allEvents.includes( currEvents[j] )){
            allEvents.push( currEvents[j] );
        }
    }
}
const lenEvents = eventsJournal.length;
var nTransform = lenEvents - countTransform;
var detArr =  ["Total Entries",lenEvents,
                "Total Transformations",countTransform,
                "Total N-Transformations",nTransform,
                "Total Events",allEvents.length ];

for ( let i=0; i<detArr.length; i++ ){
    console.log( detArr[i], " : ", detArr[i+1]  );
    i += 1;
}
// console.table( detArr );



//// Get events that trigger the werewolf transformation
//////////////////////////////////////////////////////////////////////////
//Step 1: Create function to check if event appear in events
function eventPresent( event, currEvents ){
    // return 'true' if event in in currEvents
        return currEvents.events.indexOf(event) != -1;
    };


//Step 2: Create function that creates table data from the events array
function createTable( event, eventArr ){
    // create variable for table
    let table = [ 0, 0, 0, 0 ]; // 'let' is used here to create local variables
    // loop through array of objects
    for ( let i=0; i<eventArr.length; i++ ){
        // get array of events
        let currEvents = eventArr[i];
        // set a variable to track current index of event
        let tracker = 0;

        // check if event appears in currEvents
        if ( eventPresent( event, currEvents) ){
            // update tracker to second element of table
            tracker += 1;
        };
        // check if main event is 'true'
        if ( currEvents.werewolf ){
            // update tracker to third element
            tracker += 2;
        }
        /// if both statements are true, tracker = 3,(forth element of table is incremented)
        // else the first element
        table[tracker] += 1;
    }
    return table;
}
//// test createTable function (uncomment the lines below to run)
// console.log(  createTable( "beer", eventsJournal ) );
// console.log(  createTable( "meat", eventsJournal ) );
// console.log(  createTable( "full moon", eventsJournal ) );
// console.log(  createTable( "angry", eventsJournal ) );



// Step 3: Create a function to calculate the correlation between each event and the main event
function calculateCorr( tableArr ){
    /// Using the relation: (d*a - c*b) / sqrt(e*f*g*h)
    ///for clarity on relation: goto-http://slides.com/dmccraw/eloquent-javascript-chapter-4-part-2/fullscreen# /12
    // get variables from table
    let a = tableArr[0], b = tableArr[1];
    let c = tableArr[2], d = tableArr[3];
    let e = c+d, f = a+b, g = d+b, h = a+c;

    let corr = ( (d*a) - (c*b) ) / ( Math.sqrt(e*f*g*h) );
    return corr;
}
//// test calculateCorr function (uncomment the lines below to run)
// console.log(  calculateCorr( createTable("happy", eventsJournal) ) );
// console.log(  calculateCorr( createTable("meat", eventsJournal) ) );
// console.log(  calculateCorr( createTable("full moon", eventsJournal) ) );
// console.log(  calculateCorr( createTable("angry", eventsJournal) ) );



// Step 4: Map each correlation to a corresponding event
// create a function to get and map all correlations to respective events
function getAllCorrs( eventsJournal ){
    let corrMap = {};
    // loop through eventsJournal
    for ( let i=0; i<eventsJournal.length; i++ ){
        // get object of events
        let currEvents = eventsJournal[i].events;
        // loop through currEvents and calculate correlations
        for ( let j=0; j<currEvents.length; j++ ){
            // check if correlation for event has already been calculated to avoid duplicates
            if ( !(currEvents[j] in corrMap) ){
                corrMap[ currEvents[j] ] = calculateCorr( createTable(currEvents[j], eventsJournal) );
            }
        }
    }
    return corrMap;
}
const allCorrelations = getAllCorrs(eventsJournal)
//// test getAllCorrs function (uncomment the lines below to run)
// console.table( allCorrelations );
// console.log( "carrot : ", allCorrelations.carrot );
// console.log( "Num Events : ", Object.keys(allCorrelations).length ); // Same with Total events



// Step 5: Get high positive and negative correlations
// High correlations are those which are more or less than +||- 0.37
function getHighLowCorrs( allCorrelations ){
    var highLowCorrs = {};
    // loop through allCorrelations
    for ( let i in allCorrelations ){
        let corr = allCorrelations[i];
        if (  corr > 0.5 || corr < -0.5 ){
            highLowCorrs[i] = corr;
        }
    }
    return highLowCorrs;
}
// testing getHighLowCorrs function
console.table( getHighLowCorrs(allCorrelations) );

// from the correlation table printed, let's create new events based on the
//correlation of the given ones that will likely get the werewolf to turn
for ( let i=0; i<eventsJournal.length; i++ ){
    let currEvents = eventsJournal[i];
    // create new events
    if ( eventPresent("full moon", currEvents) &&
        !eventPresent("happy", currEvents) ){
            currEvents.events.push( "sad on full moon" );
        };
    if ( eventPresent("full moon", currEvents) &&
        eventPresent("angry", currEvents) ){
            currEvents.events.push( "angry on full moon" );
        };
    if ( eventPresent("got hurt", currEvents) &&
        !eventPresent("happy", currEvents) ){
            currEvents.events.push( "very sad" );
        };
    if ( eventPresent("got hurt", currEvents) &&
        eventPresent("full moon", currEvents) ){
            currEvents.events.push( "hurt on full moon" );
        };
    if ( eventPresent("angry", currEvents) &&
        eventPresent("got hurt", currEvents) ){
            currEvents.events.push( "very upset" );
        };
}
//// checking the correlation of these new events
var newEvents = ["very upset", "very sad", "sad on full moon",
                    "angry on full moon", "hurt on full moon"];
for ( let i in newEvents){
    console.log(newEvents[i], " : ", calculateCorr(createTable(newEvents[i], eventsJournal)));
}
// Console out events that are likely to make a werewolf turn
// create an object of events and feelings
const wereEventsObj = {
    "very upset":["angry", " got hurt"],
    "very sad":["got hurt", " not happy"],
    "sad on full moon":["full moon", " not happy"],
    "angry on full moon":["angry", " full moon"],
    "hurt on full moon":["got hurt", " full moon"]
};
const wereEventsArr = [ "angry", "got hurt", "full moon"];
// loop through wereEvents
console.log("\n\n");
let itrt = 0;
for ( let i in wereEventsObj ){
    let event = wereEventsObj[i];
    console.log("A werewolf is likely to turn when s/he is",Object.keys(wereEventsObj)[itrt]+
        ". The events that cause this feeling are: ["+event+"]\n");
    itrt += 1;
};

///////////////////////////////////////////////////////////////////////
// Create function that accepts an array of events from users and determine if they
//will turn into wolves with the occurrance of such events
function checkIfWereWolf( events, wereEventsArr ){
    // loop through events
    let currWereEvent = [];
    for ( let i=0; i<events.length; i++ ){
        if (wereEventsArr.includes(events[i])){
            currWereEvent.push(" "+events[i]);
        }
    }
    let num = currWereEvent.length;
    if (num >= 2){
        console.log("These events :"+currWereEvent,
        ",are werewolf events.\nYou are most likely going to turn into a werewolf! Today!!!");
        }
    if (num !=0 && num <=1 ){
        console.log("This event :"+currWereEvent,
        "is a werewolf event.\nBut you will most likely not turn into a werewolf with this event only.\n");
        if (currWereEvent.includes(" full moon")){
          console.log("Hold!\nToday is a full moon! Brace yourself\nThere's most likely a werewolf version of you on the way!!");
        }
    }
};
// get input from user
console.log("\n\n\t\t\t\t-----------------------------");
console.log("Welcome to your Lycanthrope log!");
let eList = prompt("For a list of all the events, type 'yes': ").toLowerCase();
function getList(eList){
  if (eList == 'yes'){
    console.log(allEvents);
  }
};
getList(eList);
var numInp = Number(prompt("What is number of events you have to check?: "));
var checker = isNaN(numInp);
while (checker){
  console.log("Please type in a number");
  numInp = Number(prompt("What is number of events you have to check?: "));
  if ( !(isNaN(numInp)) ){
    break;
  }
};

var userInp = [];
console.log("\nEnter events individually below.","Example:....\nangry\nfull moon\ncycling\n\n");
var counter = 0;
while ( counter < numInp ){
  var event = prompt("Enter event:").toLowerCase();
  // check if event is in allEvents
  if ( allEvents.includes(event) ){
    userInp.push(event);
    counter += 1;
  } else {
    console.log("Please type in a vaiable event!");
    let eList = prompt("To get a list of the viable events type 'yes': ").toLowerCase();
    getList(eList);
  } 
};
console.log("\n\nChecking events with existing log......\n");
checkIfWereWolf(userInp, wereEventsArr);