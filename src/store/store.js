class Store {
    constructor() {
      this.state = {
        users: null,
        posts: null,
        isLoading: false,
        isLoadingUsers: false,
        editingId: null,
        isAddPostLoading: false,
        error: null,
        errorLoadingUsersList: null,
        errorLoadingUsersPosts: null,
        errorCreatingPost: null,
        errorDeletingPost: null,
        isDeletePostLoading: false,
        isUpdatePostLoading: false,
        errorUpdatedPost: null,
      };
      this.listeners = [];
    }
    getState() {
        return { ...this.state };
      }
    
      setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
      }
    
      subscribe(listener) {
        if (!this.listeners.includes(listener)) {
          this.listeners.push(listener);
        }
      }
    
      notify() {
        this.listeners.forEach((listener) => listener(this.state));
      }
    }

    export const store = new Store();