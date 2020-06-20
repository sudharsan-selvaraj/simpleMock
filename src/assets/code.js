'use strict';
(function(originalXMLHttpRequest) {
    XMLHttpRequest = function() {
        var actual = new originalXMLHttpRequest();
        var self = this;

        ["responseXML", "upload"].forEach(function(item) {
            Object.defineProperty(self, item, {
                get: function() {return actual[item];}
            });
        });

        ["ontimeout, timeout", "withCredentials", "onerror", "onprogress"].forEach(function(item) {
            Object.defineProperty(self, item, {
                get: function() {return actual[item];},
                set: function(val) {actual[item] = val;}
            });
        });

        ["onload", "onreadystatechange"].forEach(function(item) {
            Object.defineProperty(self, item, {
                get: function() {return actual[item];},
                set: function(val) {
                    actual[item] = function(skip) {
                        if (typeof skip != "boolean") {
                            ['response', 'responseText', 'responseURL', 'readyState',
                                'readyState', 'statusText', 'status'].forEach(function (item) {
                                self[item] = actual[item];
                            });
                        }
                        val();
                    };
                }
            });
        });

        ["addEventListener", "abort", "getAllResponseHeaders",
            "getResponseHeader", "overrideMimeType", "setRequestHeader"].forEach(function(item) {
            Object.defineProperty(self, item, {
                value: function() {return actual[item].apply(actual, arguments);}
            });
        });

        var urlHash = [];

        Object.defineProperty(self, 'open', {
            value: function() {
                urlHash.push([self, arguments]);
                return actual['open'].apply(actual, arguments);
            }
        });

        Object.defineProperty(self, 'send', {
            value: function() {
                var obj = urlHash.find(function(d){ return d[0] == self});

                if (response[obj[1][1]] && response[obj[1][1]].method == obj[1][0]) {
                    self.response = response[obj[1][1]].body;
                    self.responseText = response[obj[1][1]].body;
                    self.responseURL = obj[1][1];
                    self.readyState = 4;
                    self.status = 200;
                    self.statusText = "OK";
                    setTimeout(function () {
                        actual.onload && actual.onload(true);
                        actual.onreadystatechange && actual.onreadystatechange();
                    }, 2000);
                }
                else {
                    return actual['send'].apply(actual, arguments);
                }
            }
        });
    }
})(XMLHttpRequest);
