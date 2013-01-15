﻿$(function () {
	var ReviewTodo = Spine.Model.sub();
	ReviewTodo.configure("Review", "sReview", "sStatus", "sTitle", "reviewers");
	ReviewTodo.extend(Spine.Model.Ajax);
	ReviewTodo.extend({ url: "api/Reviews/Todo" });

	var ReviewRejected = Spine.Model.sub();
	ReviewRejected.configure("Review", "sReview", "sStatus", "sTitle", "reviewers");
	ReviewRejected.extend(Spine.Model.Ajax);
	ReviewRejected.extend({ url: "api/Reviews/Rejected" });

	var ReviewWaiting = Spine.Model.sub();
	ReviewWaiting.configure("Review", "sReview", "sStatus", "sTitle", "reviewers");
	ReviewWaiting.extend(Spine.Model.Ajax);
	ReviewWaiting.extend({ url: "api/Reviews/Waiting" });

	var ReviewsController = Spine.Controller.sub({
		elements: {
			"#reviewsTodo": "reviewsTodo",
			"#reviewsRejected": "reviewsRejected",
			"#reviewsWaiting": "reviewsWaiting"
		},

		init: function () {
			ReviewTodo.bind("refresh", this.proxy(this.addReviewsTodo));
			ReviewRejected.bind("refresh", this.proxy(this.addReviewsRejected));
			ReviewWaiting.bind("refresh", this.proxy(this.addReviewsWaiting));

			ReviewTodo.fetch();
			ReviewRejected.fetch();
			ReviewWaiting.fetch();
		},

		template: function (title, items) {
			return $('#reviewsTemplate').tmpl({
				title: title,
				reviews: items,
			});
		},
		
		addReviewsTodo: function () {
			$(this.reviewsTodo).html(this.template("Reviews to do:", ReviewTodo.all()));
		},

		addReviewsRejected: function () {
			$(this.reviewsRejected).html(this.template("Rejected reviews to fix:", ReviewRejected.all()));
		},

		addReviewsWaiting: function () {
			$(this.reviewsWaiting).html(this.template("Your code under review:", ReviewWaiting.all()));
		}
	});
	
	new ReviewsController({ el: $("body") });
});