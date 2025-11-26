export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.iptgroup.com.lb/fuel-prices");
    const html = await response.text();

    function matchNumber(regex) {
      const m = html.match(regex);
      return m ? m[1].trim() : null;
    }

    const date   = matchNumber(/Fuel Prices\s+(\d{2}\/\d{2}\/\d{4})/i);
    const unl95  = matchNumber(/UNL 95[\s\S]*?([\d,]+)/i);
    const unl98  = matchNumber(/UNL 98[\s\S]*?([\d,]+)/i);
    const diesel = matchNumber(/Diesel[\s\S]*?([\d,]+)/i);
    const gas    = matchNumber(/LPG[\s\S]*?([\d,]+)/i);

    res.status(200).json({
      ok: true,
      date,
      unl95,
      unl98,
      diesel,
      gas
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "fetch_failed" });
  }
}
