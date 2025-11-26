export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.iptgroup.com.lb/ipt/en/our-stations/fuel-prices");
    const html = await response.text();

    // Clean spaces & line breaks
    const clean = html.replace(/\s+/g, " ");

    // Extract date
    const dateMatch = clean.match(/Fuel Prices\s*<\/h3>\s*<p>(\d{2}\/\d{2}\/\d{4})/i);
    const date = dateMatch ? dateMatch[1] : null;

    // Extract UNL 95
    const unl95Match = clean.match(/UNL 95<\/td>\s*<td[^>]*>([\d,.]+)/i);
    const unl95 = unl95Match ? unl95Match[1] : null;

    // Extract UNL 98
    const unl98Match = clean.match(/UNL 98<\/td>\s*<td[^>]*>([\d,.]+)/i);
    const unl98 = unl98Match ? unl98Match[1] : null;

    // Extract Diesel
    const dieselMatch = clean.match(/Diesel<\/td>\s*<td[^>]*>([\d,.]+)/i);
    const diesel = dieselMatch ? dieselMatch[1] : null;

    // Extract Gas (LPG)
    const gasMatch = clean.match(/Gas \(LPG\)<\/td>\s*<td[^>]*>([\d,.]+)/i);
    const gas = gasMatch ? gasMatch[1] : null;

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
