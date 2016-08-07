// uhc_faq.js - FAQ Specific Javascript 
// this is only used on the FAQ page, so it does not need to be included on other pages

// adapted from from https://www.uhcsr.com/SelfServiceSupport/Students/faqs.aspx

//Code here takes care of displaying and hiding the questions & answers
(function ($) {

	$.fn.faqToggle = function (options) {

		// declare the default options before processing them
		$.fn.faqToggle.defaults = {
			quesPrefix: 'Q: ',
			ansPrefix: 'A: ',
			showTooltip: 'Show answer',
			hideTooltip: 'Hide Answer'
		}

		var opts = $.extend({}, $.fn.faqToggle.defaults, options);

		function onClick() {
			var answer = $(this).next('dd');
			if (answer.is(":hidden")) { // if the answer is hidden show it
				answer.slideDown('fast');
				$(this).attr("title", opts.hideTooltip); // update screentip
				$(this).css("font-size", "28px");
				$(this).css("font-family", "'UHCSans-Light', Arial, sans-serif"); 
				$(this).find("span.faqToggleQuesPrefix").css("display", "inline");

			} else {
				$(this).attr("title", opts.showTooltip); // update screentip
				$(this).css("font-size", "inherit");
				$(this).css("font-family", "inherit"); 
				$(this).find("span.faqToggleQuesPrefix").css("display", "none");
				answer.slideUp('fast'); // if the answer is shown hide it
			}
		}

		return this.each(function (i) {
			var questions = $(this).find('dt');
			var answers = $(this).find('dd');
			answers.hide(); // hide answers initially
			// for incrementing question number, referto inner .each, not the outer
			questions.each(function (idx) {
				$(this).attr("title", "Show answer"); // add screen tip
				$(this).wrapInner("<span class='faqToggleQues' />");
				$(this).prepend("<span class='faqToggleQuesPrefix hideInitially'>" + opts.quesPrefix + "</span>");

				$(this).click(onClick);
			});

			answers.each(function (idx) {
				$(this).prepend("<span class='faqToggleAnsPrefix'>" + opts.ansPrefix + "</span>");
			});
		});
	};

	$('#faqList1').faqToggle();
	$('#faqList2').faqToggle();
	$('#faqList3').faqToggle();
	$('#faqList4').faqToggle();
	$('#faqList5').faqToggle();
	$('#faqList6').faqToggle();
	$('#faqList7').faqToggle();
	$('#faqList8').faqToggle();
	$('#faqList9').faqToggle();

})(jQuery);