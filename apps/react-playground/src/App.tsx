import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <button onClick={handleClick}>Click me</button>
      <p>Count: {count}</p>
    </div>
  );
}
