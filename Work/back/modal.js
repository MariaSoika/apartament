
const modal = document.getElementById("Modal");
const btn = document.getElementById("submit");

function openModal(){
    modal.style.display="flex";
    modalTitle.textContent="Add apartament";
}

function closeModal(){
    modal.style.display = "none";
}

function openEdit(){
    modal.style.display="flex";
    btn.style.display = "none";
    modalTitle.textContent="Edit apartament";
    
}
