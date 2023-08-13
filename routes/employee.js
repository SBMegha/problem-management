const router = require("express").Router();
const Problem = require("../models/Problem");
const verifyToken = require("../utils/verifyToken");

router.get("/problem", verifyToken, async (req, res) => {
  if (req.user.role !== "employee" && req.user.role !== "admin")
    return res.send("You are not authorized to view this page");
  const problems = await Problem.find({ department: req.user.department })
    .populate("department")
    .populate("submittedBy")
    .then((problem) => {
      problem.forEach((problem) => {
        problem.employee = req.user.role === "employee";
        problem.admin = req.user.role === "admin";  
      });
      return problem;
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("problem.hbs", {
    loggedIn: true,
    admin: req.user.role === "admin",
    employee: req.user.role === "employee",
    problems,
  });
});

router.get("/updateproblem/:id", verifyToken, async (req, res) => {
  if (req.user.role !== "employee" && req.user.role !== "admin")
    return res.send("You are not authorized to view this page");
  //problem contians resolved boolean, just inverse it and update
  await Problem.findById(req.params.id)
    .then((problem) => {
      problem.resolved = !problem.resolved;
      problem.save().catch((err) => {
        console.log(err);
        return res.send("Something went wrong");
      });
      if(req.user.role === "employee")
      return res.redirect("/employee/problem");
      else
      return res.redirect("/public/problem");
    })
    .catch((err) => {
      console.log(err);
      return res.send("Something went wrong");
    });
});

module.exports = router;
