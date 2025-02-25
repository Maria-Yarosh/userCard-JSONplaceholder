import {store} from '../store/store'
import { UsersPage } from '../pages/UsersPage';
import { PostPage } from '../pages/PostPage';

const app = document.getElementById('app')

export function router() {
    const path = window.location.pathname;
    console.log("router call");
    app.innerHTML = ''
    if (path === "/") {
      store.setState({ ...store.getState(), posts: null });
      app.appendChild(UsersPage())
    } else if (path.startsWith("/posts/")) {
      store.setState({ ...store.getState(), users: null });
      const userId = path.split("/")[2];
      console.log(userId)
      app.appendChild(PostPage(userId))
    }
  }
  window.onpopstate = router;
  
  export function navigate(path) {
    history.pushState(null, null, path);
    router();
  }
  