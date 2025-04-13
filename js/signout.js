function signOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('status')
    window.location.href = '/index.htm'
}