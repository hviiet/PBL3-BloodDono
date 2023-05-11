const express = require("express");
const router = express.Router();
const { doctorCheck } = require("../middleware/doctorCheck");
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");
const { roleCheck } = require("../middleware/roleCheck");
const { createNewEvent, updateEvent } = require("../controllers/event");

router.route("/view/:eventID").get(roleCheck, (req, res) => {
    if (req.user.role == "1") {
        res.render("event", {
            eventID: req.params.eventID,
            role: req.user.role,
        });
    }
    else {
        res.render("event", {
            eventID: req.params.eventID,
            role: 0
        });
    }
});
router
    .route("/create-event")
    .post([cookieJwtAuth, doctorCheck], createNewEvent)
    .get([cookieJwtAuth, doctorCheck], (req, res) => {
        res.render("event-create", {
            username: req.user.username,
        });
    });
router
    .route("/update-event/:eventID")
    .post([cookieJwtAuth, doctorCheck], updateEvent)
    .get([cookieJwtAuth, doctorCheck], (req, res) => {
        res.render("event-edit", {
            username: req.user.username,
        });
    });

module.exports = router;
