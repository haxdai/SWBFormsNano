package org.nanopharmacy.listener;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.semanticwb.datamanager.DataList;
import org.semanticwb.datamanager.DataMgr;
import org.semanticwb.datamanager.DataObject;
import org.semanticwb.datamanager.SWBDataSource;
import org.semanticwb.datamanager.SWBScriptEngine;

/**
 * Solicita la programacion de la ejecucion de las peticiones automaticas a la API Entrez para
 * recuperar la informacion de los articulos correspondientes a los esquemas de
 * busqueda registrados. Ademas de generar en base de datos, los roles basicos, el usuario administrador
 * y las imagenes por defecto del carrusel, en caso de no existir.
 * @author jose.jimenez
 */
@WebListener
public class SchedulerTrigger implements ServletContextListener {

    /** Instancia del objeto para escribir en bitacora de la aplicacion */
    private static final Logger LOG = Logger.getLogger(SchedulerTrigger.class.getName());

    /**
     * Prepara la instancia de la aplicacion para su correcto funcionamiento. Solicita la ejecucion
     * de la programacion de la tarea que actualizara periodicamente las busquedas y crea en base de datos
     * registros de los roles, el usuario administrador e imagenes por defecto del carrusel, en caso de ser
     * necesario.
     * @param sce evento de contexto de la aplicacion
     */
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        
        try {
            Scheduler scheduler = Scheduler.getInstance();
            scheduler.programTask();
            SWBScriptEngine engine = DataMgr.getUserScriptEngine("/public/NanoSources.js", null, false);
            SWBDataSource dataUser = engine.getDataSource("User");
            SWBDataSource dataRole = engine.getDataSource("Role");
            SWBDataSource dataImages = engine.getDataSource("Images");
            DataObject query = new DataObject();
            DataObject data = new DataObject();
            //Add default roles
            //admin
            data.put("title", "admin");
            query.put("data", data);
            String idRoleAdmin = "";
            DataObject objRoleAdmin = dataRole.fetch(query);
            if (objRoleAdmin.getDataObject("response").getInt("totalRows") == 0) {
                objRoleAdmin = dataRole.add(query);
                idRoleAdmin = objRoleAdmin.getDataObject("response").getDataObject("data").getString("_id");
            } else {
                idRoleAdmin = objRoleAdmin.getDataObject("response").getDataList("data").getDataObject(0).getString("_id");
            }
            //user
            query = new DataObject();
            data = new DataObject();
            data.put("title", "user");
            query.put("data", data);
            DataObject objRoleUser = dataRole.fetch(query);
            if (objRoleUser.getDataObject("response").getInt("totalRows") == 0) {
                dataRole.add(query);
            }

            query = new DataObject();
            data = new DataObject();
            query.put("data", data);
            data.put("email", "admin@nanopharmacia.com");
            DataObject obj = dataUser.fetch(query);
            int i = obj.getDataObject("response").getInt("totalRows");
            if (i == 0) {
                data.put("name", "Admin"); // Password: nanoadmin
                data.put("password", "[SHA-512]4fbe3f711eec237a131cb3ef12803ab9762eebd64273684f88df2437da3dce4981a7a7275306a7aa2a3bfe66f8710a19e334f6c0b4cdd2bc259882deeffeb037");
                data.put("email", "admin@nanopharmacia.com");
                data.put("role", idRoleAdmin);
                dataUser.add(query);
            }
            //Images
            DataList imageSrc;
            DataObject dataImageSrc;

            //Si la instancia es nueva y no hay imagenes para el carrusel, se agregan
            obj = dataImages.fetch(query);
            if (obj.getDataObject("response").getInt("totalRows") == 0) {
                query = new DataObject();
                imageSrc = new DataList();
                dataImageSrc = new DataObject();
                data = new DataObject();
                dataImageSrc.put("size", 59316);
                dataImageSrc.put("name", "aurora-carrusel-vertical.jpg");
                dataImageSrc.put("id", "o_1a6ocpot0jpmfki1p46b9o1v7ec");
                dataImageSrc.put("type", "image/jpeg");
                imageSrc.add(dataImageSrc);
                data.put("title", "");
                data.put("text", "");
                data.put("link", "");
                data.put("src", imageSrc);
                query.put("data", data);
                obj = dataImages.add(query);
                
                query = null;
                query = new DataObject();
                imageSrc = new DataList();
                dataImageSrc = new DataObject();
                data = new DataObject();
                dataImageSrc.put("size", 57439);
                dataImageSrc.put("name", "aurora-carrusel-horizontal.jpg");
                dataImageSrc.put("id", "o_1a6ocrqnvs81clhj95keok09h");
                dataImageSrc.put("type", "image/jpeg");
                imageSrc.add(dataImageSrc);
                data.put("title", "Nanopharma");
                data.put("text", "");
                data.put("link", "nanopharmacia.com/");
                data.put("src", imageSrc);
                query.put("data", data);
                obj = dataImages.add(query);
                
                query = null;
                query = new DataObject();
                imageSrc = new DataList();
                dataImageSrc = new DataObject();
                data = new DataObject();
                dataImageSrc.put("size", 177210);
                dataImageSrc.put("name", "NanopharmaAzul.jpg");//cadena ADN
                dataImageSrc.put("id", "o_1a5d7gttb9ba16sotcr5b81goa7");
                dataImageSrc.put("type", "image/jpeg");
                imageSrc.add(dataImageSrc);
                data.put("title", "");
                data.put("text", "");
                data.put("link", "");
                data.put("src", imageSrc);
                query.put("data", data);
                obj = dataImages.add(query);
            }

            //
            /*query = new DataObject();
             src = new DataList();
             dataSrc = new DataObject();
             data = new DataObject();
             dataSrc.put("size", 177210);
             dataSrc.put("name","imagen-01.jpg" );
             dataSrc.put("id", "o_1a5d7gttb9ba16sotcr5b81goa7");
             dataSrc.put("type", "image/jpeg");
             src.add(dataSrc);
             data.put("title","Nanopharmacia");
             data.put("text","Nanopharmacia");
             data.put("link","");
             data.put("src", src);
             query.put("data", data);
             obj  = dataImages.fetch(query);
             if(obj.getDataObject("response").getInt("totalRows")==0){
             obj = dataImages.add(query);
             }*/

        } catch (IOException ex) {
            SchedulerTrigger.LOG.log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Cancela la ejecucion de la tarea programada antes de la destruccion del contexto de la aplicacion
     * @param sce evento del contexto de la aplicacion
     */
    @Override
    public void contextDestroyed(ServletContextEvent sce) {

        System.out.println("Cancelando ejecucion de tareas programas ...");
        Scheduler scheduler = Scheduler.getInstance();
        scheduler.cancel();
        scheduler.purge();
    }
}
