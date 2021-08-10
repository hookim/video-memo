document.querySelector('#create').addEventListener('click', ( ) => {
    const list = document.createElement('div')
    const link = document.createElement('a')
    
    link.textContent = "Hello"
    link.setAttribute('href', '/memo.html')

    list.appendChild(link)
    document.querySelector('#display').appendChild(list)
})