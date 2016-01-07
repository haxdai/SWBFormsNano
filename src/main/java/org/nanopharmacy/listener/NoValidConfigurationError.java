package org.nanopharmacy.listener;

/**
 * Indica que un error en la configuracion de la aplicacion ha ocurrido, esta situacion
 * es anormal, debido a que un problema de configuracion de este tipo solo podria darse
 * durante la instalacion de la aplicacion.
 * @author jose.jimenez
 */
public class NoValidConfigurationError extends Error {
    
    
    public NoValidConfigurationError() {
        super();
    }
    
    /**
     * Indica que se ha encontrado un problema de configuracion en la aplicacion
     * @param msg especifica la razon del problema encontrado
     */
    public NoValidConfigurationError(String msg) {
        super(msg);
    }
}
