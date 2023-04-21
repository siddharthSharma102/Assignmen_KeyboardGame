window.onload = function(){
    createUser();
    updateKeyboard();
}

async function updateKeyboard(){
    var xhr = new XMLHttpRequest();
        xhr.open("GET", "updateKeyboard.php", true);
        xhr.onreadystatechange = function(){
            if (this.readyState === 4 || this.status === 200){
                var data = JSON.parse(this.response);
                for (let i = 1; i <= 10; i++) {
                    document.getElementById('smallDiv'+i).style.backgroundColor = data['div'+i];
                }
            }
        }
        xhr.send();
}
setInterval(updateKeyboard, 2000);

async function createUser(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "user.php");
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 || this.status === 200){
            var data = JSON.parse(this.response);
            if (data.length == 0){
                alert("More Than 2 Users Not Allowed");
            } else {
                sessionStorage.setItem('user_id',data['user_id']);
                sessionStorage.setItem('color', data['color']);
                sessionStorage.setItem("aquire", false);
                console.log(sessionStorage.getItem('user_id'), sessionStorage.getItem('color'));
            }
        }       
    };
    xhr.send();
}

function updateColorData(divId, color){

    var data = "divId="+divId+"&color="+sessionStorage.getItem('color');
    var xhr = new XMLHttpRequest();
    console.log(data);
    xhr.open("POST", "updateColorData.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            console.log(xhr.responseText);
        }
    };
    xhr.send("divId="+divId+"&color="+color);
}

function updateColor(divId){
    var div_color = document.getElementById('smallDiv'+divId).style.backgroundColor; 
    var user_color = sessionStorage.getItem('color');
    console.log("==="+div_color+" : "+user_color);
    var color = div_color == '' || div_color == '_' ? user_color : (div_color == user_color ? '' : user_color);
    console.log(color);
    document.getElementById('smallDiv'+divId).style.backgroundColor = color;
    updateColorData(divId, color);
    saveUserControll("NA");
    sessionStorage.setItem("aquire", false);
}

function userCall(divId){
    if (sessionStorage.getItem("aquire") === "false" || sessionStorage.getItem("aquire") === false){
        alert("Not Aquired");
    } else {
        updateColor(divId);
    }
}

window.addEventListener("beforeunload", function(event) {
    var xhr = new XMLHttpRequest();
    var data = "user_id="+sessionStorage.getItem("user_id");
    xhr.open("POST", "resetUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www.form-urlencoded");
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            console.log(xhr.responseText);
        }
    };
    xhr.send(data);
    
});

function checkUserControll(flag=null){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "checkUserControll.php");
    xhr.send();
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 || this.status == 200){
            var data = this.responseText;
            if (data == "NA" && flag===null){
                console.log("HELLO WORLD"+"NA");
                saveUserControll("user"+sessionStorage.getItem('user_id'));
                sessionStorage.setItem("aquire", true);
                setInterval(function(){
                    sessionStorage.setItem("aquire", false);
                    saveUserControll("NA");
                }, 120000);
            } else if (fata != "NA" && flag == 1){

            }
        }
    }
}

async function saveUserControll(data){
    var xhr = new XMLHttpRequest();
    sessionStorage.setItem("aquire", true);
    var param = "user_id="+sessionStorage.getItem('user_id');
    xhr.open("POST", 'saveUserControll.php');
    xhr.setRequestHeader("Content-type", "application/x-www.form-urlencoded");
    xhr.send(param);
}

function aquireControl(){
    checkUserControll();
}