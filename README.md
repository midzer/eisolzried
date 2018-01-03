[![Build Status](https://travis-ci.org/midzer/eisolzried.svg?branch=master)](https://travis-ci.org/midzer/eisolzried)

This website is built with [jekyll](http://jekyllrb.com) and uses [gulp](https://gulpjs.com/) as task runner for development and production builds.

## Setup
```
git clone https://github.com/midzer/eisolzried.git // clone me
cd eisolzried
(sudo) gem install jekyll bundler // install global gems
bundle // install ruby dependencies
npm install // install node dependencies, you can use yarn as well
gulp // starts development build
```

Now your default browser should open website at http://localhost:4000. Use `gulp build:prod` for production build.
