const Input = document.getElementById("task");
const AddBtn = document.getElementById("add");
const ClearBtn = document.getElementById("clear");
const EditBtn = document.getElementById("edit");
const Cancel=document.getElementById("cancel");
const List = document.querySelector(".list");
const editPlace = document.querySelector(".editPlace");
const chekBtn=document.querySelector(".checkbox");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskId = 0;
let data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : [];
console.log(data);

function redlist() {
  List.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    List.innerHTML += `
     <li>
     <span class="main">
     <span class="check">
     <input class="checkbox" onchange="CheckTask(${data[i].id})" type="checkbox" name="" id="">
     </span>
     <input class="editPlace" type="text">${data[i].title}
     </span> 
     <span class="actions">
     <button class="edit" onclick="Edit(${data[i].id})" type="button">Edit</button>
     <button type="button" onclick="Delete(${data[i].id})" class="delete">Delete</button>
     </span></li>
    `;
    List.appendChild(document.getElementsByTagName("li")[i]);
  }
}
redlist();

AddBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (Input.value == "") {
    alert("Please enter a task");
  } else {
    let task = {
      id: data.length + 1,
      title: Input.value,
      completed: false,
    };
    data.unshift(task);
    localStorage.setItem("data", JSON.stringify(data));
    redlist();
    console.log(data);
    Input.value = "";
  }
});

ClearBtn.addEventListener("click", function () {
  Input.value = "";
});

function Delete(id) {
  let index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
  }
  redlist();
}

const Edit = (id) => {
  taskId = id;
  EditBtn.style.display = "block";
  Cancel.style.display="block";
  ClearBtn.style.display = "none";
  AddBtn.style.display = "none";
  let index = data.findIndex((item) => item.id === id);
  Input.value = data[index].title;
  console.log(data[index].title);
  redlist();
};
function EditTask() {
  console.log(Input.value, taskId);
  let index = data.findIndex((item) => item.id === taskId);
  data[index].title = Input.value;
  localStorage.setItem("data", JSON.stringify(data));
  Input.value = "";
  AddBtn.style.display = "block";
  EditBtn.style.display = "none";
  redlist();
}

function CancelTask() {
  let index=data.findIndex((item) => item.id === taskId);
  Input.value = data[index].title;
  Input.value = "";
  AddBtn.style.display = "block";
  ClearBtn.style.display = "block";
  
  EditBtn.style.display = "none";
  Cancel.style.display = "none";
  redlist();
}
// function CheckTask(id) {
//   console.log(id);
   
//    let index = data.findIndex((item) => item.id === id);
//    data[index].completed = true || false;
//    console.log(data[index].completed);
//    localStorage.setItem("data", JSON.stringify(data));

  
//   redlist();
// }
