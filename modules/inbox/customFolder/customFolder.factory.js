angular.module('app')
    .factory('customFolders', function (localStorageService) {
        var idEmails = [];
        return {
            addFolders: function (id, folder) {
                idEmails.push({
                    name: folder,
                    id: id
                });
                localStorageService.add('folders',idEmails);
            },
            deleteFolder: function(id, folder) {
                idEmails = localStorageService.get('folders');
                for(var i=0; i<idEmails.length; i++) {
                    if (idEmails[i].name === folder && idEmails[i].id === id){
                        idEmails.splice(i,1);
                    }
                }
                localStorageService.add('folders',idEmails);
            }
        }
    });