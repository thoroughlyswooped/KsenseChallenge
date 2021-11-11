/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function displayPosts(id) {
    //find post info element
    const newDiv = document.getElementById("posts");

    //clear if there is something there
    removeAllChildNodes(newDiv);

    //get posts and populate section
    (async() => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id, {
            headers: { Accept: 'application/json' },
        });
        const json = await res.json();
        Object.entries(json).forEach(([key, value]) => {
            //console.log(`${key}: ${value.name}`);
            addPost(value.title, value.body);
        });
    })();

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addPost(title, body) {
    //find post info element
    const newDiv = document.getElementById("posts");

    // create new content and give it content
    const newContent = document.createElement("article");
    newContent.className = "style" + newDiv.children.length % 6; //there are six styles for the tiles, hence mod 6
    newContent.innerHTML = '<span class="image"><img src="images/pic02.jpg" alt="" /></span><a  "><h2>' + title + '</h2><div class="content"><p>' + body + '</p></div></a>';

    // add new element to reference eleement
    newDiv.appendChild(newContent);
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
        //get users and populate page
        (async() => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                headers: { Accept: 'application/json' },
            });
            const json = await res.json();
            Object.entries(json).forEach(([key, value]) => {
                console.log(`${key}: ${value.name}`);
                addElement(value.name, value.id);
            });
        })();


        function addElement(name, idNum) {
            // get reference to element
            const newDiv = document.getElementById("test");

            // create new content and give it content
            const newContent = document.createElement("article");
            newContent.className = "style" + newDiv.children.length % 6; //there are six styles for the tiles, hence mod 6
            newContent.innerHTML = '<span class="image"><img src="images/pic02.jpg" alt="" /></span><a  onclick="displayPosts(' + idNum + ')"><h2>' + name + '</h2><div class="content"><p>Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.</p></div></a>';

            // add new element to reference eleement
            newDiv.appendChild(newContent);
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