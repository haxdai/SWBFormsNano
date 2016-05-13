/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
eng.dataSources["Gene"] = {
    scls: "Gene", /*Equivale al nombre de la tabla*/
    modelid: "NanoPharmacy", /*Es equivalente al nombre de la BD*/
    dataStore: "mongodb",
    displayField: "symbol",
    fields: [
        {name: "symbol", title: "Simbolo Oficial", required: true, type: "string",
            validators: [
                {
                    type: "serverCustom", //serverCustom del lado del servidor
                    serverCondition: function (name, value, request) {
                        var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
                        var search = new esearch();
                        //var isValid = search.hasGeneBD(value);
                        var isValid = search.getGeneInfo(value);
                        var jsonObj = JSON.parse(isValid);
                        if (jsonObj.error != null) {
                            if ("NO_INFO_FOUND".equals(jsonObj.error.error)) {
                                isValid = null;
                            }
                        }
                        if (isValid === null)
                            return false;
                    },
                    errorMessage: "The gene was not found on NCBI data bases, please check the spelling."
                },
                {
                    type: "isUnique", //serverCustom del lado del servidor
                    errorMessage: "This gene already exists."
                }
            ]
        },
        {name: "officialName", title: "Nombre oficial", type: "string"},
        {name: "mimId", title: "Número identificador", type: "int"},
        {name: "organism", title: "Organismo", type: "string"},
        {name: "aliases", title: "Nombres alternos", type: "string"},
        {name: "mapLocation", title: "Localización", type: "string"},
        {name: "summary", title: "Resumen", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};
eng.dataSources["AlterationMolecular"] = {
    scls: "AlterationMolecular",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "name",
    fields: [
        {name: "name", title: "Nombre de la alteración molecular", type: "string", validators: [
                {
                    type: "serverCustom", //serverCustom del lado del servidor
                    serverCondition: function (name, value, request) {
                        var util = Java.type("org.nanopharmacy.utils.Utils.ENG");
                        var isValid = util.isValidAltMol(request.data.gene, request.data.name);
                        if (!isValid)
                            return false;
                    },
                    errorMessage: "The molecular alteration already exists."
                }
            ]},
        {name: "aliases", title: "Nombres alternos", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "gene", title: "Gen", stype: "select", dataSource: "Gene"}
    ]
};
eng.dataSources["CancerType"] = {
    scls: "CancerType",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "name",
    fields: [
        {name: "name", title: "Nombre del tipo de cáncer", type: "string", validators: [
                {
                    type: "serverCustom", //serverCustom del lado del servidor
                    serverCondition: function (name, value, request) {
                        var util = Java.type("org.nanopharmacy.utils.Utils.ENG");
                        var isValid = util.isValidCancerType(request.data.gene, request.data.name);
                        if (!isValid)
                            return false;
                    },
                    errorMessage: "The disease already exists."
                }
            ]},
        {name: "summary", title: "Definición del cáncer", type: "string"},
        {name: "conceptId", title: "Id", type: "String"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};
eng.dataSources["Article"] = {
    scls: "Article",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "title",
    /*methodsAvalaible: ["add","update"],*/
    fields: [
        {name: "title", title: "Título del artículo", type: "string"},
        {name: "titleSort", title: "Título del artículo", type: "string"},
        {name: "abstract", title: "Resumen del artículo", type: "string"},
        {name: "link", title: "Liga", type: "string"},
        {name: "reference", title: "Referencia", type: "string"},
        {name: "pmid", title: "Id PubMed", type: "int"},
        {name: "pmcid", title: "Id PMC", type: "int"},
        {name: "autor", title: "Autores", type: "string"},
        {name: "autorSort", title: "Autores", type: "string"},
        {name: "prognosis", title: "Pronóstico", type: "int"},
        {name: "prediction", title: "Predicción", type: "int"},
        {name: "treatment", title: "Tratamiento", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "publicationMonth", title: "Mes de publicación", type: "int"},
        {name: "publicationYear", title: "Año de publicación", type: "int"}
    ]
};
eng.dataSources["Search"] = {
    scls: "Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "gene",
    fields: [
        {
            name: "gene", title: "Gen", stype: "select", dataSource: "Gene",
            validators: [{
                    type: "serverCustom", //serverCustom del lado del servidor
                    serverCondition: function (name, value, request) {
                        var StringArrayType = Java.type("java.lang.String[]");
                        var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                        var IntegerArrayType = Java.type("int[]");
                        var a = new StringArrayType(3);
                        var b = new StringArrayType(3);
                        a[0] = "gene";
                        a[1] = "altMolecular";
                        a[2] = "user";
                        if (request.data.creationMode == "general") {
                            request.data.user = "all";
                        }

                        b[0] = request.data.gene; //idGene;
                        b[1] = request.data.altMolecular; //idAltMolecular;
                        b[2] = request.data.user; //idUser;
                        var c = new StringArrayType(1);
                        var d = new IntegerArrayType(1);
                        c[0] = "artYearsOld";
                        d[0] = request.data.artYearsOld; //a partir de 11/05/2016 se manejan meses no años
                        //var idGene = utils.getIdProperty("Gene", "symbol", request.data.gene);//Valida el simbolo del gen
                        //var idAltMolecular = utils.getIdProperty("AlterationMolecular", "name", request.data.altMolecular);//Valida el nombre de la alteraciÃ³n molecular

                        var isValid = utils.isValidObject("Search", a, b, c, d);
                        if (isValid)
                            return true;
                        else
                            return false;
                    },
                    errorMessage: "This search schema already exists. Please change gene, molecular alteration or Publication dates parameter and try it again. "
                }]
        },
        {name: "altMolecular", title: "Alteración Molecular", stype: "select", dataSource: "AlterationMolecular"},
        {name: "artYearsOld", title: "Longevidad de pulicaciones", type: "int"},/*11/05/2016 -> se almacena numero de meses no de años*/
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "notification", title: "Número de notificaciones", type: "int"},
        {name: "recommended", title: "Recomendados", type: "int"}, /*Es el ranking = 10, cuando el ranking es igual a 10 se contabilizaPrioridad*/
        {name: "user", title: "Usuario", type: "string"}, //, dataSource: "User"
        {name: "created", title: "Fecha de creación", type: "date"},
        {name: "monthYearOld", title: "Longevidad del último año (en meses)", type: "int"}
    ]
};
eng.dataSources["Art_Search"] = {
    scls: "Art_Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "search",
    fields: [
        {name: "search", title: "Búsqueda", stype: "select", dataSource: "Search"},
        {name: "article", title: "Artículo", stype: "select", dataSource: "Article"},
        {name: "ranking", title: "Clasificación", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "status", title: "Estatus", type: "int"}/*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado*/

    ]
};
eng.dataSources["Report"] = {
    scls: "Report",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "search",
    fields: [
        {name: "search", title: "Búsqueda", stype: "select", dataSource: "Search"},
        {name: "comment", title: "Observaciones", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
    ]
};
eng.dataSources["Gene_Cancer"] = {
    scls: "Gene_Cancer",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    fields: [
        {name: "gene", title: "Gen", stype: "select", dataSource: "Gene"},
        {name: "cancer", title: "Cancer", stype: "select", dataSource: "CancerType"},
    ]
};
eng.dataSources["Configuration"] = {
    scls: "Configuration",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    fields: [
        {name: "rateUpdPubl", title: "Periodicidad para actualizar publicaciones", type: "int"},
        {name: "searchCreationMode", title: "Modo de creacion de busquedas", type: "string"}
    ]
};
eng.dataSources["Role"] = {
    scls: "Role",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "title",
    fields: [
        {name: "title", title: "Título", type: "string"},
    ]
};
eng.dataSources["User"] = {
    scls: "User",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "name",
    fields: [
        {name: "name", title: "Fullname", type: "string"},
        {name: "email", title: "Email", type: "string", required: true, validators: [{stype: "email"}]},
        {name: "password", title: "Password", type: "password", required: true},
        {name: "role", title: "Rol", stype: "select", dataSource: "Role"}, //stype: "select"

    ],
};
eng.dataProcessors["GeneProcessor"] = {
    dataSources: ["Gene"],
    actions: ["add"],
    request: function (request, dataSource, action)
    {
        var gen = request.data.symbol;
        if (gen != null && gen !== "") {
            var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
            var search = new esearch();
//            var StringArrayType = Java.type("java.lang.String[]");
//            var a = new StringArrayType(1);
//            var b = new StringArrayType(1);
//            a[0] = "symbol";
//            b[0] = gen;
//            var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
            //var isValid = utils.isValidObject("Gene", a, b, null, null);

            //if (isValid === true) {
            var defGen = search.getGeneInfo(gen);
            if (defGen !== null) {
                var obj = JSON.parse(defGen);
                if (request.data.symbol)
                    request.data.symbol = obj.gene.nomSymbol;
                if (obj.gene.nomName)
                    request.data.officialName = obj.gene.nomName;
                if (obj.gene.id)
                    request.data.mimId = obj.gene.id;
                if (obj.gene.sciName)
                    request.data.organism = obj.gene.sciName;
                if (obj.gene.altNames)
                    request.data.aliases = obj.gene.altNames;
                if (obj.gene.loc)
                    request.data.mapLocation = obj.gene.loc;
                if (obj.gene.summary)
                    request.data.summary = obj.gene.summary;
                var today = new Date();
                request.data.lastUpdate = today.toISOString();
            } else {
                request.data.symbol = null;
                request = null;
                dataSource = null;
                action = null;
                return;
            }
//            }
//            else {
//                request.data.symbol = null;
//                request = null;
//                dataSource = null;
//                action = null;
//                return;
//            }
        } else {
            request.data.symbol = null;
            request = null;
            dataSource = null;
            action = null;
            return;
        }
        return request; //
    }
};
eng.dataServices["GeneService"] = {
    dataSources: ["Gene"],
    actions: ["add"],
    service: function (request, response, dataSource, action)
    {
        if (response.data.symbol !== null && response.data._id !== null && response.data._id !== "") {
            var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
            var search = new esearch();
            var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
            var defDiseases = search.getDiseasesInfo(response.data.symbol);
            if (defDiseases !== null) {
                utils.setNewDisease(defDiseases, response.data._id);
                //utils.setUpdateDisease(defDiseases, "_suri:NanoPharmacy:Gene:56453514d501e2ac6ccea32c");
            }
        }

    }
};
eng.dataServices["UserService"] = {
    dataSources: ["User"],
    actions: ["remove"],
    service: function (request, response, dataSource, action)
    {
        var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
        if (request.data._id) {
            utils.removeUserData(request.data._id);
        }
    }
};
eng.dataServices["ConfigService"] = {
    dataSources: ["Configuration"],
    actions: ["update"],
    service: function (request, response, dataSource, action)
    {
        var taskRestart = Java.type("org.nanopharmacy.listener.TaskRestarter");
        taskRestart.reprogramAutoUpdate();
    }
};
eng.dataServices["SearchService"] = {//, "update"
    dataSources: ["Search"],
    actions: ["add", "remove"],
    service: function (request, response, dataSource, action)
    {
        if (action == "add") {
            if (response.data._id !== null && response.data._id !== "" && response.data.gene !== null &&
                    response.data.gene !== "" && response.data.altMolecular !== null &&
                    response.data.altMolecular !== "") {
                var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                var gene = this.getDataSource("Gene").fetchObjById(response.data.gene).symbol;
                var altMolecular = this.getDataSource("AlterationMolecular").
                        fetchObjById(response.data.altMolecular).name;
                print("years: " + response.data.artYearsOld);
                var res = utils.getPublication(response.data.artYearsOld, gene, altMolecular,
                        response.data._id, response.data.gene, response.data.altMolecular);
                if (res !== null) {
                    var jsonArt = JSON.parse(res);
                    if (jsonArt.error != null) {
                        this.getDataSource("Search").removeObjById(response.data._id);
                        response.status = -2;
                        if ("COMMUNICATION_PROBLEM".equals(jsonArt.error.error)) {
                            response.msgError = "A communications error happened, please try again later";
                        } else if ("NO_INFO_FOUND".equals(jsonArt.error.error)) {
                            response.msgError = "No information was found for your search scheme";
                        } else if ("EXECUTION_ERROR".equals(jsonArt.error.error)) {
                            response.msgError = "An execution error happened while gathering information for your search scheme";
                        }
                    } else {
                        response.data.notification = jsonArt.notification;
                        response.data.recommended = jsonArt.recommended;
                    }
                }
            }
            return request;
        } else if (action == "remove") {
            if (request.data._id) {
//                print("Borrando")
                var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                utils.removeSchemeData(request.data._id);
            }
        }/* else if(action == "update") {
            if (response.data._id !== null && response.data._id !== "" && response.data.gene !== null &&
                    response.data.gene !== "" && response.data.altMolecular !== null &&
                    response.data.altMolecular !== "") {
                var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                var gene = this.getDataSource("Gene").fetchObjById(response.data.gene).symbol;
                var altMolecular = this.getDataSource("AlterationMolecular").
                        fetchObjById(response.data.altMolecular).name;
                utils.testSaveUpdateArticles(gene, altMolecular, response.data._id);
            }
            return request;
        }*/
    }
};
eng.dataSources["Images"] = {
    scls: "Images",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "title",
    fields: [
        {name: "title", title: "Title", type: "string"},
        {name: "text", title: "Description", type: "string"},
        {name: "src", title: "Url", multiple: false, stype: "file", required: true},
        {name: "link", title: "Link", type: "string"},
    ]
};
eng.dataProcessors["ImagesProcessor"] = {
    dataSources: ["Images"],
    actions: ["remove"],
    request: function (request, dataSource, action)
    {
        var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
        if (request.data._id) {
            utils.removeImages(request.data._id);
        }
    }
};
eng.dataSources["Analize"] = {
    scls: "Analize",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "key",
    fields: [
        {name: "search", title: "Search", stype: "select", dataSource: "Search"},
        {name: "key", title: "Key", type: "string",
            validators: [
                {
                    type: "isUnique",
                    errorMessage: "This keyword is already in search."
                }
            ]},
        {name: "frequency", title: "Frequency", type: "int"},
        {name: "threshold", title: "Threshold", type: "int"},
        {name: "addByUser", title: "Add by user", type: "int"}
    ]
};

eng.dataServices["Analize_Service"] = {
    dataSources: ["Analize"],
    actions: ["add"],
    service: function (request, response, dataSource, action)
    {
        if(request.data.addByUser == 1) {
            var newRecommended = 0;
            var utils = Java.type("org.nanopharmacy.ai.Analizer");
            newRecommended = utils.userReclassifyArticle( request.data.search);
            response.data.newRecommended = newRecommended;
        }
    }
};


eng.dataServices["Art_SearchService"] = {
    dataSources: ["Art_Search"],
    actions: ["update"],
    service: function (request, response, dataSource, action)
    {
        var newRecommended = 0;
        if (request.data.status == 2) {
            var utils = Java.type("org.nanopharmacy.ai.Analizer");
            newRecommended = utils.analizer(request.data.search, request.data.article);
        } else if(request.data.status == 3){
            var utils = Java.type("org.nanopharmacy.ai.Analizer");
            utils.analyzeRejected(request.data.search, request.data.article);
        }
        response.data.newRecommended = newRecommended;
    }
};

eng.dataSources["Glossary"] = {
    scls: "Glossary",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "key",
    fields: [
        {name: "key", title: "Término", type: "string",
            validators: [
                {
                    type: "isUnique",
                    errorMessage: "This keyword is already in glossary."
                }
            ]},
        {name: "definition", title: "Definicion", type: "string"}
    ]
};
eng.validators["email"] = {type: "regexp", expression: "^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$", errorMessage: "No es un correo electrÃ³nico vÃ¡lido"};
