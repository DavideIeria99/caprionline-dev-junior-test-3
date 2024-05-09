import { useEffect, useState } from 'react';
import Layout from './Components/Layout';
import MovieList from './Components/MovieList';
import Heading from './Components/Heading';
import { Button, Dropdown } from 'flowbite-react';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(true);

  const directUp = "after:content-['v'] after:text-sm    after:leading-9 after:text-left   after:text-white after:opacity-0 hover:after:opacity-100 ";
  const directDown = "after:content-['v'] after:rotate-180  after:text-sm after:text-left   after:leading-9  after:text-white after:opacity-0 hover:after:opacity-100";
  const fetchMovies = async () => {
    setLoading(true);

    await fetch('http://localhost:8000/movies')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });

    await fetch('http://localhost:8000/genre')
      .then(response => response.json())
      .then(data => {
        setGenres(data);
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

  const fetchGenre = async (id) => {
    await fetch(`http://localhost:8000/moviegenre/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <Heading />

      <section className=' mb-24 w-full h-[auto] flex gap-4 p-2 justify-center '>
        <Button size="lg" onClick={() => fetchOrder(movies, "rating")} className={order ? directUp : directDown}>rating</Button>
        <Button size="lg" onClick={() => fetchOrder(movies, "rating")} className={order ? directUp : directDown}>date</Button>
        {
          genres.length > 0 &&
          <Dropdown label="Dropdown button" className='overflowCustom ' >
            {
              genres && genres.map((el) =>
                <Dropdown.Item key={el.id} onClick={() => fetchGenre(el.id)}>{el.name}</Dropdown.Item>
              )
            }
          </Dropdown>}
      </section>
      <MovieList loading={loading} movies={movies} />
    </Layout>
  );
}




