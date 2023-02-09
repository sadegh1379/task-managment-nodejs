import 'dotenv/config';
import DB from './db.js';

console.clear();
DB.createDB();
// DB.saveTask("ali test sadegh sadw", true);
console.log(DB.getAllTasks())

DB.editTask('alireza', false, 'a5201ef2-aa99-43fd-81d7-b8c7d97b1aa5')
console.log(DB.getAllTasks())
