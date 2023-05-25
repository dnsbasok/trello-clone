import { buildTodoTemplate, buildModalAddTodoTemplate, buildModalEditTodoTemplate } from './templates.js'

function renderCards(collection, wrapper) {
  let templates = ''
  collection.forEach((item) => {
    const template = buildTodoTemplate(item)
    templates += template
  })

  wrapper.innerHTML = templates
}

export { renderCards }
