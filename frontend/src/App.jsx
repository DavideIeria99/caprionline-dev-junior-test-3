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

  const fetchOrder = async (Arr, Type) => {

    setLoading(true)
    //funziona se ordini per data
    if (Type === "date") {
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
    //funziona se ordini per rating
    if (Type === "rating") {
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
  }


  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />
      <section className=' mb-6 w-full h-[auto] flex gap-4 p-2 justify-center '>
        <button onClick={() => fetchOrder(movies, "rating")} className='bg-cyan-600 rounded p-2  w-20 text-center ' >
          {order ? <p className="after:content-['^'] after:text-xs after:ms-1 after:text-black after:opacity-0 hover:after:opacity-100" >Rating</p>
            :
            <p className="after:content-['v'] after:text-xs after:ms-1 after:text-black after:opacity-0 hover:after:opacity-100" >Rating</p>}
        </button>
        <button onClick={() => fetchOrder(movies, "date")} className='bg-cyan-600 rounded p-2 w-20 text-center ' >
          {order ? <p className="after:content-['^'] after:text-xs after:ms-1 after:text-black after:opacity-0 hover:after:opacity-100">Date</p >
            :
            <p className="after:content-['v'] after:text-xs after:ms-1 after:text-black after:opacity-0 hover:after:opacity-100">Date</p>}
        </button>
      </section>
      <MovieList loading={loading} movies={movies} />
    </Layout>
  );
}




