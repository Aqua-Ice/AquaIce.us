import gulp from "gulp"
import browserSyncModule from "browser-sync"
import fileInclude from "gulp-file-include"
import gulpRemember from "gulp-remember"
import cleanCSS from "gulp-clean-css"
import gulpCached from "gulp-cached"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"
import watch from "gulp-watch"
import dartSass from "sass"

const browserSync = browserSyncModule.create()
const sassCompiler = gulpSass(dartSass)

// compile HTML files and move them into their directories
const buildHtml = () => {
	return gulp
		.src("src/pages/*.html")
		.pipe(
			fileInclude({
				prefix: "@@",
				basepath: "src/partials/",
				recursive: true, // Recursively check partials
				maxDepth: 3, // Limit the depth of recursion (adjust as needed)
			})
		)
		.pipe(rename((path) => {
			if (path.basename !== "index") {
				path.dirname = path.basename;
				path.basename = "index";
			}
		}))
		.pipe(gulp.dest("dist"))
}

// compile scss into css and minify
const buildStyles = () => {
	return gulp
		.src("src/scss/**/*.scss")
		.pipe(sassCompiler().on("error", sassCompiler.logError))
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("dist/css"))
}

// copy the assets into the dist folder
const copyAssets = () => {
	return gulp
		.src("src/assets/**/*")
		.pipe(gulpCached("assets")) // Cache the files
		.pipe(gulpRemember("assets")) // Remember the files
		.pipe(gulp.dest("dist/assets"))
		.pipe(browserSync.stream())
}

// copy JS into the dist folder
const copyJs = () => {
    return gulp
        .src("src/js/**/*")
        .pipe(gulp.dest("dist/js"))
}

// watch for changes in the src folder
const watchFiles = () => {
	watch("src/**/*.html", gulp.series(buildHtml, browserSync.reload))
	watch("src/scss/**/*.scss", gulp.series(buildStyles, browserSync.reload))
	watch("src/assets/**/*", gulp.series(copyAssets, browserSync.reload))
    watch("src/js/**/*", gulp.series(copyJs, browserSync.reload))
}

// start the webserver
const webserver = () => {
	browserSync.init({
		server: {
			baseDir: "dist",
		},
		port: 8000,
	})
}

export const build = gulp.series(buildHtml, buildStyles, copyAssets, copyJs)
export const serve = gulp.series(buildHtml, buildStyles, copyAssets, copyJs, gulp.parallel(webserver, watchFiles))
export default serve