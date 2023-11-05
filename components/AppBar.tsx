'use client'

import React from 'react';
import Link from 'next/link';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

export default function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Triton Inference Server Web UI
          </Typography>

          <Link href="/repo">
            <Button color="inherit">
              Repo
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
