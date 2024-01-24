// import axios from 'axios';
// Solve the issue of importing, but wanna use fetch here
const $2420af87dad0a269$export$87d0e790667228e9 = {
    formLogin: document.querySelector(".form--login"),
    formSignup: document.querySelector(".form--signup"),
    btnSubmit: document.querySelector(".form__field__btn--submit"),
    formGrpCreation: document.querySelector(".form--grpCreation"),
    formInvite: document.querySelector(".header__form--invite"),
    formJoinGrp: document.querySelector(".header__form--joinGrp"),
    name: document.querySelector(".name"),
    email: document.querySelector(".email"),
    password: document.querySelector(".password"),
    grpName: document.querySelector(".grpName"),
    grpJoinCodeInput: document.querySelector(".input--joinCode"),
    grpSubject: document.querySelector(".grpSubject"),
    btnGrpJoin: document.querySelector(".btn--grpJoin"),
    grpDetails: document.querySelector(".grpDetails"),
    grpMaterials: document.querySelector(".grpDetails__materials"),
    btnDownloadMaterial: document.querySelector(".grpDetails__materials__list__item__btnDownload"),
    dateToday: document.querySelector(".dateToday"),
    dateEnd: document.querySelector(".dateEnd"),
    filesToUpload: document.querySelector(".input--file"),
    filesDesc: document.querySelector(".inputFile__text"),
    logoutBtn: document.querySelector(".nav__list__item__logout"),
    uploadBtn: document.querySelector(".grpDetails__footer__btn--upload"),
    memberBtnToggle: document.querySelector(".memberBtn--toggle"),
    membersSection: document.querySelector(".grpDetails__members"),
    // copyJoinLinkBtn: document.querySelector('.btn--linkCopy'),
    btnGenerateCode: document.querySelector(".btn--joinCodeGenerate"),
    joinCodeContent: document.querySelector(".grpDetails__header__joinCode"),
    grpDeleteBtn: document.querySelector(".btn--deleteGrp"),
    modalOkBtn: document.querySelector(".modalAlert__btn--ok"),
    passwordConfirm: document.querySelector(".password--confirm"),
    inputCommonArr: Array.from(document.querySelectorAll(".form__field__input")),
    modalConfirmation: document.querySelector(".modal-confirmation"),
    // chatRoom
    chatRoom: document.querySelector(".chatRoom"),
    chatRoomContainer: document.querySelector(".chatRoom__container"),
    chatRoomMsgsList: document.querySelector(".chatRoom__messages__list"),
    chatRoomTyping: document.querySelector(".chatRoom__messages__typingText"),
    chatRoomForm: document.querySelector(".chatRoom__form"),
    chatRoomInput: document.querySelector(".chatRoom__form__input"),
    materialBtnTab: document.querySelector(".grpDetails__contents__tabs__btns--material"),
    chatRoomBtnTab: document.querySelector(".grpDetails__contents__tabs__btns--chatRoom")
};
// Validations
const $2420af87dad0a269$var$formInputErrorNotice = (el = "", msg = "")=>{
    // Removing the error of particular input
    if (el && el.parentElement.querySelector(".formInput__error")) {
        console.log("dsf");
        el.parentElement.querySelector(".formInput__error").parentElement.removeChild(el.parentElement.querySelector(".formInput__error"));
    }
    // If the function is not getting the msg, that means the notice should only be removed
    if (msg === "") return;
    const markUp = `
         <div class = 'color--error formInput__error'>${msg}</div>
    `;
    el.insertAdjacentHTML("afterend", markUp);
};
const $2420af87dad0a269$export$b8d6bda6b8a0445d = ()=>{
    for(let i = 0; i < $2420af87dad0a269$export$87d0e790667228e9.inputCommonArr.length; i++)if ($2420af87dad0a269$export$87d0e790667228e9.inputCommonArr[i].value.length < 1) {
        $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.inputCommonArr[i], "This field is mondatory");
        return false;
    } else $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.password);
    if ($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm) {
        if ($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm.value.length < 6) {
            $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm, "Enter Password of min 6 character!");
            return false;
        } else $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm);
    }
    if ($2420af87dad0a269$export$87d0e790667228e9.password && $2420af87dad0a269$export$87d0e790667228e9.passwordConfirm) {
        if ($2420af87dad0a269$export$87d0e790667228e9.password.value.length < 6) {
            $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.password, "Enter Password of min 6 character!");
            return false;
        } else $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.password);
        if ($2420af87dad0a269$export$87d0e790667228e9.password.value != $2420af87dad0a269$export$87d0e790667228e9.passwordConfirm.value) {
            $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm, `Password and Confirm Password doesn't match`);
            return false;
        } else $2420af87dad0a269$var$formInputErrorNotice($2420af87dad0a269$export$87d0e790667228e9.passwordConfirm);
    }
    return true;
};
if ($2420af87dad0a269$export$87d0e790667228e9.dateToday) {
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1); //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    today = yyyy + "-" + mm + "-" + dd;
    $2420af87dad0a269$export$87d0e790667228e9.dateToday.value = today;
    $2420af87dad0a269$export$87d0e790667228e9.dateEnd.setAttribute("min", today);
}
const $2420af87dad0a269$export$edd6d9252e4783c9 = (msg)=>{
    document.querySelector(".modalAlert").classList.add("showAlert");
    document.querySelector(".modalAlert__para").textContent = msg;
};



