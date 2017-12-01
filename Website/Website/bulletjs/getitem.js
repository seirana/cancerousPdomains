function getItem(str) {
  if (str.length==0) { 
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
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
      newX = xmlhttp.responseText;
      newX=JSON.parse(newX);
      $('#Approved-Symbol').text(newX['Approved Symbol']);
      $('#UniProt-ID').text(newX['UniProt ID']);
      $('#strand').text(newX['strand']);
      $('#Chromosome').text(newX['Chromosome']);
      $('#Length').text(newX['Length']);
      $('#exonCount').text(newX['exonCount']);

      $('#rr').click();
      $('#ee').click();
      $('#ww').click();
      $('.searchinput').val('');

    console.log(newX);
    var output = '';
    for (var key in newX) {
      if (newX.hasOwnProperty(key)) {
        console.log(key + " -> " + newX[key]);
        output = output + '\r\n' + key + ',' + newX[key];
      }
    }
    $('#download_btn_2').attr("href", 'data:application/csv,'+encodeURIComponent(output));
    $('#download_btn_2').attr('download', newX['Approved Symbol']+'.csv');
      
      // document.getElementById("livesearch").innerHTML="";
      // document.getElementById("livesearch").style.border="0px";
      
      elements = document.getElementsByClassName("livesearch");
      for (var i = 0; i < elements.length; i++) {
          elements[i].innerHTML="";
          elements[i].style.border="0px";
      // document.getElementsByClassName("livesearch").style.border="0px";
      }
    return;
    }
  }
  xmlhttp.open("GET","getitem.php?q="+str,true);
  xmlhttp.send();
}
