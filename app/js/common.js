(function() {

    "use strict";

    // data for table

    var itemsArr = [
        {
            order: 1,
            flag: 'ru',
            sum: '5 321',
            account: '123 456 000'
        },
        {
            order: 2,
            flag: 'spa',
            sum: '3 000',
            account: '425 238 238'
        },
        {
            order: 3,
            flag: 'chi',
            sum: '890',
            account: '123 543 548'
        },
        {
            order: 4,
            flag: 'ru',
            sum: '777',
            account: '090 235 453'
        },
        {
            order: 5,
            flag: 'spa',
            sum: '666',
            account: '009 281 443'
        },
        {
            order: 6,
            flag: 'chi',
            sum: '555',
            account: '515 654 522'
        },
        {
            order: 7,
            flag: 'ru',
            sum: '444',
            account: '765 452 241'
        },
        {
            order: 8,
            flag: 'spa',
            sum: '333',
            account: '562 183 816'
        },
        {
            order: 9,
            flag: 'chi',
            sum: '222',
            account: '642 452 555'
        },
        {
            order: 10,
            flag: 'ru',
            sum: '111',
            account: '212 552 112'
        }
    ];

    var e = e || window.event;

    // first connect and change arr.length

    if (localStorage.getItem("itemsArr") === null || localStorage.getItem("itemsArr").length != JSON.stringify(itemsArr).length) {
        localStorage.setItem("itemsArr", JSON.stringify(itemsArr));
    } else {
        itemsArr = JSON.parse(localStorage.getItem("itemsArr"));
    }

    //create table from itemsArr

    function drawArr(target) {

        for (var i = 0; i < itemsArr.length; i++) { 

            var active = '';
            if(itemsArr[i].order == 1 || itemsArr[i].order == 2 || itemsArr[i].order == 3)  {
                active = 'active';
            }
            var item = 

            '<li class="table__item ' + active + '">' +

                '<div class="cell-left text-center">' + 
                    '<span class="cell-number">' + itemsArr[i].order + 
                    '</span>' +
                '</div>' +

                '<div class="cell-right clearfix">' +
                    '<span class="cell-sum"><span class="align-helper"> $ ' + itemsArr[i].sum +
                    '</span></span>' +
                     '<span class="cell-account">' + itemsArr[i].account +
                    '</span>' +
                    '<span class="cell-country lang-' + itemsArr[i].flag + 
                    '"></span>' +
                '</div>' +

            '</li>';

            document.getElementById(target).innerHTML += item;

        }
    }

    //clear table

    function clearArr(target) {
        document.getElementById(target).innerHTML = "";
    }

    //sort table

    function sortBy(field, reverse) {

        var key = function(x) {
            return x[field];
        };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        };
        
    }

    //sort table

    function redrawArr(e, reverse) {
        switch(e.target.parentNode.className) {

            case 'cell-number': 
                itemsArr.sort(sortBy('order', reverse));
                break;

            case 'cell-sum': 
                itemsArr.sort(sortBy('sum', reverse));
                break;

            case 'cell-account': 
                itemsArr.sort(sortBy('account', reverse));
                break;

            case 'cell-country': 
                itemsArr.sort(sortBy('flag', reverse));
                break;

        }

        clearArr('tournament-list');
        drawArr('tournament-list');

        //save

        localStorage.setItem("itemsArr", JSON.stringify(itemsArr));
       
    }

    //sort table by max

    function redrawArrUp(e) {
        redrawArr(e, true);
    }

    //sort table by min

    function redrawArrDown(e) {
        redrawArr(e, false);
    }

    //attach sort events

    function getUpDownArrows() {

        var sortUpArr = document.querySelectorAll('.sort-up');
        var sortDownArr = document.querySelectorAll('.sort-down');

        for (var i = 0; i < sortUpArr.length; i++) {

            sortUpArr[i].addEventListener('click', redrawArrUp, false);

        }

        for (var j = 0; j < sortDownArr.length; j++) {

            sortDownArr[j].addEventListener('click', redrawArrDown, false);

        }
    }

    //form validation

    function validationForm() {
        var fName = document.getElementById('inp-firstname');
        var lName = document.getElementById('inp-lastname');
        var phone = document.getElementById('inp-phone');
        var email = document.getElementById('inp-email');
        var phoneReg = /^(?=.*[0-9])[- +()0-9]+$/;
        var mailReg = /\S+@\S+/;
        var invalid = false;

        // first name validation
        if (isNaN(fName.value)) {
            fName.classList.remove('invalid');
        } else {
            fName.classList.add('invalid');
            invalid = true;
        }

        // last name validation
        if (isNaN(lName.value)) {
            lName.classList.remove('invalid');
        } else {
            lName.classList.add('invalid');
            invalid = true;
        }

        // phone validation 
        if (phone.value.match(phoneReg)) {
            phone.classList.remove('invalid');
        } else {
            phone.classList.add('invalid');
            invalid = true;
        }

        // mail validation 
        if (email.value.match(mailReg) || !email.value) {
            email.classList.remove('invalid');
        } else {
            email.classList.add('invalid');
        }

        var form = document.forms.topForm;
        var output = document.getElementById('status');
        var btn = document.getElementById('submit');    

        if (!invalid) {
            btn.disabled = true;
            output.innerHTML = 'Отправка ...';
            var formdata = new FormData();
            formdata.append( 'fn', fName.value );
            formdata.append( 'ln', lName.value );
            formdata.append( 'ph', phone.value );
            formdata.append( 'em', email.value );
            var ajax = new XMLHttpRequest();
            ajax.open( 'POST', 'example_parser.php' );
            ajax.onreadystatechange = function() {
                if(ajax.readyState == 4 && ajax.status == 200) {
                    if(ajax.responseText == 'success'){
                        output.innerHTML = 'Спасибо '+fName.value+', Ваши данные отправлено';
                    } else {
                        output.innerHTML = ajax.responseText;
                        // btn.disabled = false;
                    }
                }
            };
           ajax.send( formdata );
        }

    }

    //init
    
    document.addEventListener('DOMContentLoaded', function() {

        var submit = document.getElementById('submit');
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        document.querySelector('.header').setAttribute("style","height:" + h + 'px');

        submit.addEventListener('click', validationForm);

        drawArr('tournament-list');
        getUpDownArrows();

    });

})();