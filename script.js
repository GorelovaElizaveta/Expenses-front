let allExpenses = [];
let inputValue = "";
let inputValueNumber = "";
let editTask = -1;
let intermediaresult = "";
let intermediaresultNumber = "";
let intermediaresultDate = "";
let valueDblckTxt = -1;
let valueDblckPrice = -1;
let valueNewData = -1;
let mainDate = "";
let flag = false;
let newValueText = "";

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

const newDateFormat = () => {
  let now = new Date();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yy = now.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (yy < 10) yy = "0" + yy;
  return dd + "." + mm + "." + yy;
};

const updateValue = (event) => {
  inputValue = event.target.value;
};

const updateValueNumb = (event) => {
  inputValueNumber = event.target.value;
};

const render = () => {
  let count = 0;
  const global = document.getElementById("global");
  while (global.firstChild) {
    global.removeChild(global.firstChild);
  }
  allExpenses.map((item) => (count += item.Expenses));
  const content = document.getElementById("content-page");
  const globalCount = document.createElement("p");
  globalCount.className = "count";
  globalCount.innerText = count + " " + "руб.";
  global.appendChild(globalCount);

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allExpenses.map((value, index) => {
    const container = document.createElement("div");
    const Expens = document.createElement("div");
    Expens.className = "expenses-in-container";
    const newDateCont = document.createElement("div");
    newDateCont.className = "date-in-container";
    if (flag == true) {
      newDateCont.innerText = newDateFormat();
      flag = false;
    } else {
      let format = allExpenses[index].Date.split("-").reverse().join(".");
      newDateCont.innerText = format;
    }
    mainDate = newDateCont.innerText;
    Expens.innerText = value.Expenses + " " + "руб.";
    const imgDelete = document.createElement("img");
    container.className = "div-container-text";
    const text = document.createElement("p");
    text.className = "text-in-container";
    text.innerText = value.text;

    if (index === editTask) {
      valueNewData = -1;
      valueDblckPrice = -1;
      valueDblckTxt = -1;
      newValueText = allExpenses[index].text;
      newValue = allExpenses[index].Expenses;
      dateСhange = mainDate;
      const forEdit = document.createElement("div");

      const editDataTask = document.createElement("input");
      const newinputTask = document.createElement("input");
      const newNumberTask = document.createElement("input");

      editDataTask.type = "date";
      editDataTask.min = "2022-01-01";
      editDataTask.max = "2022-12-31";
      newNumberTask.type = "Number";
      newinputTask.type = "text";
      let arrTemp = value.Date.split('.');
      let corDate = arrTemp[2] + '-' + arrTemp[1]+ '-' + arrTemp[0]

      editDataTask.value = corDate;
      newNumberTask.value = value.Expenses;
      newinputTask.value = value.text;

      editDataTask.innerText = mainDate;
      newNumberTask.innerText = value.Expenses;
      newinputTask.innerText = value.text;

      intermediaresultDate = mainDate;
      intermediaresultNumber = value.Expenses;
      intermediaresult = value.text;

      editDataTask.className = "inputDateChange";
      newNumberTask.className = "inputNumberChange";
      newinputTask.className = "inputChange";

      newNumberTask.addEventListener("change", newPrice);
      newinputTask.addEventListener("change", taskTxt);
      editDataTask.addEventListener("change", dateNew);
      container.appendChild(forEdit);
      forEdit.appendChild(newinputTask);
      forEdit.appendChild(editDataTask);
      forEdit.appendChild(newNumberTask);
      const divForIcon = document.createElement("div");
      container.appendChild(divForIcon);
      const imgDone = document.createElement("img");
      const imgBack = document.createElement("img");
      imgDone.src = "done.png";
      imgBack.src = "back.png";
      imgDone.onclick = () => doneTask(index);
      imgBack.onclick = () => backTask();
      divForIcon.appendChild(imgDone);
      divForIcon.appendChild(imgBack);
    } else {
      switch (index) {
        case valueDblckTxt:
          let test = allExpenses[index].text;
          const newinputTask = document.createElement("input");
          newinputTask.focus()
          newinputTask.addEventListener("blur", (e) =>
            onblurTxt(e, index, test)
          );
          newinputTask.type = "text";
          newinputTask.value = value.text;
          newinputTask.className = "inputChange";
          container.appendChild(newinputTask);
          container.appendChild(newDateCont);
          container.appendChild(Expens);
          text.addEventListener("dblclick", () => dblcklText(index));
          Expens.addEventListener("dblclick", () => dblcklExpens(index));
          newDateCont.addEventListener("dblclick", () => dblcklnewDate(index));
          break;

        case valueDblckPrice:
          let testEx = allExpenses[index].Expenses;
          const newNumberTask = document.createElement("input");
          newNumberTask.focus()
          newNumberTask.addEventListener("blur", (e) =>
            onblurNumber(e, index, testEx)
          );
          newNumberTask.type = "Number";
          newNumberTask.value = value.Expenses;
          newNumberTask.className = "inputChangeExpenses";
          container.appendChild(text);
          container.appendChild(newDateCont);
          container.appendChild(newNumberTask);
          text.addEventListener("dblclick", () => dblcklText(index));
          Expens.addEventListener("dblclick", () => dblcklExpens(index));
          newDateCont.addEventListener("dblclick", () => dblcklnewDate(index));
          break;

        case valueNewData:
          let testDate = mainDate;
          let formatTestDate = testDate.split(".").reverse().join("-");
          const newDate = document.createElement("input");
          newDate.focus()
          newDate.value = formatTestDate;
          newDate.addEventListener("blur", (e) =>
            onblurDate(e, index, formatTestDate)
          );
          newDate.type = "date";
          newDate.min = "2022-01-01";
          newDate.max = "2022-12-31";
          container.appendChild(text);
          container.appendChild(newDate);
          container.appendChild(Expens);
          text.addEventListener("dblclick", () => dblcklText(index));
          Expens.addEventListener("dblclick", () => dblcklExpens(index));
          newDateCont.addEventListener("dblclick", () => dblcklnewDate(index));
          break;

        default:
          container.appendChild(text);
          container.appendChild(newDateCont);
          container.appendChild(Expens);
          const noEdit = document.createElement("div");
          container.appendChild(noEdit);
          imgDelete.src = "delete.png";
          noEdit.appendChild(imgDelete);
          imgDelete.onclick = () => delTask(index);
          text.addEventListener("dblclick", () => dblcklText(index));
          Expens.addEventListener("dblclick", () => dblcklExpens(index));
          newDateCont.addEventListener("dblclick", () => dblcklnewDate(index));
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
  if (
    editTask >= 0 ||
    valueNewData > -1 ||
    valueDblckPrice > -1 ||
    valueDblckTxt > -1
  ) {
    alert("Закончите редактировние");
  } else {
    let valueDataFormat = newDateFormat();
    if (inputValueNumber <= 0) {
      alert("Расходы должны быть больше 0 рублей.");
    } else {
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
            Date: valueDataFormat,
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
    }
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

const taskTxt = (event) => {
  if (event.target.value.trim()) {
    newValueText = event.target.value;
  } else {
    alert(
      "Значение не может быть пустым. Все пустые значения будет возвращены к перваначальным."
    );
  }
};

const newPrice = (event) => {
  if (event.target.value > 0) {
    newValue = event.target.value;
  } else {
    alert(
      "Некорректно заполнение полей. Значения будут возвращены к перваначальным."
    );
  }
};

const dateNew = (event) => {
  dateСhange = event.target.value;
};

const backTask = () => {
  editTask = "-1";
  render();
};

const dblcklText = (index) => {
  if (editTask > -1) {
    alert("Завершите редактирование задачи");
  } else {
    valueNewData = -1;
    valueDblckPrice = -1;
    valueDblckTxt = index;
    render();
  }
};

const dblcklExpens = (index) => {
  if (editTask > -1) {
    alert("Завершите редактирование задачи");
  } else {
    valueNewData = -1;
    valueDblckTxt = -1;
    valueDblckPrice = index;
    render();
  }
};

const dblcklnewDate = (index) => {
  if (editTask > -1) {
    alert("Завершите редактирование задачи");
  } else {
    valueDblckPrice = -1;
    valueDblckTxt = -1;
    valueNewData = index;
    render();
  }
};

const doneTask = async (index) => {
  newValueText === allExpenses[index].text? allExpenses[index].text: newValueText
  newValue === allExpenses[index].Expenses ? allExpenses[index].Expenses: newValue
  dateСhange === mainDate ? mainDate : dateСhange
  let { _id } = allExpenses[index];
  const resp = await fetch(`http://localhost:8000/updateTask`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      _id,
      text: newValueText ,
      Expenses: newValue,
      Date: dateСhange.split("-").reverse().join(".") ,
    }),
  });
  const result = await resp.json();
  allExpenses = result.data;
  editTask = -1;
  mainDate = "";
  dateСhange = "";
  newValueText = "";
  newValue = ";";
  render();
};

const onblurTxt = async (event, index, test) => {
  if (event.target.value.trim()) {
    let { _id } = allExpenses[index];
    const resp = await fetch(`http://localhost:8000/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        text: event.target.value,
      }),
    });
    const result = await resp.json();
    allExpenses = result.data;
    valueDblckTxt = -1;
    render();
  }
};

const onblurNumber = async (event, index, testEx) => {
  if (event.target.value.trim() && event.target.value > 0) {
    let { _id } = allExpenses[index];
    const resp = await fetch(`http://localhost:8000/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        Expenses: event.target.value,
      }),
    });
    const result = await resp.json();
    allExpenses = result.data;
    valueDblckPrice = -1;
    render();
  }
};

const onblurDate = async (event, index, formatTestDate) => {
  if (event.target.value.trim()) {
    let { _id } = allExpenses[index];
    const resp = await fetch(`http://localhost:8000/updateTask`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id,
        Date:
          event.target.value === formatTestDate
            ? formatTestDate.split("-").reverse().join(".")
            : event.target.value.split("-").reverse().join("."),
      }),
    });
    const result = await resp.json();
    allExpenses = result.data;
    valueNewData = -1;
    render();
  }
};