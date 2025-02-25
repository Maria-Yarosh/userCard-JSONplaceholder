import { navigate } from "../router/router"

export const BackBtn = () => {
    const btn = document.createElement('button')
    btn.className = 'back-button'
    btn.textContent = 'назад'
    btn.addEventListener('click', () => {navigate("/")})

    return btn
}