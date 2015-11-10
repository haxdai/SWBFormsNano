package org.nanopharmacy.listener;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.TimerTask;
import org.json.JSONObject;
import org.semanticwb.datamanager.DataList;
import org.semanticwb.datamanager.DataMgr;
import org.semanticwb.datamanager.DataObject;
import org.semanticwb.datamanager.SWBDataSource;
import org.semanticwb.datamanager.SWBScriptEngine;
import org.nanopharmacy.eutility.impl.*;
import org.nanopharmacy.utils.Utils;

/**
 * Ejecuta las peticiones a las bases de datos del NCBI para actualizar la informacion de los 
 * articulos relacionados a las busquedas creadas por los usuarios con respecto a genes y alteraciones
 * moleculares.
 * @author jose.jimenez
 */
public class SearchTask extends TimerTask {

    /**
     * numero de dias adicionales al periodo de frecuencia con que se actualiza la informacion de los articulos de las busquedas
     */
    private static int PIQUITO = 15;
    
    @Override
    public void run() {
        Date now = new Date(System.currentTimeMillis());
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:SSz");
        DateFormat dbFormat = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println("------------- Ejecutando Tarea Programada: " + format.format(now));
        SWBScriptEngine engine = DataMgr.getUserScriptEngine("/test/NanoSources.js", null, false);
        SWBDataSource dsSearch = engine.getDataSource("Search");
        SWBDataSource dsGene = engine.getDataSource("Gene");
        SWBDataSource dsMA = engine.getDataSource("AlterationMolecular");
        DataObject query = new DataObject();
        DataObject data = new DataObject();
        query.put("data", data);
        
        try {
            //Se obtienen todas las busquedas en BD, para actualizar sus resultados
            DataObject resultSet = dsSearch.fetch(query);
            int rows = resultSet.getDataObject("response").getInt("totalRows");
            if (rows > 0) {
                DataList documentList = resultSet.getDataObject("response").getDataList("data");
                Iterator it = documentList.iterator();
                while (it.hasNext()) {
                    DataObject search = (DataObject) it.next();
                    String geneId = search.getString("gene");
                    String molAltId = search.getString("altMolecular");
                    String since = search.getString("lastUpdate");
                    String searchId = search.getString("_id");
                    Date lastUpdate = null;
                    int daysFromLastUpdate = 0;
                    try {
                        lastUpdate = dbFormat.parse(since);
                        daysFromLastUpdate = this.dateDiff(lastUpdate, now) + SearchTask.PIQUITO;
                    } catch (ParseException pe) {
                        daysFromLastUpdate = 30 + SearchTask.PIQUITO;
                    }
                    String geneSymbol = null;
                    String molAlteration = null;
                    //Se obtienen los alias de la alteracion molecular
                    DataObject queryMA = new DataObject();
                    DataObject dataMA = new DataObject();
                    dataMA.put("_id", molAltId);
                    queryMA.put("data", dataMA);
                    DataObject resultSetMA = dsMA.fetch(queryMA);
                    if (resultSetMA.getDataObject("response").getInt("totalRows") > 0) {
                        DataObject molAlter = resultSetMA.getDataObject("response").getDataList("data").getDataObject(0);
                        molAlteration = molAlter.getString("name");
                        molAlteration += molAlter.containsKey("aliases") ? ("," + molAlter.getString("aliases")) : "";
                    }
                    //Se obtiene el simbolo del gen
                    DataObject queryGene = new DataObject();
                    DataObject dataGene = new DataObject();
                    dataGene.put("_id", geneId);
                    queryGene.put("data", dataGene);
                    
                    DataObject resultSetGene = dsGene.fetch(queryGene);
                    if (resultSetGene.getDataObject("response").getInt("totalRows") > 0) {
                        DataObject geneInDB = resultSetGene.getDataObject("response").getDataList("data").getDataObject(0);
                        geneSymbol = geneInDB.getString("symbol");
                    }
                    
                    System.out.println("\n---Solicitar informacion de NCBI para:\n   gen: " +
                            geneSymbol + "\n   alteracion: " + molAlteration +
                            "\n   fecha: " + since + "\n   num. dias: " + daysFromLastUpdate);
                    ESearchImpl entrez = new ESearchImpl();
                    try {
                        JSONObject articles2Update = entrez.getPublicationsInfo(geneSymbol, 
                                molAlteration.replaceAll(" ", ""), 0, daysFromLastUpdate);
                        if (articles2Update.getJSONArray("outstanding").length() > 0 ||
                                articles2Update.getJSONArray("rejected").length() > 0) {
                            Utils.ENG.saveUpdateArticles(articles2Update, searchId);
                        }
                    } catch (NoDataException nde) {
                        System.out.println("Tarea programada - No se encontro informacion para actualizar. " + nde.getMessage());
                    } catch (UseHistoryException uhe) {
                        System.out.println("Tarea programada - Problema con la extraccion de informacion. " + uhe.getMessage());
                    }
                }
                
            }
        } catch (IOException ioe) {
            System.out.println("Tarea programada - Problema con lectura de info en BD. " + ioe.getMessage());
        }
    }
    
    /**
     * Calcula la diferencia en dias entre las dos fechas proporcionadas, sin importar el orden de las mismas
     * @param fechaInicial la primer fecha en la comparacion
     * @param fechaFinal la segunda fecha en la comparacion
     * @return el numero de dias que hay de diferencia entre las dos fechas
     */
    private int dateDiff(Date fechaInicial, Date fechaFinal) {

        DateFormat df = DateFormat.getDateInstance(DateFormat.MEDIUM);
        String fechaInicioString = df.format(fechaInicial);
        try {
            fechaInicial = df.parse(fechaInicioString);
        } catch (ParseException ex) {
        }

        String fechaFinalString = df.format(fechaFinal);
        try {
            fechaFinal = df.parse(fechaFinalString);
        } catch (ParseException ex) {
        }

        long fechaInicialMs = fechaInicial.getTime();
        long fechaFinalMs = fechaFinal.getTime();
        long diferencia = Math.abs(fechaFinalMs - fechaInicialMs);
        double dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        return ((int) dias);
    }
    
}
