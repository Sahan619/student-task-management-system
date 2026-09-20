const mysql= require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
    user: "root",
    password :"#Admin1234#",
    database: "student_task_management",
    port: 3306

});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database:", err);
          return;
    } 

    console.log("MySQL connected successfully");
});
