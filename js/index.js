let title = document.getElementById("title");   // input kolo
let price = document.getElementById("price");  // input kolo
let taxes = document.getElementById("taxes");  // input kolo
let ads = document.getElementById("ads");     // input kolo
let discount = document.getElementById("discount");  // input kolo
let total = document.getElementById("total");     // input kolo
let count = document.getElementById("count");   // input kolo
let category = document.getElementById("category"); // input kolo
let submit = document.getElementById("submit"); //button kolo

// console.log(price, ads ,taxes)
let mood = 'create' ;
let tmp ;

// price data
function getTotal(){
    if ( price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value  ) - +discount.value;
        total.innerHTML = result;
        total.style.background ="#040";
        // total.style.borderRadius = "20px"
    }
    else{
        total.innerHTML = '';         
        total.style.background = '#a00d02'
    }
}

// localstorge
let dataContainer;

if (localStorage.product != null){
    dataContainer = JSON.parse(localStorage.product)
}
else{
     dataContainer =[] ;
}
// add Data
submit.onclick = function(){
    let dataNew = {
         title :title.value ,
         price : price.value,
         taxes : taxes.value,
         ads : ads.value,
         discount : discount.value,
         total : total.innerHTML,
         count : count.value,
         category : category.value,
    }
    if( title.value != '' &&
     price.value != '' &&
     taxes.value !='' &&
      ads.value != '' && 
     discount.value !='' &&
      dataNew.count < 100){
        if (mood === "create"){
            if (dataNew.count > 1){
                for(let i = 0 ; i< dataNew.count ; i++){
                    dataContainer.push(dataNew);
                }
            }
            else{
                dataContainer.push(dataNew);
            }
          }
        else{
            dataContainer[tmp]= dataNew;
            mood = 'create';
            submit.innerHTML ="create" ;
            count.style.display ="block" ;
        
        }
    }

    localStorage.setItem ("product" , JSON.stringify(dataContainer) )
    showData();
    deleteForm();
    console.log(dataContainer)
}


function deleteForm(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = ""
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


function showData(){
    getTotal();
    let table = ``;
    for( let i = 0 ; i < dataContainer.length ; i++){
        
        table +=`
        <tr>
        <td>${i}</td>
        <td>${dataContainer[i].title}</td>
        <td>${dataContainer[i].price}</td>
        <td>${dataContainer[i].taxes}</td>
        <td>${dataContainer[i].ads}</td>
        <td>${dataContainer[i].discount}</td>
        <td>${dataContainer[i].total}</td>
        <td>${dataContainer[i].category}</td>
        <td><button onclick ="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
    }

    document.getElementById("tableBody").innerHTML = table;
    let deleteAll = document.getElementById("deleteAll");
    if( dataContainer.length > 0){
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All ${dataContainer.length}</button> ` 
    }
    else{
        deleteAll.innerHTML = ``;
    }
}
showData();


// daleteData
function deleteData(i){
    dataContainer.splice(i , 1);
    // localStorage.product = JSON.stringify(dataContainer); 
    localStorage.setItem ("product" , JSON.stringify(dataContainer));
    showData();
}

// deleteAll 
function deleteAll(){
    localStorage.clear();
    dataContainer.splice(0);
    showData();
}



// updateDate
function updateData(i){
    title.value = dataContainer[i].title;
    price.value = dataContainer[i].price;
    taxes.value = dataContainer[i].taxes;
    ads.value = dataContainer[i].ads;
    discount.value = dataContainer[i].discount;
    getTotal();
    count.style.display ="none";
    category.value = dataContainer[i].category;
    submit.innerHTML = "update" ;
    mood = "update";
    tmp = i;
    scroll({
        top :0,
        behavior :'smooth'
    })
}


// search

let searchMood = 'title';

function getSearchMood(id){
    let search = document.getElementById("search");
    //  console.log(id)
    if( id== 'searchTitle'){
        searchMood = 'title'
        search.placeholder ="search By Title"
    }
    else{
        searchMood = 'category'
        search.placeholder = "search By Category"
    }
    // console.log(searchMood)
    search.focus();
}


function searchData(value){
    let table = '';
    //    console.log(value)
    if( searchMood == 'title'){
        for(let i = 0 ; i< dataContainer.length ; i++){
            if(dataContainer[i].title.includes(value)){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataContainer[i].title}</td>
                <td>${dataContainer[i].price}</td>
                <td>${dataContainer[i].taxes}</td>
                <td>${dataContainer[i].ads}</td>
                <td>${dataContainer[i].discount}</td>
                <td>${dataContainer[i].total}</td>
                <td>${dataContainer[i].category}</td>
                <td><button onclick ="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
            }

        }
    }

    else{
        for(let i = 0 ; i< dataContainer.length ; i++){
            if(dataContainer[i].category.includes(value)){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataContainer[i].title}</td>
                <td>${dataContainer[i].price}</td>
                <td>${dataContainer[i].taxes}</td>
                <td>${dataContainer[i].ads}</td>
                <td>${dataContainer[i].discount}</td>
                <td>${dataContainer[i].total}</td>
                <td>${dataContainer[i].category}</td>
                <td><button onclick ="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
            }

        }
    }
    document.getElementById("tableBody").innerHTML = table;
}