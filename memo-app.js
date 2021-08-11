const currentHash = location.hash.substring(1)
const memos = getMemos()
const currentMemo = memos.find((memo) => {
    return memo.hash === currentHash
})

document.querySelector('#title-display').textContent = currentMemo.title

document.querySelector('#title-update').addEventListener('click', (e) => {
    const titleDisplay = document.querySelector('#title-input')
    currentMemo.title = titleDisplay.value
    document.querySelector('#title-display').textContent = currentMemo.title
    localStorage.setItem('memos',JSON.stringify(memos))

})

document.querySelector('#back').addEventListener('click', () => {
    location.assign('index.html')
})
