let searchdata = document.getElementById("searchdata");
let categoriesdata = document.getElementById("categoriesdata");
let areadata = document.getElementById("areadata");
let ingredientdata = document.getElementById("ingredientdata");
let contactdata = document.getElementById("contactdata");
let rowdata = document.getElementById("rowdata");
let searchcontent=document.getElementById("searchcontent");


$("document").ready(function () {
  apisearchByname(" ").then(function(){
    $(".loadScreen").fadeOut(200, function () {
      $("body").css("overflow", "visible");
   
    });
  })
  

});


function openNav() {
  let navWidth = $(".nav-tap").outerWidth();
  $(".sideNavMenue").animate({ left: -navWidth }, 500);
  $(".fa-icon").removeClass(" fa-x");
  $(".fa-icon").addClass("fa-bars");
  $("li").animate({ top: 300 }, 500);
}

function clothNav() {
  $(".sideNavMenue").animate({ left: 0 }, 500);
  $(".fa-icon").removeClass("fa-bars");
  $(".fa-icon").addClass("fa-x");
  for (i = 0; i < 5; i++) {
    $("li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

$(".fa-icon").click(function () {

  if ($(".sideNavMenue").css("left") == "0px") {
 
    openNav();
  } else {
   
    clothNav();
  }
});

openNav();

//******meal data ****//
async function apisearchByname(term) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let response = await api.json();
  console.log(response.meals);
  // displaymeals(response.meals);
  response.meals?displaymeals(response.meals):displaymeals([]);
  $('.innerLoadScreen').fadeOut(500)
}



function displaymeals(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
    <div onclick="detailesmealCategory(${arr[i].idMeal})" class="meel position-relative  overflow-hidden rounded-2">
      <img src="${arr[i].strMealThumb}" class="w-100 rounded-2 " alt="cook">
      <div class="meal-layer  rounded-2 cursor-pointer  position-absolute d-flex align-items-center text-black p-2">
        <h3> ${arr[i].strMeal}</h3>
      </div>
    </div>

  </div>
    `;
  }

  rowdata.innerHTML = cartona;
}

// searchinput

$('#searchdata').click(function(){
  // alert("helloserch")
  searchcontentdata()
  openNav();
})


function searchcontentdata(){

  searchcontent.innerHTML=` <div class="row py-4 ">
  <div class="col-md-6">
  <input type="text"  placeholder="Search By Name" class="form-control bg-transparent text-white" id="searchName" onkeyup="apisearchByname(this.value)" >
  </div>
  
  <div class="col-md-6">
    <input type="text" placeholder="Search By First Letter" class="form-control text-white bg-transparent" onkeyup="searchByfirstname(this.value)" maxlength="1">
  </div>
  </div> `
  rowdata.innerHTML=''
}

async function searchByfirstname(term) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  term==""? term="a":"";
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let response = await api.json();
  console.log(response.meals);
  // displaymeals(response.meals);
  response.meals?displaymeals(response.meals):displaymeals([]);
  $('.innerLoadScreen').fadeOut(500)
}

/*api category*/

$("#categoriesdata").click(function () {
  // alert("never give up")
  apiCategory();
  openNav();
});

async function apiCategory() {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  searchcontent.innerHTML=''
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  response = await response.json();
  console.log(response);
  disabledapiCategory(response.categories);
  $('.innerLoadScreen').fadeOut(500)
}

function disabledapiCategory(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div  onclick="mealsApiCategory('${
        arr[i].strCategory
      }')" class="meel position-relative  overflow-hidden rounded-2  ">
        <img src="${
          arr[i].strCategoryThumb
        }" class="w-100 rounded-2 " alt="cook">
        <div  class="meal-layer  rounded-2 cursor-pointer  position-absolute  text-black text-center p-2" >
          <h3 > ${arr[i].strCategory}</h3>
         <p>${arr[i].strCategoryDescription
           .split(" ")
           .slice(0, 20)
           .join(" ")}</p>
        </div>
      </div>
  
    </div>
      `;
  }

  rowdata.innerHTML = cartona;
}

// meals category
async function mealsApiCategory(Mealscategory) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  // alert('welcome api')
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Mealscategory}`
  );
  response = await response.json();
  console.log(response.meals);
  displaymeals(response.meals.slice(0, 20));
  $('.innerLoadScreen').fadeOut(500)
}

// detailes meal category
async function detailesmealCategory(idMeal) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  // alert('welcome api')
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  response = await response.json();
  console.log(response.meals[0]);
  displaydetailesmeals(response.meals[0]);
  $('.innerLoadScreen').fadeOut(500)
}

function displaydetailesmeals(meal) {
  searchcontent.innerHTML=''
  // recipes
  let ingredient = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `
    <li class="alert alert-info m-2 p-1">${ meal[`strMeasure${i}`] } ${meal[`strIngredient${i}`]}</li>
    `;
    }
  }

  console.log(ingredient);

  // tags
  let tagsMeal=meal.strTags?.split(",");
  // let tagsMeal=meal.strTags.split(",");
  if(!tagsMeal)tagsMeal=[]
  let tags=``
  for(let i=0 ; i<tagsMeal.length ; i++){
    tags+=`  <li class="alert alert-danger m-2 p-1">${tagsMeal[i]}</li>`
  }
   console.log(tags)

  // api
  let cartona = ` <div class="col-md-4 ">
  <img src="${meal.strMealThumb}" class="w-100 rounded-3" alt="meal">
  <h2 class="text-white">Fish fofos</h2>
   </div>

   <div class="col-md-8  text-white">
     <h2>Instructions</h2>
     <p>${meal.strInstructions}</p>
            <h3><span>Area :</span>${meal.strArea}</h3>
            <h3><span>Category :</span>${meal.strCategory}</h3>
            <h3>Recipes :</h3>

            <ul class="list-unstyled d-flex flex-wrap g-3">
             
         ${ingredient}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            ${tags}
            </ul>
            <a target='_blank' href="${meal.strSource}" class="btn btn-success">Source</a>
            <a target='_blank' href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            
   </div> 
   </div>`;

  rowdata.innerHTML = cartona;


}

/*****************  api area */

$("#areadata").click(function () {
  // alert("never give up")
  apiArea();
  openNav();
});

async function apiArea() {
  rowdata.innerHTML ="";
  $('.innerLoadScreen').fadeIn(500)
  searchcontent.innerHTML=''
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);
  disabledApiArea(response.meals);
  $('.innerLoadScreen').fadeOut(500)
}

function disabledApiArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div  onclick="mealsApiCArea('${arr[i].strArea}')"  class=" rounded-2 text-center pt-4 cursor-pointer ">
      <i class="fa-solid fa-house-laptop"></i>
       <h3 class="text-white">${arr[i].strArea}</h3>
        </div>
      </div>
  
    </div>
      `;
  }

  rowdata.innerHTML = cartona;
}

