(function(window, $, undefined) {

	$('.modal-close').on('click', function() {
		var target = $('#' + $(this).data('close'));
		$(window).disablescroll('undo');
		target.closest('.modal-wrapper').removeClass('is-open').addClass('is-closed');
		target.closest('.modal-wrapper').velocity(
			"fadeOut", {
				duration: 200,
			});
	});
	$('.modal-open').on('click', function() {
		var target = $('#' + $(this).data('open'));
		$(window).disablescroll();
		target.closest('.modal-wrapper').removeClass('is-closed').addClass('is-open');
		target.closest('.modal-wrapper').velocity(
			"fadeIn", {
				duration: 200,
			});
	});

	function validate() {
		var isRequired = Boolean(this.attr('required'));
		var pattern = this.data('pattern');
		var value = this.val();
		var clearance = 0;
		if (isRequired) {
			if (value === "") ++clearance;
		}
		if (!!pattern) {
			pattern = pattern !== 'email' ? pattern : /[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/;
			if (value.search(pattern) === -1) ++clearance;
		}

		if (clearance === 0) this.removeClass('has-error').addClass('is-valid');
		else this.removeClass('is-valid').addClass('has-error');

		return clearance;
	}
	/* validate fields */
	$('.st-form--field').on('blur', function() {
		validate.call($(this));
	});
	/* validation upon submission */
	$('.st-form--submit').on('click', function(event) {
		event.preventDefault();
		clearance = 0;
		$('.st-form--field').each(function(field) {
			clearance += validate.call($(this));
		});
		if (clearance === 0) $('#contact-form').submit();
	});
	/* submit form */
	$('#contact-form').on('submit', function(event) {
		event.preventDefault();
		$('#submit').prop('disabled',true).val("SENDING");
		$.ajax({
			type: 'POST',
			url: 'submit.php',
			data: $(this).serialize(),
			success: function (data) {
				console.log(data);
				$('#submit').val('THANK YOU');
    	},
			error: function () {
        $('#submit').removeAttr('disabled');
    	}
		});
	});

})(window, jQuery);
