import { buildTodoTemplate } from './templates.js'

function $ (selector) {
  return document.querySelector(selector)
}

function getData () {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData (source) {
  localStorage.setItem('data', JSON.stringify(source))
}

function render (collection, wrapper) {
  let templates = ''
  collection.forEach((item) => {
    const template = buildTodoTemplate(item)

    templates +=template
  })

  wrapper.innerHTML = templates
}

export { $, getData, setData, render }
