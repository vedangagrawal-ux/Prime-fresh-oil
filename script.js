
/* =========================
   1. MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close the menu when a navigation link is clicked.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});


/* =========================
   2. PRODUCT SELECTION
========================= */

const productSelect = document.getElementById("product");
const quoteForm = document.getElementById("quoteForm");

document.querySelectorAll("[data-product]").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedProduct = link.dataset.product;

    const matchingOption = Array.from(productSelect.options).find(
      (option) => option.textContent.trim() === selectedProduct
    );

    if (matchingOption) {
      productSelect.value = matchingOption.value;
    } else {
      productSelect.value = "Other / product range enquiry";
    }
  });
});


/* =========================
   3. QUOTATION FORM
========================= */

const formFeedback = document.getElementById("formFeedback");

quoteForm.addEventListener("submit", (event) => {
  // Stop the browser from reloading the page.
  event.preventDefault();

  // Check required fields and input formats.
  if (!quoteForm.reportValidity()) {
    return;
  }

  // Collect the form information.
  const formData = new FormData(quoteForm);

  const name = formData.get("name");
  const company = formData.get("company");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const product = formData.get("product");
  const quantity = formData.get("quantity") || "Not specified";
  const packaging = formData.get("packaging") || "Not specified";
  const message = formData.get("message") || "No additional details";

  // Create a readable enquiry summary.
  const enquiry = [
    "PRIME FRESH OIL MILLS",
    "BUSINESS QUOTATION ENQUIRY",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Contact number: ${phone}`,
    `Product: ${product}`,
    `Estimated quantity: ${quantity}`,
    `Packaging: ${packaging}`,
    `Additional details: ${message}`
  ].join("\n");

  // Display the prepared enquiry on the page.
  formFeedback.replaceChildren();

  const heading = document.createElement("strong");
  heading.textContent = "Your enquiry is ready.";

  const description = document.createElement("p");
  description.textContent =
    "Review your details below. This demo does not send your information to the manufacturer.";

  const summary = document.createElement("pre");
  summary.className = "enquiry-summary";
  summary.textContent = enquiry;

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "button button-dark copy-button";
  copyButton.textContent = "Copy enquiry";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(enquiry);

      copyButton.textContent = "Copied successfully!";
    } catch (error) {
      // Fallback for browsers that block clipboard access.
      summary.hidden = false;

      const range = document.createRange();
      range.selectNodeContents(summary);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      copyButton.textContent = "Select and copy the text";
    }
  });

  formFeedback.append(heading, description, summary, copyButton);
  formFeedback.hidden = false;

  formFeedback.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});


/* =========================
   4. COPYRIGHT YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    contactStatus.textContent =
      "Thank you! The form is valid, but online submission is not configured yet.";

    // Connect an email or backend service to receive real enquiries.
  });
}
