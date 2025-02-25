import { actions } from "../store/actions";
import { store } from '../store/store'

export const PostCard = (post) => {
    const isDeletePostLoading = store.getState().isDeletePostLoading
    const isEditing = store.getState().editingId === post.id
    const isAddPostLoading = store.getState().isAddPostLoading
    const card = document.createElement("div");
    card.className = "post";

    const renderEditForm = () => {
      const editForm = document.createElement("form");
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "post-actions";

    const titleInput = document.createElement("input");
    titleInput.className = "form-input";
    titleInput.value = post.title;

    const bodyInput = document.createElement("textarea");
    bodyInput.className = "form-textarea";
    bodyInput.value = post.body;

    const saveButton = document.createElement("button");
    saveButton.className = "post-button edit-button";
    saveButton.type = "button";

    if (isAddPostLoading) {
      const spinnerContainer = document.createElement("div");
      spinnerContainer.className = "button-spinner";
      const spinner = document.createElement("div");
      spinner.className = "spinner";
      spinnerContainer.appendChild(spinner);
      saveButton.appendChild(spinnerContainer);
      saveButton.appendChild(document.createTextNode("Загрузка..."));
    } else {
      saveButton.textContent = "Сохранить";
    }

    const cancelButton = document.createElement("button");
    cancelButton.className = "post-button delete-button";
    cancelButton.textContent = "Отменить";
    cancelButton.type = "button";

    saveButton.addEventListener("click", () => {
      const updatedPost = {
        titleInputValue: titleInput.value,
        bodyInputValue: bodyInput.value,
      };
      actions.updatePost(post, updatedPost);
    });

    cancelButton.addEventListener("click", () => {
      actions.cancelEditing();
    });
    console.log(store.getState().posts)

    actionsDiv.append(saveButton, cancelButton);
    editForm.append(titleInput, bodyInput, actionsDiv);
    return editForm;
    }

   const renderView = () => {
    const container = document.createElement('div')
    const title = document.createElement("p");
    const body = document.createElement("p");
    title.className = "post-title";
    body.className = "post-body";
    const btnDeletePost = document.createElement('button')
    const btnEditPost = document.createElement('button')
    btnDeletePost.className = 'post-button delete-button'
    btnEditPost.className = 'post-button edit-button'
    btnDeletePost.textContent = 'Удалить'
    btnEditPost.textContent = 'Редактировать'
    const actionsDiv = document.createElement('div')
    actionsDiv.className = 'post-actions'
    btnDeletePost.addEventListener('click', () => {
        actions.deletePost(post.id)
    })
    btnDeletePost.className = isDeletePostLoading ? 'delete-button-disabled post-button delete-button' : 'post-button delete-button'

    btnEditPost.addEventListener('click', () => actions.setEditingPost(post.id))

    actionsDiv.append(btnEditPost, btnDeletePost)
    
    title.textContent = post.title;
    body.textContent = post.body;
    container.append(title, body, actionsDiv)
    return container
   }
   

  
    card.append(isEditing ? renderEditForm() : renderView());
  
    return card;
  }