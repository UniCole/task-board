const titleBox = document.getElementById("title");
const textareaBox = document.getElementById("textarea");
const dateBox = document.getElementById("date");
const timeBox = document.getElementById("time");
const notesEl = document.getElementById("notes");
let notesArray = [];

getFromLocalStorageAndDisplay();

limitDateInput();


function addNote() {

    let title = titleBox.value;
    let textarea = textareaBox.value;
    let date = dateBox.value;
    let time = timeBox.value;


    let isValid = validateFields(title, textarea, date, time);
    if (!isValid) {
        return true;
    }

    createNote(title, textarea, date, time, notesArray.length);

    addNoteToArr(title, textarea, date, time);

    saveToLocalStorage();

}


function addNoteToArr(title, textarea, date, time) {

    let newNote = {
        title,
        textarea,
        date,
        time
    }
    notesArray.push(newNote);

}


function saveToLocalStorage() {

    localStorage.setItem("saveNotes", JSON.stringify(notesArray));

}


function createNote(title, textarea, time, date, noteId) {

    let noteDiv = document.createElement("div");
    noteDiv.setAttribute("class", "note");
    noteDiv.setAttribute("id", noteId);

    let titleSpan = document.createElement("span");
    titleSpan.setAttribute("class", "noteTitle");

    let textAreaSpan = document.createElement("span");
    textAreaSpan.setAttribute("class", "noteTextArea");

    let dateSpan = document.createElement("span");
    dateSpan.setAttribute("class", "noteDate");

    let timeSpan = document.createElement("span");
    timeSpan.setAttribute("class", "noteTime");

    let button = document.createElement("button");
    button.setAttribute("class", "delete");
    button.setAttribute("onclick", "deleteNote(this)");

    let buttonEl = document.createElement("span");
    buttonEl.setAttribute("class", "button-element");
    buttonEl.setAttribute("aria-hidden", "true");

    titleSpan.innerHTML = title;
    textAreaSpan.innerHTML = textarea;
    timeSpan.innerHTML = time;
    dateSpan.innerHTML = date;

    noteDiv.appendChild(titleSpan);
    noteDiv.appendChild(textAreaSpan);
    noteDiv.appendChild(dateSpan);
    noteDiv.appendChild(timeSpan);
    buttonEl.appendChild(button);
    noteDiv.appendChild(buttonEl);
    notesEl.appendChild(noteDiv);

}


function getFromLocalStorageAndDisplay() {

    let notesArrayFromLocalStorage = JSON.parse(localStorage.getItem("saveNotes"));
    if (notesArrayFromLocalStorage != null) {
        notesArray = notesArrayFromLocalStorage;
        for (let i = 0; i < notesArray.length; i++) {
            createNote(notesArray[i].title, notesArray[i].textarea, notesArray[i].date, notesArray[i].time, i);
        }
    }
}


function deleteNote(button) {

    let buttonEl = button.parentElement;
    let noteDiv = buttonEl.parentElement;

    let noteDivId = +noteDiv.id;
    notesArray.splice(noteDivId, 1);
    notesEl.innerHTML = "";

    for (let i = 0; i < notesArray.length; i++) {
        createNote(notesArray[i].title, notesArray[i].textarea, notesArray[i].date, notesArray[i].time, i);
    }

    saveToLocalStorage();

}


function removeText() {

    titleBox.value = "";
    textareaBox.value = "";
    dateBox.value = "";
    timeBox.value = "";

}


function validateFields(title, textarea, date, time) {

    if (!title) {
        swal("Oops...", "Missing title!", "warning");
        return false;
    }

    if (!textarea) {
        swal("Oops...", "Missing description!", "warning");
        return false;
    }

    if (!date) {
        swal("Oops...", "Missing due date!", "warning");
        return false;
    }

    if (!time) {
        swal("Oops...", "Missing due time!", "warning");
        return false;
    }

    let now = new Date();
    now.setHours(0, 0, 0, 0);
    if (new Date(date) < now) {
        swal("Oops...", "Please enter future date!", "warning");
        return false;
    }

    return true;

}


function limitDateInput() {

    let today = new Date();

    let month = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    today = year + "-" + month + "-" + day;

    document.getElementById("date").setAttribute("min", today);

}