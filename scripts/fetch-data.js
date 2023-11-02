function start() {
    var theSelect = document.getElementById('coins');
    fetchData(theSelect);
    theSelect.onchange = handleSelect;
}

function fetchData(theSelect) {
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
                var option = document.createElement("option")
                option.value = i;
                option.text = data.data[i].name;
                theSelect.add(option);
                console.log(option.value);
                console.log(option.text);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    function handleSelect() {
        var supply = document.getElementById('supply');

        console.log('switched');

    }

    window.onload = start;