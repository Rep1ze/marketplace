const nav = document.querySelector('.nav')

function getUser(){
    const token = localStorage.getItem('token')
    if(!token){
        return null
    }
    try {
        const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')
        const json = decodeURIComponent(
            atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2,'0')).join('')
        )
        const payload = JSON.parse(json)
        if(payload.exp * 1000 < Date.now()){
            localStorage.removeItem('token')
            return null
        }
        return payload
    } catch (err) {
        localStorage.removeItem('token')
        return null
    }
}

function makeLink(text,href,className){
    const a = document.createElement('a')
    a.textContent = text
    a.href = href
    if(className){
        a.className = className
    }
    return a
}

const user = getUser()
nav.replaceChildren()

if(user){
    const chip = document.createElement('span')
    const avatar = document.createElement('span')
    const email = document.createElement('span')
    const logout = document.createElement('button')

    chip.className = 'nav__user'
    avatar.className = 'nav__avatar'
    avatar.textContent = user.email[0].toUpperCase()
    email.textContent = user.email
    chip.append(avatar,email)

    logout.className = 'nav__logout'
    logout.textContent = 'Выйти'
    logout.addEventListener('click',()=>{
        localStorage.removeItem('token')
        window.location.href = '/'
    })

    nav.append(makeLink('Создать товар','/create'),chip,logout)
} else {
    nav.append(makeLink('Регистрация','/register'),makeLink('Войти','/login','nav__primary'))
}

nav.dataset.ready = 'true'
