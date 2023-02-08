const createError = require('http-errors');
const express = require('express');
const app = express();
const http = require('http')
const https = require("https")
const server = http.createServer(app);
const path = require('path');
const indexRouter = require('./routes/index');
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const hktime = () => {
  const t = new Date(Date.now());
  const hkt = t.toLocaleString('en-HK', { timeZone: 'Asia/Hong_Kong' })
  return hkt;
}

server.listen(PORT, () => {
  console.log(`Time of now: ${hktime()}`)
  console.log(`Server is running at PORT ${PORT}`);
});
