const nodeMailer = require("nodemailer");
exports.nodeMailer = async (email,title,Body) => {

    try {
        let transporter = nodeMailer.createTransport({
            host : 'smtp.gmail.com',
            auth : {
                user : 'utkarshp04@gmail.com',
                pass : 'lvup drnk gpfs pnch'
            }
        })

        let info = await transporter.sendMail({
            from : 'StudyNotion || An edtech startup',
            to  : `${email}`,
            subject : `${title}`,
            html : `${Body}`
        })

        return info
    }

    catch(err) {
        console.log(err);
    }


}