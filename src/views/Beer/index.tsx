import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';

import { Button, Box, Typography, Container, Link } from '@mui/material';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import markerIcon from './marker.svg';
import bgImage from './background-image.jpg';
import styles from './Beer.module.css';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const description = (
    <>
      {beer?.name} is a {beer?.brewery_type} brewing company located at {beer?.city}, {beer?.state} in {beer?.country}.
    </>
  );

  const mapMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconSize: new L.Point(68, 90),
    iconAnchor: [34, 90]
  });

  return (
    <Box component="article" className={styles.article}>
      <Box component="header" className={styles.header}>
        <Typography variant="h1" component="h1" color="#ffffff">
          {beer?.name}
        </Typography>
        <img src={bgImage} alt="Beer under a tap" />
      </Box>
      {beer &&
        <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '96px'
        }}>
          <Typography variant="h2" component="p" color="#ffffff">
              {description}
          </Typography>
        </Container>
      }
      {beer &&
        <Container disableGutters sx={{
          marginTop: '96px',
          marginBottom: '96px'
        }}>
          <Box className={styles.map}>
            <Box className={styles.mapText}>
              <Typography variant="body1" component="p">
                <b>Address:</b>
                <br />
                {beer?.street} {beer?.city}
                <br />
                {beer?.state} {beer?.postal_code}
                <br />
                {beer?.country}
              </Typography>
              <br />
              <Typography variant="body1" component="p">
                <b>Phone:</b>
                <br />
                {beer?.phone.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}
              </Typography>
              <br />
              <Typography variant="body1" component="p">
                <b>Website:</b>
                <br />
                <Link href={beer?.website_url} target="_blank">{beer?.website_url}</Link>
              </Typography>
              <Box className={styles.mapCta}>
                <Button variant="outlined">Visit website</Button>
              </Box>
            </Box>
            <MapContainer
              center={[parseFloat(beer?.latitude), parseFloat(beer?.longitude)]}
              zoom={14}
              scrollWheelZoom={false}
              className={styles.mapView}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[parseFloat(beer?.latitude), parseFloat(beer?.longitude)]}
                icon={mapMarkerIcon}
              >
              </Marker>
            </MapContainer>
          </Box>
        </Container>
      }
      {beer &&
        <Box sx={{
          textAlign: 'center',
          marginTop: '96px',
          marginBottom: '96px'
          }}>
          <Typography variant="h2" component="div" color="#ffffff">
            <Link
              href='/beer'
              color="#ffffff"
              underline="hover"
            >
              View more beers
            </Link>
          </Typography>
        </Box>
      }
    </Box>
  );
};

export default Beer;
