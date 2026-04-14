const form = document.getElementById("tipForm");

form.addEventListener("input", calculate);

function calculate() {
  let bill = parseFloat(document.getElementById("billTotal").value);
  let tipPercent = parseFloat(document.getElementById("tipSlider").value);
  let isExempt = document.getElementById("taxExempt").checked;
  let currency = document.getElementById("currency").value;

  // Validation
  if (isNaN(bill) || bill < 0) {
    document.getElementById("tipAmount").value = "";
    document.getElementById("totalFinal").value = "";
    document.getElementById("totalTax").value = "";
    return;
  }

  // Show tip %
  document.getElementById("tipPercent").value = tipPercent;

  // Calculations
  let tipAmount = (bill * tipPercent) / 100;

  let tax = isExempt ? 0 : bill * 0.11;
  let totalWithTax = bill + tax;

  let finalTotal = totalWithTax + tipAmount;

  // Currency conversion (ONLY allowed values)
  if (currency === "eur") {
    tipAmount *= 0.95;
    finalTotal *= 0.95;
    totalWithTax *= 0.95;
  } 
  else if (currency === "inr") {
    tipAmount *= 85;
    finalTotal *= 85;
    totalWithTax *= 85;
  }

  // Output (2 decimal places)
  document.getElementById("tipAmount").value = tipAmount.toFixed(2);
  document.getElementById("totalFinal").value = finalTotal.toFixed(2);
  document.getElementById("totalTax").value = totalWithTax.toFixed(2);
}