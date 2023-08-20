const db = require("./db");

class DataService {
  async getAllProjects() {
    return await db.projects.toArray();
  }

  async getTasksByProjectId(projectId) {
    return await db.tasks.where("projectId").equals(projectId).toArray();
  }

  // CRUD operations
}

module.exports = new DataService();
