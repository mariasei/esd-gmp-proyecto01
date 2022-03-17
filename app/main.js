import "modern-css-reset";
import "./../assets/sass/tailwind.scss";
import "./../assets/sass/style.scss";
import "phosphor-icons";
import data from "./data.json";

window.addEventListener("load", () => {
  renderTweets();
  initModalWindowEvents();
  initTweetEvents();
  initSearchEvent();
  initAddNewTweet();//?? NO LO RECONOCE
});

// RENDER TWEETS FUNCIONA

console.log(data);

const renderTweets = () => {
  const tweetsBlock = document.querySelector(".tweets");
  let tweetsHTML = "";

  data.forEach((dataItems) => {
    tweetsHTML += `
    <div class="tweets_container"> 
        <div class="column_1">
            <img
            src="${dataItems.user.pic}" alt="" class="profile_picture"/>
        </div>
        <div class="column_2">
        <div class="container_tweet">
            <div class="info_user">
                <h2 class="name">${dataItems.user.name}</h2>
                <h3 class="username">@${dataItems.user.username}</h3>
                <p class="time_tweet">${dataItems.content.time}h</p>
            </div>
            <p class="tweet_content">
                    ${dataItems.content.tweet}
            </p>
            <div class="interaction_bar">
                <div class="coments">
                    <button class="button_comments">
                        <img
                        class="interaction_icons"
                        src="./assets/images/coment.svg"
                        alt=""/>
                    </button>
                    <span class="number">${dataItems.content.comments}</span>
                </div>
                <div class="retweet">
                    <button class="button_rts">
                        <img
                        class="interaction_icons"
                        src="./assets/images/rt.svg"
                        alt=""/>
                    </button>
                    <span class="number">${dataItems.content.rt}</span>
                </div>
                <div class="likes">
                    <button class="button_likes">
                        <img
                        class="interaction_icons"
                        src="./assets/images/like.svg"
                        alt=""/>
                    </button>
                    <span class="number">${dataItems.content.likes}</span>
                </div>
            </div>
        </div>
        </div>
    </div>`;
  });

  tweetsBlock.innerHTML = tweetsHTML;
  initTweetEvents();
};

//FUNCIONA SOLO EN EL PRIMER TWEET??

const initTweetEvents = () => {
  const tweets = document.querySelectorAll(".tweets");

  tweets.forEach((tweet, i) => {
    // RETWEETS
    const buttonRT = tweet.querySelector("button.button_rts");
    buttonRT.addEventListener("click", () => {
      data[i].content.rt++;
      renderTweets()
    });
    // LIKES
    const buttonLikes = tweet.querySelector("button.button_likes");
    buttonLikes.addEventListener("click", () => {
      data[i].content.likes++;
      renderTweets();
    });
  });
};

//BARA DE BÚSQUEDA PRUEBA

// ME LOS DETECTA PERO NO LOS PINTA

// COMO CAMBIAR LA FORMA EN LA QUE SALE EL MENSAJE
// DE "NO HAY NADA"??

const initSearchEvent = () => {
  const tweetsBlock = document.querySelector(".tweets");
  const searchInput = document.querySelector(".search_bar input");
  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length > 3) {
      const filteredData = data.filter((dataItems) => 
      dataItems.content.tweet.includes(searchInput.value))
      tweetsBlock.innerHTML = filteredData;

      if (filteredData.length > 0) {
        const filteredData = data.filter((dataItems) => 
        dataItems.content.tweet.includes(searchInput.value))
        tweetsBlock.innerHTML = filteredData;

      } else {
        tweetsBlock.innerHTML = "No hay nada...";
      }
    } else {
      renderTweets();
    }
  });
};

//
// ENVIAR TWEET
//

const initAddNewTweet = () => {
  const input = document.querySelector(".intro_text");
  const submitButton = document.querySelector(".submit_button");

  submitButton.addEventListener("click", (ev) => {
      ev.preventDefault();
      const value = input.value;
      data.push({
        user: {
          pic: "https://robohash.org/suscipitistesapiente.png?size=50x50&set=set1",
          name: "Maria Moreno",
          username: "mariamoreno"
        },
        content: {
            time: 7,
            tweet: value,
            comments: 75,
            likes: 902,
            rt: 796
        },
      });
      renderTweets();
  });
}

const updateCharacterBar = () => {
  const amountTotal = document.querySelector(".total_tasks");
  const amountDone = document.querySelector(".amount_done");
  const progressBar = document.querySelector(".progress_bar_completed");

  let doneItems = 0;
  for (let i = 0; i < todoListData.length; i++) {
      const todoListDataItem = todoListData[i];
      if (todoListDataItem.done == true) {
          console.log(todoListDataItem);
          doneItems++;
      }
  }

  amountTotal.innerHTML = todoListData.length;
  amountDone.innerHTML = doneItems;
  progressBar.style.width = (doneItems / todoListData.length) * 100 + "%";
}


const initAddTodoEvent = () => {
  const input = document.querySelector(".intro_text");
  const submitButton = document.querySelector(".submit");
  const modalWindow = document.querySelector(".modal_window");

  submitButton.addEventListener("click", (ev) => {
      ev.preventDefault();
      const value = input.value;
      todoListData.push({
          title: value,
          done: false,
      });
      modalWindow.classList.remove("opened");
      renderTodoList();
  });
}

//
//
//
// PRUEBAS
//
//
//

// let tweets = []           // array[{}, {}, {}]
// let searchString = ""     // string
// let fiteredTweets = []    // array[{}, {}, {}]





// const initEventTweets = () => {
    
    
//     document.addEventListener("click", () => {
//         updateTweets()
//     })
// }

// const updateTweets = () => {
//     renderTweets()
// }

// const initSearchEvents = () => {
    
    
//     document.addEventListener("click", () => {
//         if (3 > 2) {
//             filterTweets()
//         } else {
//             renderTweets()
//         }
//     })
// }

// const filterTweets = () => {
//   const filteredData = data.filter((dataItems) => 
//   dataItems.content.tweet.includes(searchInput.value))
//   tweetsBlock.innerHTML = filteredData;
// }

// const renderEmpty = () => {

// }

// const renderFilteredTweets = () => {
    
    
    
//     initEventTweets()
// }


// VENTANA MODAL FUNCIONA

const initModalWindowEvents = () => {
  const tweetWindowButton = document.querySelector(".new_tweet_modal");
  const modalWindow = document.querySelector(".modal_window");
  const closeButton = document.querySelector(".button_close");

  tweetWindowButton.addEventListener("click", () => {
    modalWindow.classList.add("opened");
  });

  closeButton.addEventListener("click", () => {
    modalWindow.classList.remove("opened");
  });

  window.addEventListener("keyup", (ev) => {
    if (ev.key == "Escape") {
      modalWindow.classList.remove("opened");
    }
  });
};