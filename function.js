class memo {
    constructor(hash , title = "Untitled", body = " "){
        this.title  = title
        this.body = body
        this.hash = hash
    }
}

const getMemos = () => {
    const storedMemos = JSON.parse(localStorage.getItem('memos'))
    if (storedMemos === null) return []
    else return storedMemos
}

const renderMemo = (memo) => {
    const display = document.querySelector('#display')
    const list = document.createElement('div')
    const link = document.createElement('a')
    const button = document.createElement('button')
    
    link.textContent = memo.title                        
    link.setAttribute('href', `/memo.html#${memo.hash}`) 
    button.textContent = 'x'

    list.appendChild(link)
    list.appendChild(button)
    display.appendChild(list)

    button.addEventListener('click', () => {            // Button for delete
        const memos = getMemos()
        const idx = memos.findIndex((mm) => {
            return mm.hash === memo.hash
        })
        display.removeChild(list)
        memos.splice(idx,1)
        localStorage.setItem('memos', JSON.stringify(memos))
        display.textContent = ''                        // Clear the outdated rendered lists
        memos.forEach((memo) => {
            renderMemo(memo)
        })
    })
}