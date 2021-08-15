const currentHash = location.hash.substring(1)
const memos = getMemos()
const currentMemo = memos.find((memo) => {
    return memo.hash === currentHash
})

// youtube API after javascript code fully executes synchronously
// player can be used only by evenListener. 

let player
function onYouTubeIframeAPIReady() {
    player = new YT.Player('clip', {
        height: '390',
        width: '640',
        videoId: currentMemo.videoId,
        playerVars: {
            'playsinline': 1
        }
    });

    renderClipMemos(memos, currentMemo, player)

}

// About Title and Link display

document.querySelector('#title-display').textContent = currentMemo.title

document.querySelector('#title-input').value = currentMemo.title

document.querySelector('#title-update').addEventListener('click', (e) => {
    const titleDisplay = document.querySelector('#title-input')
    currentMemo.title = titleDisplay.value
    document.querySelector('#title-display').textContent = currentMemo.title
    localStorage.setItem('memos', JSON.stringify(memos))

})
document.querySelector('#link').value = currentMemo.link

//Link update

document.querySelector('#get-link').addEventListener('click', () => {
    //transform Link
    const link = document.querySelector('#link').value
    if (link.includes('embed'));
    else {
        forEmbedPlaceBefore = "com/"
        forEmbedPlaceAfter = "watch?v="
        embedIndexBefore = link.indexOf(forEmbedPlaceBefore) + forEmbedPlaceBefore.length
        embedIndexAfter = link.indexOf(forEmbedPlaceAfter) + forEmbedPlaceAfter.length

        const videoId = link.slice(embedIndexAfter)
        const newLink = link.slice(0, embedIndexBefore) + "embed/" + videoId

        document.querySelector('#link').value = ''
        document.querySelector('#link').value = newLink

        //save new Link and Id to the memo object
        currentMemo.link = newLink
        currentMemo.videoId = videoId
        localStorage.setItem('memos', JSON.stringify(memos))

        location.reload()
    }


})

//Back to main page

document.querySelector('#back').addEventListener('click', () => {
    location.assign('index.html')
})


document.querySelector('#create-memo').addEventListener('click', () => {
    const time = Math.round(player.getCurrentTime())
    const newBody = [time, ""]
    currentMemo.body.push(newBody)
    setMemos(memos)

    renderClipMemo(memos, currentMemo, newBody, player)
})