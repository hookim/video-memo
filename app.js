const memos = getMemos()

renderMemo(memos)

document.querySelector('#create').addEventListener('click', ( ) => {
    
    const newMemo = new memo(uuidv4())                      // create new memo object for local storage
    
    memos.push(newMemo)                                    // push new memo to the current memo array
    localStorage.setItem('memos',JSON.stringify(memos))

    renderMemo(memos)
    
    
})

