// loading category

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(categories => showCategories(categories.data.news_category))
    .catch(err => console.log(err));
}
const showCategories = (categories) =>{
    for(const category of categories){
        // console.log(category.category_id)
        const categoryContainer = document.getElementById('categories');
        const newCategoryDiv = document.createElement('div');
        newCategoryDiv.innerHTML = `
        <button class="text-2xl" onclick="loadNews(${category.category_id})" >${category.category_name}</button>
        `
        categoryContainer.appendChild(newCategoryDiv)
    }
}
loadCategories();

///////////////////////////////////////////////
// show news function

const loadNews = (category) =>{
    // console.log(category);
    isLoading(true);
    const url =`https://openapi.programming-hero.com/api/news/category/0${category}`
    fetch(url)
    .then(res => res.json())
    .then(allNews => showNews(allNews.data));
}



const showNews = (newsArray) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const newsArrayLength = newsArray.length;
    const itemCounter = document.getElementById('item-counter');

    if(newsArrayLength ===0){
    itemCounter.innerText = `no news found`;
    }
    else{
    itemCounter.innerText = `${newsArrayLength} news found`;
    // itemCounter.innerText = '';
    for(const news of newsArray){
        // console.log(news)
        // console.log(news.author)
        console.log(news.total_view ? news.total_view : 'no data')
        const {details,image_url} = news;
        // console.log(details)
        // console.log(image_url)
        const newNewsDiv = document.createElement('div');
        newNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 m-3 shadow-xl">
        <img src="${news.thumbnail_url}" alt="Album">
        <div class="card-body">
          <h2 class="card-title font-bold">${news.title}</h2>
          <p>${news.details.length>200 ? news.details.slice(0,100)+'....' : news.details}</p>
          <div class="card-actions flex justify-between items-center">
                <div>
                    <img src="${news.author.img}" class="w-10"/>
                    <h1>${news.author.name ? news.author.name : 'Data is not available' }</h1>
                </div>
                <div>
                <h1>Published : ${news.author.published_date ? news.author.published_date : 'Data is not available' }</h1>
                <h1>Total Views : ${news.total_view ? news.total_view : 'no data found'}</h1>
                </div>
                <div>
                    <label for="my-modal-3" class="btn btn-primary">Deatails</label>
                    <button class="btn btn-primary">Read More</button>
                </div>
          </div>
        </div>
    </div>
        `
        newsContainer.appendChild(newNewsDiv);
    }
}
isLoading(false);
}

const showDetails = (details,image) =>{
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = ''
    modalContainer.innerHTML = `
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img src="${image}">
        <p class="py-4">${details}</p>
      </div>
    </div>
    `
}


// common function for loader...
const isLoading = (condition)=>{
    const loader = document.getElementById('loader');
    if(condition === true){
        loader.style.display = 'block'
    }
    else{
        loader.style.display = 'none'
    }
}
document.getElementById('news').addEventListener('click',function(){
    window.location.href = './index.html'
})
// blog page redirecting onclick event..
document.getElementById('blog').addEventListener('click',function(){
    window.location.href = './blog.html'
})
//news page redirecting

// loading all news on page load
loadNews(08);
