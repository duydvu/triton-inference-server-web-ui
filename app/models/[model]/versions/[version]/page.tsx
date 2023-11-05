'use client'

import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';

function ModelView({ params }: { params: { model: string, version: string } }) {
  const router = useRouter();
  const { model, version } = params;
  const [config, setConfig] = useState<any>(null);
  const [stats, setStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isUnloading, setIsUnloading] = useState(false);

  const handleUnload = async () => {
    setIsUnloading(true);
    try {
      const res = await fetch(`/api/models/${model}/unload`, { method: 'POST' });
    } catch (err) {
      console.error(err);
    }
    setIsUnloading(false);
    router.replace('/repo');
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/models/${model}/versions/${version}`);
      const { config, stats } = await res.json();
      setConfig(config);
      setStats(stats);
      setLoading(false);
    })()
  }, [model, version]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading && <CircularProgress />}
      {!loading && config && stats && (
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">{config.name}</Typography>
            <LoadingButton onClick={handleUnload} loading={isUnloading} variant="contained" color="error">
              Unload
            </LoadingButton>
          </Stack>

          <div>
            <Typography variant="h5" component="h2" gutterBottom>Stats</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(stats).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell sx={{ whiteSpace: 'pre' }}>
                        {value !== undefined && typeof value === 'object' ? JSON.stringify(value, null, 4) : value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <Typography variant="h5" component="h2" gutterBottom>Config</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(config).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell sx={{ whiteSpace: 'pre' }}>
                        {value !== undefined && typeof value === 'object' ? JSON.stringify(value, null, 4) : value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Stack>
      )}
    </Container>
  );
}

export default ModelView;
