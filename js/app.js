vector = [];
let pret = 10;
let pretcop = 0;
let pretad = 0;


fetch('json/data.json')
    .then(response => response.json())
    .then(Data => {
        loadOperator(Data.operator1);
        loadHotel(Data.hotel1);
        loadTransport(Data.transport1);
        console.log(Data.operator1);
    });


const sel = document.getElementById('op');
const select = document.getElementById('ht');
const selects = document.getElementById('trans');


function loadOperator(operator1) {
    for (let operator of operator1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(operator.name));
        opt.value = operator.sale;
        sel.appendChild(opt)
    }
}
/*function loadOperator(operator1){
    let selectElement = document.getElementById('op');
    for (let i = 0 ; i < Data.operator1.length ; i++){
        let optionElement = document.createElement('option');
        optionElement.innerText = Data.operator1[i].name;
        optionElement.value = Data.operator1[i].sale;
        selectElement.appendChild(optionElement);
    }
}*/

function loadHotel(hotel1) {
    for (let hotel of hotel1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(hotel.denumire));
        opt.value = hotel.plus_pret;
        select.appendChild(opt)
    }
}

function loadTransport(transport1) {
    for (let transport of transport1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(transport.tip));
        opt.value = transport.plus_pret;
        selects.appendChild(opt)
    }
}



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
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function getInputValue() {
    input = document.getElementById("myInput").value.split(',');
    for (i = 0; i < input.length; i++) {
        vector[i] = parseFloat(input[i]);
    } console.log(vector);

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

}

document.getElementById('calculateBut').addEventListener("click", function(){
    document.getElementById('result').innerHTML = pretad + pretcop;
}); 


