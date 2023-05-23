// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import { Modal } from 'bootstrap'

import { $, getData, setData, render } from './helpers.js'
import { Todo } from './constructors.js'
import { buildTodoTemplate, buildModalAddTodoTemplate, buildModalEditTodoTemplate } from './templates.js'

// Variables
let data = getData()
// let dataTodo = []

const todoListElement = $('#todoList')

const modalAddTodoElement = $('#modalAddTodo')
const modalAddTodoInstance = Modal.getOrCreateInstance(modalAddTodoElement)
const modalAddTodoContentElement = $('#formAddTodoContent')
const buttonAddTodoElement = $('#buttonAddTodo')
const formAddTodoElement = $('#formAddTodo')

// const modalEditTodoElement = $('#modalEditTodo')
// const modalEditTodoInstance = Modal.getOrCreateInstance(modalEditTodoElement)
// const modalAddEditContentElement = $('#formAddTodoContent')
// const buttonEditTodoElement = $('#buttonAddTodo')
// const formEditTodoElement = $('#formAddTodo')

// Init
// data.forEach((item) => {
//   if (item.status == 'todo') {
//     dataTodo += item
//   }
// })

// render(data, listElement)
// renderCounters(data, countersWrapperElement)

// Listeners
buttonAddTodoElement.addEventListener('click', handleClickAddTodo)
formAddTodoElement.addEventListener('submit', handleSubmitForm)

// buttonEditTodoElement.addEventListener('click', handleClickAddTodo)
// formEditTodoElement.addEventListener('submit', handleSubmitForm)

// Handlers
function handleClickAddTodo() {
  modalAddTodoContentElement.innerHTML = buildModalAddTodoTemplate()
  modalAddTodoInstance.show()
}

function handleSubmitForm(event) {
  event.preventDefault()

  const title = $('#inputTitle').value
  const description = $('#inputDescription').value
  const user = $('#selectUser').value
  const todo = new Todo(title, description, user)

  data.push(todo)
  render(data, todoListElement)
  // renderCounters(data, countersWrapperElement)

  formAddTodoElement.reset()
}

console.log(data)
