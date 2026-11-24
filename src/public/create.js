document.getElementById('form').addEventListener('submit', async(e)=>{
    e.preventDefault()
    const btn = document.getElementById('btn')
    btn.disabled = true
    const token = localStorage.getItem('token')
    const res = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            price: document.getElementById('price').value,
            description: document.getElementById('description').value,
            category_id: document.getElementById('category_id').value
        })
    })
    const data = await res.json()
    btn.disabled = false
    if(res.status === 201){
        alert('Создано!')
        document.getElementById('form').reset()
    } else {
        alert(data.error)
    }
})
