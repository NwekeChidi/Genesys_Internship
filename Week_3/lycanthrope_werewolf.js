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

//// Calculate the correlation of each event to the werewolf transformation
//////////////////////////////////////////////////////////////////////////
//Step 1: Create function that creates table data from the events array
function createTable( event, eventArr ){
    // create variable for table
    let table = [ 0, 0, 0, 0 ]; // 'let' is used here to create local variables
    // loop through array of objects
    for ( let i=0; i<eventArr.length; i++ ){
        // get array of events
        let currEvents = eventArr[i];
        // set a variable to track current index of event
        let tracker = 0;

        //create function to check if event appear in events
        function eventPresent( event, currEvents ){
        // return 'true' if event in in currEvents
            return currEvents.events.indexOf(event) != -1;
        };

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
console.log(  createTable( "beer", eventsJournal ) );
console.log(  createTable( "meat", eventsJournal ) );
console.log(  createTable( "full moon", eventsJournal ) );
console.log(  createTable( "angry", eventsJournal ) );

// Step 2: Create a function to calculate the correlation between each event and the main event
function calculateCorr( tableArr ){
    /// Using the relation: (d*a - c*b) / sqrt(e*f*g*h)
    ///for clarity on relation: goto-http//slides.com/dmccraw/eloquent-javascript-chapter-4-part-2/fullscreen#/12
    // get variables from table
    let a = tableArr[0], b = tableArr[1];
    let c = tableArr[2], d = tableArr[3];
    let e = c+d, f = a+b, g = d+b, h = a+c;

    let corr = ( (d*a) - (c*b) ) / ( Math.sqrt(e*f*g*h) );
    return corr;
}
//// test calculateCorr function (uncomment the lines below to run)
console.log(  calculateCorr( createTable("happy", eventsJournal) ) );
console.log(  calculateCorr( createTable("meat", eventsJournal) ) );
console.log(  calculateCorr( createTable("full moon", eventsJournal) ) );
console.log(  calculateCorr( createTable("angry", eventsJournal) ) );

// Step 3: Map each correlation to a corresponding event
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
    return corrMap
}

//// test getAllCorrs function (uncomment the lines below to run)
var allCorrelations = getAllCorrs(eventsJournal)
console.log( allCorrelations );
console.log( allCorrelations.carrot );
console.log( Object.keys(allCorrelations).length );
