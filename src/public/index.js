const container = document.getElementById('products')

fetch('/api/v1/products')
    .then(res => res.json())
    .then(products => {
        if(products.length === 0){
            container.innerHTML = '<div class="empty">Пока нет ни одного товара. <a href="/create.html">Создайте первый</a></div>'
            return
        }
        products.forEach(product => {
            const card = document.createElement('article')
            const name = document.createElement('h2')
            const description = document.createElement('p')
            const price = document.createElement('span')
            card.className = 'card'
            name.className = 'card__name'
            description.className = 'card__desc'
            price.className = 'price'
            name.textContent = product.name
            description.textContent = product.description || 'Без описания'
            price.textContent = Number(product.price).toLocaleString('ru-RU') + ' ₽'
            card.append(name,description,price)
            container.append(card)
        })
    })
    .catch(() => {
        container.innerHTML = '<div class="empty">Не удалось загрузить товары. Проверьте, что сервер запущен.</div>'
    })
