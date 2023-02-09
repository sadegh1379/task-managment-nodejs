import fs from "fs";
import chalk from "chalk";
import { uuid as v4 } from 'uuidv4';

const fileName = process.env.DB_NAME;
const warn = chalk.yellowBright.bold;
const success = chalk.greenBright.bold;

export default class DB {
  static createDB() {
    if (fs.existsSync(fileName)) {
      console.log(warn("DB file already exists"));
      return false;
    }
    try {
      fs.writeFileSync(fileName, "[]", "utf-8");
      console.log(success("DB file created successfully"));
      return true;
    } catch (error) {
      throw new Error("can not write in " + fileName);
    }
  }

  static resetDB() {
    try {
      fs.writeFileSync(fileName, "[]", "utf-8");
      console.log("BD reset successfully");
      return true;
    } catch (error) {
      throw new Error("can not reset " + fileName);
    }
  }

  static DBExists() {
    if (fs.existsSync(fileName)) {
      return true;
    } else {
      return false;
    }
  }

  static getTaskById(taskId) {
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName, "utf-8");
    } else {
      DB.createDB();
      return false;
    }
    try {
      data = JSON.parse(data);
      let task = data.find((t) => t.id === Number(taskId));
      return task ? task : false;
    } catch (error) {
      throw new Error("syntax error \nplease check DB file");
    }
  }

  static getTaskByTitle(taskTitle) {
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName, "utf-8");
    } else {
      DB.createDB();
      return false;
    }
    try {
      data = JSON.parse(data);
      let task = data.find((t) => t.title === taskTitle);
      return task ? task : false;
    } catch (error) {
      throw new Error("syntax error \nplease check DB file");
    }
  }

  static getAllTasks(){
    if(!DB.DBExists()) {
      DB.createDB();
      return [];
    }
    try {
      let data = fs.readFileSync(fileName, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error("can not read data from " + fileName);
    }
  }

  static saveTask(title, completed = false) {
    if (typeof title !== "string" || title.length < 3) {
      throw new Error("title must be a string and greater than 3 letters");
    } 
    const task = DB.getTaskByTitle(title);
    if(task) {
      throw new Error("a task exists with this title");
    }
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName);
      data = JSON.parse(data);
      data.push({
        title,
        completed,
        id: v4(),
      });
      data = JSON.stringify(data);
      fs.writeFileSync(fileName, data, 'utf-8');
      console.log(success("task created successfully"));
    } else {
      try {
        DB.createDB();
        return false;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  static editTask(title, completed, id) {
    if (typeof title !== "string" || title.length < 3) {
      throw new Error("title must be a string and greater than 3 letters");
    } 
    let data;
    if (DB.DBExists()) {
      data = fs.readFileSync(fileName);
      data = JSON.parse(data);
      data = data.map(t => {
        if(t.id === id) {
          return{
            id: t.id,
            title,
            completed
          }
        }
        return t;
      })
      data = JSON.stringify(data);
      fs.writeFileSync(fileName, data, 'utf-8');
      console.log(success("task edited successfully"));
    } else {
      try {
        DB.createDB();
        return false;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
}
