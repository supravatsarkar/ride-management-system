const router = require("express").Router();
const { adminRoutes } = require("../modules/admin/admin.route");
const { authRoutes } = require("./../modules/auth/auth.route");

const modules = [
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/admin",
    routes: adminRoutes,
  },
];

modules.forEach((module) => router.use(module.path, module.routes));

module.exports = router;
