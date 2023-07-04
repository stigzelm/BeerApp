import { useState } from "react";
import { Button } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { SxProps } from "@mui/system";

interface FavoriteButtonProps {
  isActive?: boolean;
  onClick: Function;
  sx?: SxProps;
}

export default function FavoriteButton({
  isActive = false,
  onClick,
  sx,
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isActive);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    onClick();
  };

  return (
    <Button variant="contained" color="secondary" endIcon={isFavorite ? <Favorite /> : <FavoriteBorderIcon />} sx={sx} onClick={handleClick}>
        { isFavorite ? 'Remove' : 'Add'}
    </Button>
  );
}
