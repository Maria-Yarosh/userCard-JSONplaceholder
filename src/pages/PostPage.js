import {actions} from '../store/actions'
import {store} from '../store/store'
import { PostCard } from '../components/PostCard';
import { BackBtn } from '../components/BackBtn';
import {PostForm} from '../components/PostForm'

export const PostPage = (userId) => {
    const postContainer = document.createElement("div");
    postContainer.id = "posts-container";
    console.log('post page render')
    const btn = BackBtn()
    const formContainer = PostForm(userId)
    const postSection = postContainer.querySelector('.post-section') || document.createElement("div")
    postSection.className = 'post-section'
    postContainer.append(btn)

    actions.fetchPosts(userId).then(() => {postContainer.appendChild(formContainer)})

    store.subscribe((state) => {
        const isDeletingPost = state.isDeletePostLoading
        if (state.posts) {
            postSection.innerHTML = "";
            state.posts.forEach((post) => {
            postSection.append(PostCard(post, state.isDeletePostLoading));
          });
          if (!postContainer.querySelector('.post-section')) {
            postContainer.appendChild(postSection)
          }
        }
    })

    return postContainer
}