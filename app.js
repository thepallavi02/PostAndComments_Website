const postsBtn = document.getElementById('posts-btn');
const commentsBtn = document.getElementById('comments-btn');
const cardContainer = document.getElementById('card-container');


let currentTab = 'posts';
let currentIndex = 0;
let currentLimit = 20;
let isLoading = false;

const fetchCards = () => {
  isLoading = true;
  fetch(`https://jsonplaceholder.typicode.com/${currentTab}?_start=${currentIndex}&_limit=${currentLimit}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <div class="card-header">${currentTab === 'posts' ? item.title : item.email}</div>
          <div class="card-body">${currentTab === 'posts' ? item.body : item.body}...</div>
        `;
        cardContainer.appendChild(card);
      });
      isLoading = false;
      currentIndex += currentLimit;
    });
};

const loadMore = () => {
  if (!isLoading) {
    fetchCards();
  }
};

postsBtn.addEventListener('click', () => {
  currentTab = 'posts';
  cardContainer.innerHTML = '';
  currentIndex = 0;
  fetchCards();
});

commentsBtn.addEventListener('click', () => {
  currentTab = 'comments';
  cardContainer.innerHTML = '';
  currentIndex = 0;
  fetchCards();
});


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight && !isLoading) {
      loadMore();
    }
  });

  
//   The scroll event is listened for on the window object.
//   The if statement checks if the user has scrolled to the bottom of the page by comparing the window.innerHeight (height of the browser window), window.pageYOffset (number of pixels scrolled from the top), and document.body.offsetHeight (height of the entire body element) properties.
//   If the user has scrolled to the bottom of the page and isLoading is false, the loadMore() function is called.  

fetchCards();
