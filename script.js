
let borrowRange = document.getElementById("borrowRange"); //получение размера кредита выбранного бегунком.
let borrowOutput = document.getElementById("borrowOutput");//получение элемента где отображаем размер кредита.
let paymentRange = document.getElementById("paymentRange"); //получение элемента колличества лет выбранного бегунком.
let paymentOutput = document.getElementById("paymentOutput");//получение элемента где отображаем колличество лет.
let mounthPaymentPayment = document.getElementById("mounth-payment__payment");//получение элемента ежемесячного платежа с процентами.
let transferRadio = document.getElementById("radio-1")//получение элемента кнопки с вариантом погашения переводом.
let cashRadio = document.getElementById("radio-2")//получение элемента кнопки с вариантом погашения наличкой.
let rate = document.getElementById("rate")//получение элемента годовой ставки.
let borrowingText = document.getElementById("borrowing__text")//получение элемента суммы кредита в итоговой правой части.
let toRepayText = document.getElementById("to-repay__text")//получение элемента с итоговой суммы выплаты по кредиту с процентами.

borrowRange.addEventListener("input", () => {
	var borrowRangeVal = borrowRange.value //получаем ЧИСЛО суммы кредита на котором стоит бегунок.
	borrowOutput.textContent= `${Math.floor(borrowRangeVal/1000)},${(borrowRangeVal%1000 ==0) ?'000': borrowRangeVal%1000}.00`;//отображаем сумму (В ВИДЕ СТРОКИ) кредита выбранную бегунком.
	//console.log(rangeVal)
	borrowingText.textContent = borrowOutput.textContent//вставка суммы кредита в итоговой правой части.
//console.log(borrowRange.value)
	monthlyPayment()
})


paymentRange.addEventListener("input", () => {
	var pyamentRangeVal = paymentRange.value //получаем ЧИСЛО колличества лет на котором стоит бегунок.
	paymentOutput.textContent= `${pyamentRangeVal}`;//отображаем колличество лет (В ВИДЕ СТРОКИ) выбранного бегунком.
	monthlyPayment()
})

transferRadio.addEventListener("click", () => {//при клике меняем годовую ставку при погашении переводом.
	//console.log(rate.textContent)
	if (rate.textContent == '4,95' || rate.textContent == '4,45') {
		rate.textContent = '4,95'
  } else if (rate.textContent == '6,8' || rate.textContent == '6,3') {
  	rate.textContent = '6,8'
  }
	monthlyPayment()
})

cashRadio.addEventListener("click", () => {//при клике меняем годовую ставку при погашении наличкой.
	//console.log(rate.textContent)
  if (rate.textContent == '4,95') {
		rate.textContent = '4,45'
  } else if (rate.textContent == '6,8') {
  	rate.textContent = '6,3'
  }
	monthlyPayment()
})

function monthlyPayment() {//расчет месячного платежа по кредиту с учетом процентов.
	let borrowOutputNumber = Number(borrowOutput.textContent.replace(",",""))//получаем сумму кредита в виде number.
	let rateNumber = Number(rate.textContent.replace(",","."))//получаем годовую ставку в виде number.
	let paymentOutputNumber = Number(paymentOutput.textContent)//получаем колличество лет в виде number.
	let r = rateNumber/100/12;//рачет месячной % ставки.
	let result = (borrowOutputNumber*((r*((1+r)**(paymentOutputNumber*12)))/(((1+r)**(paymentOutputNumber*12))-1))).toFixed(2)//расчет ежемесячного платежа с %.
	//console.log('thousands', thousands, typeof thousands)
	//console.log('borrowOutputNumber', borrowOutputNumber, typeof borrowOutputNumber)
	//console.log('rateNumber',rateNumber)
	//console.log('r', r, typeof r)
	//console.log('paymentOutputNumber', paymentOutputNumber)
	//console.log('result', result, typeof result)
	
	//добавляем в разметку ежемесячрого платежа по кредиту
	mounthPaymentPayment.textContent = addNumber(result)

	//console.log(hundreds-Math.floor(hundreds))
	
	let resultRepay = (result*(paymentOutputNumber*12)).toFixed(2)//расчет итоговой суммы выплаты по кредиту с процентами.
	//добавление этой суммы в разметку.
	toRepayText.textContent =  addNumber(resultRepay)
	//console.log(resultRepay.substr((resultRepay.lastIndexOf(".")+1),3))
}

function addNumber(num) {
	let thousands = (num/1000 >=1) ? Math.floor(num/1000)+ ',' : ''
	let hundreds = (num>= 100) ? num.substr((num.lastIndexOf(",")-5),3) : num.substr((num.lastIndexOf(",")-4),2)
	let decimal = num.substr((num.lastIndexOf(".")+1),2)
	return `${thousands}${hundreds}.${decimal}`
}

let inputDate = document.querySelector(".input-date")
let nowDate = new Date()

//console.log(inputDate.value)
inputDate.addEventListener('change', ()=> {
	//console.log(inputDate.value)
	dateCredit(inputDate.value)
	monthlyPayment()
})


function dateCredit(date) {
	let nowDate = new Date().getTime()
	let dateInMilliseconds = Date.parse(date)
	let millisecondsInTheeMonth = 86400000 * 90
	
	if (dateInMilliseconds - nowDate > millisecondsInTheeMonth) {
		rate.textContent = '6,8'
		//console.log(rate.textContent)
	} else {
		rate.textContent = '4,95'
		//console.log(rate.textContent)
	}
}