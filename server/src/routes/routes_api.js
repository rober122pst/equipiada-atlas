import express from 'express';
const routes = express.Router();

routes.get("/", (req, res) => {
    res.send("API is running");
});




export default routes;