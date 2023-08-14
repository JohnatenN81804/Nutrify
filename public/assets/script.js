// script.js
const apiRootUrl = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=19533129&app_key=99f99420f7ca835f437b3ab67e21166e';

async function fetchRecipe(searchQuery) {
  const apiSearchUrl = `${apiRootUrl}&q=${searchQuery}`;
  const searchResponse = await fetch(apiSearchUrl);

  const searchData = await searchResponse.json();
  console.log(searchData);
}


fetchRecipe("tacos");

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
  
  // Redirect to login page after successful sign-up
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

    location.href = 'index.html'; 
} else {
    alert ("Login failed! Please try again with correct credentials")
  }
}

document.getElementById('login').addEventListener('click', handleLogin);

