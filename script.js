let $btn = document.querySelector('button')
let $game = document.querySelector('.game')
let $time = document.querySelector('#time')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $gameTime = document.querySelector('#game-time')
let $tapped = document.querySelector('#tapped')
let $app = document.querySelector('.app')
let $loginName = document.querySelector('.loginName')
let $userName = document.querySelector('#userName')
let $listOfUsers = document.querySelector('.listOfUsers')


let score = 0
let person = {}
let list = []

$btn.addEventListener('click', start)


function start() {
    score = 0
    $btn.classList.add("hide")
    $game.style.backgroundColor = "white"
    timer()
    createBox()
    $resultHeader.classList.add('hide')
    $timeHeader.classList.remove('hide')
    $gameTime.setAttribute('disabled', 'true')
    setTime()
}

$gameTime.addEventListener('input', setTime)


function setTime() {
    $time.textContent = $gameTime.value
    $resultHeader.classList.add('hide')
    $timeHeader.classList.remove('hide')
}

function timer() {
    let interval = setInterval(function () {
        $time.textContent = (Number($time.textContent) - 0.1).toFixed(1)
        if ($time.textContent == 0.0) {
            clearInterval(interval)
            gameEnd()

        }
    }, 100)
}

$game.addEventListener('click', clicked)
function clicked(event) {
    if (event.target.dataset.box) {
        createBox()
        score++
    }
}

function gameEnd() {
    $game.style.backgroundColor = "#ccc"
    $btn.classList.remove('hide')
    $game.innerHTML = ""
    $result.textContent = score
    $resultHeader.classList.remove('hide')
    $timeHeader.classList.add('hide')
    $gameTime.removeAttribute('disabled')
    saveResult()
}


function setItem(){
    let person = {}
    person.name = $userName.value
}
 

function showUsers() {
    let data = getData()
    data.sort(function(a,b){
        return a.score > b.score ? -1 : 1
    })
    $listOfUsers.innerHTML = ""
    data.forEach(function(element, index){
        if (index > 9){
            return true
        }
        $listOfUsers.insertAdjacentHTML('beforeend',
        `<div class="user">
            <h1>
                ${element.name}
                -------
                ${element.score}
            </h1>
        </div>`)
    });
}



function saveResult() {
    person.name = $userName.value
    person.score = score
    list = getData()
    list.push(person)
    postData(list)
    showUsers()
}


function postData(list) {
    localStorage.setItem('list', JSON.stringify(list))
}

function getData() {
    return JSON.parse(localStorage.getItem('list'))
}

function createBox() {
    $game.innerHTML = ""
    let box = document.createElement('div')

    let size = getRandom(30, 100)
    let top = getRandom(0, 300 - size)
    let left = getRandom(0, 300 - size)

    box.style.width = box.style.height = size + "px"
    box.style.backgroundColor = `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 254)})`
    box.style.position = 'absolute'
    box.style.cursor = "pointer"
    box.style.top = top + "px"
    box.style.left = left + "px"
    box.setAttribute('data-box', true)

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
}


$tapped.addEventListener('click', function () {
    $app.classList.remove('hide')
    $loginName.classList.add('hide')
    showUsers()
})

