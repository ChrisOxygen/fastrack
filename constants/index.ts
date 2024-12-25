export const INVESTMENT_PLANS = [
  {
    packageName: "Sapphire",
    minimumInvestment: 100,
    durationDays: 3 / 1440,
    roiPercent: 15,
  },
  {
    packageName: "Emerald",
    minimumInvestment: 400,
    durationDays: 7,
    roiPercent: 49.8,
  },
  {
    packageName: "Diamond",
    minimumInvestment: 20000,
    durationDays: 30,
    roiPercent: 92.6,
  },
];

export const MAIN_NAV_LINKS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Investment Plans",
    href: "/investment-plans",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const TRANSFER_METHODS = [
  {
    id: 1,
    key: "BTC",
    label: "BTC",
    depositAddress: "bc1q2tv7y6ftyc4tcecm7lmn0rq0vlp4eps66qhrzt",
    network: "Not Reqiured",
  },

  {
    id: 3,
    key: "USDT",
    label: "USDT",

    depositAddress: "TRyXWCrXpiTi3a3JDgfoXVFZNKT5XYQrY2",
    network: "TRC20",
  },
];

export const DASHBOARD_MENU_ITEMS = [
  {
    tabTitle: "dashboard",
  },
  {
    tabTitle: "all transactions",
  },
  {
    tabTitle: "deposit",
  },
  {
    tabTitle: "investment",
  },
  {
    tabTitle: "withdraw",
  },
  {
    tabTitle: "referrals",
  },
  {
    tabTitle: "settings",
  },
  {
    tabTitle: "support",
  },
];

export const PACKAGES_DETAILS = [
  {
    name: "Sapphire",
    description:
      "A stable investment package for beginners with moderate returns.",
    minimumAmount: "$100",
    duration: "48hrs",
    roi: "15% Return on Investment",
  },
  {
    name: "Emerald",
    description: "An investment package with balanced risk and reward.",
    minimumAmount: "$400",
    duration: "7 Days",
    roi: "49.8% Return on Investment",
  },
  {
    name: "Diamond",
    description:
      "Our premium package with the highest potential returns for seasoned investors.",
    minimumAmount: "$20,000",
    duration: "30 Days",
    roi: "92.6% Return on Investment",
  },
];

//duration: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
