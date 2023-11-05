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
  const [config, setConfig] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const save = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/models/${model}/load`, {
        method: 'POST',
        body: JSON.stringify({
          parameters: {
            config,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      router.push(`/models/${model}/versions/${version}`);
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/models/${model}/versions/${version}`);
      const { config } = await res.json();
      setConfig(JSON.stringify(config, null, 4));
      setLoading(false);
    })()
  }, [model, version]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading && <CircularProgress />}
      {!loading && config && (
        <Stack spacing={4}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">{model}</Typography>
            <Stack direction="row" spacing={2}>
              <LoadingButton
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                loading={saving}
                onClick={save}
              >
                Save
              </LoadingButton>
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
            value={config}
            onChange={(e) => setConfig(e.target.value)}
          />
        </Stack>
      )}
    </Container>
  );
}

export default ModelView;
