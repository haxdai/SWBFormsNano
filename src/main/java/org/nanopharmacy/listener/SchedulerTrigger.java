package org.nanopharmacy.listener;

import java.util.TimerTask;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Programa la ejecucion de las peticiones automaticas a la API Entrez para
 * recuperar la informacion de los articulos correspondientes a los esquemas de
 * busqueda registrados.
 * @author jose.jimenez
 */
@WebListener
public class SchedulerTrigger implements ServletContextListener  {
    
    
    static Logger log = Logger.getLogger(SchedulerTrigger.class.getName());
    

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        
        Scheduler scheduler = Scheduler.getInstance();
        scheduler.programTask();
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        
        System.out.println("Cancelando ejecucion de tareas programas ...");
        Scheduler scheduler = Scheduler.getInstance();
        scheduler.cancel();
        scheduler.purge();
    }
}
