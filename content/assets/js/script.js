/* Author: 

*/
var imprintVisible = false;
var lightBeige     = "#fbf6f1";
var darkBeige      = "#f7ebdf";

function replaceHeart() {
  $('*:contains("❤"):last').html($('*:contains("❤"):last').text().replace("❤", "<span id='heart'>❤</span>"))
};
  
function addWrapperClasses(section) {
  $("."+section+"_wrapper:last").addClass('last')
  $("."+section+"_wrapper:first").addClass('first')
};
  
function setActiveMenuItem(id) {
  $('#nav>li').removeClass('active');
  $('#nav>li#nav_'+id).addClass('active');
};
function setupScrollToSection(section) {
  offset = -140;
  
  if (window.innerWidth <= 768) {
    offset = -230;
  };
  if (section == 'home') {
    $('#logo').click(function() {
      event.preventDefault();
      scrollToSection(section)
    })
  };
  
  $('#nav_'+section).click(function(event) {
    event.preventDefault();
    scrollToSection(section)
  })
  
};
function scrollToSection(section) {
  $.scrollTo( $('.'+ section +':first'), 300, {offset:{top: getTopOffset()}});
  // console.log( {offset:{top: getTopOffset()}})  
};

function createTabs() {
  $('dl').addClass('clearfix')
 
  
  $.each($('.writing_services dl>dt, .additional_services dl>dt'), function(key, tab) {
    $(tab).wrapInner('<span/>');
  })
  
  $.each($('.writing_services dl, .additional_services dl'), function(key, element) {
    $(element).find('span').click(function(event) {
      $(event.target).parent().siblings('dt').andSelf().removeClass('active');
      $(this).parent().addClass('active');
      index = $.inArray($(this).parent()[0], $(event.target).parent().siblings('dt').andSelf())
      if (index != -1) {
        tabContents = $($(event.target).parent().siblings('dd'));
        $.each(tabContents, function(tabKey, tabContent) {
            if (tabKey == index) {
             $(tabContent).removeClass('hidden')
            }else{
              $(tabContent).addClass('hidden')
            }
        })
      };
    })
    
    var definitionListHeights = [];
    definitionListHeights.push($(element).outerHeight())
    
    $.each($(element).find('dd'), function(key, element) {
     definitionListHeights.push($(element).outerHeight())
    })
    // $('dd').addClass('hidden')
    $(element).height(Math.max.apply(Math, definitionListHeights)+10)
    $(element).find('dd:not(:first)').addClass('hidden')
    // $(element).find('dd').first().removeClass('hidden');
    $(element).find('dt').first().addClass('active');


  });


  // $.each($(element).find('dd'), function(key, element) {
  //  definitionListHeights.push($(element).outerHeight())
  // })
  
  // if ($('dd').hasClass('active')) {
  //   $('dd').addClass('hidden');
  // };
  
};

function getTopOffset() {
  padding = $('body').css('padding-top');
  return padding.substring(0, padding.length -2 ) * -1
};

var roundedRect=function(ctx,x,y,width,height,radius,fill,stroke, tailPosition)
{
    ctx.save();	// save the context so we don't mess up others
    ctx.beginPath();

    // draw top and top right corner
    ctx.moveTo(x+radius,y+0.5);
    ctx.arcTo(x+width,y+0.5,x+width+0.5,y+radius,radius);
    
    if (tailPosition == "right") {
      ctx.lineTo(x+width+0.5, y+height/2-4+0.5)
      ctx.lineTo(x+width+4+0.5,y+height/2+0.5)
      ctx.lineTo(x+width+0.5,y+height/2+4+0.5)      
    };
    
    
    // ctx.quadraticCurveTo(x+width, y+height/2, x+width+5, y+height/2);
    // ctx.quadraticCurveTo(x+width, y+height/2, x+width, y+height/2+5);
    // ctx.arcTo(x+width+10, y+height/2, x+width+20, y+height/2, 8)
    // ctx.arcTo(x+width+10, y+height/2, x+width+20, y+height/2, 8)
    // ctx.lineTo(x+width+10, y+height/2)
    // ctx.lineTo(x+width, y+height/2+10)
            
            
    // draw right side and bottom right corner
    ctx.arcTo(x+width+0.5,y+height+0.5,x+width-radius,y+height+0.5,radius); 

    if (tailPosition == "bottom") {
      tailSize = 4;
      pixelPrecision = 0.5
      ctx.lineTo(x+width/2+tailSize+pixelPrecision,   y+height+pixelPrecision)
      ctx.lineTo(x+width/2+pixelPrecision,            y+height+pixelPrecision+tailSize)
      ctx.lineTo(x+width/2-tailSize+pixelPrecision,   y+height+pixelPrecision)
    };

    // draw bottom and bottom left corner
    ctx.arcTo(x-0.5,y+height+0.5,x+0.5,y+height-radius+0.5,radius);

    // draw left and top left corner
    ctx.arcTo(x+0.5,y-0.5,x+radius+0.5,y+0.5,radius);

    if(fill){
      ctx.fill();
    }
    if(stroke){
      ctx.stroke();
    }

    // ctx.shadowOffsetX = 10;
    // ctx.shadowOffsetY = 10;
    // ctx.shadowBlur = 10;
    // ctx.shadowColor = "black";
    // 
    ctx.restore();// restore context to what it was on entry
}

