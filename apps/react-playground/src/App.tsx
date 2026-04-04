import React, { useCallback, useState } from 'react';

import { createGreetingMessage, normalizeName } from './App.controller';

export default function App() {
  const [name, setName] = useState('World');
  const message = createGreetingMessage(name);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(normalizeName(event.target.value));
    },
    [setName],
  );

  return (
    <main className='page'>
      <div className='card'>
        <p className='eyebrow'>React Playground</p>
        <h1>{message}</h1>
        <p className='lede'>
          This app reuses the shared <code>greet()</code> helper.
        </p>

        <label className='field' htmlFor='name'>
          Name
        </label>
        <input
          className='input'
          id='name'
          onChange={handleNameChange}
          placeholder='World'
          type='text'
          value={name}
        />
      </div>
    </main>
  );
}
