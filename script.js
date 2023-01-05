//***********************************************************/
'use strict';
const balance = document.getElementById('balance');

const moneyPlus = document.getElementById('money-plus');

const moneyMinus = document.getElementById('money-minus');

const list = document.getElementById('list');

const form = document.getElementById('form');

const transaction = document.getElementById('transaction');

const amount = document.getElementById('amount');
//global variables...............................................
// const transactions = [
//   {id:1,transaction:'book',amount:-100},
//   { id: 2, transaction: 'coins', amount: 200 },
//   { id: 3, transaction: 'breakfast', amount:-300},
//   { id: 4, transaction: 'mobile', amount: 400 },
//   // { id: 5, transaction: 'Coins', amount: 200 },................
// ];
let transactions = localStorage.getItem('transactions') != null ? JSON.parse(localStorage.getItem('transactions')):[];
//......
//.....initial settup....function
const init =function(){

  list.innerHTML = null;
  transactions.forEach(addTransactionDOM);
  updateValues();
}
const addTransactionDOM = function(transaction)
{
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');
  //adding the class name according to sign........................
  item.classList.add(transaction.amount <0 ? 'minus': 'plus');
  //add the content to li element..................................
item.innerHTML = `${transaction.transaction}<span>${transaction.amount}</span>
<button  class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
list.appendChild(item);
};
const removeTransaction = function(id){

transactions = transactions.filter((transaction) => transaction.id !== id);
//add
localStorage.setItem('transactions', JSON.stringify((transactions)));
  //setting default settpup again
  init();
 
};
const updateValues = function()
{
  console.log(transactions);
  const amounts = transactions.map((transaction)=>transaction.amount);
  // return amounts;
  const income = amounts.filter((item) => item>0)//100,200,300 // value
  .reduce((a,b)=>a+b,0);//(previous value,current value) => 100,200,300, = 600
  console.log(income);
  const expense = amounts.filter((item) => item<0)//100,200,300 // value
  .reduce((a,b)=>a+b,0);
  const total = income + expense;
  moneyPlus.innerText = `₹${income}`;
  moneyMinus.innerText =`₹${expense}`;
  balance.innerText = `₹${total}`;
};
console.log(updateValues());
//  transactions.forEach((transaction) => {
//   //get sign.......................................................
//  const sign = transaction.amount < 0 ? '-' : '+';
//   const item = document.createElement('li');
//   //adding the class name according to sign........................
//   item.classList.add(transaction.amount <0 ? 'minus': 'plus');
//   //add the content to li element..................................
// item.innerHTML = `${transaction.transaction}<span>${transaction.amount}</span>
// <button  class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
// list.appendChild(item);
// }); 
// validation.......................................................
form.addEventListener('submit',(e)=>{
  e.preventDefault();
if(transaction.value.trim() === ''||amount.value.trim()==='')
{
  alert('please add transaction details');
}
else{
  const transactionItem = {
    id:new Date().valueOf(),
    transaction:transaction.value,
    amount:Number(amount.value) //number formate......................
  };
  //push the data
  transactions.push(transactionItem);
  //local storage .....
  //add data to local storage
  localStorage.setItem('transactions', JSON.stringify((transactions)));
  addTransactionDOM(transactionItem);
  updateValues();
  //removing form
  transaction.value =null;
  amount.value = null;
}
});
init();