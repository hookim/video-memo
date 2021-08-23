class memo {
    constructor(hash, title = "Untitled", body = [], link = "", videoId = "") {
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

const setMemos = (memos) => {
    const memosJSON = JSON.stringify(memos)
    localStorage.setItem('memos', memosJSON)
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
        list.className = 'memos'
        button.className = 'buttons'
        link.className = 'links'

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
const secondToTime = (second) => {
    let timeString
    const min = Math.floor(second / 60)
    const sec = second % 60

    timeString = `${min}:`
    timeString += sec < 10 ? `0${sec}` : `${sec}`

    return timeString
}

const renderClipMemo = (memos, memo, curMemoBody, player) => {
    const clipMemo = document.querySelector('#clip-memo')

    const clipMemoContainer = document.createElement('div')
    const timestamp = document.createElement('button')
    const inputMemo = document.createElement('input')
    const deleteButton = document.createElement('button')

    clipMemoContainer.className = "memo-container"
    timestamp.textContent = secondToTime(curMemoBody[0])
    inputMemo.value = curMemoBody[1]
    inputMemo.size = 70
    deleteButton.textContent = 'X'

    clipMemoContainer.appendChild(timestamp)
    clipMemoContainer.appendChild(inputMemo)
    clipMemoContainer.appendChild(deleteButton)

    clipMemo.appendChild(clipMemoContainer)

    timestamp.addEventListener('click', () => {
        player.loadVideoById(memo.videoId, curMemoBody[0], "large")
    })

    inputMemo.addEventListener('change', (e) => {
        curMemoBody[1] = e.target.value
        setMemos(memos)
    })

    deleteButton.addEventListener('click', () => {
        const idx = memo.body.findIndex((memoBody) => {
            return memoBody[2] === curMemoBody[2]
        })
        memo.body.splice(idx, 1)
        setMemos(memos)
        document.querySelector('#clip-memo').innerHTML = ''
        for (let i = 0; i < memo.body.length; i++) {
            renderClipMemo(memos, memo, memo.body[i], player)
        }

    })

}

const renderClipMemos = (memos, memo, player) => {
    document.querySelector('#clip-memo').innerHTML = ''
    for (let i = 0; i < memo.body.length; i++) {
        renderClipMemo(memos, memo, memo.body[i], player)
    }
}

