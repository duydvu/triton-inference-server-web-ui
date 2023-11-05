'use client'

import React, { useState } from 'react';
import { Model } from '@/types/model';
import Link from 'next/link';
import { Button, Chip, CircularProgress, TableCell, TableRow } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

function ModelItem({ model, update }: { model: Model, update: () => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnloading, setIsUnloading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/models/${model.name}/load`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    await update();
    setIsLoading(false);
  };

  const handleUnload = async () => {
    setIsUnloading(true);
    try {
      const res = await fetch(`/api/models/${model.name}/unload`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    await update();
    setIsUnloading(false);
  };

  const isReady = model.state === 'READY';

  const badgeColor = isReady ? 'success' : 'error';
  const badgeText = isReady ? 'Ready' : 'Not Ready';

  return (
    <TableRow>
      <TableCell>
        <Link href={`/models/${model.name}/versions/${model.version}`} className='text-blue-500 hover:underline'>
          {model.name}
        </Link>
      </TableCell>
      <TableCell>{model.version}</TableCell>
      <TableCell>
        <Chip color={badgeColor} label={badgeText} clickable />
      </TableCell>
      <TableCell>
        <LoadingButton
          onClick={handleLoad}
          variant="contained"
          disabled={isUnloading}
          loading={isLoading}
        >
          {isReady ? 'Reload' : 'Load'}
        </LoadingButton>
        {isReady && (
          <LoadingButton
            onClick={handleUnload}
            variant="contained"
            color="warning"
            className="ml-4"
            disabled={isLoading}
            loading={isUnloading}
          >
            Unload
          </LoadingButton>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ModelItem;