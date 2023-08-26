import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MediaCardProps, CardsListProps } from '@/Types/MediaCard';
import {Chip} from "@mui/material";
import styles from './index.module.scss';
import Link from "next/link";
import GroupWorkRoundedIcon from "@mui/icons-material/GroupWorkRounded";
import GridViewIcon from "@mui/icons-material/GridView";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";

const MediaCard:React.FC<MediaCardProps> = ({ image, title, chips, type, network, twitterName,  heading, description }) => {

    return (
        <Link href={'/info'}>
            <Card className={styles.MediaCardItem} sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={image}
                    title={title}
                />
                <CardContent className={styles.CardContentContainer}>
                    <div>
                        {chips.map((chipData, index) => (
                            <Chip
                                color="primary"
                                size="small"
                                key={index}
                                label={chipData}
                                variant="outlined"
                                style={{ marginRight: '8px' }}// Add this line
                            />
                        ))}
                    </div>
                    <Typography variant="body2" color="text.secondary" style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display:'-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                    }}>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

const CardsList:React.FC<CardsListProps> = ({ cardsData }) => {
    return (
        <div className={`flex ${styles.cardListContainer}`}>
            {cardsData.map((card, index) => (
                <MediaCard
                    key={index}
                    image={card.image}
                    chips={card.chips}
                    type={card.type}
                    twitterName={card.twitterName}
                    network={card.network}
                    title={card.title}
                    heading={card.heading}
                    description={card.description}
                />
            ))}
        </div>
    );
}

export default CardsList
