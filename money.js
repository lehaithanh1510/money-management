var appControler = {
 init : function (){
     document.querySelector('.add__btn').addEventListener('click',addItem)
     document.querySelector('.container').addEventListener('click',removeItem)
     document.addEventListener('keypress',function(event){
            if(event.keyCode === 13 || event.which === 13){
                addItem()
            }
        })
     function addItem (){ 
        var datafromUI = uiControler.getInput()
        budgetControler.addItem(datafromUI)
        uiControler.displayUI(datafromUI)
        uiControler.updateUI()
        uiControler.updatePercentageOfExpense()

    }
     function removeItem(event){
       var selectorid = event.target.parentNode.parentNode.parentNode.parentNode.id
       console.log(selectorid)
       budgetControler.removeItem(selectorid)
       uiControler.deleteListItem(selectorid)
       uiControler.updateUI() 
       uiControler.updatePercentageOfExpense() 
     }
     
  } 
}
appControler.init()

var budgetControler = {
    total : 0, 
    income : 0, 
    expenses : 0,
    incomeList : [],
    expensesList : [],
    percentageList : [],
    addItem : function (data) { 
        if (data.type === 'inc') {
             if (this.incomeList.length == 0) {
                 data.id = 1
             } 
             else {
                 data.id=parseInt(this.incomeList[this.incomeList.length-1].id) + 1 
             }
             this.incomeList.push(data)
             this.income = this.income + parseInt(data.money)
//            console.log (this.incomeList)
        }
        if (data.type === 'exp') {
            if (this.expensesList.length == 0) {
                 data.id = 1
            } 
            else {
                data.id=parseInt(this.expensesList[this.expensesList.length-1].id) + 1 
            }
            this.expensesList.push(data)
            this.expenses = this.expenses + parseInt(data.money)
            data.percentage = Math.ceil(data.money/this.expenses*100)
        }
        console.log (this.expensesList)
    }, 

    removeItem : function (element) {
      var data = {
          type :element.split('-')[0],
          number :parseInt(element.split('-')[1]),
      }
      console.log(data)
      if (data.type =='income') {
        let order = this.incomeList.findIndex(find =>find.id == data.number)
        console.log(order)
        this.income-=this.incomeList[order].money
        this.incomeList.splice(order,1)
        }
        else {
        let order = this.expensesList.findIndex(find =>find.id == data.number)
        console.log(order)
        console.log(this.expensesList)    
        this.expenses-=this.expensesList[order].money
        this.expensesList.splice(order,1)
        }
 
      }, 
          
    caculateTotal : function (){
        return this.income - this.expenses  
    }, //Tinh ket qua  
    caculatePercent : function (income,expences){
      return expences/income * 100      
    }, // tinh phan tram tong expense so voi tong income 

}
var uiControler ={
    getDomString : function (){
      var domString = {
            selectedClassName :'.add__type',
            descClassName :'.add__description',
            valueClassName :'.add__value',
            incomeList :'.income__list',
            expensesList :'.expenses__list',
            incomeValue :'.budget__income--value',
            expensesValue :'.budget__expenses--value',
            bugdetValue :'.budget__value',
            percentValue:'.budget__expenses--percentage',
        } 
      return domString   
    },
    getInput : function (){ 
        var data = {          
            type:document.querySelector(this.getDomString().selectedClassName).value,  
            desc:document.querySelector(this.getDomString().descClassName).value,
            money:document.querySelector(this.getDomString().valueClassName).value,
        }
        
        //console.log (data)
      return data    
    },
    deleteListItem : function (selectorID) {
        var parentList = document.getElementById(selectorID)
        console.log(parentList)
        parentList.parentNode.removeChild(parentList)
    },
    displayUI :function(data){
        var html, newHTML, id 
        if (data.type === 'inc') {
            if (budgetControler.incomeList.length > 0)
                id = budgetControler.incomeList.length
            else id = 0
            html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        else  {
            if(budgetControler.expensesList.length > 0){
                id = budgetControler.expensesList.length
            }
            else{
                id = 0
            }
            html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percent%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'  
            html = html.replace('%percent%',Math.ceil(budgetControler.caculatePercent(budgetControler.income,data.money)))
            }
        newHTML = html.replace('%id%',id)
        newHTML = newHTML.replace('%description%',data.desc)
        newHTML = newHTML.replace('%value%',data.money)
        if (data.type === 'inc') {
          document.querySelector(this.getDomString().incomeList).insertAdjacentHTML('beforeend',newHTML)
        }
        else {
         document.querySelector(this.getDomString().expensesList).insertAdjacentHTML('beforeend',newHTML)
        }
       
    },
    updateUI : function() {
        document.querySelector(this.getDomString().incomeValue).textContent = '+' + budgetControler.income
        document.querySelector(this.getDomString().expensesValue).textContent = '-' + budgetControler.expenses
         document.querySelector(this.getDomString().percentValue).textContent = Math.ceil(budgetControler.caculatePercent(budgetControler.income,budgetControler.expenses)) + '%'
         
       if (budgetControler.caculateTotal() > 0 ){
          document.querySelector(this.getDomString().bugdetValue).textContent = '+' + budgetControler.caculateTotal()
       }
        else {
        document.querySelector(this.getDomString().bugdetValue).textContent = budgetControler.caculateTotal()

        }
    },
    updatePercentageOfExpense : function (){
       var test = document.querySelectorAll('.item__percentage')
       for (var i=0;i<budgetControler.expensesList.length;i++){
           budgetControler.expensesList[i].percentage = Math.ceil(parseInt(budgetControler.expensesList[i].money)/budgetControler.expenses*100)
           test[i].textContent=budgetControler.expensesList[i].percentage+'%'
        }
       document.querySelector(this.getDomString().percentValue).textContent = Math.ceil(budgetControler.caculatePercent(budgetControler.income,budgetControler.expenses)) + '%'
               
        
    },
    
}