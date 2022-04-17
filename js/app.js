const profileBox = document.querySelector('.profile-box');
const notFoundStatus = document.querySelector('.not-found-status');
const searchBtn = document.querySelector('.search-box button');
const profileImg = document.querySelector('.profile-img img');
const nameUser = document.querySelector('.profile-info .name');
const joinedDate = document.querySelector('.profile-info .joined');
const username = document.querySelector('.profile-info .username');
const bio = document.querySelector('.profile-info .bio');
const repos = document.querySelector('.repos p');
const followers = document.querySelector('.followers p');
const following = document.querySelector('.following p');
const userLocation = document.querySelector('.location');
const blog = document.querySelector('.blog');
const company = document.querySelector('.company');
const twitter = document.querySelector('.twitter');
let userBody;

function formatJoinedDate(userBodyDate) {
  return userBodyDate.slice(0, 10).split('-').reverse().join(' ');
}

function userInfoVerification(element, userBodyProperty) {
  if (userBody[userBodyProperty] || userBody[userBodyProperty] === 0) {
    element.innerText = userBody[userBodyProperty];
  } else {
    element.innerText = 'Not Available';
  }
}

async function searchUser(gitHubUsername) {
  const gitHubUserResponse = await fetch(
    `https://api.github.com/users/${gitHubUsername}`,
  );
  userBody = await gitHubUserResponse.json();

  profileBox.classList.add('active');

  if (!userBody.message) {
    userInfoVerification(nameUser, 'name');
    userInfoVerification(bio, 'bio');
    userInfoVerification(repos, 'public_repos');
    userInfoVerification(followers, 'followers');
    userInfoVerification(following, 'following');
    userInfoVerification(company, 'company');
    userInfoVerification(userLocation, 'location');

    username.innerText = `@${userBody.login}`;
    username.href = `https://github.com/${userBody.login}`;
    joinedDate.innerText = `Joined ${formatJoinedDate(userBody.created_at)}`;
    profileImg.src = userBody.avatar_url;

    if (userBody.blog) {
      blog.innerHTML = `<a href="${userBody.blog}">${userBody.blog}</a>`;
    } else {
      blog.innerText = 'Not Available';
    }
    if (userBody.twitter_username) {
      twitter.innerHTML = `<a href="https://twitter.com/${userBody.twitter_username}">@${userBody.twitter_username}</a>`;
    } else {
      twitter.innerText = 'Not Available';
    }
  } else {
    profileBox.classList.remove('active');
    notFoundStatus.classList.add('active');
  }
}

function onSearch() {
  const user = document.querySelector('.search-box input').value;
  notFoundStatus.classList.remove('active');
  searchUser(user);
}

searchBtn.addEventListener('click', onSearch);
