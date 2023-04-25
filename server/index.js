import { Express } from "express";

const app = Express();

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));