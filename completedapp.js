
var AppController = {
    init: function (){
    document.querySelector('.add__btn').addEventListener('click',addItem)
    document.addEventListener('keypress',function(event){
            if(event.keyCode === 13 || event.which === 13){
                addItem()
            }
        })
    function addItem(){
        var datafromUI = UIController.getInput()
        BudgetController.addItem(datafromUI)
        UIController.displayUI(datafromUI)
    }
    document.querySelector('.item__delete').addEventListener('click',deleteItem) 
    function deleteItem() {
        console.log ('Do Thi Anh Phuong')

    }    
    },    
}
AppController.init()
var UIController = {
    getDomString : function(key){
        var domString = {
            selectClassName:'.add__type',
            descClassName:'.add__description',
            valueClassName:'.add__value',
            expenses__list:'.expenses__list',
            income__list:'.income__list'
        }
        return domString
    },
    getInput: function(){
        var data = {
            type:document.querySelector(this.getDomString().selectClassName).value,
            desc:document.querySelector(this.getDomString().descClassName).value,
            money:document.querySelector(this.getDomString().valueClassName).value
        }
        return data
    },
    displayUI:function(data){
        //console.log(data)
        var html, newHTML, id;
        if(data.type === 'inc'){
            if(BudgetController.incomeList.length > 0){
                id = BudgetController.incomeList.length
            }
            else
            {
                id = 0
            }
            html ='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        else
        {
            if(BudgetController.incomeList.length > 0){
                id = BudgetController.incomeList.length
            }else{
                id = 0
            }
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">%percent%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
        }
        newHTML  = html.replace('%value%',data.money)
        newHTML = newHTML.replace('%description%',data.desc)
        newHTML = newHTML.replace('%id%',id)
            //console.log(newHTML)
        if(data.type==='inc'){
            document.querySelector(this.getDomString().income__list).insertAdjacentHTML('beforeend',newHTML)
        }else{
             document.querySelector(this.getDomString().expenses__list).insertAdjacentHTML('beforeend',newHTML)
        }
//        newHTML = newHTML.replace('%percent%',)
    }
}
var BudgetController = {
    total:0,
    income:0,
    expenses:0,
    incomeList:[],
    expensesList:[],
    addItem:function (data){
        if(data.type === 'inc'){
            this.incomeList.push(data)
            console.log('incomeList '+ this.incomeList)
        }else{
            this.expensesList.push(data)
            console.log(this.expensesList)
        }
    },
    calculateTotal:function(){
        return this.income - this.expenses
    }, 
}





