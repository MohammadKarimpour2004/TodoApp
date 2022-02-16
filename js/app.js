let $ = document
const inputElem = $.getElementById('itemInput')
const addButton = $.getElementById('addButton')
const clearButton = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')

let todosArray = []

function addNewTodo() {
    if(inputElem.value == ""){
        alert("لطفا todo را وارد کنید :)")
    }else{
    let newTodoTitle = inputElem.value

    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle,
        complete: false
    }

    inputElem.value = ''

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)

    inputElem.focus()
}
}

function setLocalStorage(todosList) {
    localStorage.setItem('todos', JSON.stringify(todosList))
}

function todosGenerator(todosList) {

    let newTodoLiElem, newTodoLabalElem,divforbtn, newTodoCompleteBtn, newTodoDeleteBtn

    todoListElem.innerHTML = ''

    todosList.forEach(function (todo) {
        
        newTodoLiElem = $.createElement('li')
        newTodoLiElem.className = 'completed well'
        

        newTodoLabalElem = $.createElement('label')
        newTodoLabalElem.innerHTML = todo.title

        divforbtn = $.createElement('div')
        divforbtn.className = 'btnTodo'

        newTodoCompleteBtn = $.createElement('svg')
        //newTodoCompleteBtn.className = 'btn btn-success'
        newTodoCompleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg>`
        newTodoCompleteBtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')

        newTodoDeleteBtn = $.createElement('svg')
        newTodoDeleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="white" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
      </svg>`
        newTodoDeleteBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" class="bi bi-check-all" viewBox="0 0 16 16">
        <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
      </svg>`
        }

        divforbtn.append(newTodoCompleteBtn,newTodoDeleteBtn)

        newTodoLiElem.append(newTodoLabalElem,divforbtn)

        todoListElem.append(newTodoLiElem)
    })
}

function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}

function removeTodo(todoId) {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    todosArray = localStorageTodos

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })

    todosArray.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)
    todosGenerator(todosArray)

}

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }

    todosGenerator(todosArray)

}

function clearTodos() {
    todosArray = []
    todosGenerator(todosArray)
    // localStorage.clear()
    localStorage.removeItem('todos')
}


window.addEventListener('load', getLocalStorage)
addButton.addEventListener('click', addNewTodo)
clearButton.addEventListener('click', clearTodos)
inputElem.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        addNewTodo()
    }
})