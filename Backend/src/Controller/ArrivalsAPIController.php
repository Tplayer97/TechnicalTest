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
    {
    }

    #[Route('/api/arrivals', name:'app_api_arrivals', methods: ['GET'])]
    public function getArrivals(Request $request): JsonResponse
    {
        //we get the parameters from the query string
        $airport = $request->query->get('airport', '');
        $begin = $request->query->get('begin', '');
        $end = $request->query->get('end', '');
    
        try {
            $data = $this->ArrivalsApiService->getArrivals($airport, $begin, $end);//we call our microservice
            return new JsonResponse($data, 200, [
                'Content-Type' => 'application/json'
            ]);
        } catch (\Exception $e) {//we catch the exception and return an error message to the frontend in case something is wrong
            return new JsonResponse(['error' => $e->getMessage()], 500, [
                'Content-Type' => 'application/json'
            ]);
        }
    }

}
