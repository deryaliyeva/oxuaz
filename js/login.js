const email = document.getElementById('email')
const password = document.getElementById('password')

function postLogin(){    
    fetch('https://neptunbk.vercel.app/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            "login": email.value,
            "password": password.value
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res =>{
            console.log(res);

            return res.json()
            
        })
        .then(data => {
            console.log(data);
            
            const { token, status, refresh} = data
            if(status) {
                localStorage.setItem('token', token)
                localStorage.setItem('status', status)
                window.location.href = '/admin/admin.htm'
            }else{
                alert('Invalid email or password!')
            }
        })
        .catch(err => {
            console.log(err);
            
        })
        
}