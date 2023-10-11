// result label
const resultDayLabel =document.querySelector('.result_days');
const resultMonthLabel =document.querySelector('.result_months');
const resultYearLabel =document.querySelector('.result_years');
// inputs
const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const btn =document.querySelector('.btn')
let error=false;

btn.addEventListener('click',function(){
    calculateAge(day,month,year)
})
// only numbers can enter
const getStringWithNumbersOnly = (str) => [...str].filter((v) => Number.isInteger(+v) && v !== ' ').join('');
  
function cleareFields(){
    resultYearLabel.innerHTML= '- -' 
    resultMonthLabel.innerHTML= '- -'
    resultDayLabel.innerHTML= '- -'
    dayEle.disabled=false
    monthEle.disabled=false
    yearEle.disabled=false
    dayEle.value=''
    monthEle.value=''
    yearEle.value=''
}
function calculateAge(day,month,year){
    const date=new Date();
    let currentDay= date.getDate();
    let currentMonth=date.getMonth()+1;
    let currentYear= date.getFullYear();
    let daysInEnteredMonth = new Date(+year.value, +month.value, 0).getDate()
    let daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
    if(!day.value){
        emptyErrorMessage(day)
    }
    if(!month.value){
        emptyErrorMessage(month)
    }
    if(!year.value){
        emptyErrorMessage(year)
    }
    dayEle=day
    monthEle=month
    yearEle=year
    day=+day.value;
    month=+month.value;
    year=+year.value;
    let isValidDay=isValidMonth=isValidYear=true
    if (!dayEle.value || !monthEle.value || !yearEle.value) {
        return;
    }
    // year
    if(currentYear < year  ){
        yearEle.parentElement.classList.add('show')
        yearEle.parentElement.querySelector('span').innerHTML='Must be in the past'
        isValidYear=false
    }else if(year < 1925){
        yearEle.parentElement.classList.add('show')
        yearEle.parentElement.querySelector('span').innerHTML='Year must be after 1925'
        isValidYear=false
    }
    else{
        yearEle.parentElement.classList.remove('show')
        if(month > currentMonth){
            currentYear=currentYear - 1;
        }
        isValidYear=true
    }
    
    //Month
    if(month <= 0 || month > 12 ){
        monthEle.parentElement.classList.add('show')
        monthEle.parentElement.querySelector('span').innerHTML='Must be a valid month'
        isValidMonth=false
    }else{
        monthEle.parentElement.classList.remove('show')
        isValidMonth=true
    }

    if(day > currentDay){
        currentMonth =currentMonth - 1 
    }
    if(month > currentMonth){
        currentMonth=currentMonth + 12
    }
    //days
    if(day <= 0 || day > daysInEnteredMonth){
        dayEle.parentElement.classList.add('show')
        dayEle.parentElement.querySelector('span').innerHTML='Must be a valid day'
        isValidDay=false
    }else{
        dayEle.parentElement.classList.remove('show')
        isValidDay=true
    }
    if(day > currentDay){
        currentDay=currentDay + daysInMonth -1
    }
    if(isValidDay && isValidMonth && isValidYear){
        currentYear = currentYear - year
        resultYearLabel.innerHTML= currentYear
        currentMonth= currentMonth - month
        resultMonthLabel.innerHTML= currentMonth
        day=currentDay - day
        resultDayLabel.innerHTML= day
        dayEle.disabled=true
        monthEle.disabled=true
        yearEle.disabled=true
      setTimeout(()=>{
       cleareFields()
    },5000)
    }

}

day.addEventListener('input',function(e){
   day.value= getStringWithNumbersOnly(e.target.value)
    !day.value && emptyErrorMessage(day)
})
month.addEventListener('input',function(){
    month.value= getStringWithNumbersOnly(e.target.value)
    !month.value && emptyErrorMessage(day)
})
year.addEventListener('input',function(){
    year.value= getStringWithNumbersOnly(e.target.value)
    !year.value && emptyErrorMessage(year)
})

function emptyErrorMessage(element){
    
    if(element.value===''){
        element.parentElement.classList.add('show')
        element.parentElement.querySelector('span').innerHTML='This field is required'
    }
    else{
        element.parentElement.classList.remove('show')  
    }
}
