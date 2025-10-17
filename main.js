let chores = JSON.parse(localStorage.getItem("tasks")) || [];
const userInput = document.getElementById("userInput");
const showChores = document.getElementById("showChores");
const addChoreBtn = document.getElementById("addChoreBtn");
const removeChoresBtn = document.getElementById("removeChoresBtn");

addChoreBtn.addEventListener("click", addChore);
userInput.addEventListener("keydown", (e) => {
    if (e.code === "Enter") addChore();
});
removeChoresBtn.addEventListener("click", () => {
    chores = [];
    localStorage.removeItem("tasks");
    renderChores();
});
showChores.addEventListener("click", (e) => {
    if (e.target.classList.contains("task")) {
        const text = e.target.textContent;
        chores = chores.map(task => {
            if (task.text === text) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        localStorage.setItem("tasks", JSON.stringify(chores));
        renderChores();
    }
});

function addChore() {
    const cleaned = userInput.value.replace(/\s+/g, " ").trim();
    if (cleaned.length > 0) {
        chores.push({ text: cleaned, completed: false });
        localStorage.setItem("tasks", JSON.stringify(chores));
        renderChores();
        userInput.value = "";
        userInput.focus();
    }
}

function renderChores() {
    showChores.innerHTML = "";
    chores.forEach(task => {
        const p = document.createElement("p");
        p.textContent = task.text;
        p.classList.add("task");
        if (task.completed) p.classList.add("completed");
        showChores.appendChild(p);
    });
}

window.addEventListener("load", renderChores);
