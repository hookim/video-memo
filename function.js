class memo {
    constructor(hash , title = "Untitled", body = " "){
        this.title  = title
        this.body = body
        this.hash = hash
    }
}

const renderMemo = (memo) => {
    const list = document.createElement('div')
    const link = document.createElement('a')
    
    link.textContent = memo.title                        
    link.setAttribute('href', `/memo.html#${memo.hash}`) 

    list.appendChild(link)
    document.querySelector('#display').appendChild(list)
}

const getMemos = () => {
    const storedMemos = JSON.parse(localStorage.getItem('memos'))
    if (storedMemos === null) return []
    else return storedMemos
}