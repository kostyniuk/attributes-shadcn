// Tab value constants
export const ATTRIBUTE_TYPES = {
  TICKET: 'ticket',
  QUOTE: 'quote',
  PART: 'part',
  ITEM: 'item',
  JOB: 'job',
  PARCEL: 'parcel',
  CUSTOMER: 'customer'
} as const;

export const TICKET_TABS = {
  STATUS: 'status',
  PRODUCTION_TIME: 'productionTime',
  VAT_RATES: 'vatRates'
} as const;

export const QUOTE_TABS = {
  STATUS: 'status',
  DELIVERY_OPTIONS: 'deliveryOptions',
  VALID_UNTIL: 'validUntil'
} as const;

export const PART_TABS = {
  STATUS: 'status',
  PLAN: 'plan',
  PAYMENT: 'payment',
  HISTORY: 'history',
} as const;

export const CUSTOMER_TABS = {
  STATUS: 'status',
  INDUSTRIES: 'industries'
} as const;

export const ITEM_TABS = {
  STATUS: 'status'
} as const;

export const PARCEL_TABS = {
  STATUS: 'status'
} as const;

export const JOB_TABS = {
  STATUS: 'status'
} as const;

// Tab data constants
export const TAB_DATA = {
  ticket: {
    status: {
      title: "Ticket Status",
      data: [
        { id: 1, label: "Open", value: "Open", color: "8b7355" },
        { id: 2, label: "Closed", value: "Closed", color: "9ca3af" },
        { id: 3, label: "Delivered", value: "Delivered", color: "3b82f6" }
      ]
    },
    productionTime: {
      title: "Production Time",
      data: [
        { id: 1,name: "2 weeks", days: 10 },
        { id: 2,name: "3 days", days: 3 },
        { id: 3,name: "1 week", days: 7 },
      ]
    },
    vatRates: {
      title: "Vat Rates",
      data: [
        { id: 1, value: 20 },
        { id: 2, value: 10 },
      ]
    },
  },
  quote: {
    status: {
      title: "Quote Status",
      data: [
        { id: 1, value: "Draft", color: "8b7355" },
        { id: 2, value: "Sent", color: "3b82f6" },
        { id: 3, value: "Accepted", color: "10b981" },
        { id: 4, value: "Rejected", color: "9ca3af" }
      ]
    },
    deliveryOptions: {
      title: "Delivery Options",
      data: [
        { id: 1, name: "DHL", },
        { id: 2, name: "FedEx" },
        { id: 3, name: "UPS" },
        { id: 4, name: "USPS" },
        { id: 5, name: "Other" },
      ]
    },
    validUntil: {
      title: "Valid Until",
      data: [
        { id: 1, name: "2 weeks", days: 10 },
        { id: 2, name: "3 days", days: 3 },
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
    },
    status: {
      title: "Part Status",
      data: [
        { id: 1, value: "Available", color: "10b981" },
        { id: 2, value: "Out of Stock", color: "9ca3af" },
        { id: 3, value: "Discontinued", color: "8b7355" }
      ]
    }
  },
  customer: {
    status: {
      title: "Customer Status",
      data: [
        { id: 1, value: "Active", color: "10b981" },
        { id: 2, value: "Inactive", color: "9ca3af" },
        { id: 3, value: "Pending", color: "8b7355" }
      ]
    },
    industries: {
      title: "Industries",
      data: [
        { id: 1, name: "Automotive" },
        { id: 2, name: "Electronics" },
        { id: 3, name: "Healthcare" },
        { id: 4, name: "Education" },
        { id: 5, name: "Finance" },
        { id: 6, name: "Retail" },
        { id: 7, name: "Manufacturing" },
        { id: 8, name: "Energy" },
        { id: 9, name: "Technology" },
        { id: 10, name: "Other" },
      ]
    }
  },
  item: {
    status: {
      title: "Item Status",
      data: [
        { id: 1, value: "In Production", color: "3b82f6" },
        { id: 2, value: "Completed", color: "10b981" },
        { id: 3, value: "On Hold", color: "8b7355" },
        { id: 4, value: "Cancelled", color: "9ca3af" }
      ]
    }
  },
  parcel: {
    status: {
      title: "Parcel Status",
      data: [
        { id: 1, value: "Preparing", color: "8b7355" },
        { id: 2, value: "In Transit", color: "3b82f6" },
        { id: 3, value: "Delivered", color: "10b981" },
        { id: 4, value: "Returned", color: "9ca3af" }
      ]
    }
  },
  job: {
    status: {
      title: "Job Status",
      data: [
        { id: 1, value: "Queued", color: "9ca3af" },
        { id: 2, value: "In Progress", color: "3b82f6" },
        { id: 3, value: "Completed", color: "10b981" },
        { id: 4, value: "Failed", color: "8b7355" }
      ]
    }
  }
};
