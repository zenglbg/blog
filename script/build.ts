const util = require("util");
const path = require("path");
const fs = require("fs");
const child_process = require("child_process");
const appPath = path.resolve(__dirname, "..");
const exec = util.promisify(child_process.exec);
const runBuild = function () {
  fs.readdirSync(path.join(appPath, "src/pages")).forEach(
    async (projectName) => {
      await exec(`npm run build ${projectName}`, { cwd: appPath });
    }
  );
};

runBuild();
