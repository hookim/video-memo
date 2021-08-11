let memos = JSON.parse(localStorage.getItem('memos'))     // get memos from local storage
if (memos === null)  memos = []
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

memos.forEach((memo) => {
    renderMemo(memo)
})


document.querySelector('#create').addEventListener('click', ( ) => {
    
    const newMemo = new memo(uuidv4())                      // create new memo object for local storage
    
    memos.push(newMemo)                                    // push new memo to the current memo array
    localStorage.setItem('memos',JSON.stringify(memos))

    renderMemo(newMemo)
    
    
})