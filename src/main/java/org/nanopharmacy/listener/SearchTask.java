package org.nanopharmacy.listener;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;
import org.semanticwb.datamanager.DataMgr;
import org.semanticwb.datamanager.DataObject;
import org.semanticwb.datamanager.SWBDataSource;
import org.semanticwb.datamanager.SWBScriptEngine;

/**
 *
 * @author jose.jimenez
 */
public class SearchTask extends TimerTask {

    @Override
    public void run() {
        Date now = new Date(System.currentTimeMillis());
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:SSz");
        System.out.println("   --- Ejecutando Tarea Programada: " + format.format(now));
        SWBScriptEngine engine = DataMgr.getUserScriptEngine("/test/NanoSources.js", null, false);
        SWBDataSource ds = engine.getDataSource("Search");
        DataObject query = new DataObject();
        DataObject data = new DataObject();
        //data.put("symbol", );
        query.put("data", data);
        try {
            DataObject resultSet = ds.fetch(query);
            int rows = resultSet.getDataObject("response").getInt("totalRows");
            if (rows > 0) {
                String lastUpdate = resultSet.getDataObject("response").getDataList(
                        "data").getDataObject(0).getString("lastUpdate");
                
            }
        } catch (IOException ioe) {
            
        }
    }
    
    
    
}
