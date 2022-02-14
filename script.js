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
          <button class="btn btn-sm btn-warning">
              <i class="fa-solid fa-arrow-right" title="mark as bad list"></i>
          </button>
      </td>

  </tr>`;
  });

  document.getElementById("taskList").innerHTML = str;
};

const deleteItem = (i) => {
  taskList.splice(i, 1);
  display();
  totalTaskHour();
};

const totalTaskHour = () => {
  const total = taskList.reduce((subTotal, item) => subTotal + item.hr, 0);
  console.log(total);
  document.getElementById("totalTaskHour").innerHTML = total;
};
