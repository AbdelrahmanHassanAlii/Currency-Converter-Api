document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.getElementById("convertBtn");
  const egpAmountInput = document.getElementById("egpAmount");
  const resultDiv = document.getElementById("result");

  convertButton.addEventListener("click", function () {
    const egpAmount = parseFloat(egpAmountInput.value);

    if (isNaN(egpAmount)) {
      resultDiv.innerHTML = "Please enter a valid number.";
      return;
    }

    // Fetch the latest exchange rates from the CurrencyFreaks API
    fetch(
      "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=c7ca51685b2d47219b98af4e67b7a6d1"
    )
      .then((response) => response.json())
      .then((data) => {
        const exchangeRate = data.rates.EGP; // USD exchange rate from the API response
        const usdAmount = egpAmount * ( 1 /exchangeRate) ;
        resultDiv.innerHTML = `${egpAmount} EGP is equal to ${usdAmount.toFixed(
          2
        )} USD`;
      })
      .catch((error) => {
        console.error("Error fetching exchange rates:", error);
        resultDiv.innerHTML = "Failed to fetch exchange rates.";
      });
  });
});
