import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <main>
          <div>
            <b>Type: </b> {beer?.brewery_type}
          </div>
          <div>
            <b>Address: </b> {beer?.address_1}
          </div>
          <div>
            <b>City: </b> {beer?.city}
          </div>
          <div>
            <b>state_province: </b> {beer?.state_province}
          </div>
          <div>
            <b>Postal: </b> {beer?.postal_code}
          </div>
          <div>
            <b>Country: </b> {beer?.country}
          </div>
          <div>
            <b>longitude: </b> {beer?.longitude}
          </div>
          <div>
            <b>latitude: </b> {beer?.latitude}
          </div>
          <div>
            <b>phone: </b> {beer?.phone}
          </div>
          <div>
            <b>website_url: </b> {beer?.website_url}
          </div>
          <div>
            <b>state: </b> {beer?.state}
          </div>
          <div>
            <b>street: </b> {beer?.street}
          </div>
        </main>
      </section>
    </article>
  );
};

export default Beer;
