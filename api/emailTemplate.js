export function buildEmailHtml({ firstName, lastName, email, company, role, size, message, topic }) {
  const name = `${firstName} ${lastName}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>New inquiry &mdash; Poliris</title>
</head>
<body style="margin:0;padding:0;background:#eef0f6;font-family:'Inter',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef0f6;">
<tr><td align="center" style="padding:40px 16px 48px;">
  <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

    <!-- HEADER -->
    <tr>
      <td style="background:#0d1b3e;border-radius:12px 12px 0 0;padding:18px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td><span style="font-size:16px;font-weight:800;letter-spacing:0.08em;color:#ffffff;text-transform:uppercase;">POLIRIS</span></td>
            <td align="right"><span style="font-size:10.5px;font-weight:500;color:rgba(255,255,255,0.35);letter-spacing:0.08em;text-transform:uppercase;">Brand intelligence for the AI era</span></td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- HERO -->
    <tr>
      <td style="background:#ffffff;padding:36px 28px 28px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#2251d4;">NEW INQUIRY</p>
        <h1 style="margin:0 0 10px;font-size:26px;font-weight:800;line-height:1.2;letter-spacing:-0.025em;color:#0d1b3e;"><span style="color:#2251d4;">${firstName}</span> just reached out<br/>via poliris.io.</h1>
        <p style="margin:0 0 24px;font-size:14.5px;color:#5a6278;line-height:1.6;">Here are their details. Hit reply to get back to them directly.</p>
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#e8edfb;border-radius:100px;padding:6px 14px 6px 10px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:7px;"><div style="width:7px;height:7px;border-radius:50%;background:#2251d4;"></div></td>
                  <td><span style="font-size:12px;font-weight:600;color:#2251d4;letter-spacing:0.01em;">${topic}</span></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="background:#ffffff;padding:0 28px;"><div style="height:1px;background:#e8eaef;"></div></td></tr>

    <!-- DETAILS -->
    <tr>
      <td style="background:#ffffff;padding:24px 28px 20px;">
        <p style="margin:0 0 14px;font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9aa0b4;">CONTACT DETAILS</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="50%" style="vertical-align:top;padding-right:8px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr><td style="background:#f6f7fb;border-radius:8px;padding:13px 14px;">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#9aa0b4;">Name</p>
                  <p style="margin:0;font-size:13.5px;font-weight:600;color:#0d1b3e;">${name}</p>
                </td></tr>
              </table>
              ${role ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr><td style="background:#f6f7fb;border-radius:8px;padding:13px 14px;">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#9aa0b4;">Role</p>
                  <p style="margin:0;font-size:13.5px;font-weight:600;color:#0d1b3e;">${role}</p>
                </td></tr>
              </table>` : ''}
              ${size ? `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="background:#f6f7fb;border-radius:8px;padding:13px 14px;">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#9aa0b4;">Company size</p>
                  <p style="margin:0;font-size:13.5px;font-weight:600;color:#0d1b3e;">${size}</p>
                </td></tr>
              </table>` : ''}
            </td>
            <td width="50%" style="vertical-align:top;padding-left:8px;">
              ${company ? `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr><td style="background:#f6f7fb;border-radius:8px;padding:13px 14px;">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#9aa0b4;">Company</p>
                  <p style="margin:0;font-size:13.5px;font-weight:600;color:#0d1b3e;">${company}</p>
                </td></tr>
              </table>` : ''}
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="background:#e8edfb;border-radius:8px;padding:13px 14px;border:1px solid #c8d4f5;">
                  <p style="margin:0 0 3px;font-size:10px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase;color:#2251d4;">Email</p>
                  <a href="mailto:${email}" style="font-size:12.5px;font-weight:600;color:#2251d4;text-decoration:none;word-break:break-all;">${email}</a>
                </td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- DIVIDER -->
    <tr><td style="background:#ffffff;padding:0 28px;"><div style="height:1px;background:#e8eaef;"></div></td></tr>

    <!-- MESSAGE -->
    <tr>
      <td style="background:#ffffff;padding:24px 28px 32px;">
        <p style="margin:0 0 12px;font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9aa0b4;">THEIR MESSAGE</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="background:#f6f7fb;border-radius:10px;border-left:3px solid #2251d4;padding:18px 20px;">
            <p style="margin:0;font-size:15px;color:#0d1b3e;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;')}</p>
          </td></tr>
        </table>
      </td>
    </tr>

    <!-- CTA BAND -->
    <tr>
      <td style="background:#0d1b3e;padding:28px 28px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-bottom:18px;">
              <p style="margin:0 0 4px;font-size:10.5px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);">NEXT STEP</p>
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.3;">Send ${firstName} a reply.</p>
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:10px;">
                    <a href="mailto:${email}" style="display:inline-block;font-size:13.5px;font-weight:600;color:#ffffff;text-decoration:none;background:#2251d4;padding:12px 22px;border-radius:8px;">Reply to ${firstName} &rarr;</a>
                  </td>
                  <td>
                    <a href="https://app.poliris.io" style="display:inline-block;font-size:13.5px;font-weight:500;color:rgba(255,255,255,0.6);text-decoration:none;padding:11px 22px;border-radius:8px;border:1px solid rgba(255,255,255,0.18);">Open dashboard</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- AI STRIP -->
    <tr>
      <td style="background:#f6f7fb;border-left:1px solid #e2e5ef;border-right:1px solid #e2e5ef;padding:13px 28px;">
        <p style="margin:0;font-size:11px;color:#9aa0b4;text-align:center;letter-spacing:0.04em;">ChatGPT &nbsp;&middot;&nbsp; Gemini &nbsp;&middot;&nbsp; Perplexity &nbsp;&middot;&nbsp; Claude &nbsp;&middot;&nbsp; Mistral &nbsp;&middot;&nbsp; DeepSeek &nbsp;&middot;&nbsp; Grok &nbsp;&middot;&nbsp; Copilot</p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#ffffff;border-radius:0 0 12px 12px;border:1px solid #e2e5ef;border-top:none;padding:18px 28px 22px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td><span style="font-size:13px;font-weight:800;letter-spacing:0.08em;color:#0d1b3e;text-transform:uppercase;">POLIRIS</span></td>
            <td align="right">
              <span style="font-size:11.5px;color:#9aa0b4;">
                <a href="mailto:contact@poliris.io" style="color:#9aa0b4;text-decoration:none;">contact@poliris.io</a>&nbsp;&middot;&nbsp;<a href="https://poliris.io" style="color:#9aa0b4;text-decoration:none;">poliris.io</a>
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td align="center" style="padding:14px 0 0;">
        <p style="margin:0;font-size:11px;color:#9aa0b4;">Internal notification &middot; Poliris contact form</p>
      </td>
    </tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}
