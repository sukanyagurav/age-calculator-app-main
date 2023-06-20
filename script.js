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

function calculateAge(day,month,year){
    const date=new Date();
    let currentDay= date.getDate();
    let currentMonth=date.getMonth()+1;
    let currentYear= date.getFullYear();
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
    day=day.value;
    month=month.value;
    year=year.value;
    if (!dayEle.value || !monthEle.value || !yearEle.value) {
        return;
    }
    // year
    if(currentYear < year ){
        yearEle.parentElement.classList.add('show')
        yearEle.parentElement.querySelector('span').innerHTML='Must be in the past'
    }else{
        yearEle.parentElement.classList.remove('show')
        if(month > currentMonth){
            currentYear=currentYear - 1;
        }
        currentYear = currentYear - year
        resultYearLabel.innerHTML= currentYear 
    }
    
    //Month
    if(month <= 0 || month > 12 ){
        monthEle.parentElement.classList.add('show')
        monthEle.parentElement.querySelector('span').innerHTML='Must be a valid month'
    }else{
        monthEle.parentElement.classList.remove('show')
    }
    if(day > currentDay){
        currentMonth =currentMonth -1 
    }
    if(month > currentMonth){
        currentMonth=currentMonth + 12
    }
    currentMonth= currentMonth - month
    resultMonthLabel.innerHTML= currentMonth
    
    //days
    if(day <= 0 || day > daysInMonth){
        dayEle.parentElement.classList.add('show')
        dayEle.parentElement.querySelector('span').innerHTML='Must be a valid month'
    }else{
        dayEle.parentElement.classList.remove('show')
    }
    if(day > currentDay){
        currentDay=currentDay + daysInMonth 
    }
    day=currentDay - day
    resultDayLabel.innerHTML= day
    setTimeout(()=>{
        resultYearLabel.innerHTML= '- -' 
        resultMonthLabel.innerHTML= '- -'
        resultDayLabel.innerHTML= '- -'
        dayEle.value=''
        monthEle.value=''
        yearEle.value=''
    },9000)
}

day.addEventListener('input',function(){
    emptyErrorMessage(day)
})
month.addEventListener('input',function(){
    emptyErrorMessage(month)
})
year.addEventListener('input',function(){
    emptyErrorMessage(year)
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
