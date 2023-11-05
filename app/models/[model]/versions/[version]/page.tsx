'use client'

import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Container, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';

function ModelView({ params }: { params: { model: string, version: string } }) {
  const router = useRouter();
  const { model, version } = params;
  const [config, setConfig] = useState<Record<string, any>>({});
  const [stats, setStats] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isUnloading, setIsUnloading] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

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
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push(`/models/${model}/versions/${version}/edit`)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <LoadingButton onClick={handleUnload} loading={isUnloading} variant="contained" color="error">
                Unload
              </LoadingButton>
            </Stack>
          </Stack>

          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Stats" />
                <Tab label="Config" />
              </Tabs>
            </Box>

            <TableContainer component={Paper} hidden={activeTab !== 0}>
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

            <TableContainer component={Paper} hidden={activeTab !== 1}>
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
