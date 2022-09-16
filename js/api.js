// Global data fetching function
const loadData = async(apiURL, displayFun) => {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        displayFun(data);
    }
    catch (error) {
        console.log(error);
    };
};

// Getting categories data from fetching
const getCategories = categories => {
    categories.data.news_category.forEach(category => {
        const {category_id, category_name} = category;
        // <li id="category-item" onclick="loadCategory(${category_id})" class="category-item hover:text-blue-600 py-1 cursor-pointer">${category_name}</li>
        const newCategory = `
            <li id="categories-menu" onclick="loadCategory(${category_id})" class="category-item hover:text-blue-600 py-1 cursor-pointer">${category_name}</li>
            `;
        document.getElementById('categories-menu').innerHTML += newCategory;
    });
    // Calling default category
    const categoryURL = `https://openapi.programming-hero.com/api/news/category/01`;
    loadData(categoryURL, getCategory);
    // Default category active style
    document.getElementById('categories-menu').firstElementChild.classList.add('text-white', 'bg-blue-600', 'px-3', 'rounded');
};

// Getting category by id
const loadCategory = categoryId => {
    // Spinner start
    document.getElementById('spinner').classList.remove('hidden');

    // Active category style
    const categories = document.getElementsByClassName('category-item');
    for (category of categories) {
        category.classList.remove('text-white', 'bg-blue-600', 'px-3', 'rounded');
        event.target.classList.add('text-white', 'bg-blue-600', 'px-3', 'rounded');
        event.target.classList.remove('hover:text-blue-600');
    };
    
    // Calling category to fetch
    const categoryURL = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    loadData(categoryURL, getCategory);
};

// Getting categories data from fetching
const getCategory = category => {
    // Clearing news
    document.getElementById('news-feed').innerHTML = '';
    document.getElementById('result').parentNode.classList.remove('hidden');
    document.getElementById('result').innerText= `ⓘ ${category.data.length} news found`;
    // Array sorting by views
    const newArray = category.data.sort((a, b) => a.total_view > b.total_view ? -1 : a.total_view < b.total_view ? 1 : 0);
    newArray.forEach(news => {
        const newNews = `
            <div class="flex flex-col items-center bg-white p-4 rounded-lg border shadow-md md:flex-row gap-4">
            <img class="object-cover w-full h-48 rounded-lg md:h-auto md:w-48" src="${news.thumbnail_url}" alt="">
                <div class="flex flex-col justify-between p-0 md:p-4 gap-5">
                    <div>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${news.title}</h5>
                        <p class="mb-3 font-normal text-gray-700">${news.details.length < 300 ? news.details : news.details.slice(0, 300)}...</p>
                    </div>
                    <div class="flex flex-wrap items-center justify-between gap-5">
                        <div class="flex items-center gap-3 cursor-pointer">
                            <div>
                                <img class="h-10 rounded-full" src="${news.author.img}" alt="${news.author.name}">
                            </div>
                            <div class="text-sm font-semibold">
                                <p class="hover:text-blue-600">${news.author.name === null || news.author.name === '' ? 'Author Not Found' : news.author.name}</p>
                                <p class="hover:text-blue-600">${news.author.published_date === null ? 'Date Not Found' : news.author.published_date.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div class="flex gap-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <p class="font-bold hover:text-blue-600">${news.total_view === null || news.total_view === 0 ? 'No Views' : news.total_view}</p>
                        </div>
                        <div class="flex cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${news.rating.number >= 1 ? 'text-blue-600' : ''} w-6 h-6 hover:text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${news.rating.number >= 2 ? 'text-blue-600' : ''} w-6 h-6 hover:text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${news.rating.number >= 3 ? 'text-blue-600' : ''} w-6 h-6 hover:text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${news.rating.number >= 4 ? 'text-blue-600' : ''} w-6 h-6 hover:text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="${news.rating.number === 5 ? 'text-blue-600' : ''} w-6 h-6 hover:text-blue-600"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> 
                        </div>
                        <label data-hs-modal="#hs-basic-modal" onclick="loadNews('${news._id}')" class="hover:text-white hover:bg-blue-600 px-3 py-1.5 rounded cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                        </label>
                    </div>
                </div>
            </div>
        `;
        // Creating new news
        document.getElementById('news-feed').innerHTML += newNews;
    });
    // Spinner stop
    document.getElementById('spinner').classList.add('hidden');
};

