let text=document.getElementById("text")
let title=document.getElementById("title")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let ads=document.getElementById("ads")
let discount=document.getElementById("discount")
let total=document.querySelector(".total")
let count=document.getElementById("count")
let category=document.getElementById("category")
let all =document.querySelectorAll(".all input")
let creat =document.getElementById("creat")
let table=document.getElementById("tbody")
let del=document.getElementById("delete")
let del_all=document.getElementById("del_all")
let update_i
let search=document.getElementById("search")
let search_title=document.getElementById("search_title")
let search_category=document.getElementById("search_category")
// get all cost
function cost() {
    if(price.value!= ''){
        total.innerHTML=(+price.value + +taxes.value + +ads.value) - +discount.value
        total.style.background="green"
    }else{
        total.style.background="red"
        total.innerHTML=""
    }
}
// creat data
let data
if(localStorage.element==null){
    data=[]
}else{
    data=JSON.parse(localStorage.element)
}
creat.onclick=function(){
    let obj={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    if (title.value!=""&&price.value!=""&&price.value.length<15
    &&count.value<=1000&&category.value!=""){
        if(creat.innerHTML=="creat"){
        if(obj.count>1){
        for(let i=0;i<obj.count;i++){
            data.push(obj)
        }
        }else {
            data.push(obj)
        }
    }else {
        data[update_i]=obj
        creat.innerHTML="creat"
        count.style.display="block"
    }
    clear()
    
    }    
    //data.push(obj)
    localStorage.setItem("element",JSON.stringify(data))
    
    showdata()
    check()
    
    
    
}
//clear the input from data
function clear() {
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    total.innerHTML=""
    count.value=""
    category.value=""
}
//show data in table
function showdata(){
    let text=''
    for (let i=0 ;i<data.length;i++){
        text+=`
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].count}</td>
        <td>${data[i].category}</td>
        <td><button onclick="update_row(${i})" id="update">UPDATE</button></td>
        <td><button onclick=del_row(${i}) id="delete">DELETE</button></td>
        </tr>`
    }
    table.innerHTML=text
    cost()
  
}
showdata()
//delete row from data
function del_row(x){
    data.splice(x,1)
    localStorage.element=JSON.stringify(data)
    showdata()
    

}
// check if there is data in the array or not
function check(){
    if(data.length>0){
        del_all.innerHTML=`
        <button onclick="delete_All()">Delete All (${data.length})</button>
        `
    }else
    {
        del_all.innerHTML=""
        
    }

}
check()
function delete_All(){
    localStorage.clear()
    data.splice(0)
    showdata()
    check()
    
}
// update the row 
function update_row(x){
    title.value=data[x].title
    price.value=data[x].price
    taxes.value=data[x].taxes
    discount.value=data[x].discount
    ads.value=data[x].ads
    category.value=data[x].category
    cost()
    creat.innerHTML="Update"
    count.style.display="none"
    update_i=x
    showdata()
    scroll({top:0,behavior:"smooth"})
}
//search functions
    
search_title.onclick=function(){
    search.placeholder="search by title"
    search.focus()
    search.onkeyup=function(){
    text=""
    for(let i=0;i<data.length;i++){            
        if(data[i].title.includes(search.value.toLowerCase())){
            text+=`
            <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].count}</td>
            <td>${data[i].category}</td>
            <td><button onclick="update_row(${i})" id="update">UPDATE</button></td>
            <td><button onclick=del_row(${i}) id="delete">DELETE</button></td>
            </tr>`
            
    }
    table.innerHTML=text
    }
}
search.value=""
showdata()
}


search_category.onclick=function(){
    search.focus()
    search.placeholder="search by category"
    
    search.onkeyup=function(){
        text=""
        for(let i=0;i<data.length;i++){            
            if(data[i].category.includes(search.value.toLowerCase())){
                text+=`
                <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].count}</td>
                <td>${data[i].category}</td>
                <td><button onclick="update_row(${i})" id="update">UPDATE</button></td>
                <td><button onclick=del_row(${i}) id="delete">DELETE</button></td>
                </tr>`
                
        }
        table.innerHTML=text
    }
    }
search.value=""
showdata()
}
search.onfocus=search_title.onclick
