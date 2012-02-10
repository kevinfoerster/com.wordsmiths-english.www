/* Author: 

*/
$(document).ready(function(){
  // $('.writing_services>dl').tabs();
  // $('.additional_services>dl').tabs();
  function createTabs() {
    $('dl').addClass('clearfix')
    $('dd').addClass('hidden')
  
    $.each($('dl'), function(key, element) {
      $(element).find('dd').first().removeClass('hidden');
      $(element).find('dt').click(function(event) {
        index = $.inArray($(event.target)[0], $(event.target).siblings('dt').andSelf())
          tabContents = $($(event.target).siblings('dd'));
          $.each(tabContents, function(tabKey, tabContent) {
              if (tabKey == index) {
               $(tabContent).removeClass('hidden')
              }else{
                $(tabContent).addClass('hidden')
              }
          })
      })
    });
  };
  
  
  
  function replaceHeart() {
    $('*:contains("❤"):last').html($('*:contains("❤"):last').text().replace("❤", "<span id='heart'>❤</span>"))
  };
  
  function addWrapperClasses(section) {
    $("."+section+"_wrapper:last").addClass('last')
    $("."+section+"_wrapper:first").addClass('first')
  };
  
  addWrapperClasses("home")
  addWrapperClasses("writing_services")
  addWrapperClasses("additional_services")

  replaceHeart()
  createTabs()
});
