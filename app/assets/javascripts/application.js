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
//= require jquery-tablesorter/
//= require jquery_ujs
//= require twitter/bootstrap

//= require_tree .

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

$(function(){

  // define pager options
  var pagerOptions = {
    // target the pager markup - see the HTML block below
    container: $(".pager"),
    // output string - default is '{page}/{totalPages}'; possible variables: {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
    output: '{startRow} - {endRow} / {filteredRows} ({totalRows})',
    // if true, the table will remain the same height no matter how many records are displayed. The space is made up by an empty
    // table row set to a height to compensate; default is false
    fixedHeight: true,
    // remove rows from the table to speed up the sort of large tables.
    // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
    removeRows: false,
    // go to page selector - select dropdown that sets the current page
    cssGoto:   '.gotoPage'
  };

  // Initialize tablesorter
  // ***********************
  $("table")
    .tablesorter({
      theme: 'blue',
      headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
      widthFixed: true,
      widgets: ['zebra', 'filter']
    })

    // initialize the pager plugin
    // ****************************
    .tablesorterPager(pagerOptions);

    // Add two new rows using the "addRows" method
    // the "update" method doesn't work here because not all rows are
    // present in the table when the pager is applied ("removeRows" is false)
    // ***********************************************************************
    var r, $row, num = 50,
      row = '<tr><td>Student{i}</td><td>{m}</td><td>{g}</td><td>{r}</td><td>{r}</td><td>{r}</td><td>{r}</td><td><button class="remove" title="Remove this row">X</button></td></tr>' +
        '<tr><td>Student{j}</td><td>{m}</td><td>{g}</td><td>{r}</td><td>{r}</td><td>{r}</td><td>{r}</td><td><button class="remove" title="Remove this row">X</button></td></tr>';
    $('button:contains(Add)').click(function(){
      // add two rows of random data!
      r = row.replace(/\{[gijmr]\}/g, function(m){
        return {
          '{i}' : num + 1,
          '{j}' : num + 2,
          '{r}' : Math.round(Math.random() * 100),
          '{g}' : Math.random() > 0.5 ? 'male' : 'female',
          '{m}' : Math.random() > 0.5 ? 'Mathematics' : 'Languages'
        }[m];
      });
      num = num + 2;
      $row = $(r);
      $('table')
        .find('tbody').append($row)
        .trigger('addRows', [$row]);
    });

    // Delete a row
    // *************
    $('table').delegate('button.remove', 'click' ,function(){
      var t = $('table');
      // disabling the pager will restore all table rows
      t.trigger('disable.pager');
      // remove chosen row
      $(this).closest('tr').remove();
      // restore pager
      t.trigger('enable.pager');
    });

    // Destroy pager / Restore pager
    // **************
    $('button:contains(Destroy)').click(function(){
      // Exterminate, annhilate, destroy! http://www.youtube.com/watch?v=LOqn8FxuyFs
      var $t = $(this);
      if (/Destroy/.test( $t.text() )){
        $('table').trigger('destroy.pager');
        $t.text('Restore Pager');
      } else {
        $('table').tablesorterPager(pagerOptions);
        $t.text('Destroy Pager');
      }
    });

    // Disable / Enable
    // **************
    $('.toggle').click(function(){
      var mode = /Disable/.test( $(this).text() );
      $('table').trigger( (mode ? 'disable' : 'enable') + '.pager');
      $(this).text( (mode ? 'Enable' : 'Disable') + 'Pager');
    });
    $('table').bind('pagerChange', function(){
      // pager automatically enables when table is sorted.
      $('.toggle').text('Disable');
    });

});


