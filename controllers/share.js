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
            return res.status(404).json({ message: 'No user found with the provided email' });
        }

        const doc = await Document.findOne({ _id: id });

        if (doc.docAccess.includes(recipient)) {
            return res.status(400).json({ message: `Document already shared with ${recipient}` });
        }

        doc.docAccess.push(recipient);
        await doc.save();

        gridMail.setApiKey(process.env.SG_MAIL);

        const msg = {
            to: recipient,
            from: sender,
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

module.exports = { shareDoc };
