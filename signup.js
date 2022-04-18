function signup(){
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    if(localStorage['signup']==undefined){
        let users ={
            "users":[],
            
        }
     localStorage['signup']=JSON.stringify(users);
    }
    let localStorageusers = JSON.parse(localStorage['signup']);
    if(localStorageusers.users.length > 0){
        let finduser = localStorageusers.users.find(ele => ele.email == email && ele.password == password);
        if(finduser){
         document.getElementById('already').style.display="block";
             return false;
        }
    }
    let newusers = {
         "name":name,
         "email":email,
         "password":password,
         "todolist":[]
    }
    localStorageusers.users.push(newusers);
    localStorage['signup'] = JSON.stringify(localStorageusers);
}