require("./config/config.js");
const app = require("express")();
const passport = require("./config/passport");
const session = require("express-session");
const authMW = require("./middlewares/authenticate.js");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({
	extended: false
});
var modelRunner = require("./controllers/run-model");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.get("/", urlencodedParser, (req, res) => {
	res.send("<h1>Welcome</h1>");
});

app.get("/login", authMW.isLoggedIn, (req, res) => {
	if (req.isAuthenticated()) {
		res.send("Use this api with current auth");
		return;
	}
	res.send("<h1>Please login to use this service</h1>");
});

app.get("/profile", authMW.isLoggedIn, (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
		return;
	}
	res.send(`<h1>Hi, ${req.user.name}</h1>`);
});

app.post(
	"/login",
	passport.authenticate("local-signin", {
		session: false
	}),
	(req, res) => {
		res.set("x-auth", req.user.token);
		res.status(200).json(req.user);
	}
);

app.post("/api/:col", authMW.verifyToken, (req, res) => {
	if (!req.body) return res.sendStatus(400);
	console.log(req.params.col);
	var newRow = modelRunner.processRequest(req, res);
	newRow
		.then(nr => {
			res.send(nr);
			return;
		})
		.catch(ex => {
			console.log(ex);
			res.status(500).send(ex.message);
		});
});

app.get("/api/:col", authMW.verifyToken, (req, res) => {
	if (!req.params.col) return res.sendStatus(400);
	let msg = `get all documents of collection: ${req.params.col}`;
	var query = modelRunner.processRequest(req, res);
	query.exec((err, docs) => {
		console.log("entered then", err, docs);
		if (err) {
			res.sendStatus(400);
			return;
		}
		console.log(docs);
		res.send(docs);
	});
});

app.get("/api/:col/:id", authMW.verifyToken, (req, res) => {
	if (!req.params.col) return res.sendStatus(400);
	let msg = `get a record of collection: ${req.params.col}, id: ${
    req.params.id
  }`;
	var query = modelRunner.processRequest(req, res);
	console.log("query", query);
	query.exec((err, docs) => {
		console.log("entered then");
		if (err) {
			res.sendStatus(400);
			return;
		}
		res.send(docs);
	});
});

var port = process.env.PORT;

app.listen(port, () => {
	console.log(`node is listening on ${port}`);
});