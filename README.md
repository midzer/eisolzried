# eisolzried

This website is built with [jekyll](http://jekyllrb.com) and uses [gulp](https://gulpjs.com/) as task runner for development and production builds.

## Prerequisites

Following environments have to be installed on your system

* Ruby
* Node.js
* yarn
* git

## Development

```
git clone https://github.com/midzer/eisolzried.git
cd eisolzried
gem install bundler // when ruby is installed via RVM, you can install gems locally
bundle install // ruby dependencies
yarn install // node dependencies
npm start // starts development build
```

Now your default browser should open website at http://localhost:3000 automatically. For production build use `npm run build`.
