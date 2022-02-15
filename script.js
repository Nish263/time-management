//create a form to take task and hour
//create an array to store the tasks and hours
//loop the array and print under task list
//calculate total hour
//crate bad list array
//total the hr of bad list
//delete thr task and re-calculate the hours
//take task from list to bad list vice versa.

const taskList = [];
const badList = [];
const hrPerWeek = 168;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);
  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  if (hr < 1) {
    return alert("Please enter a positive number");
  }

  const ttlBadHrs = totalBadHour();

  // const badHour =badList.reduce((subttl, item)= subttl +item.hr, 0)
  const total = taskList.reduce((subTotal, item) => subTotal + item.hr, 0) + hr;
  if (total > hrPerWeek) {
    return alert("Maximum hour exceeded for week");
  }

  if (ttlBadHrs + total > hrPerWeek) {
    return alert("you have exeeded the maximum hours per week");
  }
  const obj = {
    task,
    hr,
  };

  taskList.push(obj);
  display();
  totalTaskHour();
};

const display = () => {
  let str = " ";

  taskList.map((item, i) => {
    str += `
      <tr>
      <td>
          <input type="checkbox" name="" id="">
         ${item.task}
      </td>
      <td>${item.hr}</td>
      <td class="text-end">
          <button class="btn btn-sm btn-danger" onclick="deleteItem(${i})">
              <i class="fa-solid fa-trash-can" title=" delete"></i></button>
          <button class="btn btn-sm btn-warning" onclick="markAsNotToDo(${i})">
              <i class="fa-solid fa-arrow-right" title="mark as bad list" ></i>
          </button>
      </td>

  </tr>`;
  });

  document.getElementById("taskList").innerHTML = str;
};

const displayBadList = () => {
  let str = " ";
  badList.map((item, i) => {
    str += `
    <tr>
    <td>
        <input type="checkbox" name="" id="">
       ${item.task}
    </td>
    <td>${item.hr}</td>
    <td class="text-end">
      <button class="btn btn-sm btn-warning" onclick="markAsToDo(${i})">
            <i class="fa-solid fa-arrow-left" title="mark as bad list" ></i>
      </button>
        <button class="btn btn-sm btn-danger" onclick="deleteBadItem(${i})">
            <i class="fa-solid fa-trash-can" title=" delete"></i></button>
        
    </td>

</tr>`;
  });

  document.getElementById("bad-list").innerHTML = str;
};
const deleteItem = (i) => {
  if (!confirm("Are you sure you want to delete this item")) {
    return;
  }
  taskList.splice(i, 1);
  displayBadList();
  totalTaskHour();
};
const deleteBadItem = (i) => {
  if (!confirm("Are you sure you want to delete this item")) {
    return;
  }
  badList.splice(i, 1);
  displayBadList();
  totalTaskHour();
  totalBadHour();
};

const totalTaskHour = () => {
  const total = taskList.reduce((subTotal, item) => subTotal + item.hr, 0);

  const ttlBadHrs = totalBadHour();
  const ttlHrs = total + ttlBadHrs;
  document.getElementById("totalTaskHour").innerText = ttlHrs;
};

const totalBadHour = () => {
  const total = badList.reduce((subTotal, item) => subTotal + item.hr, 0);

  document.getElementById("totalBadHrs").innerText = total || 0;
  return total;
};
const markAsNotToDo = (i) => {
  const itm = taskList.splice(i, 1);
  display();
  badList.push(itm[0]);
  displayBadList();
  totalBadHour();
};
const markAsToDo = (i) => {
  const itm = badList.splice(i, 1);
  displayBadList();

  taskList.push(itm[0]);
  display();
  totalTaskHour();
};
