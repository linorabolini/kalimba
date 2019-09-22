const path = require("path");
const fs = require("fs");

const dir = fs.readdirSync(__dirname);

console.log(dir);

dir.map(filename => {
	if (filename.includes("arioke__kalimba")) {
		console.log(filename);
		// const [prefix, lam, note, ...rest] = filename.split("-");
		// const dest = [lam, ...rest].join("-");
		// console.log("renaming", filename, dest);
		// fs.renameSync(filename, dest)
	}
});
