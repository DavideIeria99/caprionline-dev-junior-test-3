import { useEffect, useState } from 'react';
import Layout from './Components/Layout';
import MovieList from './Components/MovieList';
import Heading from './Components/Heading';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = () => {
    setLoading(true);

    return fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMovies(data.sort());
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <MovieList loading={loading} movies={movies} />
    </Layout>
  );
};




