$('.assortment').click(function(e) {
    e.preventDefault();

    if ($('.assortment-options').is(":visible")) {
        $('.assortment-options').slideUp();
    } else {
        $('.assortment-options').slideDown();
    }

    if ($('.gender-options').is(":visible")) {
        $('.gender-options').slideUp();
    }

    if ($('.material-options').is(":visible")) {
        $('.material-options').slideUp();
    }
});

$('.gender').click(function(e) {
    e.preventDefault();

    if ($('.gender-options').is(":visible")) {
        $('.gender-options').slideUp();
    } else {
        $('.gender-options').slideDown();
    }

    if ($('.assortment-options').is(":visible")) {
        $('.assortment-options').slideUp();
    }

    if ($('.material-options').is(":visible")) {
        $('.material-options').slideUp();
    }
});

$('.material').click(function(e) {
    e.preventDefault();

    if ($('.material-options').is(":visible")) {
        $('.material-options').slideUp();
    } else {
        $('.material-options').slideDown();
    }

    if ($('.assortment-options').is(":visible")) {
        $('.assortment-options').slideUp();
    }

    if ($('.gender-options').is(":visible")) {
        $('.gender-options').slideUp();
    }
});



/* Filter Eye Glasses - MixItUp Plugin Code Below */
var checkboxFilter = {

    /* Declare any variables we will need as properties of the object */
    $filters: null,
    $reset: null,
    groups: [],
    outputArray: [],
    outputString: '',

    // The "init" method will run on document ready and cache any jQuery objects we will need.
    init: function(){
        /*
            As a best practice, in each method we will asign "this" to the variable "self" so that
            it remains scope-agnostic. We will use it to refer to the parent "checkboxFilter" object
            so that we can share methods and properties between all parts of the object.
        */
        var self = this;

        self.$filters = $('#filters');
        self.$reset = $('#reset');
        self.$container = $('#container');

        self.$filters.find('fieldset').each(function(){
            self.groups.push({
                $inputs: $(this).find('input'),
                active: [],
                tracker: false
            });
        });
        self.bindHandlers();
    },

    /* The "bindHandlers" method will listen for whenever a form value changes. */
    bindHandlers: function(){
        var self = this;

        self.$filters.on('change', function(){
            self.parseFilters();

            /* TESTING - Save Checkbox State - http://stackoverflow.com/questions/34831745/how-to-save-multiple-checkbox-values-to-local-storage */
            var fav, favs = [];
            $('#filters input:checkbox').each(function() { // run through each of the checkboxes
                fav = {id: $(this).attr('id'), value: $(this).prop('checked')};
                favs.push(fav);
            });
            localStorage.setItem("favorites", JSON.stringify(favs));
            /* TESTING - Save Checkbox State */

        });

        self.$reset.on('click', function(e){
            e.preventDefault();
            self.$filters[0].reset();
            self.parseFilters();
            /* slideup filters */
            if ( self.$filters.find('fieldset').is(':visible') ) {
                self.$filters.find('fieldset').slideUp();
            }
            /* reset localStorage */
            localStorage.clear();
        });
    },

    /* The parseFilters method checks which filters are active in each group: */
    parseFilters: function(){
        var self = this;

        /* loop through each filter group and add active filters to arrays */
        for(var i = 0, group; group = self.groups[i]; i++){
            group.active = []; // reset arrays
            group.$inputs.each(function(){
                $(this).is(':checked') && group.active.push(this.value);
            });
            group.active.length && (group.tracker = 0);
        }

        self.concatenate();
    },

    /* The "concatenate" method will crawl through each group, concatenating filters as desired: */
    concatenate: function(){
        var self = this,
	    cache = '',
	    crawled = false,
	    checkTrackers = function(){
            var done = 0;

            for(var i = 0, group; group = self.groups[i]; i++){
                (group.tracker === false) && done++;
            }
            return (done < self.groups.length);
        },
        crawl = function(){
            for(var i = 0, group; group = self.groups[i]; i++){
                group.active[group.tracker] && (cache += group.active[group.tracker]);

                if(i === self.groups.length - 1){
                    self.outputArray.push(cache);
                    cache = '';
                    updateTrackers();
                }
            }
        },
        updateTrackers = function(){
            for(var i = self.groups.length - 1; i > -1; i--){
                var group = self.groups[i];

                if(group.active[group.tracker + 1]){
                    group.tracker++;
                    break;
                } else if(i > 0){
                    group.tracker && (group.tracker = 0);
                } else {
                    crawled = true;
                }
            }
        };

        self.outputArray = []; // reset output array

	    do {
		  crawl();
	    }
	    while(!crawled && checkTrackers());

        self.outputString = self.outputArray.join();

        // If the output string is empty, show all rather than none:

        !self.outputString.length && (self.outputString = 'all');

        //console.log(self.outputString);

        // ^ we can check the console here to take a look at the filter string that is produced

        // Send the output string to MixItUp via the 'filter' method:

	    if(self.$container.mixItUp('isLoaded')){
    	       self.$container.mixItUp('filter', self.outputString);
	    }
    } // END - concatenate
};



/* On document ready, initialise our code. */
$(function(){

    /* If there is no URL parameter check to see if there are any filters set */
    if (window.location.hash) {

        /*** Get Parameter By Name and check the checkbox ***/
        var vars = [], hash;
        var query = document.URL.split('#')[1];
        if(query != undefined){
            query = query.split('&');
            for(var i = 0; i < query.length; i++){
                hash = query[i].split('=');
                vars.push(hash[1]);
                $("input[type=checkbox]").each(function() {
                    $('input[name="' + hash[0] + '"][value=".' + hash[0] + '"]').prop('checked', true);
                    var input = $('input[name="' + hash[0] + '"][value=".' + hash[0] + '"]').prop('checked', true);
                });
                var currentFilters = '.'+hash;
            }
        };
        // console.log('query string exists');

    } else {
        /* Get localStorage and push it to the onLoad function */
        var currentFilters = JSON.parse(localStorage.getItem('filters')); /* filters for mixItUp */

        /* Push Checkboxes from LocalStorage "favorites" in a loop - Check bindHandlers for setting up filters */
        var favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites != null) {
            for (var i=0; i<favorites.length; i++) {
                $('#' + favorites[i].id ).prop('checked', favorites[i].value);
            }
        }
        // console.log('no query string exists');
    }

    /* Initialize checkboxFilter code */
    checkboxFilter.init();

    /* Instantiate MixItUp */
    $('#container').mixItUp({
        controls: {
            enable: false // we won't be needing these
        },
        load: {
            filter: currentFilters
        },
        animation: {
            easing: 'ease',
            effects: 'fade scale',
            duration: 500,
            perspectiveDistance: '1px'
        },
        callbacks: {
    		onMixEnd: function(state){
                /* Push active filters to localStorage */
                localStorage.setItem('filters', JSON.stringify(state.activeFilter));
    		}
    	}
    });
});
