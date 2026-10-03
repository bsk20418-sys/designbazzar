import 'dotenv/config';

const DEFAULT_TO = 'desgnbaazar01@gmail.com';
const DEFAULT_FROM = 'DesignBazzar <onboarding@resend.dev>';

function buildPayload(body) {
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const company = String(body?.company || '').trim();
  const service = String(body?.service || '').trim();
  const budget = String(body?.budget || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || !email || !service || !message) {
    return { error: 'Please complete all required fields.' };
  }

  const subject = `New DesignBazzar project inquiry — ${service}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business / Brand: ${company || 'Not specified'}`,
    `Service: ${service}`,
    `Timeline / Budget: ${budget || 'Not specified'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#171717">
      <h2>New DesignBazzar project inquiry</h2>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Business / Brand:</strong> ${escapeHtml(company || 'Not specified')}</p>
      <p><strong>Timeline / Budget:</strong> ${escapeHtml(budget || 'Not specified')}</p>
      <hr />
      <p><strong>Message</strong></p>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  return { name, email, subject, text, html };
}

export async function sendInquiry(body) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 500, error: 'Email service is not configured yet. Add RESEND_API_KEY to the project environment.' };
  }

  const payload = buildPayload(body);
  if (payload.error) return { ok: false, status: 400, error: payload.error };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to: [process.env.RESEND_TO_EMAIL || DEFAULT_TO],
      reply_to: payload.email,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data?.message || data?.name || 'The email service rejected the message.',
    };
  }

  return { ok: true, data };
}
