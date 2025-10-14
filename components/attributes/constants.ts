// Tab value constants
export const ATTRIBUTE_TYPES = {
  TICKET: 'ticket',
  QUOTE: 'quote',
  PART: 'part'
} as const;

export const TICKET_TABS = {
  STATUS: 'status',
  PRODUCTION_TIME: 'productionTime',
  DELIVERY_OPTIONS: 'deliveryOptions'
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
    status: {
      title: "Ticket Status",
      data: [
        { id: "status-1", label: "Open", value: "Open", color: "22c55e" },
        { id: "status-2", label: "Closed", value: "Closed", color: "ef4444" },
        { id: "status-3", label: "Delivered", value: "Delivered", color: "3b82f6" }
      ]
    },
    productionTime: {
      title: "Production Time",
      data: [
        { label: "Production Time", value: "10 days" },
        { label: "Production Date", value: "2025-01-01" },
        { label: "Production Status", value: "In Progress" }
      ]
    },
    deliveryOptions: {
      title: "Delivery Options",
      data: [
        { label: "Delivery Option", value: "Standard" },
        { label: "Delivery Time", value: "10 days" },
        { label: "Delivery Status", value: "In Progress" }
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
