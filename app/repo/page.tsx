'use client'

import ModelItem from '@/components/ModelItem';
import TableRowsLoader from '@/components/TableRowsLoader';
import { Model } from '@/types/model';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Models</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={3} columnsNum={4} />
            ) : models.map((model, i) => (
              <ModelItem key={i} model={model} update={getModels} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
