const baseUrl = "https://jsonplaceholder.typicode.com";

const store = {
  state: {
    users: null,
    isLoadingUserList: false,
    errorUsers: null,
    posts: null,
    isLoadingPosts: false,
    errorPosts: null,
  },

  listeners: [],

  getState() {
    return { ...this.state };
  },

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  },

  subscribe(listener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  },

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  },
};

const app = document.getElementById("app");
const usersListPage = document.createElement("div");
const postPage = document.createElement("div");
const usersListContainer = document.createElement("div");
usersListContainer.id = "users-container";
usersListContainer.className = "users-container";
usersListPage.appendChild(usersListContainer);

const userPostContainer = document.createElement("div");
userPostContainer.id = "posts-container";
postPage.append(userPostContainer);
app.append(usersListPage, postPage);

const userCard = (user) => {
  const div = document.createElement("div");
  //div.textContent = user.name
  div.className = "user-card";

  const avatar = document.createElement("div");
  avatar.className = "user-avatar";
  avatar.textContent = user.name.charAt(0);

  const name = document.createElement("h2");
  name.className = "user-name";
  name.textContent = user.name;

  const username = document.createElement("p");
  username.className = "user-username";
  username.textContent = `@${user.username}`;

  const info = document.createElement("div");
  info.className = "user-info";

  const infoItems = [
    { icon: "📧", text: user.email },
    { icon: "📱", text: user.phone },
    { icon: "🌐", text: user.website },
    { icon: "🏢", text: user.company.name },
  ];

  infoItems.forEach(({ icon, text }) => {
    const infoItem = document.createElement("div");
    infoItem.className = "info-item";

    const iconSpan = document.createElement("span");
    iconSpan.className = "info-icon";
    iconSpan.textContent = icon;

    const textSpan = document.createElement("span");
    textSpan.textContent = text;

    infoItem.appendChild(iconSpan);
    infoItem.appendChild(textSpan);
    info.appendChild(infoItem);
  });
  div.append(avatar, name, username, info);
  div.addEventListener("click", () => {
    navigate(`/post/${user.id}`);
  });
  return div;
};

const postCard = (post) => {
  const div = document.createElement("div");
  div.className = "post";
  const title = document.createElement("p");
  const body = document.createElement("p");
  title.className = "post-title";
  body.className = "post-body";

  title.textContent = post.title;
  body.textContent = post.body;

  div.append(title, body);

  return div;
};

const render = (state) => {
  console.log("render call", state, store.getState());
  //app.innerHTML = ''
  if (state.users) {
    //postPage.innerHTML = "";
    state.users.forEach((user) => {
      //const content = userCard(user)
      usersListContainer.append(userCard(user));
    });
  }
  if (state.posts) {
    usersListPage.innerHTML = "";
    state.posts.forEach((post) => {
      userPostContainer.append(postCard(post));
    });
  }
};

store.subscribe(render);

async function fetchUsersList() {
  store.setState({
    ...store.getState(),
    isLoadingUserList: true,
  });
  try {
    const response = await fetch(`${baseUrl}/users`);
    const users = await response.json();
    store.setState({
      ...store.getState(),
      users: users,
      isLoadingUserList: false,
    });
    console.log(store.getState());
  } catch (error) {
    store.setState({
      ...store.getState(),
      errorUsers: "Ошибка",
      isLoadingUserList: false,
    });
  }
}

async function fetchUserPostsList(id) {
  store.setState({
    ...store.getState(),
    isLoadingPosts: true,
  });
  try {
    const response = await fetch(`${baseUrl}/posts?userId=${id}`);
    const posts = await response.json();
    store.setState({
      ...store.getState(),
      posts: posts,
      isLoadingPosts: false,
    });
  } catch (error) {
    store.setState({
      ...store.getState(),
      errorPosts: "Ошибка",
      isLoadingPosts: false,
    });
  }
}

const renderUsersListPage = () => {
  fetchUsersList();
};

const renderUserPostsListPage = (id) => {
  fetchUserPostsList(id);
};

function router() {
  const path = window.location.pathname;
  console.log("router call");
  if (path === "/") {
    store.setState({ ...store.getState(), posts: null });
    renderUsersListPage();
  } else if (path.startsWith("/post/")) {
    store.setState({ ...store.getState(), users: null });
    const userId = path.split("/")[2];
    renderUserPostsListPage(userId);
  }
}
window.onpopstate = router;

router();
function navigate(path) {
  history.pushState(null, null, path);
  router();
}
