    /* Anchor Menu 
       zhuravlev.vu@yandex.ru 
       Version: 1.3
    */

        function AnchorMenu(){
            this.init();
        }
        AnchorMenu.prototype = {
            init: function(){
                this.$tplMenu = $('<ul class="anchor-menu"></ul>');
                //init data
                this.menuData = [];

                this.$anchor_menu = $('.anchor_menu');
                this.initElementsData();
                this.menuData.forEach(function(el,i){
                    if(typeof el.svg != 'undefined'){
                        var $li = $('<li data-target="'+el.target+'">'+el.svg+'<span>'+el.title+'</span></li>');
                    }else{
                        var $li = $('<li data-target="'+el.target+'"><img src="'+el.icon+'"><span>'+el.title+'</span></li>');
                    }
                    this.$tplMenu.append($li);
                }.bind(this));

                $('body').append(this.$tplMenu);

                this.addHandlers();
            },
            initElementsData: function(){
                this.$anchor_menu.each(function(i, el){
                    var $el = $(el);
                    var item = {};
                    item.el = el;
                    item.icon = $el.data('icon');
                    item.svg = $el.data('svg');
                    item.title = $el.data('title');
                    item.target = $el.data('target');

                    item.offsetTop = $el.offset().top;
                    item.height = $el.height();

                    this.menuData.push(item);
                }.bind(this));
            },
            updateElementsData: function(){
                this.menuData.forEach(function(el, i){
                    var $el = $(el.el);
                    el.offsetTop = $el.offset().top;
                    el.height = $el.height();
                });
                this.scrollCheck();
            },
            addHandlers: function(){
                $('.anchor-menu').on('click', 'li', this.scrollTop.bind(this));
                $(document).on('scroll', this.scrollCheck.bind(this));
                $(window).on('resize', this.updateElementsData.bind(this));
                $(window).on('load', this.updateElementsData.bind(this));
            },
            scrollTop: function(e){
                var $el = $(e.currentTarget);
                var thref = $el.data('target');
                var $target = $('body').find('.'+thref);
                if($target.length){
                    e.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: $target.offset().top-60
                    },1000);
                }
            },
            scrollCheck: function(e){
                this.menuData.forEach(function(el, i){
                    var scrollTop = $(document).scrollTop();
                    var elOffsetTop = el.offsetTop;
                    var elHeight = el.height;
                    var windowHeight = $(window).height();

                    if( (scrollTop + windowHeight / 2 > elOffsetTop) && 
                        (scrollTop + windowHeight / 2 < elOffsetTop + elHeight) ){
                        this.menuData[i].active = true;
                    }else{
                        this.menuData[i].active = false;
                    }
                }.bind(this));
                this.setActiveMenu();
            },
            setActiveMenu: function(){
                this.menuData.forEach(function(el, i){
                    if(el.active){
                        $('.anchor-menu li').eq(i).addClass('active');
                    }else{
                        $('.anchor-menu li').eq(i).removeClass('active');
                    }
                }.bind(this));
            }
        };

$(window).on('load', function(){
    if ( window.anchorMenu ) {
        window.anchorMenu = new AnchorMenu();
    }
});   
