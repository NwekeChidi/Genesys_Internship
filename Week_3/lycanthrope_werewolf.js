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
const lenEvents = eventsJournal.length;
var nTransform = lenEvents - countTransform;
var detArr =  ["Total Entries",lenEvents,
                "Total Transformations",countTransform,
                "Total N-Transformations", nTransform ];

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

// test createTable function
console.log(  createTable( "carrot", eventsJournal ) );
console.log(  createTable( "meat", eventsJournal ) );