import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useSWR from "swr";
import TickingChip from "./TickingChip";

const fetcher = url => fetch(url).then(res => res.json());

const VotePercentage = () => {
  const { data } = useSWR("/api/voting_activity", fetcher, {
    refreshInterval: 30 * 60 * 1000 // 30 minutes
  });

  return (
    <Box
      sx={{
        borderColor: "#fff500",
        borderWidth: "4px",
        borderStyle: "solid",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
    >
      <TickingChip
        end={new Date("2022-11-02T20:00:00")}
        sx={{
          position: "absolute",
          left: "1rem",
          backgroundColor: "#fff500",
          color: "black"
        }}
      />
      <Typography variant="h2" sx={{ fontSize: "48px" }}>
        Vote: vaalit.hyy.fi
      </Typography>
      <Typography variant="h3" sx={{ fontSize: "36px" }}>
        31.10.-2.11.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "4rem",
          textAlign: "center"
        }}
      >
        <Box>
          <Typography>Total voter turnout</Typography>{" "}
          <Typography>{data?.total}%</Typography>
        </Box>
        <Box>
          <Typography>Matlu voter turnout</Typography>{" "}
          <Typography>{data?.faculty}%</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VotePercentage;
