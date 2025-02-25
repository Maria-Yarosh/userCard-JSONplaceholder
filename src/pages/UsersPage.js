import {actions} from '../store/actions'
import {store} from '../store/store'
import { UserCard } from '../components/UserCard';

export const UsersPage = () => {
    console.log('UserPage call')
    const usersContainer = document.createElement("div");
    usersContainer.className = "users-container";
  
    actions.fetchUsers();
  
    store.subscribe((state) => {
      if (state.users) {
        usersContainer.innerHTML = "";
        console.log(state.user)
        state.users.forEach((user) => {
          usersContainer.append(UserCard({ user }));
        });
      }
    });
  
    return usersContainer;
  };
  