// Getting news detail by id
const loadNews = newsId => {
    // Calling news
    const newsURL = `https://openapi.programming-hero.com/api/news/${newsId}`;
    loadData(newsURL, getNews);
};

// Getting news data by fetching
const getNews = news => {
    const {title, image_url, total_view} = news.data[0];
    const newModal = `
        <div class="hs-modal-open:opacity-100 hs-modal-open:duration-500 transition-all sm:max-w-lg sm:w-full mx-3">
            <div class="flex flex-col bg-white shadow rounded-lg">
                <div class="flex items-center justify-between px-5 py-4 border-b">
                    <h3 class="text-xl font-semibold">${title.slice(0, 30)}...</h3>
                    <button type="button" class="text-white px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none transition-all" data-hs-modal="#hs-basic-modal">Close</button>
                </div>
                <div class="text-md p-5 space-y-2">
                    <img class="rounded-lg mb-5" src="${image_url}" alt="">
                    <p><span class="font-bold">Author:</span> ${news.data[0].author.name === null || news.data[0].author.name === '' ? 'Not Found' : news.data[0].author.name}</p>
                    <p><span class="font-bold">Views:</span> ${total_view === null || total_view === 0 ? 'No Views' : total_view}</p>
                    <p><span class="font-bold">Published Date:</span> ${news.data[0].author.published_date === null ? 'Date Not Found' : news.data[0].author.published_date}</p>
                    <p><span class="font-bold">Rating:</span> ${news.data[0].rating.number}</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById('hs-basic-modal').innerHTML = newModal;
    // const newModal = `
    //     <div class="w-[90%] sm:w-2/4 max-w-sm sm:max-w-screen-sm bg-white rounded-lg">
    //         <div class="flex justify-between items-center border-b mt-2 px-8 py-3">
    //             <h3 class="text-xl font-semibold">${title.slice(0, 30)}...</h3>
    //             <button onclick="closeModal()" type="button" class="text-white px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded">Close</button>
    //         </div>
    //         <div class="text-md mb-2 px-8 py-5 space-y-3">
    //             <img class="rounded-lg" src="${image_url}" alt="">
    //             <p><span class="font-bold">Author:</span> ${news.data[0].author.name === null || news.data[0].author.name === '' ? 'Not Found' : news.data[0].author.name}</p>
    //             <p><span class="font-bold">Views:</span> ${total_view === null || total_view === 0 ? 'No Views' : total_view}</p>
    //             <p><span class="font-bold">Published Date:</span> ${news.data[0].author.published_date === null ? 'Date Not Found' : news.data[0].author.published_date}</p>
    //             <p><span class="font-bold">Rating:</span> ${news.data[0].rating.number}</p>
    //         </div>
    //     </div>
    // `;
    // document.getElementById('modal-box').innerHTML = newModal;

    // const modalBox = document.getElementById('modal-box');
    // modalBox.classList.add('scale-100');
    // closeModal = () => {
    //     modalBox.classList.remove('scale-100');
    // };
};

// Calling the fetching categories
const allCategoriesURL = 'https://openapi.programming-hero.com/api/news/categories';
loadData(allCategoriesURL, getCategories);

// responsive menu
// document.getElementById('menu-open').addEventListener('click', function () {
//     document.getElementById('menu-open').classList.add('hidden');
//     document.getElementById('menu-close').classList.remove('hidden');
//     document.getElementById('responsive-menu').classList.remove('hidden');
// });

// document.getElementById('menu-close').addEventListener('click', function () {
//     document.getElementById('menu-close').classList.add('hidden');
//     document.getElementById('menu-open').classList.remove('hidden');
//     document.getElementById('responsive-menu').classList.add('hidden');
// });

// // responsive categories
// document.getElementById('categories-open').addEventListener('click', function () {
//     document.getElementById('categories-open').classList.add('hidden');
//     document.getElementById('categories-close').classList.remove('hidden');
//     document.getElementById('responsive-categories').classList.remove('hidden');
//     document.getElementById('responsive-categories').classList.add('mb-5');
// });

// document.getElementById('categories-close').addEventListener('click', function () {
//     document.getElementById('categories-close').classList.add('hidden');
//     document.getElementById('categories-open').classList.remove('hidden');
//     document.getElementById('responsive-categories').classList.add('hidden');
//     document.getElementById('responsive-categories').classList.remove('mb-5');
// });