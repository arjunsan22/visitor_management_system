import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendVisitorPassEmail = async ({
    name,
    email,
    phone,
    purpose,
    person_to_visit,
    department,
    visit_date,
    check_in_time,
    pass_token,
}) => {

    const passUrl = `${process.env.CLIENT_URL}/pass/${pass_token}`;

    const formattedDate = new Date(visit_date).toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formatTime = (timeStr) => {
        if (!timeStr) return "—";
        const [hours, minutes] = timeStr.split(":");
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${h}:${minutes} ${ampm}`;
    };

    const subject = `🎫 Visitor Entry Pass - National Institute of Technology Calicut - ${formattedDate}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NITC Visitor Pass</title>
</head>
<body style="margin:0; padding:0; background-color:#0A0E1A; font-family:'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0A0E1A; padding:40px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#10162A; border-radius:16px; border:1px solid rgba(255,255,255,0.08); overflow:hidden;">

                    <!-- Hazard Strip -->
                    <tr>
                        <td style="height:3px; background:repeating-linear-gradient(135deg,#C9A227 0 10px,transparent 10px 20px); opacity:0.45;"></td>
                    </tr>

                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 32px 0; text-align:center;">
                            <p style="margin:0; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; color:#D9B84A; font-weight:600;">
                                ● NIT Calicut · Campus Security
                            </p>
                            <h1 style="margin:16px 0 0; font-size:24px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                                Visitor Entry Pass
                            </h1>
                            <p style="margin:8px 0 0; font-size:14px; color:#8A93AC;">
                                Your digital access pass for campus entry
                            </p>
                        </td>
                    </tr>

                    <!-- Dear Visitor -->
                    <tr>
                        <td style="padding:24px 32px 0;">
                            <p style="margin:0; font-size:14px; color:#C8CDD8; line-height:1.6;">
                                Dear <strong style="color:#ffffff;">${name}</strong>,
                            </p>
                            <p style="margin:10px 0 0; font-size:14px; color:#8A93AC; line-height:1.6;">
                                Your visitor entry pass for the National Institute of Technology Calicut (NITC) has been generated successfully. Please present the pass token at the main gate security center upon arrival.
                            </p>
                        </td>
                    </tr>

                    <!-- Pass Card -->
                    <tr>
                        <td style="padding:24px 32px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#141B31; border-radius:12px; border:1px solid rgba(255,255,255,0.06); overflow:hidden;">

                                <!-- Card Header -->
                                <tr>
                                    <td style="padding:20px 24px; border-bottom:1px solid rgba(255,255,255,0.06);">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td>
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280;">Visitor</p>
                                                    <h2 style="margin:6px 0 0; font-size:20px; font-weight:600; color:#ffffff;">${name}</h2>
                                                </td>
                                                <td align="right" valign="top">
                                                    <span style="display:inline-block; padding:4px 12px; border-radius:4px; border:1px solid rgba(201,162,39,0.3); background:rgba(201,162,39,0.1); font-size:10px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#D9B84A;">PASS</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Details -->
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                                            <!-- Email -->
                                            <tr>
                                                <td style="padding-bottom:16px;">
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Email</p>
                                                    <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${email}</p>
                                                </td>
                                            </tr>

                                            <!-- Phone -->
                                            <tr>
                                                <td style="padding-bottom:16px;">
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Phone</p>
                                                    <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${phone}</p>
                                                </td>
                                            </tr>

                                            <!-- Purpose -->
                                            <tr>
                                                <td style="padding-bottom:16px;">
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Purpose</p>
                                                    <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${purpose}</p>
                                                </td>
                                            </tr>

                                            <!-- Person to Visit -->
                                            <tr>
                                                <td style="padding-bottom:16px;">
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Person to Visit</p>
                                                    <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${person_to_visit}</p>
                                                </td>
                                            </tr>

                                            <!-- Department -->
                                            <tr>
                                                <td style="padding-bottom:16px;">
                                                    <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Department</p>
                                                    <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${department}</p>
                                                </td>
                                            </tr>

                                            <!-- Visit Date & Check-in -->
                                            <tr>
                                                <td>
                                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="50%" style="padding-bottom:16px;">
                                                                <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Visit Date</p>
                                                                <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${formattedDate}</p>
                                                            </td>
                                                            <td width="50%" style="padding-bottom:16px;">
                                                                <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Check-in Time</p>
                                                                <p style="margin:6px 0 0; font-size:14px; color:#D1D5DB;">${formatTime(check_in_time)}</p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>



                                            <!-- Tear Line -->
                                            <tr>
                                                <td style="padding:4px 0 16px;">
                                                    <div style="border-top:1px dashed rgba(255,255,255,0.15);"></div>
                                                </td>
                                            </tr>

                                            <!-- QR Code -->
                                            <tr>
                                                <td align="center" style="padding-bottom:8px;">
                                                    <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Visitor Pass QR</p>
                                                    <div style="display:inline-block; padding:12px; background:#ffffff; border-radius:8px; border:1px solid rgba(201,162,39,0.25);">
                                                        <img src="cid:qrcode" alt="Visitor Pass QR Code" width="180" height="180" style="display:block;" />
                                                    </div>
                                                    <p style="margin:12px 0 0; font-size:12px; color:#6B7280;">Scan this QR code at the security gate</p>
                                                </td>
                                            </tr>

                                                    <!-- Status & QR Code Tracking -->
                                                    <tr>
                                                        <td style="padding-top:16px; border-top:1px solid rgba(255,255,255,0.06);">
                                                            <p style="margin:0 0 8px 0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280; font-weight:500;">Live Tracking</p>
                                                            
                                                            <!-- Modern Container for QR Instruction -->
                                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.1); border-radius:6px; padding:12px;">
                                                                <tr>
                                                                    <td style="vertical-align: middle;">
                                                                        <p style="margin:0; font-size:12px; color:#F3F4F6; font-weight:500; line-height:1.5;">
                                                                            To check the live status of your visit, please <span style="color:#D9B84A; font-weight:600;">scan the QR code</span> 
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>


                                        </table>
                                    </td>
                                </tr>

                                <!-- Card Footer -->
                                <tr>
                                    <td style="padding:16px 24px; border-top:1px dashed rgba(255,255,255,0.1); text-align:center;">
                                        <p style="margin:0; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#6B7280;">
                                            Please present this pass at the security gate
                                        </p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>

                    <!-- Validity -->
                    <tr>
                        <td style="padding:0 32px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(201,162,39,0.06); border:1px solid rgba(201,162,39,0.15); border-radius:8px;">
                                <tr>
                                    <td style="padding:14px 20px; text-align:center;">
                                        <p style="margin:0; font-size:12px; color:#D9B84A; font-weight:600;">
                                            ⏱ Validity: Valid only on ${formattedDate}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>



                    <!-- Important Instructions -->
                    <tr>
                        <td style="padding:0 32px 24px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(239,68,68,0.04); border:1px solid rgba(239,68,68,0.12); border-radius:8px;">
                                <tr>
                                    <td style="padding:20px 24px;">
                                        <p style="margin:0 0 12px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#F87171; font-weight:600;">
                                            ⚠️ Important Instructions
                                        </p>

                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td style="padding:6px 0; font-size:13px; color:#9CA3AF; line-height:1.5;">
                                                    <strong style="color:#D1D5DB;">Mandatory Checkout:</strong> It is mandatory to report to the security center and officially log your checkout time before leaving the college campus.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0; font-size:13px; color:#9CA3AF; line-height:1.5;">
                                                    <strong style="color:#D1D5DB;">Hand Pass Return:</strong> Please ensure you carry the printed hand pass (visitor slip with your details and photo issued at check-in) throughout your visit and return it to the security center after checking out.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0; font-size:13px; color:#9CA3AF; line-height:1.5;">
                                                    <strong style="color:#D1D5DB;">Identification:</strong> Please carry a valid government-issued photo ID card (such as Aadhaar Card, Driving License, or Passport) along with this digital pass for verification at the gate.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding:6px 0; font-size:13px; color:#9CA3AF; line-height:1.5;">
                                                    <strong style="color:#D1D5DB;">Campus Rules:</strong> Kindly adhere to the campus speed limits and all institutional safety protocols during your visit.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Contact -->
                    <tr>
                        <td style="padding:0 32px 24px;">
                            <p style="margin:0; font-size:13px; color:#6B7280; line-height:1.6;">
                                For any queries regarding your visit, please reply to this email or contact your host directly.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:24px 32px; border-top:1px solid rgba(255,255,255,0.06); text-align:center;">
                            <p style="margin:0; font-size:12px; color:#6B7280; font-weight:500;">Best regards,</p>
                            <p style="margin:6px 0 0; font-size:13px; color:#9CA3AF; font-weight:600;">Campus Security & Visitor Management Cell</p>
                            <p style="margin:4px 0 0; font-size:12px; color:#6B7280;">National Institute of Technology Calicut</p>
                        </td>
                    </tr>

                    <!-- Bottom Hazard Strip -->
                    <tr>
                        <td style="height:3px; background:repeating-linear-gradient(135deg,#C9A227 0 10px,transparent 10px 20px); opacity:0.45;"></td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
    `;

    const QRCode = await import("qrcode");
    const qrDataUrl = await QRCode.default.toDataURL(passUrl, {
        width: 360,
        margin: 2,
        color: {
            dark: "#000000",
            light: "#ffffff",
        },
        errorCorrectionLevel: "H",
    });

    // Convert data URL to buffer for attachment
    const qrBuffer = Buffer.from(
        qrDataUrl.replace(/^data:image\/png;base64,/, ""),
        "base64"
    );

    const mailOptions = {
        from: `"NITC Visitor Management" <${process.env.SMTP_USER}>`,
        to: email,
        subject,
        html,
        attachments: [
            {
                filename: "visitor-pass-qr.png",
                content: qrBuffer,
                cid: "qrcode",
            },
        ],
    };

    await transporter.sendMail(mailOptions);
};
