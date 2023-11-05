'use client'

import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Container, Stack, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function ModelView({ params }: { params: { model: string, version: string } }) {
  const router = useRouter();
  const { model, version } = params;
  const [config, setConfig] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/models/${model}/versions/${version}`);
      const { config } = await res.json();
      setConfig(config);
      setLoading(false);
    })()
  }, [model, version]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading && <CircularProgress />}
      {!loading && config && (
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">{config.name}</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => router.push(`/models/${model}/versions/${version}`)}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>

          <TextField
            label="Config"
            multiline
            rows={30}
            value={JSON.stringify(config, null, 4)}
          />
        </Stack>
      )}
    </Container>
  );
}

export default ModelView;
