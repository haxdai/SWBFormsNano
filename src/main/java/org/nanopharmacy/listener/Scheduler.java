package org.nanopharmacy.listener;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Timer;

/**
 * Clase de una unica instancia para la ejecucion de la tarea programada para hacer llamadas
 * al API Entrez de forma programada
 * @author jose.jimenez
 */
public class Scheduler extends Timer {
    
    private static Scheduler unique;

    private Scheduler() {
    }
    
    public static Scheduler getInstance() {
        
        if (unique == null) {
            unique = new Scheduler();
        }
        return unique;
    }
    
    public void programTask() {
        
        //En base a la hora actual se calcula el tiempo que falta para que den las 12 de la noche
        Date now = new Date(System.currentTimeMillis());
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:SSz");
        System.out.println("   --- Ejecutando Tarea Programada: " + format.format(now));
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(now);
        int am_pm = calendar.get(Calendar.AM_PM); //AM = 0; PM = 1
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int seconds = calendar.get(Calendar.SECOND);
        int missingHours = 24 - hour + 1;  //se suma 1 porque la hora de ejecucion es la 1:00 am
        int missingMinutes = 60 - minutes;
        int missingSeconds = 60 - seconds;
        System.out.println("Para la 1:00 am faltan:\n" + missingHours + " horas\n" + missingMinutes + " minutos\n" + missingSeconds + " segundos\n");
        long delay = missingSeconds * 1000 + missingMinutes * 60000 + missingHours * 3600000; //en milisegundos
        //this.scheduleAtFixedRate(new SearchTask(), delay, period); Implementar este
        this.schedule(new SearchTask(), 30000, 30000);
    }
}
