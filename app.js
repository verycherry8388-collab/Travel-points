const SUPABASE_URL = "PASTE_YOUR_PROJECT_URL_HERE";
const SUPABASE_KEY = "sb_publishable_4w_cV32pca3U4l5vfjHQ8A_mH0GFc-k"

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
console.log("CherryPoints101 Supabase connected:", !!supabase);
* TravelPoints - TPX Wallet Engine */

const STARTING_BALANCE = 27500;

let balance = Number(localStorage.getItem("travelpoints_balance"));

if (!Number.isFinite(balance)) {
  balance = STARTING_BALANCE;
  localStorage.setItem("travelpoints_balance", balance);
}

let tx = JSON.parse(localStorage.getItem("travelpoints_transactions") || "null");

if (!Array.isArray(tx)) {
  tx = [
    {
      amount: 2500,
      desc: "Welcome bonus",
      date: new Date().toLocaleDateString()
    }
  ];

  localStorage.setItem("travelpoints_transactions", JSON.stringify(tx));
}

const deals = [
  {
    brand: "Marriott",
    name: "Miami Beach",
    city: "Miami Beach",
    old: 219,
    price: 99,
    tpx: 10000,
    desc: "Demo hotel inventory"
  },
  {
    brand: "Hilton",
    name: "Chicago Downtown",
    city: "Chicago",
    old: 249,
    price: 119,
    tpx: 15000,
    desc: "Demo hotel inventory"
  },
  {
    brand: "Choice",
    name: "Dallas Downtown",
    city: "Dallas",
    old: 149,
    price: 69,
    tpx: 7500,
    desc: "Demo hotel inventory"
  }
];

const packages = [
  { cash: 5, tpx: 5000, bonus: "0% BONUS" },
  { cash: 10, tpx: 11000, bonus: "10% BONUS" },
  { cash: 25, tpx: 30000, bonus: "20% BONUS" },
  { cash: 50, tpx: 65000, bonus: "30% BONUS" },
  { cash: 100, tpx: 140000, bonus: "40% BONUS" }
];

function money(value) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

function saveData() {
  localStorage.setItem("travelpoints_balance", balance);
  localStorage.setItem("travelpoints_transactions", JSON.stringify(tx));
}

function render() {
  const top = document.getElementById("topBalance");
  const wallet = document.getElementById("walletBalance");

  if (top) {
    top.textContent = balance.toLocaleString();
  }

  if (wallet) {
    wallet.textContent = balance.toLocaleString();
  }

  renderTransactions();
  renderDeals();
  renderPackages();
}

function renderTransactions() {
  const box = document.getElementById("transactions");

  if (!box) return;

  if (!tx.length) {
    box.innerHTML = "<p>No transactions yet.</p>";
    return;
  }

  box.innerHTML = tx
    .map(
      item => `
        <article class="panel">
          <strong>${item.amount > 0 ? "+" : ""}${item.amount.toLocaleString()} TPX</strong>
          <p>${item.desc}</p>
          <small>${item.date || ""}</small>
        </article>
      `
    )
    .join("");
}

function renderDeals() {
  const box = document.getElementById("dealCards");

  if (!box) return;

  box.innerHTML = deals
    .map(
      (d, i) => `
        <article class
        
