const fs = require("fs");
const logger = {
  info: async (log) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth();
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let min = date_ob.getMinutes();
    let sec = date_ob.getSeconds();
    console.log(
      `[${year}/${month}/${date} | ${hour}:${min}:${sec}] | (INFO) ${log}`
    );
    fs.appendFileSync(
      "out.log",
      `[${year}/${month}/${date} | ${hour}:${min}:${sec}] | (INFO) ${log}\n`
    );
  },
  error: async (log) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth();
    let year = date_ob.getFullYear();
    let hour = date_ob.getHours();
    let min = date_ob.getMinutes();
    let sec = date_ob.getSeconds();
    console.log(
      `[${year}/${month}/${date} | ${hour}:${min}:${sec}] | (ERROR): ${log}`
    );
    fs.appendFileSync(
      "out.log",
      `[${year}/${month}/${date} | ${hour}:${min}:${sec}] | (ERROR) ${log}\n`
    );
  },
};
module.exports = logger;
