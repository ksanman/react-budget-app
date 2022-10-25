import { LinearProgress } from "@mui/material";
import { withStyles } from "@mui/styles";

export const VerticalLinearProgress = withStyles((theme) => {
    return {
      root: {
        borderRadius: 5,
        width: 50,
        height: "100%"
      },
      colorPrimary: {
        backgroundColor:
          theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
      },
      bar: {
        borderRadius: 5,
        transform: ({ value }) => {
          return `translateY(${value}%) !important`;
        },
        backgroundColor: "#1a90ff"
      }
    };
  })(LinearProgress);