const $bbef96e6de4bbf61$export$596d806903d1f59e = async (email, password, st = "")=>{
    email = email.trim();
    password = password.trim();
    // Saving the url, to which want to redirect after login
    const prevUrl = window.location;
    const data = {
        email: email,
        password: password
    };
    try {
        const url = `/api/users/login`;
        $2420af87dad0a269$export$87d0e790667228e9.btnSubmit.disabled = true;
        let res = await fetch(url, {
            method: "POST",
            // It tells u about the type of file it is sending
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        $2420af87dad0a269$export$87d0e790667228e9.btnSubmit.disabled = false;
        if (res.status == "success" && prevUrl.pathname != "/login") window.location.assign(prevUrl);
        else if (res.status != "success") {
            // Alert Failed
            let msg = res.message;
            if (!msg) msg = "Wrong Email or Password!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
        } else window.location.assign("/");
    } catch (err) {
        console.log(err);
    }
};
const $bbef96e6de4bbf61$export$7200a869094fec36 = async (name, email, password, st = "")=>{
    name = name.trim();
    email = email.trim();
    password = password.trim();
    const prevUrl = window.location;
    const data = {
        name: name,
        email: email,
        password: password
    };
    try {
        const url = `/api/users/signup`;
        $2420af87dad0a269$export$87d0e790667228e9.btnSubmit.disabled = true;
        let res = await fetch(url, {
            method: "POST",
            // credentials: 'same-origin', // This is to send cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        $2420af87dad0a269$export$87d0e790667228e9.btnSubmit.disabled = false;
        if (res.status == "success" && prevUrl.pathname != "/signup") window.location.assign(prevUrl);
        else if (res.status != "success") {
            //Alert Failed
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
        } else window.location.assign("/");
    } catch (err) {
        console.log(err);
    }
};
const $bbef96e6de4bbf61$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: "GET",
            url: `/api/users/logout`
        });
        if (res) location.reload();
    // utilities.renderAlertSecondary('Logged out successfully', false, '/');
    } catch (err) {
    // utilities.renderAlertSecondary(err.response.data.message);
    }
}; /*  ############## */ 



