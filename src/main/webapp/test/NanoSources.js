/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
eng.dataSources["Gene"] = {
    scls: "Gene",/*Equivale al nombre de la tabla*/
    modelid: "NanoPharmacy",/*Es equivalente al nombre de la BD*/
    dataStore: "mongodb",    
    displayField: "symbol",
    fields: [
        {name: "symbol", title: "Simbolo Oficial", required: true, type: "string"},
        {name: "officialName", title: "Nombre oficial", type: "string"},
        {name: "mimId", title: "Número identificador", type: "int"},
        {name: "organism", title: "Organismo", type: "string"},
        {name: "aliases", title: "Nombres alternos", type: "string" },
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
        {name: "gene", title: "Gen", stype: "select", dataSource:"Gene"},
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
        {name: "conceptId", title: "Id", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"}
    ]
};

eng.dataSources["Article"] = {
    scls: "Article",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "title",
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
        {name: "gene", title: "Gen", stype: "select", dataSource:"Gene"},
        {name: "altMolecular", title: "Alteración Molecular", stype: "select", dataSource:"AlterationMolecular"},
        {name: "artYearsOld", title: "Longevidad de pulicaciones", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "notificaction", title: "Número de notificaciones", type: "int"},
          {name: "recommended", title: "Recomendados", type: "int"} /*Es el ranking = 10, cuando el ranking es igual a 10 se contabilizaPrioridad*/
    ]
};

eng.dataSources["Art_Search"] = {
    scls: "Art_Search",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "search",
    fields: [
        {name: "search", title: "Búsqueda", stype: "select", dataSource:"Search"},
        {name: "article", title: "Artículo", stype: "select", dataSource:"Article"},
        {name: "ranking", title: "Clasificación", type: "int"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
        {name: "status", title: "Estatus", type: "int"}/*0 - Sin clasificar, 1 - Nuevo, 2 - Aceptado, 3 - Rechazado*/
        
    ]
};

eng.dataSources["Gene_Cancer"] = {
    scls: "Gene_Cancer",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    fields: [
        {name: "gene", title: "Gen", stype: "select", dataSource:"Gene"},
        {name: "cancer", title: "Cancer", stype: "select", dataSource:"CancerType"},
    ]
};

eng.dataSources["Report"] = {
    scls: "Report",
    modelid: "NanoPharmacy",
    dataStore: "mongodb",    
    displayField: "search",
    fields: [
        {name: "search", title: "Búsqueda", stype: "select", dataSource:"Search"},
        {name: "comment", title: "Observaciones", type: "string"},
        {name: "lastUpdate", title: "Ultima actualización", type: "date"},
    ]
};

eng.dataProcessors["GeneProcessor"] = {
    dataSources: ["Gene"],
    actions: ["add"],
    request: function(request, dataSource, action)
    {
        
        print("Anted de guardar")
        print("request1:" + request);
        print("action:" + dataSource);
        print("action:" + action);
        //if(request.data.name)request.data.name=request.data.name+"_jei";
       
        return request;
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
    service: function(request, response, dataSource, action)
    {
       print("Despues de guardar")
        print("request:" + request);
        print("response:" + response);
        print("dataSource:" + dataSource);
        print("action:" + action);
 
        return response;
    }
};