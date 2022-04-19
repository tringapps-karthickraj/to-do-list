var storage='';
var user='';
var finduser='';
var userdetails='';
$( document ).ready(function() {
if(sessionStorage.getItem('login') !=undefined ){

     storage = JSON.parse(sessionStorage.getItem('login'));
     user = JSON.parse(localStorage['signup']);
     finduser = user.users.find(ele => ele.email == storage.email && ele.password == storage.password);
     userdetails = finduser;
//         document.write(`<style>
//     .border{
//         border: 2px solid;
//         margin: auto;
//         width: 50%;
//         height: auto;
//         background-color: #ffffff;
//     }
//     table{
//         margin:auto;
//     }
//     .padd{
//         padding: 6px;
//         background: red;
//         color:white;
//         display:flex;
//     }
//     .delete{
//         margin-left:-11px;
//         background-color:rosybrown;
//         cursor: pointer;
//     }
// </style><body style="text-align: center;height: 100%;background:blueviolet;">

// <div style="margin-top: 10%;">
// <div class="border">
//     <h1>To do list</h1>
//     <div id="todo"></div>
//     <table>
//         <tr>
//             <td><button onclick="clearcomplete()">Clear complete</button></td>
//             <td><button onclick="empty()">Empty list</button></td>
//             <td><button onclick="save()">Save list</button></td>
//             <td><button onclick="add()">Add task</button></td>
//             <td><button onclick="logout()">Logout</button></td>
//     </tr>

//     </div>
//     </div>
//     </body>`);
    document.getElementById('showhide').style.display="block";
    if(userdetails.todolist.length > 0){
        display();
}

}else{
   alert('pls sign in first');
   location.href = "signin.html";
}
});
function clearcomplete(){
    if(userdetails.todolist.length>0){
       var completeClear =  userdetails.todolist.filter(check => check.checked =='no');
       userdetails.todolist= completeClear;
       display();
        } 
}
function empty() {
    userdetails.todolist = [];
    document.getElementById('todo').innerHTML = '';
    display();
}
function save() {
    storage = JSON.parse(sessionStorage.getItem('login'));
     user = JSON.parse(localStorage['signup']);
    for(let list of user.users){
    if(list.email == storage.email && list.password ==  storage.password){
        list.todolist = userdetails.todolist;
    }
    }
    console.log(user);
    localStorage['signup']=JSON.stringify(user);

}
function add() {
    let promt = prompt("task:");
    console.log(promt)
    if(promt){
        let add= {
        "taskname":promt,
        "checked":"no"
    }
    userdetails.todolist.push(add);
    display();
    }

}
function strike(idx){
if(userdetails.todolist[idx].checked == "yes"){
    userdetails.todolist[idx].checked = 'no';
}else{
    userdetails.todolist[idx].checked = 'yes';
}
   display();
}
function display(){
    
    var html = '<table cellpadding="5">';
        let index = 0;
   for (let list of userdetails.todolist) {
       
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
    userdetails.todolist.splice(idx,1);
    display();
}