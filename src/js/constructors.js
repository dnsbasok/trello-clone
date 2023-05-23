function Todo (title, description, user) {
  this.id = crypto.randomUUID(),
  this.date = new Date().toISOString()
  this.title = title
  this.description = description
  this.user = user
  this.status = 'todo'
}

export { Todo }
