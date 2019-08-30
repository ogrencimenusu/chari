$(document).ready(function() {

    var numbertype = $(".numbertype");
    $("#plus").click(function() {
        var value =+numbertype.val();
        numbertype.val(value + 1);
    });
    $("#minus").click(function() {
        var value=numbertype.val();
        numbertype.val(value - 1);
        if (value < 2){
            numbertype.val(1)
        }
    });



    $(window).bind('scroll', function() {
        headerFix();
    });
    $( window ).resize(function() {
        headerFix();
    });
    headerFix();


    function headerFix(){
        var scroll=$(window).scrollTop();

        var navHeight = $('header').outerHeight(true);

        if (scroll > 4) {
            $('body#header-1 header .navbar').addClass('fixed');
            $('body#header-2 header').addClass('fixed');
            $('body#header-2 main').css({'margin-top':navHeight+'px'});

        }
        else {
            $('body#header-1 header .navbar').removeClass('fixed');
            $('body#header-2 header').removeClass('fixed');
            $('body#header-2 main').css({'margin-top':'0px'});

        }
    }


    /* Card */
    $(document).on('click', '.media-delete a', function(){
        var index = $(this).data('id')
        cartItemsDelete(index);
    });
    $(document).on('click', '.addCartItem', function(){
        var id = $(this).data('id');
        var img = $(this).data('img');
        var title = $(this).data('title');
        var price = $(this).data('price');
        var count = $(this).data('count');
        var discount = $(this).data('discount');
        itemCreated(id,img,title,price,count,discount);

    });
    cartItemsPrice();
    cartItemCount();
    function itemCreated(id, img, title, price, count, discount) {
        var issetItem = $('.item-wrap .media[data-itemId='+id+']');
        if (issetItem.length == 0){
            $('.dropdown-cart').find('.cart-null').hide();
        }
        if (issetItem.length){
            var oldcount= parseInt(issetItem.find('.count .count-number').html());
            $(issetItem).find('.count .count-number').html(oldcount + 1)
        }else{
            var create="<div class='media' data-itemId='"+ id +"'>" +
                "<img class='media-img' src='assets/img/"+ img +"'>" +
                "<div class='media-body'>" +
                "<a class='title' href='#0'>" +
                title +
                "</a>"+
                "<p>" +
                "<span class='count'>" +
                "<span class='count-number'>"+ count +"</span>" +
                "x" +
                "</span>" +
                "<span class='price'>" +
                " $ <span class='price-number'>" +
                price +
                "</span>" +
                "</span>"+
                "<span class='discount'>" +
                " - <span class='discount-number'>"+discount +
                "</span>"+
                "% discount</span>" +
                "</p>"+
                "</div>" +
                "<div class='media-delete'>" +
                " <a href='#0' data-id='"+ id +"'>" +
                "<i class='uil uil-trash-alt'></i>" +
                "</a>" +
                "</div>"+
                "</div>" +
                "";
            $('.dropdown-cart .item-wrap').append(create)
        }
        cartItemsPrice();
        cartItemCount();
    }
    function cartItemsDelete(index) {
        $('.dropdown-cart').find('.media[data-itemId='+ index +']').slideUp(300,function () {
            $(this).remove();
            cartItemCount();
            cartItemsPrice();
        });
    }
    function cartItemsPrice() {
        var total = 0;
        $('.dropdown-cart').find('.media').each(function () {
            var item_price = parseFloat($(this).find('.price-number').text());
            var price_count= parseInt(parseFloat($(this).find('.count-number').text()));

            var discount = $(this).find('.discount-number').html();
            if (discount > 0){
                var old=(price_count * item_price) * discount /100;
                var newprice = (price_count * item_price) - old;

                total = total + newprice ;
            }else{
                total = total + (price_count * item_price);
            }
        });
        $('.dropdown-cart').find('.total .total-price-num').html(total);
    }
    function cartItemCount() {
        var cartItemLenght = $('.dropdown-cart').find('.media').length;
        $('header').find('.badges').html(cartItemLenght);
        if (cartItemLenght == 0){
            $('.dropdown-cart').find('.cart-null').show();
        }
    }


    /*---------- Page 404 */
    var mouseX = 0, mouseY = 0;
    $(document).mousemove(function(e){
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    // cache the selector
    var follower = $(".bounce-big");
    var follower2 = $(".bounce-small");
    var xp = 0, yp = 0;
    var loop = setInterval(function(){
        // change 12 to alter damping higher is slower
        xp += (mouseX - xp) / 100;
        yp += (mouseY - yp) / 100;
        follower.css({left:xp, top:yp});
        follower2.css({left:xp - 50, top:yp - 50});

    }, 30);
    /* Page 404 END ----------*/

    $('#deals .deals-wrap').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow:'<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow:'<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    });

});
