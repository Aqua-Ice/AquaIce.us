import gulp from "gulp"
import fileInclude from "gulp-file-include"
import watch from "gulp-watch"
import gulpSass from "gulp-sass"
import cleanCSS from "gulp-clean-css"
import rename from "gulp-rename"
import dartSass from "sass"
import browserSyncModule from "browser-sync"

const browserSync = browserSyncModule.create()
const sassCompiler = gulpSass(dartSass)

const buildHtml = () => {
	return gulp
		.src("src/pages/*.html")
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "src/partials/",
			})
		)
		.pipe(gulp.dest("dist"))
}

const buildStyles = () => {
	return gulp
		.src("src/scss/**/*.scss")
		.pipe(sassCompiler().on("error", sassCompiler.logError))
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("dist/css"))
}

const watchFiles = () => {
	watch("src/**/*.html", gulp.series(buildHtml, browserSync.reload))
	watch("src/scss/**/*.scss", gulp.series(buildStyles, browserSync.reload))
}

const webserver = () => {
	browserSync.init({
		server: {
			baseDir: "dist",
		},
		port: 8000,
	})
}

export const build = gulp.series(buildHtml, buildStyles)
export const serve = gulp.series(buildHtml, buildStyles, gulp.parallel(webserver, watchFiles))
export default serve
