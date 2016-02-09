
package gov.va.medora.mdws.querysvc;

/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;

/**
 * This class was generated by Apache CXF 2.1.3
 * Wed Jan 05 13:14:31 MST 2011
 * Generated source version: 2.1.3
 * 
 */

public final class QuerySvcSoap_QuerySvcSoap_Client {

    private static final QName SERVICE_NAME = new QName("http://mdws.medora.va.gov/QuerySvc", "QuerySvc");

    private QuerySvcSoap_QuerySvcSoap_Client() {
    }

    public static void main(String args[]) throws Exception {
        URL wsdlURL = QuerySvc.WSDL_LOCATION;
        if (args.length > 0) { 
            File wsdlFile = new File(args[0]);
            try {
                if (wsdlFile.exists()) {
                    wsdlURL = wsdlFile.toURI().toURL();
                } else {
                    wsdlURL = new URL(args[0]);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
      
        QuerySvc ss = new QuerySvc(wsdlURL, SERVICE_NAME);
        QuerySvcSoap port = ss.getQuerySvcSoap();  
        
        {
        System.out.println("Invoking match...");
        java.lang.String _match_target = "";
        gov.va.medora.mdws.querysvc.TaggedPatientArrays _match__return = port.match(_match_target);
        System.out.println("match.result=" + _match__return);


        }
        {
        System.out.println("Invoking select...");
        java.lang.String _select_dfn = "";
        gov.va.medora.mdws.querysvc.PatientTO _select__return = port.select(_select_dfn);
        System.out.println("select.result=" + _select__return);


        }
        {
        System.out.println("Invoking login...");
        java.lang.String _login_username = "";
        java.lang.String _login_pwd = "";
        java.lang.String _login_context = "";
        gov.va.medora.mdws.querysvc.UserTO _login__return = port.login(_login_username, _login_pwd, _login_context);
        System.out.println("login.result=" + _login__return);


        }
        {
        System.out.println("Invoking cprsUserLookup...");
        java.lang.String _cprsUserLookup_target = "";
        gov.va.medora.mdws.querysvc.UserArray _cprsUserLookup__return = port.cprsUserLookup(_cprsUserLookup_target);
        System.out.println("cprsUserLookup.result=" + _cprsUserLookup__return);


        }
        {
        System.out.println("Invoking connect...");
        java.lang.String _connect_sitelist = "";
        gov.va.medora.mdws.querysvc.DataSourceArray _connect__return = port.connect(_connect_sitelist);
        System.out.println("connect.result=" + _connect__return);


        }
        {
        System.out.println("Invoking getVHA...");
        gov.va.medora.mdws.querysvc.RegionArray _getVHA__return = port.getVHA();
        System.out.println("getVHA.result=" + _getVHA__return);


        }
        {
        System.out.println("Invoking userLookup...");
        java.lang.String _userLookup_duz = "";
        gov.va.medora.mdws.querysvc.UserTO _userLookup__return = port.userLookup(_userLookup_duz);
        System.out.println("userLookup.result=" + _userLookup__return);


        }
        {
        System.out.println("Invoking getVariableValue...");
        java.lang.String _getVariableValue_arg = "";
        gov.va.medora.mdws.querysvc.TextTO _getVariableValue__return = port.getVariableValue(_getVariableValue_arg);
        System.out.println("getVariableValue.result=" + _getVariableValue__return);


        }
        {
        System.out.println("Invoking ddrLister...");
        java.lang.String _ddrLister_file = "";
        java.lang.String _ddrLister_iens = "";
        java.lang.String _ddrLister_fields = "";
        java.lang.String _ddrLister_flags = "";
        java.lang.String _ddrLister_maxrex = "";
        java.lang.String _ddrLister_from = "";
        java.lang.String _ddrLister_part = "";
        java.lang.String _ddrLister_xref = "";
        java.lang.String _ddrLister_screen = "";
        java.lang.String _ddrLister_identifier = "";
        gov.va.medora.mdws.querysvc.TextArray _ddrLister__return = port.ddrLister(_ddrLister_file, _ddrLister_iens, _ddrLister_fields, _ddrLister_flags, _ddrLister_maxrex, _ddrLister_from, _ddrLister_part, _ddrLister_xref, _ddrLister_screen, _ddrLister_identifier);
        System.out.println("ddrLister.result=" + _ddrLister__return);


        }
        {
        System.out.println("Invoking setVha...");
        java.lang.String _setVha_sitesFileName = "";
        gov.va.medora.mdws.querysvc.SiteArray _setVha__return = port.setVha(_setVha_sitesFileName);
        System.out.println("setVha.result=" + _setVha__return);


        }
        {
        System.out.println("Invoking getVersion...");
        java.lang.String _getVersion__return = port.getVersion();
        System.out.println("getVersion.result=" + _getVersion__return);


        }
        {
        System.out.println("Invoking visitSite...");
        java.lang.String _visitSite_pwd = "";
        java.lang.String _visitSite_sitecode = "";
        java.lang.String _visitSite_userSitecode = "";
        java.lang.String _visitSite_userName = "";
        java.lang.String _visitSite_duz = "";
        java.lang.String _visitSite_ssn = "";
        java.lang.String _visitSite_context = "";
        gov.va.medora.mdws.querysvc.UserTO _visitSite__return = port.visitSite(_visitSite_pwd, _visitSite_sitecode, _visitSite_userSitecode, _visitSite_userName, _visitSite_duz, _visitSite_ssn, _visitSite_context);
        System.out.println("visitSite.result=" + _visitSite__return);


        }
        {
        System.out.println("Invoking siteHasPatch...");
        java.lang.String _siteHasPatch_patchId = "";
        gov.va.medora.mdws.querysvc.TaggedText _siteHasPatch__return = port.siteHasPatch(_siteHasPatch_patchId);
        System.out.println("siteHasPatch.result=" + _siteHasPatch__return);


        }
        {
        System.out.println("Invoking addDataSource...");
        java.lang.String _addDataSource_id = "";
        java.lang.String _addDataSource_name = "";
        java.lang.String _addDataSource_datasource = "";
        java.lang.String _addDataSource_port = "";
        java.lang.String _addDataSource_modality = "";
        java.lang.String _addDataSource_protocol = "";
        java.lang.String _addDataSource_region = "";
        gov.va.medora.mdws.querysvc.SiteTO _addDataSource__return = port.addDataSource(_addDataSource_id, _addDataSource_name, _addDataSource_datasource, _addDataSource_port, _addDataSource_modality, _addDataSource_protocol, _addDataSource_region);
        System.out.println("addDataSource.result=" + _addDataSource__return);


        }
        {
        System.out.println("Invoking disconnect...");
        gov.va.medora.mdws.querysvc.TaggedTextArray _disconnect__return = port.disconnect();
        System.out.println("disconnect.result=" + _disconnect__return);


        }
        {
        System.out.println("Invoking ddrGetsEntry...");
        java.lang.String _ddrGetsEntry_file = "";
        java.lang.String _ddrGetsEntry_iens = "";
        java.lang.String _ddrGetsEntry_flds = "";
        java.lang.String _ddrGetsEntry_flags = "";
        gov.va.medora.mdws.querysvc.TextArray _ddrGetsEntry__return = port.ddrGetsEntry(_ddrGetsEntry_file, _ddrGetsEntry_iens, _ddrGetsEntry_flds, _ddrGetsEntry_flags);
        System.out.println("ddrGetsEntry.result=" + _ddrGetsEntry__return);


        }
        {
        System.out.println("Invoking getFacadeVersion...");
        gov.va.medora.mdws.querysvc.TextTO _getFacadeVersion__return = port.getFacadeVersion();
        System.out.println("getFacadeVersion.result=" + _getFacadeVersion__return);


        }
        {
        System.out.println("Invoking sitesHavePatch...");
        java.lang.String _sitesHavePatch_sitelist = "";
        java.lang.String _sitesHavePatch_patchId = "";
        gov.va.medora.mdws.querysvc.TaggedTextArray _sitesHavePatch__return = port.sitesHavePatch(_sitesHavePatch_sitelist, _sitesHavePatch_patchId);
        System.out.println("sitesHavePatch.result=" + _sitesHavePatch__return);


        }

        System.exit(0);
    }

}