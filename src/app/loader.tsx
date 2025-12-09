import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

export default function loader() {
  return (
    <div>
<Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Image
              src="/zaylo-logo.png"
              alt="Loading Logo"
              width={85}
              height={85}
              className="logo-spin"
              style={{ filter: "invert(0)" }}
            />
            <Typography
              mt={2}
              fontSize={18}
              fontWeight="bold"
              sx={{ animation: "fadeText 1.5s infinite" }}
            >
              Loading...
            </Typography>
          </Box>
        </Box>

    </div>
  )
}
