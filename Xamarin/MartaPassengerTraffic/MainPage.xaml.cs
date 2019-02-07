using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xamarin.Forms;
using System.Net.Http;

namespace MartaPassengerTraffic
{
  public partial class MainPage : ContentPage
  {
    public MainPage()
    {
      InitializeComponent();
    }

    async void Login()
    {
      // No authentication performed. Just use input as username.
      var newPage = new LandingPage();
      var data = new TestData { Username = usernameEntry.Text };
      newPage.BindingContext = data;
      await Navigation.PushAsync(newPage);
    }
  }

  class TestData
  {
    public string Username { get; set; }

  }

}