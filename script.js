const modal = document.querySelector(".modal-container")
const tbody = document.querySelector('tbody')
const userName = document.querySelector('#m-name')
const userFunction = document.querySelector('#m-function')
const userSalary = document.querySelector('#m-salary')
const btnSave = document.querySelector('#btnSave')

let items
let id

function openModal (edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1){
            modal.classList.remove('active')
        }
    }

    if (edit){
        userName.value = items[index].name
        userFunction.value = items[index].function
        userSalary.value = items[index].salary

    } else {
        userName.value = ''
        userFunction.value = ''
        userSalary.value = ''
    }
}

function editItem (index) {

    openModal(true, index)
}

function deleteItem(index){
    items.splice(index, 1)
    setitensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.function}</td>
        <td>${item.salary}</td>
        <td class="action">
            <button onclick="deleteItem(${index})"><i i class='bx bx-edit'></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

btnSave.onclick = e => {
    if (userName.value == '' || userFunction.value == '' || userSalary.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) {
        items[id].nome = userName.value
        items[id].function = userFunction.value
        items[id].salary = userSalary.value
    } else {
        items.push({'name': userName.value, 'function': userFunction.value, 'salary': userSalary.value})
    }

    setitensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens(){
    items = getItemsBD()
    tbody.innerHTML = ''
    items.forEach((item, index) =>{
        insertItem(item, index)
    })
}

const getItemsBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setitensBD = () => localStorage.setItem('dbfunc', JSON.stringify(items)) 

loadItens()