var drawBox = function(element, key, width, widthOffset, height, fillColor, strokeColor, tailPosition) {
        $(element).append('<canvas id="canvas'+key+'"></canvas>');

        var canvas=document.getElementById("canvas"+key);
        canvas.setAttribute('width', width+22);
        canvas.setAttribute('height', height+7);

        var context           = canvas.getContext('2d');

        context.strokeStyle   = strokeColor;
        context.fillStyle     = fillColor;
    
        context.lineWidth     = 1;
        context.shadowColor   = "#f"
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 10;

        roundedRect(context,1,0,width+widthOffset,height+1,4,true,true, tailPosition);
      };


$(document).ready(function(){
  replaceHeart()
  createTabs()
  sections    = ['home', 'writing_services', 'additional_services', 'our_clients', 'about_us', 'contact_us', 'imprint'];  
  
  $(".home>ol>li:last").addClass('lastChild')
  $(".our_clients li:last").addClass('lastChild')
  
  // checking if this is a pushstate url and scrolling to corresponding section
  currentPage = location.href.split("/")[location.href.split("/").length-1]
  index       = sections.indexOf(currentPage)
  if (index != -1) {
    // scrollToSection(currentPage);
    window.scrollTo(0,$('.'+currentPage+':first').offset().top+getTopOffset())
  };
  
  $.each(sections, function(key, section) {
    addWrapperClasses(section)    
    setupScrollToSection(section)
  })

  $('.wrapper').each(function(i) {
    var position = $(this).position();
    
    var offset = getTopOffset();

    $(this).scrollspy({
      min: position.top + offset,
      max: position.top + $(this).height() + offset,
      onEnter: function(element, position) {
        elementClass = $(element).attr('class').split(" ");
        section      = elementClass[0].substr(0,elementClass[0].length - "_wrapper".length)

        setActiveMenuItem(section)

        if (Modernizr.history) {
          if (section == "home") {
            // history.pushState(null, null, "/");
          }else{
            // history.pushState(null, null, section);
          }
        }
      },
      onLeave: function(element, position) {
      }
    });
  });
  
  // setup accordion
  // $('.imprint').hide();
  // $('.imprint h2').click(function(){
  //   if (imprintVisible) {
  //     $($('.imprint')[1]).slideUp();
  // 
  //     imprintVisible = false;
  //   }else{
  //     $($('.imprint')[1]).slideDown(300, function() {
  //       $.scrollTo( $('.imprint'), 300,  {offset:{top: -250}});
  //       imprintVisible = true;
  //     });
  // 
  // 
  //   }
  //   return false;
  // });
  

  width      = $('dl>dt').first().width()
  height     = $('dl>dt').first().height()
  
  // if canvas is supported, draw tabs with canvas
  if (Modernizr.canvas) {
    $.each($('.writing_services dl>dt, .additional_services dl>dt'), function(key, element) {
      if ($($(element).closest('article')).attr('class').search('writing_services') == 0) {
          drawBox(element, key, width, 13, height,darkBeige, '#D8C5B4', 'right')
      };
    
      if ($($(element).closest('article')).attr('class').search('additional_services') == 0) {
          drawBox(element, key, width, 13, height,lightBeige, '#D8C5B4', 'right')
      };

    })
  };
  
  
  
      // // <AREA> tags are invisible elements inside the DOM, 
      // // therefore to attach correctly a bubble popup to them, 
      // // we need to display and position <AREA> tags...
      // 
      $('area').css({ display: 'block'});
      $('area').offset({ top: $('img').offset().top, left: $('img').offset().left });
      $('area').each(function(key, value) {
        areaId     = $(this).attr('id').substring(3, $(this).attr('id').length)
        bubbleText = $(".about_us dt:contains('"+areaId+"')").next().text();
        
        xCoords = [];
        yCoords = [];
        $.each($(this).attr('coords').split(','), function(index, value) {
          if (index % 2) {
            yCoords.push(value)
          }else{
            xCoords.push(value)
          }
        })
        polyWidth   = Math.max.apply(Math, xCoords)-Math.min.apply(Math, xCoords);
        polyHeight  = Math.max.apply(Math, yCoords)-Math.min.apply(Math, yCoords);
        polyOriginX = Math.min.apply(Math, xCoords);
        polyOriginY = Math.min.apply(Math, yCoords)-548;
        
        bubble = $('<div></div>')
          .addClass("bubble")
          .attr('id', "bubble_"+$(this).attr('id'))
          .css({position:'absolute',top:polyOriginY-50+"px", left:polyOriginX+(polyWidth-210)/2+"px"})
          .appendTo($(this).parent())
          // .hide();

        $('<span></span>').text(bubbleText).appendTo(bubble);
        drawBox(bubble, "_about_us_"+key, bubble.width(),0, bubble.height(), darkBeige, '#D8C5B4', 'bottom')
      })

      $('area').mouseover(function() {
        areaID = $(this).attr('id');
        $('#bubble_'+areaID)
        .animate({
            opacity:1
        },500)

        
        
      })


      $('area').mouseleave(function() {
        areaID = $(this).attr('id');
        $('#bubble_'+areaID)
        .animate({
            opacity:0
        },300)
        
      })
      // 
      // //create bubble popups for each area tag and disable mouse events...
      // $('area').CreateBubblePopup({ innerHtmlStyle:       { color:'#FFFFFF', 'text-align':'center' },
      //                 themeName:          'orange',
      //                 themePath:          'img/bubble',
      //                 manageMouseEvents:  false 
      //                });
      // 
      // // all popups of <AREA> tags are invisible
      // $('area').data('visible', false);
      //     
      // //set a timer
      // var timer;
      //     
      // // add a customized mouseover event for each <AREA> tag...
      // $('area').mouseover(function(){
      //     
      //     clearTimeout(timer);
      //     
      //     if( !$(this).data('visible') ){
      //         
      //       // all popups must be invisible, but only this one is visible
      //       $('area').data('visible', false);
      //       $(this).data('visible', true);
      //           
      //       //hide all popups, update the innerHtml and show this popup
      //       $('area').HideAllBubblePopups();
      //       $(this).SetBubblePopupInnerHtml("lorem ipsum");
      //       $(this).ShowBubblePopup();
      //           
      //       //get <IMG> position and <AREA> coordinates...
      //       var img_position = $('img').offset();
      //       var img_top = parseInt(img_position.top);
      //       var img_left = parseInt(img_position.left);
      //       var area_x = parseInt($(this).attr('coords').split(',')[0]);
      //       var area_y = parseInt($(this).attr('coords').split(',')[1]);
      //       var bubble_width  = parseInt($('#'+$(this).GetBubblePopupID()).outerWidth(false));
      //       var bubble_height = parseInt($('#'+$(this).GetBubblePopupID()).outerHeight(false));
      //         
      //       //move the bubble popup to the <AREA> coordinates...
      //       $('#'+$(this).GetBubblePopupID()).css({ top: (area_y+img_top-bubble_height)+'px', left: (area_x+img_left-Math.abs(bubble_width/2))+'px' });
      //         
      //     };
      // });
      // 
      // //if the mouse leaves the <AREA>, wait 3 seconds then hide all bubble poups...
      // $('area').mouseleave(function(){
      // 
      //   if( $(this).data('visible') ){
      //     var seconds_to_wait = 3;
      //     function doCountdown(){
      //       timer = setTimeout(function(){
      //         seconds_to_wait--;
      //         if(seconds_to_wait > 0){
      //           doCountdown();
      //         }else{
      //           clearTimeout(timer);
      //           $('area').HideAllBubblePopups();
      //           $('area').data('visible', false);
      //         };
      //       },1000);
      //     };
      //     doCountdown();
      //   };
      //       
      // });
      

});


/* roundedRect(ctx,x,y,width,height,radius,fill,stroke)
   Arguments:  ctx - the context to be used to draw with.
         x,y - the top left corner
         width - how wide the rectangle
         height - how high the rectangle
         radius - the radius of the corner
         fill   - true if the rectangle should be filled
         stroke - true if the rectangle should be stroked */

