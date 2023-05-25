// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import { Modal } from 'bootstrap'

import { getUsers } from './users.js'
import { $, getData, setData } from './helpers.js'
import { Todo } from './constructors.js'
import { buildModalAddTodoTemplate, buildModalEditTodoTemplate } from './templates.js'
import { renderCards, renderCounter } from './renders.js'

// Variables
let data = getData()

let dataUsers = []

let todoIdEdit = ''

const statusTodo = 'todo'
const statusProgress = 'progress'
const statusDone = 'done'

const todoListElement = $('#todoList')
const progressListListElement = $('#progressList')
const doneListElement = $('#doneList')
const allCardsListElement = $('#allCardsList')

const modalAddTodoElement = $('#modalAddTodo')
const modalAddTodoInstance = Modal.getOrCreateInstance(modalAddTodoElement)
const modalAddTodoContentElement = $('#formAddTodoContent')
const buttonAddTodoElement = $('#buttonAddTodo')
const formAddTodoElement = $('#formAddTodo')

const modalEditTodoElement = $('#modalEditTodo')
const modalEditTodoInstance = Modal.getOrCreateInstance(modalEditTodoElement)
const modalEditContentElement = $('#formEditTodoContent')
const formEditTodoElement = $('#formEditTodo')

const todoCounterElement = $('#todoCounter')
const progressCounterElement = $('#progressCounter')
const doneCounterElement = $('#doneCounter')

// Init
getUsers()
  .then((data) => dataUsers = structuredClone(data))

renderCards(data, todoListElement, progressListListElement, doneListElement)
renderCounter(data, statusTodo, todoCounterElement)
renderCounter(data, statusProgress, progressCounterElement)
renderCounter(data, statusDone, doneCounterElement)

// Listeners
window.addEventListener('beforeunload', handleBeforeUnload)

buttonAddTodoElement.addEventListener('click', handleClickAddTodo)
formAddTodoElement.addEventListener('submit', handleSubmitAddForm)
formEditTodoElement.addEventListener('submit', handleSubmitEditForm)

allCardsListElement.addEventListener('click', handleClickDelete)
allCardsListElement.addEventListener('click', handleClickEdit)
allCardsListElement.addEventListener('change', handleChangeStatus)

// Handlers
function handleClickAddTodo() {
  modalAddTodoContentElement.innerHTML = buildModalAddTodoTemplate(dataUsers)
  modalAddTodoInstance.show()
}

function handleSubmitAddForm(event) {
  event.preventDefault()

  const title = $('#inputAddTitle').value
  const description = $('#inputAddDescription').value
  const user = $('#selectAddUser').value
  const todo = new Todo(title, description, user)

  data.push(todo)
  renderCards(data, todoListElement, progressListListElement, doneListElement)
  renderCounter(data, statusTodo, todoCounterElement)
  renderCounter(data, statusProgress, progressCounterElement)
  renderCounter(data, statusDone, doneCounterElement)
  // renderCounters(data, countersWrapperElement)

  modalAddTodoInstance.hide()
  formAddTodoElement.reset()
}

function handleClickDelete(event) {
  const { target } = event
  const { role, id } = target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)
    renderCards(data, todoListElement, progressListListElement, doneListElement)
    renderCounter(data, statusTodo, todoCounterElement)
    renderCounter(data, statusProgress, progressCounterElement)
    renderCounter(data, statusDone, doneCounterElement)
  }
}

function handleClickEdit(event) {
  const { target } = event
  const { role, id } = target.dataset

  const item = data.find(item => item.id == id)

  if (role == 'edit') {
    todoIdEdit = item.id
    modalEditContentElement.innerHTML = buildModalEditTodoTemplate(item, dataUsers)
    modalEditTodoInstance.show()
  }
}

function handleSubmitEditForm(event) {
  event.preventDefault()

  const item = data.find(item => item.id == todoIdEdit)

  item.title = $('#inputEditTitle').value
  item.description = $('#inputEditDescription').value
  item.user = $('#selectEditUser').value

  renderCards(data, todoListElement, progressListListElement, doneListElement)
  renderCounter(data, statusTodo, todoCounterElement)
  renderCounter(data, statusProgress, progressCounterElement)
  renderCounter(data, statusDone, doneCounterElement)
  // renderCounters(data, countersWrapperElement)

  modalEditTodoInstance.hide()
  formEditTodoElement.reset()
}

function handleChangeStatus(event) {
  const { target } = event
  const { role, id } = target.dataset

  const item = data.find(item => item.id == id)

  if (role == 'status') {
    switch (target.value) {
      case 'todo':
        item.status = 'todo'
        break

      case 'progress':
        if (renderCounter(data, statusProgress, progressCounterElement) <= 6) {
          item.status = 'progress'
        } else {

        }
        break

      case 'done':
        item.status = 'done'
        break
    }
  }

  renderCards(data, todoListElement, progressListListElement, doneListElement)
  renderCounter(data, statusTodo, todoCounterElement)
  renderCounter(data, statusProgress, progressCounterElement)
  renderCounter(data, statusDone, doneCounterElement)
}

function handleBeforeUnload() {
  setData(data)
}
