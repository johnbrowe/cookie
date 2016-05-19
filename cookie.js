/**
 * Handle cookie
 *
 * John Høj Andreassen
 */

module.exports = {

    // Get cookie
    get: function (sName) {
        // Prepare name
        sName = sName.toLowerCase();
        // Split into array
        var aCookies = document.cookie.split(';');
        // Find cookie
        for (var i = 0; i < aCookies.length; i++) {
            // Split into array
            var aPair = aCookies[i].split('=');
            // Get and prepare key/name
            var sKey = decodeURIComponent(aPair[0].trim().toLowerCase());
            // Prepare return value
            var sValue = aPair.length > 1 ? aPair[1] : '';
            // Check for name/key match
            if (sKey === sName){
                return decodeURIComponent(sValue);
            }
        }
        // Return empty if empty
        return '';
    },

    // Set cookie
    set: function (sName, sValue) {
        // Get today date
        var oDate = new Date();
        // Add one year
        oDate.setYear(oDate.getFullYear() + 1);
        // Prepare cookie
        var sCookie = encodeURIComponent(sName) + '=' + encodeURIComponent(sValue) + ';expires=' + oDate.toGMTString() + ';path=/';
        // Set cookie
        document.cookie = sCookie;
    },

    // Clear cookie
    clear: function (sName) {
        // Set cookie to empty string
        this.set(sName, '');
    },

    // Wait until cookie is set
    wait: function (sName, times, cb) {
        // Set this
        let self = this;
        // Iterate over cookie value a specific number of times
        // If cookie is set return cookie/callback
        (function isEmpty (i) {
            // Check every 100 milliseconds
            setTimeout(function () {
                // Itarate until 0
                if (--i){
                    // Check if cookie is set
                    if(self.get(sName).length > 0){
                        // Callback
                        cb(self.get(sName));
                    } else {
                        // Recurs
                        isEmpty(i);
                    }
                }
            }, 100);
        })(times);
    }
};
