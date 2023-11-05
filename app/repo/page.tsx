'use client'

import ModelItem from '@/components/ModelItem';
import { Model } from '@/types/model';
import React, { useEffect, useState } from 'react';

function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getModels() {
    const res = await fetch('/api/models', { method: 'POST' });
    const models = await res.json();
    setModels(models);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getModels();
      setLoading(false);
    })()
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold">Models</h1>
      {loading ? (
        <p className="mt-10">Loading...</p>
      ) : (
        <table className="table-auto w-full max-w-5xl mt-10">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 text-left">Name</th>
              <th className="p-4 border-b border-gray-200">Version</th>
              <th className="p-4 border-b border-gray-200">Status</th>
              <th className="p-4 border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => (
              <ModelItem key={i} model={model} update={getModels} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
