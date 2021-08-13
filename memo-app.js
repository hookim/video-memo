const currentHash = location.hash.substring(1)
const memos = getMemos()
const currentMemo = memos.find((memo) => {
    return memo.hash === currentHash
})

//render Video

if (currentMemo.link !== ""){
    document.querySelector('#video-player').setAttribute('src' , currentMemo.link)
    document.querySelector('#link').value = currentMemo.link
}

document.querySelector('#title-display').textContent = currentMemo.title
document.querySelector('#title-input').value = currentMemo.title

document.querySelector('#title-update').addEventListener('click', (e) => {
    const titleDisplay = document.querySelector('#title-input')
    currentMemo.title = titleDisplay.value
    document.querySelector('#title-display').textContent = currentMemo.title
    localStorage.setItem('memos',JSON.stringify(memos))

})

document.querySelector('#get-link').addEventListener('click', () => {
    //transform Link
    const link = document.querySelector('#link').value
    if(link.includes('embed'));
    else{
        forEmbedPlaceBefore = "com/"
        forEmbedPlaceAfter = "watch?v="
        embedIndexBefore = link.indexOf(forEmbedPlaceBefore) + forEmbedPlaceBefore.length
        embedIndexAfter = link.indexOf(forEmbedPlaceAfter) + forEmbedPlaceAfter.length
        
        const newLink = link.slice(0,embedIndexBefore) + "embed/" + link.slice(embedIndexAfter)
        document.querySelector('#link').value = newLink
        
        //save new Link to the memo object
        currentMemo.link = newLink
        localStorage.setItem('memos',JSON.stringify(memos))
    }
    //render Video
    document.querySelector('#video-player').setAttribute('src' , currentMemo.link)

})


document.querySelector('#back').addEventListener('click', () => {
    location.assign('index.html')
})


