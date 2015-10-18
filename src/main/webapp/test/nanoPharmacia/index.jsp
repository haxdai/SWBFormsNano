<%-- 
    Document   : index
    Created on : 17/10/2015, 05:54:40 PM
    Author     : martha.jimenez
--%>

<%@page import="org.json.JSONArray"%>
<%@page import="org.nanopharmacy.eutility.impl.ESearchImpl"%>
<%@page import="org.jdom.xpath.XPath"%>
<%@page import="org.nanopharmacy.utils.Utils"%>
<%@page import="org.jdom.JDOMException"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.net.HttpURLConnection"%>
<%@page import="java.net.URL"%>
<%@page import="org.jdom.Document"%>
<%@page import="java.net.ProtocolException"%>
<%@page import="java.net.MalformedURLException"%>
<%@page import="org.nanopharmacy.eutility.impl.UseHistoryException"%>
<%@page import="org.nanopharmacy.eutility.impl.NoDataException"%>
<%@page import="java.io.IOException"%>
<%@page import="org.json.JSONException"%>
<%@page import="java.util.Date"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.semanticwb.datamanager.DataObject"%>
<%@page import="org.semanticwb.datamanager.SWBDataSource"%>
<%@page import="org.semanticwb.datamanager.SWBScriptEngine"%>
<%@page import="org.semanticwb.datamanager.DataMgr"%>
<%@page import="org.jdom.Element" %>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    if (request.getParameter("mode").equalsIgnoreCase("addGene")) {
        DataObject dataObject = addGene(request);
        out.println(dataObject);
    }
    //DataObject user = (DataObject) session.getAttribute("_USER_");

%>
<%/*SWBDataSource ds=engine.getDataSource("Pais");
    
     //Fetch
     DataObject query=new DataObject();
     DataObject data=new DataObject();
     query.put("data", data);
     data.put("abre", "mx");
    
     DataObject obj=ds.fetch(query);
    
     out.println(obj);
     //out.println(obj.getDataObject("response").getDataList("data").getDataObject(0).getString("nombre"));
    
     //Add    
     DataObject newobj=new DataObject();
     newobj.put("nombre","jei5");
     newobj.put("abre","jj");    
     out.println(newobj);
     newobj=ds.addObj(newobj).getDataObject("response").getDataObject("data");
     out.println(newobj);
    
     //Update
     newobj.put("nombre","jei6");
     newobj=ds.updateObj(newobj).getDataObject("response").getDataObject("data");
     out.println(newobj);
    
     //Remove
     out.println(ds.removeObjById(newobj.getId()));    */

%>
<%!
    private DataObject addGene(HttpServletRequest request) throws JSONException, NoDataException, UseHistoryException, IOException {
        SWBScriptEngine engine = DataMgr.getUserScriptEngine("/test/NanoSources.js", null, false);
        String gen = (String) request.getParameter("gen");
        System.out.println("gen: " + gen);
        //String altMolecular = (String) request.getParameter("altMolecular");
        ESearchImpl esearch = new ESearchImpl();
        DataObject newobj = new DataObject();
        //try {
        JSONObject data;
        data = esearch.getGeneInfo(gen);
        if (data != null && data.length() > 0) {
            JSONObject data1 = data.getJSONObject("gene");
            String nomSymbol = data1.get("nomSymbol").toString();
            String nomName = data1.get("nomName").toString();
            String mimId = data1.get("id").toString();
            String organism = data1.get("sciName").toString();
            String aliases = data1.get("altNames").toString();
            String mapLocation = data1.get("loc").toString();
            String summary = data1.get("summary").toString();
            SWBDataSource ds = engine.getDataSource("Gene");
            
            newobj.put("symbol", nomSymbol);
            newobj.put("officialName", nomName);
            newobj.put("mimId", mimId);
            newobj.put("organism", organism);
            newobj.put("aliases", aliases);
            newobj.put("mapLocation", mapLocation);
            newobj.put("summary", summary);
            newobj.put("lastUpdate", new Date());
            //out.println(newobj);
            newobj = ds.addObj(newobj).getDataObject("response").getDataObject("data");
            //out.println(newobj);
        }
        return newobj;
    }
%>