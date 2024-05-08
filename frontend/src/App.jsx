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

  const fetchRating = async (Arr) => {
    setLoading(true);
    if (order) {
      setOrder(!order)
      Arr.sort(function (a, b) {
        return b.rating - a.rating
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setOrder(!order)
      Arr.sort(function (a, b) {
        return a.rating - b.rating
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }
  const fetchDate = async (Arr) => {
    setLoading(true);
    if (order) {
      setOrder(!order)
      Arr.sort(function (a, b) {

        return b.year - a.year
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setOrder(!order)
      Arr.sort(function (a, b) {
        return a.year - b.year
      });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }


  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <div className=' mb-6 w-full h-[auto] flex gap-4 p-2 justify-center '>
        <button onClick={() => fetchRating(movies)} className='bg-cyan-600 rounded p-2  w-20 text-center ' >
          {order ? <p className="after:content-['^'] after:text-xs after:text-black after:opacity-0 hover:after:opacity-100" >Rating </p>
            :
            <p className="after:content-['v'] after:text-xs after:text-black after:opacity-0 hover:after:opacity-100" >Rating </p>}
        </button>
        <button onClick={() => fetchDate(movies)} className='bg-cyan-600 rounded p-2 w-20 text-center ' >
          {order ? <p className="after:content-['^'] after:text-xs after:text-black after:opacity-0 hover:after:opacity-100">Date </p >
            :
            <p className="after:content-['v'] after:text-xs after:text-black after:opacity-0 hover:after:opacity-100">date </p>}
        </button>
      </div>
      <MovieList loading={loading} movies={movies} />
    </Layout>
  );
}




