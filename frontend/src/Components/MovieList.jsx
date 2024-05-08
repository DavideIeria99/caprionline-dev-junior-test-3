import MovieItem from './MovieItem';
import { Spinner } from 'flowbite-react';

export default function MovieList({ loading, movies }) {
    if (loading) {
        return (
            <div className="text-center">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
            {movies.map((item, key) => (
                <MovieItem key={key} {...item} />
            ))}
        </div>
    );
}
