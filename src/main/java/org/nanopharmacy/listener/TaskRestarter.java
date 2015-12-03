package org.nanopharmacy.listener;

/**
 * Reutiliza los recursos existentes para programar la ejecucion de la actualizacion
 * de los esquemas de busqueda existentes.
 * @author jose.jimenez
 */
public class TaskRestarter {
    
    
    /**
     * Reinicia la tarea programada para ejecutar la actualizacion de los esquemas 
     * de busqueda existentes en la base de datos, de acuerdo al numero de dias configurado.
     */
    public static void reprogramAutoUpdate() {
        
        Scheduler scheduler = Scheduler.getInstance();
        scheduler.cancel();
        scheduler.purge();
        scheduler.programTask();
    }

    
}
