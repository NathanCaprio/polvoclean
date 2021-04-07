

    

  /*  let quantidade = document.getElementById('quantidade').value
    let seletor = document.getElementById('options')
    let escolhido = seletor.options[seletor.selectedIndex].text
    let resultado = document.getElementById('resultado')
*/
let addToDoButton = document.getElementById('addToDo')
let toDoContainer = document.getElementById('toDoContainer')
let inputField = document.getElementById('inputField')
let products = document.getElementById('products')

let total = document.getElementById('total')


addToDoButton.addEventListener('click', function(){
var paragraph = document.createElement('li')
var paragraph2 = document.createElement('h1')
toDoContainer.appendChild(paragraph2)




  
    toDoContainer.appendChild(paragraph)
    if ( products.value <= 0 ){
        alert('Quantidade deve ser maior que 0')
    }
 
    paragraph.innerText = `Você escolheu ${inputField.value} e a quantidade ${products.value}`
   

    


})



