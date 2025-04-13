function verifyAuth(){
    const isStatus = localStorage.getItem("status")
    const token = localStorage.getItem("token")
    const content = document.getElementById("content")

    if(isStatus && token){
        fetch("https://neptunbk.vercel.app/auth/verify-token", {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(data => {
            if(!data.status){
                window.location.href = '/auth/login.htm'
            }
            else{
                content.style.display = 'none'
            }
        })
    }
    else{
        window.location.href = '/auth/login.htm'
    }
}