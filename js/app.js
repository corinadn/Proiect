vector = [];

fetch('json/data.json')
    .then(response => response.json())
    .then(Data => {
        loadOperatorEgipt(Data.operator1);
        loadHotelEgipt(Data.hotel1);
        loadTransportEgipt(Data.transport1);
        loadNights(Data.nights);
        calculatePriceEgipt(Data);
        changeOption(Data);
    });


const sel = document.getElementById('op');
const select = document.getElementById('ht');
const selects = document.getElementById('trans');
const selected = document.getElementById('nopti');

function loadOperatorEgipt(operator1) {
    for (let operator of operator1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(operator.name));
        opt.value = operator.sale;
        sel.appendChild(opt)
    }
}
/*function loadOperatorEgipt(operator1){
    let selectElement = document.getElementById('op');
    for (let i = 0 ; i < operator1.length ; i++){
        let optionElement = document.createElement('option');
        optionElement.innerText = operator1[i].name;
        optionElement.value = operator1[i].sale;
        selectElement.appendChild(optionElement);
    }
}*/

function loadHotelEgipt(hotel1) {
    for (let hotel of hotel1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(hotel.denumire));
        opt.value = hotel.plus_pret;
        select.appendChild(opt)
    }
}

function loadTransportEgipt(transport1) {
    for (let transport of transport1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(transport.tip));
        opt.value = transport.plus_pret;
        selects.appendChild(opt)
    }
}

function loadNights(nights) {
    for (let nr of nights) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(nr));
        opt.value = nr;
        selected.appendChild(opt)
    }
}

function calculatePriceEgipt(Data) {
    let price = Data.base_price_egipt;
    let selectedOperator = document.getElementById('op');
    let discount = parseInt(selectedOperator.value);
    let selectedHotel = document.getElementById('ht');
    let selectedTransport = document.getElementById('trans');
    let selectedNights = document.getElementById('nopti');
    price = (price + parseInt(selectedHotel.value))*parseInt(selectedNights.value) + parseInt(selectedTransport.value);
    price = calculate(price);
    if (discount == 1) {
        price = price * 0.95;
    }
    console.log(price);
    document.getElementById('result').innerHTML = price;
}

function changeOption(Data) {
    let selectedOperator = document.getElementById('op');
    let selectedHotel = document.getElementById('ht');
    let selectedTransport = document.getElementById('trans');
    let selectedNights = document.getElementById('nopti');
    selectedOperator.addEventListener('change', function(){
        calculatePriceEgipt(Data);
    });
    selectedHotel.addEventListener('change', function(){
        calculatePriceEgipt(Data);
    });
    selectedTransport.addEventListener('change', function(){
        calculatePriceEgipt(Data);
    });
    selectedNights.addEventListener('change', function(){
        calculatePriceEgipt(Data);
    });
}

function calculate(price) {
    let priceAdults = price * Number(document.getElementById('adulti').value);
    let priceKids = 0;
    console.log(priceAdults);

    let input = document.getElementById("myInput").value.split(',');
    if (input.length != document.getElementById('copii')) {

    }
    else {
        for (var i = 0; i < input.length; i++) {
            if (input[i] < 7) {
                priceKids += 0;
            } else if (input[i] >= 7 && input[i] <= 12) {
                priceKids += price / 2;
            } else {
                priceKids += price;
            }
        }
    }
        price = priceAdults + priceKids;
        console.log(price);
    return priceAdults + priceKids;
}

/*function getInputValue() {
    input = document.getElementById("myInput").value.split(',');
    for (i = 0; i < input.length; i++) {
        vector[i] = parseInt(input[i]);
    }

}

function Data() {
    var str = document.getElementById('data').value;
    var res = str.split("-");
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
    var luna = months[res[1]-1];
    if (luna == "June" || luna == "August" ) {
        pret = pret + 5;
    }
    console.log(luna);
} Data();

function nrNopti() {
    const nr = Number(document.getElementById('nopti').value);
    pret = pret * nr;
} nrNopti();

function virsteAdulti() {
    const n = Number(document.getElementById('adulti').value);
    pretad = pret * n;
} virsteAdulti();

function virsteCopii() {
    for (var i = 0; i < vector.length; i++) {
        if (vector[i] < 7) {
            pretcop = pretcop + 0;
        } else if (vector[i] >= 7 && vector[i] <= 12) {
            pretcop = pretcop + pret / 2;
        } else {
            pretcop = pretcop + pret;
        }
    } console.log('pret pentru copii este: ' + pretcop);
} virsteCopii();


/*document.getElementById('calculateBut').addEventListener("click", function(){
    document.getElementById('result').innerHTML = price;
});  */

function checkInput(ob) {
    var invalidChars = /[^0-9-,]/gi
    if(invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars,"");
    }
}
function checkInput2(ob) {
    var invalidChars = /[^0-9-A-Za-z]/gi
    if(invalidChars.test(ob.value)) {
        ob.value = ob.value.replace(invalidChars,"");
    }
}
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

