angular.module('app')
    .factory('customFolders', function () {
        var idEmails = [];

        return {
            addFolders: function (id, folder) {
                idEmails.push({
                    name: folder,
                    id: id
                });
            },
            getFolders: function(folder) {
                var ids = [];
                for(var i=0; i<idEmails.length; i++) {
                    if (folder === idEmails[i].name) {
                        ids.push(idEmails[i].id);
                    }
                }
                return ids;
            }
        }
    });