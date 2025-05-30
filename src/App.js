import React, { useState } from "react";

function App() {
  const [serviceOrder, setServiceOrder] = useState("");
  const [part, setPart] = useState("");
  const [qty, setQty] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [labor, setLabor] = useState("");
  const [commissionPct, setCommissionPct] = useState("");
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [yearly, setYearly] = useState(0);
  const [popup, setPopup] = useState(false);

  const resetFieldTotals = (type) => {
    if (type === "daily") setDaily(0);
    if (type === "weekly") setWeekly(0);
    if (type === "yearly") setYearly(0);
  };

  const calculate = () => {
    const q = parseInt(qty) || 1;
    const w = parseFloat(wholesale) || 0;
    const r = parseFloat(retail) || 0;
    const l = parseFloat(labor) || 0;
    const pct = parseFloat(commissionPct) || 0;
    const profit = (r - w) * q + l;
    const commission = profit * (pct / 100);

    setDaily(prev => prev + commission);
    setWeekly(prev => prev + commission);
    setYearly(prev => prev + commission);

    setPopup(true);
    setTimeout(() => setPopup(false), 1500);

    setPart("");
    setQty("");
    setWholesale("");
    setRetail("");
    setLabor("");
    setServiceOrder("");
  };

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 400, margin: "auto", padding: "1rem" }}>
      <h2>Service Order</h2>
      <input value={serviceOrder} onChange={e => setServiceOrder(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Part</label>
      <input value={part} onChange={e => setPart(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Quantity</label>
      <input value={qty} onChange={e => setQty(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Wholesale Price</label>
      <input value={wholesale} onChange={e => setWholesale(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Retail Price</label>
      <input value={retail} onChange={e => setRetail(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Labor</label>
      <input value={labor} onChange={e => setLabor(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <label>Commission Percentage</label>
      <input value={commissionPct} onChange={e => setCommissionPct(e.target.value)} style={{ width: "100%", marginBottom: 16 }} />

      <button onClick={calculate} style={{ width: "100%", padding: "0.5rem", marginBottom: 16 }}>Calculate Commission</button>
      {popup && <div style={{ color: "green", marginBottom: 16 }}>Commission Calculated!</div>}

      <div>
        <div>Daily Commission ${daily.toFixed(2)}</div>
        <button onClick={() => resetFieldTotals("daily")}>Reset</button>
      </div>
      <div>
        <div>Weekly Commission ${weekly.toFixed(2)}</div>
        <button onClick={() => resetFieldTotals("weekly")}>Reset</button>
      </div>
      <div>
        <div>Yearly Commission ${yearly.toFixed(2)}</div>
        <button onClick={() => resetFieldTotals("yearly")}>Reset</button>
      </div>
    </div>
  );
}

export default App;