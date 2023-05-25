// card template
function buildTodoTemplate(todo) {
  const date = new Date(todo.date).toLocaleString()

  return `
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex align-items-top justify-content-between">
          <h5 class="card-title m-0 w-75">${todo.title}</h5>

          <div class="dropdown">
            <button class="btn btn-outline-dark p-0 pb-1 border-0" type="button" data-bs-toggle="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-three-dots-vertical" viewbox="0 0 16 16">
                <path
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </button>
            <ul class="dropdown-menu">
              <li>
                <select data-role="status" data-id="${todo.id}" class="form-select border-0 px-3">
                  <option>Select status</option>
                  <option value="todo">Todo</option>
                  <option value="progress">In progress</option>
                  <option value="done">Done</option>
                </select>
              </li>
              <li><button data-role="edit" data-id="${todo.id}" class="dropdown-item" href="#">Edit</button></li>
              <li><button data-role="delete" data-id="${todo.id}" class="dropdown-item text-danger" href="#">Delete</button></li>
            </ul>
          </div>

        </div>
        <p class="card-text mt-3 w-75">${todo.description}</p>
        <h6 class="m-0">${todo.user}</h6>
      </div>
      <div class="card-footer text-body-secondary">
        <time class="text-muted ms-auto">${date}</time>
      </div>
    </div>
  `
}

// modal add todo template
function buildModalAddTodoTemplate(collection) {
  let templates = ''
  collection.forEach((item) => {
    const template = `<option value="${item.name}">${item.name}</option>`
    templates += template
  })

  return `
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Title</label>
      <input id="inputAddTitle" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Description</label>
      <input id="inputAddDescription" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">User</label>
      <select id="selectAddUser" class="form-select mb-2" aria-label="Default select example">
        ${templates}
      </select>
    </div>
  `
}

// modal edit todo template
function buildModalEditTodoTemplate(todo, collection) {
  let templates = ''
  collection.forEach((item) => {
    let template = ''
    if (item.name == todo.user) {
      template = `<option id="selectEditUser" value="${item.name}" selected>${item.name}</option>`
    } else {
      template = `<option value="${item.name}">${item.name}</option>`
    }
    templates += template
  })

  return `
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Title</label>
      <input id="inputEditTitle" value="${todo.title}" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Description</label>
      <input id="inputEditDescription" value="${todo.description}" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">User</label>
      <select id="selectEditUser" class="form-select mb-2" aria-label="Default select example">
        ${templates}
      </select>
    </div>
  `
}

function buildAlertProgressTemplate() {
  return `
    <div id="alertProgress" class="alert alert-warning fixed-bottom w-75 m-auto mb-3 text-center" role="alert">
      Too many tasks in progress..
    </div>
  `
}

export { buildTodoTemplate, buildModalAddTodoTemplate, buildModalEditTodoTemplate, buildAlertProgressTemplate }
