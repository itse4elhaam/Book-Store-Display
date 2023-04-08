const express = require("express");
const router = express.Router();
const Author = require("../models/authors");

//will give all of the authors
router.get("/", async (req, res) => {
	let searchOpts = {};
	if (req.query.name != null && req.query.name != " ") {
		searchOpts.name = new RegExp(req.query.name, "i");
	}
	try {
		const authors = await Author.find(searchOpts);
		res.render("authors/index", {
			authors: authors,
			searchOpts: req.query,
		});
	} catch (error) {
		res.redirect("/");
	}
});

// new authors
router.get("/new", (req, res) => {
	res.render("authors/new", { author: new Author() });
});

// Getting Data
router.post("/", async (req, res) => {
	const author = new Author({
		name: req.body.name,
	});

	try {
		const newAuthor = await author.save();
		// res.redirect(`author/${newAuthor.id}`)
		res.redirect("authors");
	} catch (err) {
		res.render("authors/new", {
			author: author,
			errMsg: "Error creating Author", //fix this error issue
		});
	}
});

module.exports = router;
