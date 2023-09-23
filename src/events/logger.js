const app = express();

app.listen(3000, () => {
	console.log("Zephybot is awake");
});

app.get("/", (req, res) => {
	res.send("Hello world");
});

client.on("ready", async () => {
	console.log("Slash commands initialized");
})