const properties = {
    "pwLength": 0,
    "specialChar": 0,
    "letterSet": ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
    "numberSet": [0,1,2,3,4,5,6,7,8,9],
    "specialCharSet": ["\!","\"","\#","\$","\%","\&","\'","\(","\)","\*","\+","\,","\-","\.","\/","\:","\;","\=","\>","\?","\@","\[","\\","\]","\^","\_","\`","\{","\|","\}","\~"],
    "randomNoSpecial": [0,1],
    "randomAllArr" : [0,1,2],
    "passwordArray": [],
    
    setLength: function(x) {
        this.pwLength = x;
    },

    setSpecial: function(choice) {
        this.specialChar = choice;
    },

    randomizer: function(arr) {
        let randomValue = arr[Math.floor(Math.random()*arr.length)];
        return randomValue;
    },

    randomItem: function(arr) {
        let randItem = arr[Math.floor(Math.random()*arr.length)];
        return randItem; 
    },

    createArr: function(){
        // Only Lower Case And Capitals
        if (this.specialChar === 0) {
            for(let i = 0; i < this.pwLength; i++){
                // choose from randomizer array
                let randomizer = this.randomizer(this.randomNoSpecial);
                // randLetter is a random letter from the letter set array
                let randLetter = this.randomItem(this.letterSet);
                // If 0 means select lowercase
                if(randomizer === 0) {
                    this.passwordArray.push(randLetter);
                }
                //If Not 0 convert lowercase to Uppercase
                else{
                    this.passwordArray.push(randLetter.toUpperCase());
                }    
            }
        }
        else {
            for(let i = 0; i < this.pwLength; i++){
                let randomizer = this.randomizer(this.randomAllArr);
                let randLetter = this.randomItem(this.letterSet);
                let randSpecial = this.randomItem(this.specialCharSet);
                // If 0 means select lowercase
                if(randomizer === 0){
                    this.passwordArray.push(randLetter);
                }
                // If 1 means select uppercase
                else if(randomizer === 1){
                    this.passwordArray.push(randLetter.toUpperCase());
                }
                // If 2 means select from special character list
                else {
                    this.passwordArray.push(randSpecial);
                }
            }
        }
        let randomPass = this.passwordArray.join("");
        // console.log(randomPass);
        // console.log(this.passwordArray.length);
        return randomPass;
        
    },
}

// properties.setLength(34);
// properties.setSpecial(1);
// properties.createArr();
