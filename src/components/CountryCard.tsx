import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CountryCardProps {
  name: string;
  code: string;
  emoji: string;
}

const CountryCard = (props: CountryCardProps) => {
  const { code, emoji, name } = props;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/${code}`);
  };

  return (
    <Card sx={{ maxWidth: 400, minWidth: 400 }} data-testid="country-card">
      <CardActionArea onClick={handleOnClick}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {emoji}
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CountryCard;
