let storage='';
let user='';
let findUser='';
let userDetails='';
$( document ).ready(function() {
    if(sessionStorage.getItem('login') !=undefined ){
        storage = JSON.parse(sessionStorage.getItem('login'));
        user = JSON.parse(localStorage['signup']);
        findUser = user.users.find(ele => ele.email == storage.email && ele.password == storage.password);
        userDetails = findUser;
        document.getElementById('showhide').style.display="block";
        if(userDetails.todolist.length > 0){
            display();
        }
    }else{
        alert('pls sign in first');
        location.href = "signin.html";
    }
});
function clearcomplete(){
    if(userDetails.todolist.length>0){
       var completeClear =  userDetails.todolist.filter(check => check.checked =='no');
       userDetails.todolist= completeClear;
       display();
    } 
}
function empty() {
    userDetails.todolist = [];
    document.getElementById('todo').innerHTML = '';
    display();
}
function save() {
    storage = JSON.parse(sessionStorage.getItem('login'));
     user = JSON.parse(localStorage['signup']);
    for(let list of user.users){
        if(list.email == storage.email && list.password ==  storage.password){
            list.todolist = userDetails.todolist;
        }
    }
    localStorage['signup']=JSON.stringify(user);

}
function add() {
    let promt = prompt("task:");
    console.log(promt)
    if(promt.trim().length !=0){
        let add= {
        "taskname":promt,
        "checked":"no"
        }
    userDetails.todolist.push(add);
    display();
    }

}
function strike(idx){
if(userDetails.todolist[idx].checked == "yes"){
    userDetails.todolist[idx].checked = 'no';
}else{
    userDetails.todolist[idx].checked = 'yes';
}
   display();
}
function display(){
    var html = '<table cellpadding="5">';
        let index = 0;
   for (let list of userDetails.todolist) {
        html += '<tr>' ;
        if(list.checked == 'yes'){
            html+= '<td><div class="padd"><div onclick="strike(\'' + index + '\')"><s>' + list.taskname + '</s></div></td><td><div class="padd delete" onclick="deleteone(\'' + index + '\')">x</div></div></td>' ;
        }else{
            html+= '<td><div class="padd"><div onclick="strike(\'' + index + '\')">' + list.taskname + '</div></td><td><div class="padd delete" onclick="deleteone(\'' + index + '\')">x</div></div></td>' ;
        }
        index++;
        html+='</tr>';
    }
    html +='</table>';
    document.getElementById('todo').innerHTML = html;
    save();
}
function logout(){
    sessionStorage.clear();
    location.href = "signin.html";
}
function deleteone(idx){
    userDetails.todolist.splice(idx,1);
    display();
}