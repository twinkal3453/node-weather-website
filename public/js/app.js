const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");

// messageOne.textContent = messageOne;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";
  messageFour.textContent = "";

  //this code is when we run application on localhost
  //   fetch(`http://localhost:3000/weather?address= ${location}`).then(
  //     (response) => {
  //       response.json().then((data) => {
  //         if (data.error) {
  //           messageOne.textContent = data.error;
  //         } else {
  //           messageOne.textContent = location;
  //           messageTwo.textContent = data.location;
  //           messageThree.textContent = data.status;
  //           messageFour.textContent = data.forecast;
  //         }
  //       });
  //     }
  //   );

  //this line is when we run app on heroku app
  fetch(`/weather?address= ${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = location;
        messageTwo.textContent = data.location;
        messageThree.textContent = data.status;
        messageFour.textContent = data.forecast;
      }
    });
  });
});
