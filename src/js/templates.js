// card template
function buildTodoTemplate(todo) {
  const date = new Date(todo.date).toLocaleString()

  return `
    <div class="card mt-3">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <h5 class="card-title m-0 w-100">${todo.title}</h5>

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
                <select class="form-select border-0 px-3" aria-label="Default select example">
                  <option value="1">Todo</option>
                  <option value="2">In progress</option>
                  <option value="3">Done</option>
                </select>
              </li>
              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item text-danger" href="#">Delete</a></li>
            </ul>
          </div>

        </div>
        <p class="card-text mt-3">${todo.description}</p>
        <h6 class="m-0">${todo.user}</h6>
      </div>
      <div class="card-footer text-body-secondary">
        <time class="text-muted ms-auto">${date}</time>
      </div>
    </div>
  `
}

// modal add todo template
function buildModalAddTodoTemplate() {
  return `
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Title</label>
      <input id="inputTitle" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Description</label>
      <input id="inputDescription" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">User</label>
      <select id="selectUser" class="form-select mb-2" aria-label="Default select example">
        <option selected value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  `
}

// modal edit todo template
function buildModalEditTodoTemplate(todo) {
  return `
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Title</label>
      <input id="inputTitle" value="${todo.title}" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">Description</label>
      <input id="inputDescription" value="${todo.description}" type="text" class="form-control flex-grow-1" required>
    </div>
    <div class="d-flex align-items-center mb-2">
      <label class="text-muted me-2">User</label>
      <select id="selectUser" class="form-select mb-2" aria-label="Default select example">
        <option selected value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  `
}

export { buildTodoTemplate, buildModalAddTodoTemplate, buildModalEditTodoTemplate }