const $237a5c0c747516ea$export$856f728536d122cb = async (name, subject, endDate, st = "")=>{
    name = name.trim();
    subject = subject.trim();
    endDate = endDate.trim();
    const data = {
        name: name,
        subject: subject,
        endDate: endDate
    };
    try {
        const url = `/api/groups`;
        // baseView.DOMElements.btnSubmit.disabled = true;
        let res = await fetch(url, {
            method: "POST",
            // credentials: 'same-origin', // This is to send cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        // baseView.DOMElements.btnSubmit.disabled = false;
        if (res.status == "success") window.location.assign("/");
        else {
            // Alert Failed
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
        }
    } catch (err) {
        console.log(err);
    }
};
const $237a5c0c747516ea$export$69895bd328f2dda9 = async (data, description)=>{
    if (data.files.length < 1) {
        $2420af87dad0a269$export$edd6d9252e4783c9("Please select some files.");
        return;
    }
    const formData = new FormData();
    for(let i = 0; i < data.files.length; i++)formData.append("files", data.files[i]);
    const filesDescription = "";
    formData.append("description", filesDescription);
    const url = `/api/studyItems/${$2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid}`;
    // baseView.DOMElements.btnSubmit.disabled = true;
    try {
        let res = await fetch(url, {
            method: "POST",
            body: formData
        });
        // baseView.DOMElements.btnSubmit.disabled = false;
        if (res) location.reload();
        else {
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
        }
    } catch (err) {
        console.log(err);
    }
};
const $237a5c0c747516ea$export$7dca5a624d65ecb1 = async (groupId, emailId)=>{
    try {
        const url = `/api/groups/${groupId}/sendInvite`;
        let res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailId: emailId
            })
        });
        res = await res.json();
        console.log(res);
        if (res.status != "success") {
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
            return;
        }
        if (res.status == "success") {
            $2420af87dad0a269$export$edd6d9252e4783c9("Invite Sent!! Ask your friend to check their spam folder too.");
            $2420af87dad0a269$export$87d0e790667228e9.formInvite.reset();
        }
    } catch (err) {
        console.log(err);
    }
};
const $237a5c0c747516ea$export$3855f9d2b7014b57 = async (grpId)=>{
    try {
        const url = `/api/groups/${grpId}/generateJoinCode`;
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        res = await res.json();
        if (res.status != "success") {
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
            return;
        }
        $2420af87dad0a269$export$87d0e790667228e9.joinCodeContent.innerHTML = res.joinTokenWithGrp;
    } catch (err) {
        console.log(err);
    }
};
const $237a5c0c747516ea$export$5a6e90b4b558f560 = async (joinTokenWithGrp)=>{
    try {
        const [grpId, joinToken] = joinTokenWithGrp.trim().split("=");
        const url = `/api/groups/joinByCode`;
        let res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grpId: grpId,
                joinToken: joinToken
            })
        });
        res = await res.json();
        if (res.status != "success") {
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
        }
        window.location.assign(`/group/${grpId}`);
    } catch (err) {
        console.log(err.message);
    }
};
const $237a5c0c747516ea$export$a9ffd4736e27743a = async (e)=>{
    if (!e.target.matches(".modal-confirmation__btns__btn")) return;
    // CLOSE THE MODAL
    $2420af87dad0a269$export$87d0e790667228e9.modalConfirmation.classList.remove("modal--showTop");
    // IF CLICK ON YES, DELETE THE COMMENT
    if (e.target.matches(".modal-confirmation__btns__btn--yes")) $237a5c0c747516ea$var$deleteGroup($2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid);
};
const $237a5c0c747516ea$var$deleteGroup = async (groupId)=>{
    try {
        const url = `/api/groups/${groupId}`;
        let res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        res = await res.json();
        if (res.status != "success") {
            let msg = res.message;
            if (!msg) msg = "Something went wrong!!";
            $2420af87dad0a269$export$edd6d9252e4783c9(msg);
            return;
        }
        window.location.assign("/");
    } catch (err) {
        console.log(err);
    }
}; // End of Stuff Related to Group Deletion
 // ###################



const $d9c306e94e5a01a6$var$socket = io();
const $d9c306e94e5a01a6$var$formatTime = (dateStr)=>{
    const msgDate = new Date(dateStr);
    let hours = msgDate.getHours();
    let minutes = msgDate.getMinutes();
    let period = "AM";
    if (hours > 12) {
        hours = hours % 12;
        period = "PM";
    }
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    const time = `${hours}:${minutes} ${period}`;
    return time;
};
// ChatRoom
const $d9c306e94e5a01a6$var$addMessage = (msg, user, pos)=>{
    const itemMarkup = `
        <li class = "chatRoom__messages__list__item  chatRoom__messages__list__item--${pos}">
          <div class = "chatRoom__messages__list__item__info">
            <span class = "chatRoom__messages__list__item__info__user">${user}</span>
            <p class = "chatRoom__messages__list__item__info__msg">${msg}</p>
            <span class = "chatRoom__messages__list__item__info__time">${$d9c306e94e5a01a6$var$formatTime(Date.now())}</span>
          </div
        </li>
    `;
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomMsgsList.insertAdjacentHTML("beforeend", itemMarkup);
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomContainer.scrollTop = $2420af87dad0a269$export$87d0e790667228e9.chatRoomContainer.scrollHeight;
};
// end of addmessage function
// Emiting typing
if ($2420af87dad0a269$export$87d0e790667228e9.chatRoom) $2420af87dad0a269$export$87d0e790667228e9.chatRoomInput.addEventListener("keyup", (e)=>{
    const data = {
        user: $2420af87dad0a269$export$87d0e790667228e9.chatRoomForm.dataset.username,
        groupId: $2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid,
        userId: $2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.userid
    };
    if (e.keyCode != 13) $d9c306e94e5a01a6$var$socket.emit("is-typing", data);
});
//end
// Emiting if a user joined the chat
if ($2420af87dad0a269$export$87d0e790667228e9.chatRoomForm) {
    const data = {
        user: $2420af87dad0a269$export$87d0e790667228e9.chatRoomForm.dataset.username,
        groupId: $2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid,
        userId: $2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.userid
    };
    $d9c306e94e5a01a6$var$socket.emit("new_user_joined", data);
}
// Listening for a message receive and will add the msg to UI
$d9c306e94e5a01a6$var$socket.on("msg-receive", (data)=>{
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomTyping.textContent = "";
    $d9c306e94e5a01a6$var$addMessage(data.msg, data.user, "left");
// window.scrollTo(0, document.body.scrollHeight);
});
$d9c306e94e5a01a6$var$socket.on("user-joined", (data)=>{
// Don't do anything for now
/*
  const itemMarkup = `
      <li class = "chatRoom__messages__d">
        <p>${name}<span> joined the chat.</span></p>
      </li>
    `;
  baseView.DOMElements.chatRoomMsgsList.insertAdjacentHTML(
    'beforeend',
    itemMarkup
  );
  */ });
