class memo {
    constructor(hash, title = "Untitled", body = {}, link = "", videoId = "") {
        this.title = title
        this.body = body
        this.hash = hash
        this.link = link
        this.videoId = videoId
    }
}

const getMemos = () => {
    const storedMemos = JSON.parse(localStorage.getItem('memos'))
    if (storedMemos === null) return []
    else return storedMemos
}

const renderMemo = (memos) => {
    const display = document.querySelector('#display')

    display.innerHTML = ''                                // Clear the outdated rendered lists

    memos.forEach((memo) => {
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
            memos.splice(idx, 1)
            localStorage.setItem('memos', JSON.stringify(memos))

            renderMemo(memos)
        })
    })

}

const renderVideo = (memo) => {
    if (memo.link === "");
    else {
        document.querySelector('#link').value = memo.link
        document.querySelector('#video-player').setAttribute('src', memo.link)
    }

}