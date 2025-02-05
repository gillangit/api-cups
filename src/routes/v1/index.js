const express = require('express');
const printRoute = require('./print.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/print',
    route: printRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
