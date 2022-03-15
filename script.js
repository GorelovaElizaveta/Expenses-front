let allExpenses = [];
inputValue =""
inputValueNumber =""


window.onload = async() => {
  inputTask = document.getElementById("add-task");
  inputNumber = document.getElementById("add-task-number");
  inputTask.addEventListener("change", updateValue);
  const resp = await fetch("http://localhost:8000/allExpenses", {
    method: "GET",
  });
  const result = await resp.json();
  allExpenses = result.data;
  render();
};

const updateValue = (event) => {
  inputValue = event.target.value;
  console.log(inputValue)
};

const render = () => {
  let chumba = null;
  allExpenses.forEach((item) => chumba += item.Expenses);
  console.log(chumba);
  const w = document.getElementById("global");

  const content = document.getElementById("content-page");
  const y = document.createElement('p')
  y.innerText = chumba;
  w.appendChild(y);
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allExpenses.map((value, index) =>{
    const container = document.createElement("div");
    const cena = document.createElement("div");
    cena.innerText = value.Expenses;
    const imgDelete = document.createElement("img");
    container.className = "div-container-text"
    const text = document.createElement("p");
    text.innerText = value.text;
    container.appendChild(text);
    container.appendChild(cena);

    
    
    imgDelete.src = "delete.png";
    container.appendChild(imgDelete);
    // imgDelete.onclick = () => {
    //   delTask(index);
    // };
    content.appendChild(container);
  })
}
  
const onCklickButton = async() => {
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
    inputValueNumber ="";    
    inputNumber.value ="";
    render();
  } else {
    alert("Поле не заполнено!");
  }
};