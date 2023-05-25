function $ (selector) {
  return document.querySelector(selector)
}

function getData () {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData (source) {
  localStorage.setItem('data', JSON.stringify(source))
}

export { $, getData, setData }
