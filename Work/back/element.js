// import openEdit from "./modal.js"
// import closeModal  from "./modal.js"
const modal = document.getElementById("Modal");
const Sbtn = document.getElementById("submit");
const Ubtn = document.getElementById("update");

function openModal(){
    modal.style.display="flex";
    modalTitle.textContent="Add apartament";
    Ubtn.style.display="none";
}

function closeModal(){
    modal.style.display = "none";
}

function openEdit(){
    modal.style.display="flex";
    modalTitle.textContent="Edit apartament";
    Sbtn.style.display = "none";
}

function buildElementToPage(id, elem) {                               
    const element = document.createElement('div');
    element.classList.add('element');
    element.innerHTML = `
        <div class="element-data">
            <img src="${elem.pictname}" class="element-img">
            <div class="element-place">${elem.place}</div>
            <p class="element-text">Rooms: <span class="element-room">${elem.rooms}</span></p> 
            <p class="element-text">Area: <span class="element-area">${elem.area}</span> м2</p> 
            <p class="element-text">Floor: <span class="element-floor">${elem.floor}</span></p> 
            <p class="element-text">Price: <span class="element-price">${elem.price}</span> $</p> 
            <button class="blue-button" id="edit" onclick="modifyModalToEdit(${id})">Edit</button><span> </span>
            <button class="red-button" onclick="removeElementFromStorage(${id})">Delete</button>
        </div>
    `;
    document.getElementsByClassName("displayzone")[0].appendChild(element);
}

function modifyModalToEdit(id) {
    // document.getElementsByClassName("modal-title")[0].innerText = "Edit apartament"
    //document.getElementById("submit").innerText = "Update"
    document.getElementById("update").addEventListener("click", function () {
        editElementInLocalStorage(id);
    });    //  Вибираємо елемент по ID з LS і парсимо в об'єкт
    let edElem = JSON.parse(localStorage.getItem(id))
    //  Встановлюємо значення полів форми
    document.getElementById("place").value = edElem.place;   
    document.getElementById("rooms").value = edElem.rooms;   
    document.getElementById("area").value = edElem.area;   
    document.getElementById("floor").value = edElem.floor;
    document.getElementById("price").value = edElem.price;
    document.getElementById("imgfile").value = edElem.pictname; 
    //  Вікриваємо модалку
    openEdit();
    //modal.open()
}

function validNameAndVolume(){
    let valid = true;
    let showMsg = '';
    let formPlace = document.getElementById("place").value.trim();
    let formRooms = document.getElementById("rooms").value.trim();
    let formArea = document.getElementById("area").value.trim();
    let formFloor = document.getElementById("floor").value.trim();
    let formPrice = document.getElementById("price").value.trim();
    
    if (!formPlace) {
        showMsg = 'Apartament place field is empty. INPUT APARTAMENTs PLACE . '
        valid = false;
    }  
    if (!formRooms) {
        showMsg = 'Apartament rooms field is empty. INPUT APARTAMENTs ROOMS . '
        valid = false;
    }  
    if (!formArea) {
        showMsg = 'Apartament area field is empty. INPUT APARTAMENTs AREA . '
        valid = false;
    }  
    if (!formFloor) {
        showMsg = 'Apartament floor field is empty. INPUT APARTAMENTs FLOOR . '
        valid = false;
    }  
    if (!formPrice) {
        showMsg = 'Apartament place field is empty. INPUT APARTAMENTs PRICE . '
        valid = false;
    }  

    if (+formRooms < 1) {
        showMsg = showMsg + 'Apartament rooms less than 1X. INPUT THE CORRECT APARTAMENT ROOMS. '
        valid = false;
    } 
    
    if (valid) {return valid} else {alert (showMsg)}
   
}

function validImg() {
    if (document.getElementById("imgfile").value) {return true} 
    else {
        alert ("The image for the cup was not selected. SELECT an IMAGE for the APARTAMENT. ")
        return false} ;
}

// Створення параметрів нового елемента та розміщення його в LS
function addElementToLocalStorage(){
            
    if (validNameAndVolume() && validImg()) {
        //Шукаємо максимальне значення ID,  в LS не зайняте
        let keyArr = [];
        for(let i=0; i<localStorage.length; i++) {
            let key = Number(localStorage.key(i)) ;
            keyArr[i] = key
        }
        const freeKey = Math.max(...keyArr) + 1; 
        //Забираємо значення з форми
        let filename = document.getElementById("imgfile").value; 
        // Будуємо новий елемент
        const newElement = {};
        newElement.place =  document.getElementById("place").value;   
        newElement.rooms = document.getElementById("rooms").value;   
        newElement.area = document.getElementById("area").value;
        newElement.floor = document.getElementById("floor").value;  
        newElement.price = document.getElementById("price").value; 
        newElement.pictname = filename;   
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(newElement);
        // Пакуємо елемент в LS
        localStorage.setItem(`${freeKey}`, rowSt);
        closeModal();
       // modal.closest();
        setTimeout(location.reload(), 1000);
    }
}

function editElementInLocalStorage(id) {
    if (validNameAndVolume()) {
        let edElem = JSON.parse(localStorage.getItem(id))
        edElem.place =  document.getElementById("place").value;   
        edElem.rooms = document.getElementById("rooms").value;   
        edElem.area = document.getElementById("area").value;   
        edElem.floor = document.getElementById("floor").value; 
        edElem.price = document.getElementById("price").value; 
        if (document.getElementById("imgfile").value) {
            let filename = document.getElementById("imgfile").value.replace(/C:\\fakepath\\/, ''); // Обрізаємо C:\fakepath\
            edElem.pictname = filename; 
        }
        // Конвертуємо елемент в стрічку
        let rowSt = JSON.stringify(edElem)
        // Пакуємо елемент в LS
        localStorage.setItem(`${id}`, rowSt)
        closeModal();
        setTimeout(location.reload(), 1000) //Перезавантажуємо вікно
    }
   
}


function removeElementFromStorage(id){
    if (confirm("Are you sure you want to delete?")) {
        localStorage.removeItem(id)
        location.reload();          
    }

} 

const keyNumbers = localStorage.length;

for (let k = 0; k < keyNumbers; k++) {
    const keyName = localStorage.key(k);
    const row = JSON.parse(localStorage.getItem(keyName));
    if (row) {
        buildElementToPage(keyName, row);
    }
}

function getLocalStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += (localStorage[key].length + key.length) * 2;
        }
    }
    console.log(`Розмір даних у Local Storage: ${(total / 1024).toFixed(2)} KB`);
    return total;
}

// Виклик функції для перевірки розміру
getLocalStorageSize();
