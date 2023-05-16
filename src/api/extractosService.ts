//post to a SOAP API
export const ExtractosServicePruebas = () => {
const http = require('http');
// var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');
var usuario = 'PAS'; //get the unprotected PAN from the form
var noise = '638145638047815499'; //get the data protection Format
var stringResult = '5d850181f475aee4315bdf9f49e41a13'; //get the data protection Format
var path = 'digitalizacion_documentos\\630343\\16032023\\114245_antecedentes_cuenta_basica-rodney paredes.pdf'; //get the data protection Format
var tipo = 'pdf'; //get the data protection Format

//Marshal up a ProtectFormattedData SOAP Mesage:
var soapRequest =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ext="http://10.1.1.191/extractosService.asmx">' + "\n" +
    '  <soapenv:Header/>' + "\n" +
    '  <soapenv:Body>' + "\n" +
    '     <ext:bajarArchivo>' + "\n" +
    '        <ext:usuario>' + usuario + '</ext:usuario>' + "\n" +
    '        <ext:noise>' + noise + '</ext:noise>' + "\n" +
    '        <ext:stringResult>' + stringResult + '</ext:stringResult>' + "\n" +
    '        <ext:path>' + path + '</ext:path>' + "\n" +
    '        <ext:tipo>' + tipo + '</ext:tipo>' + "\n" +
    '     </ext:bajarArchivo>' + "\n" +
    '  </soapenv:Body>' + "\n" +
    '</soapenv:Envelope>';

var options = {
    method: 'POST',
    url: 'http://10.6.2.134:10100/extractos.asmx',
    headers: {
        //'Content-Type': 'text/xml; charset=utf-8', is it this one or the follwing one?
        'Content-Type': 'text/xml'
    },
};

var req = http.request(options, function (res: any) {
    //TODO do something usefull with the response headers:
    // console.log('headers:\n' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk: any) {
        console.log('body:\n' + chunk);
    });
});

req.on('error', function (event: any) {
    console.log('problem with request: ' + event.message);
});

req.end();
}