const express = require("express");

const app = express();

app.use(express.static("frontend"));
app.use(express.json());

app.post("/login",function(req,res) {
	let user = {
		"username":req.body.username,
		"password":req.body.password
	}
	console.log("User",user);
	if(user.username === "admin" && user.password === "adminadmin") {
		return res.status(200).json({"Message":"Login success"})
	} else {
		return res.status(401).json({"Message":"Unauthorized"})
	}
})

app.listen(3000);

console.log("Running in port 3000");