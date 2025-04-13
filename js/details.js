const params = new URLSearchParams(window.location.search)
const itemId = params.get('id')
const detailsCards = document.getElementById('detailsCards')

fetch(`https://67ee925ac11d5ff4bf7a1d4d.mockapi.io/oxuaz/${itemId}`)
.then(res => res.json())
.then(item => {
        getDetailsCard(item.img, item.date, item.view, item.title, item.description)
})

function getDetailsCard(img, date, view, title, description) {
    
    detailsCards.innerHTML += 
    ` <div class="flex flex-col max-w-[800px] p-2 space-y-6 overflow-hidden rounded-[13px] text-gray-800">
                    <img src="${img}" alt="" class="object-cover mb-4 w-[700px] h-[400px] sm:h-86 dark:bg-gray-500">
                    <div class="flex justify-between max-w-[700px] items-center text-gray-400">
    
                            <div>
                                <i class="fa-solid fa-calendar-days px-2"></i>
                                <span>${date}</span>
                            </div>
    
                           <div>
                                <i class="fa-solid fa-eye px-2"></i>
                                <span>${view}</span>
                            </div>
                    </div>
                    <div>
                        <h2 class="mt-5 mb-1 text-xl font-semibold">${title}</h2>
                        <p class="text-gray-600">${description}</p>
                    </div>

                    <button onclick="toBack()" class="bg-[#1894A0] text-white py-3 rounded-lg max-w-[200px]">Back To Homepage</button>
            </div>`
}

function toBack() {
    window.location.href = '/index.htm'
}