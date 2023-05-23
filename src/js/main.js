// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import { Modal } from 'bootstrap'

import { $, getData, setData, render } from './helpers.js'
import { Todo } from './constructors.js'
import { buildModalAddTodoTemplate, buildModalEditTodoTemplate } from './templates.js'

// Variables
let data = getData()

let dataTodo = []
let dataProgress = []
let dataDone = []

data.forEach(item => {
	if (item.status == 'todo') {
		dataTodo.push(item)
	} else if (item.status == 'progress') {
    dataProgress.push(item)
  } else if (item.status == 'done') {
    dataDone.push(item)
  }
})

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
// render(data, listElement)
// renderCounters(data, countersWrapperElement)

// Listeners
buttonAddTodoElement.addEventListener('click', handleClickAddTodo)
formAddTodoElement.addEventListener('submit', handleSubmitAddForm)
formEditTodoElement.addEventListener('submit', handleSubmitEditForm)

allCardsListElement.addEventListener('click', handleClickDelete)
allCardsListElement.addEventListener('click', handleClickEdit)

// Handlers
function handleClickAddTodo() {
  modalAddTodoContentElement.innerHTML = buildModalAddTodoTemplate()
  modalAddTodoInstance.show()
}

function handleSubmitAddForm(event) {
  event.preventDefault()

  const title = $('#inputAddTitle').value
  const description = $('#inputAddDescription').value
  const user = $('#selectAddUser').value
  const todo = new Todo(title, description, user)

  data.push(todo)
  render(data, todoListElement)
  // renderCounters(data, countersWrapperElement)

  modalAddTodoInstance.hide()
  formAddTodoElement.reset()
}

function handleClickDelete (event) {
  const { target } = event
  const { role, id } = target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)
    render(data, todoListElement)
  }
}

let todoIdEdit = ''

function handleClickEdit (event) {
  const { target } = event
  const { role, id } = target.dataset

  const item = data.find(item => item.id == id)

  if (role == 'edit') {
    todoIdEdit = item.id
    modalEditContentElement.innerHTML = buildModalEditTodoTemplate(item)
    modalEditTodoInstance.show()
  }
}

function handleSubmitEditForm(event) {
  event.preventDefault()

  const item = data.find(item => item.id == todoIdEdit)

  item.title = $('#inputEditTitle').value
  item.description = $('#inputEditDescription').value
  item.user = $('#selectEditUser').value

  render(data, todoListElement)
  // renderCounters(data, countersWrapperElement)

  modalEditTodoInstance.hide()
  formEditTodoElement.reset()
}

console.log(data)
