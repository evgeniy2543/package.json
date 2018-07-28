const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gcmq = require('gulp-group-css-media-queries');


const config = {
	root: '/src/',
	html: {
		src: 'index.html'
	},
	css: {
		watch: 'sass/**/*.scss',
		src:  'sass/+(styles).scss',
		dest: 'css'
	}
}

gulp.task('build', function() {
	gulp.src(config.root + config.css.src)
	.pipe(sass())
	.pipe(gcmq())
	.pipe(autoprefixer({
		browser: ['>0.1%'],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(gulp.dest(config.root + config.css.dest))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('watch',['browserSync'], function(){
	gulp.watch(config.root + config.css.watch,['build']);
	gulp.watch(config.root + config.html.src, browserSync.reload);
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: config.root
		}
	});
});

const smartgrid = require('smart-grid');

var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '30px', /* gutter width px || % */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1600px', /* max-width оn very large screen */
        fields: '0' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
             fields: '30'
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
        },
        xs: {
            width: '560px'
        }
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./sass', settings);