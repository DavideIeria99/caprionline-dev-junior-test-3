<?php

namespace App\Controller;

use App\Entity\MovieGenre;
use App\Entity\Movie;
use App\Repository\GenreRepository;
use App\Repository\MovieGenreRepository;
use App\Repository\MovieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MoviesController extends AbstractController
{
    public function __construct(
        private MovieRepository $movieRepository,
        private SerializerInterface $serializer,
        private GenreRepository $genreRepository,
        private MovieGenreRepository $movieGenreRepository,
    ) {
    }

    #[Route('/movies', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $movies = $this->movieRepository->findAll();
        $data = $this->serializer->serialize($movies, "json", ["groups" => "default"]);

        return new JsonResponse($data, json: true);
    }

    #[Route('/genre', methods: ['GET'])]
    public function genre(): JsonResponse
    {
        $genres = $this->genreRepository->findAll();
        $data = $this->serializer->serialize($genres, "json");

        return new JsonResponse($data, json: true);
    }

    #[Route('/moviegenre/{id}', methods: ['GET'])]
    public function genrelist(int $id): JsonResponse
    {
        $movie = $this->movieGenreRepository->findAll();
        $genreMovie = $movie->findBy(['genre_id' => $id])->getGenre();

        // $Genre = $this->movieGenreRepository->find($id);
        // $movieGenre = $Genre->getGenre($id);
        // $movieGenre = $entityManager->getRepository(MovieGenre::class)->findBy(['genre_id' => $id]);
        $data = $this->serializer->serialize($genreMovie, "json");

        return new JsonResponse($genreMovie, json: true);
    }
}
