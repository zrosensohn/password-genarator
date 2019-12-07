const properties = {
    "pwLength": 0,
    "numLower": 0,
    "numCapital": 0,
    "numSpecial": 0,
    "specialChar": 0,
    "letterSet": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    "numberSet": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    "specialCharSet": ["\!", "\"", "\#", "\$", "\%", "\&", "\'", "\(", "\)", "\*", "\+", "\,", "\-", "\.", "\/", "\:", "\;", "\=", "\>", "\?", "\@", "\[", "\\", "\]", "\^", "\_", "\`", "\{", "\|", "\}", "\~"],
    "passwordArray": [],
    setLength: function(x) {
        this.pwLength = x;
        return;
    },
    setSpecial: function(choice) {
        this.specialChar = choice;
        return;
    },
    setNumbers: function() {
        this.numLower = this.pwLength - (Math.floor(Math.random() * (this.pwLength - 3)) + 2);
        this.numCapital = this.pwLength - this.numLower;
        // console.log(this.numLower);
        // console.log(this.numCapital);
        if (this.specialChar === 1) {
            this.numCapital = (Math.floor(Math.random() * (this.numCapital - 3)) + 2);
            this.numSpecial = this.pwLength - this.numCapital - this.numLower;
        }
        return;
    },
    createArr: function() {
        // Add Cappitals to array
        for (let i = 0; i < this.numCapital; i++) {
            this.passwordArray.push(this.letterSet[Math.floor(Math.random() * this.letterSet.length)].toUpperCase());
        }
        // Add LowerCase to array
        for (let i = 0; i < this.numLower; i++) {
            this.passwordArray.push(this.letterSet[Math.floor(Math.random() * this.letterSet.length)]);
        }
        // Add SpecialChar to array
        if (this.specialChar === 1) {
            for (let i = 0; i < this.numSpecial; i++) {
                this.passwordArray.push(this.specialCharSet[Math.floor(Math.random() * this.specialCharSet.length)]);
            }
        }
    },
    shuffle: function() {
        let currentIndex = this.passwordArray.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.passwordArray[currentIndex];
            this.passwordArray[currentIndex] = this.passwordArray[randomIndex];
            this.passwordArray[randomIndex] = temporaryValue;
        }
        let randomPass = this.passwordArray.join("");
        return randomPass;
    }
}
const init = function() {
    document.getElementById('generate').addEventListener('click', genPass);
    document.getElementById('copyToClip').addEventListener('click', copy);
}
const genPass = function(e) {
    e.preventDefault(); // Prevent Reload
    properties.passwordArray = []; //Clear The Password Array
    //Select Special Characters
    let chk = document.getElementById('selectSpecialChar');
    let chkInt = parseInt(chk.value); // Convert input value to integer
    if (chk.checked) {
        properties.setSpecial(chkInt); //Set special character property in object
    } else {
        properties.setSpecial(0);
    }
    //Set Numbers
    let length = document.getElementById('numberOfChar');
    var lengthInt = parseInt(length.value); //convert password length to integer
    if (lengthInt !== 0) {
        properties.setLength(lengthInt); // set password length
        console.log(properties);
        properties.setNumbers(); // create random distribution of character types
        properties.createArr(); // create array of character types
        let randomPass = properties.shuffle(); //shuffle array and return as string
        console.log(randomPass.length);
        console.log(randomPass);
        document.getElementById('alert').innerHTML = `<div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Your Password Is</h4>
            <p id="yourPass">${randomPass}</p>
            <p class="mb-0"></p>
        </div>`;
    } else {
        document.getElementById('alert').innerHTML = `<div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Warning</h4>
            <p>You Must Choose A Password Length</p>
            <p class="mb-0"></p>
            </div>`;
    }
}
const copy = function(e) {
    e.preventDefault(); // Prevent Reload
    // Tooltip
    $('#copyToClip').tooltip({
        trigger: 'click',
        placement: 'top'
    });

    function setTooltip(message) {
        $('#copyToClip').tooltip('hide').attr('data-original-title', message).tooltip('show');
    }

    function hideTooltip() {
        setTimeout(function() {
            $('#copyToClip').tooltip('hide');
        }, 1000);
    }
    // Clipboard
    let clipboard = new ClipboardJS('#copyToClip');
    clipboard.on('success', function(e) {
        setTooltip('Copied!');
        hideTooltip();
    });
    clipboard.on('error', function(e) {
        setTooltip('Failed!');
        hideTooltip();
    });
}
document.addEventListener('DOMContentLoaded', init)
