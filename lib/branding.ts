export type LmsTenant = "otto" | "vectra";

export type LmsBranding = {
  tenant: LmsTenant;
  productName: string;
  clientName: string;
  vendorName: string;
  vendorUrl: string;
  description: string;
  mailFromName: string;
  logoSrc: string;
  logoAlt: string;
  homeUrl: string;
  showPartnerStrip: boolean;
  showClientFooterNav: boolean;
};

function tenantFromEnv(): LmsTenant {
  const value = (process.env.LMS_TENANT || process.env.NEXT_PUBLIC_LMS_TENANT || "vectra")
    .trim()
    .toLowerCase();
  return value === "otto" ? "otto" : "vectra";
}

export function getBranding(): LmsBranding {
  const tenant = tenantFromEnv();
  const vendorName = process.env.LMS_VENDOR_NAME || "VECTRA";
  const vendorUrl = process.env.LMS_VENDOR_URL || "https://vectra-intl.com/";

  if (tenant === "otto") {
    const productName = process.env.LMS_PRODUCT_NAME || "Otto Group Academy";
    return {
      tenant,
      productName,
      clientName: process.env.LMS_CLIENT_NAME || "Otto Group",
      vendorName,
      vendorUrl,
      description: process.env.LMS_DESCRIPTION || "VECTRA International learning management system",
      mailFromName: process.env.LMS_MAIL_FROM_NAME || productName,
      logoSrc: "/otto-group-logo.svg",
      logoAlt: "Otto Group",
      homeUrl: "https://www.ottogroup.com/en/",
      showPartnerStrip: true,
      showClientFooterNav: true
    };
  }

  const productName = process.env.LMS_PRODUCT_NAME || "VECTRA Academy";
  return {
    tenant,
    productName,
    clientName: process.env.LMS_CLIENT_NAME || "VECTRA International",
    vendorName,
    vendorUrl,
    description: process.env.LMS_DESCRIPTION || "VECTRA International learning management system",
    mailFromName: process.env.LMS_MAIL_FROM_NAME || productName,
    logoSrc: "/vectra-logo.png",
    logoAlt: "VECTRA International",
    homeUrl: process.env.LMS_HOME_URL || "https://vectra-intl.com/",
    showPartnerStrip: false,
    showClientFooterNav: false
  };
}

export function poweredByLabel(branding = getBranding()): string {
  return `e-Learning management system powered by ${branding.vendorName}`;
}
