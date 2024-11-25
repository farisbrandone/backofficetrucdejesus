export type DataIntegrationType = {
  image: string;
  nom: string;
  urlRedirection?: string;
  keyAndSecret?: boolean;
  description?: string;
};
export type ComponentType = {
  data: DataIntegrationType[];
  openPayment: boolean;
  openResponder: boolean;
  openWebinar: boolean;
  openTherIntegration: boolean;
};

export const dataForPayment: DataIntegrationType[] = [
  {
    nom: "PAYPAL",
    image: "./paypal.png",
    keyAndSecret: true,
    description: "Payment Gateway",
  },
  {
    nom: "STRIPE",
    image: "./stripe.png",
    keyAndSecret: true,
    description: "Payment Gateway",
  },
  {
    nom: "RAZORPAY",
    image: "./Razorpay.jpg",
    keyAndSecret: true,
    description: "Payment Gateway",
  },
  {
    nom: "FLUTTERWAVE",
    image: "./flutterWave.png",
    keyAndSecret: true,
    description: "Payment Gateway",
  },
  {
    nom: "VISA-MASTERCARD-BANK",
    image: "./visamastercard.png",
    keyAndSecret: true,
    description: "Payment Gateway",
  },
];

export const dataForAutoResponder: DataIntegrationType[] = [
  {
    nom: "Aweber",
    image: "./image-marketing/aweber.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Mail Chimp",
    image: "./image-marketing/mail-chimp.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Active Campaign",
    image: "./image-marketing/active-campaign.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Sendlane",
    image: "./image-marketing/sendlane.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "SendReach",
    image: "./image-marketing/sebdreach.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "GetResponse",
    image: "./image-marketing/getresponse.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "iContact",
    image: "./image-marketing/icontact.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Constant Contact",
    image: "./image-marketing/constant-contact.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Mailvio",
    image: "./image-marketing/mailvio.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Sendinblue",
    image: "./image-marketing/sendinblue.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Sendiio",
    image: "./image-marketing/sendiio.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "LetsMail",
    image: "./image-marketing/letsmail.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Mailerlite",
    image: "./image-marketing/mailerlite.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "SendGrid",
    image: "./image-marketing/sendgrid.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
  {
    nom: "Global Control Center",
    image: "./image-marketing/global-control-center.jpeg",
    urlRedirection: "#",
    description: "Email Marketing",
  },
];

export const dataForWebinar: DataIntegrationType[] = [
  {
    nom: "GoToWebinar",
    image: "./image-webinar/gotowebinar.jpeg",
    urlRedirection: "#",
    description: "Webinar Configurations",
  },
  {
    nom: "Meetvio",
    image: "./image-webinar/mettvio.jpeg",
    urlRedirection: "#",
    description: "Webinar Configurations",
  },
];

export const dataForOtherIntegration: DataIntegrationType[] = [
  {
    nom: "SMTP",
    image: "./other-integration/smtp.jpeg",
    urlRedirection: "#",
    description: "SMTP Configurations",
  },
  {
    nom: "Youzign",
    image: "./other-integration/youzign.jpeg",
    urlRedirection: "#",
    description: "Social Media Graphics",
  },
];
