let userLogin = prompt('Please, enter your login', 'login');

checkLogin(userLogin);

function checkLogin(login) {

    if (login === '' || login === null) {
        alert('Canceled');
    } else if (login.length < 4) {
        alert('I don\'t know any users having name length less than 4 symbols');
    } else if (login === 'User') {
        let userPassword = prompt('Please, enter your password', 'password');
        checkPassword(userPassword);
    } else {
        alert('I don\'t know you');
    }
}

function checkPassword(password) {

    switch (password) {
        case '':
        case null:
            alert('Canceled');
            break;
        case 'SuperUser':
            checkCurrentHours();
            break;
        default:
            alert('Wrong password');
    }
}

function checkCurrentHours() {

    let currentHours = new Date().getHours();
    if (currentHours < 20) {
        alert('Good day!');
    } else {
        alert('Good evening!');
    }
}