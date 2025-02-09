import { Chip, useTheme } from "@mui/material";

const SubmissionStatusChip: React.FC<{ status: string }> = ({ status }) => {
  const theme = useTheme();

  const statusColors: Record<string, { bg: string; text: string }> = {
    PENDING: {
      bg: theme.palette.customGrey.main,
      text: theme.palette.customGrey.contrastText,
    },
    IN_PROGRESS: {
      bg: theme.palette.customBlue.main,
      text: theme.palette.customBlue.contrastText,
    },
    RETRY: {
      bg: theme.palette.customYellow.main,
      text: theme.palette.customYellow.contrastText,
    },
    PASS: {
      bg: theme.palette.customGreen.main,
      text: theme.palette.customGreen.contrastText,
    },
    FAIL: {
      bg: theme.palette.customRed.main,
      text: theme.palette.customRed.contrastText,
    },
  };

  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: statusColors[status]?.bg,
        color: statusColors[status]?.text,
        fontWeight: "bold",
      }}
      size="small"
    />
  );
};

export default SubmissionStatusChip;
