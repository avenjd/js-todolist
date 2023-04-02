let toDoInput //miejsce gdzie uzytkownik wpisuje tresc zadania
let errorInfo //info o braku zadan/ koniecznosci wpisania tekstu
let addBtn //przycisk ADD -dodaje nowe elementy do listy
let ulList //lista zadan , tagi UL
let newToDo //nowo dodany LI, nowe zadanie

let popUp //popup
let popUpInfo //tekst w popupie, jak sie doda pusty tekst
let toDoToEdit //edytowalny ToDo
let popUpInput //input w popupie
let popUpAddBtn //przycisk zatwierdz w popupie
let popUpCloseBtn //przycisk anuluj w popupie

//wywoluje funkcje
const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

//pobiera elementy
const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')

	popUp = document.querySelector('.popup')
	popUpInfo = document.querySelector('.popup-info')
	popUpInput = document.querySelector('.popup-input')
	popUpAddBtn = document.querySelector('.accept')
	popUpCloseBtn = document.querySelector('.cancel')
}

//nadaje nasluchiwanie
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewToDo)
	ulList.addEventListener('click', checkClick)
	popUpCloseBtn.addEventListener('click', closePopUp)
	popUpAddBtn.addEventListener('click', changeToDoText)
	toDoInput.addEventListener('keyup', enterKeyCheck)
}

/*
    addNewToDo:
    1. tworzy nowy element li
    2. dodaje nowy element do ul listy
    3. funkcja odpalana na click w przycisku ADD
    4. przechwytuje treść z inputa i umieszcza go w nowo utworzonym LI
    5. wywołuje funkcje createTools która dodaje narzędzia do ToDosa
    5. funkcja nie doda do listy pustego 'todosa'
    6. czyści inputa
*/
const addNewToDo = () => {
	if (toDoInput.value !== '') {
		newToDo = document.createElement('li')
		newToDo.textContent = toDoInput.value
		createTools()
		ulList.append(newToDo)

		toDoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

/*
    createTools:
    1. tworzy diva rodzica z klasą tools
    2. tworzy poszczególne narzędzia
    3. dodaje narzędzia do rodzica
*/
const createTools = () => {
	const toolsParent = document.createElement('div')
	toolsParent.classList.add('tools')
	newToDo.append(toolsParent)

	const completeBtn = document.createElement('button')
	completeBtn.classList.add('complete')
	completeBtn.innerHTML = '<i class="fas fa-check"></i>'

	const editBtn = document.createElement('button')
	editBtn.classList.add('edit')
	editBtn.textContent = 'EDIT'

	const deleteBtn = document.createElement('button')
	deleteBtn.classList.add('delete')
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

	toolsParent.append(completeBtn, editBtn, deleteBtn)
}

/* 
    checkClick:
    1. Sprawdza gdzie kliknął użytkownik w toDo
    2. Wywołuje odpowiednie funkcje jeśli użytkownik kliknął w dany tool
*/
const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		editToDo(e)
	} else if (e.target.matches('.delete')) {
		deleteToDo(e)
	}
}

/* 
    editToDo:
    1. Otwiera popUpa
    2. pobiera li (rodzica przycisku) w które kliknął użytkownik
    3. przekazuje treść todosa do inputa w popupie

*/
const editToDo = (e) => {
	toDoToEdit = e.target.closest('li')
	popUpInput.value = toDoToEdit.firstChild.textContent
	popUp.style.display = 'flex'
}

/* 
    closePopUp:
    1. Zamyka popUp
*/
const closePopUp = () => {
	popUp.style.display = 'none'
	popUpInfo.textContent = ''
}

/*
    changeToDoText:
    1. zmienia tekst w edycji todosa
*/
const changeToDoText = () => {
	if (popUpInput.value !== '') {
		toDoToEdit.firstChild.textContent = popUpInput.value
		closePopUp()
	} else {
		popUpInfo.textContent = 'Musisz podać jakąś treść!'
	}
}

/*
    deleteToDo:
    1. usuwa toDo w które kliknął użytkownik
    2. sprawdza czy użytkownik usunął już wszystkie todosy i wyświetla komunikat
*/
const deleteToDo = (e) => {
	e.target.closest('li').remove()

	const allTodos = ulList.querySelectorAll('li')
	if (allTodos.length === 0) {
		errorInfo.textContent = 'Brak zadań na liście'
	}
}

/* 
    enterKeyCheck:
    1. obsługuje dodawanie tasków za pomocą klawisza 'enter'
*/
const enterKeyCheck = (e) => {
	if (e.key === 'Enter') {
		addNewToDo()
	}
}

document.addEventListener('DOMContentLoaded', main)
