verifyAuth()

const title = document.getElementById('title')
const desc = document.getElementById('desc')
const img = document.getElementById('img')
const view = document.getElementById('view')
const date = document.getElementById('date')
const is_popular = document.getElementById('is_popular')
const tableDiv = document.getElementById('tableDiv')
const accessBtn = document.getElementById('accessBtn')
const newsDiv = document.getElementById('newsDiv')

function createNews(){
    const obj = {
        title: title.value,
        description: tinymce.get('desc').getContent() ,
        img: img.value,
        view: view.value,
        date: date.value,
        is_popular: is_popular.checked
    }
    // if(validation()) return

    fetch("https://67ee925ac11d5ff4bf7a1d4d.mockapi.io/oxuaz", {
        method: 'POST',
        body: JSON.stringify( obj ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then(mel => {
            getAllNews()
        })
        .catch(err => console.log(err));
}

  const data = []
  
  function getAllNews(){
    title.value = ''
    desc.value = ''
    img.value = ''
    date.value = ''
    view.value = ''

    fetch("https://67ee925ac11d5ff4bf7a1d4d.mockapi.io/oxuaz")
    .then(res => res.json())
    .then(info => {
        data.length = 0
        data.push(...info)
        show()
    })
  }
  getAllNews()

  function show(){
    tableDiv.innerHTML = ''
    data.map(item => {
        tableDiv.innerHTML += `
                    <tr class="font-bold text-black h-50">
                     <td class="border-blue-700 border border-collapse p-2">
                        <img class="object-cover h-[60px] w-[60px]" src="${item.img}" />
                        </td>
                        <td class="border-blue-700 border border-collapse p-2">${item.title}</td>
                        <td class="border-blue-700 border border-collapse p-2">${item.description.slice(0,150)}...</td>
                        <td class="border-blue-700 border border-collapse p-2">${item.date}</td>
                        <td class="border-blue-700 border border-collapse p-2">${item.view}</td>
                        <td class="border-blue-700 border border-collapse p-2">${item.is_popular ? 'Popular' : 'No Popular'}</td>
                        <td onclick="deleteNews('${item.id}')" class="border-blue-700 border-collapse border p-2"><i class="fa-solid fa-trash text-blue-400 cursor-pointer"></i></td>
                        <td onclick="editEle('${item.id}')" class="border-blue-700 border-collapse border p-2"><i class="fa-solid fa-edit text-blue-400 cursor-pointer"></i></td>
                    </tr>
        `
    })
  }

  function deleteNews(id){
    console.log(id);
    fetch(`https://67ee925ac11d5ff4bf7a1d4d.mockapi.io/oxuaz/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(info => {
        console.log(info);
        const yeniElem = data.filter(item => item.id != id )
        data.length = 0
        data.push(...yeniElem)
        show() 
    })
  }

  function editNews(id){ 
    const obj = {
        title: title.value,
        description: desc.value,
        img: img.value,
        view: view.value,
        date: date.value,
        is_popular: is_popular.checked
    }

    if(validation()) return
    
    fetch(`https://67ee925ac11d5ff4bf7a1d4d.mockapi.io/oxuaz/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify( obj ),
      })
      .then(res => res.json())
      .then(info => {
        openNewsDiv()
        getAllNews()

        accessBtn.onclick = createNews

      })
  }

  function validation(){
    title.style.borderColor = 'gray'
    desc.style.borderColor = 'gray'
    img.style.borderColor = 'gray'
    view.style.borderColor = 'gray'
    date.style.borderColor = 'gray'
    is_popular.style.borderColor = 'gray'

    if (title.value.trim() == '') {
        title.focus()
        title.style.borderColor = 'red'
        return true
    }
    if (tinymce.get('desc').getContent().trim() == '') {
        desc.focus()
        desc.style.borderColor = 'red'
        return true
    }
    if (img.value.trim() == '') {
        img.focus()
        img.style.borderColor = 'red'
        return true
    }
    if (date.value.trim() == '') {
        date.focus()
        date.style.borderColor = 'red'
        return true
    }
    if (view.value.trim() == '') {
        view.focus()
        view.style.borderColor = 'red'
        return true
    }
    if (is_popular.value.trim() == '') {
        is_popular.focus()
        is_popular.style.borderColor = 'red'
        return true
    }
  }

  function editEle(id){
    accessBtn.onclick = () => editNews(id)

    openNewsDiv()
    const deyisen = data.find(item => item.id == id)
    title.value = deyisen.title
    desc.value = deyisen.description
    img.value = deyisen.img
    view.value = deyisen.view
    date.value = deyisen.date
  }


function openNewsDiv() { 
  document.body.classList.toggle("overflow-hidden")
  newsDiv.classList.toggle('hidden') 
}