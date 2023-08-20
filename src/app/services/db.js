const Dexie = require("dexie");

const db = new Dexie("TodoAppDatabase");
db.version(1).stores({
  projects: "++id,name",
  tasks: "++id,projectId,task,dueDate,description,pomodoroLevel,subtasks,notes",
});

module.exports = db;
