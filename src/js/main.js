// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import { Modal } from 'bootstrap'

import { getUsers } from './users.js'
import { $, getData, setData } from './helpers.js'
import { Todo } from './constructors.js'
import { buildModalAddTodoTemplate, buildModalEditTodoTemplate } from './templates.js'
import { renderCards } from './renders.js'

// Variables
const data = getData()

const dataTodo = []
const dataProgress = []
const dataDone = []
let dataUsers = []

let todoIdEdit = ''

const todoListElement = $('#todoList')
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

// Init
getUsers()
  .then((data) => dataUsers = structuredClone(data))

divideData()

renderCards(data, todoListElement)

function divideData() {
  data.forEach(item => {
    if (item.status == 'todo') {
      dataTodo.push(item)
    } else if (item.status == 'progress') {
      dataProgress.push(item)
    } else if (item.status == 'done') {
      dataDone.push(item)
    }
  })
}

// Listeners
window.addEventListener('beforeunload', handleBeforeUnload)

buttonAddTodoElement.addEventListener('click', handleClickAddTodo)
formAddTodoElement.addEventListener('submit', handleSubmitAddForm)
formEditTodoElement.addEventListener('submit', handleSubmitEditForm)

allCardsListElement.addEventListener('click', handleClickDelete)
allCardsListElement.addEventListener('click', handleClickEdit)

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
  renderCards(data, todoListElement)
  // renderCounters(data, countersWrapperElement)
  divideData()

  modalAddTodoInstance.hide()
  formAddTodoElement.reset()
}

function handleClickDelete(event) {
  const { target } = event
  const { role, id } = target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)
    renderCards(data, todoListElement)
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

  renderCards(data, todoListElement)
  // renderCounters(data, countersWrapperElement)

  modalEditTodoInstance.hide()
  formEditTodoElement.reset()
}

function handleBeforeUnload() {
  data = []
  data = dataTodo.concat(dataProgress).concat(dataDone)
  setData(data)
}
