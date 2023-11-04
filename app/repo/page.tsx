import fetchServer from '@/api/server';
import ModelItem from '@/components/ModelItem';
import { Model } from '@/types/model';
import React from 'react';

async function getModels(): Promise<Model[]> {
  const response = await fetchServer('v2/repository/index', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }
  return response.json();
}

async function App() {
  const models = await getModels();

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold">Models</h1>
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
            <ModelItem key={i} model={model} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
