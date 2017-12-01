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
// // $xmlDoc->load("links.xml");

// // $x=$xmlDoc->getElementsByTagName('link');
$x=$json;

// //get the q parameter from URL
$q=$_GET["q"];

// foreach ($x as $value) {
  // echo "Peter is " . $value['UniProt ID'] . " years old.<br>";
    // echo "$value['UniProt ID'] <br>";
// }
  // foreach($json as $item) {
  //   echo $item->"UniProt ID";
  // }
// //lookup all links from the xml file if length of q>0

if (strlen($q)>0) {
  $hint="";
  foreach($x as $item) {
      if($item['UniProt ID'] == $q) {
          $hint="" . 
          json_encode( $item) . "";
      }
  }
}



//   // for($i=0; $i<($x->length); $i++) {
//   //   $y=$x->item($i)->getElementsByTagName('title');
//   //   $z=$x->item($i)->getElementsByTagName('url');
//   //   if ($y->item(0)->nodeType==1) {
//   //     //find a link matching the search text
//   //     if (stristr($y->item(0)->childNodes->item(0)->nodeValue,$q)) {
//   //       if ($hint=="") {
//   //         $hint="<a href='" . 
//   //         $z->item(0)->childNodes->item(0)->nodeValue . 
//   //         "' target='_blank'>" . 
//   //         $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
//   //       } else {
//   //         $hint=$hint . "<br /><a href='" . 
//   //         $z->item(0)->childNodes->item(0)->nodeValue . 
//   //         "' target='_blank'>" . 
//   //         $y->item(0)->childNodes->item(0)->nodeValue . "</a>";
//   //       }
//   //     }
//   //   }
//   // }
// // }

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