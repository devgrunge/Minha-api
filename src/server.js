const app = require("./app");

const PORT = process.env.PORT || 6262;

app.listen(PORT, () => {
  console.log(`App listen on port: ${PORT}`);
});
