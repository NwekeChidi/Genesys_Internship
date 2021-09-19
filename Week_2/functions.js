
// Create and add items to list
function addTask(){
    // create variables
    var itemList = document.createElement("li");
    var itemValue = document.getElementById("taskInput").value;
    var textN = document.createTextNode(itemValue);
    itemList.appendChild(textN);
    // create an alert if user tries to add empty task
    if (itemValue==''){
        alert("You cannot add an empty task! Please type in a task..");
    } else {
        // add item to unordered list
        document.getElementById("tasks").appendChild(itemList);
    }
    // clear input
    document.getElementById("taskInput").value = "";
    // create tagger variables
    var taggerTrash = document.createElement("span");
    var taggerImportant = document.createElement("span");
    // create emojis
    var trash = document.createTextNode("\u2715");
    var starr = document.createTextNode("\u2606");
    // create class names
    taggerTrash.className = "remove";
    taggerImportant.className = "important";
    // append emojis to taggers
    taggerTrash.appendChild(trash);
    taggerImportant.appendChild(starr);
    // add tagger to listItems
    itemList.appendChild(taggerTrash);
    itemList.appendChild(taggerImportant);

    for (i=0; i<remove.length; i++){
        remove[i].onclick = function(){
            var div = this.parentElement;
            div.style.display = "none"
        }
    }

    for (i=0; i<starrItem.length; i++){
        starrItem[i].onclick = function(){
            var div = this.parentElement;
            if (div.style.backgroundColor != "red"){
                div.style.backgroundColor = "red";
                div.style.fontWeight = "bold";
            } else {
                div.style.backgroundColor = "";
                div.style.fontWeight = "";
            }
        }
    }
}


// Create buttons and add them to item already in the list
var tagList = document.getElementsByTagName("li");
var counter;
// iterating over the length of tagList
for (counter=0; counter<tagList.length; counter++){
    // create tagger variables
    var taggerTrash = document.createElement("span");
    var taggerImportant = document.createElement("span");
    // create emojis
    var trash = document.createTextNode("\u2715");
    var starr = document.createTextNode("\u2606");
    // create class names
    taggerTrash.className = "remove";
    taggerImportant.className = "important";
    // append emojis to taggers
    taggerTrash.appendChild(trash);
    taggerImportant.appendChild(starr);
    // add taggers to items
    tagList[counter].appendChild(taggerTrash);
    tagList[counter].appendChild(taggerImportant);
}


// to remove items from list
var remove = document.getElementsByClassName("remove");
// iterate through remove
for (counter=0; counter<remove.length; counter++){
    remove[counter].onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
    }
}


// to make items important
var starrItem = document.getElementsByClassName("important");
// iterate through starr
for (counter=0; counter<starrItem.length; counter++){
    starrItem[counter].onclick = function(){
        var div = this.parentElement;
        if (div.style.backgroundColor != "red"){
            div.style.backgroundColor = "red";
            div.style.fontWeight = "bold";
        } else {
            div.style.backgroundColor = "";
            div.style.fontWeight = "";
        }
    }
}



// to check items which have been completed
// create a holder of queried items
var taskList = document.querySelector("ul");
// check completed items
taskList.addEventListener('click', function(ev){
    if (ev.target.tagName=='LI'){
        ev.target.classList.toggle('check');
    }
}, false);


// display about
function doAbout() {
    alert("This project was created by Nweke, Chidimma\nDominic, in the processing of completing the week two task in\nthe Genesys Learnable '21 internship program!");    
}