<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php
header('Access-Control-Allow-Origin: *');
function obj2array($obj) {
    $out = array();
    foreach ($obj as $key => $val) {
        switch(true) {
            case is_object($val):
                $out[$key] = obj2array($val);
                break;
            case is_array($val):
                $out[$key] = obj2array($val);
                break;
            default:
                $out[$key] = $val;
        }
    }
    return $out;
}
    try {
        $client = new SoapClient("http://212.175.49.18/BorcSorgulama/Service.asmx?WSDL");
    } catch (Exception $e) {
        echo $e->getMessage();
    }



    if($_GET['suBorcAboneTB'])
    {
        $arguments->mnoNumber = $_GET['suBorcAboneTB'];
        $result = $client->BLD_SuBorc_Get( $arguments );
        $response = obj2array($result);
        $data = json_encode($response['BLD_SuBorc_GetResult']);

    }
    if($_GET['suKimlikTB'])
    {
        $arguments->kimlikNo = $_GET['suKimlikTB'];
        $result = $client->BLD_SuBorcKimlik_Get( $arguments );
        $response = obj2array($result);
        $data = json_encode($response['BLD_SuBorcKimlik_GetResult']);
        //var_dump($result);
    }

    if($_GET['emlakTgeTB'])
    {

        $arguments->tgeNumber = $_GET['emlakTgeTB'];
        $arguments->yil = 2013;
        $result = $client->BLD_EmlakBorc_Get( $arguments  );
        $response = obj2array($result);
        $data = json_encode($response['BLD_EmlakBorc_GetResult']);
        //var_dump($result);
    }

    if($_GET['emlakKimlikTB'])
    {

    $arguments->kimlikNo = $_GET['emlakKimlikTB'];
    $arguments->yil = 2013;
    $result = $client->BLD_EmlakBorcKimlik_Get($arguments);
    $response = obj2array($result);
    $data = json_encode($response['BLD_EmlakBorcKimlik_GetResult']);
    //var_dump($result);
    }


if(array_key_exists('callback', $_GET)){
    header('Content-Type: text/javascript; charset=utf8');
    header('Access-Control-Allow-Origin: http://umut.tekguc.info/');
    header('Access-Control-Max-Age: 3628800');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    $callback = $_GET['callback'];
    echo $callback.'('.$data.');';
}else{
// normal JSON string
    header('Content-Type: application/json; charset=utf8');
    echo $data;
}
?>