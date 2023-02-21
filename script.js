const card = {
    numbersWrap: document.querySelector('.card__numbers'),
    numbers: document.querySelectorAll('.card__numbers input'),
    holder: document.querySelector('#holder'),
    month: document.querySelector('#month'),
    year: document.querySelector('#year'),
}



// номер банківської карти
let numberIdx = 0;
card.numbers.forEach((item, idx)=> {
    item.onfocus = (event) => {
        card.numbers[numberIdx].focus()
    }
    item.oninput = (event) => {
        if(item.value !== '') {
            if(/\d/.test(item.value)) {
                item.value = item.value.substr(0, 1)
                numberIdx = numberIdx < 15 ? numberIdx + 1 : numberIdx
                card.numbers[numberIdx].focus()
            } else {
                item.value = ''
            }
            
        }

    }
})

card.numbersWrap.onkeyup = (event) => {
    if(event.key === 'Backspace') {
        if(numberIdx > 0) {
            numberIdx--
            card.numbers[numberIdx].value = ''
            card.numbers[numberIdx].focus()
        }

    }
}

//Перевірка ПІБ власника карти

let holderValue = ''
const reg = /^([a-zA-Z]+)?[ ]?([a-zA-Z]+)?$/
card.holder.oninput = () => {
    const value = card.holder.value.substr(0, 24)
    if (reg.test(value)) {
        card.holder.value = value
        holderValue = value
    } else {
        card.holder.value =  holderValue
    }
}


//Перевірка дати
let minYear = new Date().getFullYear()
let maxYear = minYear + 5
minYear = String(minYear).substr(2,2)
maxYear = String(maxYear).substr(2,2)
let monthIsFilled = false
let monthValue = ''
let yearValue = ''
const regullar = /^\d{0,2}$/
card.month.oninput = () => {
    let value = card.month.value.substr(0, 2)
    if(regullar.test(value)) {
        if(value > 12) {
            value = '12'
        }
        card.month.value = value 
        monthValue = value
        if(value.length === 2) {
            card.year.focus()
        }
    }else{
        card.month.value = monthValue 
    } 
}
card.year.oninput = () => {
    let value = card.year.value.substr(0, 2)
    if(regullar.test(value)) {
        if(value.length === 2 && (value < minYear || value > maxYear)) {
            value = minYear
        }
        card.year.value = value 
        yearValue = value
    }else{
        card.year.value = yearValue 
    } 
}




//оптимізація коду, розібратись де помилка 
// card.month.oninput = () => {
//     handleDate(
//         card.month, 
//         monthValue,
//         value > 12,
//         '12',
//         true
//         )
// }

// card.year.oninput = () => {
//     handleDate(
//         card.year, 
//         yearValue,
//         value.length === 2 && (value < minYear || value > maxYear),
//         minYear,
//         false
//         )
// }

// function handleDate(
//     element, 
//     state,
//     condition,
//     conditionValue,
//     isMonth
// ){
//     let value = element.value.substr(0, 2)
//     if(regullar.test(value)) {
//         if(condition) {
//             value = conditionValue
//         }
//         element.value = value 
//         state = value
//         if(isMonth && value.length === 2) {
//             card.year.focus()
//         }
//     }else{
//         element.value = state 
//     } 
// }

