let balance=27500;
let tx=[
 {amount:2500,desc:'Welcome bonus'},
 {amount:5000,desc:'Referral bonus'},
 {amount:-20000,desc:'Hotel redemption'}
];
const deals=[
 {brand:'Marriott',name:'Miami Beach',old:219,price:99,tpx:10000},
 {brand:'Hilton',name:'Chicago Downtown',old:249,price:119,tpx:15000},
 {brand:'Choice',name:'Dallas Downtown',old:149,price:69,tpx:7500}
];
const packages=[
 {cash:5,tpx:5000,bonus:''},{cash:10,tpx:11000,bonus:'10% BONUS'},
 {cash:25,tpx:30000,bonus:'20% BONUS'},{cash:50,tpx:65000,bonus:'30% BONUS'},
 {cash:100,tpx:140000,bonus:'40% BONUS'}
];
function money(n){return '$'+n.toFixed(0)}
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo(0,0)}
function render(){
 document.getElementById('topBalance').textContent=balance.toLocaleString();
 document.getElementById('walletBalance').textContent=balance.toLocaleString();
 document.getElementById('dealCards').innerHTML=deals.map((d,i)=>`<article class="card"><span class="pill">🔥 LIQUIDATION</span><h3>${d.brand}</h3><p>${d.name}</p><span class="old">${money(d.old)}/night</span><div class="price">${money(d.price)} + ${d.tpx.toLocaleString()} TPX</div><button onclick="book(${i})">View Deal</button></article>`).join('');
 document.getElementById('packages').innerHTML=packages.map(p=>`<article class="package"><span>${p.bonus||'Standard'}</span><strong>${p.tpx.toLocaleString()} TPX</strong><p>$${p.cash}</p><button onclick="buy(${p.tpx})">Demo Buy</button></article>`).join('');
 document.getElementById('transactions').innerHTML=tx.map(t=>`<div class="panel" style="margin:8px 0"><b>${t.amount>0?'+':''}${t.amount.toLocaleString()} TPX</b><span style="float:right">${t.desc}</span></div>`).join('');
}
function reward(amount,desc){balance+=amount;tx.unshift({amount,desc});render();alert(`Added ${amount.toLocaleString()} TPX`);show('wallet')}
function buy(amount){balance+=amount;tx.unshift({amount,desc:'Demo TPX purchase'});render();alert(`Demo purchase: ${amount.toLocaleString()} TPX added.`);show('wallet')}
function book(i){const d=deals[i];if(balance<d.tpx){alert('Not enough TPX. Buy or earn more points first.');show('buy');return}balance-=d.tpx;tx.unshift({amount:-d.tpx,desc:`${d.brand} ${d.name} redemption`});tx.unshift({amount:Math.round(d.tpx*.05),desc:'Booking reward'});balance+=Math.round(d.tpx*.05);render();document.getElementById('confirmationText').innerHTML=`<b>${d.brand} — ${d.name}</b><br><br>Demo reservation confirmed.<br>Paid ${d.tpx.toLocaleString()} TPX + ${money(d.price)}.<br>Earned ${Math.round(d.tpx*.05).toLocaleString()} TPX.`;show('confirmation')}
function searchHotels(){const city=document.getElementById('destination').value||'Miami';document.getElementById('hotelResults').innerHTML=deals.map((d,i)=>`<article class="card"><span class="pill">🔥 SPECIAL</span><h3>${d.brand} — ${city}</h3><p>Demo hotel inventory</p><div class="price">${money(d.price)} + ${d.tpx.toLocaleString()} TPX</div><button onclick="book(${i})">Book Demo</button></article>`).join('')}
render();
