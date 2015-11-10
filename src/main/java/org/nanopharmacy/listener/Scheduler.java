package org.nanopharmacy.listener;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Timer;
import org.semanticwb.datamanager.DataMgr;
import org.semanticwb.datamanager.DataObject;
import org.semanticwb.datamanager.SWBDataSource;
import org.semanticwb.datamanager.SWBScriptEngine;

/**
 * Clase de una unica instancia para la ejecucion de la tarea programada para hacer llamadas
 * al API Entrez de forma programada
 * @author jose.jimenez
 */
public class Scheduler extends Timer {
    
    private static Scheduler uniqueInstance;

    private Scheduler() {
    }
    
    public static Scheduler getInstance() {
        
        if (uniqueInstance == null) {
            uniqueInstance = new Scheduler();
        }
        return uniqueInstance;
    }
    
    public void programTask() {
        
        //En base a la hora actual se calcula el tiempo que falta para que den las 12 de la noche
        Date now = new Date(System.currentTimeMillis());
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:SSz");
        System.out.println("\n   --- Ejecutando Tarea Programada: " + format.format(now));
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(now);
        int am_pm = calendar.get(Calendar.AM_PM); //AM = 0; PM = 1
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);
        int missingHours = 24 - hour;  //la hora de ejecucion es la 1:00 am
        int missingMinutes = 60 - minutes;
        int missingSeconds = 60 - seconds;
        System.out.println("Para la 1:00 am faltan:\n" + missingHours + " horas\n" + missingMinutes + " minutos\n" + missingSeconds + " segundos\n");
        //TODO: Buscar fecha de ultima actualizacion para programar la siguiente
        //      y la de periodicidad de actualizacion de las busquedas para compararlas
        SWBScriptEngine engine = DataMgr.getUserScriptEngine("/test/NanoSources.js", null, false);
        SWBDataSource dataSearch = engine.getDataSource("Search");
        SWBDataSource dataConf = engine.getDataSource("Configuration");
        DataObject query = new DataObject();
        DataObject data = new DataObject();
        String rateUpdate = null;
        String lastUpdate = null;
        //data.put("symbol", );
        query.put("data", data);
        query.put("limit", "1");
        try {
            //Se obtiene la frecuencia de actualizacion de las busquedas
            DataObject resultSet = dataConf.fetch(query);
            int rows = resultSet.getDataObject("response").getInt("totalRows");
            if (rows > 0) {
                rateUpdate = resultSet.getDataObject("response").getDataList(
                        "data").getDataObject(0).getString("rateUpdPubl");
                System.out.println("\nrateUpdate: " + rateUpdate);
            }
            //Se obtiene la fecha de ultima actualizacion de las busquedas
            resultSet = dataSearch.fetch(query);
            rows = resultSet.getDataObject("response").getInt("totalRows");
            if (rows > 0) {
                lastUpdate = resultSet.getDataObject("response").getDataList(
                        "data").getDataObject(0).getString("lastUpdate");
                System.out.println("\nlastUpdate: " + lastUpdate);
            }
        } catch (IOException ioe) {
            
        }
        if (rateUpdate != null && lastUpdate != null) {
            int daysInterval = Integer.parseInt(rateUpdate);
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            Date lastUpdateDay = null;
            int daysDifference = 0;
            try {
                lastUpdateDay = df.parse(lastUpdate);
            } catch (ParseException pe) {
                System.out.println("Fecha con formato no valido: " + lastUpdate);
            }
            if (lastUpdateDay != null) {
                daysDifference = this.dateDiff(lastUpdateDay, now);
                int daysToWait = (daysInterval - daysDifference) < 0 ? 0 : daysInterval - daysDifference;
                System.out.println("Dias a esperar por ejecucion: " + daysToWait);
                long delay = missingSeconds * 1000 + missingMinutes * 60000 + missingHours * 3600000; //en milisegundos
                delay += (daysToWait * 86400000); //dias * milisegundos en un dia
                long period = daysInterval * 86400000;
                System.out.println("delay: " + delay + "\nperiod: " + period);
                //this.scheduleAtFixedRate(new SearchTask(), delay, period); //TODO: quitar comentario a esta linea
                this.schedule(new SearchTask(), 10000, 3600000);
            }
        } else {
            System.out.println("No hay valores de fechas a comparar, no se programa tarea");
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
