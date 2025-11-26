// api/fuel.js
export default async function handler(req, res) {
  try {
    // Official IPT JSON endpoint (behind the page you sent)
    const response = await fetch("https://iptgroup.com.lb/FuelPrices/GetLatestFuelPrices");
    const json = await response.json();

    if (!json || !json.Data) {
      return res.status(200).json({ ok: false, error: "Invalid IPT response" });
    }

    const d = json.Data;

    res.status(200).json({
      ok: true,
      date: d.Date,          // "25/11/2025"
      unl95: d.Unl95Price,   // "1,460,000"
      unl98: d.Unl98Price,
      diesel: d.DieselPrice,
      gas: d.GasPrice
    });
  } catch (err) {
    console.error("Fuel API error:", err);
    res.status(500).json({ ok: false, error: "fetch_failed" });
  }
}
