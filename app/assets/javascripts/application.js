// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery.ui.all
//= require jquery_ujs
//= require dataTables/jquery.dataTables
//= require dataTables/jquery.dataTables.bootstrap

//= require twitter/bootstrap
//= require_tree .

 $(function() {
   $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
    
      
   });



/* Table initialisation */
$(document).ready(function() {
  $('#example').dataTable( {
    "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
    "sPaginationType": "bootstrap",    
    "iDisplayLength": 5,
    "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
     "oLanguage": {
      "sLengthMenu": "_MENU_ records per page"

    }

  } );
} );



function clearDate() {
  document.getElementById('todate').value = "";
  document.getElementById('fromdate').value = "";
}

function calcBusinessDays(dDate1, dDate2) { // input given as Date objects
  var iWeeks, iDateDiff, iAdjust = 0;
  if (dDate2 < dDate1){ alert('Please enter valid date!'); clearDate(); return 0;}// error code if dates transposed

  var iWeekday1 = dDate1.getDay(); // day of week
  var iWeekday2 = dDate2.getDay();
  iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
  iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
  if ((iWeekday1 > 5) && (iWeekday2 > 5)) iAdjust = 1; // adjustment if both days on weekend
  iWeekday1 = (iWeekday1 > 5) ? 5 : iWeekday1; // only count weekdays
  iWeekday2 = (iWeekday2 > 5) ? 5 : iWeekday2;

  // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
  iWeeks = Math.floor((dDate2.getTime() - dDate1.getTime()) / 604800000)

    if (iWeekday1 <= iWeekday2) {
      iDateDiff = (iWeeks * 5) + (iWeekday2 - iWeekday1)
    } else {
      iDateDiff = ((iWeeks + 1) * 5) - (iWeekday1 - iWeekday2)
    }

  iDateDiff -= iAdjust // take into account both days on weekend
    if (isNaN(iDateDiff))  { return 0; }
  return (iDateDiff + 1); // add 1 because dates are inclusive
}

$(function() {
  $('.datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
  $(document).ready(function () {
    $("#noOfDays").val(calcBusinessDays(new Date($("#fromdate").val()),new Date($("#todate").val())));
    $(".date").change(function(){
      $("#noOfDays").val(calcBusinessDays(new Date($("#fromdate").val()),new Date($("#todate").val())));
    });
    $(".date").datepicker({
      changeMonth:true,
      changeYear:true,
      dateFormat:'MM dd,yy'
    });
  });

});





