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
                        if (isValid === null)
                            return false;
                    },
                    errorMessage: "The gene was not found on NCBI data bases, please check the spelling."
                },
                {type: "isUnique", //serverCustom del lado del servidor
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
        {name: "name", title: "Nombre de la alteración molecular", type: "string", validators: [{type: "isUnique", errorMessage: "The molecular alteration already exists."}]},
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
        {name: "name", title: "Nombre del tipo de cáncer", type: "string", validators: [{type: "isUnique", errorMessage: "The disease already exists."}]},
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
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["Search"] = {
    scls: "Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    displayField: "gene",
    fields: [
        {name: "gene", title: "Gen", stype: "select", dataSource: "Gene", validators: [{
                    type: "serverCustom", //serverCustom del lado del servidor
                    serverCondition: function (name, value, request) {
                        var StringArrayType = Java.type("java.lang.String[]");
                        var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                        var IntegerArrayType = Java.type("int[]");

                        var a = new StringArrayType(2);
                        var b = new StringArrayType(2);
                        a[0] = "gene";
                        a[1] = "altMolecular";

                        var c = new StringArrayType(1);
                        var d = new IntegerArrayType(1);
                        c[0] = "artYearsOld";
                        d[0] = request.data.artYearsOld;

                        //var idGene = utils.getIdProperty("Gene", "symbol", request.data.gene);//Valida el simbolo del gen
                        //var idAltMolecular = utils.getIdProperty("AlterationMolecular", "name", request.data.altMolecular);//Valida el nombre de la alteración molecular
                        b[0] = request.data.gene;//idGene;
                        b[1] = request.data.altMolecular;//idAltMolecular;
                        var isValid = utils.isValidObject("Search", a, b, c, d);
                        if (isValid)
                            return true;
                        else
                            return false;
                    },
                    errorMessage: "Búsqueda de Gen, Alteración Molecular y año ya realizada"
                }]},
        {name: "altMolecular", title: "Alteración Molecular", stype: "select", dataSource: "AlterationMolecular"},
        {name: "artYearsOld", title: "Longevidad de pulicaciones", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "notification", title: "Número de notificaciones", type: "int"},
          {name: "recommended", title: "Recomendados", type: "int"} /*Es el ranking = 10, cuando el ranking es igual a 10 se contabilizaPrioridad*/
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
        {name: "rateUpdPubl", title: "Periodicidad para actualizar publicaciones", type: "int"}
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
        {name: "email", title: "Email", type: "string", required: true, validators:[{stype:"email"}]},
        {name: "password", title: "Password", type: "password", required: true},
        {name: "role", title: "Rol", stype: "select", dataSource:"Role"},//stype: "select"
        
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

            var StringArrayType = Java.type("java.lang.String[]");
            var a = new StringArrayType(1);
            var b = new StringArrayType(1);
            a[0] = "symbol";
            b[0] = gen;
            var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
            var isValid = utils.isValidObject("Gene", a, b, null, null);
            
            if (isValid === true) {
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
            }
            else {
                request.data.symbol = null;
                request = null;
                dataSource = null;
                action = null;
                return;
            }
        } else {
            request.data.symbol = null;
            request = null;
            dataSource = null;
            action = null;
            return;
        }
        return request;//
    }
};

eng.dataSources["Configuration"] = {
    scls: "Configuration",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",
    fields: [
        {name: "rateUpdPubl", title: "Periodicidad para actualizar publicaciones", type: "string"}
    ]
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

eng.dataServices["SearchService"] = {
    dataSources: ["Search"],
    actions: ["add"],
    service: function (request, response, dataSource, action)
    {
        if (response.data._id !== null && response.data._id !== "" && response.data.gene !== null &&
                response.data.gene !== "" && response.data.altMolecular !== null &&
                response.data.altMolecular !== "") {
            var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
            var search = new esearch();
            var gene = this.getDataSource("Gene").fetchObjById(response.data.gene).symbol;
            var altMolecular = this.getDataSource("AlterationMolecular").
                    fetchObjById(response.data.altMolecular).name;

            var dataArt = search.getPublicationsInfo(gene, altMolecular, response.data.artYearsOld, 0);//
            if (dataArt !== null) {
                var jsonArt = JSON.parse(dataArt);
                if (jsonArt.outstanding != null) {
                    var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                    var res = utils.saveNewArticles(dataArt, response.data._id);
                    var temp = new Array();
                    temp = res.split(",");
                    if (temp !== null && temp.length === 2) {
                        response.data.notification = parseInt(temp[0]); 
                        response.data.recommended = parseInt(temp[1]); 
                    }
                } else if (jsonArt.error != null) {
                    //print("En error!!!" + jsonArt.error.error)
                    this.getDataSource("Search").removeObjById(response.data._id);
                    response.status = -2;
                    if ("COMMUNICATION_PROBLEM".equals(jsonArt.error.error)) {
                        response.msgError = "A communications error happened, please try again later";
                    } else if ("NO_INFO_FOUND".equals(jsonArt.error.error)) {
                        response.msgError = "No information was found for your search scheme";
                    }
                }
            }
        }
        return request;
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

eng.validators["email"] = {type:"regexp", expression:"^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$",errorMessage:"No es un correo electrónico válido"};
