
const AccessKey = "hiPMoGN6zkHMThg8d2M9dKcw6ETOfWhUD2TxGJ0VUTo";

const input = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".serach-btn");
const imageDiv = document.querySelector(".search-result");
const seeMoreBtn = document.querySelector(".seeMoreBtn");
const SearchResultContainer = document.querySelector(".search-results");
let inputData = "";
let page = 1;

// const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`;

async function fetchRes() {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    let results=data.results;
   if(page===1){
    SearchResultContainer.innerHTML="";
   }


  results.map((result)=>{
    // console.log(result);
    // create div container
    const resultContainer=document.createElement("div");
    resultContainer.classList.add("search-result");
    // data from api
    const imgSrc=result.urls.small;
    const imgAlt=result.alt_description;
    const imgHref=result.links.html;
    // write innerHTML in created div container
    resultContainer.innerHTML=`
    <div class="img-container">
                <img src="${imgSrc}" alt="${imgAlt}">
            </div>
            <div class="text-container">
                <p><a href="${imgHref}" target="_blank">${imgAlt} </a></p>
            </div>
    `;
    SearchResultContainer.appendChild(resultContainer);
  });

  page++; //for seemore button serach diffrent picture
  if(page>1){
    seeMoreBtn.style.display="block";
  }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  
}



// function search(){
  // inputData=input.value;
// }
function passInputValue(){
  inputData=input.value;
  page=1;
  if(!inputData)return;
  fetchRes();
  input.value="";
}
  searchBtn.addEventListener("click",()=>{
   passInputValue();
   
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter behavior (like form submission)
       passInputValue();
    }
  });

  seeMoreBtn.addEventListener("click",()=>{
    fetchRes();
  })