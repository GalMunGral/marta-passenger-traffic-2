using System;
using System.Collections.Generic;
using System.Net.Http;
using Xamarin.Forms;
using System.Threading.Tasks;
using System.Collections.ObjectModel;
using Newtonsoft.Json;

namespace MartaPassengerTraffic
{
  public partial class LandingPage : ContentPage
  {
    public ObservableCollection<Station> stations = new ObservableCollection<Station>();

    public LandingPage()
    {
      InitializeComponent();
      StationView.ItemsSource = stations;
    }

    protected override void OnAppearing()
    {
      // Fetch station data.
      var client = ((App)(Application.Current)).MyHttpClient;
      string endpoint = "http://[YOUR IP ADDRESS]:8080/stations";
      ((Task<HttpResponseMessage>) client.GetAsync(endpoint)).ContinueWith((resA) =>
      {
        ((Task<string>) resA.Result.Content.ReadAsStringAsync()).ContinueWith((resB) =>
        {
          var data = JsonConvert.DeserializeObject<ObservableCollection<Station>>(resB.Result);
          foreach (var station in data) {
            stations.Add(station);
          }
        });
      });
    }
  }

  public class Station {
    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "stopID")]
    public string StopID { get; set; }

    [JsonProperty(PropertyName = "enterFare")]
    public double EnterFare { get; set; }

    [JsonProperty(PropertyName = "closedStatus")]
    public bool ClosedStatus { get; set; }

    [JsonProperty(PropertyName = "isTrain")]
    public bool IsTrain { get; set; }

    [JsonProperty(PropertyName = "intersection")]
    public string Intersection { get; set; }
  }
}
