const gulp = require("gulp")
const ts = require("gulp-typescript")
const tsProject = ts.createProject("tsconfig.json", {
  "module": "commonjs",
  "strict": true,
  "outDir": "./build",
  "esModuleInterop": true,
  "noImplicitReturns": true,
  "target": "esnext"
})

gulp.task("default", function () {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"))
})