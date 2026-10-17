/* ============================================================================
 * TERMS & POLICIES — the copy for /policies
 * ----------------------------------------------------------------------------
 * One page, five sections: Terms & Conditions, Privacy Policy, Refund &
 * Cancellation, Course Access & Delivery, Contact Us. Razorpay's website
 * review looks for each of these, plus a visible business name, email, phone
 * and address.
 *
 * This is a starting draft written from what the site already says. It is not
 * legal advice — have it read by someone qualified before relying on it.
 *
 * TODO before applying to Razorpay:
 *   1. Fill in every field of `business` below (they show on the page in
 *      [square brackets] until then).
 *   2. Confirm the refund rules in §3 and the access timing in §4 with Simran
 *      — they are commitments customers can hold her to.
 *   3. Update `lastUpdated` whenever the text changes.
 * ==========================================================================*/

import { brand, pricing } from "@/content/site";

export const business = {
  /* TODO — full legal name, or business name, exactly as on the Razorpay
   * application and bank account */
  legalName: brand.fullName === "Simran" ? "[Full legal name]" : brand.fullName,
  /* TODO — confirm this inbox exists and is monitored */
  email: brand.email,
  /* TODO — contact number with country code */
  phone: "[Phone number]",
  /* TODO — business or correspondence address */
  address: "[Business address]",
  /* TODO — the city whose courts have jurisdiction (usually where the
   * business is based) */
  jurisdiction: "[City]",
  instagram: brand.instagram,
  lastUpdated: "17 October 2026",
};

export type PolicyBlock = {
  /** Optional numbered clause heading */
  h?: string;
  p?: string[];
  ul?: string[];
};

export type PolicySection = {
  id: string;
  title: string;
  intro?: string;
  blocks: PolicyBlock[];
};

const course = `"${brand.courseName}"`;
const price = `${pricing.currency}${pricing.price}`;

