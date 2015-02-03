angular.module('app')
    .directive('list', function($rootScope){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                var len = 0;

                // short content to show on the main page
                var shortContent = function(data,nr) {
                    var shortContent = [];
                    for(var i = 0; i<25; i++) {
                        shortContent += data[nr].content[i];
                    }
                    return shortContent;
                };

                // load email from localstorage
                var loadEmails = function(data) {
                    for(var nr=0; nr<data.length; nr++) {
                        var cont = shortContent(data,nr);
                        if (data[nr].read === false) {
                            element.append('<tr draggable="true" class="new" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        } else {
                            element.append('<tr draggable="true" id="' + data[nr].id + '"><td><span class="sender">' + data[nr].sender + '</span></td> + ' +
                            '<td><span class="title">' +  data[nr].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                            '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        }
                    }
                };

                // add new email
                var addEmail = function(size) {
                    for (var i=0; i<size; i++) {
                        var cont = shortContent(scope.emails,i);
                        // add new(the first) email at the top of the list
                        element.prepend('<tr draggable="true" class="new" id="' + scope.emails[i].id + '"><td><span class="sender">' + scope.emails[i].sender + '</span></td> + ' +
                        '<td><span class="title">' +  scope.emails[i].title + '</span></td><td><span class="content">' + cont  + '</span></td> + ' +
                        '<td><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></td></tr>');
                        console.log('directive: new email added');
                    }
                };

                var removeEmail = function(mail) {
                    mail.remove();
                    len = len - 1;
                };


                // watch changes
                scope.$watch('emails', function(value) {
                    console.log('zmienilo sie cos yeah!');
                    if(scope.emails !== undefined) {
                        if (scope.emails.length > len) {
                            if (len === 0) {
                                // the first time from localstorage
                                loadEmails(scope.emails);
                                console.log('from localstorage');
                                len = scope.emails.length;
                            } else {
                                // add to the list
                                var diff = scope.emails.length - len;
                                addEmail(diff);
                                len = scope.emails.length;
                            }
                        }
                    }
                }, true);

                // if element is clicked
                element.bind('click',function(event){
                    // if removed is clicked
                    if (event.target.classList.contains("glyphicon-remove")) {
                        var emailToRemove = event.target.parentNode.parentNode;
                        var idToRemove = emailToRemove.getAttribute('id');
                        scope.removeEmail(idToRemove);
                        removeEmail(emailToRemove);
                    }

                    // emails is clicked
                    var tr = closest(event.target, 'tr');
                    var idToSend = tr.getAttribute('id');
                    console.log(tr);

                    if(tr.classList.contains('new')){
                        tr.classList.remove('new');
                    }

                    scope.updateStorage(idToSend);
                    scope.showEmail(idToSend);
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

                // drag and drop
               /* element.bind("dragstart", function(e) {
                    var id = e.srcElement.id;
                    e.dataTransfer.setData('text', id);
                    console.log(e);
                    $rootScope.$emit("DRAG-START");
                });

                element.bind("dragenter", function(e) {
                    //this.classList.add('over');
                });

                element.bind("dragleave", function(e) {
                    //this.classList.remove('over');
                });

                element.bind("dragend", function(e) {
                    console.log(e);
                    $rootScope.$emit("DRAG-END");
                });
                */

            }
        };
    });