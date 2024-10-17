const Document = require('../models/documentModel.js');
const User = require('../models/userModel.js');
const gridMail = require('@sendgrid/mail');

async function shareDoc(req, res) {
    const recipient = req.body.recipient;
    const sender = req.body.sender;
    const id = req.body.id;

    if (!(recipient && id)) {
        return res.status(401).json({
            status: 401,
            title: 'Share error',
            source: '/share',
            message: 'email or id is missing',
        });
    }

    try {
        const user = await User.findOne({ email: recipient }).exec();
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with the provided email' });
        }

        const doc = await Document.findOne({ _id: id });

        if (doc.docAccess.includes(recipient)) {
            return res
                .status(400)
                .json({ message: `Document already shared with ${recipient}` });
        }

        doc.docAccess.push(recipient);
        await doc.save();

        gridMail.setApiKey(process.env.SG_MAIL);

        const msg = {
            to: recipient,
            from: { name: 'JSramverk', email: process.env.SG_MAIL_SENDER },
            subject: 'SSR Editor invite',
            text: `You have been invited to register an account by: ${sender}`,
            html: `<p>You have been invited to view and edit a document by ${sender}.</p>
                   <p>Sign up or login by using the link below:</p>
                   <a href="https://www.student.bth.se/~paar24/editor/">Accept the invite</a>
                   <p>Kind regards, SSR Editor team.</p>`,
        };

        gridMail.send(msg).then(
            () => {},
            (error) => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body);
                }
            }
        );

        res.status(200).json({
            message: `Document: ${id} has been shared with ${recipient}.`,
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'put',
            source: '/share',
            title: 'Database error',
            message: e.message,
        });
    }
}

async function unshareDoc(req, res) {
    const email = req.body.email;
    const id = req.body.id;

    if (!(email && id)) {
        return res.status(401).json({
            status: 401,
            title: 'Share error',
            source: '/share/unshare',
            message: 'email or id is missing',
        });
    }

    try {
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with the provided email' });
        }

        const doc = await Document.findOne({ _id: id });

        if (!doc.docAccess.includes(email)) {
            return res
                .status(400)
                .json({ message: `Document is not shared with: ${email}` });
        }

        doc.docAccess.pull(email);
        const document = await doc.save();

        res.status(200).json({
            document: document,
            message: `Document: ${doc.title}, has been unshared with ${email}.`,
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'put',
            source: '/share/unshare',
            title: 'Database error',
            message: e.message,
        });
    }
}

async function deleteComment(req, res) {
    const docId = req.body.docId;
    const commentId = req.body.commentId;

    try {
        const doc = await Document.findOne({ _id: docId });

        if (!doc.docComments._id === commentId) {
            return res.status(400).json({
                message: `Document does not have comment: ${commentId}`,
            });
        }

        doc.docComments.pull(commentId);
        const document = await doc.save();

        res.status(200).json({
            document: document,
            message: `Document comment: ${commentId} has been deleted.`,
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            type: 'put',
            source: '/share/unshare',
            title: 'Database error',
            message: e.message,
        });
    }
}

module.exports = { shareDoc, unshareDoc, deleteComment };
