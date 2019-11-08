    /* Анкор Меню */
    if ( window.anchorMenu ) {
        function AnchorMenu(){
            this.init();
        }
        AnchorMenu.prototype = {
            init: function(){
                this.$tplMenu = $('<ul class="anchor-menu"></ul>');
                //init data
                this.menuData = [];

                this.$anchor_menu = $('.anchor_menu');
                this.$anchor_menu.each(function(i, el){
                    var $el = $(el);
                    var item = {};
                    item.icon = $el.data('icon');
                    item.title = $el.data('title');
                    item.target = $el.data('target');
                    this.menuData.push(item);
                }.bind(this));

                this.menuData.forEach(function(el,i){
                    console.log(el,i);
                    var $li = $('<li data-target="'+el.target+'"><img src="'+el.icon+'"><span>'+el.title+'</span></li>');
                    this.$tplMenu.append($li);
                }.bind(this));

                $('body').append(this.$tplMenu);

                this.addHandlers();
            },
            addHandlers: function(){
                $('.anchor-menu').on('click', 'li', this.scrollTop.bind(this));
            },
            scrollTop: function(e){
                var $el = $(e.currentTarget);
                var thref = $el.data('target');
                var $target = $('body').find(thref);
                if($target.length){
                    e.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: $target.offset().top
                    },1000);
                }
            }
        };
        window.anchorMenu = new AnchorMenu();
    }