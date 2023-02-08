import fs from "fs";
import chalk from "chalk";

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
}
