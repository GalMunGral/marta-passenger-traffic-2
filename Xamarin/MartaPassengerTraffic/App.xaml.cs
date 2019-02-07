using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace MartaPassengerTraffic
{
  public partial class App : Application
  {
    // Shared HTTP client
    public HttpClient MyHttpClient { get; set; }

    public App()
    {
      InitializeComponent();

      MyHttpClient = new HttpClient();

      MainPage = new NavigationPage(new MainPage());
    }

    protected override void OnStart()
    {
      // Handle when your app starts

    }

    protected override void OnSleep()
    {
      // Handle when your app sleeps
    }

    protected override void OnResume()
    {
      // Handle when your app resumes
    }
  }
}
