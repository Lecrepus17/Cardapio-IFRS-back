const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", EventController.getEvents);
router.post("/", authMiddleware.verifyAdmin, EventController.createEvent);
router.put("/", authMiddleware.verifyAdmin, EventController.updateEvent);
router.delete("/", authMiddleware.verifyAdmin, EventController.deleteEvent);

module.exports = router;
