const myArr = [];

function start() {
    const theSelect = document.getElementById('coins');

    fetchData(theSelect, myArr);
    theSelect.onchange = handleSelect;    
}

function fetchData(theSelect, myArr) {
    fetch('https://api.coincap.io/v2/assets')
        .then(response =>  {
            if (!response.ok) {
                console.log('Problem');
                return;
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            for (var i = 0; i < data.data.length; i++) {
                myArr[i] = {
                    "position": i,
                    "name": data.data[i].name,
                    "symbol": data.data[i].symbol,
                    "supply": data.data[i].supply,
                    "price": data.data[i].priceUsd,
                    "change": data.data[i].vwap24Hr
                }
                var option = document.createElement("option");
                option.value = i;
                option.text = data.data[i].name;
                theSelect.add(option);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function handleSelect() {
        var c = document.getElementById('coins')

        const nameSpan = document.getElementById('name');
        const symbolSpan = document.getElementById('symbol');
        const supplySpan = document.getElementById('supply');
        const priceSpan = document.getElementById('price');
        const changeSpan = document.getElementById('change');

        nameSpan.innerHTML = myArr[c.value].name;
        symbolSpan.innerHTML = myArr[c.value].symbol;
        supplySpan.innerHTML = parseInt(myArr[c.value].supply);
        priceSpan.innerHTML = parseFloat(myArr[c.value].price).toFixed(2);
        changeSpan.innerHTML = parseFloat(myArr[c.value].change).toFixed(2);
        
    }

    window.onload = start;