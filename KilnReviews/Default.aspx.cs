﻿using System;
using System.Net;
using System.Web;
using System.Web.UI;

namespace KilnReviews
{
	public partial class Default : Page
	{
		protected override void OnLoad(EventArgs e)
		{
			base.OnLoad(e);

			if (Request.Cookies["kilnToken"] != null && Request.Cookies["kilnUser"] != null)
			{
				Response.Redirect("ReviewSummary.aspx");
			}
		}

		protected void submitButtonClick(object sender, EventArgs e)
		{
			using (var webClient = new WebClient())
			{
				var downloadString = webClient.DownloadString(string.Format("https://nonlinear.kilnhg.com/Api/2.0/Auth/Login?sUser={0}&sPassword={1}", Uri.EscapeDataString(userName.Text), Uri.EscapeDataString(password.Text)));

				// TODO: Handle failure to get token
				

				var kilnTokenCookie = new HttpCookie("kilnToken")
				{
					Value = downloadString.Replace("\"", string.Empty),
					Expires = DateTime.Today.AddMonths(1),
					HttpOnly = true,
					Secure = true
				};
				
				var userCookie = new HttpCookie("kilnUser")
				{
					Value = userName.Text,
					Expires = DateTime.Today.AddMonths(1),
					HttpOnly = true,
					Secure = true
				};

				Response.Cookies.Add(kilnTokenCookie);
				Response.Cookies.Add(userCookie);
				Response.Redirect("ReviewSummary.aspx");
			}
		}
	}
}