const firebaseConfig = {
    apiKey: "AIzaSyBZLnFXRZd101rBUBPFsx1aw2NWT-likCc",
    authDomain: "smitmini-6baa8.firebaseapp.com",
    projectId: "smitmini-6baa8",
    storageBucket: "smitmini-6baa8.appspot.com",
    messagingSenderId: "553240574270",
    appId: "1:553240574270:web:e090080a44896d81dfd46f",
    measurementId: "G-1JC7LXXFCF"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const dbRef = firebase.database().ref();

function signup() {
    const firstname = document.getElementById('inputFirstname').value;
    const lastname = document.getElementById('inputLastname').value;
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    const repeatPassword = document.getElementById('inputRepeatpassword').value;

    if (password !== repeatPassword) {
        console.log("Passwords do not match");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(function (userCredential) {
            const user = userCredential.user;
            console.log(user);
            // writeUserData(user.uid, email, password, firstname, lastname);
            sessionStorage.setItem('email', user.email);
            // window.location.href = './pages/Login.html'
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

function writeUserData(userId, email, password, firstname, lastname) {
    database.ref('users/' + userId).set({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    });
}

// Log In
function login() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        readUserData(user.uid);
        console.log("Signed in user: ", user)
        sessionStorage.setItem('email', user.email);
        window.location.href = './Dashboard.html';
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorMessage)
      });
  }
  
  function writeUserData(userId, email, password) {
    database.ref('users/' + userId).set({
        email: email,
        password: password,
      
    });
}
 function readUserData(userId) {
    dbRef.child("users").child(userId).get().then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }  
 