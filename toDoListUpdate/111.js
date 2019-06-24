class ToDoClass {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('')) || [];
        this.loadTasks();

        this.addEventListener();
        this.tam;
    }

    addEventListener = () => {
        document.getElementById('addTask').addEventListener('keypress', event => {
            if (event.keyCode === 13) {
                this.addTask(event.target.value);
                event.target.value = "";
            }
        });
    }

    completeTodo = (id) => {
        this.tasks[id].isComplete = !this.tasks[id].isComplete;
        this.loadTasks()
    }
    deleteTodo = (event, id) => {
        event.preventDefault();
        let index = this.tasks.findIndex(t => id == t.id)  
        console.log(index);
        this.tam = this.tasks.splice(index, 1);
        this.loadTasks();
        var btn = document.createElement("button");
        btn.innerHTML = "undo";
        document.body.appendChild(btn);
        btn.setAttribute("onclick", "toDo.unDo()");
        btn.setAttribute("style", " margin-left: 50%");
        btn.className = "btn btn-success"
        setTimeout(function () {
            btn.remove();
        }, 3000);
        console.log(this.tam);
        
        
    }

    unDo = () => {
        this.tasks.push(this.tam[0]);
        this.loadTasks();
    }

   
    generateId = (length) => {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            var random = Math.floor(Math.random() * charactersLength); //floor để làm tròn
            result += characters.charAt(random);// charAt để trả về kí tự of chuỗi
        }
        return result;
    }
     

    addTask=(task)=> {
        let newTask = {id : toDo.generateId(10), task: task, isComplete: false}
        if (task === '') {
            alert('You must write something!')
        } else {
            this.tasks.push(newTask);
            this.loadTasks()
        }
        
    }
    addTaskClick=() =>{
        let target = document.getElementById('addTask');
        this.addTask(target.value);
        target.value = "";
    }
    calculate=() =>{
        let sum = this.tasks.length;
        let resultCompleted = this.tasks.filter(element => element.isComplete === true);
        let percent = (resultCompleted.length / sum) * 100;
        let a = document.getElementById("progress")
        if (percent < 30) {
            a.className="progress-bar bg-danger"
            document.getElementById("progress").style.width = percent + "%"
        }
        else if  (percent >30 && percent < 70) {
            a.className="progress-bar bg-warning"
            document.getElementById("progress").style.width = percent + "%"
        }
        else{
            a.className="progress-bar bg-success"
            document.getElementById("progress").style.width = percent + "%"
        }
        
    }

    updateToDo = (event, id) => {
        event.preventDefault();
        let index = this.tasks.findIndex(t => id == t.id)  
        console.log(index);
        var displaybtn = document.getElementById("5ntzKH1oA2");
        console.log(displaybtn);
        
        this.tasks[index].isComplete = false;
        displaybtn.disabled = false;
        displaybtn.focus();
        console.log(this.tasks[index]);
    }


    saveEdit= (event, id) => {
        event.preventDefault();
        let index = this.tasks.findIndex(t=>{id == t.id})
        let valueEdit = document.getElementById(index).value;
        this.tasks[index].task = valueEdit;
        this.tasks[index].isComplete = false;
        this.loadTasks();
    }

    

    removeComplete = () => {
        this.tasks = this.tasks.filter(t => !t.isComplete)
        this.loadTasks();
    }

    selectCompleted = () => {
        let resultFiter = this.tasks.filter(element => element.isComplete === true);
        if (resultFiter.length > 0) {
            let taskHtml = resultFiter.reduce((html, task, id) => html += this.generateTaskHtml(task, id), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        } else {
            alert("Khong co ket qua")
        }
    }
    selecActive = () => {
        let resultActive = this.tasks.filter(element => element.isComplete === false);
        if (resultActive.length > 0) {
            let taskHtml = resultActive.reduce((html, task, id) => html += this.generateTaskHtml(task, id), '');
            document.getElementById('taskList').innerHTML = taskHtml;
        } else {
            alert("Khong co ket qua")
        }
    }

    generateTaskHtml = (task, id) => {
        return `
            <li class="list-group-item checkbox" >
            <div class="row">
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
                <label><input id="toggleTaskStatus" type="checkbox" onchange="toDo.completeTodo(${task.id})" value="" class="" ${task.isComplete ? 'checked' : ''}></label>
                </div>
                <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete} ? 'complete' : ''}" >
                <input type="text" class="form-control" id=${task.id} disabled style="border:none;background: aliceblue;" value="${task.task}">
                </div>
                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
                <a class="icon" href=""  onClick="toDo.deleteTodo(event,'${task.id}')"><i class="fa fa-trash" ></i> </i></a>
                <a class="icon" href=""  onClick="toDo.updateToDo(event, '${task.id}')"><i class="fa fa-pencil" ></i></i></a>
                <a class="icon" href=""  onClick="toDo.saveEdit(event, '${task.id}')"></i><i class="fa fa-check" ></i></i></a>
                </div>
            </div>
            </li>
        `;
    }

    loadTasks = () => {
        let taskHtml = this.tasks.reduce((html, task, id) => html += this.generateTaskHtml(task, id), '');
        document.getElementById('taskList').innerHTML = taskHtml;
        localStorage.setItem('', JSON.stringify(this.tasks));
        this.calculate()
    }
}

let toDo;
window.addEventListener("load", () => {
    toDo = new ToDoClass();
});