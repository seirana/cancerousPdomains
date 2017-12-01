<?php
// function searchJson($obj, $field, $value) {
//     foreach($obj as $item) {
//         foreach($item as $child) {
//             if(isset($child->$field) && stristr($child->$field , $value)) {

//         if ($hint=="") {
//           $hint="<a href='#' target='_blank'>" . 
//           $child->$field  "</a>";
//         } else {
//           $hint=$hint . "<br /><a href='#' target='_blank'>" . 
//           $child->$field  . "</a>";
//         }
//             }
//         }
//     }
//     return null;
// }

// function console_log( $data ){
  // echo 'alert("dd umd");';
// }
// console_log( "myvar" );

$json_url = "js/proteinCoding.json";
$json = file_get_contents($json_url);
$json = json_decode($json, true);


// // $xmlDoc=new DOMDocument();

// // $x=$xmlDoc->getElementsByTagName('link');
$x=$json;

// //get the q parameter from URL
$q=$_GET["q"];
$t=$_GET["t"];


if (strlen($q)>0) {
  $hint="";
  $col = "";
  if ($t == "0"){
    $col = "UniProt ID";
  } elseif ($t == "1") {
    $col = "HGNC ID";
  } elseif ($t == "2") {
    $col = "Approved Symbol";
    
  } elseif ($t == "3") {
    $col = "UCSC ID ";
    
  } elseif ($t == "4") {
    $col = "Ensembl ID ";
    
  } elseif ($t == "5") {
    $col = "RefSeq IDs";
    
  }
  foreach($x as $item) {
      if(isset($item[$col]) && stristr($item[$col] , $q)) {

        if ($hint=="") {
          $hint="<a onclick=getItem('". $item['UniProt ID'] ."') >" . 
          $item[$col] . "</a>";
        } else {
          $hint=$hint . "<br /><a  onclick=getItem('". $item['UniProt ID'] ."')>" . 
          $item[$col] . "</a>";
        }
      }
  }
}

// // Set output to "no suggestion" if no hint was found
// // or to the correct values
if ($hint=="") {
  $response="no suggestion";
} else {
  $response=$hint;
}

// //output the response
echo $response;
?>