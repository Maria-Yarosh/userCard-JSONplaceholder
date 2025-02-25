import {api} from '../servises/api'
import {store} from '../store/store'

export const actions = {
    async fetchUsers() {
        console.log('actions call')
        store.setState({ ...store.getState(), isLoadingUsers: true });
        try {
          const users = await api.fetchUsers();
          console.log(users)
          store.setState({
            ...store.getState(),
            users: users,
          });
          console.log(store.getState())
        } catch (error) {
          store.setState({
            ...store.getState(),
            errorLoadingUsersList: error,
          });
        } finally {
          store.setState({
            ...store.getState(),
            isLoadingUsers: false,
          });
        }
    },

    async fetchPosts(userId) {
        store.setState({ ...store.getState(), isAddPisAddPostLoading: true })
        try {
            const posts = await api.fetchPosts(userId)
            store.setState({
                ...store.getState(),
                posts: posts,
            })
        } catch (error) {
            store.setState({
                ...store.getState(),
                errorLoadingUsersPosts: error,
            })
        } finally {
            store.setState({
                ...store.getState(),
                isAddPisAddPostLoading: false,
            })
        }
    },

    async addPost(title, body, userId) {
      store.setState({ ...store.getState(), isAddPostLoading: true })
        try {
            const newPost = await api.createPost(title, body, userId)
            store.setState({
                ...store.getState(),
                posts: [...store.getState().posts, newPost],
            })
        } catch (error) {
            store.setState({
                ...store.getState(),
                errorCreatingPost: error,
            })
        } finally {
            store.setState({
                ...store.getState(),
                isAddPostLoading: false,
            })
        }
    },

    async deletePost(postId) {
      store.setState({...store.getState(), isDeletePostLoading: true })
      try {
        const response = await api.deletePost(postId)
        if(response.ok) {
          store.setState({
            ...store.getState(),
            posts: store.getState().posts.filter((post) => postId !== post.id),
        })
        }
    } catch (error) {
        store.setState({
            ...store.getState(),
            errorDeletingPost: error,
        })
    } finally {
        store.setState({
            ...store.getState(),
            isDeletePostLoading: false,
        })
    }
    },
    setEditingPost(postId) {
      store.setState({...store.getState(), editingId: postId })
    },
    cancelEditing(postId) {
      store.setState({...store.getState(), editingId: null})
    },

    async updatePost(post, newPost) {
      const { titleInputValue, bodyInputValue } = newPost
      const { id, userId } = post
      const updatedPost = {...post, title: titleInputValue, body: bodyInputValue}
      store.setState({
        ...store.getState(), 
        isUpdatePostLoading: true,
        posts: store.getState().posts.map((item) => {
          if(id === item.id) {
            return {
              ...item, 
              ...updatedPost,
            }
          }
          return item
        })
      })
      try {
        const updatedPost = await api.updatePost(id, titleInputValue, bodyInputValue, userId)
        if (Object.keys(updatedPost).length === 0) {
          console.log('try1')
          store.setState({
            ...store.getState(),
            posts: store.getState().posts.map((p) => (p.id === post.id ? post : p)),
          });
        }
    } catch (error) {
      console.log('catch!')
        store.setState({
            ...store.getState(),
            errorUpdatedPost: error,
            post: store.getState().posts.map((item) => {
              if(id === item.id) {
                return {
                  ...post,
                }
              }
              return item
            })
        })
    } finally {
        store.setState({
            ...store.getState(),
            isUpdatePostLoading: false,
            editingId: null,
        })
        console.log('finally')
    }
    },
}
