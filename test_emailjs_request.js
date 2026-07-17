const https = require('https');

const payload = {
  service_id: 'service_1ral4jg',
  template_id: 'template_y5ipuvd',
  user_id: '9CSL_X0NzWLZWuDOw',
  template_params: {
    client_name: 'Test User',
    client_email: 'test@example.com',
    client_phone: '+1234567890',
    company: 'Test Co',
    preferred_contact: 'Email',
    category: 'Development',
    service: 'Business Website',
    budget: 'UGX 1,000,000–2,000,000',
    timeline: '2–4 weeks',
    goal: 'Testing EmailJS integration',
    details: 'This is a verification request from the deployed site integration test.',
    logo_url: 'https://zidesigns.vercel.app/favicon/android-chrome-512x512.png',
  },
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'api.emailjs.com',
  path: '/api/v1.0/email/send',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = https.request(options, (res) => {
  let body = '';
  console.log('statusCode:', res.statusCode);
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('response body:', body);
  });
});

req.on('error', (err) => {
  console.error('request error:', err);
});

req.write(data);
req.end();
