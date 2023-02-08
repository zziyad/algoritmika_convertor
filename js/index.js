const symbol = {
  'USD': 'United State Dollar',
  'RUB': 'Russian Rubl',
  'EUR': 'Euro',
  'GBP': 'Greate British Puand',
};
const URL = `https://api.exchangerate.host/latest?base=`;
const div = document.querySelector('.curency__switcher');
const div2 = document.querySelector('.curency__switcher2');
const fromInput = document.querySelector('.currency_from input');
const fromInputOutput = document.querySelector('.currency_from div');
const toInput = document.querySelector('.currency_to input');
const toInputOutput = document.querySelector('.currency_to div');
let v1 = 'RUB';
let v2 = 'EUR';
let rate = 0;


fromInput.addEventListener('input', (e) => {
  let v = 1;
  if (e.target.value.trim() !== '') {
    v = parseFloat(e.target.value.trim());
  }
  toInput.value = Math.trunc(rate * v * 100) / 100;
});


toInput.addEventListener('input', (e) => {
  let v = 1;
  if (e.target.value.trim() !== '') {
    v = parseFloat(e.target.value.trim());
  }
  fromInput.value = Math.trunc((1 / rate) * v * 100) / 100;
});

for (const elem of div.children) {
  elem.addEventListener('click', () => {
    [...div.children].forEach(el => el.classList.remove('active'))
    elem.classList.toggle("active");
    v1 = elem.textContent
    getExchange(v1, v2)
  })
}
for (const elem of div2.children) {
  elem.addEventListener('click', () => {
    [...div2.children].forEach(el => el.classList.remove('active'))
    elem.classList.toggle("active");
    v2 = elem.textContent
    getExchange(v1, v2)
  })
}
async function getExchange(v1 = 'RUB', v2 = 'EUR') {


  const rate2 = await fetch(URL + `${v2}&symbols=${v1}`).then((r) => r.json()).then((res) => {
    return  res.rates[v1];
  })

  fetch(URL + `${v1}&symbols=${v2}`)
    .then((data) => data.json()).then((result) => {
      rate = result.rates[v2];
      let v = fromInput.value.trim();
      if (v !== '') v = parseFloat(v);
      else v = 1;
      fromInputOutput.innerHTML = `1 ${v1} = ${rate} ${v2}`
      toInputOutput.innerHTML = `1 ${v2} = ${ rate2} ${v1}`
      toInput.value = rate * v;
    });

};

getExchange();