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
            /*validators:[{type:"integerRange", min:5, max:15}]*/
            validators: [
            {
                type:"serverCustom",                                    //serverCustom del lado del servidor
                serverCondition:function(name,value,request){                    
                    print("name: " + name)
                    print("value: " + value);
                    print("request: " + request);
                    return false;
                },
                errorMessage:"Duplicado"
            }, {
                type:"serverCustom",                                    //serverCustom del lado del servidor
                serverCondition:function(name,value,request){                    
                    print("name: " + name)
                    print("value: " + value);
                    print("request: " + request);
                    return true;
                },
                errorMessage:"Gen no encontrado"
            }
        ]},
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
        {name: "name", title: "Nombre de la alteración molecular", type: "string"},
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
        {name: "name", title: "Nombre del tipo de cáncer", type: "string"},
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
        {name: "abstract", title: "Resumen del artículo", type: "string"},
        {name: "link", title: "Liga", type: "string"},
        {name: "reference", title: "Referencia", type: "string"},
        {name: "pmid", title: "Id PubMed", type: "int"},
        {name: "pmcid", title: "Id PMC", type: "int"},
        {name: "autor", title: "Autores", type: "string"},
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
        {name: "gene", title: "Gen", stype: "select", dataSource: "Gene"},
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

eng.dataProcessors["GeneProcessor"] = {
    dataSources: ["Gene"],
    actions: ["add"],
    request: function (request, dataSource, action)
    {
        var gen = request.data.symbol;

        if (gen != null && gen !== "") {
            var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
            var search = new esearch();

            var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
            var isValid = utils.isValidObject("Gene", "symbol", gen);

            if (isValid === true) {
                var defGen = search.getGeneInfo(gen);
                if (defGen !== null) {
                    var obj = JSON.parse(defGen);
                    if (request.data.symbol)
                        request.data.symbol = gen;
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
                } else {
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

eng.dataServices["GeneService"] = {
    dataSources: ["Gene"],
    actions: ["add"],
    service: function (request, response, dataSource, action)
    {
        if (response.data._id != null && response.data._id != "") {
            var esearch = Java.type("org.nanopharmacy.eutility.impl.ESearchImpl");
            var search = new esearch();

            var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
            var defDiseases = search.getDiseasesInfo(response.data.symbol);
            if(defDiseases != null) {
                utils.setNewDisease(defDiseases, response.data._id);
                //utils.setUpdateDisease(defDiseases, "_suri:NanoPharmacy:Gene:5639598afcfbfa9096d3e756");
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

            var dataArt = search.getPublicationsInfo(gene, altMolecular, response.data.artYearsOld);
            if (dataArt != null) {
                var utils = Java.type("org.nanopharmacy.utils.Utils.ENG");
                utils.saveNewArticles(dataArt,response.data._id);
                //utils.saveUpdateArticles(dataArt, "_suri:NanoPharmacy:Search:5632a99e3831a3e77b9ec2b3");//response.data._id
            }
        }
        return request;
    }
};