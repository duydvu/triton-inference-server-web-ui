'use client'

import ModelItem from '@/components/ModelItem';
import TableRowsLoader from '@/components/TableRowsLoader';
import { Model } from '@/types/model';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, TextField, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

function App() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortColumn, setSortColumn] = useState<keyof Model>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleSort = (column: keyof Model) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const sortedModels = models.sort((a, b) => {
    const columnA = a[sortColumn] || '';
    const columnB = b[sortColumn] || '';
    if (columnA < columnB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    return sortDirection === 'asc' ? 1 : -1;
  }).filter((model) => {
    return model.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Models</Typography>
        <TextField
          label="Search models"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'name'}
                  direction={sortDirection}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'version'}
                  direction={sortDirection}
                  onClick={() => handleSort('version')}
                >
                  Version
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'state'}
                  direction={sortDirection}
                  onClick={() => handleSort('state')}
                >
                  State
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === 'reason'}
                  direction={sortDirection}
                  onClick={() => handleSort('reason')}
                >
                  Reason
                </TableSortLabel>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowsLoader rowsNum={3} columnsNum={5} />
            ) : sortedModels.map((model, i) => (
              <ModelItem key={i} model={model} update={getModels} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
