function showResult0(str) {
  if (str.length<=1) { 
    document.getElementById("livesearch0").innerHTML="";
    document.getElementById("livesearch0").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch0").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch0").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"0",true);
  xmlhttp.send();
}

function showResult1(str) {
  // if (str.length==0) { 
  if (str.length<=1) { 
    document.getElementById("livesearch1").innerHTML="";
    document.getElementById("livesearch1").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch1").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch1").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"1",true);
  // xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}

function showResult2(str) {
  // if (str.length==0) { 
  if (str.length<=1) { 
    document.getElementById("livesearch2").innerHTML="";
    document.getElementById("livesearch2").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch2").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch2").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"2",true);
  // xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}
function showResult3(str) {
  // if (str.length==0) { 
  if (str.length<=1) { 
    document.getElementById("livesearch3").innerHTML="";
    document.getElementById("livesearch3").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch3").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch3").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"3",true);
  // xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}
function showResult4(str) {
  // if (str.length==0) { 
  if (str.length<=1) { 
    document.getElementById("livesearch4").innerHTML="";
    document.getElementById("livesearch4").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch4").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch4").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"4",true);
  // xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}
function showResult5(str) {
  // if (str.length==0) { 
  if (str.length<=1) { 
    document.getElementById("livesearch5").innerHTML="";
    document.getElementById("livesearch5").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch5").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch5").style.border="1px solid #A5ACB2";
    }
  }
  xmlhttp.open("GET","livesearch.php?q="+str+"&t="+"5",true);
  // xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}