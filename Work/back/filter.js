const searchBar = document.getElementById("search");

function getArrayFromStorage() {
    let keyNumbers = Object.keys(localStorage).length; // Determine the number of objects in LocalStorage
    let incomingArr = [];

    // Retrieve data from LS, form objects and add them to the array
    for (let i = 0; i < keyNumbers; i++) {
        let keyName = localStorage.key(i);
        let row = JSON.parse(localStorage.getItem(keyName));
        
        let elm = {}; // Clear the object at the start of each iteration
        elm.id = keyName;
        elm.place = row.place;
        elm.room = row.room;
        elm.floor = row.floor;
        elm.price = row.price;
        elm.pictname = row.pictname;
        incomingArr.push(elm);
    }
    return incomingArr;
}

function searchElements(){
    //  Очищеємо зону елементів
    document.getElementsByClassName("displayzone")[0].innerHTML = ''
    
    //const searchbtn = document.querySelector("#searchBtn")
    //  Беремо масив з LS
    let searchtArr = getArrayFromStorage()
    //  Беремо дані з поля пошуку
    let str = document.querySelector("#search").value
    //  Приводимо їх до нижнього регістру
    let serchStr = str.toLowerCase();
    //  Створюємо регулярку для тестування (пошуку)
    let  regExp = new RegExp(`${serchStr}`, "gi")
    let isFounded = false
    //  Перевіряємо елементи масиву
    for (let i=0; i<searchtArr.length; i++) {
        let row = searchtArr[i]
        let strP = row.place;
        let strR = row.room;
        let strA = row.area;
        let strF = row.floor;
        let strPr = row.price;
        if (regExp.test(strP)) {
            buildElementToPage(row.id, row)
            isFounded = true
            }
        }
    if (!isFounded) {document.getElementsByClassName("displayzone")[0].innerHTML = '<h1 style="color:#C39898; width:100%; text-align: center;" >No matches found</h1>'}
     
}

searchBar.addEventListener("input", searchElements);

//   refresh = () => location.reload()

// search.addEventListener('input', searchElements);