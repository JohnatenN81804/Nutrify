// script.js

const users = []

function handleSignUp(event) {
  event.preventDefault(); // Prevent the form from submitting

  // Collect user information from the sign-up form
  const emailInput = document.querySelector('input[name="email-name"]');
  const passwordInput = document.querySelector('input[name="password"]');
  const verifyPasswordInput = document.querySelector('input[name="verify-password"]');

  const email = emailInput.value;
  const password = passwordInput.value;
  const verifyPassword = verifyPasswordInput.value;

  // Check if passwords match
  if (password !== verifyPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  const user = { email, password };
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Push the new user to the array and store in local storage
  storedUsers.push(user);
  localStorage.setItem('users', JSON.stringify(storedUsers));

  alert('Sign-up successful! You can now log in with your credentials.');
  
 
  location.href = 'login.html';
}

document.getElementById('signUp').addEventListener('click', handleSignUp);

// Function to handle the login process
function handleLogin(event) {
  event.preventDefault(); 


  // Collect user login credentials from the login form
  const emailInput = document.querySelector('input[name="email-name"]');
  const passwordInput = document.querySelector('input[name="password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = storedUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
      
    alert ("Login succesful!")

    // Redirect the user to the main page if succesful login
    //////////////////////NEED A HANDLE BAR LOCATION TO BRING LOGGIN USER TO LANDING PAGE!
    location.href = 'index.html'; 
} else {
    alert ("Login failed! Please try again with correct credentials")
  }
}

 document.getElementById('login').addEventListener('click', handleLogin);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Handle search from homepage

const searchBtn = $(`.search-btn`);

// when search button is clicked, send input
searchBtn.on('click', () => {
  const searchInput = $(`.search-box`).val();

  // check to see if search box contains any input
  if (searchInput !== '') {
    const searchQuery = searchInput;
    // call fetch() method: post here..
    // then express server will get that POST request with the search query and render the handlebars search page.
    // any client-side logic browser for the search page results will then be on the /assets/search.js file.
    // send "searchQuery" to express via the POST fetch() call.
    console.log(searchQuery);
  } else {
    console.log(`\ninvalid search query (null)`);
  }
});