const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid");
uuid();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
const mongoose = require("mongoose");

const Post = require("./models/posts");
const Admin = require("./models/admin");
const Feedback = require("./models/feedback");
const Mentee = require("./models/mentee");
const Mentor = require("./models/mentor");
const QuesAns = require("./models/ques_ans");
const Domain = require("./models/domain");
const { error } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/protege")
  .then(() => {
    console.log("CONNECTION OPEN!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signin-mentor", async(req, res) => {
  res.render("signin-mentor");
  try{
    const { username,password } = req.body;
    if(!username || !password){
      return res.status(400).json({error:"Please fill the data"})
    }
  }catch{
    console.log(error);
  }
});

app.get("/signin-mentee", (req, res) => {
  res.render("signin-mentee");
});

app.get("/signup-mentor", (req, res) => {
  res.render("signup-mentor");
});

app.get("/signup-mentee", (req, res) => {
  res.render("signup-mentee");
});

app.get("/mentor-dashboard", async (req, res) => {
  const m = await Mentor.findOne({ m_loggedIn: true });
  const posts = await Post.find();
  res.render("mentor-dashboard", { posts, m });
});

app.post("/mentor-dashboard", async (req, res) => {
  const { detail } = req.body;
  const m = await Mentor.findOne({ m_loggedIn: true });
  const p = new Post({
    p_id: uuid(),
    p_detail: detail,
    mentor: m.m_name,
    mentor_username: m.m_username,
  });
  p.save();
  res.redirect("/mentor-dashboard");
});

app.post("/dashboard", async (req, res) => {
  const posts = await Post.find();
  const { username, password } = req.body;
  await Mentor.findOneAndUpdate({ m_loggedIn: true }, { m_loggedIn: false });
  const m = await Mentor.findOneAndUpdate(
    { m_username: username },
    { m_loggedIn: true }
  );
  try{
    const { username,password } = req.body;
    if(!username || !password){
       res.sendStatus(400);
       res.send("Please fill the details");
    }
    
    const Mentorlogin = await Mentor.findOne({m_username,m_pass});
    console.log(Mentorlogin);
  }catch{
    console.log(error);
  }
  res.render("mentor-dashboard", { posts, m });
});

app.post("/mentee-dashboard", async (req, res) => {
  const posts = await Post.find();
  const { username, password } = req.body;
  await Mentee.findOneAndUpdate({ m_loggedIn: true }, { m_loggedIn: false });
  const m = await Mentee.findOneAndUpdate(
    { m_username: username },
    { m_loggedIn: true }
  );
  res.redirect("/opportunities");
});

app.get("/opportunities", async (req, res) => {
  const posts = await Post.find();
  res.render("opportunities", { posts });
});

app.post("/profile/:m_username", async (req, res) => {
  const {
    name,
    email,
    Linkedln,
    Github,
    passing_Year,
    username,
    pass,
    web,
    appd,
    ai,
    ml,
    dsa,
    op,
    desc
  } = req.body;
  const domains = [web, appd, ai, ml, dsa, op];
  const doma = [
    "Web Development",
    "App Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures & Algorithms",
    "Open Source & Web3",
  ];
  const domains1 = [];
  for (let i = 0; i < domains.length; i++) {
    if (domains[i] === "true") {
      domains1.push(doma[i]);
    }
  }
  const m = new Mentor({
    m_id: uuid(),
    m_name: name,
    m_email: email,
    m_username: username,
    m_pass: pass,
    m_year: passing_Year,
    m_linkedin: Linkedln,
    m_github: Github,
    m_loggedIn: false,
    m_domain1: domains1[0],
    m_domain2: domains.length > 1 ? domains1[1] : "",
    m_domain3: domains.length > 2 ? domains1[2] : "",
    m_desc: desc
  });
  m.save()
    .then((m) => {
      console.log(m);
      // console.log(m.m_domain1);
      // console.log(m.m_linkedin);
    })
    .catch((e) => {
      console.log(e);
    });
    console.log(m.m_linkedin);
  res.redirect(`/profile/${m.m_username}`);
});
app.get("/profile/:m_username", async (req, res) => {
  const { m_username } = req.params;
  const m = await Mentor.findOne({ m_username: m_username });
  console.log(m);
  const d = await Domain.findOne({ d_id: m.m_domain1 });
  res.render("mentor-profile", { m, d });
});

app.post("/mentee-profile/:mentee_username", async (req, res) => {
  const {
    name,
    email,
    smart_card,
    Linkedin,
    Github,
    passing_Year,
    username,
    pass,
  } = req.body;
  const m = new Mentee({
    mentee_id: uuid(),
    mentee_name: name,
    mentee_college_email: email,
    mentee_smartcard_id: smart_card,
    mentee_username: username,
    mentee_pass: pass,
    mentee_year: passing_Year,
    mentee_linkedin: Linkedin,
    mentee_github: Github,
    mentee_loggedIn: false,
  });
  m.save()
    .then((m) => {
      console.log(m);
    })
    .catch((e) => {
      console.log(e);
    });
  res.redirect(`/mentee-profile/${m.mentee_username}`);
});
//_________________________________________________________________
// app.post("/signin-mentor", (req, res) => {
//   // try{
//   //   const { username,password } = req.body;
//   //   if(!username || !password){
//   //     res.sendStatus(400).json({error:"Please fill the data"})
//   //   }
//   //   res.send("Hello")
//   //   // const Mentorlogin = await Mentor.findOne({m_username,m_pass});
//   //   // console.log(Mentorlogin);
//   // }catch{
//   //   console.log(error);
//   // }
// });

//_________________________________________________________________
app.get("/mentee-profile/:mentee_username", async (req, res) => {
  const { mentee_username } = req.params;
  const m = await Mentee.findOne({ mentee_username: mentee_username });
  console.log(m);
  res.render("mentee-profile", { m });
});

app.get("/resources", (req, res) => {
  res.render("resources");
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.listen(3000);
