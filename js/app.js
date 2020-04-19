vector = [];
/* asdfg*/
fetch('json/data.json')
    .then(response => response.json())
    .then(Data => {
        loadCountry(Data.country);
        loadOperatorEgipt(Data.operator1);
        loadHotelEgipt(Data.hotel1);
        loadTransportEgipt(Data.transport1);
        loadNights(Data.nights);
        calculatePriceEgipt(Data);
        changeOption(Data);
    });


const sel1 = document.getElementById('tara');
const sel2 = document.getElementById('op');
const sel3 = document.getElementById('ht');
const sel4 = document.getElementById('trans');
const sel5 = document.getElementById('nopti');

function loadCountry(country) {
    for (let country1 of country) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(country1.destination));
        opt.value = country1.id;
        opt.name = country1.destination;
        sel1.appendChild(opt)
    }
}

function loadOperatorEgipt(operator1) {
    for (let operator of operator1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(operator.name));
        opt.value = operator.sale;
        sel2.appendChild(opt)
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
        sel3.appendChild(opt)
    }
}

function loadTransportEgipt(transport1) {
    for (let transport of transport1) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(transport.tip));
        opt.value = transport.plus_pret;
        sel4.appendChild(opt)
    }
}

function loadNights(nights) {
    for (let nr of nights) {
        var opt = document.createElement('option');
        opt.appendChild( document.createTextNode(nr));
        opt.value = nr;
        sel5.appendChild(opt)
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
        price = price * 0.95; }

    price = data(price);
    console.log(price);
    document.getElementById('result').innerHTML = price;

}

function changeOption(Data) {
    let selectedCountry = document.getElementById('tara');
    let selectedOperator = document.getElementById('op');
    let selectedHotel = document.getElementById('ht');
    let selectedTransport = document.getElementById('trans');
    let selectedNights = document.getElementById('nopti');
    selectedCountry.addEventListener('change', function(){
        calculatePriceEgipt(Data);
    });
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
    /*if (input.length != document.getElementById('copii')) {

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
    }*/
    for (var i = 0; i < input.length; i++) {
        if (input[i] < 7) {
            priceKids += 0;
        } else if (input[i] >= 7 && input[i] <= 12) {
            priceKids += price / 2;
        } else {
            priceKids += price;
        }
    }
        price = priceAdults + priceKids;
        console.log(price);
    return priceAdults + priceKids;
}

function data(price) {
    var str = document.getElementById('date').value;
    var res = str.split("-");
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
    var luna = months[res[1]-1];
    if (luna == "June" || luna == "July" ) {
        return price * 0.98;
    }
    return price;
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
    if(charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}


// form.js
const formId = "save-later-form"; // ID of the form
const url = location.href; //  href for the page
const formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#save"); // select save button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form

/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * @returns {Object}
 */
const getFormData = () => {
    let data = { [formIdentifier]: {} };
    for (const element of formElements) {
        if (element.name.length > 0) {
            data[formIdentifier][element.name] = element.value;
        }
    }
    return data;
};

saveButton.onclick = event => {
    event.preventDefault();
    data = getFormData();
    localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
    const message = "Datele au fost trimise!";
    displayAlert(message);
};

const displayAlert = message => {
    alertBox.innerText = message;
    alertBox.style.display = "block";
    setTimeout(function() {
        alertBox.style.display = "none";
    }, 1000);
};

document.getElementById('calculateBut').addEventListener("click", function(){
    const a = document.getElementById('tara');
    var text1 = a.options[a.selectedIndex].text;
    const b = document.getElementById('ht');
    var text2 = b.options[b.selectedIndex].text;
    const c = document.getElementById('trans');
    var text3 = c.options[c.selectedIndex].text;
    document.getElementById('comanda').innerHTML = 'Destinatia: '+text1+' Hotel: '+text2+' Transport:'+text3;
});
