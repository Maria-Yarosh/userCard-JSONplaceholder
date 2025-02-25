import { actions } from "../store/actions"

export const PostForm = (userId) => {
    const formContainer = document.createElement('div')
    formContainer.className = 'form-container'

    const formInput = document.createElement('input')
    formInput.className = 'form-input'
    formInput.placeholder = 'Заголовок поста'

    const formTextArea = document.createElement('textarea')
    formTextArea.className = 'form-textarea'
    formTextArea.placeholder = 'Текст поста'

    const formButton = document.createElement('button')
    formButton.className = 'form-button'
    formButton.textContent = 'Добавить пост'
    formButton.addEventListener('click', () => {
        if(!formInput.value && !formTextArea.value) {
            return
        } 
        actions.addPost(formInput.value, formTextArea.value, userId)
        formInput. value = ''
        formTextArea.value = ''
        console.log(formInput.value, formTextArea.value)
    })

    formContainer.append(formInput, formTextArea, formButton)

    return formContainer
}