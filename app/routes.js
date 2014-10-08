Router.configure({
    layoutTemplate: 'layout_main',
    // loadingTemplate: 'layout_loading'
    // autoRender: false,
});
Router.onAfterAction(function(){
    var route = this;

    Meteor.setTimeout(function(){
        if($('main.content')[0])
            $("html, body").animate({ scrollTop: $('main.content').offset().top - 70 +'px'});


        // initiate slider
        if($('.iosslider')[0]) {
            $('.iosslider').iosSlider({
                snapToChildren: true,
                desktopClickDrag: true,
                keyboardControls: true,
                infiniteSlider: true,
                autoSlide: (route.route.name === 'videos') ? false : true,
                autoSlideHoverPause: true, // doenst work, made it manually
                navPrevSelector: '.iosslider button.absolute-left',
                navNextSelector: '.iosslider button.absolute-right',
                navSlideSelector: '.iosslider .slide-controls li > button',
                onSlideChange: slideChange,
                onSliderUpdate: slideChange
            });
        }
    }, 600);
});

// METHODS
/**
Method: Changes the slider

@method ((slideChange))
@param {Object} args  The callback data of the slider
**/
var slideChange = function (args) {
    var $slideControls = $(args.sliderContainerObject).find('.slide-controls');

    $slideControls.find('li > button').removeClass('active');
    $slideControls.find('li > button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('active');
};



Router.map(function() {
    this.route('home',{
        path: '/',
        template: 'none'
    });

    // row1
    this.route('about',{
        path: '/about',
        // template: 'none',
        yieldTemplates: {
            'about': {to: 'row1'}
        },
    });
    this.route('cv',{
        path: '/curriculum-vitae',
        // template: 'none',
        yieldTemplates: {
            'cv': {to: 'row1'}
        },
    });
    this.route('contact',{
        path: '/contact',
        // template: 'none',
        yieldTemplates: {
            'contact': {to: 'row1'}
        },
    });

    // row2
    this.route('architecture',{
        path: '/architecture',
        // template: 'none',
        yieldTemplates: {
            'architecture': {to: 'row2'}
        },
    });
    this.route('videos',{
        path: '/videos',
        // template: 'none',
        yieldTemplates: {
            'videos': {to: 'row2'}
        },
    });
    this.route('photography',{
        path: '/photography',
        // template: 'none',
        yieldTemplates: {
            'photography': {to: 'row2'}
        },
    });

});