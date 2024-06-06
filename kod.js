document.getElementById('registrationForm').addEventListener('submit', function (event) {
    console.log("a")
    event.preventDefault();


    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const password2 = document.getElementById('register-confirm-password').value;

    const data = {
        email: email,
        password: password,
    };

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('showRegister').addEventListener('click', function () {
    document.getElementById('loginForm').style.transform = 'translateX(-100%)';
    document.getElementById('registerPanel').style.transform = 'translateX(0)';
});

document.getElementById('showLogin').addEventListener('click', function () {
    document.getElementById('registerPanel').style.transform = 'translateX(100%)';
    document.getElementById('loginForm').style.transform = 'translateX(0)';
});
