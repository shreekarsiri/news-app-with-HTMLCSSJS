
const apikey=
'e00d67dc6cce414f81601c1b1221de90'

const blogContainer=document.getElementById
('blog-container');
const searchField=document.getElementById
("search-input");

const searchButton=document.getElementById
("search-button");

async function fetchRandomNews(){
    try{
const apiUrl=`https://newsapi.org/v2/everything?q=tesla 
&pageSize=10&apikey=${apikey}`;
const response=await fetch(apiUrl);
const data=await response.json();
console.log(data.articles);

return data.articles;
    }catch(error){
console.error("error fetching random news",error)
return [];
}
    }

 searchButton.addEventListener('click',async ()=>{
    const query=searchField.value.trim()
    if(query!==""){
        try{
         const articles=await fetchNewsQuery(query)  
         displayBlogs(articles)  
        }catch(error){
       console.log("err fetching news by query",error)
    }
}
 })

async function fetchNewsQuery(query){
    try{
        const apiUrl=`https://newsapi.org/v2/everything?q=${query} 
        &pageSize=10&apikey=${apikey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        console.log(data.articles);
        
        return data.articles;
            }catch(error){
        console.error("error fetching random news",error)
        return [];
        }
}

function displayBlogs(articles){
    blogContainer.innerHTML=""
    articles.forEach((article)=>{
    const blogCard=document.createElement("div");
    blogCard.classList.add("blog-card");
    const img=document.createElement("img");
    img.src=article.urlToImage;
    const title=document.createElement("h1");
    const TruncatedTitle=
    article.title.length>30?
    article.title.slice(0,30)+'....' :article.title 
    title.textContent=TruncatedTitle; 
    const description=document.createElement("p");
    const TruncatedDesc=
    article.description.length>200?
    article.description.slice(0,200)+'....' :article.description 
    description.textContent=TruncatedDesc; 
    //description.textContent=article.description;
    // description=article.description;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogContainer.appendChild(blogCard);
    blogCard.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
    });

}
(async ()=>{
    try{
      const articles=  await fetchRandomNews();
      displayBlogs(articles);
    }catch(error){
console.error("error fetching random news",error);
    }
    })();
