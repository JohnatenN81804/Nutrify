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

  console.log('User signed up:');
  console.log('Email:', email);
  console.log('Password:', password);

  location.href = 'login.html'
}

document.getElementById('signUp').addEventListener('click', handleSignUp);

