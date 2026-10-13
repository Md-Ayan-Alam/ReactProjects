import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#%^&*()_{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const buttonRef = useRef();

  const copyButton = () => {
    {copyButton ? "copied" : null}

    buttonRef.current?.select();

    buttonRef.current.style.backgroundColor = "lightgrey";

    window.navigator.clipboard.writeText(password);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-4 p-4 text-orange-500 bg-gray-700">

      <h1 className="text-white text-center">
        Password Generator
      </h1>

      <div className="flex shadow rounded-full overflow-hidden mb-4">

        <input
          type="text"
          value={password}
          ref={buttonRef}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />

        <button
          onClick={copyButton}
          className="bg-blue-600 p-3 text-white"
        >
          Copy
        </button>

      </div>

      <div className="text-orange-300 flex items-center gap-x-3">

        <div className="flex items-center gap-x-1">

          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />

          <label htmlFor="Length">
            Length : {length}
          </label>

        </div>

        <div className="flex items-center gap-x-1">

          <input
            type="checkbox"
            value={numberAllowed}
            className="cursor-pointer"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="Length">
            Number
          </label>

        </div>

        <div className="flex items-center gap-x-1">

          <input
            type="checkbox"
            value={charAllowed}
            className="cursor-pointer"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />

          <label htmlFor="Character">
            Character
          </label>

        </div>

      </div>

    </div>
  );
}

export default App;

