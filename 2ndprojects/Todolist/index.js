
function addTask(content = "", parentDiv = null, target = "open") {
    const div = document.createElement('div');
    div.className = "task";

    const p = document.createElement('p');
    p.contentEditable = true;
    p.innerHTML = content;
    div.appendChild(p);

    p.addEventListener("keydown", ev => {
        if (ev.key == 'Enter' && !ev.shiftKey) {
            ev.preventDefault();
        }
    });

    p.addEventListener("keyup", ev => {
        const task = ev.target.parentElement;

        if (ev.key == 'ArrowDown' && task.nextSibling) {
            task.nextSibling.querySelector("p").focus();
        } else if (ev.key == 'ArrowUp' && task.previousSibling) {
            task.previousSibling.querySelector("p").focus();
        } else if (ev.key == 'Enter' && !ev.shiftKey) {
            addTask("", task);
        }
    });

    // כפתור מחיקה
    const btnFrame = document.createElement("div");
    const btnRemove = document.createElement("button");
    btnRemove.className = "remove";
    btnRemove.innerHTML = "❌";
    btnRemove.addEventListener("click", () => div.remove());
    btnFrame.appendChild(btnRemove);
    div.appendChild(btnFrame);

    // כפתור בוצע
    const btnFrame2 = document.createElement("div");
    const btnComplete = document.createElement("button");
    btnComplete.className = "complete";
    btnComplete.innerHTML = "✔️";
    btnComplete.addEventListener("click", () => {
        document.querySelector('.complete .taskList').appendChild(div);
    });
    btnFrame2.appendChild(btnComplete);
    div.appendChild(btnFrame2);

    // כפתור ביטול
    const btnFrame3 = document.createElement("div");
    const btnUndo = document.createElement("button");
    btnUndo.className = "undo";
    btnUndo.innerHTML = "🙈";
    btnUndo.addEventListener("click", () => {
        document.querySelector('.open .taskList').appendChild(div);
    });
    btnFrame3.appendChild(btnUndo);
    div.appendChild(btnFrame3);

    if (parentDiv) {
        document.querySelector('.open .taskList').insertBefore(div, parentDiv.nextSibling);

    } else {
        document.querySelector(`.${target} .taskList`).appendChild(div);
    }

    p.focus();
}

if (localStorage.open) {
    const open = JSON.parse(localStorage.open);

    open.forEach(str => {
        addTask(str);
    });
}

if (localStorage.complete) {
    const complete = JSON.parse(localStorage.complete);

    complete.forEach(str => {
        addTask(str, null, 'complete');
    });
}

addTask();

function save() {
    const open = [...document.querySelectorAll(".open .task p")].map(el => el.innerText).filter(x => x);
    const complete = [...document.querySelectorAll(".complete .task p")].map(el => el.innerText);

    localStorage.open = JSON.stringify(open);
    localStorage.complete = JSON.stringify(complete);
}