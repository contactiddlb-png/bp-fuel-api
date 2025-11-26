// api/fuel.js
export default async function handler(req, res) {
  try {
    const apiKey = process.env.SCRAPER_API_KEY;

    if (!apiKey) {
      return res.status(200).json({ ok: false, error: "no_scraper_key" });
    }

    const target = "https://iptgroup.com.lb/FuelPrices/GetLatestFuelPrices";

    const url =
      "http://api.scraperapi.com?api_key=" +
      encodeURIComponent(apiKey) +
      "&url=" +
      encodeURIComponent(target) +
      "&country_code=lb";

    const response = await fetch(url);
    const json = await response.json();

    if (!json || !json.Data) {
      return res.status(200).json({ ok: false, error: "no_data" });
    }

    const d = json.Data;

    res.status(200).json({
      ok: true,
      date: d.Date,
      unl95: d.Unl95Price,
      unl98: d.Unl98Price,
      diesel: d.DieselPrice,
      gas: d.GasPrice,
    });
  } catch (e) {
    console.error("Fuel API error:", e);
    res.status(200).json({ ok: false, error: "fetch_failed" });
  }
}
