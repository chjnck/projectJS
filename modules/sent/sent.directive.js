angular.module('app')
    .directive('sentList', function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var len = 0;

                // short content to show on the main page
                var shortContent = function(data,nr) {
                    var shortContent = [];
                    var charCounter = 25;
                    if (charCounter > data[nr].content.length) {
                        charCounter = data[nr].content.length;
                    }
                    for(var i = 0; i<charCounter; i++) {
                        shortContent += data[nr].content[i];
                    }
                    return shortContent;
                };

                // nice looking string about receivers
                var shortReceivers = function(receivers) {
                    if (receivers.length === 0) {
                        return "Noone";
                    }
                    if (receivers.length === 1) {
                        return receivers[0];
                    } else {
                        return receivers[0] + " i inni";
                    }
                };

                // load email from localstorage
                var loadEmails = function(data) {
                    for(var nr=0; nr<data.length; nr++) {
                        var cont = shortContent(data,nr);
                        var rec = shortReceivers(data[nr].receivers);
                        console.log(data[nr]);
                        element.append('<tr draggable="true" id="' + data[nr].id + '"><td><span class="sender">' + rec + '</span></td> + ' +
                        '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td></td></tr>');
                    }
                };

                // add new email
                var addEmail = function(size) {
                    for (var i=0; i<size; i++) {
                        var cont = shortContent(scope.sent,i);
                        var rec = shortReceivers(scope.sent[i].receivers);
                        // add new(the first) email at the top of the list
                        element.prepend('<tr draggable="true" id="' + scope.sent[i].id + '"><td><span class="sender">' + rec + '</span></td> + ' +
                        '<td><span class="title">' +  scope.sent[i].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td></td></tr>');
                        console.log('directive: new email added');
                    }
                };

                // watch changes
                scope.$watch('sent', function(value) {
                    if(scope.sent !== undefined) {
                        if (scope.sent.length > len) {
                            if (len === 0) {
                                // the first time from localstorage
                                loadEmails(scope.sent);
                                console.log('from localstorage');
                                len = scope.sent.length;
                            } else {
                                // add to the list
                                var diff = scope.sent.length - len;
                                addEmail(diff);
                                len = scope.sent.length;
                            }
                        }
                    }
                }, true);

                // if element is clicked
                element.bind('click',function(event){
                    // emails is clicked
                    var tr = closest(event.target, 'tr');
                    var idToSend = tr.getAttribute('id');
                    console.log(tr);

                    if(tr.classList.contains('new')){
                        tr.classList.remove('new');
                    }

                    scope.showSentEmail(idToSend);
                });

                var closest = function(elem, selector) {
                    var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
                    while (elem) {
                        if (matchesSelector.bind(elem)(selector)) {
                            return elem;
                        } else {
                            elem = elem.parentElement;
                        }
                    }
                    return false;
                };

            }
        };
    });