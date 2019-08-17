$(document).ready(function() {
    $(window).bind('scroll', function() {
        var navHeight = 1;
        if ($(window).scrollTop() > navHeight) {
            $('header .navbar').addClass('fixed');
        }
        else {
            $('header .navbar').removeClass('fixed');
        }
    });

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
});
