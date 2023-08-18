const logoutBtn = $('#logout-btn');

logoutBtn.on('click', () => {
  // Make fetch POST to hit DELETE route to destroy user session, thus logging out user.
  fetch('/api/user', {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    alert('logged out!');
    location.href = '/';
  })
  .catch(error => {
    console.error(error);
    alert("logging out user failed");
  })
});