//meal api area
async function mealsApiCArea(arr) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  // alert("nrver")
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${arr}`
  );
  response = await response.json();
  console.log(response.meals);

  displaymeals(response.meals);
  $('.innerLoadScreen').fadeOut(500)
}

/* api ingredient */

$("#ingredientdata").click(function () {
  // alert("never give up")
  apiIngredient();
  openNav();
});

async function apiIngredient() {
  rowdata.innerHTML=""
  $('.innerLoadScreen').fadeIn(500)
  searchcontent.innerHTML=''
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals.slice(0, 20));
  disabledApiIngredient(response.meals.slice(0, 20));
  $('.innerLoadScreen').fadeOut(500)
}

function disabledApiIngredient(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
      <div  onclick="mealsApiIgredient('${
        arr[i].strIngredient
      }')"  class=" rounded-2 text-center pt-4 cursor-pointer ">
      <i class="fa-solid fa-drumstick-bite text-white fa-4x"></i>
       <h3 class="text-white">${arr[i].strIngredient}</h3>
      <p class='text-white'>${arr[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
        </div>
      </div>
  
 
      `;
  }

  rowdata.innerHTML = cartona;
}

// meals Api Ingredient

async function mealsApiIgredient(arr) {
  rowdata.innerHTML =''
  $('.innerLoadScreen').fadeIn(500)
  // alert('be the best version of you')
  let response = await fetch(
    ` https://www.themealdb.com/api/json/v1/1/filter.php?i=${arr}`
  );
  response = await response.json();
  console.log(response.meals);

  displaymeals(response.meals);
  $('.innerLoadScreen').fadeOut(500)
}


// contacts

$('#contactdata').click(function(){
  contactsData()
  openNav();
})

