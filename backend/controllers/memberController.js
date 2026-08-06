const Member = require("../models/Member");
const Issue = require("../models/Issue");

// ======================================
// Add Member
// ======================================

const addMember = async (req, res) => {

    try {

        const {
            memberId,
            name,
            email,
            phone,
            address,
            status
        } = req.body;

        if (!memberId || !name || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory."
            });
        }

        const existingMember = await Member.findOne({
            $or: [
                { memberId },
                { email }
            ]
        });

        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: "Member ID or Email already exists."
            });
        }

        const member = await Member.create({
            memberId,
            name,
            email,
            phone,
            address,
            status
        });

        res.status(201).json({
            success: true,
            message: "Member added successfully.",
            member
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Get All Members
// ======================================

const getMembers = async (req, res) => {

    try {

        const members = await Member.find()
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: members.length,
            members
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Get Single Member
// ======================================

const getMember = async (req, res) => {

    try {

        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found."
            });
        }

        res.status(200).json({
            success: true,
            member
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Update Member
// ======================================

const updateMember = async (req, res) => {

    try {

        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found."
            });
        }

        const duplicate = await Member.findOne({
            _id: { $ne: req.params.id },
            $or: [
                { memberId: req.body.memberId },
                { email: req.body.email }
            ]
        });

        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Member ID or Email already exists."
            });
        }

        member.memberId = req.body.memberId;
        member.name = req.body.name;
        member.email = req.body.email;
        member.phone = req.body.phone;
        member.address = req.body.address;
        member.status = req.body.status;

        await member.save();

        res.status(200).json({
            success: true,
            message: "Member updated successfully.",
            member
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Delete Member
// ======================================

const deleteMember = async (req, res) => {

    try {

        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found."
            });
        }

        const activeIssue = await Issue.findOne({
            member: member._id,
            status: "Issued"
        });

        if (activeIssue) {
            return res.status(400).json({
                success: false,
                message: "Member has borrowed books. Cannot delete."
            });
        }

        await member.deleteOne();

        res.status(200).json({
            success: true,
            message: "Member deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Search Members
// ======================================

const searchMembers = async (req, res) => {

    try {

        const keyword = req.query.keyword?.trim() || "";

        const members = await Member.find({
            $or: [
                { memberId: { $regex: keyword, $options: "i" } },
                { name: { $regex: keyword, $options: "i" } },
                { email: { $regex: keyword, $options: "i" } },
                { phone: { $regex: keyword, $options: "i" } }
            ]
        }).lean();

        res.status(200).json({
            success: true,
            count: members.length,
            members
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    searchMembers
};