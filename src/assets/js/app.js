$(document).foundation();

/* Prevent Hash from URL for modals */
$('.fi-magnifying-glass').click(function(e){
   e.preventDefault();
});



/* Change input type of password when checked */
$('.login input[type=checkbox]').change( function(){
   if (this.checked) {
      $('.login #password').attr('type', 'text');
      // console.log('checked');
   } else {
      $('.login #password').attr('type', 'password');
      // console.log('un-checked');
   }
});



/* Custom header */
$( ".brands-parent" ).click(function(e) {
   e.preventDefault();
   $('#sub-nav').slideToggle(function(){
      $('.sticky').foundation('_calc', true);
   });
});