function contactsData(){
  searchcontent.innerHTML=''
  rowdata.innerHTML=`
  <div class="content min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center ">

      <div class="row g-4">

        <div class="col-md-6">
          <input type="text" placeholder="Enter Your Name" class="form-control" id='inputName' onkeyup="validations()">
          <div id="alertname" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed
          </div>
        </div>

        <div class="col-md-6">
          <input type="text" placeholder="Enter Your Email" class="form-control " id="inputEmail" onkeyup="validations()">
          <div id="alertemail" class="alert alert-danger w-100 mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
        </div>
        <div class="col-md-6">
          <input type="number" placeholder="Enter Your Phone" class="form-control " id="inputPhone" onkeyup="validations()">
          <div id="alertnumber" class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>
        </div>

        <div class="col-md-6">
          <input type="number" placeholder="Enter Your Age" class="form-control " id="inputAge" onkeyup="validations()">
          <div id="alertage" class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
        </div>
        <div class="col-md-6">
          <input type="password" placeholder="Enter Your Password" class="form-control " id="inputPassword" onkeyup="validations()">
          <div id="alertpassword" class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight
            characters, at least one letter and one number:*</div>
        </div>

        <div class="col-md-6">
          <input type="password" placeholder="RePassword" class="form-control " id="inputRePassword" onkeyup="validations()">
          <div id="alertrepassword" class="alert alert-danger w-100 mt-2 d-none ">Enter valid repassword</div>
        </div>


      </div>

      <button id="submit" class="btn btn-outline-danger mt-3 disabled ">Submit</button>
    </div>

  </div>
`


inputName.addEventListener("focus",function(){
  nameInputTouched = true;
})
inputEmail.addEventListener("focus",function(){
 emailInputTouched = true;

})

inputPhone.addEventListener("focus",function(){
  phoneInputTouched = true;
})
inputAge.addEventListener("focus",function(){
  ageInputTouched = true;
})
inputPassword.addEventListener("focus",function(){
  passwordInputTouched = true;
})
inputRePassword.addEventListener("focus",function(){
  repasswordInputTouched = true;
})
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



function validations(){
if(nameInputTouched){
  if(validationName()){
    // $('#alertname').removeClass('d-none')
    document.getElementById("alertname").classList.replace("d-block", "d-none")
  }else{
    // $('#alertname').addClass('d-none')
    document.getElementById("alertname").classList.replace("d-none", "d-block")
  }
}
  
if(emailInputTouched){
  if(validationEmail()){
    document.getElementById("alertemail").classList.replace("d-block", "d-none")
  // console.log('yes')
  }else{
    document.getElementById("alertemail").classList.replace("d-none", "d-block")
  // console.log('no')
  }
}

  if(phoneInputTouched){
    if(validationPhone()){
      document.getElementById("alertnumber").classList.replace("d-block", "d-none")
      console.log('yes')
    }else{
      document.getElementById("alertnumber").classList.replace("d-none", "d-block")
      console.log('no')
    }
  }
 
if(ageInputTouched){
  if(validationAge()){
    document.getElementById("alertage").classList.replace("d-block", "d-none")
  }else{
    document.getElementById("alertage").classList.replace("d-none", "d-block")
  }
}

if(passwordInputTouched){
  if(validationPassword()){
    document.getElementById("alertpassword").classList.replace("d-block", "d-none")
  }else{
    document.getElementById("alertpassword").classList.replace("d-none", "d-block")
  }
 }

if(repasswordInputTouched){
  if(validationRePassword()){
    document.getElementById("alertrepassword").classList.replace("d-block", "d-none")
    console.log('yes')
  }else{
    document.getElementById("alertrepassword").classList.replace("d-none", "d-block")
    console.log('no')
  }
}
 
  
  if( validationName()&& validationEmail()&& validationPhone()&&validationAge()&& validationPassword()&&validationRePassword()){
    // console.log('kkkkk')
    $('#submit').removeClass('disabled')
  }else{
    $('#submit').addClass('disabled')
  }

}

function validationName(){
  return(/^[a-zA-Z ]+$/.test(document.getElementById('inputName').value))
}

function validationEmail(){
  return(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('inputEmail').value))
}
function validationPhone(){
  return(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('inputPhone').value))
}
function validationAge(){
  return(/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('inputAge').value))
}
function validationPassword(){
  return(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('inputPassword').value))
}
function validationRePassword(){
  return document.getElementById('inputPassword').value == document.getElementById('inputRePassword').value
  
}