// Listening for typing event
let $d9c306e94e5a01a6$var$intervalIdTyping;
$d9c306e94e5a01a6$var$socket.on("is-typing", (data)=>{
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomTyping.textContent = `${data.user.split(" ")[0]} is typing...`;
    clearInterval($d9c306e94e5a01a6$var$intervalIdTyping);
    $d9c306e94e5a01a6$var$intervalIdTyping = setInterval(()=>{
        $2420af87dad0a269$export$87d0e790667228e9.chatRoomTyping.textContent = "";
    }, 1500);
});
const $d9c306e94e5a01a6$export$54150805e796bf64 = async (inputMsg)=>{
    $d9c306e94e5a01a6$var$addMessage(inputMsg, "You", "right");
    const data = {
        msg: inputMsg,
        groupId: $2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid,
        user: $2420af87dad0a269$export$87d0e790667228e9.chatRoomForm.dataset.username
    };
    $d9c306e94e5a01a6$var$socket.emit("msg-send", data);
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomInput.value = "";
    const url = `/api/groups/${$2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid}/chatRoom/${$2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.userid}`;
    try {
        let res = await fetch(url, {
            method: "POST",
            // credentials: 'same-origin', // This is to send cookies
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputMsg: inputMsg
            })
        });
        res = await res.json();
    } catch (err) {
        console.log(err);
    }
// saving data
};


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
/* ###### */ // ## When Grp Creation Form is submitted
if ($2420af87dad0a269$export$87d0e790667228e9.formGrpCreation) $2420af87dad0a269$export$87d0e790667228e9.formGrpCreation.addEventListener("submit", (e)=>{
    e.preventDefault();
    if ($2420af87dad0a269$export$b8d6bda6b8a0445d()) $237a5c0c747516ea$export$856f728536d122cb($2420af87dad0a269$export$87d0e790667228e9.grpName.value, $2420af87dad0a269$export$87d0e790667228e9.grpSubject.value, $2420af87dad0a269$export$87d0e790667228e9.dateEnd.value);
});
/* ###### */ if ($2420af87dad0a269$export$87d0e790667228e9.filesToUpload) $2420af87dad0a269$export$87d0e790667228e9.uploadBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    // if (baseView.validateInputs()) {
    $237a5c0c747516ea$export$69895bd328f2dda9($2420af87dad0a269$export$87d0e790667228e9.filesToUpload);