export const policies = {
  eyebrow: "The fine print",
  title: "Terms & Policies",
  lede: `Everything about enrolling in ${brand.courseName}: the terms of the course, how your information is handled, refunds, and how you get access.`,

  sections: [
    /* --------------------------------------------------------------------- */
    {
      id: "terms",
      title: "Terms & Conditions",
      intro: `These terms apply when you use this website or enroll in ${course} (the "Course"), offered by ${business.legalName} ("we", "us", "our"). By enrolling or making a payment, you agree to them. If you don't agree, please don't enroll.`,
      blocks: [
        {
          h: "The Course",
          p: [
            "The Course is a self-paced online piano course of 23 pre-recorded video lessons across four modules. Enrolment also includes the extras listed on the course page: two months of Sunday live doubt sessions, a WhatsApp student community, a certificate of completion and a keyboard buying guide.",
            "We may improve, re-record or reorder lessons over time. We won't remove what you paid for without offering something equivalent.",
          ],
        },
        {
          h: "Who can enroll",
          p: [
            "Anyone can learn — the Course is designed for complete beginners of any age. If the student is under 18, a parent or guardian must enroll and pay on their behalf, and agrees to these terms for them. Young children should learn with an adult nearby.",
          ],
        },
        {
          h: "Price and payment",
          ul: [
            "All prices are in Indian Rupees (INR). Any applicable taxes are shown at checkout.",
            "Payments are processed securely by Razorpay. We never see or store your card, UPI or bank details.",
            `The launch price of ${price} applies to the first 100 enrollments and ends once that limit is reached. The price you pay is the price shown at checkout.`,
            "Enrolment is a one-time payment. There is no subscription and nothing renews automatically.",
          ],
        },
        {
          h: "Your access",
          ul: [
            `"Lifetime access" means access to the Course for as long as we offer it. If we ever stop offering it, we will give enrolled students reasonable notice.`,
            "Your access is personal to you. Please don't share your login or lesson links, or let others use your account.",
          ],
        },
        {
          h: "Live sessions and the community",
          ul: [
            "The Sunday live doubt sessions run for two months, as described on the course page. Timings are shared with enrolled students and may occasionally be rescheduled.",
            "Missed live sessions can't be refunded or carried forward, but you can bring your questions to the next one or to the student community.",
            "Please be kind and respectful in the community. We may remove anyone who harasses others, spams, or shares course material outside it.",
          ],
        },
        {
          h: "Course content",
          p: [
            "All lessons, videos, notes and song arrangements belong to us. They are for your personal, non-commercial learning only. You may not record, copy, share, upload, resell or publicly perform the lessons themselves, or distribute any course material, without our written permission.",
          ],
        },
        {
          h: "Certificate",
          p: [
            "The certificate of completion recognises that you finished the Course. It is not an accredited academic or professional qualification.",
          ],
        },
        {
          h: "Results",
          p: [
            "How quickly you progress depends on your practice. We teach carefully and support you along the way, but we can't guarantee a particular result or timeline.",
          ],
        },
        {
          h: "Videos and messages you share",
          p: [
            "If you send us practice or progress videos, photos or feedback, we will only share them publicly — on this website or on Instagram — with your permission, or a parent's or guardian's permission for anyone under 18. You can ask us to take them down at any time.",
          ],
        },
        {
          h: "Liability",
          p: [
            "The Course is provided as it is. To the extent the law allows, our total liability to you for anything related to the Course is limited to the amount you paid for it. We aren't responsible for problems caused by your device, internet connection or instrument. Please practise with good posture and take breaks.",
          ],
        },
        {
          h: "Changes to these terms",
          p: [
            "We may update these terms from time to time. The current version is always on this page, with the date it was last updated. Changes won't reduce what you've already paid for.",
          ],
        },
        {
          h: "Governing law",
          p: [
            `These terms are governed by the laws of India. Any dispute is subject to the jurisdiction of the courts at ${business.jurisdiction}.`,
          ],
        },
      ],
    },

    /* --------------------------------------------------------------------- */
    {
      id: "privacy",
      title: "Privacy Policy",
      intro: `This policy explains what personal information ${business.legalName} collects, why, and how it's looked after, in line with India's Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.`,
      blocks: [
        {
          h: "What we collect",
          ul: [
            "Details you give us when you enroll or get in touch: your name, email address, phone or WhatsApp number, and the messages you send.",
            "Payment confirmation from Razorpay: the amount, transaction ID and the contact details you entered at checkout. Your card, UPI and bank details go to Razorpay only — we never receive them.",
            "Anything you choose to share with us, such as practice videos, photos or feedback.",
            "Basic technical information, such as your IP address and browser type, which our hosting provider processes to deliver this website securely.",
          ],
        },
        {
          h: "Cookies and tracking",
          p: [
            "This website does not use advertising or analytics cookies, and does not track you across other sites. Services we link to or embed — Razorpay checkout, WhatsApp, Instagram and YouTube — have their own privacy policies.",
          ],
        },
        {
          h: "How we use it",
          ul: [
            "To give you access to the Course and its live sessions and community.",
            "To process your payment and send your receipt.",
            "To answer your questions and support your learning.",
            "To tell you about updates to the Course. You can ask us to stop at any time.",
            "To meet our legal, tax and accounting obligations.",
          ],
        },
        {
          h: "Who we share it with",
          p: [
            "We never sell or rent your personal information. We share it only with the services needed to run the Course — Razorpay (payments), WhatsApp (messages and the student community), our video and course hosting providers (lesson delivery) and our website host — or when the law requires us to.",
          ],
        },
        {
          h: "Children",
          p: [
            "Many of our students are under 18. We collect a child's information only with the consent of their parent or guardian, and we never share a child's photo or video publicly without a parent's or guardian's permission.",
          ],
        },
        {
          h: "How long we keep it",
          p: [
            "We keep your information while you have access to the Course, and afterwards only for as long as the law requires (for example, for tax records). Otherwise we delete it when you ask us to.",
          ],
        },
        {
          h: "Your rights",
          p: [
            "You can ask to see the personal information we hold about you, to correct or update it, or to delete it. You can withdraw your consent at any time, and nominate someone to exercise these rights on your behalf. To do any of this, write to us at the email below.",
          ],
        },
        {
          h: "Security",
          p: [
            "We take reasonable steps to keep your information safe. No method of sending or storing data over the internet is completely secure, but we work to protect it.",
          ],
        },
        {
          h: "Grievances",
          p: [
            `If you have a concern about how your information is handled, contact our grievance officer, ${business.legalName}, at ${business.email}. We will respond as soon as possible, and within one month.`,
          ],
        },
      ],
    },

    /* --------------------------------------------------------------------- */
    {
      id: "refunds",
      title: "Refund & Cancellation Policy",
      /* TODO — confirm each of these rules with Simran before launch */
      intro: "The Course is digital, and your access is set up soon after you pay — so payments are generally not refundable once access has been given. There are a few exceptions.",
      blocks: [
        {
          h: "When you can get a refund",
          ul: [
            "Charged twice: if a payment goes through more than once, we refund every duplicate in full.",
            "No access: if you paid but couldn't access the Course, and we weren't able to fix it within 7 days of you telling us, we refund you in full.",
            "Changed your mind early: if you write to us within 24 hours of paying, and before you've opened any lesson, we cancel your enrolment and refund you in full.",
          ],
        },
        {
          h: "How refunds are paid",
          p: [
            "Approved refunds go back to your original payment method through Razorpay, usually within 5–7 working days. Your bank may take a little longer to show it.",
          ],
        },
        {
          h: "How to ask",
          p: [
            `Email ${business.email} with your name, the payment ID from your receipt, and the reason. We will reply within 2 working days.`,
          ],
        },
      ],
    },

    /* --------------------------------------------------------------------- */
    {
      id: "delivery",
      title: "Course Access & Delivery",
      /* TODO — confirm the access timing and how access is sent */
      intro: "Nothing is shipped — the Course is delivered entirely online.",
      blocks: [
        {
          ul: [
            "After your payment succeeds, your access details are sent to the email address or WhatsApp number you gave at checkout, usually within 24 hours.",
            `If you haven't received them within 24 hours, write to us at ${business.email} and we'll sort it out.`,
            "Lessons can be watched on a phone, tablet or computer, any time, as many times as you like.",
            "Details of the Sunday live sessions are shared with enrolled students in the community.",
            "Your certificate of completion is sent as a downloadable PDF once you finish the Course.",
          ],
        },
      ],
    },
  ] as PolicySection[],
};
