document.getElementById('form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    const btn = document.getElementById('btn')
    btn.disabled = true
    const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    const data = await res.json()
    btn.disabled = false
    if(res.ok){
        localStorage.setItem('token', data.token)
        window.location.href = '/'
    } else {
        alert(data.error)
    }
})
