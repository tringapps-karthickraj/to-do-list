function signin(){
    sessionStorage.clear();
    if(localStorage['signup'] !=undefined){
        var email = $('#email').val();
        var password = $('#password').val();
        console.log(password)
        let user = JSON.parse(localStorage['signup']);
        let finduser = user.users.find(ele => ele.email == email && ele.password == password);
        if(finduser){
            
            let login={
                "email":email,
                "password":password
            }

            sessionStorage.setItem('login',JSON.stringify(login));
            document.getElementById('already').style.display="none";
            return true;
        }
    }
    document.getElementById('already').style.display="block";
    return false;
}