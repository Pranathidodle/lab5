const form = document.getElementById("tipForm");

form.addEventListener("input", calculate);

function calculate() {
  console.log("RUNNING");

  let bill = parseFloat(document.getElementById("billTotal").value);
  let tipPercent = parseFloat(document.getElementById("tipSlider").value);
  let isExempt = document.getElementById("taxExempt").checked;
  let currency = document.getElementById("currency").value;
  let errorMsg = document.getElementById("errorMsg");

  // 🔴 VALIDATION
  if (isNaN(bill) || bill < 0) {
    errorMsg.innerText = "Please enter a valid positive number";

    document.getElementById("tipAmount").value = "";
    document.getElementById("totalFinal").value = "";
    document.getElementById("totalTax").value = "";

    return;
  } else {
    errorMsg.innerText = "";
  }

  // 🔁 RESET when bill = 0
  if (bill === 0) {
    document.getElementById("tipAmount").value = "";
    document.getElementById("totalFinal").value = "";
    document.getElementById("totalTax").value = "";
    return;
  }

  // 🧮 CALCULATIONS
  let tipAmount = (bill * tipPercent) / 100;

  let tax = isExempt ? 0 : bill * 0.11;
  let totalWithTax = bill + tax;

  let finalTotal = totalWithTax + tipAmount;

  // 🌍 CURRENCY CONVERSION (ONLY allowed values)
  if (currency === "eur") {
    tipAmount *= 0.95;
    finalTotal *= 0.95;
    totalWithTax *= 0.95;
  } else if (currency === "inr") {
    tipAmount *= 85;
    finalTotal *= 85;
    totalWithTax *= 85;
  }

  // 🟢 OUTPUT (2 decimal places)
  document.getElementById("tipAmount").value = tipAmount.toFixed(2);
  document.getElementById("totalFinal").value = finalTotal.toFixed(2);
  document.getElementById("totalTax").value = totalWithTax.toFixed(2);

  // 🟢 SHOW TIP %
  document.getElementById("tipPercent").value = tipPercent;
}