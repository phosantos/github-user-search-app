const searchBtn = document.querySelector(".search-box button");

const profileImg = document.querySelector(".profile-img img");
const nameDisplay = document.querySelector(".profile-info .name");
const joined = document.querySelector(".profile-info .joined");
const username = document.querySelector(".profile-info .username");
const bio = document.querySelector(".profile-info .bio");

const repos = document.querySelector(".repos p");
const followers = document.querySelector(".followers p");
const following = document.querySelector(".following p");

const locationDisplay = document.querySelector(".location");
const blog = document.querySelector(".blog");
const company = document.querySelector(".company");
const twitter = document.querySelector(".twitter");

async function searchUser(gitHubUsername) {
  const gitHubUserResponse = await fetch(
    `https://api.github.com/users/${gitHubUsername}`
  );
  const userBody = await gitHubUserResponse.json();

  profileImg.src = userBody.avatar_url;
  nameDisplay.innerText = userBody.name;
  username.innerText = "@" + userBody.login;
  username.href = `https://github.com/${userBody.login}`;

  repos.innerText = userBody.public_repos;
  followers.innerText = userBody.followers;
  following.innerText = userBody.following;

  if (userBody.bio) bio.innerText = userBody.bio;
  if (userBody.blog)
    blog.innerHTML = `<a href="${userBody.blog}">${userBody.blog}</a>`;
  if (userBody.company) company.innerText = userBody.company;
  if (userBody.twitter_username)
    twitter.innerHTML = `<a href="https://twitter.com/${userBody.twitter_username}">${userBody.twitter_username}</a>`;
  if (userBody.location) locationDisplay.innerText = userBody.location;

  const dateJoinedYear = userBody.created_at.slice(0, 4);
  const dateJoinedDay = userBody.created_at.slice(8, 10);
  const dateJoinedMonth = userBody.created_at.slice(6, 7);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  joined.innerText = `Joined ${dateJoinedDay} ${
    monthNames[dateJoinedMonth - 1]
  } ${dateJoinedYear}`;
}

function handleClick() {
  const user = document.querySelector(".search-box input").value;

  searchUser(user);
}

searchBtn.addEventListener("click", handleClick);
