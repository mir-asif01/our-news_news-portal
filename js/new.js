// loading category

const loadCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(categories => showCategories(categories.data.news_category))
    .catch(err => showError(err));
}

// showing error for category loading api...
const showError = (err) =>{
    window.alert('Error on fetching API')
    document.write(err);
}

// showing category
const showCategories = (categories) =>{
    for(const category of categories){
        const categoryContainer = document.getElementById('categories');
        const newCategoryDiv = document.createElement('div');
        newCategoryDiv.innerHTML = `
        <button class="text-xl" onclick="loadNews(${category.category_id})" >
        <span class="text-red-400">${category.category_name}</span></button>
        `
        categoryContainer.appendChild(newCategoryDiv)
    }
}

// loading news
const loadNews = (category) =>{
    isLoading(true);
    const url =`https://openapi.programming-hero.com/api/news/category/0${category}`
    fetch(url)
    .then(res => res.json())
    .then(allNews => showNews(allNews.data))
    .catch(err => showError2(err))
}

// showing error for news loading api
const showError2 = (err) =>{
    window.alert('Error on fetching API')
    document.write(err);
}

//showing news
const showNews = (UnsoetedNewsArray) =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const itemCounter = document.getElementById('item-counter');
    const sortedNewsArray = UnsoetedNewsArray.sort(function(a,b){
        if(a.total_view > b.total_view){
            return -1;
        }
        if(a.total_view<b.total_view){
            return 1;
        }
        return 0;
    })
    const sortedNewsArrayLength = sortedNewsArray.length;
    if(sortedNewsArrayLength ===0){
    itemCounter.innerText = `no news found`;
    }
    else{
    sortedNewsArray.forEach(news => {
        itemCounter.innerText = `${sortedNewsArrayLength} news found`;        
        const {name,img,published_date} = news.author;
        const {badge,number} = news.rating;
        const newNewsDiv = document.createElement('div');
        newNewsDiv.innerHTML = `
        <div class="card lg:card-side bg-base-100 m-3 shadow-xl">
            <img src="${news.thumbnail_url}" alt="Album">
            <div class="card-body">
                <h2 class="card-title font-bold">${news.title}</h2>
                <p>${news.details.length > 300 ? news.details.slice(0,120)+'......': news.details}</p>
            <div class="card-actions flex justify-between items-center">
                <div>
                    <img src="${news.author.img}" class="w-10">
                    <h1>${news.author.name ? news.author.name : 'Data is not available' }</h1>
                </div>
                <div>
                <h1>Published : ${news.author.published_date ? news.author.published_date : 'Data is    not available' }</h1>
                <h1>Total Views : ${news.total_view ? news.total_view : 'no data found'}</h1>
                </div>
                <div>
                <label for="my-modal-3" class="btn btn-primary modal-button" 
                onclick="showDetails('${name}','${img}','${published_date}','${badge}','${number}')"
                >Show Details</label>
                </div>
            </div>
            </div>
        </div>
        `
         newsContainer.appendChild(newNewsDiv);
    })
}
isLoading(false);
}

//showing details using modal
const showDetails = (name,img,published_date,badge,number) =>{
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <h1 class="text-2xl text-center text-green-600">News Rating</h1>
    <h1 class="text-xl text-yellow-500 font-bold">Ratings : ${number}</h1>
    <h1 class="text-xl">Quality : ${badge}</h1>
    <hr>
    <h1 class="text-2xl text-center my-3 text-green-600">Author Details</h1>
     <img src="${img}" class="w-1/3 rounded-full mx-auto"/>
     <h1 class="text-xl text-green text-center">Authors Name : <u>${name ? name : 'no data available'}</u></h1>
     <h2 class="text-xl text-center">Publishing Date : ${published_date}</h2>
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

//loading all categories on page load
loadCategories();
// loading all news on page load
loadNews(08);



