document.getElementById('form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    const btn = document.getElementById('btn')
    btn.disabled = true
    const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })
    const data = await res.json()
    btn.disabled = false
    if(res.status === 201){
        localStorage.setItem('token', data.token)
        window.location.href = '/'
    } else {
        alert(data.error)
    }
})
