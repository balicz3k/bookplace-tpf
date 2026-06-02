import { Button, Stack } from '@mui/material';

interface PaginationControlsProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export default function PaginationControls({
  pageNumber,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationControlsProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end" width="100%">
      <Button
        variant="outlined"
        onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
        disabled={isLoading || pageNumber <= 1}
        sx={{ borderRadius: '25px', minWidth: 120, textTransform: 'none' }}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        onClick={() => onPageChange(Math.min(totalPages, pageNumber + 1))}
        disabled={isLoading || pageNumber >= totalPages}
        sx={{ borderRadius: '25px', minWidth: 120, textTransform: 'none' }}
      >
        Next
      </Button>
    </Stack>
  );
}
