/* eslint-disable */
(function () {
    /* eslint-disable */
    if (!window.$mcSite) {
        $mcSite = {
            optinFeatures: [],
            enableOptIn: function () {
                this.createCookie("mc_user_optin", true, 365);
                this.optinFeatures.forEach(function (fn) {
                    fn();
                });
            },

            runIfOptedIn: function (fn) {
                if (this.hasOptedIn()) {
                    fn();
                } else {
                    this.optinFeatures.push(fn);
                }
            },

            hasOptedIn: function () {
                var cookieValue = this.readCookie("mc_user_optin");

                if (cookieValue === undefined) {
                    return true;
                }

                return cookieValue === "true";
            },

            createCookie: function (name, value, expirationDays) {
                var cookie_value = encodeURIComponent(value) + ";";
                
                if (expirationDays === undefined) {
                    throw new Error("expirationDays is not defined");
                }

                // set expiration
                if (expirationDays !== null) {
                    var expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + expirationDays);
                    cookie_value += " expires=" + expirationDate.toUTCString() + ";";
                }
    
                cookie_value += "path=/";
                document.cookie = name + "=" + cookie_value;
            },

            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(";");
    
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
    
                    while (c.charAt(0) === " ") {
                        c = c.substring(1, c.length);
                    }
    
                    if (c.indexOf(nameEQ) === 0) {
                        return c.substring(nameEQ.length, c.length);
                    }
                }
    
                return undefined;
            }
        };
    }

    $mcSite.attribution={settings:{url:"\/\/drogueriasanjorge.us2.list-manage.com\/track\/engagement",uid:"d244655dc9642bcb9a601f24c"}};
})();
/** This file contains code that will record an engagement with a Mailchimp campaign. */
(function () {
    var attribution = {
        checkForEngagement: function (url, uid) {
            if (this.doNotTrackEnabled()) {
                return;
            }

            var utmCampaign = this.getQueryParam("utm_campaign");
            var utmSource = this.getQueryParam("utm_source");
            var utmMedium = this.getQueryParam("utm_medium");

            if (this.isValidCampaign(utmCampaign) && this.isValidSource(utmSource) && this.isValidMedium(utmMedium)) {
                this.postEngagement(url, uid);
            }
        },

        getQueryParam: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);

            return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        doNotTrackEnabled: function () {
            // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
            if (navigator.doNotTrack === "1" || navigator.msDoNotTrack === "1"
                || window.doNotTrack === "1" || navigator.doNotTrack === "yes") {
                return true;
            }

            return false;
        },

        isValidCampaign: function (campaign) {
            if (!campaign) {
                return false;
            }

            var regex = new RegExp("^[a-zA-Z0-9]{10,12}(-.*)?$"); // unique_id for campaigns is 10, ads is 12
            return campaign.search(regex) !== -1;
        },

        isValidSource: function (utmSourceParam) {
            if (!utmSourceParam) {
                return false;
            }

            var regex = new RegExp("^mailchimp(-.*)?$", "i");
            return utmSourceParam.search(regex) !== -1;
        },

        isValidMedium: function (utmMediumParam) {
            if (!utmMediumParam) {
                return false;
            }

            var regex = new RegExp("^(campaign|email|page|ad)$", "i");
            return utmMediumParam.search(regex) !== -1;
        },

        createCookie: function (name, value, expirationDays) {
            var cookie_value = encodeURIComponent(value) + ";";

            // set expiration
            if (expirationDays !== null) {
                var expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + expirationDays);
                cookie_value += " expires=" + expirationDate.toUTCString() + ";";
            }

            cookie_value += "path=/";
            document.cookie = name + "=" + cookie_value;
        },

        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];

                while (c.charAt(0) === " ") {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }

            return null;
        },

        postEngagement: function (url, uid) {
            var customer_session_id = this.readCookie("mc_customer_session_id");
            var data = {
                landing_site: window.location.href,
                u: uid,
                customer_session_id: customer_session_id
            };

            var XHR = new XMLHttpRequest();
            var urlEncodedDataPairs = [];

            var key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    var value = data[key] ? data[key] : "";
                    urlEncodedDataPairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
                }
            }

            var self = this;
            var urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+"); // replace spaces with '+'
            XHR.onreadystatechange = function () {
                if (XHR.readyState === XMLHttpRequest.DONE) {
                    var response = JSON.parse(XHR.responseText);
                    self.createCookie("mc_customer_session_id", response.customer_session_id, 30);
                }
            };

            // Set up our request
            XHR.open("POST", url, true);
            XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            XHR.send(urlEncodedData);
        }
    };

    if (window.$mcSite === undefined || window.$mcSite.attribution === undefined) {
        return;
    }

    var module = window.$mcSite.attribution;
    if (module.installed === true) {
        return;
    }

    window.$mcSite.runIfOptedIn(function () {
        attribution.checkForEngagement(module.settings.url, module.settings.uid);
        module.installed = true;
    });
}());
