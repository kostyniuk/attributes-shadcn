// Tab value constants
export const ATTRIBUTE_TYPES = {
  TICKET: 'ticket',
  QUOTE: 'quote',
  PART: 'part'
} as const;

export const TICKET_TABS = {
  PERSONAL: 'personal',
  SOCIAL: 'social',
  PREFERENCES: 'preferences'
} as const;

export const QUOTE_TABS = {
  GENERAL: 'general',
  SECURITY: 'security',
  PRIVACY: 'privacy'
} as const;

export const PART_TABS = {
  PLAN: 'plan',
  PAYMENT: 'payment',
  HISTORY: 'history'
} as const;

// Tab data constants
export const TAB_DATA = {
  ticket: {
    personal: {
      title: "Personal Info",
      data: [
        { label: "Full Name", value: "John Doe" },
        { label: "Email", value: "john.doe@example.com" },
        { label: "Location", value: "San Francisco, CA" }
      ]
    },
    social: {
      title: "Social Links",
      data: [
        { label: "Twitter", value: "@johndoe" },
        { label: "GitHub", value: "github.com/johndoe" },
        { label: "Website", value: "johndoe.com" }
      ]
    },
    preferences: {
      title: "Preferences",
      data: [
        { label: "Language", value: "English" },
        { label: "Timezone", value: "Pacific Time (PT)" },
        { label: "Theme", value: "System Default" }
      ]
    }
  },
  quote: {
    general: {
      title: "General",
      data: [
        { label: "Account Status", value: "Active" },
        { label: "Member Since", value: "January 2024" }
      ]
    },
    security: {
      title: "Security",
      data: [
        { label: "Two-Factor Authentication", value: "Enabled" },
        { label: "Last Password Change", value: "30 days ago" }
      ]
    },
    privacy: {
      title: "Privacy",
      data: [
        { label: "Profile Visibility", value: "Public" },
        { label: "Data Sharing", value: "Disabled" }
      ]
    }
  },
  part: {
    plan: {
      title: "Current Plan",
      data: [
        { label: "Plan", value: "Professional" },
        { label: "Price", value: "$29/month" },
        { label: "Next Billing Date", value: "February 1, 2024" }
      ]
    },
    payment: {
      title: "Payment Method",
      data: [
        { label: "Payment Method", value: "•••• •••• •••• 4242" },
        { label: "Expires", value: "12/2025" }
      ]
    },
    history: {
      title: "Billing History",
      data: [
        { label: "January 2024", value: "$29.00 - Paid" },
        { label: "December 2023", value: "$29.00 - Paid" }
      ]
    }
  }
} as const;
