import gulp from "gulp"
import fileInclude from "gulp-file-include"
import connect from "gulp-connect"
import watch from "gulp-watch"

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
		.pipe(connect.reload())
}

const watchFiles = () => {
	watch("src/**/*.html", gulp.series(buildHtml))
}

const webserver = () => {
	connect.server({
		root: "dist",
		livereload: true,
		port: 8000,
	})
}

export const build = gulp.series(buildHtml)
export const serve = gulp.series(buildHtml, gulp.parallel(webserver, watchFiles))
export default serve