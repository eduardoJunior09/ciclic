const inputName = document.getElementById("input-name");
const inputMonthly = document.getElementById("input-monthly");
const inputTime = document.getElementById("input-time");
const msgName = document.getElementById("msg-name");
const msgMonthly = document.getElementById("msg-monthly");

const nameText = document.getElementById("name");
const investmentText = document.getElementById("investment");
const priceText = document.getElementById("price");
const timeText = document.getElementById("time");
const container = document.getElementById("container");
const containerSimulation = document.getElementById("container-simulation");

document
  .getElementById("button-simulation")
  .addEventListener("click", function () {
    const name = inputName.value;
    const monthly = parseFloat(inputMonthly.value);
    const time = inputTime.value;

    //reset das mensagens de erros
    msgName.style.display = "none";
    msgMonthly.style.display = "none";

    //verifica se os campos estão preenchidos corretamente
    if (name.length < 3) {
      msgName.style.display = "flex";
      inputName.focus();
      return;
    }

    if (isNaN(monthly) || monthly <= 0) {
      msgMonthly.style.display = " flex";
      return;
    }

    const interestRate = 0.00517;
    const expression = `${monthly} * (((1 + ${interestRate}) ^${time} - 1) / ${interestRate})`;

    const url = `http://api.mathjs.org/v4/`;

    //realiza um POST na API 
    fetch(url, {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expr: expression }),
    })
      .then((response) => response.json())
      .then((data) => {
        const amount = parseFloat(data.result).toFixed(2);

        //insere as novas informações no texto 
        nameText.innerHTML = name;
        investmentText.innerHTML = `R$: ${monthly}`;
        priceText.innerHTML = `R$: ${amount}`;
        timeText.innerHTML = time / 12;

        //realiza a troca de container para exibição 
        container.style.display = "none";
        containerSimulation.style.display = "flex";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });


  //reiniciar para os valores padrões 
document
  .getElementById("button-new-simulation")
  .addEventListener("click", function () {
    container.style.display = "block";
    containerSimulation.style.display = "none";

    inputName.value = " ";
    inputMonthly.value = " ";
    inputTime.value = "1";
  });
