


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
  ////////////user sign-up post request
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.href = 'login.html';
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred during sign-up.');
    });
}

document.getElementById('signUp').addEventListener('click', handleSignUp)

// Function to handle the login process
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.querySelector('input[name="email-name"]');
  const passwordInput = document.querySelector('input[name="password"]');

  const email = emailInput.value;
  const password = passwordInput.value;

  const user = { email, password };

  // Send login data to the server
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      location.href = 'index.html';
    })
    .catch(error => {
      console.error(error);
      alert('Login failed. Please try again.');
    });
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