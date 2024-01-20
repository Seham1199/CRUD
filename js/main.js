var prodName = document.getElementById("prodName");
var prodPrice = document.getElementById('prodPrice');
var prodCategory = document.getElementById('prodCategory');
var prodDesc = document.getElementById('prodDesc');
var search = document.getElementById('search');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var productContainer = [];
var indexUpdate = 0 ;

if (localStorage.getItem("productItems") != null) {
  productContainer = JSON.parse(localStorage.getItem("productItems")) ;
  displayProducts();    
}

// Create 
function addProduct(){

if (validationName() == true && validationPrice() == true && validationCat() == true && validationDesc() == true) {
  var products = {
    name: prodName.value ,
    price: prodPrice.value ,
    category: prodCategory.value ,
    description: prodDesc.value ,
   }
  productContainer.push(products);
  localStorage.setItem("productItems" , JSON.stringify(productContainer)) ;
  // console.log(productContainer);
  displayProducts();
  clearForm(); 
}
}

// Retrive || Display
function displayProducts(){
var cartoona = "";
for(var i=0 ; i<productContainer.length ; i++){
  cartoona  += `
<tr class="text-center">
<td>${productContainer[i].name}</td>
<td>${productContainer[i].price}</td>
<td>${productContainer[i].category}</td>
<td>${productContainer[i].description}</td>
<td><button class="btn btn-outline-warning" id="update" onclick="setData(${i})">Update</button></td>
<td><button class="btn btn-outline-danger" id="delete" onclick="deleteProduct(${i})" >Delete</button></td>
</tr>  
  `;
}
  document.getElementById('tableData').innerHTML = cartoona ;
}

// Delete
function deleteProduct(index){
productContainer.splice(index , 1) ;
localStorage.setItem("productItems" , JSON.stringify(productContainer)) ;
displayProducts();
}

// Search
function searchProduct(){
  var term = search.value;
  var cartoona = "";
for(var i=0 ; i<productContainer.length ; i++){
  if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
    
  cartoona  += `
<tr class="text-center">
<td>${productContainer[i].name}</td>
<td>${productContainer[i].price}</td>
<td>${productContainer[i].category}</td>
<td>${productContainer[i].description}</td>
<td><button class="btn btn-outline-warning" id="update">Update</button></td>
<td><button class="btn btn-outline-danger" id="delete" onclick="deleteProduct(${i})">Delete</button></td>
</tr>  
  `;
}
  document.getElementById('tableData').innerHTML = cartoona ;
}
}

// Update
function setData(index){
  indexUpdate = index ;
   var currentProduct = productContainer[index];
   // console.log(currentProduct);

   prodName.value = currentProduct.name ;
   prodPrice.value = currentProduct.price ;
   prodCategory.value = currentProduct.category ;
   prodDesc.value = currentProduct.description ;

   updateBtn.classList.remove('d-none');
   addBtn.classList.add('d-none');  
}
function updateProduct(){
  var products = {
    name: prodName.value ,
    price: prodPrice.value ,
    category: prodCategory.value ,
    description: prodDesc.value ,
   };

   productContainer.splice(indexUpdate , 1 , products);
   localStorage.setItem("productItems" , JSON.stringify(productContainer)) ;
displayProducts();
clearForm();

updateBtn.classList.add('d-none');
   addBtn.classList.remove('d-none');  
}

// Clear
function clearForm(){
  prodName.value = "";
  prodPrice.value = "";
  prodCategory.value = "";
  prodDesc.value = "";
}

// Validation
function validationName(){
var message = document.getElementById("message");

  var text = prodName.value;
  var regexName = /^[A-Z][a-z]{3,8}([0-9]{1,2})?$/;
  if (regexName.test(text)) {
    prodName.classList.add('is-valid');
    prodName.classList.remove('is-invalid');
    message.classList.add('d-none');
    return true;
  }else
  {
    prodName.classList.add('is-invalid');
    prodName.classList.remove('is-valid');
    message.classList.remove('d-none');
    return false ;
  }

}


function validationPrice(){
  var messagePrice = document.getElementById("messagePrice");
  
    var text = prodPrice.value;
    var regexPrice = /^[1-9][0-9]{2,5}$/;
    if (regexPrice.test(text)) {
      prodPrice.classList.add('is-valid');
      prodPrice.classList.remove('is-invalid');
      messagePrice.classList.add('d-none');
      return true;
    }else
    {
      prodPrice.classList.add('is-invalid');
      prodPrice.classList.remove('is-valid');
      messagePrice.classList.remove('d-none');
      return false ;
    }
  }

function validationCat(){
  var messageCat = document.getElementById("messageCat");
  
  var text = prodCategory.value;
  var regexCat = /^[A-z]{2,8}$/i;
  if (regexCat.test(text)) {
    prodCategory.classList.add('is-valid');
    prodCategory.classList.remove('is-invalid');
    messageCat.classList.add('d-none');
    return true;
  }else
  {
    prodCategory.classList.add('is-invalid');
    prodCategory.classList.remove('is-valid');
    messageCat.classList.remove('d-none');
    return false ;
  }
}

function validationDesc(){
  var messageDesc = document.getElementById("messageDesc");
  
  var text = prodDesc.value;
  var regexDesc = /^[A-z]{2,8}$/i;
  if (regexDesc.test(text)) {
    prodDesc.classList.add('is-valid');
    prodDesc.classList.remove('is-invalid');
    messageDesc.classList.add('d-none');
    return true;
  }else
  {
    prodDesc.classList.add('is-invalid');
    prodDesc.classList.remove('is-valid');
    messageDesc.classList.remove('d-none');
    return false ;
  }
}