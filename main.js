// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK8-tz832JCU4tuB15rcG4y3BpNxF3wIg",
  authDomain: "fish-9b046.firebaseapp.com",
  projectId: "fish-9b046",
  databaseURL: "https://fish-9b046-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "fish-9b046.appspot.com",
  messagingSenderId: "274359538404",
  appId: "1:274359538404:web:951ae685c413dd446cd2f1",
  measurementId: "G-S7MYCPQV0C",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// DOM elements
let fishList = document.getElementById("fishList");
let fishInput = document.getElementById("fishInput");
let addFishBtn = document.getElementById("addFishBtn");

// Function to add fish to the database
function addFish() {
  let fishName = fishInput.value.trim();
  if (fishName) {
    // Add a new fish to the database
    database.ref("fish").push({
      name: fishName,
    });
    fishInput.value = "";  // Clear input after adding
  } else {
    alert("Please enter a fish name.");
  }
}

// Function to update fish name
function editFish(id, name) {
  database.ref("fish/" + id).update({ name: name });
}

// Function to delete fish from the database
function deleteFish(id) {
  database.ref("fish/" + id).remove();
}

// Function to add buttons for edit and delete actions
function addBtnWithHandler(parent, btnName, btnHandler) {
  const btn = document.createElement("button");
  btn.innerText = btnName;
  btn.addEventListener("click", btnHandler);
  parent.appendChild(btn);
}

// Event listener for adding fish when the button is clicked
addFishBtn.addEventListener("click", addFish);

// Real-time listener to display fish from the database
database.ref("fish").on("value", function (snapshot) {
  fishList.innerHTML = "";  // Clear the list
  snapshot.forEach(function (child) {
    let fishName = child.val().name;
    let id = child.key;
    let li = document.createElement("li");
    li.innerText = fishName;

    // Add edit button
    addBtnWithHandler(li, "Edit", function () {
      const newName = prompt("Choose a new name for the fish", fishName);
      if (newName && newName.trim()) {
        editFish(id, newName.trim());
      }
    });

    // Add delete button
    addBtnWithHandler(li, "Delete", function () {
      if (confirm("Are you sure you want to delete this fish?")) {
        deleteFish(id);
      }
    });

    fishList.appendChild(li);
  });
});


