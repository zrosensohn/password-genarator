const init = function(){
    document.getElementById('generate').addEventListener('click', genPass);
    document.getElementById('copyToClip').addEventListener('click', copy);
}

const genPass = function(e){
    // Prevent Reload
    e.preventDefault();
    //Clear The Password Array
    properties.passwordArray=[]; 
    //Select Special Characters
    let chk = document.getElementById("selectSpecialChar");
    // Convert input value to integer
    let chkInt = parseInt(chk.value); 

    if (chk.checked){
        //Set special character property in object
        properties.setSpecial(chkInt); 
    }
    else{
        properties.setSpecial(0);
    }
    
    //Set Numbers
    let length = document.getElementById('numberOfChar');
    //convert password length to integer
    let lengthInt = parseInt(length.value);

    if(lengthInt !== 0){
        // set password length in object
        properties.setLength(lengthInt); 
        //Return Password
        let randomPass = properties.createArr(); 

        document.getElementById('alert').innerHTML =
            `<div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Your Password</h4>
            <p id="yourPass">${randomPass}</p>
            </div>`;
    }
    else{
        document.getElementById('alert').innerHTML =
            `<div class="alert alert-warning" role="alert">
            <h4 class="alert-heading">Warning</h4>
            <p>You Must Choose A Password Length</p>
            </div>`;
    }

}

const copy = function(e){
    // Prevent Reload
    e.preventDefault(); 

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