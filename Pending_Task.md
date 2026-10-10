# Pending Tasks

Updated: 9 October 2026

The tasks below are recorded for future implementation. Listing them does not activate any integration. The current requirement is to use no APIs or database; CRM and dashboard work remain deferred unless that requirement changes.

1. **Contact Us form CAPTCHA**
   - Choose and implement CAPTCHA or another appropriate spam-control solution.
   - Current form prepares an email draft; it has no submission backend. A client-only CAPTCHA must not be presented as verified backend protection.

2. **Google Analytics**
   - Supply the Google Analytics measurement ID and confirm the tracking requirements.
   - Add the approved tracking configuration and any required privacy/consent controls before activation.

3. **Social Media Links**
   - Supply approved company profile URLs for LinkedIn, Instagram, Facebook and X, as applicable.
   - WhatsApp already uses the confirmed phone number: +91 78787 82189.
   - Keep unspecified profiles hidden until their URLs are supplied.

4. **CRM**
   - Deferred. Confirm the CRM product and enquiry workflow before implementation.
   - No enquiry records are currently stored or synced to a CRM.

5. **Dashboard**
   - Deferred; the current instruction is that a dashboard is not needed.
   - Confirm its purpose, access requirements and storage approach if requested later.

6. **Add Project Details**
   - Supply approved project names, descriptions, services, screenshots, links and publishable outcomes.
   - Confirm permission to publish client names, logos and other client materials.
   - Replace the clearly labelled demonstration content with the approved real projects.

## Current Contact Form Behaviour

- Recipient: **sandipnakrani21@gmail.com**.
- Subject: **Aarsoft Website Enquiry | [Selected Service]**.
- Email draft includes name, email, company, phone, service, budget and project details, with readable labels and spacing.
- Visitors must send the prepared message through their email app. The website does not automatically deliver or save the enquiry.
- Automatic acknowledgements remain on hold.

## Existing API to Review

The existing `/api/og` route generates social sharing preview images. It still exists; to meet the zero-API requirement, replace it with a static preview image in a subsequent change. No database is configured.
