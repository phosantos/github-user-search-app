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

function clear() {
  profileImg.src = "";
  nameDisplay.innerText = "--";
  joined.innerText = "--";
  username.innerText = "--";
  bio.innerText = "--";

  repos.innerText = "--";
  followers.innerText = "--";
  following.innerText = "--";

  locationDisplay.innerText = "Not Available";
  blog.innerText = "Not Available";
  company.innerText = "Not Available";
  twitter.innerText = "Not Available";
}

async function searchUser(gitHubUsername) {
  try {
    const gitHubUserResponse = await fetch(
      `https://api.github.com/users/${gitHubUsername}`
    );
    const userBody = await gitHubUserResponse.json();

    function joinedDate() {
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

    function handleInnerText(element, userBodyProperty) {
      if (userBody[userBodyProperty] != null) {
        element.innerText = userBody[userBodyProperty];
      } else {
        element.innerText = "Not Available";
      }
    }

    function handleInnerHTML(element, userBodyProperty, content) {
      if (userBody[userBodyProperty]) {
        element.innerHTML = content;
      } else {
        element.innerText = "Not Available";
      }
    }

    username.href = `https://github.com/${userBody.login}`;
    profileImg.src = userBody.avatar_url;

    joinedDate();

    handleInnerText(nameDisplay, "name");
    handleInnerText(bio, "bio");
    handleInnerText(repos, "public_repos");
    handleInnerText(followers, "followers");
    handleInnerText(following, "following");
    handleInnerText(company, "company");
    handleInnerText(locationDisplay, "location");

    handleInnerHTML(username, "login", `@${userBody.login}`);
    handleInnerHTML(
      blog,
      "blog",
      `<a href="${userBody.blog}">${userBody.blog}</a>`
    );
    handleInnerHTML(
      twitter,
      "twitter_username",
      `<a href="https://twitter.com/${userBody.twitter_username}">${userBody.twitter_username}</a>`
    );
  } catch (error) {
    console.log("USER NOT FOUND :/");
  }
}

function handleClick() {
  const user = document.querySelector(".search-box input").value;
  clear();
  searchUser(user);
}

searchBtn.addEventListener("click", handleClick);
