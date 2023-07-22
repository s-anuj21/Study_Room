import * as baseView from './baseView.js';

const socket = io();

const formatTime = (dateStr) => {
  const msgDate = new Date(dateStr);
  let hours = msgDate.getHours();
  let minutes = msgDate.getMinutes();

  let period = 'AM';
  if (hours > 12) {
    hours = hours % 12;
    period = 'PM';
  }

  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;

  const time = `${hours}:${minutes} ${period}`;
  return time;
};

// ChatRoom
const addMessage = (msg, user, pos) => {
  const itemMarkup = `
        <li class = "chatRoom__messages__list__item  chatRoom__messages__list__item--${pos}">
          <div class = "chatRoom__messages__list__item__info">
            <span class = "chatRoom__messages__list__item__info__user">${user}</span>
            <p class = "chatRoom__messages__list__item__info__msg">${msg}</p>
            <span class = "chatRoom__messages__list__item__info__time">${formatTime(
              Date.now()
            )}</span>
          </div
        </li>
    `;

  console.log('aar');
  baseView.DOMElements.chatRoomMsgsList.insertAdjacentHTML(
    'beforeend',
    itemMarkup
  );

  baseView.DOMElements.chatRoomContainer.scrollTop =
    baseView.DOMElements.chatRoomContainer.scrollHeight;
};
// end of addmessage function

// Emiting if a user joined the chat
if (baseView.DOMElements.chatRoomForm) {
  const data = {
    user: baseView.DOMElements.chatRoomForm.dataset.username,
    groupId: baseView.DOMElements.grpDetails.dataset.grpid,
  };
  socket.emit('new_user_joined', data);
}

// Listening for a message receive and will add the msg to UI
socket.on('msg-receive', (data) => {
  addMessage(data.msg, data.user, 'left');
  // window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user-joined', (name) => {
  // Don't do anything for now
  /*
  const itemMarkup = `
      <li class = "chatRoom__messages__list__iitem">
        <p>${name}<span> joined the chat.</span></p>
      </li>
    `;
  baseView.DOMElements.chatRoomMsgsList.insertAdjacentHTML(
    'beforeend',
    itemMarkup
  );
  */
});

// Handling the Send Message of User
export const handleChatInput = async (inputMsg) => {
  addMessage(inputMsg, 'You', 'right');
  const data = {
    msg: inputMsg,
    groupId: baseView.DOMElements.grpDetails.dataset.grpid,
    user: baseView.DOMElements.chatRoomForm.dataset.username,
  };

  socket.emit('msg-send', data);
  baseView.DOMElements.chatRoomInput.value = '';

  const url = `/api/groups/${baseView.DOMElements.grpDetails.dataset.grpid}/chatRoom/${baseView.DOMElements.grpDetails.dataset.userid}`;

  try {
    let res = await fetch(url, {
      method: 'POST',
      // credentials: 'same-origin', // This is to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputMsg }),
    });

    res = await res.json();
    console.log(res);
  } catch (err) {
    console.log(err);
  }

  // saving data
};
