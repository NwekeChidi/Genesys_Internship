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
    if ( eventPresent("full moon", currEvents) &&
        eventPresent("angry", currEvents) && 
        eventPresent("got hurt", currEvents)){
            currEvents.events.push( "terrible day" );
        }
}
// checking the correlation of these new events
var newEvents = ["terrible day", "very upset", "very sad",
                "sad on full moon", "angry on full moon", "hurt on full moon"];
for ( let i in newEvents){
    console.log(newEvents[i], " : ", calculateCorr(createTable(newEvents[i], eventsJournal)));
}