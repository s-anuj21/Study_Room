// import axios from 'axios';
// Solve the issue of importing, but wanna use fetch here
const $2420af87dad0a269$export$87d0e790667228e9 = {
    formLogin: document.querySelector(".form--login"),
    formSignup: document.querySelector(".form--signup"),
    name: document.querySelector(".name"),
    email: document.querySelector(".email"),
    password: document.querySelector(".password"),
    passwordConfirm: document.querySelector(".password--confirm"),
    inputCommonArr: Array.from(document.querySelectorAll(".form__field__input"))
};
// Validations
const $2420af87dad0a269$var$formInputErrorNotice = (el = "", msg = "")=>{
    // Removing the error of particular input
    if (el && el.parentElement.querySelector(".formInput__error")) el.parentElement.querySelector(".formInput__error").parentElement.removeChild(el.parentElement.querySelector(".formInput__error"));
    // If the function is not getting the msg, that means the notice should only be removed
    if (msg === "") return;
    const markUp = `
         <div class = 'para--small color--error formInput__error u-margin-top-extraSmall'>${msg}</div>
    `;
    el.insertAdjacentHTML("afterend", markUp);
};
const $2420af87dad0a269$export$b8d6bda6b8a0445d = ()=>{
    for(let i = 0; i < $2420af87dad0a269$export$87d0e790667228e9.inputCommonArr.length; i++)if ($2420af87dad0a269$export$87d0e790667228e9.inputCommonArr[i].value.length < 1) {
        $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.inputCommonArr[i], "This field is mondatory");
        return false;
    }
    if ($2420af87dad0a269$export$87d0e790667228e9.password) {
        if ($2420af87dad0a269$export$87d0e790667228e9.password.length < 6) {
            alert("Enter Password of min 6 character!");
            return false;
        }
    }
    if ($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm) {
        if ($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm.length < 6) {
            alert("Enter Password of min 6 character!");
            return false;
        }
    }
    if ($2420af87dad0a269$export$87d0e790667228e9.password && $2420af87dad0a269$export$87d0e790667228e9.passwordConfirm) {
        if ($2420af87dad0a269$export$87d0e790667228e9.password.value != $2420af87dad0a269$export$87d0e790667228e9.passwordConfirm.value) {
            alert(`Password and Confirm Password doesn't match`);
            return false;
        }
    }
    return true;
};


/*------ WHEN LOGIN ROUTE IS HITTED -----*/ const $bbef96e6de4bbf61$export$596d806903d1f59e = async (email, password, st = "")=>{
    email = email.trim();
    password = password.trim();
    const data = {
        email: email,
        password: password
    };
    try {
        const url = `/api/users/login`;
        let res = await fetch(url, {
            method: "POST",
            // It tells u about the type of file it is sending
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};
const $bbef96e6de4bbf61$export$7200a869094fec36 = async (name, email, password, st = "")=>{
    name = name.trim();
    email = email.trim();
    password = password.trim();
    const data = {
        name: name,
        email: email,
        password: password
    };
    try {
        const url = `/api/users/signup`;
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        console.log(res);
    } catch (err) {
        // utilities.renderAlertSecondary(err.response.data.message);
        console.log(err);
    }
}; /*  ############## */ 


// ## When Login Form is submitted
if ($2420af87dad0a269$export$87d0e790667228e9.formLogin) $2420af87dad0a269$export$87d0e790667228e9.formLogin.addEventListener("submit", (e)=>{
    e.preventDefault();
    if ($2420af87dad0a269$export$b8d6bda6b8a0445d()) $bbef96e6de4bbf61$export$596d806903d1f59e($2420af87dad0a269$export$87d0e790667228e9.email.value, $2420af87dad0a269$export$87d0e790667228e9.password.value);
});
/* ###### */ // ## When SignUp Form is submitted
if ($2420af87dad0a269$export$87d0e790667228e9.formSignup) $2420af87dad0a269$export$87d0e790667228e9.formSignup.addEventListener("submit", (e)=>{
    e.preventDefault();
    if ($2420af87dad0a269$export$b8d6bda6b8a0445d()) $bbef96e6de4bbf61$export$7200a869094fec36($2420af87dad0a269$export$87d0e790667228e9.name.value, $2420af87dad0a269$export$87d0e790667228e9.email.value, $2420af87dad0a269$export$87d0e790667228e9.password.value);
});
 /* ###### */ 


//# sourceMappingURL=bundle.js.map
