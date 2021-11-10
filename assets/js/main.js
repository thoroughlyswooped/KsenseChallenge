/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
function addElement() {

    // create a new div element
    //const newDiv = document.createElement("div");
    const newDiv = document.getElementsByClassName("tiles");

    // and give it some content
    const newContent = document.createTextNode("test!");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById('tiles');
    //document.body.insertBefore(newDiv, currentDiv);
}


(function($) {

    var $window = $(window),
        $body = $('body');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: ['361px', '480px'],
        xxsmall: [null, '360px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    $window.on('load', function() {
        //get users

        // const res = fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then((response) => response.json())
        //     .then((json) => console.log(json));
        // const json = res.json();
        // Object.entries(json).forEach(([key, value]) => {
        //     console.log(`${key}: ${value}`);
        // });

        (async() => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                headers: { Accept: 'application/json' },
            });
            const json = await res.json();
            Object.entries(json).forEach(([key, value]) => {
                console.log(`${key}:`);
                addElement();
            });
        })();


        function addElement() {
            // create a new div element
            const newDiv = document.createElement("div");

            // and give it some content
            const newContent = document.createTextNode("Hi there and greetings!");

            // add the text node to the newly created div
            newDiv.appendChild(newContent);

            // add the newly created element and its content into the DOM
            const currentDiv = document.getElementById("div1");
            document.body.insertBefore(newDiv, currentDiv);
        }
    });


    // Touch?
    if (browser.mobile)
        $body.addClass('is-touch');

    // Forms.
    var $form = $('form');

    // Auto-resizing textareas.
    $form.find('textarea').each(function() {

        var $this = $(this),
            $wrapper = $('<div class="textarea-wrapper"></div>'),
            $submits = $this.find('input[type="submit"]');

        $this
            .wrap($wrapper)
            .attr('rows', 1)
            .css('overflow', 'hidden')
            .css('resize', 'none')
            .on('keydown', function(event) {

                if (event.keyCode == 13 &&
                    event.ctrlKey) {

                    event.preventDefault();
                    event.stopPropagation();

                    $(this).blur();

                }

            })
            .on('blur focus', function() {
                $this.val($.trim($this.val()));
            })
            .on('input blur focus --init', function() {

                $wrapper
                    .css('height', $this.height());

                $this
                    .css('height', 'auto')
                    .css('height', $this.prop('scrollHeight') + 'px');

            })
            .on('keyup', function(event) {

                if (event.keyCode == 9)
                    $this
                    .select();

            })
            .triggerHandler('--init');

        // Fix.
        if (browser.name == 'ie' ||
            browser.mobile)
            $this
            .css('max-height', '10em')
            .css('overflow-y', 'auto');

    });

    // Menu.
    var $menu = $('#menu');

    $menu.wrapInner('<div class="inner"></div>');

    $menu._locked = false;

    $menu._lock = function() {

        if ($menu._locked)
            return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;

    };

    $menu._show = function() {

        if ($menu._lock())
            $body.addClass('is-menu-visible');

    };

    $menu._hide = function() {

        if ($menu._lock())
            $body.removeClass('is-menu-visible');

    };

    $menu._toggle = function() {

        if ($menu._lock())
            $body.toggleClass('is-menu-visible');

    };

    $menu
        .appendTo($body)
        .on('click', function(event) {
            event.stopPropagation();
        })
        .on('click', 'a', function(event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
            $menu._hide();

            // Redirect.
            if (href == '#menu')
                return;

            window.setTimeout(function() {
                window.location.href = href;
            }, 350);

        })
        .append('<a class="close" href="#menu">Close</a>');

    $body
        .on('click', 'a[href="#menu"]', function(event) {

            event.stopPropagation();
            event.preventDefault();

            // Toggle.
            $menu._toggle();

        })
        .on('click', function(event) {

            // Hide.
            $menu._hide();

        })
        .on('keydown', function(event) {

            // Hide on escape.
            if (event.keyCode == 27)
                $menu._hide();

        });

})(jQuery);