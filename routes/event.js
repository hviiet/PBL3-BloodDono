const express = require("express");
const router = express.Router();
const { doctorCheck } = require("../middleware/doctorCheck");
const { cookieJwtAuth } = require("../middleware/cookieJwtAuth");
const { createNewEvent, updateEvent, registerEvent, deleteEvent, updateDonationInfo } = require("../controllers/event");

router.route("/view/:eventID").get(cookieJwtAuth, (req, res) => {
    res.render("event", {
        eventID: req.params.eventID,
        role: req.user == null ? 0 : req.user.role,
    });
});
router.route("/view/:eventID/register").post(cookieJwtAuth, registerEvent);
router
    .route("/create-event")
    .post([cookieJwtAuth, doctorCheck], createNewEvent)
    .get([cookieJwtAuth, doctorCheck], (req, res) => {
        res.render("event-create", {
            username: req.user.username,
        });
    });
router.route("/manage").get([cookieJwtAuth, doctorCheck], (req, res) => {
    res.render("event-manage", {
        username: req.user.username,
    });
});
router.route("/update-donation-info/:donorID").post([cookieJwtAuth, doctorCheck], updateDonationInfo);
router.route("/donation-info/:username").get([cookieJwtAuth, doctorCheck], (req, res) => {
    res.render("donation-info", {
        username: req.user.username,
    });
});
router.route("/delete-event/:eventID").post([cookieJwtAuth, doctorCheck], deleteEvent);
router
    .route("/update-event/:eventID")
    .post([cookieJwtAuth, doctorCheck], updateEvent)
    .get([cookieJwtAuth, doctorCheck], (req, res) => {
        res.render("event-edit", {
            username: req.user.username,
        });
    });

module.exports = router;
