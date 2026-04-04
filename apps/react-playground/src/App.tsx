import { useState } from 'react';

import { greet } from '@playground/utils';
import './App.css';

function normalizeName(value: string): string {
  const normalizedValue = value.trim();

  return normalizedValue || 'World';
}

export default function App() {
  const [name, setName] = useState('World');
  const message = greet(normalizeName(name));

  return (
    <main className='app-shell flex min-h-screen items-center justify-center px-6 py-12'>
      <section className='w-full max-w-2xl rounded-4xl border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(60,78,120,0.18)] backdrop-blur sm:p-10'>
        <p className='text-brand-700 text-sm font-semibold tracking-[0.22em] uppercase'>
          React Playground
        </p>
        <h1 className='mt-3 text-4xl font-semibold tracking-tight sm:text-6xl'>{message}</h1>
        <p className='mt-4 max-w-xl text-base leading-7 text-slate-600'>
          Tailwind CSS v4 is now wired through Vite with CSS-first configuration, and this view
          still reuses the shared{' '}
          <code className='rounded bg-slate-100 px-1.5 py-0.5'>greet()</code> helper.
        </p>

        <label className='mt-8 block text-sm font-medium text-slate-700' htmlFor='name'>
          Name
        </label>
        <input
          className='focus:border-brand-500 focus:ring-brand-100 mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base shadow-inner shadow-slate-200/50 transition outline-none focus:bg-white focus:ring-4'
          id='name'
          onChange={(event) => {
            setName(normalizeName(event.target.value));
          }}
          placeholder='World'
          type='text'
          value={name}
        />
      </section>
    </main>
  );
}
