<?php

namespace App\Controller;

use App\Service\ArrivalsApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

final class ArrivalsApiController extends AbstractController
{

    public function __construct(private ArrivalsApiService $ArrivalsApiService) // We inject the service in the constructor
    {}

    #[Route('/api/arrivals', name: 'app_api_arrivals', methods: ['GET'])]
    public function getArrivals(Request $request): JsonResponse
    {
        //we get the parameters from the query string
        $airport = $request->query->get('airport', '');
        $begin = $request->query->get('begin', '');
        $end = $request->query->get('end', '');

        try {
            $data = $this->ArrivalsApiService->getArrivals($airport, $begin, $end); //we call our microservice
            if ($data == []) return new JsonResponse(['data' => []], JsonResponse::HTTP_NOT_FOUND);
            else if ($data)
                switch ((int)$data['code']) {
                    case 200:
                        $response = new JsonResponse($data['data'], JsonResponse::HTTP_OK);
                        break;
                    case 404:
                        $response = new JsonResponse(['error' => 'Resource not found or it was empty'], JsonResponse::HTTP_NOT_FOUND);
                    default:
                        // we could keep adding the return codes of our API in the future to adjust it to the Restful principles.
                        // for the sake of simplicity, I will stop here returning our own 500
                        $response = new JsonResponse(['error' => 'Something broke'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR, [
                            'Content-Type' => 'application/json'
                        ]);
                }
        } catch (\Exception $e) { //we catch the exception and return an error message to the frontend in case something is wrong
            $response = new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR, [
                'Content-Type' => 'application/json'
            ]);
        }
        return $response;
    }
}
