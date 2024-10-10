import { useState } from "react";
import "./index.css";

export default function App() {
  const [bill, setBill] = useState(0);
  const [procent, setProcent] = useState(0);
  const [friendProcent, setFriendProcent] = useState(0);

  return (
    <div className="App">
      <Bill getBill={bill} onBill={setBill} />
      <YouLike onProcent={setProcent}>How did you like the service?</YouLike>
      <YouLike onProcent={setFriendProcent}>
        How did your friend like the service?
      </YouLike>
      <TotalBill bill={bill} procent={procent} friendProcent={friendProcent} />
      <Reset getBill={bill} onReset={() => setBill(0)} />
    </div>
  );
}

function Bill({ getBill, onBill }) {
  return (
    <div className="bill">
      <p className="bill-text">How much was te bill?</p>
      <input
        type="number"
        value={getBill !== 0 ? getBill : ""}
        onChange={(e) => {
          onBill(Number(e.target.value));
        }}
      />
    </div>
  );
}

function YouLike({ onProcent, children }) {
  return (
    <div className="bill">
      <p className="bill-text">{children}</p>
      <select
        onChange={(e) => {
          onProcent(Number(e.target.value));
        }}
      >
        <option value="0" key="1">
          Dissatisfied (0%)
        </option>
        <option value="5" key="2">
          It was okay (5%)
        </option>
        <option value="10" key="3">
          It was good (10%)
        </option>
        <option value="20" key="4">
          Absolutely amazing! (20%)
        </option>
      </select>

      {/* <input type="text" onChange={(e) => onBill(e.target.value)} /> */}
    </div>
  );
}
function TotalBill({ bill, procent, friendProcent }) {
  const totalProcent = (procent + friendProcent) / 2;
  const averageProcentAmount = Math.round((bill * totalProcent) / 100);
  const finalAmount = bill !== 0 ? bill + averageProcentAmount : 0;
  const tipAmount = bill !== 0 ? averageProcentAmount : 0;

  return (
    <div>
      <h1>
        You pay {finalAmount} (${bill} + ${tipAmount} tip)
      </h1>
    </div>
  );
}

function Reset({ getBill, onReset }) {
  return (
    <>
      {getBill > 0 && (
        <div>
          <button onClick={onReset}>Reset</button>
        </div>
      )}
    </>
  );
}
