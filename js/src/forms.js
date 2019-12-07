const init = function(){
    document.getElementById('generate').addEventListener('click', genPass);
    document.getElementById('copyToClip').addEventListener('click', copy);
}

const genPass = function(e){
    e.preventDefault(); // Prevent Reload
    properties.passwordArray=[]; //Clear The Password Array

    //Select Special Characters
    let chk = document.getElementById('selectSpecialChar');
    let chkInt = parseInt(chk.value); // Convert input value to integer

    if (chk.checked){
        properties.setSpecial(chkInt); //Set special character property in object
    }
    else{
        properties.setSpecial(0);
    }
    
    //Set Numbers
    let length = document.getElementById('numberOfChar');
    var lengthInt = parseInt(length.value); //convert password length to integer
    if(lengthInt !== 0){
        properties.setLength(lengthInt); // set password length
        console.log(properties);
        properties.setNumbers(); // create random distribution of character types
        properties.createArr(); // create array of character types
        let randomPass = properties.shuffle(); //shuffle array and return as string
        console.log(randomPass.length);
        console.log(randomPass);
        document.getElementById('alert').innerHTML = 
            `<div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Your Password Is</h4>
            <p id="yourPass">${randomPass}</p>
            <p class="mb-0"></p>
        </div>`;
    }
    else{
        document.getElementById('alert').innerHTML =
            `<div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Warning</h4>
            <p>You Must Choose A Password Length</p>
            <p class="mb-0"></p>
            </div>`;

    }

}

const copy = function(e){
    e.preventDefault(); // Prevent Reload

        // Tooltip

        $('#copyToClip').tooltip({
            trigger: 'click',
            placement: 'top'
        });
        
        function setTooltip(message) {
            $('#copyToClip').tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
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