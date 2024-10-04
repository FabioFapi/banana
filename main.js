// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, remove, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK8-tz832JCU4tuB15rcG4y3BpNxF3wIg",
  authDomain: "fish-9b046.firebaseapp.com",
  projectId: "fish-9b046",
  databaseURL: "https://toy-list-741cb-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "fish-9b046.appspot.com",
  messagingSenderId: "274359538404",
  appId: "1:274359538404:web:951ae685c413dd446cd2f1",
  measurementId: "G-S7MYCPQV0C",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM elements
const toyList = document.getElementById("toyList");
const toyInput = document.getElementById("toyInput");
const addToyBtn = document.getElementById("addToyBtn");

// Function to add toy to the database
function addToy() {
  const toyName = toyInput.value.trim();
  if (toyName) {
    // Add a new toy to the database
    push(ref(database, "toys"), {
      name: toyName,
    });
    toyInput.value = "";  // Clear input after adding
  } else {
    alert("Please enter a toy name.");
  }
}

// Function to update toy name
function editToy(id, name) {
  update(ref(database, `toys/${id}`), { name: name });
}

// Function to delete toy from the database
function deleteToy(id) {
  remove(ref(database, `toys/${id}`));
}

// Function to add buttons for edit and delete actions
function addBtnWithHandler(parent, btnName, btnHandler) {
  const btn = document.createElement("button");
  btn.innerText = btnName;
  btn.addEventListener("click", btnHandler);
  parent.appendChild(btn);
}

// Event listener for adding toy when the button is clicked
addToyBtn.addEventListener("click", addToy);

// Real-time listener to display toys from the database
onValue(ref(database, "toys"), (snapshot) => {
  toyList.innerHTML = "";  // Clear the list
  snapshot.forEach((child) => {
    const toyName = child.val().name;
    const id = child.key;
    const li = document.createElement("li");
    li.innerText = toyName;

    // Add edit button
    addBtnWithHandler(li, "Edit", () => {
      const newName = prompt("Choose a new name for the toy", toyName);
      if (newName && newName.trim()) {
        editToy(id, newName.trim());
      }
    });

    // Add delete button
    addBtnWithHandler(li, "Delete", () => {
      if (confirm("Are you sure you want to delete this toy?")) {
        deleteToy(id);
      }
    });

    toyList.appendChild(li);
  });
});
