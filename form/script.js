const form = document.querySelector(".login-form");

form.addEventListener("submit", async function(event) {
    event.preventDefault();
    try {
        const login = document.querySelector(".input_type_login");
        const pass = document.querySelector(".input_type_password");
        const loginValue = login.value;
        const passwordValue = pass.value;
        const message = document.querySelector(".message");
        const submitBtn = document.querySelector(".button_type_submit");
        const loader = document.querySelector(".loader");
        const successContainer = document.querySelector(".success-auth");
        const formTitle = document.querySelector(".main-container__title");

        login.disabled = true;
        pass.disabled = true;
        submitBtn.style.display = 'none';
        loader.style.display = 'block';

        if (loginValue && passwordValue) {
            const response = await fetch(`https://test-works.pr-uni.ru/api/login/index.php?login=${encodeURIComponent(loginValue)}&password=${encodeURIComponent(passwordValue)}`, {
                method: 'POST'
            });

            if (response.ok) {
                const result = await response.json();
                if (result.user) {
                    document.cookie = `token=${result.token}; path=/; max-age=3600`;
                    loader.style.display = 'none';
                    form.style.display = 'none';
                    formTitle.style.display = 'none';
                    successContainer.style.display = 'block';
                    successContainer.querySelector('.success-auth__message').textContent = `${result.user.name}, Вы успешно авторизованы!`;
                    
                } else {
                    console.log(result.errorMessage);
                    login.style.border = '2px solid red';
                    pass.style.border = '2px solid red';
                    login.style.color = 'red';
                    pass.style.color = 'red';
                    message.style.display = 'block';
                    submitBtn.style.display = 'block';
                }
            } else {
                loader.style.display = 'none';
                console.log("Ошибка сервера");
            }
        } else {
            alert("Введите корректные логин и пароль");
        }

        login.disabled = false;
        pass.disabled = false;
        submitBtn.style.display = 'block';
        loader.style.display = 'none';
    } catch (error) {
        console.log(error);
        login.disabled = false;
        pass.disabled = false;
        submitBtn.disabled = false;
    }
});

const loginInput = document.querySelector(".input_type_login");
const passwordInput = document.querySelector(".input_type_password");
const message = document.querySelector(".message");

loginInput.addEventListener("input", () => {
    loginInput.style.color = 'black';
    loginInput.style.border = '1px solid #d3d3d3'; 
    passwordInput.style.color = 'black';
    passwordInput.style.border = '1px solid #d3d3d3';
    message.style.display = 'none';
});

passwordInput.addEventListener("input", () => {
    passwordInput.style.color = 'black';
    passwordInput.style.border = '1px solid #d3d3d3';
    loginInput.style.color = 'black';
    loginInput.style.border = '1px solid #d3d3d3';
    message.style.display = 'none';
});
