
(function($) {
    "use strict";
    /*==============================
        Is mobile
    ==============================*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    /*==============================
        Image cover
    ==============================*/
    $.fn.imageCover = function() {
        $(this).each(function() {
            var self = $(this),
                image = self.find('img'),
                heightWrap = self.outerHeight(),
                widthImage = image.outerWidth(),
                heightImage = image.outerHeight();
            if (heightImage < heightWrap) {
                image.css({
                    'height': '100%',
                    'width': 'auto'
                });
            }
        });
    }
    /*==============================
        Overflow text
    ==============================*/
    $.fn.numberLine = function(opts) {
        $(this).each( function () {
            var $this = $(this),
            defaults = {
                numberLine: 0
            },
            data = $this.data(),
            dataTemp = $.extend(defaults, opts),
            options = $.extend(dataTemp, data);

            if (!options.numberLine)
                return false;
            
            $this.bind('customResize', function(event) {
                event.stopPropagation();
                reInit();
            }).trigger('customResize');
            $(window).resize( function () {
                $this.trigger('customResize');
            })
            function reInit() {
                var fontSize = parseInt($this.css('font-size')),
                    lineHeight = parseInt($this.css('line-height')),
                    overflow = fontSize * (lineHeight / fontSize) * options.numberLine;
                    
                $this.css({
                    'display': 'block',
                    'max-height': overflow,
                    'overflow': 'hidden'
                });
            }
        })
    }
    

    function inputPlaceholder() 
    {
        var $ph = $('input[type="search"], input[type="text"], input[type="email"], textarea');
        $ph.each(function() {
            var value = $(this).val();
            $(this).focus(function() {
                if ($(this).val() === value) {
                    $(this).val('');
                }
            });
            $(this).blur(function() {
                if ($(this).val() === '') {
                    $(this).val(value);
                }
            });
        });
    }

    function owlCarouselSlider() {
        var navslider = ['<i class="fa fa-angle-left"></i>', '<i class="fa  fa-angle-right"></i>'];
        if ($('.featured-slider').length > 0) {
            $('.featured-slider').owlCarousel({
                autoPlay: 10000,
                slideSpeed: 800,
                navigation: true,
                pagination: true,
                singleItem: true,
                autoHeight: true,
                addClassActive: true,
                navigationText: navslider, 
            });
            $(window).on('resize', function() {
                setTimeout(function() {
                    var windowWidth = $(window).width(),
                        itemFeaturedWidth = $('.featured-slider').find('.item-content').width(),
                        setOwlNavWidth = (windowWidth - itemFeaturedWidth) / 2;
                    $('.featured-slider').find('.owl-next, .owl-prev').css('width', setOwlNavWidth);
                }, 100);
            }).trigger('resize');
        }
        if ($('.widget-slider').length > 0) {
            $('.widget-slider').owlCarousel({
                autoPlay: false,
                slideSpeed: 300,
                navigation: true,
                pagination: false,
                singleItem: true,
                autoHeight: true,
                navigationText: navslider, 
            });
        }
    }


    function backgroundImage() 
    {
        var section = $('.background-image');
        section.each(function() {
            if ($(this).attr('data-background-image')) {
                var bg = $(this).attr('data-background-image');
                $(this).css('background-image', 'url(' + bg + ')');
            }
        });
    }

    function instagramFeed()
    {
        var userFeed = new Instafeed({
            get: 'user',
            userId: 1341331859,
            accessToken: '1341331859.cf0499d.ebaeadf8c32143588a1c588533afc5c0',
            limit: 6,
            template: '<div class="item"><a href="{{link}}" target="_blank"><img src="{{image}}" /></a></div>'
        });
        userFeed.run();
    }


    function subToggle() {
        if ($('.menu-list').find('.submenu-toggle').length === 0) {
            $('.menu-item-has-children')
                .children('a')
                .after(
                        '<span class="submenu-toggle">\
                            <i class="fa fa-angle-right"></i>\
                        </span>\
                    ');
            $('.menu-list').on('click', '.submenu-toggle', function(evt) {
                evt.preventDefault();
                $(this)
                    .siblings('.sub-menu')
                    .addClass('sub-menu-active');
            });
        }
    }
    function submenuBack() {
        $('.menu-list .sub-menu').each(function() {
            var $this = $(this);
            if ($this.find('.back-mb').length === 0) {
                $this
                    .prepend(
                            '<li class="back-mb">\
                                <a href="#">\
                                    <i class="fa fa-angle-left"></i>Back\
                                </a>\
                            </li>\
                        ');
            }
            $('.menu-list').on('click', '.back-mb a', function(evt) {
                evt.preventDefault();
                $(this)
                    .parent()
                    .parent()
                    .removeClass('sub-menu-active');
            });
        });
    }


    function tiledGallery() {
        if ($('.tiled-gallery').length) {
            var tiledItemSpacing = 4;
            $('.tiled-gallery').wrap('<div class="tiled-gallery-row"></div>');
            $('.tiled-gallery').parent().css('margin', -tiledItemSpacing);
            $('.tiled-gallery').justifiedGallery({
                rowHeight: 230,
                lastRow : 'justify',
                margins: tiledItemSpacing
            });
        }
    }

    function popup() {
        $('.tiled-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'pp-gallery mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            },
        });
    }

    function socialAndsearch() {
        $('.toggle-social').on('click', function() {
            $('.page-social').fadeIn(500);
        });

        $('.page-social-close').on('click', function() {
            $('.page-social').fadeOut(500);
        });

        $('.toggle-search').on('click', function() {
            $('.page-search').fadeIn(500);
        });

        $('.page-search-close').on('click', function() {
            $('.page-search').fadeOut(500);
        });
    }

    function subToggle() {
        if ($('.pi-menulist').find('.submenu-toggle').length === 0) {
            $('.menu-item-has-children')
                .children('a')
                .after('<span class="submenu-toggle"><i class="fa fa-angle-right"></i></span>');
            $('.pi-menulist').on('click', '.submenu-toggle', function(evt) {
                evt.preventDefault();
                $(this)
                    .siblings('.sub-menu')
                    .addClass('sub-menu-active');
            });
        }
    }
    function submenuBack() {
        $('.pi-menulist .sub-menu').each(function() {
            var $this = $(this);
            if ($this.find('.back-mb').length === 0) {
                $this
                    .prepend('<li class="back-mb"><a href="#">Back</a></li>');
            }
            $('.pi-menulist').on('click', '.back-mb a', function(evt) {
                evt.preventDefault();
                $(this)
                    .parent()
                    .parent()
                    .removeClass('sub-menu-active');
            });
        });
    }

    function responsiveMenu() {

        $('.toggle-menu').on('click', function() {
            $(this).toggleClass('toggle-active');
            $('.pi-navigation').toggleClass('pi-navigation-active');
        });

        $(window).resize(function() {
            var windowWidth = window.innerWidth;
            if (windowWidth <= 991) {
                subToggle();
                submenuBack();
            } else {
                $('.submenu-toggle, .back-mb').remove();
            }
        });
    }
    
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'];

    function renderSite(data) {
        data = $.xml2json(data);
        var posts = data.channel.item;

        renderLatestArticles(posts);
    }

    function renderLatestArticles(posts) 
    {
        var $parent = $('.latest-posts.widget-list');
        if(!$parent) {return};

        for(var i = 0; i < Math.min(posts.length, 5); i++) 
        {
            var p = posts[i],
                featuredImage = '',
                date = new Date(p.pubDate), 
                dateStr, 
                $a;
            
            if ( typeof p.content != 'undefined' )
            {
                featuredImage = '<div class="item-image"><div class="image-cover"><a href="' + p.link + '"><img src="'+p.content.url+'" alt="'+p.title+'"></div></div>';
            }
            

            date = new Date(p.pubDate), dateStr, $a;
            dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
            $a = $('<div class="item">'+featuredImage+'<div class="item-content"><h3 class="item-title" data-number-line="2"><a href="' + p.link + '">'+p.title+'</a></h3><span class="item-meta">' + dateStr + '</span></div></div></div>');
            if(i == 4) 
            {
                $a.addClass('last');
            }
            $parent.append($a);
        }

        $parent.find(".loading, .loader").remove();
        $('[data-number-line]').numberLine();
    }

    function renderTags()
    {
        var $control = $(".tagcloud"), _aTags = [];

        if ( $control.find("li").length > 0 )
        {

            $control.find("li a").each(function(){
                if ( $.inArray($(this).attr("href"), _aTags) != -1 )
                {
                    $(this).parent().remove();
                }else{
                    _aTags.push($(this).attr("href"));
                }
                console.log(_aTags);
            })
        }
    }


    $(document).ready(function() {
        backgroundImage();
        tiledGallery();
        popup();
        socialAndsearch();
        responsiveMenu();
        owlCarouselSlider();

        $('.pi-grid .post-entry p').numberLine({
            numberLine: 4
        });
        $('.pi-list .post-entry p').numberLine({
            numberLine: 3
        });

        if (isMobile.iOS()) {
            $('[data-background-image]')
                .addClass('fix-background-ios');
        }

        $('.pi-grid').find('.pi-content').wrapInner('<div class="pi-row"></div>');
        $('.pi-grid').find('.post').wrap('<div class="pi-grid-item"></div>');



        if ($('.pi-sidebar').length) {
            if (!$('.main-content').hasClass('pi-grid-first-large')) {
                $('.pi-grid').find('.pi-grid-item:nth-child(2n+1)').css('clear', 'both');
            } else {
                $('.pi-grid').find('.pi-grid-item:nth-child(2n)').css('clear', 'both');
            }
        }

        $("#search-keyword").ghostHunter({
            results   : "#search-result",
            onKeyUp   : true
        });

        $.ajax({
            dataType: 'xml',
            url: '/rss',
            type: 'GET'
        }).success(renderSite);
        renderTags();
        instagramFeed();
    });

    $(window).load(function() {
        inputPlaceholder();
        $('.preloader').fadeOut(1200);
        $('.image-cover, .images-slider .item, .pi-grid .pi-content .images, .pi-list .pi-content .images, .post-link ~ .images').imageCover();
    });

    
})(jQuery);