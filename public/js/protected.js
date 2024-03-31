const email = sessionStorage.getItem('email');
console.log(email)

if (!email) {
    window.location.href = './pages/Login.html'
}

if (email) {
    const logIn = document.getElementById('login');
    logIn.innerText = 'Logout';
}

