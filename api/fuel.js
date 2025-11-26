export default async function handler(req, res) {
  try {
    const response = await fetch("https://iptgroup.com.lb/FuelPrices/GetLatestFuelPrices", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://www.iptgroup.com.lb/",
        "Origin": "https://www.iptgroup.com.lb"
      }
    });

    const json = await response.json();

    if (!json || !json.Data) {
      return res.status(200).json({ ok: false, error: "no_data" });
    }

    const data = json.Data;

    res.status(200).json({
      ok: true,
      date: data.Date,
      unl95: data.Unl95Price,
      unl98: data.Unl98Price,
      diesel: data.DieselPrice,
      gas: data.GasPrice
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "fetch_failed" });
  }
}
