let allExpenses = [];
let inputValue = "";
let inputValueNumber = "";
let editTask = -1;
let intermediaresult ="";
let intermediaresultNumber ="";
let intermediaresultDate =""
let valueDblckTxt = -1;
let valueDblckPrice = -1;
let valueNewData = -1;
let dd =""
let flag = false;

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

const newDateFormat = () =>{
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yy = now.getFullYear();
  if(dd < 10) dd ="0" + dd;
  if(mm < 10) mm ="0" + mm;
  if(yy < 10) yy ="0" + yy;
  return dd + "." + mm + "." + yy
}


const updateValue = (event) => {
  inputValue = event.target.value;
};

const updateValueNumb = (event) => {
  inputValueNumber = event.target.value;
};

const render = () => {
  let count = " ";
  const global = document.getElementById("global");
  while (global.firstChild) {
    global.removeChild(global.firstChild);
  }
  allExpenses.map((item) => (count += item.Expenses));
  const content = document.getElementById("content-page");
  const globalCount = document.createElement("p");
  globalCount.className ="count"
  globalCount.innerText = count + " " + "руб.";
  global.appendChild(globalCount);
  
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allExpenses.map((value, index) => {
    const container = document.createElement("div");
    const Expens = document.createElement("div");
    Expens.className ="expenses-in-container"
    const  newDateCont = document.createElement("div");
    newDateCont.className ="date-in-container"
    if(flag == true){
    newDateCont.innerText = newDateFormat();
      flag = false
    } else {
      let format = allExpenses[index].Date.split("-").reverse().join(".")
      newDateCont.innerText = format
    }
    dd =  newDateCont.innerText
    // console.log(newDateCont.innerText)
    Expens.innerText = value.Expenses + " " + "руб.";
    const imgDelete = document.createElement("img");
    container.className = "div-container-text";
    const text = document.createElement("p");
    text.className ="text-in-container"
    text.innerText = value.text;
    
    if (index === editTask) {
      newValueText = allExpenses[index].text;
      newValue = allExpenses[index].Expenses;
      ddddddDATA = dd;
      console.log(dd)

      const editDataTask =document.createElement("input");
      const newinputTask = document.createElement("input");
      const newNumberTask = document.createElement("input");
      
      editDataTask.type ="date"
      editDataTask.min ="2022-01-01"
      editDataTask.max ="2022-12-31"
      newNumberTask.type ="Number";
      newinputTask.type = "text";

      editDataTask.value = dd
      newNumberTask.value = value.Expenses;
      newinputTask.value = value.text;

      editDataTask.innerText = dd
      newNumberTask.innerText = value.Expenses;
      newinputTask.innerText = value.text;

      intermediaresultDate= dd;
      intermediaresultNumber = value.Expenses;
      intermediaresult = value.text;

      editDataTask.className = "inputDateChange"
      newNumberTask.className = "inputNumberChange";
      newinputTask.className = "inputChange";

      newNumberTask.addEventListener("change", newPrice);
      newinputTask.addEventListener("change", taskTxt);
      editDataTask.addEventListener("change", dateNew)

      container.appendChild(newinputTask);
      container.appendChild(editDataTask);
      container.appendChild(newNumberTask);
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
      switch(index){
      case  valueDblckTxt:
        const newinputTask = document.createElement("input");
        newinputTask.addEventListener("blur", onblurTxt)

        newinputTask.type = "text";
        newinputTask.innerText = value.text;
        console.log(newinputTask.innerText )
        newinputTask.className = "inputChange";
        container.appendChild(newinputTask);
        container.appendChild(newDateCont);
        container.appendChild(Expens);
        break;

        case valueDblckPrice:
        const newNumberTask = document.createElement("input");
        newNumberTask.type = "Number";
        newNumberTask.innerText = value.Expenses;
        newNumberTask.className = "inputChangeExpenses";
        container.appendChild(text);
        container.appendChild(newDateCont);
        container.appendChild(newNumberTask);
        break;

        case valueNewData:
        const newDate = document.createElement("input");
        newDate.type = "date";
        container.appendChild(text);
        container.appendChild(newDate);
        container.appendChild(Expens);
        break;
      
    
      default:
        container.appendChild(text);
        container.appendChild(newDateCont);
        container.appendChild(Expens);
        const noEdit = document.createElement("div");
        container.appendChild(noEdit);
        imgDelete.src = "delete.png";
        noEdit.appendChild(imgDelete);
        imgDelete.onclick = () => {
          delTask(index);
        };
        text.addEventListener('dblclick', () => dblcklText(index));
        Expens.addEventListener('dblclick', () => dblcklExpens(index));
        newDateCont.addEventListener('dblclick', () => dblcklnewDate(index));
        const imgEdit = document.createElement("img");
        imgEdit.src = "edit.png";
        imgEdit.onclick = () => {
          editTask = index;
          render();
        };
        noEdit.appendChild(imgEdit);
      }
    }
    content.appendChild(container);
  });
};

const onCklickButton = async () => {
  if(editTask >= 0){  
    alert("Закончите редактировние")
  }else{
  let dt = newDateFormat()
  console.log(dt)
  if(inputValueNumber <= 0){
    alert("Расходы должны быть больше 0 рублей.")
  } else{
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
        Date: dt
        
      }),
    });
    flag = true;
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
};
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

const taskTxt = (event) => {
  newValueText = event.target.value;
}
const newPrice = (event) => {
  newValue= event.target.value;
}

const dateNew = (event) =>{
  ddddddDATA = event.target.value;

}


const backTask = () => {
    editTask = "-1";
    render();
};

const dblcklText = (index) => {
  valueDblckTxt = index;
  render();
};

const dblcklExpens = (index) => {
  valueDblckPrice = index;
  render();
};

const dblcklnewDate = (index) =>{
  valueNewData = index;
  render();
}


const doneTask = async (index) => {
    let {_id} = allExpenses[index];
      const resp = await fetch(
        `http://localhost:8000/updateTask`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            _id ,
            text: newValueText === allExpenses[index].text ? allExpenses[index].text : newValueText,
            Expenses: newValue ===  allExpenses[index].Expenses ? allExpenses[index].Expenses : newValue,
            Date: ddddddDATA === dd ? dd: ddddddDATA
          }),
          
        }
      );
      const result = await resp.json();
      allExpenses = result.data;
      editTask = -1;
      dd=""
      ddddddDATA =""
      newValueText = '';
      newValue =";"
      render();
};

