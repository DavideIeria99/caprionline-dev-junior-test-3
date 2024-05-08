import { useEffect, useState } from 'react';
import Layout from './Components/Layout';
import MovieList from './Components/MovieList';
import Heading from './Components/Heading';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);

    await fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMovies(data);
      });
    setLoading(false);
  }
  const fetchRating = async () => {
    setLoading(true);
    setMovies([])
    await fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (order) {
          setOrder(!order)
          return setMovies(data.sort(function (a, b) {
            return b.rating - a.rating
          }));
        }
        setOrder(!order)
        return setMovies(data.sort(function (a, b) {
          return a.rating - b.rating
        }));
      });
    setLoading(false);
  }


  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <div className='bg-slate-800 mb-4 w-full h-[30px]'>
        <button onClick={() => fetchRating(!order)} className='bg-green-600 rounded p-2' >
          {order ? <p> rating ^</p> : <p>rating v</p>}
        </button>
      </div>
      <MovieList loading={loading} movies={movies} />
    </Layout>
  );
}




