Testing
Integration
Submissions
Settings
Workflow
Rules
Form endpoint
https://formspree.io/f/mpqejrnj
Copy
Place this URL in the form's action attribute, set the method to POST, and add a name attribute to each input.

Use with AI assistants
Working with AI? Copy and paste the following prompt into your chat to help AI integrate your new form:

I have created a Formspree form with the endpoint:
https://formspree.io/f/mpqejrnj

What follows are a set of integration guides for different environments: Basic HTML, Vanilla JS (Ajax), and React. Please pick the guide that best matches my website and hosting environment. The guides include simple examples for how to integrate with Formspree but you should use form code tailored to my needs.

---

# Basic HTML

Point your form's `action` attribute at the Formspree endpoint and set the method to `POST`:

```html
<form action="https://formspree.io/f/mpqejrnj" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send</button>
</form>
```

For more information on special fields and configuration options, see https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX

---

# Vanilla JS (Ajax)

This is a guide for connecting a Vanilla JS form to Formspree using AJAX. For convenience, use the `@formspree/ajax` JavaScript library which provides a concise, declarative SDK for managing form state, responding to Formspree errors and manipulating the DOM.

## CDN (no bundler needed)

```html
<div data-fs-success></div>
<div data-fs-error></div>

<form id="my-form">
  <label for="email">Email</label>
  <input type="email" id="email" name="email" data-fs-field />
  <span data-fs-error="email"></span>

  <label for="message">Message</label>
  <textarea id="message" name="message" data-fs-field></textarea>
  <span data-fs-error="message"></span>

  <button type="submit" data-fs-submit-btn>Send</button>
</form>

<script>
  window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
  formspree('initForm', { formElement: '#my-form', formId: 'mpqejrnj' });
</script>
<script src="https://unpkg.com/@formspree/ajax@1" defer></script>
```

## With a bundler (ESM)

```bash
npm install @formspree/ajax
```

```js
import { initForm } from '@formspree/ajax';
initForm({ formElement: '#my-form', formId: 'mpqejrnj' });
```

Data attributes:
- `data-fs-field` — input to receive aria-invalid on error
- `data-fs-error` — displays field-level or form-level error messages
- `data-fs-success` — displays success message after submission
- `data-fs-submit-btn` — disabled during submission, re-enabled on completion

For more information, consult the README at https://github.com/formspree/formspree-js/tree/master/packages/formspree-ajax and the AJAX guide at https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX

---

# React

```bash
npm install @formspree/react
```

```jsx
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm('mpqejrnj');
  if (state.succeeded) return <p>Thanks!</p>;
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" required />
      <ValidationError field="email" errors={state.errors} />
      <textarea name="message" required />
      <ValidationError field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>Send</button>
    </form>
  );
}
```

For more information, see the @formspree/react documentation at https://github.com/formspree/formspree-js/tree/master/packages/formspree-react and the Formspree React guide at https://help.formspree.io/hc/en-us/articles/360055613373-Formspree-React

---

Based on the tech stack, apply the matching guide above and suggest any needed code changes.
Show less
Code examples
<!-- modify this form HTML and place wherever you want your form -->
<form
  action="https://formspree.io/f/mpqejrnj"
  method="POST"
>
  <label>
    Your email:
    <input type="email" name="email">
  </label>
  <label>
    Your message:
    <textarea name="message"></textarea>
  </label>
  <!-- your other form fields go here -->
  <button type="submit">Send</button>
</form>
Resources
Form setup guides
Explore our help articles for setting up your form, covering everything from using a "reply to" address to integrating reCAPTCHA v3.

More examples
The Form Library is filled with example forms to get you started. Find everything from a contact form to an RSVP form, edit the code live, and download or copy/paste your work.