// }
});
// Handling the Change file click
if ($2420af87dad0a269$export$87d0e790667228e9.filesToUpload) $2420af87dad0a269$export$87d0e790667228e9.filesToUpload.addEventListener("change", function(e) {
    e.preventDefault();
    $2420af87dad0a269$export$87d0e790667228e9.filesDesc.textContent = this.files.length + ` file chosen`;
});
// Handling Click of Logout Button
if ($2420af87dad0a269$export$87d0e790667228e9.logoutBtn) $2420af87dad0a269$export$87d0e790667228e9.logoutBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    $bbef96e6de4bbf61$export$a0973bcfe11b05c9();
});
/* ###### */ // Handling Submit of Invite Form
if ($2420af87dad0a269$export$87d0e790667228e9.formInvite) $2420af87dad0a269$export$87d0e790667228e9.formInvite.addEventListener("submit", (e)=>{
    e.preventDefault();
    $237a5c0c747516ea$export$7dca5a624d65ecb1($2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid, $2420af87dad0a269$export$87d0e790667228e9.email.value);
});
/* ###### */ // Handling Submit of Join Group Form
if ($2420af87dad0a269$export$87d0e790667228e9.formJoinGrp) $2420af87dad0a269$export$87d0e790667228e9.formJoinGrp.addEventListener("submit", (e)=>{
    e.preventDefault();
    $237a5c0c747516ea$export$5a6e90b4b558f560($2420af87dad0a269$export$87d0e790667228e9.grpJoinCodeInput.value);
});
/* ###### */ // Handling Click of Generate Code Button
if ($2420af87dad0a269$export$87d0e790667228e9.btnGenerateCode) $2420af87dad0a269$export$87d0e790667228e9.btnGenerateCode.addEventListener("click", (e)=>{
    e.preventDefault();
    $237a5c0c747516ea$export$3855f9d2b7014b57($2420af87dad0a269$export$87d0e790667228e9.grpDetails.dataset.grpid);
});
/* ###### */ // Handling Click of Delete Group Button
if ($2420af87dad0a269$export$87d0e790667228e9.grpDeleteBtn) $2420af87dad0a269$export$87d0e790667228e9.grpDeleteBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    $2420af87dad0a269$export$87d0e790667228e9.modalConfirmation.classList.add("modal--showTop");
});
if ($2420af87dad0a269$export$87d0e790667228e9.modalConfirmation) $2420af87dad0a269$export$87d0e790667228e9.modalConfirmation.addEventListener("click", (e)=>{
    e.preventDefault();
    $237a5c0c747516ea$export$a9ffd4736e27743a(e);
});
// Handling Click of Ok Button of alert Modal
if ($2420af87dad0a269$export$87d0e790667228e9.modalOkBtn) $2420af87dad0a269$export$87d0e790667228e9.modalOkBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    document.querySelector(".modalAlert").classList.remove("showAlert");
});
// HANDLING CLICK ON MEMBER BUTTON
if ($2420af87dad0a269$export$87d0e790667228e9.memberBtnToggle) $2420af87dad0a269$export$87d0e790667228e9.memberBtnToggle.addEventListener("click", ()=>{
    console.log("..");
    $2420af87dad0a269$export$87d0e790667228e9.membersSection.classList.toggle("grpDetails__members--show");
    if ($2420af87dad0a269$export$87d0e790667228e9.memberBtnToggle.name == "close") $2420af87dad0a269$export$87d0e790667228e9.memberBtnToggle.name = "people";
    else $2420af87dad0a269$export$87d0e790667228e9.memberBtnToggle.name = "close";
});
// Adding Join Input Code
// /groups/${req.params.grpId}/joinGroup/${joinToken}
// Handling chat input submission
if ($2420af87dad0a269$export$87d0e790667228e9.chatRoomForm) $2420af87dad0a269$export$87d0e790667228e9.chatRoomForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    if ($2420af87dad0a269$export$87d0e790667228e9.chatRoomInput.value) $d9c306e94e5a01a6$export$54150805e796bf64($2420af87dad0a269$export$87d0e790667228e9.chatRoomInput.value);
});
// end
// Making tabs work
const $109b577581d5e1d1$var$handleTabSwich = (btn, el, otherBtn, otherEl)=>{
    el.style.display = "block";
    btn.style.backgroundColor = "#e67e22";
    otherEl.style.display = "none";
    otherBtn.style.backgroundColor = "#fff";
};
if ($2420af87dad0a269$export$87d0e790667228e9.grpDetails) {
    $2420af87dad0a269$export$87d0e790667228e9.chatRoomBtnTab.addEventListener("click", ()=>{
        $109b577581d5e1d1$var$handleTabSwich($2420af87dad0a269$export$87d0e790667228e9.chatRoomBtnTab, $2420af87dad0a269$export$87d0e790667228e9.chatRoom, $2420af87dad0a269$export$87d0e790667228e9.materialBtnTab, $2420af87dad0a269$export$87d0e790667228e9.grpMaterials);
        $2420af87dad0a269$export$87d0e790667228e9.chatRoomContainer.scrollTop = $2420af87dad0a269$export$87d0e790667228e9.chatRoomContainer.scrollHeight;
    });
    $2420af87dad0a269$export$87d0e790667228e9.materialBtnTab.addEventListener("click", ()=>{
        $109b577581d5e1d1$var$handleTabSwich($2420af87dad0a269$export$87d0e790667228e9.materialBtnTab, $2420af87dad0a269$export$87d0e790667228e9.grpMaterials, $2420af87dad0a269$export$87d0e790667228e9.chatRoomBtnTab, $2420af87dad0a269$export$87d0e790667228e9.chatRoom);
        $2420af87dad0a269$export$87d0e790667228e9.grpMaterials.scrollTop = $2420af87dad0a269$export$87d0e790667228e9.grpMaterials.scrollHeight;
    });
}


//# sourceMappingURL=bundle.js.map
