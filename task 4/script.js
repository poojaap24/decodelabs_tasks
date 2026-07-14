const API = "http://localhost:3000/students";

// Load students
function loadStudents() {

    fetch(API)
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("studentList");
            list.innerHTML = "";

            data.forEach(student => {

                const li = document.createElement("li");
                li.textContent = student.id + " - " + student.name;
                list.appendChild(li);

            });

        })
        .catch(err => console.log(err));

}

// Add Student
function addStudent() {

    const name = document.getElementById("name").value;

    if(name===""){
        alert("Enter student name");
        return;
    }

    fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name:name
        })

    })

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);

        document.getElementById("name").value="";

        loadStudents();

    });

}

loadStudents();