import { buildTodoTemplate } from './templates.js'

function renderCards(collection, wrapperTodo, wrapperProgress, wrapperDone ) {
  let todoTemplates = ''
  let progressTemplates = ''
  let doneTemplates = ''

  collection.forEach((item) => {
    let template = ''

    switch (item.status) {
      case 'todo':
        template = buildTodoTemplate(item)
        todoTemplates += template
        break

      case 'progress':
        template = buildTodoTemplate(item)
        progressTemplates += template
        break

      case 'done':
        template = buildTodoTemplate(item)
        doneTemplates += template
        break
    }
  })

  wrapperTodo.innerHTML = todoTemplates
  wrapperProgress.innerHTML = progressTemplates
  wrapperDone.innerHTML = doneTemplates
}

export { renderCards }
