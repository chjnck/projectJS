angular.module('app')
    .directive('droppable', function($rootScope){
        return {
            scope: {
                drop: '&',
                bin: '='
            },
            link: function(scope, element, attrs) {
                // again we need the native object

                element.bind('dragover',function(e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                });

                element.bind('dragenter',function(e) {
                    this.classList.add('over');
                });

                element.bind('dragleave',function(e) {
                    this.classList.remove('over'); });

                element.bind('drop', function(e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();
                    this.classList.remove('over');

                    var item = e.dataTransfer.getData('text');
                    var folderId = this.id;

                    $rootScope.$broadcast('factoryCustomFolder', {id: item, folder: folderId});

                });
            }
        }
    });