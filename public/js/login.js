import { json } from "/body-parser";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = document.getElementById('username').value;
  const email = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ user, email }),
    });
    if (!response.ok) {
      throw new Error('Login failed.');
    }
    window.location.href = '/';
  } catch (error) {
    console.error(error);
    alert('Login failed. Please try again.');
  }
});