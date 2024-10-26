const router = require("express").Router();
const { authRoutes } = require("./../modules/auth/auth.route");

const modules = [
  {
    path: "/auth",
    routes: authRoutes,
  },
];

modules.forEach((module) => router.use(module.path, module.routes));

module.exports = router;
