import app from "../app.js";
import connectToDb from "../DB/connection.js";

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await connectToDb();
  console.log(`Server is running on port ${PORT}`);
});
