let allExpenses = [];
let inputValue = "";
let inputValueNumber = "";
let editTask = -1;
let intermediaresult ="";
let intermediaresultNumber ="";
let now = new Date();

window.onload = async () => {
  inputTask = document.getElementById("add-task");
  inputNumber = document.getElementById("add-task-number");
  inputTask.addEventListener("change", updateValue);
  inputNumber.addEventListener("change", updateValueNumb);
  const resp = await fetch("http://localhost:8000/allExpenses", {
    method: "GET",
  });
  const result = await resp.json();
  allExpenses = result.data;
  render();
};

const newDateFormat = (now) =>{
  let dd = now.getDate();
  if(dd < 10) dd ="0" + dd;
  let mm = now.getMonth() + 1;
  if(mm < 10) mm ="0" + mm;
  let yy = now.getFullYear() % 100;
  if(yy < 10) yy ="0" + yy;
  return dd + "." + mm + "." + yy
}
const formatData = newDateFormat(now);

const updateValue = (event) => {
  inputValue = event.target.value;
};

const updateValueNumb = (event) => {
  inputValueNumber = event.target.value;
};

const render = () => {
  let count = null;
  const global = document.getElementById("global");
  while (global.firstChild) {
    global.removeChild(global.firstChild);
  }
  allExpenses.map((item) => (count += item.Expenses));

  const content = document.getElementById("content-page");
  const globalCount = document.createElement("p");
  globalCount.className ="count"
  globalCount.innerText = count;
  global.appendChild(globalCount);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allExpenses.map((value, index) => {
    const container = document.createElement("div");
    const cena = document.createElement("div");
    const  newDate = document.createElement("div");
    newDate.innerText = formatData;
    cena.innerText = value.Expenses + " " + "руб.";
    const imgDelete = document.createElement("img");
    container.className = "div-container-text";
    const text = document.createElement("p");
    text.innerText = value.text;
    container.appendChild(text);
    container.appendChild(cena);
    container.appendChild(newDate)
    
    if (index === editTask) {
      const newinputTask = document.createElement("input");
      const newNumberTask = document.createElement("input");
      newNumberTask.type ="Number";
      newinputTask.type = "text";
      newNumberTask.value = value.Expenses;
      newinputTask.value = value.text;
      newNumberTask.innerText = value.Expenses;
      newinputTask.innerText = value.text;
      intermediaresultNumber = value.Expenses;
      intermediaresult = value.text;
      newNumberTask.className = "inputNumberChange";
      newinputTask.className = "inputChange";
      newNumberTask.addEventListener("change", taskTxt);
      newinputTask.addEventListener("change", taskTxt);
      container.appendChild(newNumberTask);
      container.appendChild(newinputTask);
      const newDiv = document.createElement("div");
      container.appendChild(newDiv);
      const imgDone = document.createElement("img");
      const imgBack = document.createElement("img");
      imgDone.src = "done.png";
      imgBack.src = "back.png";
      imgDone.onclick = () => {
        doneTask(index);
      };
      
      imgBack.onclick = () => backTask();
      newDiv.appendChild(imgDone);
      newDiv.appendChild(imgBack);
    } 
    else {
      const noEdit = document.createElement("div")
      container.appendChild(noEdit);
      imgDelete.src = "delete.png";
      noEdit.appendChild(imgDelete);
      imgDelete.onclick = () => {
        delTask(index);
      };
      const imgEdit = document.createElement("img");
      imgEdit.src = "edit.png";
      imgEdit.onclick = () => {
        editTask = index;
        render();
      };
      noEdit.appendChild(imgEdit);
    }
    content.appendChild(container);
  });
};

const onCklickButton = async () => {
  if (inputValue.trim() && inputValueNumber.trim()) {
    const resp = await fetch("http://localhost:8000/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        text: inputValue,
        Expenses: inputValueNumber,
      }),
    });
    const result = await resp.json();
    allExpenses = result.data;
    inputValue = " ";
    inputTask.value = "";
    inputValueNumber = "";
    inputNumber.value = "";
    render();
  } else {
    alert("Поле не заполнено!");
  }
};

const delTask = async (index) => {
  const _id = allExpenses[index]._id;
  const resp = await fetch(`http://localhost:8000/deleteTask?id=${_id}`, {
    method: "DELETE",
  });
  const result = await resp.json();
  allExpenses = result.data;
  render();
};

const taskTxt = () =>{

}

const backTask = () => {
    editTask = "-1";
    render();
}

const doneTask = async (index) => {

  };